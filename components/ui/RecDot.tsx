export default function RecDot({ className = "", label = "REC" }: { className?: string; label?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 label-mono ${className}`}>
      <span className="size-2 rounded-full bg-accent animate-rec shadow-[0_0_12px_var(--color-accent)]" aria-hidden="true" />
      {label}
    </span>
  );
}
