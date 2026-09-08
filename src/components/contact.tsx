"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { CONTAINER, cx } from "@/lib/utils";
import { site, socials } from "@/data/site";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Scramble } from "@/components/ui/scramble";
import { Magnetic } from "@/components/ui/magnetic";

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      data-cursor
      className="hairline group inline-flex items-center gap-2 rounded-full border bg-coal/50 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ash transition-colors hover:border-acid/50 hover:text-bone"
      aria-label="Copier l'adresse e-mail"
    >
      {copied ? <Check className="size-3.5 text-acid" /> : <Copy className="size-3.5" />}
      {copied ? "Copiée !" : "Copier l'adresse"}
    </button>
  );
}

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-clip border-t hairline py-24 md:py-36">
      <div aria-hidden className="hero-glow absolute inset-0 opacity-60" />
      <div className={cx(CONTAINER, "relative")}>
        <SectionHeading
          index={6}
          eyebrow="Contact"
          title={[
            "Une idée ?",
            <em key="1" className="font-serif font-normal italic">Faisons-en</em>,
            "un produit.",
          ]}
          description="Stage de fin d'études, mission freelance, projet étudiant ambitieux ou simple curiosité — ma boîte mail est ouverte et ma réponse arrive sous 24 h."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Giant email */}
          <div className="lg:col-span-7">
            <Reveal>
              <a
                href={`mailto:${site.email}?subject=Proj%20web%20—%20discutons`}
                data-cursor
                data-cursor-label="Écrire"
                className="group block text-[clamp(1.5rem,4.6vw,3.4rem)] font-medium tracking-[-0.03em] text-bone"
              >
                <span className="flex items-center gap-4">
                  <Mail className="size-[0.9em] shrink-0 text-acid transition-transform duration-500 group-hover:-translate-y-1" />
                  <span className="min-w-0 break-all transition-colors duration-300 group-hover:text-acid">
                    <Scramble text={site.email} trigger="hover" />
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    className="size-[0.55em] shrink-0 -rotate-45 text-ash transition-all duration-500 group-hover:rotate-0 group-hover:text-acid"
                  />
                </span>
              </a>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Magnetic strength={0.25}>
                  <a
                    href={`mailto:${site.email}`}
                    data-cursor
                    className="inline-flex items-center gap-2.5 rounded-full bg-acid px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-bone"
                  >
                    Envoyer un message
                    <ArrowUpRight className="size-4" />
                  </a>
                </Magnetic>
                <CopyEmail />
                <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
                  <span className="relative flex size-1.5">
                    <span className="animate-blink absolute inline-flex size-full rounded-full bg-acid" />
                  </span>
                  Réponse sous 24 h
                </span>
              </div>
            </Reveal>
          </div>

          {/* Socials */}
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <ul className="hairline divide-y divide-bone/10 overflow-hidden rounded-2xl border bg-coal/40" role="list">
                {socials.map((s) => (
                  <li key={s.label} className="hairline border-b last:border-b-0">
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor
                      data-cursor-label="Suivre"
                      className="group flex items-center justify-between px-6 py-4 transition-colors hover:bg-ink/60"
                    >
                      <span className="flex items-baseline gap-3">
                        <span className="text-sm font-semibold tracking-tight">{s.label}</span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ash">
                          {s.handle}
                        </span>
                      </span>
                      <ArrowUpRight className="size-4 text-ash transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-acid" />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Sign-off marquee */}
      <Reveal delay={0.2} className="mt-20">
        <div className="hairline overflow-hidden border-y py-6" aria-hidden>
          <div className="flex w-max animate-marquee-reverse items-center motion-reduce:animate-none">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex shrink-0 items-center">
                {[
                  "DISPONIBLE — STAGE & FREELANCE",
                  "ANTANANARIVO → PARTOUT, À DISTANCE",
                  "REACT · NEXT.JS · TYPESCRIPT",
                  "PARLONS-EN",
                ].map((t, i) => (
                  <span key={i} className="flex items-center whitespace-nowrap">
                    <span className="px-8 font-serif text-3xl italic text-bone/70 md:text-4xl">{t}</span>
                    <span className="text-acid">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
