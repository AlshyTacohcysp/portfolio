"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cx } from "@/lib/utils";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ------------------------------------------------------------------ */
/*  Reveal — fade + rise, triggered when scrolled into view            */
/* ------------------------------------------------------------------ */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-64px" }}
      transition={{ duration: 0.9, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  WordsMask — per-word line-mask reveal.                             */
/*  Each word slides up from behind its own clipping mask, staggered.  */
/* ------------------------------------------------------------------ */
const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055 } },
};

const wordVariants: Variants = {
  hidden: { y: "115%" },
  show: { y: "0%", transition: { duration: 0.9, ease: EASE_OUT } },
};

export function WordsMask({
  words,
  className,
  as = "span",
  from = "mount",
  delay = 0,
}: {
  words: ReactNode[];
  className?: string;
  as?: "span" | "h1" | "h2";
  /** "mount" = play once on load, "view" = play when scrolled into view */
  from?: "mount" | "view";
  delay?: number;
}) {
  const reduce = useReducedMotion();

  const Component = as === "h1" ? motion.h1 : as === "h2" ? motion.h2 : motion.span;

  if (reduce) {
    const Static = as === "h1" ? "h1" : as === "h2" ? "h2" : "span";
    return (
      <Static className={className}>
        {words.map((w, i) => (
          <span key={i}>
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </Static>
    );
  }

  return (
    <Component
      className={cx(className, "inline")}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.055, delayChildren: delay } },
      }}
      initial="hidden"
      {...(from === "view"
        ? { whileInView: "show", viewport: { once: true, margin: "-64px" } }
        : { animate: "show" })}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.06em] align-bottom">
          <motion.span variants={wordVariants} className="inline-block">
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}
