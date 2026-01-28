import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { 
  locations,
  getLocationBySlug, 
  getAllLocationSlugs,
  getLocationsByType,
  getLocationTypeLabel,
  getLocationHierarchy
} from '@/data/locations';
import { mainServices, getServiceBySlug, getAllServiceSlugs } from '@/data/services';
import { 
  brands, 
  getBrandBySlug, 
  getModelBySlug, 
  getPopularVehicleCombinations 
} from '@/data/vehicles';

// Page Components
import LocationPage from './LocationPage';
import ServiceLocationPage from './ServiceLocationPage';
import VehiclePage from './VehiclePage';

// ISR: Revalidate pages every 24 hours
// This allows incremental updates without full rebuilds
export const revalidate = 86400; // 24 hours in seconds

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Types for parsed slugs
type PageType = 'location' | 'service-location' | 'vehicle' | 'unknown';

interface ParsedSlug {
  type: PageType;
  locationSlug?: string;
  serviceSlug?: string;
  brandSlug?: string;
  modelSlug?: string;
}

// Parse the slug to determine page type and extract parameters
function parseSlug(slug: string): ParsedSlug {
  // T1: Standortseiten - /autoglas-[standort]/
  if (slug.startsWith('autoglas-')) {
    const locationSlug = slug.replace('autoglas-', '');
    const location = getLocationBySlug(locationSlug);
    if (location) {
      return { type: 'location', locationSlug };
    }
  }

  // T3: Fahrzeugseiten - /scheibenwechsel-[marke]-[modell]/
  if (slug.startsWith('scheibenwechsel-')) {
    const rest = slug.replace('scheibenwechsel-', '');
    
    // Try to match brand-model pattern
    for (const brand of brands) {
      if (rest.startsWith(brand.slug + '-')) {
        const modelSlug = rest.slice(brand.slug.length + 1);
        const model = getModelBySlug(brand.slug, modelSlug);
        if (model) {
          return { type: 'vehicle', brandSlug: brand.slug, modelSlug };
        }
      }
    }
    
    // If no brand-model match, try as service-location
    const location = getLocationBySlug(rest);
    if (location) {
      return { type: 'service-location', serviceSlug: 'scheibenwechsel', locationSlug: rest };
    }
  }

  // T2: Service-Standort-Kombinationen - /[service]-[standort]/
  for (const service of mainServices) {
    if (slug.startsWith(service.slug + '-')) {
      const locationSlug = slug.slice(service.slug.length + 1);
      const location = getLocationBySlug(locationSlug);
      if (location) {
        return { type: 'service-location', serviceSlug: service.slug, locationSlug };
      }
    }
  }

  return { type: 'unknown' };
}

// Generate all static params
export async function generateStaticParams() {
  const params: { slug: string }[] = [];

  // T1: Location pages (alle Standorte)
  for (const locationSlug of getAllLocationSlugs()) {
    params.push({ slug: `autoglas-${locationSlug}` });
  }

  // T2: Service-Location combinations (nur für wichtige Standorte)
  const importantLocations = locations.filter(loc => 
    loc.type === 'kreisfreie-stadt' || 
    loc.type === 'bundesland' ||
    (loc.priority && loc.priority >= 7)
  );
  
  for (const serviceSlug of getAllServiceSlugs()) {
    for (const location of importantLocations) {
      params.push({ slug: `${serviceSlug}-${location.slug}` });
    }
  }

  // T3: Vehicle pages (popular only for initial build)
  for (const { brand, model } of getPopularVehicleCombinations()) {
    params.push({ slug: `scheibenwechsel-${brand}-${model}` });
  }

  return params;
}

// Helper: Get current year for dynamic titles
const currentYear = new Date().getFullYear();

// Helper: Generate CTR-optimized title based on location type
// Focused on "Autoglas" keyword to differentiate from Service-Location pages (which target "Scheibenwechsel")
// Uses location.title override if set
function generateLocationTitle(location: ReturnType<typeof getLocationBySlug>, hierarchy: ReturnType<typeof getLocationBySlug>[]): string {
  if (!location) return 'Seite nicht gefunden';
  
  // Use custom title if provided
  if (location.title) return location.title;
  
  switch (location.type) {
    case 'bundesland':
      return `Autoglas-Service ${location.name} ᐅ Mobiler Glasservice ${currentYear} ✓ Teilkasko*`;
    case 'regierungsbezirk':
      return `Autoglas ${location.name} » Mobiler Glasreparatur-Service ${currentYear}`;
    case 'kreisfreie-stadt':
      return `Autoglas ${location.name} ᐅ Mobiler Service & Reparatur ${currentYear} ✓ 0€*`;
    case 'stadtbezirk': {
      const parentCity = hierarchy.find(h => h?.type === 'kreisfreie-stadt' || h?.type === 'bundesland');
      return `Autoglas ${location.name}${parentCity ? ` (${parentCity.name})` : ''} » Mobiler Vor-Ort-Service`;
    }
    case 'stadtteil': {
      const parent = hierarchy.find(h => h?.type === 'kreisfreie-stadt' || h?.type === 'bundesland');
      return `Autoglas-Service ${location.name}${parent ? ` ${parent.name}` : ''} ᐅ Schnell & Mobil`;
    }
    default:
      return `Autoglas ${location.name} – Mobiler Glasservice | Autoglas-Rocket`;
  }
}

