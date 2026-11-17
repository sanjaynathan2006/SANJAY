"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useFinePointer, useReducedMotion } from "@/lib/hooks";

type Mode = "default" | "link" | "play" | "view" | "drag";

/** Custom cursor: a dot that grows into "PLAY" on videos, "VIEW"/"DRAG" where marked with data-cursor. */
export default function Cursor() {
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const [mode, setMode] = useState<Mode>("default");
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const cfg = reduce ? { stiffness: 2000, damping: 100 } : { stiffness: 500, damping: 40, mass: 0.5 };
  const sx = useSpring(x, cfg);
  const sy = useSpring(y, cfg);

  useEffect(() => {
    if (!fine) return;
    document.documentElement.classList.add("has-cursor");
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = e.target as Element | null;
      const marked = t?.closest?.("[data-cursor]") as HTMLElement | null;
      if (marked) setMode(marked.dataset.cursor as Mode);
      else if (t?.closest?.("a,button,[role=button],label,select")) setMode("link");
      else setMode("default");
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [fine, x, y]);

  if (!fine) return null;

  const big = mode === "play" || mode === "view" || mode === "drag";
  const size = big ? 96 : mode === "link" ? 44 : 12;
  const label = mode === "play" ? "PLAY ▶" : mode === "view" ? "VIEW" : mode === "drag" ? "◀ DRAG ▶" : "";

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[110] flex items-center justify-center rounded-full"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: size,
        height: size,
        opacity: visible ? 1 : 0,
        backgroundColor: big ? "rgb(255 45 45 / 1)" : mode === "link" ? "rgb(237 233 227 / 0)" : "rgb(237 233 227 / 1)",
        borderColor: mode === "link" ? "rgb(237 233 227 / 0.9)" : "rgb(237 233 227 / 0)",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <span className="absolute inset-0 rounded-full border" style={{ borderColor: "inherit" }} />
      <motion.span
        className="font-mono text-[11px] font-semibold tracking-[0.12em] text-ink"
        animate={{ opacity: big ? 1 : 0, scale: big ? 1 : 0.5 }}
      >
        {label}
      </motion.span>
    </motion.div>
  );
}
