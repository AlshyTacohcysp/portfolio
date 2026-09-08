"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/** Cover image that gently scales with scroll — subtle editorial parallax. */
export function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.08]);
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <div ref={ref} className="hairline group relative overflow-hidden rounded-2xl border">
      <motion.img
        src={src}
        alt={alt}
        loading="eager"
        className="aspect-[16/9] w-full object-cover"
        style={reduce ? undefined : { scale, y }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent opacity-70 mix-blend-multiply"
      />
    </div>
  );
}
