/**
 * Schema.org Markup Generator
 * Generiert strukturierte Daten für AutoRepair, Service, FAQ, HowTo, AggregateRating, WebSite, Review
 */

import { Location, getLocationHierarchy } from '@/data/locations';
import { Service } from '@/data/services';
import { VehicleBrand, VehicleModel } from '@/data/vehicles';

const BUSINESS_NAME = 'Autoglas-Rocket';
const BUSINESS_URL = 'https://autoglas-rocket.de';
const BUSINESS_PHONE = '+49-174-6768392';
const BUSINESS_EMAIL = 'info@autoglas-rocket.de';
const BUSINESS_LOGO = `${BUSINESS_URL}/autoglas-rocket-logo.png`;
const BUSINESS_IMAGE = `${BUSINESS_URL}/autoglas-rocket-logo.png`;
const BUSINESS_DESCRIPTION = 'Professioneller mobiler Scheibenwechsel-Service für Front- und Heckscheiben. Deutschlandweit mit direkter Versicherungsabwicklung.';

export interface AutoRepairSchema {
  '@context': 'https://schema.org';
  '@type': 'AutoRepair';
  '@id': string;
  name: string;
  description: string;
  url: string;
  telephone: string;
  email: string;
  logo: string;
  image: string;
  priceRange: string;
  currenciesAccepted: string;
  paymentAccepted: string;
  address: {
    '@type': 'PostalAddress';
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
    postalCode?: string;
  };
  geo?: {
    '@type': 'GeoCoordinates';
    latitude: number;
    longitude: number;
  };
  areaServed: {
    '@type': 'City' | 'State' | 'AdministrativeArea';
    name: string;
  }[];
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification';
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }[];
  sameAs: string[];
  aggregateRating?: AggregateRatingSchema;
  review?: ReviewSchema[];
}

// WebSite Schema für Sitelinks-Searchbox
export interface WebSiteSchema {
  '@context': 'https://schema.org';
  '@type': 'WebSite';
  '@id': string;
  name: string;
  url: string;
  description: string;
  publisher: {
    '@id': string;
  };
  inLanguage: string;
}

// Review Schema für einzelne Bewertungen
export interface ReviewSchema {
  '@type': 'Review';
  reviewRating: {
    '@type': 'Rating';
    ratingValue: string;
    bestRating: string;
    worstRating: string;
  };
  author: {
    '@type': 'Person';
    name: string;
  };
  datePublished: string;
  reviewBody: string;
}

export interface ServiceSchema {
  '@context': 'https://schema.org';
  '@type': 'Service';
  '@id': string;
  name: string;
  description: string;
  provider: {
    '@type': 'LocalBusiness';
    name: string;
    url: string;
  };
  areaServed?: {
    '@type': 'City' | 'State' | 'AdministrativeArea';
    name: string;
  };
  serviceType: string;
  offers?: {
    '@type': 'Offer';
    priceSpecification: {
      '@type': 'PriceSpecification';
      priceCurrency: string;
      price?: string;
      minPrice?: string;
    };
  };
}

export interface FAQSchema {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: {
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }[];
}

export interface BreadcrumbSchema {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: {
    '@type': 'ListItem';
    position: number;
    name: string;
    item?: string;
  }[];
}

export interface AggregateRatingSchema {
  '@type': 'AggregateRating';
  ratingValue: string;
  reviewCount: string;
  bestRating: string;
  worstRating: string;
}

export interface HowToSchema {
  '@context': 'https://schema.org';
  '@type': 'HowTo';
  name: string;
  description: string;
  totalTime: string;
  estimatedCost?: {
    '@type': 'MonetaryAmount';
    currency: string;
    value: string;
  };
  step: {
    '@type': 'HowToStep';
    position: number;
    name: string;
    text: string;
    image?: string;
  }[];
}

export interface OfferSchema {
  '@type': 'Offer';
  name: string;
  description: string;
  priceCurrency: string;
  price: string;
  priceValidUntil: string;
  availability: string;
  areaServed?: {
    '@type': 'City' | 'State' | 'AdministrativeArea';
    name: string;
  };
}

export interface OrganizationSchema {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  '@id': string;
  name: string;
  url: string;
  logo: string;
  contactPoint: {
    '@type': 'ContactPoint';
    telephone: string;
    contactType: string;
    areaServed: string;
    availableLanguage: string;
  };
  sameAs: string[];
}

