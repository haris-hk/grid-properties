/**
 * POST /api/inquiry — Vercel Serverless Function
 *
 * Receives an inquiry from any form on the site, validates it, and emails it
 * to GRID via Resend (https://resend.com — free tier covers a site like this).
 *
 * Environment variables (set these in Vercel → Settings → Environment Variables):
 *
 *   RESEND_API_KEY   Required to actually send. Get one at resend.com.
 *   INQUIRY_TO       Required. Where inquiries are delivered,
 *                    e.g. "inquiries@gridpropertyadvisors.com".
 *   INQUIRY_FROM     Optional. A verified sender on your Resend domain.
 *                    Defaults to "onboarding@resend.dev", which Resend allows
 *                    without domain verification but only delivers to the
 *                    address that owns the Resend account.
 *
 * If RESEND_API_KEY or INQUIRY_TO is missing, the endpoint responds 503 with
 * `{ configured: false }`. The site treats that honestly: it tells the visitor
 * the form is not connected yet and offers WhatsApp/email instead of pretending
 * the message was sent.
 *
 * No npm dependency is needed — this uses fetch and the Resend REST API.
 */

export const config = { runtime: 'nodejs' };

interface InquiryPayload {
  formType?: string;
  name?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  interest?: string;
  budget?: string;
  location?: string;
  subject?: string;
  message?: string;
  property?: string;
  propertyId?: string;
  income?: string;
  employment?: string;
  cnic?: string;
  pageUrl?: string;
  /** Honeypot: real users never fill this. */
  company?: string;
}

const FIELD_LABELS: Record<string, string> = {
  formType: 'Form',
  name: 'Name',
  email: 'Email',
  phone: 'Phone',
  whatsapp: 'WhatsApp',
  interest: 'Interest',
  budget: 'Budget',
  location: 'Preferred location',
  subject: 'Subject',
  property: 'Preferred property',
  propertyId: 'Listing',
  income: 'Monthly income',
  employment: 'Employment type',
  cnic: 'CNIC',
  message: 'Message',
  pageUrl: 'Submitted from',
};

const MAX_FIELD_LENGTH = 2000;

function clean(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, MAX_FIELD_LENGTH);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

export default async function handler(
  request: Request,
): Promise<Response> {
  if (request.method !== 'POST') {
    return json({ ok: false, error: 'Method not allowed' }, 405, {
      Allow: 'POST',
    });
  }

  let body: InquiryPayload;
  try {
    body = (await request.json()) as InquiryPayload;
  } catch {
    return json({ ok: false, error: 'Invalid JSON body.' }, 400);
  }

  // Honeypot — silently accept and drop bot submissions.
  if (clean(body.company) !== '') {
    return json({ ok: true, delivered: true }, 200);
  }

  const name = clean(body.name);
  const email = clean(body.email);
  const phone = clean(body.phone) || clean(body.whatsapp);

  if (name.length < 2) {
    return json(
      { ok: false, error: 'Please enter your name.', field: 'name' },
      400,
    );
  }
  if (!phone && !email) {
    return json(
      {
        ok: false,
        error: 'Please provide a phone number or an email address.',
        field: 'phone',
      },
      400,
    );
  }
  if (email && !isValidEmail(email)) {
    return json(
      { ok: false, error: 'That email address looks incorrect.', field: 'email' },
      400,
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_TO;
  const from = process.env.INQUIRY_FROM ?? 'onboarding@resend.dev';

  if (!apiKey || !to) {
    return json(
      {
        ok: false,
        configured: false,
        error:
          'The inquiry form is not connected to an inbox yet. Please reach us directly.',
      },
      503,
    );
  }

  const rows = Object.entries(FIELD_LABELS)
    .map(([key, label]) => [label, clean(body[key as keyof InquiryPayload])])
    .filter(([, value]) => value !== '');

  const formType = clean(body.formType) || 'Website inquiry';
  const subjectLine = `[GRID] ${formType}${name ? ` — ${name}` : ''}`;

  const html = `
    <div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;color:#183634;max-width:640px">
      <h2 style="margin:0 0 4px;font-size:18px">New inquiry from the GRID website</h2>
      <p style="margin:0 0 20px;color:#6b7c78;font-size:13px">
        Received ${escapeHtml(new Date().toUTCString())}
      </p>
      <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:10px 16px 10px 0;border-bottom:1px solid #e4ded2;color:#6b7c78;white-space:nowrap;vertical-align:top">${escapeHtml(label)}</td>
            <td style="padding:10px 0;border-bottom:1px solid #e4ded2;white-space:pre-wrap">${escapeHtml(value)}</td>
          </tr>`,
          )
          .join('')}
      </table>
    </div>`;

  const text = rows.map(([label, value]) => `${label}: ${value}`).join('\n');

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `GRID Website <${from}>`,
        to: to.split(',').map((address) => address.trim()),
        subject: subjectLine,
        html,
        text,
        ...(email && isValidEmail(email) ? { reply_to: email } : {}),
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error('Resend rejected the inquiry:', response.status, detail);
      return json(
        {
          ok: false,
          error:
            'We could not deliver your message just now. Please try again or contact us directly.',
        },
        502,
      );
    }

    return json({ ok: true, delivered: true }, 200);
  } catch (error) {
    console.error('Inquiry delivery failed:', error);
    return json(
      {
        ok: false,
        error:
          'We could not deliver your message just now. Please try again or contact us directly.',
      },
      502,
    );
  }
}

function json(
  payload: unknown,
  status: number,
  extraHeaders: Record<string, string> = {},
): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      ...extraHeaders,
    },
  });
}
