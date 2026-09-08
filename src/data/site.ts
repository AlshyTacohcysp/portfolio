/**
 * ════════════════════════════════════════════════════════════════════
 *  Identité du site — REMPLACEZ les valeurs par les vôtres.
 *  Tout le contenu du portfolio se pilote depuis src/data/*.
 * ════════════════════════════════════════════════════════════════════
 */

export const site = {
  name: "Manoha Rakoto",
  firstName: "Manoha",
  fullNameIntl: "M. Rakoto",
  role: "Développeur Front-End · Design Engineer",
  roleScramble: "Front-End Engineer & UI Craftsman",
  location: "Antananarivo, Madagascar",
  city: "Antananarivo",
  timezone: "Indian/Antananarivo",
  url: "https://manoha.dev",
  email: "hello@manoha.dev",
  availability: "Disponible — stage de fin d'études & missions freelance",
  bio: [
    "Étudiant en Licence 3 Informatique à Antananarivo, je conçois et développe des interfaces web rapides, accessibles et mémorables. Mon terrain de jeu : la frontière entre le design et le code — là où un produit prend vraiment vie.",
    "Depuis trois ans, je transforme des maquettes en produits : design systems, animations, dashboards temps réel. Je soigne les détails que l'on ne remarque pas — et qui font qu'une interface paraît évidente.",
  ],
  outside: "En dehors du code : photo argentique sur les toits de Tanà, football à Analakely, et une obsession pour les bons cafés.",
} as const;

export const socials = [
  { label: "GitHub", href: "https://github.com/manoha-dev", handle: "@manoha-dev" },
  { label: "LinkedIn", href: "https://linkedin.com/in/manoha-rakoto", handle: "in/manoha-rakoto" },
  { label: "X / Twitter", href: "https://x.com/manoha_dev", handle: "@manoha_dev" },
  { label: "Dribbble", href: "https://dribbble.com/manoha", handle: "manoha" },
] as const;

export const stats = [
  { value: 3, suffix: "ans", label: "à coder pour le web" },
  { value: 12, suffix: "+", label: "projets livrés" },
  { value: 100, suffix: "", label: "score Lighthouse moyen" },
  { value: 4, suffix: "", label: "hackathons, dont 2 gagnés" },
] as const;

export const skills = [
  {
    group: "Front-End",
    items: ["React 19", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Accessibilité (RGAA/WCAG)"],
  },
  {
    group: "Design & Motion",
    items: ["Figma", "Design systems", "Prototypage", "Micro-interactions", "Typographie UI"],
  },
  {
    group: "Backend & Data",
    items: ["Node.js", "PostgreSQL", "Supabase", "REST & tRPC", "Stripe"],
  },
  {
    group: "Qualité & Outils",
    items: ["Git & GitHub Actions", "Vitest / Playwright", "CI-CD Vercel", "Storybook", "Monitoring perf"],
  },
] as const;

export const navLinks = [
  { label: "Travaux", href: "#travaux" },
  { label: "À propos", href: "#a-propos" },
  { label: "Parcours", href: "#parcours" },
  { label: "Contact", href: "#contact" },
] as const;
