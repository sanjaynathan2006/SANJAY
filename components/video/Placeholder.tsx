import type { AspectRatio } from "@/data/projects";

/**
 * Labelled stand-in shown wherever a thumbnail/video hasn't been added yet.
 * Replace by setting `thumbnail` / `videoSrc` in data/projects.ts.
 */
export default function Placeholder({
  ratio = "16:9",
  title,
  seed = 0,
  active = false,
  note,
  className = "",
}: {
  ratio?: AspectRatio;
  title?: string;
  seed?: number;
  active?: boolean;
  note?: string;
  className?: string;
}) {
  const hue = (seed * 47) % 360;
  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(120% 90% at ${20 + ((seed * 13) % 60)}% 0%, hsl(${hue} 10% 22%) 0%, transparent 60%), linear-gradient(160deg, hsl(${hue} 4% 16%) 0%, hsl(${hue} 3% 9%) 55%, #0b0b0b 100%)`,
      }}
      role="img"
      aria-label={`Placeholder for ${title ?? "video"} (${ratio})`}
    >
      <div className="scanlines absolute inset-0" aria-hidden="true" />
      {/* safe-area guide */}
      <div className="absolute inset-[8%] border border-dashed border-bone/10" aria-hidden="true" />
      {/* crosshair */}
      <div className="absolute left-1/2 top-1/2 h-6 w-px -translate-x-1/2 -translate-y-1/2 bg-bone/20" aria-hidden="true" />
      <div className="absolute left-1/2 top-1/2 h-px w-6 -translate-x-1/2 -translate-y-1/2 bg-bone/20" aria-hidden="true" />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
        <span className="label-mono text-bone/80">YOUR VIDEO HERE – {ratio}</span>
        {note && <span className="label-mono max-w-[30ch] normal-case tracking-normal text-mute">{note}</span>}
      </div>

      {/* hover "preview" animation */}
      <div
        className={`absolute inset-x-0 bottom-0 h-0.5 bg-bone/10 transition-opacity duration-300 ${active ? "opacity-100" : "opacity-0"}`}
        aria-hidden="true"
      >
        <div className={`h-full bg-accent ${active ? "w-full transition-[width] duration-[4000ms] ease-linear" : "w-0"}`} />
      </div>
      <div
        className={`absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgb(255_45_45/0.12),transparent_60%)] transition-opacity duration-500 ${
          active ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />
    </div>
  );
}