// Helper: Hash string for consistent variant selection
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

// Helper: Determines if a location should be noindexed (weak content)
// Noindex criteria:
// - Stadtteil or Stadtbezirk without PLZ
// - Low priority (< 3)
// - No coordinates
function shouldNoindexLocation(location: ReturnType<typeof getLocationBySlug>): boolean {
  if (!location) return false;
  
  // Only consider Stadtteile and Stadtbezirke for noindex
  if (location.type !== 'stadtteil' && location.type !== 'stadtbezirk') {
    return false;
  }
  
  const hasNoPlz = !location.plz || location.plz.length === 0;
  const lowPriority = !location.priority || location.priority < 3;
  const noCoords = !location.coordinates;
  
  // Noindex if all three conditions are met (very weak page)
  // This is conservative - we only noindex truly thin pages
  return hasNoPlz && lowPriority && noCoords;
}

// Helper: Generate optimized meta description with unique variants for Stadtteile
// Uses location.metaDescription override if set
function generateLocationDescription(
  location: ReturnType<typeof getLocationBySlug>,
  hierarchy?: ReturnType<typeof getLocationBySlug>[]
): string {
  if (!location) return '';
  
  // Use custom meta description if provided
  if (location.metaDescription) return location.metaDescription;
  
  const plzText = location.plz?.length ? ` PLZ ${location.plz.slice(0, 3).join(', ')}` : '';
  const plzShort = location.plz?.length ? ` (${location.plz[0]})` : '';
  
  switch (location.type) {
    case 'bundesland':
      return `Scheibenwechsel in ganz ${location.name} ✓ Front- & Heckscheibe ✓ Originalscheiben ✓ Teilkasko* ✓ Mobiler Service – wir kommen zu Ihnen!`;
    
    case 'kreisfreie-stadt':
      return `Autoglas ${location.name}${plzText} ✓ Steinschlag-Reparatur ab 30 Min ✓ Scheibenwechsel vor Ort ✓ Kostenübernahme Versicherung ✓ 24h Terminrückruf ✓ Jetzt anfragen!`;
    
    case 'regierungsbezirk':
      return `Autoglas-Service im Regierungsbezirk ${location.name} ✓ Scheibenwechsel vor Ort ✓ Mobiler Service ✓ Versicherung ✓ Jetzt Termin vereinbaren!`;
    
    case 'stadtbezirk':
    case 'stadtteil': {
      // Find parent city for context
      const parentCity = hierarchy?.find(h => h?.type === 'kreisfreie-stadt');
      const parentBundesland = hierarchy?.find(h => h?.type === 'bundesland');
      const parentName = parentCity?.name || parentBundesland?.name || '';
      
      // 6 unique description variants for maximum diversity
      const variants = [
        `Scheibenwechsel ${location.name}${plzText}${parentName ? ` in ${parentName}` : ''} ✓ Mobiler Service direkt vor Ort ✓ Teilkasko* ✓ Jetzt Termin anfragen!`,
        `Autoglas-Service ${location.name}${parentName ? ` (${parentName})` : ''}${plzShort} ✓ Scheibenwechsel vor Ort ✓ Versicherung ✓ 24h Rückruf ✓ Professionell & schnell`,
        `${location.name}${plzText}: Scheibenwechsel mobil${parentName ? ` – Service in ${parentName}` : ''} ✓ Front- & Heckscheibe ✓ Teilkasko* ✓ Schnell & professionell`,
        `Mobiler Scheibenwechsel in ${location.name}${plzShort}${parentName ? ` (${parentName})` : ''} ✓ Wir kommen zu Ihnen ✓ Originalscheiben ✓ Versicherungsabrechnung`,
        `Autoglas ${location.name}${parentName ? ` ${parentName}` : ''}${plzText} ✓ Professioneller Scheibenwechsel ✓ Mobil vor Ort ✓ Schnelle Termine ✓ Jetzt anfragen`,
        `Scheibenwechsel-Service ${location.name}${plzShort}${parentName ? ` in ${parentName}` : ''} ✓ Mobil & flexibel ✓ Teilkasko* ✓ Front- & Heckscheibe ✓ 24h Termin`,
      ];
      
      // Use hash for consistent but varied selection
      const variantIndex = hashString(location.slug) % variants.length;
      return variants[variantIndex];
    }
    
    default:
      return `Professioneller Autoglas-Service in ${location.name}${plzText}. Steinschlag-Reparatur & Scheibenwechsel ✓ Mobil ✓ Versicherung ✓ Jetzt Termin!`;
  }
}

