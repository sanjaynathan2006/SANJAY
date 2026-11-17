"use client";

import { site } from "@/data/site";
import Marquee from "@/components/ui/Marquee";
import Magnetic from "@/components/ui/Magnetic";
import { useApp } from "./Providers";

export default function Footer() {
  const { scrollTo } = useApp();
  const year = new Date().getFullYear();
  return (
    <footer data-theme="ink" className="relative overflow-hidden pt-16">
      <Marquee duration={28} className="py-4 md:py-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <span key={i} className="flex shrink-0 items-center whitespace-nowrap pr-[0.3em] font-display text-[clamp(5rem,20vw,20rem)] leading-[0.9]">
            {site.name}
            <span className="mx-[0.2em] text-accent">—</span>
            <em className="accent-serif text-accent">video editor</em>
            <span className="mx-[0.2em] text-accent">—</span>
          </span>
        ))}
      </Marquee>

      <div className="container-x flex flex-col gap-6 border-t border-line py-8 md:flex-row md:items-center md:justify-between">
        <p className="label-mono text-mute">
          © {year} {site.name}. All rights reserved.
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {site.socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="label-mono text-bone/80 transition-colors hover:text-accent">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <Magnetic>
          <button
            onClick={() => scrollTo(0)}
            className="label-mono group flex items-center gap-3 rounded-full border border-line px-5 py-3 transition-colors hover:border-accent hover:text-accent"
          >
            Back to top
            <span className="inline-block transition-transform duration-500 group-hover:-translate-y-1" aria-hidden="true">↑</span>
          </button>
        </Magnetic>
      </div>
    </footer>
  );
}
