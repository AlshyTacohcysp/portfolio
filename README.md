# Portfolio — Manoha Rakoto

Portfolio complet façon « design engineer senior » : Next.js 15 (App Router), React 19,
TypeScript strict, Tailwind CSS v4 (tokens CSS-first), Framer Motion, Lenis, polices
auto-hébergées (Fontsource). Contenu **100 % piloté par les données** — remplacez les
fichiers de `src/data/` et le site est le vôtre.

## Démarrer

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de production
npm run typecheck  # tsc --noEmit
```

## Où personnaliser

| Quoi | Fichier |
| --- | --- |
| Nom, rôle, email, bio, disponibilités, liens sociaux, stats, skills | `src/data/site.ts` |
| Projets (cas d'étude complets : contexte, approche, résultats) | `src/data/projects.ts` |
| Expériences & formation | `src/data/experience.ts` |
| Témoignages | `src/data/testimonials.ts` |
| Couleurs, polices, animations | `src/app/globals.css` (bloc `@theme`) |
| Images de couverture | `public/works/*.jpg` (ratio 16/10 recommandé) |

> ⚠️ Le contenu actuel est un **placeholder réaliste** (persona « Manoha, L3 Informatique ») :
> remplacez-le par les infos de votre CV avant mise en ligne.

## Ce qui est inclus

- **Accueil** : hero typographique (word-mask reveal + scramble), ticker de compétences
  (marquee CSS), index des projets à aperçu suiveur de curseur, section À propos avec
  stats animées et skills, parcours sticky, méthode en 4 principes, témoignages,
  contact avec copie d'email et marquee de fin.
- **Cas d'étude** `/works/[slug]` : SSG (`generateStaticParams`), méta données par page,
  image parallaxe, résultats chiffrés, rail collant (stack, liens), projet suivant.
- **Système** : curseur custom (point + anneau, labels au survol), smooth scroll Lenis,
  barre de progression de lecture, grain filmique, `prefers-reduced-motion` respecté
  partout, focus-visible, skip-link, SEO (metadata, OG image générée, JSON-LD Person,
  sitemap, robots), 404 soignée, favicon SVG.

## Déployer

Rien à configurer d'obligatoire : Vercel/Netty détectent Next.js. Pensez à :
1. Mettre votre domaine dans `site.url` (`src/data/site.ts`) — utilisé pour metadata,
   sitemap et robots.
2. Remplacer les liens sociaux et l'email.

## Licence

Contenu et code : à vous. Polices via [Fontsource](https://fontsource.org) (OFL).
