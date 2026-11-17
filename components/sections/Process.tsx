"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";
import { gsap } from "@/lib/gsap";

/** Deterministic fake audio waveform */
const wave = (seed: number, n = 48) =>
  Array.from({ length: n }, (_, i) => 0.2 + Math.abs(Math.sin(i * 0.7 + seed * 1.9) * Math.cos(i * 0.23 + seed)) * 0.8);

export default function Process() {
  const section = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const steps = site.process;

  // Desktop: pin the section and scrub the timeline horizontally under a fixed playhead
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const t = track.current!;
      const vp = viewport.current!;
      const distance = () => t.scrollWidth - vp.clientWidth * 0.62;
      gsap.to(t, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => setActive(Math.min(steps.length - 1, Math.floor(self.progress * steps.length))),
        },
      });
    });
    return () => mm.revert();
  }, [steps.length]);

  // Wrapper div keeps React's DOM intact when GSAP inserts its pin-spacer
  return (
    <div>
    <section ref={section} id="process" className="relative overflow-hidden border-t border-line bg-ink py-28 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-0" aria-labelledby="process-title">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionLabel index="05">Process</SectionLabel>
            <Reveal as="h2" text="THE CUT" by="char" className="mt-6 font-display text-[clamp(2.1rem,9vw,8rem)] font-extrabold leading-[0.85] tracking-tight" />
          </div>
          <p className="max-w-sm shrink-0 text-bone/70">Five passes on the timeline, from first conversation to final export.</p>
        </div>
      </div>

      {/* Timeline */}
      <div ref={viewport} className="relative mt-12 lg:mt-16">
        {/* fixed playhead (desktop) */}
        <div className="pointer-events-none absolute bottom-0 left-[32%] top-0 z-20 hidden w-px bg-accent lg:block" aria-hidden="true">
          <span className="absolute -left-[7px] -top-1 block size-0 border-x-[7px] border-t-[10px] border-x-transparent border-t-accent" />
          <span className="label-mono absolute left-3 top-0 whitespace-nowrap rounded-sm bg-accent px-1.5 py-0.5 text-ink">{steps[active].tc}</span>
        </div>

        <div ref={track} className="container-x lg:w-max lg:max-w-none lg:pl-[32vw] lg:pr-[10vw]">
          {/* ruler (desktop) */}
          <div className="relative mb-3 hidden h-6 border-b border-line lg:block" aria-hidden="true">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(to_right,rgb(237_233_227/0.25)_0_1px,transparent_1px_24px)] [mask-image:linear-gradient(to_top,black_40%,transparent_40%)]" />
            <div className="absolute inset-0 bg-[repeating-linear-gradient(to_right,rgb(237_233_227/0.5)_0_1px,transparent_1px_120px)]" />
          </div>

          <ol className="relative flex flex-col gap-4 border-l border-line pl-6 lg:flex-row lg:gap-3 lg:border-l-0 lg:pl-0">
            {steps.map((s, i) => {
              const on = i === active;
              return (
                <li key={s.title} className="relative lg:w-[38vw] lg:max-w-[560px]">
                  {/* mobile track dot */}
                  <span className="absolute -left-[29px] top-6 size-2.5 rounded-full bg-accent lg:hidden" aria-hidden="true" />
                  <div className="label-mono mb-2 flex items-center justify-between text-mute">
                    <span>V1 · CLIP {String(i + 1).padStart(2, "0")}</span>
                    <span className="tabular-nums">{s.tc}</span>
                  </div>
                  {/* video clip */}
                  <div
                    className={`relative overflow-hidden border p-6 transition-colors duration-500 md:p-8 ${
                      on ? "border-accent bg-accent/10 lg:bg-accent/15" : "border-line bg-ink-2"
                    }`}
                  >
                    <span className={`absolute inset-x-0 top-0 h-1 transition-colors duration-500 ${on ? "bg-accent" : "bg-bone/15"}`} aria-hidden="true" />
                    {/* decorative number drawn with CSS content (ignored by screen readers & contrast checks) */}
                    <span
                      data-n={String(i + 1).padStart(2, "0")}
                      className="block font-display text-6xl font-extrabold leading-none text-bone/10 before:content-[attr(data-n)] md:text-8xl"
                      aria-hidden="true"
                    />
                    <h3 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight md:text-5xl">{s.title}</h3>
                    <p className="mt-4 max-w-md text-bone/70">{s.detail}</p>
                  </div>
                  {/* audio clip */}
                  <div className="mt-1 flex h-12 items-center gap-[3px] overflow-hidden border border-line bg-ink-2 px-2" aria-hidden="true">
                    <span className="label-mono mr-2 text-[9px] text-mute">A1</span>
                    {wave(i).map((h, k) => (
                      <span key={k} className={`w-[3px] shrink-0 rounded-full transition-colors duration-500 ${on ? "bg-accent/80" : "bg-bone/25"}`} style={{ height: `${h * 80}%` }} />
                    ))}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
    </div>
  );
}
