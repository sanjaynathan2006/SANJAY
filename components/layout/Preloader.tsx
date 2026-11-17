"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { formatTC } from "@/lib/timecode";
import { useApp } from "./Providers";

const ease = [0.76, 0, 0.24, 1] as const;

/**
 * Old-film-leader countdown (3·2·1) + timecode counting to 100%, then the name reveals.
 * Plays in full once per browser session; afterwards a short version.
 */
export default function Preloader() {
  const { setReady, lockScroll } = useApp();
  const [count, setCount] = useState(3);
  const [phase, setPhase] = useState<"count" | "name" | "done">("count");
  const pctRef = useRef<HTMLSpanElement>(null);
  const tcRef = useRef<HTMLSpanElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    lockScroll(true);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem("sn-preloaded") === "1";
      sessionStorage.setItem("sn-preloaded", "1");
    } catch {}
    const COUNT_MS = reduce || seen ? 0 : 1200;
    const NAME_MS = reduce ? 300 : seen ? 650 : 900;
    if (COUNT_MS === 0) setPhase("name");

    let raf = 0;
    const t0 = performance.now();
    const loop = (now: number) => {
      const p = Math.min(1, (now - t0) / (COUNT_MS + NAME_MS * 0.6));
      if (pctRef.current) pctRef.current.textContent = String(Math.round(p * 100)).padStart(3, "0");
      if (tcRef.current) tcRef.current.textContent = formatTC(p * 24 * 3);
      if (COUNT_MS && now - t0 < COUNT_MS) {
        const local = ((now - t0) % (COUNT_MS / 3)) / (COUNT_MS / 3);
        sweepRef.current?.style.setProperty("--sweep", `${local * 360}deg`);
        setCount(3 - Math.floor((now - t0) / (COUNT_MS / 3)));
      } else if (COUNT_MS) {
        setPhase((ph) => (ph === "count" ? "name" : ph));
      }
      if (p < 1) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const done = window.setTimeout(() => {
      setPhase("done");
      setReady(true);
      lockScroll(false);
    }, COUNT_MS + NAME_MS);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(done);
    };
  }, [lockScroll, setReady]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          id="preloader"
          className="theme-red fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-ink"
          exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: 0.9, ease } }}
          style={{ clipPath: "inset(0 0 0% 0)" }}
          aria-live="polite"
          aria-label="Loading"
        >
          {phase === "count" && (
            <div className="relative flex size-[min(70vw,420px)] items-center justify-center" aria-hidden="true">
              {/* film leader: sweep + rings + crosshair */}
              <div
                ref={sweepRef}
                className="absolute inset-0 rounded-full"
                style={{ background: "conic-gradient(from 0deg, color-mix(in srgb, var(--fg) 14%, transparent) var(--sweep, 0deg), transparent var(--sweep, 0deg))" }}
              />
              <div className="absolute inset-0 rounded-full border border-bone/40" />
              <div className="absolute inset-[12%] rounded-full border border-bone/25" />
              <div className="absolute inset-y-0 left-1/2 w-px bg-bone/25" />
              <div className="absolute inset-x-0 top-1/2 h-px bg-bone/25" />
              <span key={count} className="relative font-display text-[clamp(9rem,40vw,20rem)] leading-none text-bone">
                {Math.max(1, count)}
              </span>
            </div>
          )}

          {phase === "name" && (
            <h2 className="flex font-display text-[14.5vw] leading-[0.9]" aria-label={site.name}>
              {site.name.split("").map((ch, i) => (
                <span key={i} className="inline-block [clip-path:inset(-40%_-20%_0_-20%)]" aria-hidden="true">
                  <motion.span
                    className="inline-block"
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.75, delay: i * 0.035, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {ch}
                  </motion.span>
                </span>
              ))}
            </h2>
          )}

          <div className="label-mono absolute inset-x-0 bottom-6 flex items-center justify-between px-5 text-mute md:bottom-10 md:px-10" aria-hidden="true">
            <span className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-bone animate-rec" /> TC <span ref={tcRef} className="text-bone">00:00:00:00</span>
            </span>
            <span>
              <span ref={pctRef} className="text-bone">000</span>%
            </span>
          </div>
          <div className="label-mono absolute left-5 top-6 text-mute md:left-10 md:top-10" aria-hidden="true">
            REEL 01 · {site.role}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
