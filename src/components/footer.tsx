"use client";

import { ArrowUp } from "lucide-react";
import { CONTAINER, cx } from "@/lib/utils";
import { site } from "@/data/site";
import { Clock } from "@/components/ui/clock";
import { Magnetic } from "@/components/ui/magnetic";
import { useSmoothScroll } from "@/components/providers";

export function Footer() {
  const { lenisRef } = useSmoothScroll();

  const toTop = () => {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="hairline border-t">
      <div className={cx(CONTAINER, "flex flex-col items-start justify-between gap-8 py-10 md:flex-row md:items-center")}>
        <div className="space-y-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ash">
            © {new Date().getFullYear()} {site.name} — tous droits réservés.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ash/70">
            Conçu &amp; codé à {site.city} — Next.js, Tailwind CSS &amp; Framer Motion.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ash/50">
            Space Grotesk · Instrument Serif · JetBrains Mono
          </p>
        </div>

        <div className="flex items-center gap-6">
          <Clock timezone={site.timezone} city={site.city} />
          <Magnetic strength={0.3}>
            <button
              type="button"
              onClick={toTop}
              data-cursor
              data-cursor-label="Haut"
              aria-label="Revenir en haut de la page"
              className="hairline group flex size-12 items-center justify-center rounded-full border bg-coal/50 text-bone transition-colors hover:border-acid hover:bg-acid hover:text-ink"
            >
              <ArrowUp className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
