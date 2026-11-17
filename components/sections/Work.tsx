"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { categories, projects, type Category } from "@/data/projects";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";
import FadeIn from "@/components/ui/FadeIn";
import WorkCard from "@/components/video/WorkCard";
import BeforeAfter from "@/components/video/BeforeAfter";
import TransitionLink from "@/components/ui/TransitionLink";

type Filter = "All" | Category;

export default function Work() {
  const [filter, setFilter] = useState<Filter>("All");

  const filters = useMemo<Filter[]>(() => ["All", ...categories.filter((c) => projects.some((p) => p.category === c))], []);
  const counts = useMemo(() => {
    const m: Record<string, number> = { All: projects.length };
    projects.forEach((p) => (m[p.category] = (m[p.category] ?? 0) + 1));
    return m;
  }, []);
  const visible = useMemo(
    () => (filter === "All" ? [...projects].sort((a, b) => Number(!!b.featured) - Number(!!a.featured)) : projects.filter((p) => p.category === filter)),
    [filter],
  );
  const graded = projects.find((p) => p.beforeAfter);

  return (
    <section id="work" data-theme="ink" className="relative py-28 md:py-40" aria-labelledby="work-title">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionLabel index="04">Portfolio</SectionLabel>
            <h2 id="work-title" aria-label="Selected work" className="mt-6 font-display text-[clamp(4rem,14vw,14rem)] leading-[0.82]">
              <span className="flex items-start gap-3">
                <Reveal as="span" text="SELECTED *work*" by="char" className="block" />
                <sup className="label-mono mt-[0.5em] text-accent">({String(projects.length).padStart(2, "0")})</sup>
              </span>
            </h2>
          </div>
          <p className="max-w-sm shrink-0 text-bone/70">Hover to preview, click to play. Every project has its own page with the full breakdown.</p>
        </div>

        {/* Filters */}
        <LayoutGroup>
          <div className="mt-12 flex flex-wrap gap-2 md:mt-16" role="group" aria-label="Filter projects by category">
            {filters.map((f) => {
              const active = f === filter;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  aria-pressed={active}
                  className={`label-mono relative rounded-full border px-4 py-2.5 transition-colors duration-300 ${
                    active ? "border-accent text-on-accent" : "border-line text-bone/70 hover:border-bone/50 hover:text-bone"
                  }`}
                >
                  {active && <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-accent" transition={{ type: "spring", stiffness: 400, damping: 35 }} />}
                  <span className="relative">
                    {f} <span className={active ? "text-on-accent/80" : "text-mute"}>{counts[f]}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        {/* Masonry grid: 16:9, 9:16 and 1:1 all keep their real proportions */}
        <div className="mt-10 columns-1 gap-5 sm:columns-2 xl:columns-3 [&>*]:mb-12">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((p, i) => (
              <motion.div
                key={p.id}
                className="break-inside-avoid"
                initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.25 } }}
                transition={{ duration: 0.7, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <WorkCard project={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Color grading: drag to compare */}
        {graded && (
          <div className="mt-16 grid items-center gap-10 border-t border-line pt-16 md:mt-24 md:grid-cols-12 md:pt-24">
            <FadeIn className="md:col-span-4">
              <p className="label-mono text-accent">Color grading · Before / After</p>
              <h3 className="mt-4 font-display text-[clamp(3rem,6vw,6rem)] leading-[0.88]">DRAG TO <em className="accent-serif text-accent">compare</em></h3>
              <p className="mt-5 text-bone/70">Flat LOG footage on the left, the final grade on the right. Drag the handle (or use the arrow keys) to see the difference.</p>
              <TransitionLink href={`/work/${graded.slug}`} data-cursor="view" className="label-mono mt-8 inline-flex items-center gap-2 border-b border-accent pb-1 text-bone hover:text-accent">
                {graded.title} →
              </TransitionLink>
            </FadeIn>
            <FadeIn className="md:col-span-8" delay={0.1}>
              <BeforeAfter before={graded.beforeAfter?.before} after={graded.beforeAfter?.after} ratio="16:9" title={graded.title} />
            </FadeIn>
          </div>
        )}
      </div>
    </section>
  );
}
