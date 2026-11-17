import { site } from "@/data/site";
import Marquee from "@/components/ui/Marquee";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";

type T = (typeof site.testimonials)[number];

const CARD = ["theme-ink", "theme-red", "", "theme-room"];

function Card({ t, i }: { t: T; i: number }) {
  return (
    <figure className={`${CARD[i % CARD.length]} mx-2.5 flex w-[min(82vw,460px)] shrink-0 flex-col justify-between rounded-sm border border-line bg-ink p-7 md:p-9`}>
      <div>
        <span className="font-serif text-8xl italic leading-[0.5] text-accent" aria-hidden="true">
          &ldquo;
        </span>
        <blockquote className="mt-6 font-serif text-2xl leading-[1.15] text-bone md:text-3xl">{t.quote}</blockquote>
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
    <section id="testimonials" data-theme="paper" className="relative overflow-hidden py-28 md:py-40" aria-labelledby="testimonials-title">
      <div className="container-x">
        <SectionLabel index="06">Kind words</SectionLabel>
        <Reveal as="h2" text="KIND *words*" by="char" className="mt-6 font-display text-[clamp(4rem,14vw,14rem)] leading-[0.82]" />
      </div>
      <div className="mt-14 space-y-5 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] md:mt-20">
        <Marquee duration={50} pauseOnHover>
          {[...rowA, ...rowA].map((t, i) => <Card key={i} t={t} i={i} />)}
        </Marquee>
        <Marquee duration={55} reverse pauseOnHover>
          {[...rowB, ...rowB].map((t, i) => <Card key={i} t={t} i={i + 2} />)}
        </Marquee>
      </div>
    </section>
  );
}
