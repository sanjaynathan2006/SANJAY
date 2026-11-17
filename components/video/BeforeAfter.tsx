"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import type { AspectRatio } from "@/data/projects";
import { ratioCss } from "@/lib/video";

/** Drag-to-compare slider for color grading. Leave images "" to show a simulated LOG → graded placeholder. */
export default function BeforeAfter({
  before,
  after,
  ratio = "16:9",
  title = "Color grade",
  className = "",
}: {
  before?: string;
  after?: string;
  ratio?: AspectRatio;
  title?: string;
  className?: string;
}) {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  const scene = (graded: boolean) => (
    <div
      className="absolute inset-0"
      style={{
        background: graded
          ? "radial-gradient(60% 50% at 70% 35%, #ffb36b 0%, transparent 60%), linear-gradient(180deg, #0d3b4a 0%, #135566 38%, #d9824a 62%, #2b1610 100%)"
          : "radial-gradient(60% 50% at 70% 35%, #b9b3aa 0%, transparent 60%), linear-gradient(180deg, #5b6366 0%, #6d7577 38%, #8f8a83 62%, #4a4744 100%)",
        filter: graded ? "saturate(1.15) contrast(1.1)" : "saturate(0.5) contrast(0.75)",
      }}
    >
      {/* simple "landscape" silhouette so the grade reads */}
      <svg viewBox="0 0 160 90" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-1/2 w-full" aria-hidden="true">
        <path d="M0 60 L25 42 L45 55 L70 30 L95 52 L120 38 L160 58 L160 90 L0 90Z" fill={graded ? "#120a08" : "#3a3836"} />
        <path d="M0 75 L40 64 L80 72 L120 62 L160 70 L160 90 L0 90Z" fill={graded ? "#070505" : "#2f2e2c"} />
      </svg>
      <div className="scanlines absolute inset-0" />
    </div>
  );

  return (
    <div
      ref={box}
      className={`relative w-full touch-pan-y select-none overflow-hidden bg-ink-3 has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-4 has-[input:focus-visible]:outline-accent ${className}`}
      style={{ aspectRatio: ratioCss(ratio) }}
      data-cursor="drag"
      onPointerDown={(e) => {
        dragging.current = true;
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        update(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && update(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      {/* AFTER (full) */}
      {after ? <Image src={after} alt={`${title}: after grading`} fill sizes="(min-width: 1024px) 80vw, 100vw" className="object-cover" /> : scene(true)}
      {/* BEFORE (clipped) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {before ? <Image src={before} alt={`${title}: before grading`} fill sizes="(min-width: 1024px) 80vw, 100vw" className="object-cover" /> : scene(false)}
      </div>

      <span className="label-mono absolute left-3 top-3 rounded-sm bg-ink/70 px-2 py-1 text-bone">Before · LOG</span>
      <span className="label-mono absolute right-3 top-3 rounded-sm bg-accent px-2 py-1 text-ink">After · Graded</span>
      {!before && !after && (
        <span className="label-mono absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-bone/70">
          Placeholder: add beforeAfter images
        </span>
      )}

      {/* handle */}
      <div className="absolute inset-y-0 w-px bg-bone" style={{ left: `${pos}%` }} aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-bone bg-ink/60 text-sm backdrop-blur">
          ◀▶
        </div>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={Math.round(pos)}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`${title}: before/after comparison`}
        className="absolute inset-0 h-full w-full opacity-0"
        style={{ pointerEvents: "none" }}
      />
    </div>
  );
}
