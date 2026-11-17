export default function SectionLabel({ index, children, className = "" }: { index: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex items-center gap-3 text-mute label-mono ${className}`}>
      <span className="text-accent">{index}</span>
      <span className="h-px w-10 bg-line" aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}
