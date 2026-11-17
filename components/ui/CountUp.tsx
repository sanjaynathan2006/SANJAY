"use client";
import { animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export default function CountUp({ to, suffix = "", className = "" }: { to: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      ref.current.textContent = `${to}${suffix}`;
      return;
    }
    const c = animate(0, to, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => ref.current && (ref.current.textContent = `${Math.round(v)}${suffix}`),
    });
    return () => c.stop();
  }, [inView, to, suffix]);
  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {`${to}${suffix}`}
    </span>
  );
}
