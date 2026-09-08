"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { CONTAINER, cx } from "@/lib/utils";
import { site } from "@/data/site";
import { WordsMask } from "@/components/ui/reveal";
import { Scramble } from "@/components/ui/scramble";
import { Magnetic } from "@/components/ui/magnetic";
import { Clock } from "@/components/ui/clock";
import { useSmoothScroll } from "@/components/providers";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Hero() {
  const { scrollTo } = useSmoothScroll();

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-clip pb-6 pt-28 md:pt-36">
      {/* Backdrop */}
      <div aria-hidden className="hero-grid absolute inset-0" />
      <div aria-hidden className="hero-glow absolute inset-0" />

      <div className={cx(CONTAINER, "relative flex grow flex-col justify-between")}>
        {/* Status */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="mb-10 flex justify-center"
        >
          <span className="inline-flex items-center gap-2.5 rounded-full border border-bone/15 bg-coal/60 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-bone/80 backdrop-blur-sm">
            <span className="relative flex size-1.5">
              <span className="animate-blink absolute inline-flex size-full rounded-full bg-acid" />
            </span>
            {site.availability}
          </span>
        </motion.div>

        {/* Headline */}
        <h1 className="max-w-[15ch]">
          <span className="sr-only">
            Je transforme les idées en interfaces dont on se souvient
          </span>
          <span aria-hidden className="block">
            <WordsMask
              as="span"
              delay={0.35}
              className="text-[clamp(2.7rem,8.2vw,7.25rem)] font-semibold leading-[0.98] tracking-[-0.045em]"
              words={["Je", "transforme", "les", "idées"]}
            />
          </span>
          <span aria-hidden className="block">
            <WordsMask
              as="span"
              delay={0.75}
              className="text-[clamp(2.7rem,8.2vw,7.25rem)] font-semibold leading-[0.98] tracking-[-0.045em]"
              words={[
                "en",
                <span key="a" className="text-acid">interfaces</span>,
                "dont",
                <em key="b" className="font-serif text-[1.06em] font-normal italic">on se</em>,
                <em key="c" className="font-serif text-[1.06em] font-normal italic">souvient.</em>,
              ]}
            />
          </span>
        </h1>

        {/* Sub row */}
        <div className="mt-10 flex flex-col gap-10 md:mt-14 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.25, ease: EASE }}
            className="max-w-md"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-acid">
              <Scramble text={site.roleScramble} trigger="view" />
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-ash md:text-base">
              Étudiant en Licence 3 Informatique à {site.city}, je conçois et développe des produits web
              rapides, accessibles et mémorables — du pixel au déploiement.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Magnetic strength={0.28}>
                <button
                  type="button"
                  onClick={() => scrollTo("travaux")}
                  data-cursor
                  className="group inline-flex items-center gap-3 rounded-full bg-acid px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-bone"
                >
                  Voir les travaux
                  <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                </button>
              </Magnetic>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("contact");
                }}
                data-cursor
                className="u-line inline-flex items-center gap-2 px-1 py-2 text-sm font-medium text-bone/80 hover:text-bone"
              >
                Discutons de votre projet
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </motion.div>

          {/* Availability card */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.45, ease: EASE }}
            className="hairline relative hidden shrink-0 rounded-2xl border bg-coal/40 p-6 backdrop-blur-sm md:block"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ash">Prochaine étape</p>
            <p className="mt-2 max-w-[26ch] text-sm leading-relaxed text-bone">
              Stage de fin d'études (mars – sept. 2026) ou mission freelance courte — ouverts aux challenges
              ambitieux.
            </p>
            <Link
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("contact");
              }}
              className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-acid hover:underline"
            >
              Réserver un créneau <ArrowUpRight className="size-3.5" />
            </Link>
          </motion.div>
        </div>

        {/* Footer bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.7 }}
          className={cx(CONTAINER, "hairline -mx-5 mt-14 flex items-center justify-between border-t px-5 pt-5 md:-mx-10 md:px-10")}
        >
          <span className="font-mono text-xs tracking-widest text-ash">
            <span className="text-bone">{site.location}</span>
          </span>
          <Clock timezone={site.timezone} city={site.city} />
          <button
            type="button"
            onClick={() => scrollTo("travaux")}
            aria-label="Défiler vers les travaux"
            className="group hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-ash transition-colors hover:text-bone sm:flex"
          >
            Défiler
            <span className="animate-bob inline-block">↓</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
