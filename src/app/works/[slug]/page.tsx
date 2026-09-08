import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Code2, Play } from "lucide-react";
import { CONTAINER, cx, pad2 } from "@/lib/utils";
import { getAdjacentProject, getProject, projects } from "@/data/projects";
import { site } from "@/data/site";
import { Reveal } from "@/components/ui/reveal";
import { WordsMask } from "@/components/ui/reveal";
import { ParallaxImage } from "@/components/parallax-image";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} — cas d'étude`,
    description: project.summary,
    openGraph: {
      title: `${project.name} — ${project.tagline}`,
      description: project.summary,
      images: [{ url: project.cover, width: 1600, height: 1000, alt: project.name }],
    },
  };
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getAdjacentProject(project.slug);
  const idx = projects.findIndex((p) => p.slug === project.slug) + 1;

  return (
    <article className="pb-0 pt-28 md:pt-36">
      <div className={cx(CONTAINER)}>
        {/* Breadcrumb */}
        <Reveal>
          <Link
            href="/#travaux"
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-ash transition-colors hover:text-bone"
          >
            <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
            Travaux
            <span className="text-ash/60">/ Cas d'étude {pad2(idx)} sur {pad2(projects.length)}</span>
          </Link>
        </Reveal>

        {/* Header */}
        <header className="mt-10 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h1 className="text-[clamp(2.8rem,7vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
              <WordsMask
                as="span"
                from="mount"
                words={[project.name]}
                className="block"
              />
            </h1>
            <p className="mt-4 font-serif text-[clamp(1.4rem,2.6vw,2rem)] italic leading-snug text-ash">
              {project.tagline}
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-bone/85">{project.summary}</p>
          </div>

          <Reveal delay={0.15} className="lg:col-span-4">
            <dl className="hairline grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-bone/10">
              {[
                ["Année", project.year],
                ["Durée", project.duration],
                ["Rôle", project.role],
                ["Équipe", project.team],
              ].map(([k, v]) => (
                <div key={k} className="bg-ink p-5">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-ash">{k}</dt>
                  <dd className="mt-2 text-sm font-medium leading-snug">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </header>

        {/* Cover */}
        <div className="mt-14">
          <ParallaxImage src={project.cover} alt={`Aperçu du projet ${project.name}`} />
        </div>
      </div>

      {/* Body */}
      <div className={cx(CONTAINER, "mt-20")}>
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-8 lg:pr-10">
            {project.sections.map((section, i) => (
              <Reveal key={section.title} delay={i * 0.05}>
                <section className="hairline border-t py-10 first:border-t-0 first:pt-0">
                  <h2 className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-acid">{pad2(i + 1)}</span>
                    <span className="text-2xl font-medium tracking-tight md:text-3xl">{section.title}</span>
                  </h2>
                  <p className="mt-5 max-w-2xl text-[17px] leading-[1.75] text-bone/85">{section.body}</p>
                </section>
              </Reveal>
            ))}
          </div>

          {/* Side rail */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-8">
              <Reveal>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-ash">Résultats clés</h3>
                <ul className="hairline mt-4 divide-y divide-bone/10 overflow-hidden rounded-2xl border bg-coal/40" role="list">
                  {project.results.map((r) => (
                    <li key={r.label} className="p-5">
                      <p className="font-serif text-3xl text-acid">{r.value}</p>
                      <p className="mt-1.5 text-xs leading-relaxed text-ash">{r.label}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.1}>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-ash">Stack technique</h3>
                <ul className="mt-4 flex flex-wrap gap-2" role="list">
                  {project.stack.map((t) => (
                    <li
                      key={t}
                      className="hairline rounded-full border bg-coal/60 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-bone/80"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>

              {(project.links.demo || project.links.repo) && (
                <Reveal delay={0.2}>
                  <div className="flex flex-col gap-3">
                    {project.links.demo ? (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor
                        className="inline-flex items-center justify-between rounded-full bg-acid px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-bone"
                      >
                        <span className="flex items-center gap-2">
                          <Play className="size-3.5" /> Voir le live
                        </span>
                        <ArrowUpRight className="size-4" />
                      </a>
                    ) : null}
                    {project.links.repo ? (
                      <a
                        href={project.links.repo}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor
                        className="hairline inline-flex items-center justify-between rounded-full border bg-transparent px-5 py-3 text-sm font-semibold text-bone transition-colors hover:bg-bone/10"
                      >
                        <span className="flex items-center gap-2">
                          <Code2 className="size-4 text-acid" /> Code source
                        </span>
                        <ArrowUpRight className="size-4" />
                      </a>
                    ) : null}
                  </div>
                </Reveal>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* Next project */}
      {next ? (
        <Link href={`/works/${next.slug}`} data-cursor data-cursor-label="Suivant" className="group mt-24 block border-t hairline">
          <div className={cx(CONTAINER, "flex flex-col justify-between gap-6 py-14 md:flex-row md:items-center")}>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ash">Projet suivant</p>
              <p className="mt-3 text-[clamp(2rem,5vw,4rem)] font-semibold leading-none tracking-[-0.04em] transition-colors duration-300 group-hover:text-acid">
                {next.name}
              </p>
              <p className="mt-3 font-serif text-lg italic text-ash">{next.tagline}</p>
            </div>
            <div className="hairline w-56 shrink-0 overflow-hidden rounded-xl border transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-2 group-hover:scale-[1.03]">
              <img src={next.cover} alt="" aria-hidden className="aspect-[16/10] w-full object-cover" />
            </div>
          </div>
        </Link>
      ) : null}

      <div className={cx(CONTAINER, "hairline flex flex-wrap items-center justify-between gap-4 border-t py-8 text-center")}>
        <Link href="/#contact" className="u-line text-sm text-bone/80 hover:text-bone">
          Une question sur ce projet ? Écrivez-moi →
        </Link>
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ash/60">
          {site.name} — {new Date().getFullYear()}
        </p>
      </div>
    </article>
  );
}
