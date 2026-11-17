"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { site } from "@/data/site";
import SectionLabel from "@/components/ui/SectionLabel";
import FrameMarkers from "@/components/ui/FrameMarkers";
import FadeIn from "@/components/ui/FadeIn";
import CountUp from "@/components/ui/CountUp";
import Placeholder from "@/components/video/Placeholder";
import { gsap } from "@/lib/gsap";

export default function About() {
  const statement = useRef<HTMLParagraphElement>(null);
  const { about } = site;

  // Words light up as you scroll through the statement
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const words = statement.current?.querySelectorAll("[data-w]");
      if (!words?.length) return;
      gsap.fromTo(
        words,
        { opacity: 0.42 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: statement.current, start: "top 80%", end: "bottom 45%", scrub: true },
        },
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="about" className="relative py-28 md:py-40" aria-labelledby="about-title">
      <div className="container-x">
        <SectionLabel index="01">About</SectionLabel>
        <h2 id="about-title" className="sr-only">
          About {site.name}
        </h2>

        <p ref={statement} className="mt-10 max-w-[22ch] font-display text-[clamp(2rem,5.4vw,5.5rem)] font-bold leading-[1.02] tracking-tight md:mt-14">
          {about.statement.split(" ").map((w, i) => (
            <span key={i} data-w className="inline-block pr-[0.25em]">
              {w}
            </span>
          ))}
        </p>

        <div className="mt-20 grid gap-12 md:mt-28 md:grid-cols-12 md:gap-10">
          <FadeIn className="md:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink-3">
              {about.photo ? (
                <Image src={about.photo} alt={`Portrait of ${site.name}`} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
              ) : (
                <Placeholder ratio="9:16" title="Portrait" note="Your photo (4:5) · set about.photo in data/site.ts" seed={3} />
              )}
              <FrameMarkers />
              <span className="label-mono absolute bottom-4 left-4 flex items-center gap-2 text-bone/80">
                <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" /> CAM A · 50mm
              </span>
            </div>
          </FadeIn>

          <div className="flex flex-col justify-between gap-12 md:col-span-6 md:col-start-7">
            <div className="space-y-6 text-lg leading-relaxed text-bone/80 md:text-xl">
              {about.bio.map((p, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <p>{p}</p>
                </FadeIn>
              ))}
            </div>

            <dl className="grid grid-cols-3 border-t border-line">
              {about.stats.map((s, i) => (
                <FadeIn key={s.label} delay={i * 0.1} className={`flex flex-col-reverse pt-6 ${i > 0 ? "border-l border-line pl-4 md:pl-6" : ""}`}>
                  <dt className="label-mono mt-2 text-mute">{s.label}</dt>
                  <dd className="font-display text-[clamp(1.9rem,9vw,4.5rem)] font-extrabold tracking-tight">
                    <CountUp to={s.value} suffix={s.suffix} />
                  </dd>
                </FadeIn>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
