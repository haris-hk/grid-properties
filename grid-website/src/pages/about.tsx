import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

import { SectionLabel, Shell } from '@/components/layout';
import { company, images } from '@/content/site';

const APPROACH = ['Listen', 'Analyse', 'Advise', 'Support'];

export function About() {
  return (
    <Shell>
      <main id="main" className="pt-28">
        <section className="bg-[#183634] px-5 py-20 text-[#eee9df] lg:px-10 lg:py-28">
          <div className="mx-auto max-w-[1380px]">
            <SectionLabel light>About {company.shortName}</SectionLabel>
            <h1 className="display-font mt-6 max-w-5xl text-6xl leading-[.95] sm:text-8xl">
              Property Decisions.
              <br />
              <em className="text-[#d6a365]">Guided With Purpose.</em>
            </h1>
          </div>
        </section>

        <section className="mx-auto max-w-[1380px] px-5 py-24 lg:px-10 lg:py-36">
          <div className="grid gap-14 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <SectionLabel>01 / Who we are</SectionLabel>
              <h2 className="display-font mt-5 text-5xl">
                A clearer way to <em>move forward.</em>
              </h2>
            </div>
            <div className="grid gap-12 sm:grid-cols-2">
              <div>
                <h3 className="eyebrow text-[#a26e3e]">Vision</h3>
                <p className="mt-4 text-lg leading-8">
                  To make property decisions more considered, informed and
                  purposeful.
                </p>
              </div>
              <div>
                <h3 className="eyebrow text-[#a26e3e]">Mission</h3>
                <p className="mt-4 text-lg leading-8">
                  To connect clients with relevant property opportunities and
                  practical guidance.
                </p>
              </div>
              <div className="sm:col-span-2">
                <h3 className="eyebrow text-[#a26e3e]">What we do</h3>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#183634]/65">
                  {company.shortName} helps clients discover, evaluate and
                  invest in selected real estate opportunities across Pakistan.
                  We work with property buyers, investors, developers and
                  overseas Pakistanis.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#dce5dd] px-5 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-[1380px]">
            <SectionLabel>02 / Our approach</SectionLabel>
            <div className="mt-12 grid gap-px bg-[#183634]/20 sm:grid-cols-2 lg:grid-cols-4">
              {APPROACH.map((item, index) => (
                <div key={item} className="bg-[#dce5dd] p-6">
                  <span className="mono-font text-[#a26e3e]">
                    0{index + 1}
                  </span>
                  <h3 className="display-font mt-20 text-4xl">{item}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1380px] gap-10 px-5 py-24 lg:grid-cols-2 lg:px-10 lg:py-32">
          <div className="h-[430px] overflow-hidden bg-[#183634]">
            <img
              src={images.hero}
              alt="City skyline at dusk"
              loading="lazy"
              className="h-full w-full object-cover opacity-80"
            />
          </div>
          <div className="flex flex-col justify-center">
            <SectionLabel>03 / Overseas Pakistanis</SectionLabel>
            <h2 className="display-font mt-5 text-5xl leading-none">
              Invest in Pakistan From Wherever You Are.
            </h2>
            <p className="mt-7 text-sm leading-7 text-[#183634]/65">
              {company.shortName} supports overseas Pakistanis with property
              discovery, evaluation and advisory guidance — keeping the
              conversation clear across distance.
            </p>
            <Link
              href="/contact"
              data-testid="link-about-contact"
              className="link-line mt-8 inline-flex w-fit items-center gap-3 text-[10px] font-bold uppercase tracking-[.13em]"
            >
              Start a conversation <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      </main>
    </Shell>
  );
}
