"use client";

import { motion } from "framer-motion";
import { site } from "@/data/site";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";

export default function Tools() {
  return (
    <section id="tools" className="relative border-t border-line py-28 md:py-36" aria-labelledby="tools-title">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionLabel index="02">Toolkit</SectionLabel>
            <Reveal as="h2" text="THE TOOLS" by="char" className="mt-6 font-display text-[clamp(2.1rem,9vw,8.5rem)] font-extrabold leading-[0.85] tracking-tight" />
          </div>
          <p className="max-w-sm shrink-0 text-bone/70">Three apps, one workflow. Cut in Premiere, animate in After Effects, finish the color in Resolve.</p>
        </div>

        <ul className="mt-14 grid gap-4 md:mt-20 md:grid-cols-3 md:gap-5">
          {site.tools.map((t, i) => (
            <motion.li
              key={t.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 1, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex min-h-[440px] flex-col overflow-hidden border border-line bg-ink-2 p-6 transition-colors duration-500 hover:border-accent/60 md:p-8"
              onPointerMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
              }}
            >
              {/* pointer spotlight */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "radial-gradient(400px circle at var(--mx) var(--my), rgb(255 45 45 / 0.12), transparent 60%)" }}
                aria-hidden="true"
              />
              <div className="relative flex items-start justify-between">
                {/* text badge (intentionally NOT the official logo) */}
                <span
                  className="flex size-20 items-center justify-center rounded-full border border-bone/30 font-mono text-2xl font-bold tracking-wider transition-all duration-500 group-hover:rotate-[-8deg] group-hover:border-accent group-hover:bg-accent group-hover:text-ink"
                  aria-hidden="true"
                >
                  {t.badge}
                </span>
                <span className="label-mono text-mute">0{i + 1} / 0{site.tools.length}</span>
              </div>

              <div className="relative mt-auto pt-12">
                <p className="label-mono text-accent">{t.use}</p>
                <h3 className="mt-2 font-display text-3xl font-bold leading-tight">{t.name}</h3>
                <p className="mt-4 text-bone/70">{t.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {t.skills.map((s) => (
                    <li key={s} className="label-mono rounded-full border border-line px-3 py-1 text-bone/70">
                      {s}
                    </li>
                  ))}
                </ul>

                {/* proficiency drawn as a clip on a timeline track */}
                <div className="mt-8">
                  <div className="label-mono mb-2 flex justify-between text-mute">
                    <span>V{i + 1}</span>
                    <span>{t.level}%</span>
                  </div>
                  <div className="relative h-6 overflow-hidden bg-ink-3" aria-hidden="true">
                    <motion.div
                      className="absolute inset-y-0 left-0 border-x border-accent bg-accent/25"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${t.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.6, delay: 0.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="scanlines h-full w-full" />
                    </motion.div>
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
