"use client";

import { Quote } from "lucide-react";
import { CONTAINER, cx } from "@/lib/utils";
import { testimonials } from "@/data/testimonials";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/ui/reveal";

export function Testimonials() {
  return (
    <section id="recommandations" className="scroll-mt-24 border-t hairline py-24 md:py-36">
      <div className={cx(CONTAINER)}>
        <SectionHeading
          index={5}
          eyebrow="Retours"
          title={[
            "Ils ont",
            <em key="1" className="font-serif font-normal italic">travaillé</em>,
            "avec moi.",
          ]}
        />

        <ul className="mt-14 grid gap-6 md:grid-cols-3" role="list">
          {testimonials.map((t, i) => (
            <li key={t.author}>
              <Reveal delay={i * 0.1} className="h-full">
                <figure className="hairline group flex h-full flex-col justify-between rounded-2xl border bg-coal/40 p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-acid/40 md:p-8">
                  <div>
                    <Quote className="size-5 rotate-180 text-acid/70" aria-hidden />
                    <blockquote className="mt-5 font-serif text-[1.35rem] leading-snug text-bone/90">
                      « {t.quote} »
                    </blockquote>
                  </div>
                  <figcaption className="hairline mt-8 border-t pt-5">
                    <p className="text-sm font-semibold tracking-tight">{t.author}</p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ash">
                      {t.role}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
