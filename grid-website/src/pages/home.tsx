import { useState } from 'react';
import { ArrowDownRight, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'wouter';

import { ButtonLink, SectionLabel, Shell } from '@/components/layout';
import {
  InquiryForm,
  propertyInquiryFields,
} from '@/components/inquiry-form';
import { company, images } from '@/content/site';

const SERVICES: Array<[string, string, string]> = [
  [
    'Residential Properties',
    'Find a place that fits the way you want to live.',
    images.interior,
  ],
  [
    'Property Investment',
    'Evaluate opportunities with a longer view.',
    images.tower,
  ],
  [
    'Commercial Real Estate',
    'Make considered decisions for business and capital.',
    images.grid,
  ],
  [
    'Overseas Pakistani Services',
    'Invest in Pakistan from wherever you are.',
    images.waterfront,
  ],
  [
    'Developer Project Sales',
    'Navigate selected projects with clarity.',
    images.hero,
  ],
  [
    'Property Advisory',
    'A measured perspective before you commit.',
    images.detail,
  ],
];

const WHY_GRID: Array<[string, string]> = [
  ['Trusted Advice', 'A clear view before a commitment.'],
  ['Developer Access', 'Access to selected developer conversations.'],
  ['Market Knowledge', 'Context for the decisions in front of you.'],
  ['Transparent Process', 'Straightforward guidance at every stage.'],
  ['End-to-End Support', 'Support from first question to next step.'],
];

const PHILOSOPHY = [
  'Location',
  'Developer Reputation',
  'Entry Price',
  'Payment Plan',
  'Capital Growth Potential',
  'Rental Potential',
  'Exit Strategy',
];

const FINANCING_FACTS: Array<[string, string]> = [
  ['Up to', 'PKR 10 Million Financing'],
  ['Pricing', '5% Fixed Customer Pricing'],
  ['House', 'Up to 10 Marla / 2720 sq ft'],
  ['Flat', 'Up to 1500 sq ft'],
  ['Tenure', 'Up to 20 Years'],
];

export function Home() {
  const [service, setService] = useState(0);

  return (
    <Shell>
      <main id="main">
        {/* Hero ------------------------------------------------------------ */}
        <section className="relative flex min-h-[720px] items-end overflow-hidden bg-[#183634] text-[#eee9df] lg:min-h-[850px]">
          <img
            src={images.hero}
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover opacity-60 [object-position:55%] transition-transform duration-[12s] hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#102b2a]/95 via-[#183634]/60 to-transparent" />
          <div className="relative mx-auto w-full max-w-[1380px] px-5 pb-16 pt-44 lg:px-10 lg:pb-24">
            <div className="max-w-3xl">
              <div className="animate-rise eyebrow mb-7 text-[#d6a365]">
                Pakistan · Property Advisory
              </div>
              <h1
                data-testid="text-home-hero"
                className="display-font animate-rise delay-1 max-w-4xl text-5xl leading-[.98] text-[#f7f1e7] sm:text-7xl lg:text-[7.5rem]"
              >
                Smart Property
                <br />
                <em className="text-[#d6a365]">Decisions.</em>
                <br />
                Lasting Value.
              </h1>
              <p className="animate-rise delay-2 mt-8 max-w-lg text-sm leading-7 text-white/75 sm:text-base">
                Discover, evaluate and invest in selected real estate
                opportunities across Pakistan. {company.name} connects you with
                the right property, developer and strategy.
              </p>
              <div className="animate-rise delay-3 mt-9 flex flex-wrap gap-3">
                <ButtonLink href="/properties">Explore Properties</ButtonLink>
                <ButtonLink href="/contact" inverted>
                  Talk to an Advisor
                </ButtonLink>
              </div>
              <div className="mt-14 flex items-center gap-4 border-t border-white/20 pt-5 text-[10px] uppercase tracking-[.13em] text-white/60">
                <ShieldCheck size={17} className="text-[#d6a365]" />
                {company.partnerLine}
              </div>
            </div>
          </div>
          <div className="absolute bottom-10 right-10 hidden items-center gap-3 text-[10px] uppercase tracking-[.2em] text-white/50 lg:flex">
            <span className="h-px w-12 bg-white/40" />
            Scroll to explore
          </div>
        </section>

        {/* Who we are ------------------------------------------------------ */}
        <section className="mx-auto grid max-w-[1380px] gap-12 px-5 py-24 lg:grid-cols-[.82fr_1.18fr] lg:px-10 lg:py-36">
          <div>
            <SectionLabel>01 / Who we are</SectionLabel>
            <h2 className="display-font mt-6 max-w-md text-5xl leading-[1.02] lg:text-7xl">
              Real Estate, <em>Guided</em> by Expertise.
            </h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
            <div className="relative h-[380px] overflow-hidden bg-[#284d47]">
              <img
                src={images.grid}
                alt="Contemporary residential architecture"
                loading="lazy"
                className="img-lift h-full w-full object-cover opacity-85"
              />
            </div>
            <div className="pb-1">
              <p className="text-lg leading-8 text-[#183634]/80">
                {company.shortName} helps clients discover, evaluate and invest
                in selected real estate opportunities across Pakistan.
              </p>
              <p className="mt-5 text-sm leading-7 text-[#183634]/60">
                We bring a measured point of view to property decisions —
                connecting buyers, investors, developers and overseas Pakistanis
                with relevant options and clear next steps.
              </p>
              <Link
                href="/about"
                data-testid="link-learn-about"
                className="link-line mt-8 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.13em]"
              >
                Learn More About {company.shortName} <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>

        {/* Services -------------------------------------------------------- */}
        <section className="bg-[#dce5dd] py-24 lg:py-32">
          <div className="mx-auto max-w-[1380px] px-5 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
              <div>
                <SectionLabel>02 / What we do</SectionLabel>
                <h2 className="display-font mt-6 max-w-sm text-5xl leading-[1.04] lg:text-7xl">
                  Advice with a <em>point of view.</em>
                </h2>
                <p className="mt-7 max-w-xs text-sm leading-7 text-[#183634]/60">
                  Select a service to see how {company.shortName} approaches the
                  decision.
                </p>
              </div>
              <div>
                <div className="border-t border-[#183634]/20">
                  {SERVICES.map(([name], index) => (
                    <button
                      key={name}
                      type="button"
                      data-testid={`button-service-${index}`}
                      aria-pressed={service === index}
                      onClick={() => setService(index)}
                      className={`group flex w-full items-center justify-between border-b border-[#183634]/20 py-5 text-left transition-colors ${
                        service === index ? 'text-[#a26e3e]' : 'text-[#183634]'
                      }`}
                    >
                      <span className="flex items-baseline gap-5">
                        <span className="mono-font text-[10px] opacity-50">
                          0{index + 1}
                        </span>
                        <span className="display-font text-2xl sm:text-3xl">
                          {name}
                        </span>
                      </span>
                      <ArrowDownRight
                        size={19}
                        className={`transition-transform ${
                          service === index
                            ? 'rotate-[-45deg]'
                            : 'group-hover:translate-x-1'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <div className="mt-8 grid gap-7 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
                  <div key={service} className="animate-rise">
                    <p className="eyebrow text-[#a26e3e]">Selected service</p>
                    <h3 className="display-font mt-3 text-4xl">
                      {SERVICES[service][0]}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-[#183634]/65">
                      {SERVICES[service][1]}
                    </p>
                  </div>
                  <div className="h-64 overflow-hidden bg-[#183634]">
                    <img
                      key={SERVICES[service][2]}
                      src={SERVICES[service][2]}
                      alt={SERVICES[service][0]}
                      loading="lazy"
                      className="animate-reveal h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured developer ---------------------------------------------- */}
        <section className="relative min-h-[680px] overflow-hidden bg-[#183634] text-[#eee9df]">
          <img
            src={images.waterfront}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-[#102b2a]/40" />
          <div className="relative mx-auto flex min-h-[680px] max-w-[1380px] items-end px-5 py-20 lg:px-10">
            <div>
              <SectionLabel light>03 / Featured developer</SectionLabel>
              <h2 className="display-font mt-5 max-w-3xl text-6xl leading-[.95] sm:text-8xl">
                A Name You Know.
                <br />
                <em className="text-[#d6a365]">A Lifestyle</em>
                <br />
                You Can Own.
              </h2>
              <p className="mt-7 text-lg text-white/70">
                Premium waterfront living in Karachi.
              </p>
              <div className="mt-7">
                <ButtonLink href="/developers" inverted>
                  View Projects
                </ButtonLink>
              </div>
            </div>
            <div className="absolute right-10 top-24 hidden max-w-[180px] border-l border-white/25 pl-5 text-xs leading-6 text-white/55 lg:block">
              {company.shortName} is an
              <br />
              <span className="text-white">{company.partnerLine}.</span>
            </div>
          </div>
        </section>

        {/* Why GRID -------------------------------------------------------- */}
        <section className="mx-auto max-w-[1380px] px-5 py-24 lg:px-10 lg:py-32">
          <div className="grid gap-14 lg:grid-cols-[.75fr_1.25fr]">
            <div>
              <SectionLabel>04 / Why {company.shortName}</SectionLabel>
              <h2 className="display-font mt-6 text-6xl leading-none">
                Why <em>{company.shortName}?</em>
              </h2>
            </div>
            <div className="grid border-t border-[#183634]/20 sm:grid-cols-2">
              {WHY_GRID.map(([title, body], index) => (
                <div
                  key={title}
                  className="border-b border-[#183634]/20 py-7 pr-5"
                >
                  <span className="mono-font text-xs text-[#a26e3e]">
                    0{index + 1}
                  </span>
                  <h3 className="display-font mt-3 text-3xl">{title}</h3>
                  <p className="mt-3 max-w-xs text-xs leading-6 text-[#183634]/55">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Investment philosophy ------------------------------------------- */}
        <section className="grid-paper bg-[#e3d9c9] py-24 lg:py-32">
          <div className="mx-auto max-w-[1380px] px-5 lg:px-10">
            <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
              <div>
                <SectionLabel>05 / Investment philosophy</SectionLabel>
                <h2 className="display-font mt-6 max-w-lg text-6xl leading-[.98]">
                  Don't Just Buy Property.
                  <br />
                  <em>Build a Portfolio.</em>
                </h2>
                <p className="mt-8 max-w-sm text-sm leading-7 text-[#183634]/65">
                  A property decision deserves more than a listing. We look at
                  the details that shape the decision and the strategy around
                  it.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-px bg-[#183634]/20 sm:grid-cols-3 lg:grid-cols-4">
                {PHILOSOPHY.map((item, index) => (
                  <div key={item} className="min-h-36 bg-[#e3d9c9] p-5">
                    <span className="mono-font text-[10px] text-[#a26e3e]">
                      0{index + 1}
                    </span>
                    <p className="mt-10 text-sm font-semibold leading-5">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Home financing -------------------------------------------------- */}
        <section className="bg-[#b7cbbd] py-20 lg:py-28">
          <div className="mx-auto grid max-w-[1380px] gap-12 px-5 lg:grid-cols-2 lg:px-10">
            <div>
              <SectionLabel>06 / Home financing</SectionLabel>
              <h2 className="display-font mt-6 max-w-xl text-6xl leading-[.95]">
                Ghar Ho Tu <em>Apna.</em>
              </h2>
              <p className="mt-7 max-w-md text-sm leading-7 text-[#183634]/70">
                Wazir-e-Azam Apna Ghar Program
              </p>
              <div className="mt-10 grid max-w-md grid-cols-2 border-t border-[#183634]/20">
                {FINANCING_FACTS.map(([label, value]) => (
                  <div
                    key={label}
                    className="border-b border-[#183634]/20 py-4 pr-4"
                  >
                    <small className="eyebrow text-[#a26e3e]">{label}</small>
                    <p className="mt-2 text-sm font-semibold">{value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-end border-l border-[#183634]/20 pl-7 lg:pl-14">
              <p className="display-font max-w-sm text-3xl">
                {company.shortName} helps you understand the property side of
                the conversation.
              </p>
              <p className="mt-6 max-w-sm text-xs leading-6 text-[#183634]/60">
                {company.shortName} provides property and advisory support and
                is not the lender. Financing approval, disbursement and
                eligibility remain with the relevant lender and applicable
                rules.
              </p>
              <div className="mt-7">
                <ButtonLink href="/pm-home-financing">
                  Check My Options
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>

        {/* Inquiry --------------------------------------------------------- */}
        <section
          id="inquiry"
          className="bg-[#eee9df] px-5 py-24 lg:px-10 lg:py-32"
        >
          <div className="mx-auto max-w-[1380px]">
            <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
              <div>
                <SectionLabel>07 / Start a conversation</SectionLabel>
                <h2 className="display-font mt-6 text-6xl leading-[.95]">
                  Looking for the <em>Right Property?</em>
                </h2>
                <p className="mt-6 max-w-sm text-sm leading-7 text-[#183634]/60">
                  Share a few details and an advisor will come back to you with
                  relevant options and a clear next step.
                </p>
              </div>
              <div className="border-t border-[#183634]/20 pt-2">
                <InquiryForm
                  formType="Property inquiry"
                  fields={propertyInquiryFields}
                  submitLabel="Request a Call Back"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </Shell>
  );
}
