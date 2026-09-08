"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Cursor — a precision dot + a lagging ring that reacts to interactive
 * elements (a, button, [data-cursor]). Only rendered on fine pointers;
 * the CSS layer hides the native cursor in the same media query.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { stiffness: 320, damping: 26, mass: 0.5 });
  const ringY = useSpring(dotY, { stiffness: 320, damping: 26, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnabled(fine.matches);
    const onChange = (e: MediaQueryListEvent) => setEnabled(e.matches);
    fine.addEventListener("change", onChange);

    const move = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      const target = (e.target as HTMLElement)?.closest?.(
        'a, button, [role="button"], [data-cursor]'
      ) as HTMLElement | null;
      setHovering(Boolean(target));
      setLabel(target?.dataset?.cursorLabel ?? null);
    };
    const md = () => setDown(true);
    const mu = () => setDown(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", md);
    window.addEventListener("mouseup", mu);
    return () => {
      fine.removeEventListener("change", onChange);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", md);
      window.removeEventListener("mouseup", mu);
    };
  }, [dotX, dotY]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
        style={{ x: dotX, y: dotY }}
        aria-hidden
      >
        <motion.span
          className="absolute block h-[6px] w-[6px] rounded-full bg-bone"
          style={{ translateX: "-50%", translateY: "-50%" }}
          animate={{ opacity: hovering ? 0 : 1 }}
        />
      </motion.div>

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] flex mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        aria-hidden
      >
        <motion.span
          className="flex items-center justify-center rounded-full border border-bone/60"
          initial={false}
          animate={{ width: hovering ? 68 : 36, height: hovering ? 68 : 36, scale: down ? 0.82 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
        >
          <AnimatePresence>
            {label ? (
              <motion.span
                key={label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.2em] text-ink"
              >
                {label}
              </motion.span>
            ) : null}
          </AnimatePresence>
        </motion.span>
      </motion.div>
    </>
  );
}