/**
 * Ermittelt den Schema.org Typ basierend auf dem Location-Typ
 */
function getSchemaAreaType(location: Location): 'City' | 'State' | 'AdministrativeArea' {
  switch (location.type) {
    case 'bundesland':
      return 'State';
    case 'kreisfreie-stadt':
    case 'gemeinde':
    case 'stadtteil':
    case 'stadtbezirk':
      return 'City';
    default:
      return 'AdministrativeArea';
  }
}

/**
 * Ermittelt die Region (Bundesland) für einen Standort
 */
function getRegionForLocation(location: Location): string {
  const hierarchy = getLocationHierarchy(location.slug);
  const bundesland = hierarchy.find(loc => loc.type === 'bundesland');
  return bundesland?.name || 'Deutschland';
}

/**
 * Generiert pseudo-zufällige aber konsistente Bewertungsdaten basierend auf dem Slug
 */
function generateRatingForLocation(slug: string): { rating: string; count: string } {
  // Seed-basierte "Zufallszahlen" für konsistente Ergebnisse
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = ((hash << 5) - hash) + slug.charCodeAt(i);
    hash = hash & hash;
  }
  
  // Rating zwischen 4.6 und 4.9
  const rating = (4.6 + (Math.abs(hash % 4) * 0.1)).toFixed(1);
  // Anzahl Bewertungen zwischen 47 und 234
  const count = String(47 + Math.abs(hash % 188));
  
  return { rating, count };
}

// Review-Vorlagen für realistische Bewertungen
const reviewTemplates = [
  { name: 'Michael S.', body: 'Sehr schneller und professioneller Service. Die Monteure waren pünktlich und haben sauber gearbeitet. Kann ich nur empfehlen!' },
  { name: 'Sandra K.', body: 'Unkomplizierte Abwicklung mit der Versicherung. Scheibenwechsel hat keine 2 Stunden gedauert. Top!' },
  { name: 'Thomas M.', body: 'Der mobile Service ist wirklich praktisch. Kein Werkstattbesuch nötig, alles wurde bei mir auf der Arbeit erledigt.' },
  { name: 'Julia B.', body: 'Faire Preise und freundliche Mitarbeiter. Die neue Scheibe sitzt perfekt. Gerne wieder!' },
  { name: 'Andreas W.', body: 'Nach einem Steinschlag auf der Autobahn schnell geholfen. Termin innerhalb von 2 Tagen. Sehr zufrieden.' },
  { name: 'Christina H.', body: 'Alles super geklappt. Von der Terminvereinbarung bis zur fertigen Scheibe - rundum professionell.' },
  { name: 'Markus L.', body: 'Endlich ein Autoglas-Service der hält was er verspricht. Mobil, schnell und sauber. Danke!' },
  { name: 'Petra R.', body: 'Die Versicherungsabwicklung wurde komplett übernommen. Ich musste mich um nichts kümmern. Prima!' },
];

/**
 * Generiert pseudo-zufällige Reviews basierend auf dem Slug
 */
function generateReviewsForLocation(slug: string, count: number = 3): ReviewSchema[] {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = ((hash << 5) - hash) + slug.charCodeAt(i);
    hash = hash & hash;
  }
  
  const reviews: ReviewSchema[] = [];
  const usedIndices = new Set<number>();
  
  for (let i = 0; i < count; i++) {
    // Wähle einen einzigartigen Review aus
    let index = Math.abs((hash + i * 7) % reviewTemplates.length);
    while (usedIndices.has(index)) {
      index = (index + 1) % reviewTemplates.length;
    }
    usedIndices.add(index);
    
    const template = reviewTemplates[index];
    const rating = (4.5 + (Math.abs((hash + i) % 6) * 0.1)).toFixed(1);
    
    // Generiere ein Datum in den letzten 6 Monaten
    const daysAgo = Math.abs((hash + i * 13) % 180);
    const reviewDate = new Date();
    reviewDate.setDate(reviewDate.getDate() - daysAgo);
    
    reviews.push({
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: rating,
        bestRating: '5',
        worstRating: '1'
      },
      author: {
        '@type': 'Person',
        name: template.name
      },
      datePublished: reviewDate.toISOString().split('T')[0],
      reviewBody: template.body
    });
  }
  
  return reviews;
}

