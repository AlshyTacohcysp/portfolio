"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { CONTAINER, cx } from "@/lib/utils";
import { navLinks, site } from "@/data/site";
import { Magnetic } from "@/components/ui/magnetic";
import { useSmoothScroll } from "@/components/providers";

const SECTION_IDS = navLinks.map((l) => l.href.replace("#", ""));

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  const { scrollTo, lenisRef } = useSmoothScroll();

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  // Scroll spy — highlight the section currently in view
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    }
    return () => obs.disconnect();
  }, []);

  // Lock scroll while the mobile overlay is open
  useEffect(() => {
    if (open) {
      lenisRef.current?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      lenisRef.current?.start();
      document.documentElement.style.overflow = "";
    }
    return () => {
      lenisRef.current?.start();
      document.documentElement.style.overflow = "";
    };
  }, [open, lenisRef]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (e: React.MouseEvent, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    setOpen(false);
    scrollTo(href.slice(1));
  };

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className={cx(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled
            ? "border-b border-bone/10 bg-ink/75 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        {/* Reading progress */}
        <motion.div
          aria-hidden
          className="absolute inset-x-0 top-0 z-10 h-[2px] origin-left bg-acid"
          style={{ scaleX: progress }}
        />
        <nav className={cx(CONTAINER, "flex h-16 items-center justify-between md:h-20")}>
          {/* Brand */}
          <Link
            href="/#top"
            onClick={(e) => {
              e.preventDefault();
              lenisRef.current?.scrollTo(0, { duration: 1.1 });
            }}
            className="group flex items-center gap-3"
            aria-label={`${site.name} — retour en haut`}
          >
            <span className="relative flex size-9 items-center justify-center rounded-full border border-bone/20 bg-acid font-mono text-[11px] font-bold text-ink transition-transform duration-500 group-hover:rotate-[-8deg]">
              MR
            </span>
            <span className="hidden text-sm font-medium tracking-tight sm:block">
              {site.name}
              <span className="text-ash"> — {site.role.split(" · ")[0]}</span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex" role="list">
            {navLinks.map((link) => {
              const id = link.href.slice(1);
              const isActive = active === id;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={(e) => go(e, link.href)}
                    className={cx(
                      "relative block px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors",
                      isActive ? "text-bone" : "text-ash hover:text-bone"
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full border border-bone/15 bg-bone/5"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                    <span className="relative">{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <Magnetic className="pointer-fine:hidden lg:block" strength={0.25}>
              <a
                href={`mailto:${site.email}`}
                data-cursor
                data-cursor-label="Écrire"
                className="group inline-flex items-center gap-2 rounded-full bg-bone px-5 py-2.5 text-sm font-semibold text-ink transition-colors duration-300 hover:bg-acid"
              >
                Me contacter
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Magnetic>

            {/* Burger */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              className="flex size-10 items-center justify-center rounded-full border border-bone/15 text-bone lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open ? (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-ink lg:hidden"
          >
            <motion.div className={cx(CONTAINER, "flex h-full flex-col justify-center pb-20")}
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
            >
              <ul className="space-y-2" role="list">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    variants={{ hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0 } }}
                    className="overflow-hidden"
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => go(e, link.href)}
                      className="flex items-baseline gap-4 py-2 text-5xl font-medium tracking-tight"
                    >
                      <span className="font-mono text-xs text-acid">0{i + 1}</span>
                      <span className="u-line">{link.label}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <motion.p
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                className="mt-12 font-mono text-xs uppercase tracking-[0.25em] text-ash"
              >
                {site.location}
              </motion.p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
