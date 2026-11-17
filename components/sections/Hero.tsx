"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { site } from "@/data/site";
import { useApp } from "@/components/layout/Providers";
import { useVideoModal } from "@/components/video/VideoModal";
import Timecode from "@/components/ui/Timecode";
import FrameMarkers from "@/components/ui/FrameMarkers";
import Magnetic from "@/components/ui/Magnetic";
import ReelBadge from "@/components/ui/ReelBadge";
import { Emph } from "@/lib/emphasis";
import { gsap } from "@/lib/gsap";
import { useInView } from "@/lib/hooks";

const ease = [0.16, 1, 0.3, 1] as const;

function HeroBackground() {
  const ref = useRef<HTMLVideoElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const inView = useInView(wrap, "0px");
  const { heroLoop, poster } = site.showreel;

  // Only play while the hero is on screen
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (inView) v.play().catch(() => {});
    else v.pause();
  }, [inView]);

  return (
    <div ref={wrap} className="absolute inset-0">
      {heroLoop ? (
        <video
          ref={ref}
          className="h-full w-full object-cover"
          src={heroLoop}
          poster={poster || undefined}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          aria-hidden="true"
        />
      ) : (
        // Animated placeholder until a hero loop is added in data/site.ts
        <div className="absolute inset-0 overflow-hidden bg-ink-2" aria-hidden="true">
          <motion.div
            className="absolute -left-1/4 top-0 h-[120%] w-[80%] rounded-full bg-[radial-gradient(circle,rgb(255_61_31/0.38),transparent_65%)] blur-3xl"
            animate={{ x: ["0%", "35%", "0%"], y: ["0%", "10%", "0%"] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -right-1/4 bottom-[-20%] h-[100%] w-[70%] rounded-full bg-[radial-gradient(circle,rgb(120_20_10/0.55),transparent_65%)] blur-3xl"
            animate={{ x: ["0%", "-30%", "0%"] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="scanlines absolute inset-0" />
          <div className="label-mono absolute right-4 top-[22vh] max-w-[60vw] text-right text-bone/30 md:right-10">
            Showreel loop placeholder · set showreel.heroLoop in data/site.ts
          </div>
        </div>
      )}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgb(11_11_11/0.8)_100%)]" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink to-transparent" aria-hidden="true" />
    </div>
  );
}

export default function Hero() {
  const { ready } = useApp();
  const { open } = useVideoModal();
  const root = useRef<HTMLElement>(null);
  const bg = useRef<HTMLDivElement>(null);
  const word = useRef<HTMLHeadingElement>(null);

  // Scroll-linked parallax (skipped for reduced motion)
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      tl.to(bg.current, { scale: 1.15, yPercent: 12, ease: "none" }, 0);
      const letters = word.current?.querySelectorAll("[data-letter]") ?? [];
      letters.forEach((el, i) => {
        tl.to(el, { yPercent: -40 - ((i * 37) % 60), ease: "none" }, 0);
      });
      tl.to("[data-hero-fade]", { opacity: 0, y: -40, ease: "none" }, 0);
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="top" data-theme="ink" className="theme-ink relative h-[100svh] min-h-[600px] overflow-hidden bg-ink" aria-label="Intro">
      <div ref={bg} className="absolute inset-0 will-change-transform">
        <HeroBackground />
      </div>

      {/* letterbox bars open up after the preloader */}
      <motion.div className="absolute inset-x-0 top-0 z-10 bg-black" initial={{ height: "50%" }} animate={{ height: ready ? "4.5vh" : "50%" }} transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }} aria-hidden="true" />
      <motion.div className="absolute inset-x-0 bottom-0 z-10 bg-black" initial={{ height: "50%" }} animate={{ height: ready ? "4.5vh" : "50%" }} transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }} aria-hidden="true" />

      {/* viewfinder HUD */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[4.5vh] top-[4.5vh] z-10" data-hero-fade>
        <FrameMarkers inset={16} size={22} className="hidden md:block" />
        <motion.div
          className="label-mono absolute left-4 top-20 flex items-center gap-3 text-bone/80 md:left-10 md:top-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ delay: 0.9 }}
        >
          <span className="size-2 rounded-full bg-accent animate-rec" aria-hidden="true" />
          REC <Timecode running={ready} className="text-bone" />
        </motion.div>
        <motion.div
          className="label-mono absolute right-4 top-20 hidden text-right text-bone/60 sm:block md:right-10 md:top-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ delay: 1 }}
          aria-hidden="true"
        >
          4K · 24 FPS · 1/48
          <br />
          ISO 800 · 5600K
        </motion.div>
      </div>

      <div className="relative z-20 flex h-full flex-col justify-end pb-[calc(4.5vh+1.5rem)] md:pb-[calc(4.5vh+2.5rem)]">
        <div className="container-x" data-hero-fade>
          <div className="mb-5 flex items-end justify-between gap-6 md:mb-8">
            <div className="max-w-3xl">
              <div className="overflow-hidden">
                <motion.p
                  className="label-mono mb-4 text-accent"
                  initial={{ y: "100%" }}
                  animate={ready ? { y: 0 } : {}}
                  transition={{ duration: 0.9, delay: 0.7, ease }}
                >
                  ● {site.role}
                </motion.p>
              </div>
              <motion.p
                className="font-display text-[clamp(2.4rem,6.2vw,6rem)] leading-[0.92] text-bone [&_em]:text-accent"
                // no opacity fade: the preloader already hides it, and painting it early keeps LCP fast
                initial={{ y: 30 }}
                animate={ready ? { y: 0 } : {}}
                transition={{ duration: 1, delay: 0.8, ease }}
              >
                <Emph text={site.tagline} />
              </motion.p>
            </div>
            <motion.div
              className="pointer-events-auto"
              initial={{ scale: 0, rotate: -90 }}
              animate={ready ? { scale: 1, rotate: 0 } : {}}
              transition={{ duration: 1.2, delay: 1, ease }}
            >
              <Magnetic strength={0.25}>
                <ReelBadge onClick={() => open({ ...site.showreel.full, poster: site.showreel.poster, title: `${site.name}: Showreel`, ratio: "16:9" })} />
              </Magnetic>
            </motion.div>
          </div>
        </div>

        <h1
          ref={word}
          className="flex w-full items-end justify-center px-[1.5vw] font-display text-[17.1vw] leading-[0.8]"
          aria-label={`${site.name}, ${site.role}`}
        >
          {/* rendered in two halves (kept on one line) so letters stagger in from the centre */}
          {[site.name.slice(0, Math.ceil(site.name.length / 2)), site.name.slice(Math.ceil(site.name.length / 2))].map((part, pi) => (
            <span key={pi} className="flex whitespace-nowrap" aria-hidden="true">
              {part.split("").map((ch, ci) => {
                const i = pi * Math.ceil(site.name.length / 2) + ci;
                return (
                  <span key={i} className="inline-block pt-[0.06em] [clip-path:inset(-60%_-30%_0_-30%)]">
                    <motion.span
                      data-letter
                      className="inline-block will-change-transform"
                      initial={{ y: "110%" }}
                      animate={ready ? { y: "0%" } : {}}
                      transition={{ duration: 1.1, delay: 0.15 + i * 0.045, ease }}
                    >
                      {ch}
                    </motion.span>
                  </span>
                );
              })}
            </span>
          ))}
        </h1>
      </div>
    </section>
  );
}
