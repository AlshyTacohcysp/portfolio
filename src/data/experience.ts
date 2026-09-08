/**
 *  Parcours — expériences & formation.
 *  Remplacez tranquillement par vos vraies lignes.
 */

export type ExperienceItem = {
  kind: "work" | "school";
  org: string;
  role: string;
  period: string;
  location: string;
  blurb: string;
  tech: string[];
};

export const experience: ExperienceItem[] = [
  {
    kind: "work",
    org: "Kintana Labs",
    role: "Stage — Développeur Front-End",
    period: "Avr. 2025 — Sept. 2025",
    location: "Antananarivo",
    blurb:
      "Refonte du portail client d'une fintech : migration vers Next.js App Router, design system partagé avec l'équipe produit, passage de 4,2 s à 1,3 s de LCP sur les écrans clés.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
  },
  {
    kind: "work",
    org: "Freelance",
    role: "Développeur web produit",
    period: "Janv. 2024 — aujourd'hui",
    location: "Remote · Tanà",
    blurb:
      "Sites vitrine et outils internes pour 6 clients (ONG, restaurants, artisans) : de la maquette Figma à la mise en production. Un fil rouge : vite chargé, facile à vivre, durable.",
    tech: ["React", "Vite", "Supabase", "Stripe"],
  },
  {
    kind: "school",
    org: "Université d'Antananarivo",
    role: "Licence 3 — Informatique (GL)",
    period: "2023 — 2026 (en cours)",
    location: "Ankatso",
    blurb:
      "Génie logiciel, algorithmique, bases de données et interactions homme-machine. Projet de fin de L2 primé au hackathon universitaire : plateforme de covoiturage inter-villes.",
    tech: ["Algorithmique", "UML", "Java", "PostgreSQL"],
  },
  {
    kind: "work",
    org: "GDG Antananarivo",
    role: "Bénévole — Dev community",
    period: "2024 — aujourd'hui",
    location: "Antananarivo",
    blurb:
      "Ateliers React & accessibilité pour 40+ étudiant·es, co-organisation de deux DevFest, mentorat de trois projets étudiants jusqu'à la mise en ligne.",
    tech: ["Public speaking", "Mentorat"],
  },
];
