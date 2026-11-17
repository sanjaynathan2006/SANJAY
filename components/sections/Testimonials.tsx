import { site } from "@/data/site";
import Marquee from "@/components/ui/Marquee";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";

type T = (typeof site.testimonials)[number];

function Card({ t }: { t: T }) {
  return (
    <figure className="mx-2.5 flex w-[min(82vw,440px)] shrink-0 flex-col justify-between border border-line bg-ink-2 p-6 md:p-8">
      <div>
        <span className="font-display text-5xl leading-none text-accent" aria-hidden="true">
          &ldquo;
        </span>
        <blockquote className="mt-2 text-lg leading-snug text-bone/90 md:text-xl">{t.quote}</blockquote>
      </div>
      <figcaption className="mt-8 flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-full border border-line font-mono text-xs text-mute" aria-hidden="true">
          {t.name.split(" ").map((w) => w[0]).join("")}
        </span>
        <span>
          <span className="block font-semibold">{t.name}</span>
          <span className="label-mono text-mute">{t.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  const half = Math.ceil(site.testimonials.length / 2);
  const rowA = site.testimonials.slice(0, half);
  const rowB = site.testimonials.slice(half);
  return (
    <section id="testimonials" className="relative overflow-hidden border-t border-line py-28 md:py-36" aria-labelledby="testimonials-title">
      <div className="container-x">
        <SectionLabel index="06">Kind words</SectionLabel>
        <Reveal as="h2" text="CLIENT NOTES" by="char" className="mt-6 font-display text-[clamp(2.1rem,9vw,8rem)] font-extrabold leading-[0.85] tracking-tight" />
      </div>
      <div className="mt-14 space-y-5 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] md:mt-20">
        <Marquee duration={50} pauseOnHover>
          {[...rowA, ...rowA].map((t, i) => <Card key={i} t={t} />)}
        </Marquee>
        <Marquee duration={55} reverse pauseOnHover>
          {[...rowB, ...rowB].map((t, i) => <Card key={i} t={t} />)}
        </Marquee>
      </div>
    </section>
  );
}
