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
function generateLocationTitle(location: ReturnType<typeof getLocationBySlug>, hierarchy: ReturnType<typeof getLocationBySlug>[]): string {
  if (!location) return 'Seite nicht gefunden';
  
  switch (location.type) {
    case 'bundesland':
      return `Autoglas ${location.name} ᐅ Mobiler Service ${currentYear} ✓ Teilkasko*`;
    case 'regierungsbezirk':
      return `Autoglas-Service ${location.name} » Steinschlag & Scheibenwechsel ${currentYear}`;
    case 'kreisfreie-stadt':
      return `Autoglas ${location.name} ᐅ Steinschlag-Reparatur ${currentYear} ✓ Mobil & 0€*`;
    case 'stadtbezirk': {
      const parentCity = hierarchy.find(h => h?.type === 'kreisfreie-stadt' || h?.type === 'bundesland');
      return `Autoglas ${location.name}${parentCity ? ` (${parentCity.name})` : ''} » Mobiler Service ab 30 Min`;
    }
    case 'stadtteil': {
      const parent = hierarchy.find(h => h?.type === 'kreisfreie-stadt' || h?.type === 'bundesland');
      return `Autoglas ${location.name} ${parent ? parent.name : ''} ᐅ Schneller Vor-Ort-Service`;
    }
    default:
      return `Autoglas ${location.name} – Steinschlag & Scheibenwechsel | Mobiler Service`;
  }
}

// Helper: Generate optimized meta description
function generateLocationDescription(location: ReturnType<typeof getLocationBySlug>): string {
  if (!location) return '';
  
  const plzText = location.plz?.length ? ` PLZ ${location.plz.slice(0, 3).join(', ')}` : '';
  
  switch (location.type) {
    case 'bundesland':
      return `Scheibenwechsel in ganz ${location.name} ✓ Front- & Heckscheibe ✓ Originalscheiben ✓ Teilkasko* ✓ Mobiler Service – wir kommen zu Ihnen!`;
    case 'kreisfreie-stadt':
      return `Autoglas ${location.name}${plzText} ✓ Steinschlag-Reparatur ab 30 Min ✓ Scheibenwechsel vor Ort ✓ Kostenübernahme Versicherung ✓ 24h Terminrückruf ✓ Jetzt anfragen!`;
    case 'stadtbezirk':
    case 'stadtteil':
      return `Scheibenwechsel ${location.name}${plzText} ✓ Mobiler Service ✓ Wir kommen zu Ihnen ✓ Teilkasko* ✓ Schnelle Termine!`;
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
      const description = generateLocationDescription(location);
      
      return {
        title,
        description,
        alternates: { canonical: `/${slug}/` },
        openGraph: {
          title,
          description,
          type: 'website',
          locale: 'de_DE',
        },
      };
    }
    case 'service-location': {
      const service = getServiceBySlug(parsed.serviceSlug!);
      const location = getLocationBySlug(parsed.locationSlug!);
      if (!service || !location) return { title: 'Seite nicht gefunden' };
      
      const title = `${service.name} ${location.name} ᐅ Mobiler Service ${currentYear} ✓ 0€*`;
      const description = `${service.name} in ${location.name} ✓ Professionell in 30-60 Min ✓ Mobiler Service vor Ort ✓ Direkte Versicherungsabrechnung ✓ Jetzt Termin buchen!`;
      
      return {
        title,
        description,
        alternates: { canonical: `/${slug}/` },
        openGraph: {
          title,
          description,
          type: 'website',
          locale: 'de_DE',
        },
      };
    }
    case 'vehicle': {
      const brand = getBrandBySlug(parsed.brandSlug!);
      const model = getModelBySlug(parsed.brandSlug!, parsed.modelSlug!);
      if (!brand || !model) return { title: 'Seite nicht gefunden' };
      
      const title = `Scheibenwechsel ${brand.name} ${model.name} ᐅ ${currentYear} ✓ Originalscheiben`;
      const description = `Scheibenwechsel ${brand.name} ${model.name} ✓ Originalscheiben & fachgerechte Montage ✓ Mobiler Service deutschlandweit ✓ Teilkasko* ✓ Jetzt anfragen!`;
      
      return {
        title,
        description,
        alternates: { canonical: `/${slug}/` },
        openGraph: {
          title,
          description,
          type: 'website',
          locale: 'de_DE',
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
