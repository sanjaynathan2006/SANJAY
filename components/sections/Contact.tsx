"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { site } from "@/data/site";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";
import Magnetic from "@/components/ui/Magnetic";
import FadeIn from "@/components/ui/FadeIn";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "peer w-full border-0 border-b border-line bg-transparent px-0 pb-3 pt-6 text-lg text-bone placeholder-transparent outline-none transition-colors focus:border-accent";
const label =
  "label-mono pointer-events-none absolute left-0 top-0 text-mute transition-colors peer-focus:text-accent";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
    } catch {
      // fallback for older browsers
      const ta = document.createElement("textarea");
      ta.value = site.email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("_gotcha")) return; // spam bot

    // No Formspree ID configured yet → open the visitor's email app instead
    if (site.formEndpoint.includes("YOUR_FORM_ID")) {
      const body = `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nProject: ${data.get("project")}\nBudget: ${data.get("budget") || "-"}\n\n${data.get("message")}`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`New project: ${data.get("project")}`)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(site.formEndpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden border-t border-line py-28 md:py-40" aria-labelledby="contact-title">
      <div className="container-x">
        <SectionLabel index="07">Contact</SectionLabel>
        <h2 id="contact-title" aria-label="Let's create something" className="mt-8 font-display text-[clamp(2rem,8.8vw,9.5rem)] font-extrabold uppercase leading-[0.82] tracking-[-0.03em]">
          <Reveal as="span" text="LET'S" by="char" className="block" />
          <Reveal as="span" text="CREATE" by="char" delay={0.1} className="block text-outline" />
          <span className="flex items-end">
            <Reveal as="span" text="SOMETHING" by="char" delay={0.2} className="block" />
            <span className="text-accent" aria-hidden="true">.</span>
          </span>
        </h2>

        <div className="mt-16 grid gap-16 md:mt-24 lg:grid-cols-12 lg:gap-10">
          {/* Left: email + socials */}
          <FadeIn className="lg:col-span-5">
            <p className="label-mono flex items-center gap-2 text-bone/80">
              <span className="size-2 rounded-full bg-accent animate-rec" aria-hidden="true" />
              {site.availability}
            </p>

            <div className="mt-8 flex flex-col items-start gap-4">
              <Magnetic strength={0.15}>
                <button
                  onClick={copy}
                  className="group relative flex items-center gap-4 rounded-full border border-line py-4 pl-6 pr-4 text-left transition-colors hover:border-accent"
                  aria-label={`Copy email address ${site.email}`}
                >
                  <span className="font-display text-lg font-semibold sm:text-2xl">{site.email}</span>
                  <span className="label-mono rounded-full bg-bone px-3 py-1.5 text-ink transition-colors group-hover:bg-accent">
                    {copied ? "Copied ✓" : "Copy"}
                  </span>
                </button>
              </Magnetic>
              <a href={`mailto:${site.email}`} className="label-mono ml-6 border-b border-accent pb-1 text-bone hover:text-accent">
                Open in mail app ↗
              </a>
              <span className="sr-only" role="status" aria-live="polite">
                {copied ? "Email address copied to clipboard" : ""}
              </span>
            </div>

            <ul className="mt-14 border-t border-line">
              {site.socials.map((s) => (
                <li key={s.label} className="border-b border-line">
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between py-4">
                    <span className="font-display text-2xl font-bold transition-transform duration-500 group-hover:translate-x-2">{s.label}</span>
                    <span className="transition-all duration-500 group-hover:-rotate-45 group-hover:text-accent" aria-hidden="true">
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </FadeIn>

          {/* Right: form */}
          <FadeIn className="lg:col-span-6 lg:col-start-7" delay={0.1}>
            <form onSubmit={onSubmit} className="grid gap-8 sm:grid-cols-2" noValidate={false}>
              <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <div className="relative">
                <input id="f-name" name="name" required placeholder="Name" autoComplete="name" className={field} />
                <label htmlFor="f-name" className={label}>Your name *</label>
              </div>
              <div className="relative">
                <input id="f-email" name="email" type="email" required placeholder="Email" autoComplete="email" className={field} />
                <label htmlFor="f-email" className={label}>Email *</label>
              </div>
              <div className="relative">
                <select id="f-project" name="project" required defaultValue="" className={`${field} appearance-none [&>option]:bg-ink`}>
                  <option value="" disabled>
                    Select…
                  </option>
                  {site.services.map((s) => (
                    <option key={s.title}>{s.title}</option>
                  ))}
                  <option>Something else</option>
                </select>
                <label htmlFor="f-project" className={label}>Project type *</label>
                <span className="pointer-events-none absolute bottom-3 right-0 text-mute" aria-hidden="true">↓</span>
              </div>
              <div className="relative">
                <input id="f-budget" name="budget" placeholder="Budget" className={field} />
                <label htmlFor="f-budget" className={label}>Budget / timeline</label>
              </div>
              <div className="relative sm:col-span-2">
                <textarea id="f-msg" name="message" required rows={4} placeholder="Message" className={`${field} resize-none`} />
                <label htmlFor="f-msg" className={label}>Tell me about your project *</label>
              </div>

              <div className="flex flex-wrap items-center gap-6 sm:col-span-2">
                <Magnetic>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group flex items-center gap-3 rounded-full bg-accent px-8 py-4 font-semibold text-ink transition-colors hover:bg-bone disabled:opacity-60"
                  >
                    <span className="label-mono font-bold">{status === "sending" ? "Sending…" : "Send message"}</span>
                    <span className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true">→</span>
                  </button>
                </Magnetic>
                <AnimatePresence mode="wait">
                  {(status === "sent" || status === "error") && (
                    <motion.p
                      key={status}
                      role="status"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`label-mono ${status === "sent" ? "text-bone" : "text-accent"}`}
                    >
                      {status === "sent" ? "✓ Message received. I'll reply within 24h." : `Something went wrong. Email me at ${site.email}`}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
