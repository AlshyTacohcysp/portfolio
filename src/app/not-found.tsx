import Link from "next/link";
import { Home } from "lucide-react";
import { CONTAINER, cx } from "@/lib/utils";

export default function NotFound() {
  return (
    <section className={cx(CONTAINER, "flex min-h-[100svh] flex-col items-center justify-center py-32 text-center")}>
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-acid">Erreur 404</p>
      <h1 className="mt-6 text-[clamp(3rem,12vw,9rem)] font-semibold leading-none tracking-[-0.05em]">
        Page <em className="font-serif font-normal italic text-ash">introuvable</em>
      </h1>
      <p className="mt-6 max-w-md text-base leading-relaxed text-ash">
        Ce lien mène vers une page qui a été déplacée, renommée… ou qui n'a jamais existé.
        Reprenons depuis le début.
      </p>
      <Link
        href="/"
        data-cursor
        className="mt-10 inline-flex items-center gap-2.5 rounded-full bg-acid px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-bone"
      >
        <Home className="size-4" /> Retour à l'accueil
      </Link>
    </section>
  );
}
