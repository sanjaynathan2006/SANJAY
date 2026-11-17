"use client";
import { useEffect, useRef } from "react";
import { FPS, formatTC } from "@/lib/timecode";

/** A running SMPTE timecode (HH:MM:SS:FF) that ticks at 24fps without re-rendering React. */
export default function Timecode({ className = "", start = 0, running = true }: { className?: string; start?: number; running?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!running) return;
    let raf = 0;
    let last = -1;
    const t0 = performance.now();
    const loop = (now: number) => {
      const frames = start + Math.floor(((now - t0) / 1000) * FPS);
      if (frames !== last && ref.current) {
        ref.current.textContent = formatTC(frames);
        last = frames;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [running, start]);
  return (
    <span ref={ref} className={`font-mono tabular-nums ${className}`} aria-hidden="true">
      {formatTC(start)}
    </span>
  );
}
