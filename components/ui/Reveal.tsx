"use client";

import { motion, type Variants } from "framer-motion";
import { useApp } from "@/components/layout/Providers";
import { tokenize } from "@/lib/emphasis";

const ease = [0.16, 1, 0.3, 1] as const;

type Props = {
  /** Wrap words in *asterisks* to render them in the italic serif accent. */
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

// The mask only clips the bottom edge, so tall caps and italic swashes are never cut.
const MASK = "inline-block align-bottom [clip-path:inset(-0.7em_-0.35em_-0.16em_-0.35em)]";

/**
 * Split-text reveal: each word/letter slides up from behind a mask.
 * Screen readers get the full sentence via visually-hidden text.
 */
export default function Reveal({ text, as = "div", by = "word", className = "", delay = 0, stagger, duration = 1, onLoad = false }: Props) {
  const { ready } = useApp();
  const Tag = motion[as];
  const words = tokenize(text);
  const st = stagger ?? (by === "char" ? 0.028 : 0.06);

  const container: Variants = { hidden: {}, show: { transition: { staggerChildren: st, delayChildren: delay } } };
  const item: Variants = {
    hidden: { y: "135%", rotate: 4 },
    show: { y: "0%", rotate: 0, transition: { duration, ease } },
  };

  const animateProps = onLoad
    ? { animate: ready ? "show" : "hidden" }
    : { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } };

  return (
    <Tag className={className} initial="hidden" variants={container} {...animateProps}>
      <span className="sr-only">{words.map((w) => w.word).join(" ")}</span>
      {words.map(({ word, em }, wi) => (
        <span key={wi} aria-hidden="true" className={`inline-block whitespace-nowrap ${em ? "accent-serif" : ""}`}>
          {by === "word" || em ? (
            <span className={MASK}>
              <motion.span className="inline-block origin-bottom-left will-change-transform" variants={item}>
                {word}
              </motion.span>
            </span>
          ) : (
            word.split("").map((ch, ci) => (
              <span key={ci} className={MASK}>
                <motion.span className="inline-block origin-bottom-left will-change-transform" variants={item}>
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
