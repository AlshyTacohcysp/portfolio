"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-_\\/[]{}—=+*^?#·01";

type Frame = { from: string; to: string; start: number; end: number; char?: string };

function buildQueue(from: string, to: string): Frame[] {
  const length = Math.max(from.length, to.length);
  const queue: Frame[] = [];
  for (let i = 0; i < length; i++) {
    const start = Math.floor(Math.random() * 28);
    queue.push({
      from: from[i] ?? "",
      to: to[i] ?? "",
      start,
      end: start + Math.floor(Math.random() * 28) + 6,
    });
  }
  return queue;
}

/**
 * Scramble — decode-text effect.
 * `trigger="view"` plays when scrolled into view; `trigger="hover"` replays on hover (set data attributes on parent).
 */
export function Scramble({
  text,
  className,
  trigger = "view",
}: {
  text: string;
  className?: string;
  trigger?: "view" | "hover" | "mount";
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(trigger === "view" || trigger === "mount" ? "" : text);
  const rafRef = useRef<number | undefined>(undefined);

  const run = useCallback(() => {
    if (reduce) {
      setDisplay(text);
      return;
    }
    const queue = buildQueue("", text);
    let frame = 0;
    const tick = () => {
      let done = 0;
      let out = "";
      for (const item of queue) {
        if (frame >= item.end) {
          done++;
          out += item.to;
        } else if (frame >= item.start) {
          if (!item.char || Math.random() < 0.28) {
            item.char = CHARS[Math.floor(Math.random() * CHARS.length)]!;
          }
          out += item.char;
        } else {
          out += " ";
        }
      }
      setDisplay(out);
      if (done === queue.length) return;
      frame++;
      rafRef.current = requestAnimationFrame(tick);
    };
    tick();
  }, [text, reduce]);

  useEffect(() => {
    if (trigger === "view") {
      if (inView) run();
    } else if (trigger === "mount") {
      run();
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [trigger, inView, run]);

  return (
    <span
      ref={ref}
      className={className}
      onMouseEnter={trigger === "hover" ? run : undefined}
      aria-label={text}
    >
      <span aria-hidden>{display || (reduce ? text : "\u00A0".repeat(text.length))}</span>
    </span>
  );
}
