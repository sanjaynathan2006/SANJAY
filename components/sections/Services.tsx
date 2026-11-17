"use client";

import { site } from "@/data/site";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";
import FadeIn from "@/components/ui/FadeIn";

export default function Services() {
  return (
    <section id="services" className="relative border-t border-line py-28 md:py-36" aria-labelledby="services-title">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionLabel index="03">Services</SectionLabel>
            <h2 id="services-title" aria-label="What I edit" className="mt-6 font-display text-[clamp(2.1rem,9vw,8.5rem)] font-extrabold leading-[0.85] tracking-tight">
              <Reveal as="span" text="WHAT I" by="char" className="block" />
              <Reveal as="span" text="EDIT" by="char" delay={0.15} className="block text-outline" />
            </h2>
          </div>
          <p className="max-w-sm shrink-0 text-bone/70">From 15-second hooks to full-length films. Every format, every platform, cut with intent.</p>
        </div>

        <ul className="mt-14 border-t border-line md:mt-20">
          {site.services.map((s, i) => (
            <FadeIn as="li" key={s.title} delay={(i % 5) * 0.04} y={16} className="group relative overflow-hidden border-b border-line">
                {/* accent wipe on hover */}
                <span
                  className="absolute inset-0 origin-bottom scale-y-0 bg-accent transition-transform duration-500 ease-[var(--ease-cine)] group-hover:scale-y-100"
                  aria-hidden="true"
                />
                <div className="relative grid grid-cols-[3rem_1fr_auto] items-center gap-3 py-5 transition-colors duration-300 group-hover:text-ink md:grid-cols-[5rem_1fr_minmax(0,22rem)_3rem] md:gap-6 md:py-7">
                  <span className="label-mono text-accent transition-colors group-hover:text-ink">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-display text-xl font-bold uppercase leading-tight tracking-tight transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-2 sm:text-3xl md:text-5xl">
                    {s.title}
                  </h3>
                  <p className="hidden text-sm text-bone/60 transition-colors group-hover:text-ink/80 md:block">{s.detail}</p>
                  <span className="justify-self-end text-xl transition-transform duration-500 group-hover:-rotate-45" aria-hidden="true">
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
