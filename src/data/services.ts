/**
 * Leistungen/Services für pSEO
 * Fokus: Scheibenwechsel (Front- und Heckscheibe)
 */

export interface Service {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  keywords: string[];
  icon: string;
  duration: string;
  priceRange: string;
  insuranceCovered: boolean;
}

export const services: Service[] = [
  {
    slug: "scheibenwechsel",
    name: "Scheibenwechsel",
    shortName: "Scheibenwechsel",
    description: "Professioneller Austausch von Front- und Heckscheiben mit Original-Qualität",
    keywords: [
      "scheibenwechsel",
      "windschutzscheibe wechseln",
      "windschutzscheibe tauschen",
      "autoscheibe wechseln",
      "frontscheibe wechseln",
      "windschutzscheibe austauschen",
      "heckscheibe wechseln",
      "autoglas wechseln"
    ],
    icon: "🔄",
    duration: "ca. 1-2 Stunden",
    priceRange: "ab 250 € / je nach Fahrzeug",
    insuranceCovered: true
  },
  {
    slug: "frontscheibe-wechseln",
    name: "Frontscheibe wechseln",
    shortName: "Frontscheibe",
    description: "Professioneller Austausch der Windschutzscheibe mit Kalibrierung aller Assistenzsysteme",
    keywords: [
      "frontscheibe wechseln",
      "windschutzscheibe wechseln",
      "windschutzscheibe tauschen",
      "frontscheibe austauschen",
      "windschutzscheibe erneuern"
    ],
    icon: "🚗",
    duration: "ca. 1-2 Stunden",
    priceRange: "ab 250 € / je nach Fahrzeug",
    insuranceCovered: true
  },
  {
    slug: "heckscheibe-wechseln",
    name: "Heckscheibe wechseln",
    shortName: "Heckscheibe",
    description: "Professioneller Austausch der Heckscheibe mit fachgerechter Montage",
    keywords: [
      "heckscheibe wechseln",
      "heckscheibe tauschen",
      "heckscheibe austauschen",
      "hintere scheibe wechseln"
    ],
    icon: "🪟",
    duration: "ca. 1-2 Stunden",
    priceRange: "ab 200 €",
    insuranceCovered: true
  }
];

// Hauptservice für Landingpages
export const mainServices = services.filter(s => 
  ["scheibenwechsel"].includes(s.slug)
);

// Alle Scheibenwechsel-Services (für Detailseiten)
export const allGlassServices = services;

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(service => service.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return services.map(service => service.slug);
}
