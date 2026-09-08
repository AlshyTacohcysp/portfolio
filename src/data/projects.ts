/**
 *  Projets / cas d'étude — remplacez par les vôtres.
 *  Les visuels couverts vivent dans public/works/.
 */

export type CaseSection = { title: string; body: string };

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  year: string;
  duration: string;
  role: string;
  team: string;
  summary: string;
  cover: string;
  tags: string[];
  stack: string[];
  sections: CaseSection[];
  results: { value: string; label: string }[];
  links: { demo?: string; repo?: string };
};

export const projects: Project[] = [
  {
    slug: "vola",
    name: "Vola",
    tagline: "L'épargne mobile repensée pour Madagascar",
    year: "2025",
    duration: "4 mois",
    role: "Lead front-end & design",
    team: "3 personnes",
    summary:
      "Application web d'épargne de tontine digitale : solder un groupe, suivre les cotisations en temps réel, et rendre la confiance visible.",
    cover: "/works/vola.jpg",
    tags: ["FinTech", "Temps réel", "PWA"],
    stack: ["Next.js", "TypeScript", "Supabase Realtime", "Tailwind", "Framer Motion", "Recharts"],
    sections: [
      {
        title: "Contexte",
        body: "La tontine (fihavanana) est partout à Madagascar, mais elle vit dans des carnets. Une erreur de suivi, une réunion manquée, et la confiance du groupe s'effrite. Le brief : digitaliser le cycle complet sans jamais trahir les usages — les mêmes rôles, le même rythme, le même langage.",
      },
      {
        title: "Le défi",
        body: "Concevoir une interface crédible pour des utilisateurs peu à l'aise avec le numérique, sur des téléphones d'entrée de gamme et des réseaux instables. Chaque kilooctet comptait, chaque interaction devait être réversible.",
      },
      {
        title: "L'approche",
        body: "Un design system minimal (12 composants, tokens exportés depuis Figma), des mises à jour temps réel avec bascule optimiste, et un mode « hors-ligne » qui met les actions en file d'attente. J'ai pushé la performance à fond : images AVIF, polyfills ciblés, budget de 120 Ko de JS critique — et un onboarding guidé en moins de 90 secondes.",
      },
    ],
    results: [
      { value: "4,8★", label: "note des 320 premiers utilisateurs" },
      { value: "−62%", label: "d'erreurs de suivi vs. carnet papier" },
      { value: "1,1 s", label: "LCP sur 3G à Antananarivo" },
    ],
    links: { demo: "https://vola.manoha.dev", repo: "https://github.com/manoha-dev/vola" },
  },
  {
    slug: "zebu-market",
    name: "Zébu Market",
    tagline: "La marketplace des artisans malgaches",
    year: "2024",
    duration: "6 mois",
    role: "Développeur full-stack",
    team: "5 personnes",
    summary:
      "Plateforme e-commerce reliant 80 artisans des Hauts-Plateaux à des acheteurs locaux et de la diaspora, paiement mobile money inclus.",
    cover: "/works/zebu-market.jpg",
    tags: ["E-commerce", "Stripe", "Design system"],
    stack: ["Next.js", "tRPC", "PostgreSQL", "Prisma", "Tailwind", "Stripe / MVola"],
    sections: [
      {
        title: "Contexte",
        body: "Les artisans d'Antsirabe et d'Ambohimanga vendaient uniquement sur les trottoirs. Zébu Market devait leur offrir une vitrine en ligne — sans leur demander de gérer un site : photographie, stock et expédition simplifiés au maximum.",
      },
      {
        title: "Le défi",
        body: "Un back-office utilisable depuis un téléphone, des fiches produit construites en trois étapes, et des paiements hybrides : Mobile Money local, carte pour la diaspora, livraison groupée par taxi-brousse. Le tout avec un coût d'infrastructure proche de zéro.",
      },
      {
        title: "L'approche",
        body: "J'ai construit le tunnel d'achat et le dashboard vendeur : composants accessibles, clavier d'abord, validation optimiste. Côté back, une architecture « edge » avec cache HTTP de 30 s, des webhooks Stripe MVola idempotents, et un pipeline d'images qui génère les formats au moment du build d'annonce.",
      },
    ],
    results: [
      { value: "80", label: "artisans vendeurs actifs" },
      { value: "×2,4", label: "de chiffre d'affaires mensuel en 6 mois" },
      { value: "97", label: "score Lighthouse performance" },
    ],
    links: { demo: "https://zebumarket.example.mg", repo: "https://github.com/manoha-dev/zebu-market" },
  },
  {
    slug: "tsara-ui",
    name: "Tsara UI",
    tagline: "Un design system open source 100 % malgache",
    year: "2025",
    duration: "En continu",
    role: "Créateur & mainteneur",
    team: "Solo + 4 contributeurs",
    summary:
      "40 composants React accessibles, documentés dans Storybook, pensés pour la typographie et les produits à faible connectivité.",
    cover: "/works/tsara-ui.jpg",
    tags: ["Open source", "Design system", "A11y"],
    stack: ["React", "TypeScript", "Radix UI", "Tailwind", "Storybook", "Vitest"],
    sections: [
      {
        title: "Contexte",
        body: "À chaque nouveau projet étudiant, la même question : repartir de zéro ? Tsara UI (« le beau » en malgache) est né pour capitaliser — une base saine, testée, libre, que n'importe quelle équipe de la région peut adopter en dix minutes.",
      },
      {
        title: "Le défi",
        body: "Faire aussi bien que les grands systèmes internationaux avec trois fois moins de dépendances : contraste AA garanti, gestion des focus visibles, navigation clavier complète, et des bundles tree-shakables sous la barre des 8 Ko par composant.",
      },
      {
        title: "L'approche",
        body: "Tokens de design en premier (couleurs, rythme typographique, espacements), composants headless sur Radix, documentation bilingue FR/MG et tests visuels sur Playwright. Une release par mois, changelog tenu, et un workflow de contributions accueillant pour les étudiants.",
      },
    ],
    results: [
      { value: "1,2 k", label: "étoiles GitHub" },
      { value: "40", label: "composants accessibles" },
      { value: "9", label: "pays utilisant le package" },
    ],
    links: { demo: "https://tsara-ui.vercel.app", repo: "https://github.com/manoha-dev/tsara-ui" },
  },
  {
    slug: "aina",
    name: "Aina",
    tagline: "Journal de bien-être, hors-ligne par défaut",
    year: "2024",
    duration: "10 semaines",
    role: "Développeur & designer",
    team: "Solo (projet perso)",
    summary:
      "PWA de suivi d'humeur et de respiration guidée, fonctionnant intégralement sans réseau, avec chiffrement local des entrées.",
    cover: "/works/aina.jpg",
    tags: ["PWA", "IndexedDB", "Motion"],
    stack: ["React", "Vite", "Service Workers", "IndexedDB", "Web Animations API", "Web Crypto"],
    sections: [
      {
        title: "Contexte",
        body: "Beaucoup d'applis de bien-être supposent une connexion continue. À Tanà, les coupures sont fréquentes, et la confidentialité des données de santé est un vrai sujet. Aina répond aux deux : tout est local, rien ne sort du téléphone.",
      },
      {
        title: "Le défi",
        body: "Créer un moment — trois minutes par jour — qui apaise au lieu d'ajouter de la friction : une respiration guidée dont le rythme pilote l'animation, et une grille d'humeur qui se remplit au pouce, une main tenant le téléphone.",
      },
      {
        title: "L'approche",
        body: "Zéro framework UI : composants maison, animations synchronisées sur l'API WAAPI pour coller aux frames de respiration, IndexedDB chiffré (AES-GCM, clé dérivée d'un passecode), et export en Markdown pour celleux qui veulent posséder leurs données.",
      },
    ],
    results: [
      { value: "0", label: "requête réseau au quotidien" },
      { value: "−41%", label: "de temps moyen par entrée vs. concurrents" },
      { value: "3 h", label: "en démo à la DevFest Antananarivo" },
    ],
    links: { demo: "https://aina.manoha.dev", repo: "https://github.com/manoha-dev/aina" },
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return undefined;
  return projects[(i + 1) % projects.length];
}
