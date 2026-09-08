"use client";

import { createContext, useContext, useEffect, useRef, type ReactNode, type RefObject } from "react";
import type Lenis from "lenis";

type ScrollCtx = {
  scrollTo: (id: string) => void;
  lenisRef: RefObject<Lenis | null>;
};

const Ctx = createContext<ScrollCtx | null>(null);

export function useSmoothScroll() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSmoothScroll must be used within <Providers>");
  return ctx;
}

/**
 * Providers — Lenis smooth scrolling wired once at the root.
 * Respects prefers-reduced-motion (falls back to native scroll).
 */
export function Providers({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let lenis: Lenis | null = null;
    let raf = 0;
    let cancelled = false;

    // Dynamic import — keeps Lenis out of the critical bundle.
    import("lenis").then(({ default: LenisCtor }) => {
      if (cancelled) return;
      lenis = new LenisCtor({ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true });
      lenisRef.current = lenis;
      const tick = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 72;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(y, { duration: 1.1 });
    } else {
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return <Ctx.Provider value={{ scrollTo, lenisRef }}>{children}</Ctx.Provider>;
}
