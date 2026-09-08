import { useState } from 'react';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Compass,
  Heart,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { Link, useParams } from 'wouter';

import { ButtonLink, SectionLabel, Shell } from '@/components/layout';
import {
  InquiryForm,
  propertyInquiryFields,
} from '@/components/inquiry-form';
import { useFavorites } from '@/lib/use-favorites';
import {
  company,
  hasPhone,
  hasWhatsApp,
  contact,
  properties,
  telHref,
  whatsAppHref,
} from '@/content/site';

function PropertyNotFound({ id }: { id: string | undefined }) {
  return (
    <Shell>
      <main
        id="main"
        className="flex min-h-[70vh] items-center justify-center px-5 pt-28 text-center"
      >
        <div data-testid="empty-property-detail">
          <Compass className="mx-auto text-[#a26e3e]" size={26} />
          <p className="eyebrow mt-5 text-[#a26e3e]">Listing unavailable</p>
          <h1 className="display-font mt-4 text-6xl leading-none">
            That property is
            <br />
            <em>no longer listed.</em>
          </h1>
          <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#183634]/60">
            {id ? (
              <>
                We could not find a listing with the reference{' '}
                <code className="font-mono text-[#a26e3e]">{id}</code>. It may
                have been sold or withdrawn.
              </>
            ) : (
              'We could not find that listing.'
            )}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/properties">Browse all properties</ButtonLink>
            <ButtonLink href="/contact" inverted={false}>
              Talk to an advisor
            </ButtonLink>
          </div>
        </div>
      </main>
    </Shell>
  );
}

