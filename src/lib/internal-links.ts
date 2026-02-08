/**
 * Interne Verlinkung Engine
 * Automatische Verlinkung zwischen pSEO-Seiten mit hierarchischer Struktur
 */

import { 
  locations, 
  getLocationBySlug, 
  getChildLocations, 
  getSiblingLocations,
  getLocationHierarchy,
  getLocationsByType,
  getLocationsByPriority,
  Location,
  LocationType
} from '@/data/locations';
import { services, mainServices, Service } from '@/data/services';
import { brands, models, getModelsByBrand, getPopularModels, VehicleBrand, VehicleModel } from '@/data/vehicles';

export interface InternalLink {
  href: string;
  text: string;
  title?: string;
  variant?: 'default' | 'long' | 'action'; // Für Anchor-Text-Variation
}

// Anchor-Text Varianten für NLP-optimierte Verlinkung
const anchorVariants = {
  service: {
    'steinschlag-reparatur': [
      'Steinschlag-Reparatur',
      'Steinschlag reparieren',
      'Windschutzscheibe reparieren',
      'Steinschlagschaden beheben'
    ],
    'scheibenwechsel': [
      'Scheibenwechsel',
      'Scheibe wechseln',
      'Windschutzscheibe austauschen',
      'Autoscheibe erneuern'
    ],
    'autoglas-reparatur': [
      'Autoglas-Reparatur',
      'Autoglas reparieren',
      'Glasreparatur',
      'KFZ-Glasreparatur'
    ]
  },
  location: [
    '{service} in {city}',
    '{service} {city}',
    '{city} {service}',
    'Mobiler {service} {city}'
  ]
};

/**
 * Wählt eine Anchor-Text-Variante basierend auf einem Seed
 */
function getAnchorVariant(
  serviceSlug: string,
  cityName: string,
  seed: string
): string {
  // Seed-basierte Auswahl
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash = hash & hash;
  }
  
  const serviceVariants = anchorVariants.service[serviceSlug as keyof typeof anchorVariants.service] || [serviceSlug];
  const locationPattern = anchorVariants.location[Math.abs(hash) % anchorVariants.location.length];
  const serviceText = serviceVariants[Math.abs(hash >> 2) % serviceVariants.length];
  
  return locationPattern
    .replace('{service}', serviceText)
    .replace('{city}', cityName);
}

/**
 * Generiert die URL für einen Standort
 */
export function getLocationUrl(slug: string): string {
  return `/autoglas-${slug}/`;
}

/**
 * Generiert Links zu Kind-Standorten (z.B. Stadtteile einer Stadt)
 */
export function getChildLocationLinks(parentSlug: string, limit: number = 10): InternalLink[] {
  const children = getChildLocations(parentSlug);
  
  return children
    .sort((a, b) => (b.priority || 5) - (a.priority || 5))
    .slice(0, limit)
    .map(child => ({
      href: getLocationUrl(child.slug),
      text: child.name,
      title: `Autoglas-Service in ${child.name}`
    }));
}

/**
 * Generiert Links zu Nachbar-Standorten (gleiche Ebene)
 */
export function getSiblingLocationLinks(slug: string, limit: number = 5): InternalLink[] {
  const siblings = getSiblingLocations(slug, limit);
  
  return siblings.map(sibling => ({
    href: getLocationUrl(sibling.slug),
    text: sibling.name,
    title: `Autoglas-Service in ${sibling.name}`
  }));
}

/**
 * Generiert Links zu Leistungen für einen Standort (mit variierten Anchor-Texten)
 */
export function getServiceLinksForLocation(locationSlug: string, useVariation: boolean = false): InternalLink[] {
  const location = getLocationBySlug(locationSlug);
  if (!location) return [];

  return mainServices.map((service, index) => {
    // Variierte Anchor-Texte für bessere NLP-Signale
    const seed = `${service.slug}-${locationSlug}-${index}`;
    const text = useVariation 
      ? getAnchorVariant(service.slug, location.name, seed)
      : `${service.name} ${location.name}`;
    
    return {
      href: `/${service.slug}-${locationSlug}/`,
      text,
      title: `${service.name} in ${location.name}`,
      variant: useVariation ? 'long' : 'default'
    };
  });
}

/**
 * Generiert variierte Service-Links für Content-Bereiche
 */
export function getVariedServiceLinks(locationSlug: string): InternalLink[] {
  return getServiceLinksForLocation(locationSlug, true);
}

/**
 * Generiert Links zu beliebten Fahrzeugen
 */
export function getPopularVehicleLinks(limit: number = 10): InternalLink[] {
  const popularModels = getPopularModels();
  
  return popularModels.slice(0, limit).map(model => {
    const brand = brands.find(b => b.slug === model.brandSlug);
    return {
      href: `/scheibenwechsel-${model.brandSlug}-${model.slug}/`,
      text: `${brand?.name || model.brandSlug} ${model.name}`,
      title: `Scheibenwechsel für ${brand?.name || model.brandSlug} ${model.name}`
    };
  });
}

