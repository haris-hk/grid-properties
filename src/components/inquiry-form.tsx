import { type FormEvent, useState } from 'react';
import { Check, CircleAlert, Loader2, Mail, MessageCircle, Send } from 'lucide-react';

import {
  company,
  contact,
  hasEmail,
  hasWhatsApp,
  mailHref,
  whatsAppHref,
} from '@/content/site';

export type SubmitState =
  | 'idle'
  | 'loading'
  | 'success'
  | 'error'
  | 'unconfigured';

interface FieldSpec {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  options?: string[];
  placeholder?: string;
  full?: boolean;
}

export function Field({
  label,
  name,
  type = 'text',
  required = true,
  options,
  placeholder,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  options?: string[];
  placeholder?: string;
  defaultValue?: string;
}) {
  const className =
    'mt-2 w-full border-b border-[#183634]/25 bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-[#183634]/35 focus:border-[#a26e3e]';

  return (
    <label className="block text-[10px] font-bold uppercase tracking-[.12em] text-[#183634]/60">
      {label}
      {required && <span className="text-[#a26e3e]"> *</span>}
      {options ? (
        <select
          name={name}
          required={required}
          data-testid={`input-${name}`}
          className={className}
          defaultValue={defaultValue ?? ''}
        >
          <option value="" disabled>
            Select one
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          name={name}
          required={required}
          rows={4}
          data-testid={`input-${name}`}
          className={`${className} resize-y`}
          placeholder={placeholder}
          defaultValue={defaultValue}
        />
      ) : (
        <input
          name={name}
          required={required}
          type={type}
          data-testid={`input-${name}`}
          className={className}
          placeholder={placeholder}
          defaultValue={defaultValue}
        />
      )}
    </label>
  );
}

/** Shown when the inbox is not connected, or delivery failed. */
function DirectContactFallback({ prefill }: { prefill: string }) {
  const hasAny = hasWhatsApp || hasEmail;

  if (!hasAny) {
    // Site owner hint — shown only while developing, never to visitors.
    return import.meta.env.DEV ? (
      <p className="mt-2 text-xs leading-6 text-[#183634]/70">
        <b>Setup:</b> add <code className="font-mono">RESEND_API_KEY</code> and{' '}
        <code className="font-mono">INQUIRY_TO</code> in your Vercel project
        settings to receive these inquiries by email, and add a phone, WhatsApp
        number or email address in{' '}
        <code className="font-mono">src/content/site.ts</code> to show direct
        contact options here.
      </p>
    ) : null;
  }

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {hasWhatsApp && (
        <a
          href={whatsAppHref(prefill)}
          target="_blank"
          rel="noreferrer"
          data-testid="link-fallback-whatsapp"
          className="inline-flex items-center gap-2 border border-[#183634]/30 px-4 py-3 text-[10px] font-bold uppercase tracking-[.13em] hover:border-[#a26e3e]"
        >
          <MessageCircle size={14} /> Message us on WhatsApp
        </a>
      )}
      {hasEmail && (
        <a
          href={`${mailHref}?subject=${encodeURIComponent(`${company.shortName} inquiry`)}&body=${encodeURIComponent(prefill)}`}
          data-testid="link-fallback-email"
          className="inline-flex items-center gap-2 border border-[#183634]/30 px-4 py-3 text-[10px] font-bold uppercase tracking-[.13em] hover:border-[#a26e3e]"
        >
          <Mail size={14} /> Email {contact.email}
        </a>
      )}
    </div>
  );
}

export function FormStatus({
  status,
  message,
  prefill,
}: {
  status: SubmitState;
  message: string;
  prefill: string;
}) {
  if (status === 'loading') {
    return (
      <div
        data-testid="status-form-loading"
        role="status"
        className="mt-4 flex items-center gap-2 text-xs text-[#a26e3e]"
      >
        <Loader2 size={14} className="animate-spin" />
        Sending your inquiry…
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div
        data-testid="status-form-success"
        role="status"
        className="mt-4 border border-[#46766a] bg-[#e1eee7] p-4 text-sm text-[#183634]"
      >
        <Check size={16} className="mb-2 text-[#46766a]" />
        <b>Thank you — your inquiry has been sent.</b>
        <p className="mt-1 text-xs text-[#46766a]">
          A {company.shortName} advisor will be in touch shortly.
        </p>
      </div>
    );
  }

  if (status === 'unconfigured') {
    return (
      <div
        data-testid="status-form-unconfigured"
        role="status"
        className="mt-4 border border-[#a26e3e] bg-[#f3e8d8] p-4 text-sm text-[#183634]"
      >
        <CircleAlert size={16} className="mb-2 text-[#a26e3e]" />
        <b>This form is not connected to an inbox yet.</b>
        <p className="mt-1 text-xs text-[#183634]/70">
          Your message has not been sent. Please reach us directly in the
          meantime.
        </p>
        <DirectContactFallback prefill={prefill} />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div
        data-testid="status-form-error"
        role="alert"
        className="mt-4 border border-[#a33e35]/40 bg-[#f6e5e3] p-4 text-sm text-[#183634]"
      >
        <CircleAlert size={16} className="mb-2 text-[#a33e35]" />
        <b>{message || 'Please check the form and try again.'}</b>
        <DirectContactFallback prefill={prefill} />
      </div>
    );
  }

  return null;
}

