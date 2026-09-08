import type { ReactNode } from "react";
import { WordsMask } from "@/components/ui/reveal";
import { cx, pad2 } from "@/lib/utils";

/**
 * SectionHeading — numbered editorial header:
 *   01 · (mono eyebrow)
 *   Giant title with line-mask word reveal, optional serif accent.
 */
export function SectionHeading({
  index,
  title,
  eyebrow,
  description,
  className,
}: {
  index: number;
  title: ReactNode[];
  eyebrow?: string;
  description?: ReactNode;
  className?: string;
}) {
  return (
    <header className={cx("relative", className)}>
      <div className="mb-6 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.28em] text-ash">
        <span className="text-acid">{pad2(index)}</span>
        <span aria-hidden className="h-px w-10 bg-bone/20" />
        {eyebrow ? <span>{eyebrow}</span> : null}
      </div>
      <WordsMask
        as="h2"
        from="view"
        words={title}
        className={cx(
          "block text-[clamp(2.1rem,5.5vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.035em]"
        )}
      />
      {description ? (
        <p className="mt-5 max-w-xl text-base leading-relaxed text-ash md:text-lg">{description}</p>
      ) : null}
    </header>
  );
}
