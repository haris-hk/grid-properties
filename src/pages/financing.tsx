import { SectionLabel, Shell } from '@/components/layout';
import { InquiryForm, financingFields } from '@/components/inquiry-form';
import { company } from '@/content/site';

const PROGRAM_FACTS: Array<[string, string]> = [
  ['Up to', 'PKR 10 Million Financing'],
  ['Customer pricing', '5% Fixed Customer Pricing'],
  ['House', 'Up to 10 Marla / 2720 sq ft'],
  ['Flat', 'Up to 1500 sq ft'],
  ['Tenure', 'Up to 30 Years'],
  ['Financing', 'Subject to lender assessment'],
];

const FINANCEABLE = ['House', 'Apartment', 'Plot + Construction', 'Construction'];

const PROCESS = [
  'Understand Requirement',
  'Identify Suitable Properties',
  'Explain Options',
  'Coordinate Relevant Parties',
  'Documentation Guidance',
  'Transaction Support',
];

export function Financing() {
  return (
    <Shell>
      <main id="main" className="pt-28">
        <section className="bg-[#b7cbbd] px-5 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto grid max-w-[1380px] gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
            <div>
              <SectionLabel>Wazir-e-Azam Apna Ghar Program</SectionLabel>
              <h1 className="display-font mt-6 max-w-4xl text-7xl leading-[.9] sm:text-[9rem]">
                Ghar Ho Tu
                <br />
                <em className="text-[#a26e3e]">Apna.</em>
              </h1>
            </div>
            <p className="max-w-sm text-sm leading-7 text-[#183634]/65">
              Property guidance for a government housing finance program.{' '}
              {company.shortName} is not the lender.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[1380px] px-5 py-20 lg:px-10 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <SectionLabel>01 / Program overview</SectionLabel>
              <h2 className="display-font mt-5 text-5xl">
                Understand your <em>options.</em>
              </h2>
              <p className="mt-7 text-sm leading-7 text-[#183634]/65">
                The Wazir-e-Azam Apna Ghar Program is presented here using the
                information available to {company.shortName}. Confirm current
                eligibility, terms and rules with the relevant lender and
                official sources.
              </p>
              <div className="mt-8 border-l-2 border-[#a26e3e] pl-5">
                <h3 className="eyebrow text-[#a26e3e]">Eligibility</h3>
                <p className="mt-3 text-sm leading-6 text-[#183634]/65">
                  Eligibility remains subject to applicable assessment,
                  documentation and government/SBP rules. Confirm the current
                  criteria with the relevant lender.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-px bg-[#183634]/20 sm:grid-cols-3">
              {PROGRAM_FACTS.map(([label, value]) => (
                <div key={label} className="bg-[#eee9df] p-6">
                  <span className="eyebrow text-[#a26e3e]">{label}</span>
                  <p className="mt-8 text-sm font-semibold leading-5">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#183634] px-5 py-20 text-[#eee9df] lg:px-10 lg:py-28">
          <div className="mx-auto max-w-[1380px]">
            <SectionLabel light>02 / What can be financed</SectionLabel>
            <div className="mt-10 grid gap-px bg-white/20 sm:grid-cols-2 lg:grid-cols-4">
              {FINANCEABLE.map((item, index) => (
                <div key={item} className="bg-[#183634] p-7">
                  <span className="mono-font text-[#d6a365]">0{index + 1}</span>
                  <h3 className="display-font mt-16 text-3xl">{item}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1380px] px-5 py-20 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[.65fr_1.35fr]">
            <div>
              <SectionLabel>03 / How {company.shortName} helps</SectionLabel>
              <h2 className="display-font mt-5 text-5xl">
                A guided <em>process.</em>
              </h2>
            </div>
            <div className="grid border-t border-[#183634]/20 sm:grid-cols-2">
              {PROCESS.map((step, index) => (
                <div
                  key={step}
                  className="border-b border-[#183634]/20 py-6 pr-4"
                >
                  <span className="mono-font text-xs text-[#a26e3e]">
                    0{index + 1}
                  </span>
                  <p className="mt-4 text-sm font-semibold">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#e3d9c9] px-5 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto grid max-w-[1380px] gap-12 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <SectionLabel>04 / Financing inquiry</SectionLabel>
              <h2 className="display-font mt-5 text-5xl">
                Check my <em>options.</em>
              </h2>
              <p className="mt-6 max-w-sm text-xs leading-6 text-[#183634]/60">
                Please do not send your CNIC, salary slips or any other
                identity documents through this form. An advisor will tell you
                what is needed and how to share it securely.
              </p>
            </div>
            <div>
              <InquiryForm
                formType="Home financing inquiry"
                fields={financingFields}
                submitLabel="Check My Options"
              />
              <div className="mt-8 border-l-2 border-[#a26e3e] pl-5 text-xs leading-6 text-[#183634]/65">
                <b className="text-[#183634]">Important disclaimer</b>
                <p className="mt-2">
                  {company.shortName} does not approve financing.{' '}
                  {company.shortName} does not disburse financing. Final
                  financing approval is provided by the relevant lender.
                  Eligibility and financing remain subject to applicable
                  assessment, documentation and government/SBP rules.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Shell>
  );
}
