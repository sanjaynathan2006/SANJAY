"use client";

/** Circular rotating text badge with a play button in the middle. */
export default function ReelBadge({ label = "WATCH SHOWREEL", onClick, className = "" }: { label?: string; onClick: () => void; className?: string }) {
  const text = `${label} • ${label} • `;
  return (
    <button
      type="button"
      data-cursor="play"
      onClick={onClick}
      className={`group relative flex size-32 shrink-0 items-center justify-center rounded-full bg-accent text-on-accent transition-transform duration-500 ease-[var(--ease-out-expo)] hover:scale-105 md:size-40 ${className}`}
      aria-label={label.toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full animate-[spin_14s_linear_infinite] motion-reduce:animate-none" aria-hidden="true">
        <defs>
          <path id="reel-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-current font-mono text-[8.6px] font-semibold tracking-[0.18em]">
          <textPath href="#reel-circle">{text}</textPath>
        </text>
      </svg>
      <span className="relative ml-1 text-2xl transition-transform duration-500 group-hover:scale-125 md:text-3xl" aria-hidden="true">
        ▶
      </span>
    </button>
  );
}