interface InquiryFormProps {
  /** Which form this is — included in the email subject line. */
  formType: string;
  fields: FieldSpec[];
  submitLabel: string;
  /** Extra hidden values sent with the payload, e.g. the listing being viewed. */
  hidden?: Record<string, string>;
}

/**
 * Posts to /api/inquiry (a Vercel serverless function). If that endpoint has
 * no inbox configured it answers 503 and we say so plainly rather than showing
 * a fake success.
 */
export function InquiryForm({
  formType,
  fields,
  submitLabel,
  hidden = {},
}: InquiryFormProps) {
  const [status, setStatus] = useState<SubmitState>('idle');
  const [message, setMessage] = useState('');
  const [prefill, setPrefill] = useState(
    `Hello ${company.shortName}, I would like to speak to an advisor.`,
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      setStatus('error');
      setMessage('Please complete the required fields and try again.');
      return;
    }

    const entries = Object.fromEntries(
      new FormData(form).entries(),
    ) as Record<string, string>;

    const payload: Record<string, string> = {
      ...entries,
      ...hidden,
      formType,
      pageUrl: window.location.href,
    };

    setPrefill(
      `Hello ${company.shortName}, I am ${payload.name ?? ''}. ${
        payload.message ?? `I am interested in ${payload.interest ?? 'a property'}.`
      }`.trim(),
    );

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      let data: { ok?: boolean; error?: string; configured?: boolean } = {};
      try {
        data = await response.json();
      } catch {
        // Non-JSON response (e.g. the endpoint is missing in a static preview).
      }

      if (response.ok && data.ok) {
        setStatus('success');
        form.reset();
        return;
      }

      if (response.status === 503 || data.configured === false) {
        setStatus('unconfigured');
        return;
      }

      // 404 means the site is being served without the serverless function.
      if (response.status === 404) {
        setStatus('unconfigured');
        return;
      }

      setStatus('error');
      setMessage(data.error ?? 'Something went wrong. Please try again.');
    } catch {
      setStatus('error');
      setMessage(
        'We could not reach the server. Please check your connection and try again.',
      );
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      data-testid={`form-${formType.toLowerCase().replaceAll(' ', '-')}`}
      className="grid gap-x-8 gap-y-7"
    >
      {/* Honeypot — hidden from people, tempting to bots. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute h-0 w-0 opacity-0"
      />

      <div className="grid gap-x-8 gap-y-7 md:grid-cols-2">
        {fields
          .filter((field) => !field.full)
          .map((field) => (
            <Field key={field.name} {...field} />
          ))}
      </div>

      {fields
        .filter((field) => field.full)
        .map((field) => (
          <Field key={field.name} {...field} />
        ))}

      <button
        type="submit"
        disabled={status === 'loading'}
        data-testid={`button-submit-${formType.toLowerCase().replaceAll(' ', '-')}`}
        className="mt-2 flex w-fit items-center gap-4 bg-[#183634] px-6 py-4 text-[10px] font-bold uppercase tracking-[.14em] text-[#eee9df] transition-colors hover:bg-[#a26e3e] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'loading' ? 'Sending…' : submitLabel}
        {status === 'loading' ? (
          <Loader2 size={15} className="animate-spin" />
        ) : (
          <Send size={15} />
        )}
      </button>

      <FormStatus status={status} message={message} prefill={prefill} />
    </form>
  );
}

/* -------------------------------------------------------------------------- */
/* Ready-made field sets                                                       */
/* -------------------------------------------------------------------------- */

export const INTEREST_OPTIONS = [
  'Residential',
  'Commercial',
  'Plot/Land',
  'Investment',
  'Emaar',
  'Home Financing',
];

export const BUDGET_OPTIONS = [
  'Under 1 Crore',
  '1–3 Crore',
  '3–5 Crore',
  '5 Crore+',
  'Not Decided',
];

export const propertyInquiryFields: FieldSpec[] = [
  { name: 'name', label: 'Full Name' },
  { name: 'phone', label: 'Phone / WhatsApp', type: 'tel' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'interest', label: 'Interest', options: INTEREST_OPTIONS },
  { name: 'budget', label: 'Budget', options: BUDGET_OPTIONS },
  { name: 'location', label: 'Preferred Location' },
  {
    name: 'message',
    label: 'Message',
    type: 'textarea',
    required: false,
    placeholder: 'Tell us what you are looking for…',
    full: true,
  },
];

export const financingFields: FieldSpec[] = [
  { name: 'name', label: 'Name' },
  { name: 'whatsapp', label: 'WhatsApp', type: 'tel' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'income', label: 'Monthly Income' },
  {
    name: 'employment',
    label: 'Employment Type',
    options: ['Salaried', 'Self-employed', 'Business owner', 'Overseas Pakistani'],
  },
  { name: 'property', label: 'Preferred Property' },
  { name: 'location', label: 'Preferred Location' },
  { name: 'budget', label: 'Estimated Budget' },
];

export const contactFields: FieldSpec[] = [
  { name: 'name', label: 'Name' },
  { name: 'phone', label: 'Phone / WhatsApp', type: 'tel' },
  { name: 'email', label: 'Email', type: 'email' },
  {
    name: 'subject',
    label: 'Subject',
    options: [
      'Buy Property',
      'Sell Property',
      'Investment Advice',
      'Emaar',
      'Home Financing',
      'Developer Partnership',
      'Other',
    ],
  },
  {
    name: 'message',
    label: 'Message',
    type: 'textarea',
    placeholder: 'How can GRID help?',
    full: true,
  },
];
