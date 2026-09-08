"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";
import { projects } from "@/data/projects";
import { cx, pad2 } from "@/lib/utils";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/ui/reveal";

/**
 * WorkList — awwwards-style index: giant rows with a swap-in title and a
 * cursor-following image preview. Touch devices get inline thumbnails.
 */
export function WorkList() {
  const [active, setActive] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 22, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 180, damping: 22, mass: 0.4 });

  const onMove = (e: React.MouseEvent) => {
    x.set(e.clientX);
    y.set(e.clientY);
  };

  return (
    <section id="travaux" className="scroll-mt-24 py-24 md:py-36">
      <div className="mx-auto w-full max-w-[1440px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            index={1}
            eyebrow="Travaux sélectionnés"
            title={[
              "Des produits",
              "complets,",
              <em key="s" className="font-serif font-normal italic text-ash">pas des maquettes.</em>,
            ]}
          />
          <Reveal delay={0.2} className="max-w-xs pb-2">
            <p className="text-sm leading-relaxed text-ash">
              Quatre projets choisis pour leur complexité réelle — du premier jet Figma à la production.
              Chaque fiche détaille le contexte, l'approche et les résultats.
            </p>
          </Reveal>
        </div>

        {/* Rows */}
        <div ref={listRef} className="mt-14 border-t hairline" onMouseMove={onMove}>
          {projects.map((p, i) => (
            <Link
              key={p.slug}
              href={`/works/${p.slug}`}
              data-cursor
              data-cursor-label="Voir"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className="hairline group relative grid grid-cols-[auto_1fr_auto] items-center gap-5 border-b py-7 transition-[padding] duration-500 hover:px-4 md:py-10"
            >
              <span className="w-8 font-mono text-xs text-acid md:w-12">{pad2(i + 1)}</span>

              <div className="flex min-w-0 items-center gap-6">
                {/* Mobile thumb */}
                <img
                  src={p.cover}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  className="size-16 shrink-0 rounded-lg object-cover md:hidden"
                />
                <div className="min-w-0">
                  {/* Title swap (base + ghost) */}
                  <div className="relative overflow-hidden">
                    <h3 className="truncate text-[clamp(1.6rem,4.2vw,3.2rem)] font-medium leading-tight tracking-[-0.03em] transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                      {p.name}
                    </h3>
                    <h3
                      aria-hidden
                      className="absolute inset-0 truncate text-[clamp(1.6rem,4.2vw,3.2rem)] font-medium leading-tight tracking-[-0.03em] text-acid transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] translate-y-full group-hover:translate-y-0"
                    >
                      {p.name}
                    </h3>
                  </div>
                  <p className="mt-1.5 truncate text-xs text-ash transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 md:text-sm">
                    {p.tagline}
                    <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ash/70">
                      {p.tags.join(" · ")}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="hidden font-mono text-xs text-ash sm:block">{p.year}</span>
                <span className="flex size-10 items-center justify-center rounded-full border border-bone/15 transition-colors duration-300 group-hover:border-acid group-hover:bg-acid">
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <Reveal className="mt-8 flex items-center justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ash">
            {projects.length} projets publics — {new Date().getFullYear()}
          </p>
          <Link
            href="https://github.com/manoha-dev?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="u-line inline-flex items-center gap-1.5 text-sm text-bone/80 hover:text-bone"
          >
            Tout l'historique sur GitHub <ArrowUpRight className="size-3.5" />
          </Link>
        </Reveal>
      </div>

      {/* Cursor-following preview (desktop hover pointers only) */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[70] hidden md:block"
        style={{ x: springX, y: springY }}
      >
        <AnimatePresence>
          {active !== null ? (
            <div className="-translate-x-1/2 -translate-y-1/2">
              <motion.div
                key={projects[active]!.slug}
                initial={{ opacity: 0, scale: 0.86, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: 2 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="w-[340px] overflow-hidden rounded-xl border border-bone/15 shadow-2xl shadow-black/60"
              >
                <img
                  src={projects[active]!.cover}
                  alt=""
                  className="aspect-[16/10] w-full object-cover"
                />
                <div className="flex items-center justify-between bg-coal px-4 py-2.5">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-acid">
                    {projects[active]!.name}
                  </span>
                  <span className="font-mono text-[10px] text-ash">{projects[active]!.year}</span>
                </div>
              </motion.div>
            </div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
