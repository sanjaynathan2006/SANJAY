"use client";

import { motion, type Variants } from "framer-motion";
import { useApp } from "@/components/layout/Providers";

const ease = [0.16, 1, 0.3, 1] as const;

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  by?: "char" | "word";
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  /** animate on mount (after preloader) instead of when scrolled into view */
  onLoad?: boolean;
};

/**
 * Split-text reveal: each word/letter slides up from behind a mask.
 * Screen readers get the full sentence via visually-hidden text.
 */
export default function Reveal({
  text,
  as = "div",
  by = "word",
  className = "",
  delay = 0,
  stagger,
  duration = 0.9,
  onLoad = false,
}: Props) {
  const { ready } = useApp();
  const Tag = motion[as];
  const words = text.split(" ");
  const st = stagger ?? (by === "char" ? 0.03 : 0.06);

  const container: Variants = { hidden: {}, show: { transition: { staggerChildren: st, delayChildren: delay } } };
  const item: Variants = {
    hidden: { y: "110%" },
    show: { y: "0%", transition: { duration, ease } },
  };

  const animateProps = onLoad
    ? { animate: ready ? "show" : "hidden" }
    : { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } };

  return (
    <Tag className={className} initial="hidden" variants={container} {...animateProps}>
      <span className="sr-only">{text}</span>
      {words.map((word, wi) => (
        <span key={wi} aria-hidden="true" className="inline-block whitespace-nowrap">
          {by === "word" ? (
            <span className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
              <motion.span className="inline-block will-change-transform" variants={item}>
                {word}
              </motion.span>
            </span>
          ) : (
            word.split("").map((ch, ci) => (
              <span key={ci} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
                <motion.span className="inline-block will-change-transform" variants={item}>
                  {ch}
                </motion.span>
              </span>
            ))
          )}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
}
