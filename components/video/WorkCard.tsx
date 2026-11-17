"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Project } from "@/data/projects";
import { previewFor, ratioCss, thumbnailFor } from "@/lib/video";
import { durationToTC } from "@/lib/timecode";
import { useFinePointer } from "@/lib/hooks";
import TransitionLink from "@/components/ui/TransitionLink";
import Placeholder from "./Placeholder";
import { useVideoModal } from "./VideoModal";

export default function WorkCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  const p = project;
  const { open } = useVideoModal();
  const fine = useFinePointer();
  const [hover, setHover] = useState(false);
  const [playing, setPlaying] = useState(false);
  const vid = useRef<HTMLVideoElement>(null);
  const thumb = thumbnailFor(p);
  const preview = previewFor(p);

  const openPlayer = () =>
    open({
      type: p.videoType,
      src: p.videoSrc,
      poster: thumb,
      title: p.title,
      ratio: p.aspectRatio,
      href: `/work/${p.slug}`,
      meta: `${p.category} · ${p.duration} · ${p.year}`,
    });

  return (
    <article className="group">
      <button
        type="button"
        data-cursor="play"
        onClick={openPlayer}
        onPointerEnter={() => fine && setHover(true)}
        onPointerLeave={() => {
          setHover(false);
          setPlaying(false);
        }}
        className="theme-ink relative block w-full overflow-hidden rounded-sm bg-black text-left"
        style={{ aspectRatio: ratioCss(p.aspectRatio) }}
        aria-label={`Play ${p.title} (${p.category}, ${p.duration})`}
      >
        <div className="absolute inset-0 transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]">
          {thumb ? (
            <Image
              src={thumb}
              alt=""
              fill
              priority={priority}
              sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <Placeholder ratio={p.aspectRatio} title={p.title} seed={p.id} active={hover && !preview} />
          )}

          {/* hover preview: mounted only while hovered (desktop) so nothing loads until needed */}
          {hover && preview && (
            <video
              ref={vid}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${playing ? "opacity-100" : "opacity-0"}`}
              src={preview}
              muted
              loop
              playsInline
              autoPlay
              preload="none"
              onPlaying={() => setPlaying(true)}
              aria-hidden="true"
            />
          )}
        </div>

        {/* HUD overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/30 opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="label-mono absolute left-3 top-3 rounded-sm bg-ink/70 px-2 py-1 backdrop-blur-sm">{p.category}</span>
        <span className="label-mono absolute right-3 top-3 flex items-center gap-1.5 text-bone/90">
          <span className={`size-1.5 rounded-full ${hover ? "bg-accent animate-rec" : "bg-bone/50"}`} aria-hidden="true" />
          {p.aspectRatio}
        </span>
        <span className="absolute bottom-3 right-3 font-mono text-[11px] tabular-nums text-bone/80">{durationToTC(p.duration)}</span>
        <span
          className="absolute bottom-3 left-3 flex size-11 items-center justify-center rounded-full bg-accent text-xs text-on-accent transition-transform duration-500 group-hover:scale-110 md:scale-0"
          aria-hidden="true"
        >
          ▶
        </span>
      </button>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-3xl leading-none md:text-4xl">
            <TransitionLink href={`/work/${p.slug}`} data-cursor="view" className="bg-gradient-to-r from-accent to-accent bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_2px]">
              {p.title}
            </TransitionLink>
          </h3>
          <p className="label-mono mt-2 text-mute">
            {p.category} · {p.client} · {p.year}
          </p>
        </div>
        <span className="label-mono shrink-0 pt-1 text-bone/70">{p.duration}</span>
      </div>
      <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Software used">
        {p.software.map((s) => (
          <li key={s} className="label-mono rounded-full border border-line px-2.5 py-1 text-[10px] text-bone/60">
            {s}
          </li>
        ))}
      </ul>
    </article>
  );
}