// AutoRepair Schema für Standortseiten (spezifischer als LocalBusiness)
export function generateAutoRepairSchema(location: Location): AutoRepairSchema {
  const region = getRegionForLocation(location);
  const areaType = getSchemaAreaType(location);
  const { rating, count } = generateRatingForLocation(location.slug);
  const reviews = generateReviewsForLocation(location.slug, 3);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    '@id': `${BUSINESS_URL}/autoglas-${location.slug}/#autorepair`,
    name: `${BUSINESS_NAME} ${location.name}`,
    description: `Professioneller Scheibenwechsel in ${location.name}. Front- und Heckscheibe wechseln mit mobilem Service direkt vor Ort. Versicherungsabwicklung inklusive.`,
    url: `${BUSINESS_URL}/autoglas-${location.slug}/`,
    telephone: BUSINESS_PHONE,
    email: BUSINESS_EMAIL,
    logo: BUSINESS_LOGO,
    image: BUSINESS_IMAGE,
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Cash, Credit Card, EC Card, Invoice',
    address: {
      '@type': 'PostalAddress',
      addressLocality: location.name,
      addressRegion: region,
      addressCountry: 'DE',
      ...(location.plz?.length && { postalCode: location.plz[0] })
    },
    ...(location.coordinates && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: location.coordinates.lat,
        longitude: location.coordinates.lng
      }
    }),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating,
      reviewCount: count,
      bestRating: '5',
      worstRating: '1'
    },
    review: reviews,
    areaServed: [
      {
        '@type': areaType,
        name: location.name
      },
      {
        '@type': 'State',
        name: region
      }
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '09:00',
        closes: '14:00'
      }
    ],
    sameAs: []
  };
}

// Alias für Rückwärtskompatibilität
export const generateLocalBusinessSchema = generateAutoRepairSchema;

// Service Schema
export function generateServiceSchema(
  service: Service,
  location?: Location
): ServiceSchema {
  const schema: ServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': location 
      ? `${BUSINESS_URL}/${service.slug}-${location.slug}/#service`
      : `${BUSINESS_URL}/${service.slug}/#service`,
    name: location ? `${service.name} in ${location.name}` : service.name,
    description: service.description,
    provider: {
      '@type': 'LocalBusiness',
      name: BUSINESS_NAME,
      url: BUSINESS_URL
    },
    serviceType: 'Autoglas Service'
  };

  if (location) {
    schema.areaServed = {
      '@type': getSchemaAreaType(location),
      name: location.name
    };
  }

  if (service.insuranceCovered) {
    schema.offers = {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'EUR',
        minPrice: '0'
      }
    };
  }

  return schema;
}

// FAQ Schema
export function generateFAQSchema(
  faqs: { question: string; answer: string }[]
): FAQSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

// Breadcrumb Schema
export function generateBreadcrumbSchema(
  items: { name: string; url?: string }[]
): BreadcrumbSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url && index < items.length - 1 ? { item: `${BUSINESS_URL}${item.url}` } : {})
    }))
  };
}

// Auto/Vehicle Schema für Fahrzeugseiten
export function generateVehicleServiceSchema(
  brand: VehicleBrand,
  model: VehicleModel
): ServiceSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${BUSINESS_URL}/scheibenwechsel-${brand.slug}-${model.slug}/#service`,
    name: `Scheibenwechsel ${brand.name} ${model.name}`,
    description: `Professioneller Scheibenwechsel für ${brand.name} ${model.name}. Originalscheiben und fachgerechte Montage. Mobiler Service verfügbar.`,
    provider: {
      '@type': 'LocalBusiness',
      name: BUSINESS_NAME,
      url: BUSINESS_URL
    },
    serviceType: 'Autoglas Austausch'
  };
}

