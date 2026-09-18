import {
  ArrowRight,
  Banknote,
  Building2,
  CalendarDays,
  ClipboardCheck,
  Construction,
  FileCheck2,
  Globe2,
  Handshake,
  Headphones,
  Home,
  Landmark,
  LockKeyhole,
  MapPinHouse,
  MessageCircle,
  Plus,
  ShieldCheck,
  UserRound,
} from 'lucide-react';

import { InquiryForm, financingFields } from '@/components/inquiry-form';
import { SectionLabel, Shell } from '@/components/layout';
import { company } from '@/content/site';

const FEATURES = [
  [Banknote, 'PKR 10,000,000', 'Maximum Financing', 'Maximum financing limit under the scheme.'],
  [Landmark, '5%', 'Fixed Customer Pricing', 'Current end-user pricing under the revised scheme.'],
  [Home, '10 Marla / 1,500 sq.ft.', 'Eligible Housing Size', 'House up to 10 Marla; flat up to 1,500 sq.ft.'],
  [CalendarDays, 'Up to 20 Years', 'Financing Tenor', 'A longer repayment period for manageable installments.'],
] as const;

const ELIGIBILITY = [
  [UserRound, 'First-Time Homeowner', 'Pakistani citizens with a valid CNIC who do not currently own a housing unit in their name.'],
  [Globe2, 'Overseas Pakistanis', 'Eligible non-resident Pakistanis holding NICOP/POC may apply, subject to applicable rules.'],
  [Landmark, 'Bank Approval', 'Eligibility and financing remain subject to the participating financial institution.'],
] as const;

const USES = [
  [Home, 'Purchase of a House', 'Purchase an eligible residential property.'],
  [Building2, 'Purchase an Apartment', 'Finance an eligible apartment within the applicable size limits.'],
  [Construction, 'Construction', 'Construct a house on a plot already owned by the applicant.'],
  [MapPinHouse, 'Plot + Construction', 'Purchase a plot followed by construction, subject to scheme rules.'],
] as const;

const STEPS = [
  [MessageCircle, 'Understand Your Requirement'],
  [Home, 'Identify Suitable Properties'],
  [FileCheck2, 'Explain the Options'],
  [Globe2, 'Coordinate Relevant Parties'],
  [ClipboardCheck, 'Documentation Guidance'],
  [Handshake, 'Transaction Support'],
] as const;

const TRUST_POINTS = [
  [ShieldCheck, 'Trusted Guidance', 'Clear information to support a considered decision.'],
  [LockKeyhole, 'Your Information Is Safe', 'Privacy-conscious handling of your inquiry.'],
  [Headphones, 'Dedicated Support', 'Help as you move through each stage.'],
] as const;

const FAQS = [
  ['Who can apply?', 'Eligible first-time homeowners, subject to scheme rules and lender criteria.'],
  ['What documents are required?', 'Requirements vary by applicant and lender. The participating bank or HBFCL will confirm the final list.'],
  ['How much financing is available?', 'Up to the applicable scheme limit, subject to assessment and approval.'],
  ['How long does the process take?', 'Timing depends on verification, documentation, property assessment and lender processing.'],
  ['What happens after I submit the form?', `A ${company.shortName} advisor will contact you to understand your requirements and explain the relevant next steps.`],
] as const;