/**
 * Generiert Links zu Marken
 */
export function getBrandLinks(limit: number = 10): InternalLink[] {
  const sortedBrands = [...brands].sort((a, b) => {
    const germanBrands = ['vw', 'bmw', 'mercedes', 'audi', 'opel', 'porsche'];
    const aIsGerman = germanBrands.includes(a.slug);
    const bIsGerman = germanBrands.includes(b.slug);
    if (aIsGerman && !bIsGerman) return -1;
    if (!aIsGerman && bIsGerman) return 1;
    return 0;
  });

  return sortedBrands.slice(0, limit).map(brand => {
    const firstModel = getModelsByBrand(brand.slug)[0];
    return {
      href: `/scheibenwechsel-${brand.slug}-${firstModel?.slug || 'modelle'}/`,
      text: brand.name,
      title: `Scheibenwechsel für ${brand.name}`
    };
  });
}

/**
 * Generiert Links zu Modellen einer Marke
 */
export function getModelLinksForBrand(brandSlug: string, limit: number = 8): InternalLink[] {
  const brand = brands.find(b => b.slug === brandSlug);
  const brandModels = getModelsByBrand(brandSlug);
  
  return brandModels.slice(0, limit).map(model => ({
    href: `/scheibenwechsel-${brandSlug}-${model.slug}/`,
    text: model.name,
    title: `Scheibenwechsel ${brand?.name || brandSlug} ${model.name}`
  }));
}

/**
 * Generiert Links zu Top-Städten (kreisfreie Städte)
 */
export function getTopCityLinks(limit: number = 10): InternalLink[] {
  const cities = getLocationsByType('kreisfreie-stadt');
  
  return cities
    .sort((a, b) => (b.priority || 5) - (a.priority || 5))
    .slice(0, limit)
    .map(city => ({
      href: getLocationUrl(city.slug),
      text: city.name,
      title: `Autoglas-Service in ${city.name}`
    }));
}

/**
 * Generiert Links zu Bundesländern
 */
export function getBundeslandLinks(): InternalLink[] {
  const bundeslaender = getLocationsByType('bundesland');
  
  return bundeslaender
    .sort((a, b) => (b.priority || 5) - (a.priority || 5))
    .map(bl => ({
      href: getLocationUrl(bl.slug),
      text: bl.name,
      title: `Autoglas-Service in ${bl.name}`
    }));
}

/**
 * Generiert Links zu Stadtteilen einer Stadt
 */
export function getDistrictLinks(citySlug: string, limit: number = 10): InternalLink[] {
  // Erst Stadtbezirke holen
  const bezirke = getChildLocations(citySlug).filter(l => l.type === 'stadtbezirk');
  
  // Dann auch Stadtteile direkt unter den Bezirken
  let stadtteile: Location[] = [];
  bezirke.forEach(bezirk => {
    const children = getChildLocations(bezirk.slug).filter(l => l.type === 'stadtteil');
    stadtteile = [...stadtteile, ...children];
  });
  
  // Kombinieren und sortieren
  const allDistricts = [...bezirke, ...stadtteile]
    .sort((a, b) => (b.priority || 5) - (a.priority || 5))
    .slice(0, limit);
  
  return allDistricts.map(district => ({
    href: getLocationUrl(district.slug),
    text: district.name,
    title: `Autoglas-Service in ${district.name}`
  }));
}

/**
 * Generiert Links zu Stadtteilen für Service-Location-Seiten
 * Ermöglicht Service-Location-Seiten, auf Stadtteil-Seiten zu verlinken
 */
export function getDistrictLinksForServiceLocation(
  locationSlug: string,
  serviceSlug: string,
  limit: number = 6
): InternalLink[] {
  const location = getLocationBySlug(locationSlug);
  if (!location) return [];
  
  // Wenn es eine Stadt ist, hole Stadtteile
  if (location.type === 'kreisfreie-stadt') {
    const districts = getDistrictLinks(locationSlug, limit);
    // Link zu Location-Seiten (nicht Service-Location) für bessere Link-Equity
    return districts.map(d => ({
      ...d,
      href: d.href, // Keep as location link for link equity
      text: d.text,
      title: `Autoglas-Service in ${d.text}`
    }));
  }
  
  // Wenn es ein Bundesland ist, hole wichtige Städte
  if (location.type === 'bundesland') {
    const children = getChildLocations(locationSlug)
      .filter(l => l.type === 'kreisfreie-stadt' || (l.priority && l.priority >= 7))
      .slice(0, limit);
    
    return children.map(child => ({
      href: getLocationUrl(child.slug),
      text: child.name,
      title: `Autoglas-Service in ${child.name}`
    }));
  }
  
  return [];
}

/**
 * Generiert Breadcrumb-Items basierend auf der Hierarchie
 */
