"use client";

import { AnimatePresence, motion } from "framer-motion";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useApp } from "@/components/layout/Providers";
import TransitionLink from "@/components/ui/TransitionLink";
import { ratioCss, ratioNumber } from "@/lib/video";
import VideoPlayer, { type VideoSource } from "./VideoPlayer";
import Timecode from "@/components/ui/Timecode";
import RecDot from "@/components/ui/RecDot";

type Payload = VideoSource & { href?: string; meta?: string };
const Ctx = createContext<{ open: (p: Payload) => void } | null>(null);
export const useVideoModal = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useVideoModal outside provider");
  return c;
};

export default function VideoModalProvider({ children }: { children: React.ReactNode }) {
  const [item, setItem] = useState<Payload | null>(null);
  const { lockScroll } = useApp();
  const lastFocus = useRef<HTMLElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);

  const open = useCallback((p: Payload) => {
    lastFocus.current = document.activeElement as HTMLElement;
    setItem(p);
  }, []);
  const close = useCallback(() => setItem(null), []);

  useEffect(() => {
    if (!item) return;
    lockScroll(true);
    const t = window.setTimeout(() => closeBtn.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && dialog.current) {
        // simple focus trap
        const f = dialog.current.querySelectorAll<HTMLElement>('a[href],button,iframe,video,[tabindex]:not([tabindex="-1"])');
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
      lastFocus.current?.focus?.();
    };
  }, [item, close, lockScroll]);

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {item && (
          <motion.div
            ref={dialog}
            role="dialog"
            aria-modal="true"
            aria-label={`Video player: ${item.title}`}
            className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-ink/95 px-3 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.35, delay: 0.15 } }}
            onClick={(e) => e.target === e.currentTarget && close()}
            data-lenis-prevent
          >
            {/* letterbox bars */}
            <motion.div className="absolute inset-x-0 top-0 h-[7vh] bg-black" initial={{ y: "-100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }} transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }} aria-hidden="true" />
            <motion.div className="absolute inset-x-0 bottom-0 h-[7vh] bg-black" initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }} aria-hidden="true" />

            <div className="absolute inset-x-0 top-0 z-10 flex h-[7vh] items-center justify-between px-4 md:px-8">
              <RecDot label="PLAYING" className="text-bone/80" />
              <Timecode className="hidden text-xs text-bone/60 sm:inline" />
              <button
                ref={closeBtn}
                onClick={close}
                className="label-mono rounded-full border border-line px-4 py-2 text-bone transition-colors hover:border-accent hover:text-accent"
              >
                Close ✕
              </button>
            </div>

            <motion.div
              className="relative overflow-hidden bg-black shadow-2xl"
              style={{
                aspectRatio: ratioCss(item.ratio),
                width: `min(94vw, calc((100svh - 18vh - 3rem) * ${ratioNumber(item.ratio)}))`,
              }}
              initial={{ scale: 0.92, opacity: 0, clipPath: "inset(10% 0 10% 0)" }}
              animate={{ scale: 1, opacity: 1, clipPath: "inset(0% 0 0% 0)" }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              <VideoPlayer {...item} />
            </motion.div>

            <div className="mt-4 flex w-full max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center">
              <span className="font-display text-lg font-bold uppercase">{item.title}</span>
              {item.meta && <span className="label-mono text-mute">{item.meta}</span>}
              {item.href && (
                <TransitionLink href={item.href} onClick={close} className="label-mono text-accent underline-offset-4 hover:underline">
                  View project →
                </TransitionLink>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}
