import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80svh] flex-col items-start justify-center gap-6 pt-24">
      <p className="label-mono text-accent">Error 404 · Media offline</p>
      <h1 className="font-display text-[clamp(4rem,16vw,14rem)] font-extrabold leading-[0.85] tracking-tight">NO SIGNAL</h1>
      <p className="text-bone/70">This clip isn&apos;t on the timeline.</p>
      <Link href="/" className="label-mono rounded-full border border-line px-5 py-3 hover:border-accent hover:text-accent">
        ← Back to home
      </Link>
    </section>
  );
}
