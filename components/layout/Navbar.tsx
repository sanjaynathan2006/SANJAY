"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { formatTC } from "@/lib/timecode";
import TransitionLink from "@/components/ui/TransitionLink";
import { useApp } from "./Providers";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/#contact", label: "Contact" },
];

const ease = [0.76, 0, 0.24, 1] as const;

export default function Navbar() {
  const { ready, lockScroll } = useApp();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const tcRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 200 && !open);
  });
  // The page is a "timeline": scroll position → playhead timecode (2-minute runtime)
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (tcRef.current) tcRef.current.textContent = formatTC(p * 120 * 24);
    if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
  });

  useEffect(() => {
    lockScroll(open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, lockScroll]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[70]"
        initial={{ y: "-100%" }}
        animate={{ y: !ready || hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.6, ease }}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/50 to-transparent" aria-hidden="true" />
        <nav className="container-x relative flex h-16 items-center justify-between md:h-20" aria-label="Main">
          <TransitionLink href="/" className="font-display text-2xl leading-none md:text-[1.75rem]" aria-label={`${site.name}, home`}>
            {site.name}
            <span className="text-accent">.</span>
          </TransitionLink>

          <div className="label-mono absolute left-1/2 hidden -translate-x-1/2 items-center gap-3 text-mute lg:flex" aria-hidden="true">
            <span className="size-2 rounded-full bg-accent animate-rec" />
            <span>REC</span>
            <span ref={tcRef} className="tabular-nums text-bone">00:00:00:00</span>
          </div>

          <ul className="hidden items-center gap-7 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <TransitionLink href={l.href} className="group label-mono relative block overflow-hidden text-bone/80 transition-colors hover:text-bone">
                  <span className="block transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-full">{l.label}</span>
                  <span className="absolute inset-0 translate-y-full text-accent transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0" aria-hidden="true">
                    {l.label}
                  </span>
                </TransitionLink>
              </li>
            ))}
          </ul>

          <button
            className="label-mono flex items-center gap-2 md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span className={`size-2 rounded-full ${open ? "bg-accent" : "bg-bone"}`} aria-hidden="true" />
            {open ? "Close" : "Menu"}
          </button>
        </nav>
        {/* scroll progress = playhead bar */}
        <span ref={barRef} className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent" aria-hidden="true" />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="theme-red fixed inset-0 z-[65] flex flex-col justify-between bg-ink px-4 pb-8 pt-24 md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease }}
          >
            <ul className="flex flex-col gap-1">
              {links.map((l, i) => (
                <li key={l.href} className="overflow-hidden">
                  <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ delay: 0.25 + i * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
                    <TransitionLink href={l.href} onClick={() => setOpen(false)} className="flex items-baseline gap-4 font-display text-[19vw] leading-[0.92]">
                      <span className="label-mono">0{i + 1}</span>
                      {l.label}
                    </TransitionLink>
                  </motion.div>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {site.socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="label-mono text-mute hover:text-bone">
                  {s.label} ↗
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