// Generate metadata based on page type
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseSlug(slug);

  switch (parsed.type) {
    case 'location': {
      const location = getLocationBySlug(parsed.locationSlug!);
      if (!location) return { title: 'Seite nicht gefunden' };
      
      const hierarchy = getLocationHierarchy(parsed.locationSlug!);
      const title = generateLocationTitle(location, hierarchy);
      const description = generateLocationDescription(location, hierarchy);
      const canonicalUrl = `https://autoglas-rocket.de/${slug}/`;
      const noindex = shouldNoindexLocation(location);
      
      return {
        title,
        description,
        alternates: { canonical: canonicalUrl },
        // Noindex weak Stadtteil pages to focus crawl budget on quality pages
        ...(noindex && {
          robots: {
            index: false,
            follow: true, // Still follow links for link equity
          },
        }),
        openGraph: {
          title,
          description,
          type: 'website',
          locale: 'de_DE',
          url: canonicalUrl,
          // OG:Image intentionally omitted for pSEO pages
          // Using the same image across 6000+ pages provides no value
        },
        twitter: {
          card: 'summary',
          title,
          description,
        },
      };
    }
    case 'service-location': {
      const service = getServiceBySlug(parsed.serviceSlug!);
      const location = getLocationBySlug(parsed.locationSlug!);
      if (!service || !location) return { title: 'Seite nicht gefunden' };
      
      const title = `${service.name} ${location.name} ᐅ Mobiler Service ${currentYear} ✓ 0€*`;
      const description = `${service.name} in ${location.name} ✓ Professionell in 30-60 Min ✓ Mobiler Service vor Ort ✓ Direkte Versicherungsabrechnung ✓ Jetzt Termin buchen!`;
      const canonicalUrl = `https://autoglas-rocket.de/${slug}/`;
      
      return {
        title,
        description,
        alternates: { canonical: canonicalUrl },
        openGraph: {
          title,
          description,
          type: 'website',
          locale: 'de_DE',
          url: canonicalUrl,
          // OG:Image intentionally omitted for pSEO pages
        },
        twitter: {
          card: 'summary',
          title,
          description,
        },
      };
    }
    case 'vehicle': {
      const brand = getBrandBySlug(parsed.brandSlug!);
      const model = getModelBySlug(parsed.brandSlug!, parsed.modelSlug!);
      if (!brand || !model) return { title: 'Seite nicht gefunden' };
      
      const title = `Scheibenwechsel ${brand.name} ${model.name} ᐅ ${currentYear} ✓ Originalscheiben`;
      const description = `Scheibenwechsel ${brand.name} ${model.name} ✓ Originalscheiben & fachgerechte Montage ✓ Mobiler Service deutschlandweit ✓ Teilkasko* ✓ Jetzt anfragen!`;
      const canonicalUrl = `https://autoglas-rocket.de/${slug}/`;
      
      return {
        title,
        description,
        alternates: { canonical: canonicalUrl },
        openGraph: {
          title,
          description,
          type: 'website',
          locale: 'de_DE',
          url: canonicalUrl,
          // OG:Image intentionally omitted for pSEO pages
        },
        twitter: {
          card: 'summary',
          title,
          description,
        },
      };
    }
    default:
      return { title: 'Seite nicht gefunden' };
  }
}

// Main page component - routes to appropriate sub-component
export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const parsed = parseSlug(slug);

  switch (parsed.type) {
    case 'location':
      return <LocationPage locationSlug={parsed.locationSlug!} />;
    case 'service-location':
      return <ServiceLocationPage serviceSlug={parsed.serviceSlug!} locationSlug={parsed.locationSlug!} />;
    case 'vehicle':
      return <VehiclePage brandSlug={parsed.brandSlug!} modelSlug={parsed.modelSlug!} />;
    default:
      notFound();
  }
}
