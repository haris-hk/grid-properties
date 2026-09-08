import { Clock, Compass, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';

import { SectionLabel, Shell } from '@/components/layout';
import { InquiryForm, contactFields } from '@/components/inquiry-form';
import {
  company,
  contact,
  hasAddress,
  hasEmail,
  hasMap,
  hasPhone,
  hasWhatsApp,
  mailHref,
  telHref,
  whatsAppHref,
} from '@/content/site';

function ContactLine({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4 border-b border-[#183634]/15 py-4">
      <span className="mt-1 text-[#a26e3e]">{icon}</span>
      <div>
        <b className="block text-[10px] uppercase tracking-[.12em] text-[#183634]/45">
          {label}
        </b>
        <div className="mt-1 text-sm">{children}</div>
      </div>
    </div>
  );
}

export function Contact() {
  const hasAnyDetail = hasPhone || hasWhatsApp || hasEmail || hasAddress;

  return (
    <Shell>
      <main id="main" className="pt-28">
        <section className="bg-[#183634] px-5 py-20 text-[#eee9df] lg:px-10 lg:py-28">
          <div className="mx-auto max-w-[1380px]">
            <SectionLabel light>Contact {company.shortName}</SectionLabel>
            <h1 className="display-font mt-6 text-7xl leading-[.9] sm:text-[9rem]">
              Let's Talk
              <br />
              <em className="text-[#d6a365]">Property.</em>
            </h1>
            <p className="mt-8 max-w-md text-sm leading-7 text-white/65">
              Tell us where you are in the decision. We will help you identify
              the next useful conversation.
            </p>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1380px] gap-14 px-5 py-20 lg:grid-cols-[.7fr_1.3fr] lg:px-10 lg:py-32">
          <div>
            <SectionLabel>{contact.city}</SectionLabel>

            {hasAnyDetail ? (
              <div className="mt-8">
                {hasAddress && (
                  <ContactLine icon={<MapPin size={16} />} label="Office">
                    {contact.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                    <span className="block">{contact.city}</span>
                  </ContactLine>
                )}
                {hasPhone && (
                  <ContactLine icon={<Phone size={16} />} label="Phone">
                    <a
                      href={telHref}
                      data-testid="link-contact-phone"
                      className="hover:text-[#a26e3e]"
                    >
                      {contact.phone}
                    </a>
                  </ContactLine>
                )}
                {hasWhatsApp && (
                  <ContactLine
                    icon={<MessageCircle size={16} />}
                    label="WhatsApp"
                  >
                    <a
                      href={whatsAppHref(
                        `Hello ${company.shortName}, I would like to speak to an advisor.`,
                      )}
                      target="_blank"
                      rel="noreferrer"
                      data-testid="link-contact-whatsapp"
                      className="hover:text-[#a26e3e]"
                    >
                      Start a WhatsApp chat
                    </a>
                  </ContactLine>
                )}
                {hasEmail && (
                  <ContactLine icon={<Mail size={16} />} label="Email">
                    <a
                      href={mailHref}
                      data-testid="link-contact-email"
                      className="hover:text-[#a26e3e]"
                    >
                      {contact.email}
                    </a>
                  </ContactLine>
                )}
                {contact.hours !== '' && (
                  <ContactLine icon={<Clock size={16} />} label="Hours">
                    {contact.hours}
                  </ContactLine>
                )}
              </div>
            ) : (
              <div className="mt-10 border-l border-[#183634]/20 pl-6">
                <p className="display-font text-3xl">
                  A meeting point
                  <br />
                  for better decisions.
                </p>
                <p className="mt-5 text-xs leading-6 text-[#183634]/55">
                  Office address, phone and email appear here as soon as they
                  are added to{' '}
                  <code className="font-mono">src/content/site.ts</code>. Until
                  then, the form is the fastest way to reach us.
                </p>
              </div>
            )}

            {hasMap ? (
              <iframe
                title={`${company.name} office location`}
                src={contact.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="mt-10 h-64 w-full border-0 grayscale"
              />
            ) : (
              <div className="mt-10 flex h-48 items-center justify-center border border-dashed border-[#183634]/30 bg-[#dce5dd]">
                <div className="text-center">
                  <Compass className="mx-auto mb-3 text-[#a26e3e]" size={24} />
                  <p className="eyebrow text-[#183634]/50">
                    Map appears once an embed URL is added
                  </p>
                </div>
              </div>
            )}
          </div>

          <div>
            <SectionLabel>Send a message</SectionLabel>
            <div className="mt-6">
              <InquiryForm
                formType="Contact message"
                fields={contactFields}
                submitLabel="Send Message"
              />
            </div>
          </div>
        </section>
      </main>
    </Shell>
  );
}
