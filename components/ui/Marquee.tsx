/** Infinite CSS marquee: duplicated content translated -50% (GPU-cheap, pauses on hover). */
export default function Marquee({
  children,
  duration = 30,
  reverse = false,
  className = "",
  pauseOnHover = false,
}: {
  children: React.ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
  pauseOnHover?: boolean;
}) {
  return (
    <div className={`marquee-wrap relative flex overflow-hidden ${className}`}>
      <div
        className={`marquee-track flex w-max shrink-0 ${reverse ? "animate-marquee-rev" : "animate-marquee"} ${
          pauseOnHover ? "" : "pointer-events-none"
        }`}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