export function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const property = properties.find((entry) => entry.id === id);
  const [active, setActive] = useState(0);
  const { favorites, toggle } = useFavorites();

  // Previously this fell back to the first listing, so a bad or stale URL
  // silently showed the wrong property. Now it is an honest not-found.
  if (!property) return <PropertyNotFound id={id} />;

  const gallery = property.images;
  const saved = favorites.includes(property.id);
  const enquiryText = `Hello ${company.shortName}, I am interested in ${property.name} (${property.location}).`;

  return (
    <Shell>
      <main id="main" className="pt-28">
        <section className="mx-auto max-w-[1380px] px-5 py-12 lg:px-10 lg:py-20">
          <Link
            href="/properties"
            data-testid="link-back-properties"
            className="mb-7 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.14em] text-[#a26e3e]"
          >
            <ChevronLeft size={15} /> Back to Properties
          </Link>

          <div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr]">
            <div>
              <div className="relative h-[420px] overflow-hidden bg-[#183634] sm:h-[600px]">
                <img
                  src={gallery[active]}
                  alt={`${property.name} — image ${active + 1} of ${gallery.length}`}
                  className="h-full w-full object-cover"
                />
                {gallery.length > 1 && (
                  <>
                    <button
                      type="button"
                      aria-label="Previous image"
                      data-testid="button-gallery-previous"
                      onClick={() =>
                        setActive((active + gallery.length - 1) % gallery.length)
                      }
                      className="absolute bottom-5 left-5 bg-[#eee9df] p-3 transition-colors hover:bg-[#d6a365]"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      type="button"
                      aria-label="Next image"
                      data-testid="button-gallery-next"
                      onClick={() => setActive((active + 1) % gallery.length)}
                      className="absolute bottom-5 left-16 bg-[#eee9df] p-3 transition-colors hover:bg-[#d6a365]"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}
                <span className="absolute bottom-6 right-5 bg-[#183634]/75 px-3 py-2 font-mono text-[10px] text-white">
                  {String(active + 1).padStart(2, '0')} /{' '}
                  {String(gallery.length).padStart(2, '0')}
                </span>
              </div>

              {gallery.length > 1 && (
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {gallery.map((image, index) => (
                    <button
                      type="button"
                      key={`${image}-${index}`}
                      aria-label={`Show image ${index + 1}`}
                      data-testid={`button-gallery-thumb-${index}`}
                      onClick={() => setActive(index)}
                      className={`h-24 overflow-hidden transition-opacity ${
                        active === index
                          ? 'ring-2 ring-[#a26e3e]'
                          : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={image}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:pt-10">
              <div className="flex items-start justify-between gap-4">
                <SectionLabel>Property detail</SectionLabel>
                <button
                  type="button"
                  onClick={() => toggle(property.id)}
                  aria-pressed={saved}
                  data-testid="button-favorite-detail"
                  className={`flex items-center gap-2 border px-3 py-2 text-[10px] font-bold uppercase tracking-[.12em] transition-colors ${
                    saved
                      ? 'border-[#a26e3e] bg-[#a26e3e] text-[#eee9df]'
                      : 'border-[#183634]/25 hover:border-[#a26e3e]'
                  }`}
                >
                  <Heart size={13} fill={saved ? 'currentColor' : 'none'} />
                  {saved ? 'Saved' : 'Save'}
                </button>
              </div>

              <h1 className="display-font mt-5 text-6xl leading-none">
                {property.name}
              </h1>
              <p className="mt-4 text-sm text-[#183634]/55">
                {property.location}
              </p>

              <div className="mt-10 border-y border-[#183634]/20 py-5">
                <div className="grid grid-cols-2 gap-5 text-sm">
                  {(
                    [
                      ['Price', property.price],
                      ['Payment plan', property.plan],
                      ['Developer', property.developer],
                      ['Status', property.status],
                      ['Bedrooms', property.bedrooms],
                      ['Area', property.areaSqFt],
                    ] as Array<[string, string]>
                  ).map(([label, value]) => (
                    <span key={label}>
                      <b className="mb-1 block text-[10px] uppercase tracking-[.12em] text-[#183634]/45">
                        {label}
                      </b>
                      {value}
                    </span>
                  ))}
                </div>
              </div>

              <p className="mt-8 text-sm leading-7 text-[#183634]/70">
                {property.description}
              </p>

              {property.highlights.length > 0 && (
                <ul className="mt-7 grid gap-3">
                  {property.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-3 text-sm leading-6 text-[#183634]/70"
                    >
                      <Check
                        size={15}
                        className="mt-1 shrink-0 text-[#a26e3e]"
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <a
                  href="#inquiry"
                  data-testid="link-detail-inquire"
                  className="inline-flex items-center justify-center gap-3 bg-[#d6a365] px-5 py-4 text-[10px] font-bold uppercase tracking-[.13em] text-[#183634] transition-colors hover:bg-[#e4b87d]"
                >
                  Request Details
                </a>
                {hasWhatsApp ? (
                  <a
                    href={whatsAppHref(enquiryText)}
                    target="_blank"
                    rel="noreferrer"
                    data-testid="link-detail-whatsapp"
                    className="inline-flex items-center justify-center gap-3 border border-[#183634]/30 px-5 py-4 text-[10px] font-bold uppercase tracking-[.13em] hover:border-[#a26e3e]"
                  >
                    <MessageCircle size={15} />
                    WhatsApp us
                  </a>
                ) : hasPhone ? (
                  <a
                    href={telHref}
                    data-testid="link-detail-phone"
                    className="inline-flex items-center justify-center gap-3 border border-[#183634]/30 px-5 py-4 text-[10px] font-bold uppercase tracking-[.13em] hover:border-[#a26e3e]"
                  >
                    <Phone size={15} />
                    {contact.phone}
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <section
          id="inquiry"
          className="border-t border-[#183634]/15 bg-[#dce5dd] px-5 py-20 lg:px-10"
        >
          <div className="mx-auto grid max-w-[1380px] gap-12 lg:grid-cols-2">
            <div>
              <SectionLabel>Property notes</SectionLabel>
              <h2 className="display-font mt-5 text-5xl">
                What to check <em>next.</em>
              </h2>
              <div className="mt-8 grid gap-3">
                {(
                  [
                    ['Type', property.type],
                    ['Purpose', property.purpose],
                    ['Reference', property.id],
                    ['Availability', property.status],
                  ] as Array<[string, string]>
                ).map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between border-b border-[#183634]/15 py-4 text-sm"
                  >
                    <span>{label}</span>
                    <span className="mono-font text-[10px] text-[#a26e3e]">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-[#183634]/15 lg:border-l lg:pl-12">
              <SectionLabel>Inquire about this property</SectionLabel>
              <h2 className="display-font mt-5 text-4xl">
                Let's discuss the next step.
              </h2>
              <div className="mt-8">
                <InquiryForm
                  formType="Property detail inquiry"
                  fields={propertyInquiryFields}
                  submitLabel="Request a Call Back"
                  hidden={{
                    propertyId: property.id,
                    property: `${property.name} — ${property.location}`,
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </Shell>
  );
}
