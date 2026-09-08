import type { Metadata, Viewport } from "next";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Cursor } from "@/components/cursor";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { site } from "@/data/site";
import { cx } from "@/lib/utils";

const DESCRIPTION =
  "Portfolio de Manoha Rakoto, développeur front-end et design engineer à Antananarivo. Étudiant en Licence 3 Informatique — React, Next.js, TypeScript, Tailwind. Disponible pour un stage de fin d'études et des missions freelance.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: DESCRIPTION,
  keywords: [
    "portfolio",
    "développeur front-end",
    "design engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Antananarivo",
    "Madagascar",
    "stage",
    "freelance",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: DESCRIPTION,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "Développeur Front-End & Design Engineer",
  email: `mailto:${site.email}`,
  url: site.url,
  address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: "MG" },
  sameAs: [
    "https://github.com/manoha-dev",
    "https://linkedin.com/in/manoha-rakoto",
    "https://x.com/manoha_dev",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={cx("relative bg-ink text-bone")}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-acid focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink"
        >
          Aller au contenu
        </a>

        <Providers>
          <Cursor />
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </Providers>

        {/* Film grain */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[95] opacity-[0.05] mix-blend-soft-light"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </body>
    </html>
  );
}
