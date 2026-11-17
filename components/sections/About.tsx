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
import { tokenize } from "@/lib/emphasis";

export default function About() {
  const statement = useRef<HTMLParagraphElement>(null);
  const photo = useRef<HTMLDivElement>(null);
  const { about } = site;

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // words light up as you scroll through the statement
      // accent words stay fully lit; the rest brighten from 45%
      const words = statement.current?.querySelectorAll("[data-dim]");
      if (words?.length) {
        gsap.fromTo(
          words,
          { opacity: 0.45 },
          { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: statement.current, start: "top 80%", end: "bottom 50%", scrub: true } },
        );
      }
      // portrait parallax
      gsap.fromTo(photo.current, { yPercent: -8 }, { yPercent: 8, ease: "none", scrollTrigger: { trigger: photo.current, scrub: true } });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="about" data-theme="paper" className="relative py-28 md:py-44" aria-labelledby="about-title">
      <div className="container-x">
        <SectionLabel index="01">About</SectionLabel>
        <h2 id="about-title" className="sr-only">
          About {site.name}
        </h2>

        <p
          ref={statement}
          className="mt-10 font-display text-[clamp(2.6rem,7.4vw,8.5rem)] leading-[0.92] md:mt-14"
        >
          <span className="sr-only">{about.statement.replace(/\*/g, "")}</span>
          {tokenize(about.statement).map((t, i) => (
            <span key={i} data-w aria-hidden="true" className={`inline-block pr-[0.22em] ${t.em ? "accent-serif text-accent" : ""}`} {...(t.em ? {} : { "data-dim": true })}>
              {t.word}
            </span>
          ))}
        </p>

        <div className="mt-20 grid gap-12 md:mt-32 md:grid-cols-12 md:gap-10">
          <FadeIn className="md:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-black">
              <div ref={photo} className="absolute -inset-y-[10%] inset-x-0">
                {about.photo ? (
                  <Image src={about.photo} alt={`Portrait of ${site.name}`} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
                ) : (
                  <Placeholder ratio="9:16" title="Portrait" note="Your photo (4:5) · set about.photo in data/site.ts" seed={3} />
                )}
              </div>
              <div className="theme-ink">
                <FrameMarkers />
                <span className="label-mono absolute bottom-4 left-4 flex items-center gap-2 text-bone/80">
                  <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" /> CAM A · 50mm
                </span>
              </div>
            </div>
          </FadeIn>

          <div className="flex flex-col justify-between gap-14 md:col-span-6 md:col-start-7">
            <div className="space-y-6 text-lg leading-relaxed text-bone/80 md:text-xl">
              {about.bio.map((p, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <p>{p}</p>
                </FadeIn>
              ))}
            </div>

            <dl className="grid grid-cols-3 border-t border-bone">
              {about.stats.map((s, i) => (
                <FadeIn key={s.label} delay={i * 0.1} className={`flex flex-col-reverse pt-6 ${i > 0 ? "border-l border-line pl-4 md:pl-6" : ""}`}>
                  <dt className="label-mono mt-3 text-mute">{s.label}</dt>
                  <dd className="font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.85]">
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
