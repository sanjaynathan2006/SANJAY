/** Camera viewfinder corner brackets. Place inside a `relative` parent. */
export default function FrameMarkers({ className = "", size = 18, inset = 12 }: { className?: string; size?: number; inset?: number }) {
  const s = { width: size, height: size };
  const base = "absolute border-bone/70 pointer-events-none";
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      <span className={`${base} border-t border-l`} style={{ ...s, top: inset, left: inset }} />
      <span className={`${base} border-t border-r`} style={{ ...s, top: inset, right: inset }} />
      <span className={`${base} border-b border-l`} style={{ ...s, bottom: inset, left: inset }} />
      <span className={`${base} border-b border-r`} style={{ ...s, bottom: inset, right: inset }} />
    </div>
  );
}
