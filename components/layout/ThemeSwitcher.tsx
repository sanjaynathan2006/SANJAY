"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export type Theme = "ink" | "paper" | "red" | "room";
const THEMES: Theme[] = ["ink", "paper", "red", "room"];

export function setTheme(theme: Theme) {
  const root = document.documentElement;
  THEMES.forEach((t) => root.classList.toggle(`theme-${t}`, t === theme));
}

/**
 * Watches every element with data-theme and switches the page colours
 * when that section crosses the middle of the viewport.
 * Pages without data-theme sections fall back to "ink".
 */
export default function ThemeSwitcher() {
  const pathname = usePathname();

  useEffect(() => {
    let io: IntersectionObserver | null = null;
    // wait for the new route's DOM
    const raf = requestAnimationFrame(() => {
      const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-theme]"));
      if (!sections.length) {
        setTheme("ink");
        return;
      }
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setTheme((e.target as HTMLElement).dataset.theme as Theme);
          });
        },
        // a 1px line across the centre of the screen
        { rootMargin: "-50% 0px -50% 0px" },
      );
      sections.forEach((s) => io!.observe(s));
    });
    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, [pathname]);

  return null;
}
