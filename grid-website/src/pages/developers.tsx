import { ButtonLink, SectionLabel, Shell } from '@/components/layout';
import { company, images } from '@/content/site';

const STEPS: Array<[string, string]> = [
  ['Understand', 'Start with the brief and the decision behind it.'],
  ['Compare', 'See relevant project information in context.'],
  ['Proceed', 'Move forward with a clearer next step.'],
];

export function Developers() {
  return (
    <Shell>
      <main id="main" className="pt-28">
        <section className="bg-[#183634] px-5 py-20 text-[#eee9df] lg:px-10 lg:py-28">
          <div className="mx-auto max-w-[1380px]">
            <SectionLabel light>Developer network</SectionLabel>
            <h1 className="display-font mt-6 max-w-4xl text-6xl leading-[.95] sm:text-8xl">
              The right project.
              <br />
              <em className="text-[#d6a365]">The right context.</em>
            </h1>
          </div>
        </section>

        <section className="mx-auto max-w-[1380px] px-5 py-20 lg:px-10 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr]">
            <div>
              <SectionLabel>01 / Featured developer</SectionLabel>
              <div className="mt-8 flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center border border-[#a26e3e] font-serif text-2xl text-[#a26e3e]">
                  E
                </span>
                <span className="text-lg font-semibold tracking-wide">
                  Emaar Pakistan
                </span>
              </div>
              <p className="mt-7 max-w-sm text-sm leading-7 text-[#183634]/65">
                {company.shortName} is an {company.partnerLine}.
              </p>
              <div className="mt-7">
                <ButtonLink href="/contact">Discuss a Project</ButtonLink>
              </div>
            </div>

            <div className="relative min-h-[460px] overflow-hidden bg-[#183634]">
              <img
                src={images.waterfront}
                alt="Waterfront residential development"
                loading="lazy"
                className="img-lift absolute inset-0 h-full w-full object-cover opacity-75"
              />
              <div className="absolute inset-0 bg-[#183634]/35" />
              <div className="absolute bottom-8 left-8 text-[#eee9df]">
                <p className="eyebrow text-[#d6a365]">Emaar Pakistan</p>
                <h2 className="display-font mt-3 text-5xl">
                  Premium waterfront
                  <br />
                  <em className="text-[#d6a365]">living in Karachi.</em>
                </h2>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#dce5dd] px-5 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-[1380px]">
            <SectionLabel>02 / Work with {company.shortName}</SectionLabel>
            <div className="mt-10 grid gap-px bg-[#183634]/20 md:grid-cols-3">
              {STEPS.map(([title, body], index) => (
                <div key={title} className="bg-[#dce5dd] p-7">
                  <span className="mono-font text-[#a26e3e]">
                    0{index + 1}
                  </span>
                  <h3 className="display-font mt-14 text-3xl">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#183634]/60">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Shell>
  );
}
