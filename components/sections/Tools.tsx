"use client";

import { motion } from "framer-motion";
import { site } from "@/data/site";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";

/** Each card carries its own colour theme: red, paper, darkroom. */
const CARD_THEMES = ["theme-red", "theme-paper", "theme-room"];

export default function Tools() {
  return (
    <section id="tools" data-theme="ink" className="relative py-28 md:py-40" aria-labelledby="tools-title">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionLabel index="02">Toolkit</SectionLabel>
            <Reveal as="h2" text="THE *toolkit*" by="char" className="mt-6 font-display text-[clamp(4rem,14vw,14rem)] leading-[0.82]" />
          </div>
          <p className="max-w-sm shrink-0 text-bone/70">Three apps, one workflow. Cut in Premiere, animate in After Effects, finish the color in Resolve.</p>
        </div>

        <ul className="mt-14 grid gap-4 md:mt-20 md:grid-cols-3 md:gap-5">
          {site.tools.map((t, i) => (
            <motion.li
              key={t.name}
              initial={{ opacity: 0, y: 80, rotate: i === 1 ? 0 : i === 0 ? -2 : 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 1.1, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className={`${CARD_THEMES[i % 3]} group relative flex min-h-[520px] flex-col overflow-hidden rounded-sm bg-ink p-6 transition-transform duration-700 ease-[var(--ease-out-expo)] hover:-translate-y-2 md:p-8`}
              onPointerMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
              }}
            >
              {/* pointer spotlight */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "radial-gradient(420px circle at var(--mx) var(--my), color-mix(in srgb, var(--fg) 9%, transparent), transparent 60%)" }}
                aria-hidden="true"
              />
              <div className="label-mono relative flex items-center justify-between">
                <span className="text-accent">● {t.use}</span>
                <span className="text-mute">
                  0{i + 1} / 0{site.tools.length}
                </span>
              </div>

              {/* giant text badge (intentionally NOT the official logo) */}
              <span
                className="relative mt-4 block font-display text-[clamp(8rem,15vw,14rem)] leading-[0.8] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-1 group-hover:scale-[1.03] origin-bottom-left"
                aria-hidden="true"
              >
                {t.badge}
              </span>

              <div className="relative mt-auto pt-8">
                <h3 className="font-display text-4xl leading-none">{t.name}</h3>
                <p className="mt-4 text-bone/75">{t.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {t.skills.map((s) => (
                    <li key={s} className="label-mono rounded-full border border-bone/25 px-3 py-1 text-bone/80">
                      {s}
                    </li>
                  ))}
                </ul>

                {/* proficiency drawn as a clip on a timeline track */}
                <div className="mt-8">
                  <div className="label-mono mb-2 flex justify-between text-bone/70">
                    <span>V{i + 1} · TRACK</span>
                    <span>{t.level}%</span>
                  </div>
                  <div className="relative h-7 overflow-hidden bg-bone/10" aria-hidden="true">
                    <motion.div
                      className="absolute inset-y-0 left-0 border-x-2 border-bone bg-bone/85"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${t.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.6, delay: 0.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
