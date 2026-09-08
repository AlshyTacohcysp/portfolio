"use client";

import { Gauge, Layers, PencilRuler, Rocket } from "lucide-react";
import { CONTAINER, cx, pad2 } from "@/lib/utils";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/ui/reveal";

const principles = [
  {
    icon: PencilRuler,
    title: "Comprendre avant coder",
    body: "Un bon produit commence par une vraie conversation : qui l'utilise, sous quelle connexion, avec quelle urgence. Les maquettes viennent après.",
  },
  {
    icon: Layers,
    title: "Design system d'abord",
    body: "Tokens, composants documentés, règles de rythme : une base saine pour que le projet vive trois ans sans s'effondrer sous la dette visuelle.",
  },
  {
    icon: Gauge,
    title: "Performance obsessionnelle",
    body: "Budgets de poids, images AVIF, JS critique minimal, mesure continue. Une interface belle mais lente est une interface ratée.",
  },
  {
    icon: Rocket,
    title: "Livrer, mesurer, itérer",
    body: "Petits incréments déployés en continu, analytics de perf branchés, et une règle : aucune feature sans preuve qu'elle sert l'utilisateur.",
  },
];

export function Approach() {
  return (
    <section id="approche" className="scroll-mt-24 border-t hairline py-24 md:py-36">
      <div className={cx(CONTAINER)}>
        <SectionHeading
          index={4}
          eyebrow="Méthode"
          title={[
            "Quatre principes",
            <em key="1" className="font-serif font-normal italic">non négociables.</em>,
          ]}
        />

        <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border hairline bg-bone/10 md:grid-cols-2 xl:grid-cols-4" role="list">
          {principles.map((p, i) => (
            <li key={p.title}>
              <Reveal delay={i * 0.08} className="h-full">
                <article className="group relative flex h-full flex-col bg-ink p-7 transition-colors duration-500 hover:bg-coal md:p-8">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-5 top-4 font-serif text-6xl italic text-bone/8 transition-all duration-500 group-hover:text-acid/25 group-hover:-translate-y-1"
                  >
                    {pad2(i + 1)}
                  </span>
                  <p.icon
                    className="size-6 text-acid transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
                    strokeWidth={1.6}
                  />
                  <h3 className="mt-6 text-lg font-medium tracking-tight">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ash">{p.body}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