export function generateBreadcrumbs(
  type: 'location' | 'service-location' | 'vehicle',
  params: { 
    locationSlug?: string; 
    service?: Service; 
    brand?: VehicleBrand; 
    model?: VehicleModel 
  }
): { name: string; url?: string }[] {
  const breadcrumbs: { name: string; url?: string }[] = [
    { name: 'Start', url: '/' }
  ];

  switch (type) {
    case 'location':
      if (params.locationSlug) {
        const hierarchy = getLocationHierarchy(params.locationSlug);
        hierarchy.forEach((loc, index) => {
          const isLast = index === hierarchy.length - 1;
          breadcrumbs.push({
            name: loc.name,
            url: isLast ? undefined : getLocationUrl(loc.slug)
          });
        });
      }
      break;
      
    case 'service-location':
      if (params.service) {
        breadcrumbs.push({ name: params.service.name, url: undefined });
      }
      if (params.locationSlug) {
        const location = getLocationBySlug(params.locationSlug);
        if (location) {
          breadcrumbs.push({ name: location.name });
        }
      }
      break;
      
    case 'vehicle':
      breadcrumbs.push({ name: 'Scheibenwechsel', url: undefined });
      if (params.brand) {
        breadcrumbs.push({ name: params.brand.name, url: undefined });
      }
      if (params.model) {
        breadcrumbs.push({ name: params.model.name });
      }
      break;
  }

  return breadcrumbs;
}

/**
 * Generiert Footer-Links
 */
export function getFooterLinks(): {
  services: InternalLink[];
  topCities: InternalLink[];
  bundeslaender: InternalLink[];
  vehicles: InternalLink[];
  brandHubs: InternalLink[];
} {
  return {
    services: mainServices.map(service => ({
      href: `/${service.slug}-berlin/`,
      text: service.name,
      title: service.description
    })),
    topCities: getTopCityLinks(8),
    bundeslaender: getBundeslandLinks().slice(0, 8),
    vehicles: getPopularVehicleLinks(8),
    brandHubs: getBrandHubLinks(8)
  };
}

/**
 * Generiert Links zu allen Marken-Hub-Seiten
 */
export function getBrandHubLinks(limit?: number): InternalLink[] {
  const germanBrands = ['vw', 'bmw', 'mercedes', 'audi', 'opel', 'porsche'];
  const sortedBrands = [...brands].sort((a, b) => {
    const aIsGerman = germanBrands.includes(a.slug);
    const bIsGerman = germanBrands.includes(b.slug);
    if (aIsGerman && !bIsGerman) return -1;
    if (!aIsGerman && bIsGerman) return 1;
    return 0;
  });

  const result = sortedBrands.map(brand => ({
    href: `/scheibenwechsel-${brand.slug}/`,
    text: brand.name,
    title: `Scheibenwechsel für alle ${brand.name} Modelle`
  }));

  return limit ? result.slice(0, limit) : result;
}

/**
 * Generiert alle internen Links für die Sitemap
 */
export function getAllInternalLinks(): {
  locationPages: string[];
  servicePages: string[];
  vehiclePages: string[];
} {
  // Alle Standort-Seiten
  const locationPages = locations.map(loc => getLocationUrl(loc.slug));
  
  // Service-Location Kombinationen (nur für wichtige Standorte)
  const servicePages: string[] = [];
  const importantLocations = locations.filter(loc => 
    loc.type === 'kreisfreie-stadt' || 
    loc.type === 'bundesland' ||
    (loc.priority && loc.priority >= 8)
  );
  
  mainServices.forEach(service => {
    importantLocations.forEach(loc => {
      servicePages.push(`/${service.slug}-${loc.slug}/`);
    });
  });

  // Fahrzeug-Seiten (nur beliebte Modelle)
  const vehiclePages = models
    .filter(m => m.popular)
    .map(model => `/scheibenwechsel-${model.brandSlug}-${model.slug}/`);

  return {
    locationPages,
    servicePages,
    vehiclePages
  };
}

/**
 * Generiert einen "Auch verfügbar in..." Text mit Links
 */
export function generateAvailabilityText(locationSlug: string): { text: string; links: InternalLink[] } {
  const location = getLocationBySlug(locationSlug);
  if (!location) return { text: '', links: [] };
  
  // Für Städte: zeige Stadtteile
  if (location.type === 'kreisfreie-stadt') {
    const districtLinks = getDistrictLinks(locationSlug, 4);
    if (districtLinks.length > 0) {
      return {
        text: `Unser mobiler Autoglas-Service ist auch in den Stadtteilen von ${location.name} für Sie da.`,
        links: districtLinks
      };
    }
  }
  
  // Für andere: zeige Nachbarn
  const siblingLinks = getSiblingLocationLinks(locationSlug, 4);
  const siblingNames = siblingLinks.map(l => l.text);
  
  return {
    text: `Unser mobiler Autoglas-Service ist auch in ${siblingNames.join(', ')} verfügbar.`,
    links: siblingLinks
  };
}