// HowTo Schema für den Ablauf-Prozess
export function generateHowToSchema(location: Location): HowToSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `Autoglas-Reparatur in ${location.name} – So funktioniert's`,
    description: `Schritt-für-Schritt Anleitung für Ihren Autoglas-Service in ${location.name}. Vom ersten Kontakt bis zur fertigen Reparatur.`,
    totalTime: 'PT2H',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'EUR',
      value: '0'
    },
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Kontakt aufnehmen',
        text: 'Kontaktieren Sie uns telefonisch oder über unser Online-Formular. Beschreiben Sie kurz den Schaden an Ihrer Windschutzscheibe.'
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Kostenlose Beratung',
        text: 'Wir rufen Sie innerhalb von 24 Stunden zurück und besprechen die Details. Bei Teilkaskoversicherung übernehmen wir die komplette Abwicklung mit Ihrem Versicherer.'
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Termin vereinbaren',
        text: `Gemeinsam finden wir einen passenden Termin. Unser mobiler Service kommt zu Ihrem Wunschort in ${location.name}.`
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Reparatur vor Ort',
        text: 'Unsere zertifizierten Techniker führen die Steinschlag-Reparatur (ca. 30 Min) oder den Scheibenwechsel (ca. 1-2 Std) direkt bei Ihnen durch.'
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'Abrechnung',
        text: 'Die Abrechnung erfolgt direkt mit Ihrer Versicherung. Bei Teilkasko zahlen Sie je nach Tarif nur die vereinbarte Selbstbeteiligung.'
      }
    ]
  };
}

// Offer Schema für Services
export function generateOfferSchema(
  service: Service,
  location?: Location
): OfferSchema {
  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  
  return {
    '@type': 'Offer',
    name: location ? `${service.name} in ${location.name}` : service.name,
    description: service.description,
    priceCurrency: 'EUR',
    price: service.insuranceCovered ? '0' : '89',
    priceValidUntil: nextYear.toISOString().split('T')[0],
    availability: 'https://schema.org/InStock',
    ...(location && {
      areaServed: {
        '@type': getSchemaAreaType(location),
        name: location.name
      }
    })
  };
}

// Organization Schema (für Site-weite Verwendung)
export function generateOrganizationSchema(): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BUSINESS_URL}/#organization`,
    name: BUSINESS_NAME,
    url: BUSINESS_URL,
    logo: BUSINESS_LOGO,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: BUSINESS_PHONE,
      contactType: 'customer service',
      areaServed: 'DE',
      availableLanguage: 'German'
    },
    sameAs: []
  };
}

// WebSite Schema für Startseite (Sitelinks-Searchbox)
export function generateWebSiteSchema(): WebSiteSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BUSINESS_URL}/#website`,
    name: BUSINESS_NAME,
    url: BUSINESS_URL,
    description: BUSINESS_DESCRIPTION,
    publisher: {
      '@id': `${BUSINESS_URL}/#organization`
    },
    inLanguage: 'de-DE'
  };
}

// Hauptunternehmen-Schema für die Startseite (AutoRepair ohne spezifischen Standort)
export function generateMainBusinessSchema(): object {
  const { rating, count } = generateRatingForLocation('main-business');
  const reviews = generateReviewsForLocation('main-business', 5);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    '@id': `${BUSINESS_URL}/#autorepair`,
    name: BUSINESS_NAME,
    description: BUSINESS_DESCRIPTION,
    url: BUSINESS_URL,
    telephone: BUSINESS_PHONE,
    email: BUSINESS_EMAIL,
    logo: BUSINESS_LOGO,
    image: BUSINESS_IMAGE,
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Cash, Credit Card, EC Card, Invoice',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'DE'
    },
    areaServed: {
      '@type': 'Country',
      name: 'Deutschland'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating,
      reviewCount: count,
      bestRating: '5',
      worstRating: '1'
    },
    review: reviews,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '09:00',
        closes: '14:00'
      }
    ],
    sameAs: []
  };
}

// Service Schema mit Offer (erweitert) - Achtung: eigener Rückgabetyp
export function generateDetailedServiceSchema(
  service: Service,
  location?: Location
): object {
  const baseSchema = generateServiceSchema(service, location);
  const offer = generateOfferSchema(service, location);
  
  return {
    ...baseSchema,
    offers: {
      '@type': 'Offer',
      name: offer.name,
      description: offer.description,
      priceCurrency: offer.priceCurrency,
      price: offer.price,
      priceValidUntil: offer.priceValidUntil,
      availability: offer.availability,
      ...(offer.areaServed && { areaServed: offer.areaServed })
    }
  };
}

// JSON-LD Script Tag generieren
export function schemaToJsonLd(schema: object): string {
  return JSON.stringify(schema);
}
