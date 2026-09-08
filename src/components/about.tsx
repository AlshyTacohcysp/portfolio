"use client";

import { animate, motion, useInView, useReducedMotion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CONTAINER, cx } from "@/lib/utils";
import { site, skills, stats } from "@/data/site";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/ui/reveal";

function AnimatedNumber({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);
  void rounded;

  useEffect(() => {
    if (reduce) {
      setDisplay(value);
      return;
    }
    if (inView) {
      const controls = animate(mv, value, { duration: 1.6, ease: [0.16, 1, 0.3, 1] });
      const unsub = mv.on("change", (v) => setDisplay(Math.round(v)));
      return () => {
        controls.stop();
        unsub();
      };
    }
  }, [inView, value, mv, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {reduce ? value : display}
      {suffix ? <span className="text-acid">{suffix}</span> : null}
    </span>
  );
}

export function About() {
  return (
    <section id="a-propos" className="scroll-mt-24 border-t hairline py-24 md:py-36">
      <div className={cx(CONTAINER, "grid gap-14 lg:grid-cols-12 lg:gap-10")}>
        {/* Left — manifesto */}
        <div className="lg:col-span-7">
          <SectionHeading
            index={2}
            eyebrow="À propos"
            title={[
              "Le design rend",
              <em key="1" className="font-serif font-normal italic">clair</em>,
              "— le code,",
              <em key="2" className="font-serif font-normal italic">possible.</em>,
            ]}
          />
          <div className="mt-10 max-w-2xl space-y-6 text-lg leading-relaxed text-bone/85">
            {site.bio.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
            <Reveal delay={0.25}>
              <p className="font-mono text-sm leading-relaxed text-ash">↳ {site.outside}</p>
            </Reveal>
          </div>
        </div>

        {/* Right — stats */}
        <div className="lg:col-span-5">
          <Reveal>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border hairline bg-bone/10">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="bg-ink p-6 md:p-8"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="font-serif text-[2.6rem] leading-none text-bone md:text-[3.4rem]">
                    <AnimatedNumber value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-3 font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-ash">
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Skills */}
        <div className="lg:col-span-12">
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border hairline bg-bone/10 md:grid-cols-4">
            {skills.map((g, gi) => (
              <Reveal key={g.group} delay={gi * 0.07} className="bg-ink p-6">
                <h3 className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-acid">
                  {g.group}
                  <span className="text-ash">{String(gi + 1).padStart(2, "0")}</span>
                </h3>
                <ul className="mt-4 space-y-2.5" role="list">
                  {g.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-bone/85">
                      <span aria-hidden className="size-1 rounded-full bg-acid/70" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
