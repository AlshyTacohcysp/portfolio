"use client";

import { BriefcaseBusiness, GraduationCap } from "lucide-react";
import { CONTAINER, cx } from "@/lib/utils";
import { experience } from "@/data/experience";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/ui/reveal";

export function Experience() {
  return (
    <section id="parcours" className="scroll-mt-24 border-t hairline py-24 md:py-36">
      <div className={cx(CONTAINER, "grid gap-14 lg:grid-cols-12")}>
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              index={3}
              eyebrow="Parcours"
              title={[
                "Trois ans",
                <em key="1" className="font-serif font-normal italic">à apprendre</em>,
                "en public.",
              ]}
              description="Formation universitaire, stage en startup, freelance et communauté — chaque ligne a produit du code en production ou des gens formés."
            />
          </div>
        </div>

        <ol className="hairline lg:col-span-8 lg:pl-14" role="list">
          {experience.map((item, i) => (
            <li key={`${item.org}-${i}`} className="relative">
              <Reveal delay={i * 0.06}>
                <article className="hairline group border-t py-8 transition-colors first:border-t-0 md:py-10">
                  <header className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span
                      aria-hidden
                      className="flex size-8 items-center justify-center rounded-full border border-bone/15 bg-coal text-ash transition-colors duration-300 group-hover:border-acid group-hover:text-acid"
                    >
                      {item.kind === "work" ? (
                        <BriefcaseBusiness className="size-3.5" />
                      ) : (
                        <GraduationCap className="size-3.5" />
                      )}
                    </span>
                    <h3 className="text-lg font-medium tracking-tight md:text-xl">
                      {item.org}
                    </h3>
                    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ash">
                      {item.period}
                    </span>
                    <span className="ml-auto hidden font-mono text-[11px] uppercase tracking-[0.22em] text-ash sm:block">
                      {item.location}
                    </span>
                  </header>
                  <p className="mt-3 text-sm font-medium text-acid">{item.role}</p>
                  <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-bone/80">{item.blurb}</p>
                  <ul className="mt-4 flex flex-wrap gap-2" role="list">
                    {item.tech.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-bone/12 bg-coal/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ash"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
