import { cx, CONTAINER } from "@/lib/utils";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/ui/marquee";
import { WorkList } from "@/components/work-list";
import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { Approach } from "@/components/approach";
import { Testimonials } from "@/components/testimonials";
import { Contact } from "@/components/contact";

const TICKER_A = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Design systems",
  "Accessibilité",
  "Performance web",
];

const TICKER_B = [
  "Stage de fin d'études 2026",
  "Missions freelance",
  "Basé à Antananarivo",
  "Disponible à distance",
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Skill ticker */}
      <div className={cx("hairline border-y bg-coal/40 py-4 md:py-5")}>
        <Marquee items={TICKER_A} className="text-bone/80" />
        <Marquee items={TICKER_B} reverse className="mt-3 text-acid/90" separator="—" />
      </div>

      <WorkList />
      <About />
      <Experience />
      <Approach />
      <Testimonials />
      <Contact />
    </>
  );
}
