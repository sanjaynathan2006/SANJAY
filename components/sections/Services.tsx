"use client";

import { site } from "@/data/site";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";
import FadeIn from "@/components/ui/FadeIn";

export default function Services() {
  return (
    <section id="services" data-theme="red" className="relative py-28 md:py-40" aria-labelledby="services-title">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionLabel index="03">Services</SectionLabel>
            <h2 id="services-title" aria-label="What I edit" className="mt-6 font-display text-[clamp(4rem,14vw,14rem)] leading-[0.82]">
              <Reveal as="span" text="WHAT I *edit*" by="char" className="block" />
            </h2>
          </div>
          <p className="max-w-sm shrink-0 text-bone/70">From 15-second hooks to full-length films. Every format, every platform, cut with intent.</p>
        </div>

        <ul className="mt-14 border-t border-bone md:mt-20">
          {site.services.map((s, i) => (
            <FadeIn as="li" key={s.title} delay={(i % 5) * 0.04} y={16} className="group relative overflow-hidden border-b border-bone/30">
                {/* accent wipe on hover */}
                <span
                  className="absolute inset-0 origin-bottom scale-y-0 bg-bone transition-transform duration-500 ease-[var(--ease-cine)] group-hover:scale-y-100"
                  aria-hidden="true"
                />
                <div className="relative grid grid-cols-[3rem_1fr_auto] items-center gap-3 py-4 transition-colors duration-300 group-hover:text-ink md:grid-cols-[5rem_1fr_minmax(0,22rem)_3rem] md:gap-6 md:py-5">
                  <span className="label-mono text-bone transition-colors group-hover:text-ink">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-display text-[clamp(1.9rem,5.4vw,5.2rem)] leading-[0.95] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-3">
                    {s.title}
                  </h3>
                  <p className="hidden text-sm text-bone/75 transition-colors group-hover:text-ink/80 md:block">{s.detail}</p>
                  <span className="justify-self-end text-2xl transition-transform duration-500 group-hover:-rotate-45 md:text-4xl" aria-hidden="true">
                    →
                  </span>
                </div>
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  );
}
