"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { projects } from "@/data/projects";
import { ratioCss, ratioNumber, thumbnailFor } from "@/lib/video";
import { durationToTC } from "@/lib/timecode";
import Reveal from "@/components/ui/Reveal";
import FadeIn from "@/components/ui/FadeIn";
import FrameMarkers from "@/components/ui/FrameMarkers";
import TransitionLink from "@/components/ui/TransitionLink";
import VideoPlayer from "@/components/video/VideoPlayer";
import Placeholder from "@/components/video/Placeholder";
import BeforeAfter from "@/components/video/BeforeAfter";

/** Poster first: the real player (and any iframe) only loads after a click. */
function PosterPlayer({ p }: { p: Project }) {
  const [playing, setPlaying] = useState(false);
  const thumb = thumbnailFor(p);
  const r = ratioNumber(p.aspectRatio);
  return (
    <div
      className="relative mx-auto overflow-hidden bg-black"
      style={{ aspectRatio: ratioCss(p.aspectRatio), width: r < 1 ? `min(100%, calc(80svh * ${r}))` : r === 1 ? "min(100%, 80svh)" : "100%" }}
    >
      {playing ? (
        <VideoPlayer type={p.videoType} src={p.videoSrc} poster={thumb} title={p.title} ratio={p.aspectRatio} />
      ) : (
        <button type="button" data-cursor="play" onClick={() => setPlaying(true)} className="group absolute inset-0" aria-label={`Play ${p.title}`}>
          {thumb ? (
            <Image src={thumb} alt="" fill priority sizes="(min-width: 1024px) 80vw, 100vw" className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.03]" />
          ) : (
            <Placeholder ratio={p.aspectRatio} title={p.title} seed={p.id} />
          )}
          <span className="absolute left-1/2 top-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-bone text-xl text-ink transition-transform duration-500 group-hover:scale-110 md:size-24">
            ▶
          </span>
          <FrameMarkers />
        </button>
      )}
    </div>
  );
}

export default function ProjectView({ project: p, next, index }: { project: Project; next: Project; index: number }) {
  const meta = [
    { k: "Client", v: p.client },
    { k: "Year", v: String(p.year) },
    { k: "Category", v: p.category },
    { k: "Runtime", v: durationToTC(p.duration) },
    { k: "Format", v: p.aspectRatio },
    { k: "Software", v: p.software.join(", ") },
  ];

  return (
    <article className="pb-10 pt-28 md:pt-36">
      <div className="container-x">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex items-center justify-between">
          <TransitionLink href="/#work" className="label-mono group flex items-center gap-2 text-mute hover:text-bone">
            <span className="transition-transform group-hover:-translate-x-1" aria-hidden="true">←</span> All work
          </TransitionLink>
          <span className="label-mono text-mute">
            Project {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
        </motion.div>

        <p className="label-mono mt-12 text-accent">{p.category}</p>
        <Reveal as="h1" text={p.title.toUpperCase()} by="word" onLoad delay={0.1} className="mt-4 max-w-[16ch] break-words font-display text-[clamp(1.6rem,8vw,8.5rem)] font-extrabold leading-[0.88] tracking-tight" />
      </div>

      <FadeIn className="container-x mt-12 md:mt-16" delay={0.2}>
        <PosterPlayer p={p} />
      </FadeIn>

      <div className="container-x mt-16 grid gap-12 md:mt-24 md:grid-cols-12">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-6 self-start md:col-span-4">
          {meta.map((m) => (
            <div key={m.k} className="border-t border-line pt-3">
              <dt className="label-mono text-mute">{m.k}</dt>
              <dd className="mt-1 text-bone">{m.v}</dd>
            </div>
          ))}
        </dl>
        <FadeIn className="md:col-span-7 md:col-start-6">
          <p className="label-mono text-mute">About the project</p>
          <p className="mt-4 font-display text-2xl font-semibold leading-snug md:text-4xl">{p.description}</p>
        </FadeIn>
      </div>

      {p.beforeAfter && (
        <div className="container-x mt-20 md:mt-28">
          <p className="label-mono mb-4 text-accent">Before / After: drag to compare</p>
          <BeforeAfter before={p.beforeAfter.before} after={p.beforeAfter.after} ratio={p.aspectRatio} title={p.title} />
        </div>
      )}

      {/* Next project */}
      <TransitionLink href={`/work/${next.slug}`} data-cursor="view" className="group mt-28 block border-y border-line md:mt-40">
        <div className="container-x flex flex-col gap-4 py-14 md:flex-row md:items-end md:justify-between md:py-20">
          <div>
            <p className="label-mono text-mute">Next project →</p>
            <p className="mt-3 font-display text-[clamp(2.5rem,8vw,7.5rem)] font-extrabold uppercase leading-[0.9] tracking-tight transition-colors duration-500 group-hover:text-accent">
              {next.title}
            </p>
          </div>
          <p className="label-mono text-mute">
            {next.category} · {next.duration}
          </p>
        </div>
      </TransitionLink>
    </article>
  );
}
