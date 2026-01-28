/**
 * Schema.org Markup Generator
 * Generiert strukturierte Daten für AutoRepair, Service, FAQ, HowTo, WebSite
 * 
 * Note: AggregateRating and Review removed to comply with Google guidelines
 * (fabricated reviews are not allowed in structured data)
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

// Social Media Profiles for E-E-A-T signals
const BUSINESS_SOCIAL_PROFILES: string[] = [
  // Add actual profiles when available
  // 'https://www.facebook.com/autoglasrocket',
  // 'https://www.instagram.com/autoglasrocket',
  // 'https://www.linkedin.com/company/autoglas-rocket',
];

// Publication date for Article schema (site launch date)
const SITE_LAUNCH_DATE = '2024-01-15';

// Build date for dateModified - use env var or fall back to fixed date
// This ensures consistent dateModified across builds, not render time
const BUILD_DATE = process.env.BUILD_DATE || '2026-01-28';

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



// AutoRepair Schema für Standortseiten (spezifischer als LocalBusiness)
export function generateAutoRepairSchema(location: Location): AutoRepairSchema {
  const region = getRegionForLocation(location);
  const areaType = getSchemaAreaType(location);
  
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
    sameAs: BUSINESS_SOCIAL_PROFILES
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
    sameAs: BUSINESS_SOCIAL_PROFILES
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
    sameAs: BUSINESS_SOCIAL_PROFILES
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

// Article Schema for E-E-A-T signals
export interface ArticleSchema {
  '@context': 'https://schema.org';
  '@type': 'Article';
  headline: string;
  description: string;
  author: {
    '@type': 'Organization';
    name: string;
    url: string;
  };
  publisher: {
    '@type': 'Organization';
    name: string;
    logo: {
      '@type': 'ImageObject';
      url: string;
    };
  };
  datePublished: string;
  dateModified: string;
  mainEntityOfPage: {
    '@type': 'WebPage';
    '@id': string;
  };
}

export function generateArticleSchema(
  headline: string,
  description: string,
  pageUrl: string,
  dateModified?: string
): ArticleSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    author: {
      '@type': 'Organization',
      name: BUSINESS_NAME,
      url: BUSINESS_URL
    },
    publisher: {
      '@type': 'Organization',
      name: BUSINESS_NAME,
      logo: {
        '@type': 'ImageObject',
        url: BUSINESS_LOGO
      }
    },
    datePublished: SITE_LAUNCH_DATE,
    // Use provided dateModified, or fall back to BUILD_DATE (not current date)
    // This ensures consistent timestamps across all pages during a build
    dateModified: dateModified || BUILD_DATE,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl
    }
  };
}

/**
 * Get the build date for use in schemas
 * Exported for use by other modules that need consistent dating
 */
export function getBuildDate(): string {
  return BUILD_DATE;
}

// JSON-LD Script Tag generieren
export function schemaToJsonLd(schema: object): string {
  return JSON.stringify(schema);
}
