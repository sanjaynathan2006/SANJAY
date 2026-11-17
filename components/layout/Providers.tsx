"use client";

import Lenis from "lenis";
import { MotionConfig } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type Curtain = "idle" | "cover" | "reveal";

type AppCtx = {
  /** true once the preloader has finished */
  ready: boolean;
  setReady: (v: boolean) => void;
  /** Smooth-scroll to a selector / element / y offset */
  scrollTo: (target: string | number | HTMLElement, opts?: { immediate?: boolean; offset?: number }) => void;
  /** Freeze page scrolling (modals, menus, preloader) */
  lockScroll: (locked: boolean) => void;
  /** Navigate with a cinematic curtain transition */
  navigate: (href: string) => void;
  curtain: Curtain;
  endCurtain: () => void;
};

const Ctx = createContext<AppCtx | null>(null);
export const useApp = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useApp must be used inside <Providers>");
  return c;
};

export default function Providers({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [curtain, setCurtain] = useState<Curtain>("idle");
  const lenisRef = useRef<Lenis | null>(null);
  const pendingHash = useRef<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // ── Lenis smooth scroll, synced to GSAP ScrollTrigger ──
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback<AppCtx["scrollTo"]>((target, opts = {}) => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target, { offset: opts.offset ?? 0, immediate: opts.immediate, duration: 1.4 });
      return;
    }
    let y = 0;
    if (typeof target === "number") y = target;
    else {
      const el = typeof target === "string" ? document.querySelector(target) : target;
      if (!el) return;
      y = el.getBoundingClientRect().top + window.scrollY + (opts.offset ?? 0);
    }
    window.scrollTo({ top: y, behavior: opts.immediate ? "auto" : "smooth" });
  }, []);

  const lockScroll = useCallback((locked: boolean) => {
    const lenis = lenisRef.current;
    if (lenis) {
      if (locked) lenis.stop();
      else lenis.start();
    }
    document.documentElement.style.overflow = locked ? "hidden" : "";
  }, []);

  const navigate = useCallback(
    (href: string) => {
      const [path, hash] = href.split("#");
      const targetPath = path || pathname;
      // Same page anchor → just scroll
      if (targetPath === pathname) {
        if (hash) scrollTo(`#${hash}`);
        else scrollTo(0);
        return;
      }
      pendingHash.current = hash ? `#${hash}` : null;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        router.push(href, { scroll: !hash });
        return;
      }
      setCurtain("cover");
      window.setTimeout(() => router.push(targetPath, { scroll: false }), 650);
    },
    [pathname, router, scrollTo],
  );

  // When the route changes: jump to top/anchor, then lift the curtain
  useEffect(() => {
    const hash = pendingHash.current;
    pendingHash.current = null;
    // wait a frame so the new page is in the DOM
    requestAnimationFrame(() => {
      if (hash) scrollTo(hash, { immediate: true });
      else if (curtain === "cover") scrollTo(0, { immediate: true });
      ScrollTrigger.refresh();
      setCurtain((c) => (c === "cover" ? "reveal" : c));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const endCurtain = useCallback(() => setCurtain("idle"), []);

  const value = useMemo(
    () => ({ ready, setReady, scrollTo, lockScroll, navigate, curtain, endCurtain }),
    [ready, scrollTo, lockScroll, navigate, curtain, endCurtain],
  );

  return (
    <Ctx.Provider value={value}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </Ctx.Provider>
  );
}
