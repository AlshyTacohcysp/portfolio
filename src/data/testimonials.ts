export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Manoha arrive avec des maquettes, repart avec un produit en production — et un score de perf au-dessus de nos objectifs. Le combo design + code est rare à ce niveau.",
    author: "Hery Andrianina",
    role: "CTO, Kintana Labs",
  },
  {
    quote:
      "Il a compris nos artisans mieux que nous : l'interface qu'il a dessinée se manie depuis un téléphone, à une main, sous la pluie. Zéro formation nécessaire.",
    author: "Voahangy Rasolonjatovo",
    role: "Directrice produit, Zébu Market",
  },
  {
    quote:
      "Le design system Tsara UI a standardisé trois projets de promo en un semestre. C'est devenu la référence des étudiants en filière génie logiciel.",
    author: "Prof. T. Randriamiarana",
    role: "Département Informatique, Univ. d'Antananarivo",
  },
];
