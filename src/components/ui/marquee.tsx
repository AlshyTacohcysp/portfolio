import { cx } from "@/lib/utils";

/**
 * Marquee — infinite horizontal ticker, pure CSS (duplicated track).
 * Pauses on hover. Decorative copy only (aria-hidden on the duplicate).
 */
export function Marquee({
  items,
  reverse = false,
  className,
  separator = "✦",
}: {
  items: string[];
  reverse?: boolean;
  className?: string;
  separator?: string;
}) {
  const track = (
    <div className="flex w-max shrink-0 items-center">
      {items.map((item, i) => (
        <span key={i} className="flex items-center whitespace-nowrap">
          <span className="px-6 text-sm font-medium uppercase tracking-[0.22em] md:text-base">{item}</span>
          <span aria-hidden className="text-acid">
            {separator}
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={cx("group relative overflow-hidden", className)} dir="ltr">
      <div
        className={cx(
          "flex w-max motion-reduce:animate-none group-hover:[animation-play-state:paused]",
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        )}
      >
        {track}
        <div aria-hidden>
          {track}
        </div>
      </div>
    </div>
  );
}