export function Financing() {
  return (
    <Shell>
      <main id="main" className="pt-28">
        <section className="relative overflow-hidden bg-[#183634] text-[#f7f1e7]">
          <img
            src="/images/apna-ghar-family.jpg"
            alt="Family standing outside their home"
            className="absolute inset-0 h-full w-full object-cover object-[64%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#102b2a] via-[#183634]/90 to-[#183634]/15 lg:via-[#183634]/75" />
          <div className="relative mx-auto grid min-h-[720px] max-w-[1380px] gap-12 px-5 pb-14 pt-20 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-10 lg:py-20">
            <div className="max-w-2xl self-center">
              <SectionLabel light>Wazir-e-Azam Housing Finance Scheme</SectionLabel>
              <h1 className="display-font mt-6 text-5xl leading-[.95] sm:text-7xl lg:text-[6.5rem]">
                Wazir-e-Azam
                <br />
                <em className="text-[#d6a365]">Apna Ghar</em> Program
              </h1>
              <p className="display-font mt-5 text-2xl italic text-[#d6a365]">
                “Ghar Ho Tu Apna”
              </p>
              <p className="mt-6 max-w-xl text-sm leading-7 text-white/75">
                A markup subsidy and risk-sharing program designed to make
                housing finance more accessible to eligible first-time
                homeowners.
              </p>
              <div className="mt-8 grid max-w-xl grid-cols-3 gap-px bg-white/25">
                {[
                  ['PKR 10M', 'Max Financing'],
                  ['5%', 'Fixed Pricing'],
                  ['20 Years', 'Financing Tenor'],
                ].map(([value, label]) => (
                  <div key={label} className="bg-[#183634]/80 p-4 backdrop-blur-sm">
                    <strong className="display-font block text-xl text-[#d6a365] sm:text-2xl">
                      {value}
                    </strong>
                    <span className="mt-1 block text-[9px] uppercase tracking-[.1em] text-white/60">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
              <a
                href="#apply"
                className="group mt-8 inline-flex items-center gap-5 bg-[#d6a365] px-6 py-4 text-[10px] font-bold uppercase tracking-[.14em] text-[#183634]"
              >
                Check My Options
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <div
              id="apply"
              className="self-end border border-white/25 bg-[#eee9df]/95 p-6 text-[#183634] shadow-2xl backdrop-blur-md sm:p-8 lg:ml-auto lg:max-w-[560px]"
            >
              <SectionLabel>Financing inquiry</SectionLabel>
              <h2 className="display-font mt-4 text-3xl">Apply for Apna Ghar</h2>
              <p className="mt-2 text-xs leading-6 text-[#183634]/55">
                Share your details and the {company.shortName} team will get in touch.
              </p>
              <div className="mt-7">
                <InquiryForm
                  formType="Home financing inquiry"
                  fields={financingFields}
                  submitLabel="Submit Application"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1380px] px-5 py-20 lg:px-10 lg:py-28">
          <SectionLabel>01 / Key features</SectionLabel>
          <div className="mt-5 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <h2 className="display-font max-w-xl text-5xl leading-none lg:text-6xl">
              A clearer path to <em>home ownership.</em>
            </h2>
            <p className="max-w-md text-sm leading-7 text-[#183634]/60">
              Key scheme highlights. Confirm current terms with the participating
              financial institution.
            </p>
          </div>
          <div className="mt-12 grid gap-px bg-[#183634]/20 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map(([Icon, value, title, copy]) => (
              <article key={title} className="bg-[#eee9df] p-6 lg:min-h-72">
                <Icon size={27} className="text-[#a26e3e]" />
                <h3 className="display-font mt-10 text-3xl leading-tight">{value}</h3>
                <b className="mt-4 block text-xs uppercase tracking-[.1em]">{title}</b>
                <p className="mt-3 text-xs leading-6 text-[#183634]/58">{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#dce5dd] px-5 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto grid max-w-[1380px] gap-12 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
            <div>
              <SectionLabel>02 / Eligibility</SectionLabel>
              <h2 className="display-font mt-5 text-5xl leading-none lg:text-6xl">
                Who can <em>apply?</em>
              </h2>
              <p className="mt-6 max-w-xl text-sm leading-7 text-[#183634]/65">
                The scheme is intended for eligible first-time homeowners, with
                final eligibility subject to lender assessment and applicable
                scheme rules.
              </p>
              <div className="mt-9 grid gap-px bg-[#183634]/20 sm:grid-cols-3">
                {ELIGIBILITY.map(([Icon, title, copy]) => (
                  <article key={title} className="bg-[#dce5dd] p-5">
                    <Icon size={24} className="text-[#a26e3e]" />
                    <h3 className="mt-8 text-sm font-bold">{title}</h3>
                    <p className="mt-3 text-xs leading-6 text-[#183634]/60">{copy}</p>
                  </article>
                ))}
              </div>
            </div>
            <div className="relative h-[380px] overflow-hidden bg-[#183634] lg:h-[520px]">
              <img
                src="/images/apna-ghar-house.jpg"
                alt="Modern family home"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#183634] to-transparent px-7 pb-7 pt-24 text-[#eee9df]">
                <p className="display-font text-3xl italic">A brighter future, together.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1380px] px-5 py-20 lg:px-10 lg:py-28">
          <SectionLabel>03 / Eligible uses</SectionLabel>
          <h2 className="display-font mt-5 text-5xl leading-none lg:text-6xl">
            What can financing <em>support?</em>
          </h2>
          <div className="mt-12 grid gap-px bg-[#183634]/20 sm:grid-cols-2 lg:grid-cols-4">
            {USES.map(([Icon, title, copy]) => (
              <article
                key={title}
                className="group bg-[#eee9df] p-6 transition-colors hover:bg-[#183634] hover:text-[#eee9df]"
              >
                <Icon size={27} className="text-[#a26e3e]" />
                <h3 className="display-font mt-14 text-2xl">{title}</h3>
                <p className="mt-3 text-xs leading-6 opacity-60">{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#183634] px-5 py-20 text-[#eee9df] lg:px-10 lg:py-28">
          <div className="mx-auto max-w-[1380px]">
            <div className="grid gap-10 lg:grid-cols-[.65fr_1.35fr]">
              <div>
                <SectionLabel light>04 / {company.shortName}&apos;s role</SectionLabel>
                <h2 className="display-font mt-5 text-5xl leading-none lg:text-6xl">
                  Guidance at <em className="text-[#d6a365]">every step.</em>
                </h2>
                <p className="mt-6 max-w-sm text-sm leading-7 text-white/60">
                  We do not provide the loan. We help you navigate the property
                  side of the process and coordinate with relevant parties.
                </p>
              </div>
              <div className="grid gap-px bg-white/20 sm:grid-cols-2 lg:grid-cols-3">
                {STEPS.map(([Icon, title], index) => (
                  <article key={title} className="bg-[#183634] p-6">
                    <div className="flex items-center justify-between">
                      <Icon size={23} className="text-[#d6a365]" />
                      <span className="mono-font text-[10px] text-white/35">0{index + 1}</span>
                    </div>
                    <h3 className="mt-14 text-sm font-semibold leading-6">{title}</h3>
                  </article>
                ))}
              </div>
            </div>
            <div className="mt-16 grid gap-6 border-t border-white/15 pt-9 sm:grid-cols-3">
              {TRUST_POINTS.map(([Icon, title, copy]) => (
                <div key={title} className="flex gap-4">
                  <Icon size={26} className="shrink-0 text-[#d6a365]" />
                  <div>
                    <b className="text-sm">{title}</b>
                    <p className="mt-1 text-xs leading-5 text-white/50">{copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1380px] gap-10 px-5 py-20 lg:grid-cols-[.7fr_1.3fr] lg:px-10 lg:py-28">
          <div>
            <SectionLabel>05 / Common questions</SectionLabel>
            <h2 className="display-font mt-5 text-5xl leading-none">
              Frequently asked <em>questions.</em>
            </h2>
          </div>
          <div className="border-t border-[#183634]/20">
            {FAQS.map(([question, answer]) => (
              <details key={question} className="group border-b border-[#183634]/20 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-sm font-semibold">
                  {question}
                  <Plus
                    size={17}
                    className="shrink-0 text-[#a26e3e] transition-transform group-open:rotate-45"
                  />
                </summary>
                <p className="max-w-2xl pt-4 text-xs leading-6 text-[#183634]/60">{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="bg-[#e3d9c9] px-5 py-16 lg:px-10">
          <div className="mx-auto flex max-w-[1380px] flex-col justify-between gap-7 lg:flex-row lg:items-center">
            <div>
              <SectionLabel>Ready to own your home?</SectionLabel>
              <h2 className="display-font mt-4 text-4xl">
                Take the first step towards a better future.
              </h2>
            </div>
            <a
              href="#apply"
              className="group inline-flex w-fit items-center gap-5 bg-[#183634] px-6 py-4 text-[10px] font-bold uppercase tracking-[.14em] text-[#eee9df]"
            >
              Check My Options
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </section>

        <section className="bg-[#eee9df] px-5 py-8 lg:px-10">
          <div className="mx-auto max-w-[1380px] border-l-2 border-[#a26e3e] pl-5 text-xs leading-6 text-[#183634]/60">
            <b className="text-[#183634]">Important disclaimer</b>
            <p className="mt-1">
              {company.shortName} does not approve or disburse financing. Final
              approval is provided by the relevant lender. Eligibility and
              financing remain subject to assessment, documentation and
              applicable government/SBP rules.
            </p>
          </div>
        </section>
      </main>
    </Shell>
  );
}
