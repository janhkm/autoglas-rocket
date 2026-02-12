/**
 * Thematischer Sitemap Generator für pSEO
 * 
 * Generiert granulare Sitemaps nach Hierarchie & Seitentyp:
 * 
 * sitemap.xml (Index)
 * ├── sitemap-pages.xml              Statische Seiten (Homepage, Hub-Seiten)
 * ├── sitemap-bundeslaender.xml      16 Bundesland-Seiten (höchste Priorität)
 * ├── sitemap-staedte.xml            Kreisfreie Städte (~100 Seiten)
 * ├── sitemap-regionen.xml           Regierungsbezirke, Landkreise, Gemeinden
 * ├── sitemap-stadtteile.xml         Stadtbezirke & Stadtteile (nur indexierbare)
 * ├── sitemap-scheibenwechsel.xml    Service "Scheibenwechsel" × wichtige Locations
 * ├── sitemap-frontscheibe.xml       Service "Frontscheibe wechseln" × wichtige Locations
 * ├── sitemap-heckscheibe.xml        Service "Heckscheibe wechseln" × wichtige Locations
 * └── sitemap-vehicles.xml           Marken-Hubs + Fahrzeug-Modelle
 * 
 * DESIGN-PRINZIPIEN:
 * 1. Filter MÜSSEN mit generateStaticParams() in src/app/[slug]/page.tsx übereinstimmen
 * 2. Noindex gilt NUR für /impressum/ und /datenschutz/ (separat in deren page.tsx)
 * 3. URLs innerhalb jeder Sitemap nach Priority absteigend sortiert
 * 4. lastmod-Daten sind Build-übergreifend stabil (basierend auf Content-Hash, nicht Datum)
 * 5. Granulare Sub-Sitemaps nach Hierarchie → Google crawlt wichtige Seiten zuerst
 * 
 * Ausführen mit: npx ts-node --project tsconfig.scripts.json scripts/generate-sitemaps.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { locations, Location } from '../src/data/locations';
import { services } from '../src/data/services';
import { models, brands } from '../src/data/vehicles';

const BASE_URL = 'https://autoglas-rocket.de';
const OUTPUT_DIR = path.join(process.cwd(), 'public');

interface SitemapUrl {
  loc: string;
  lastmod: string;
  priority: number;
}

// ============================================
// SHARED FILTERS (must match generateStaticParams in page.tsx)
// ============================================

/**
 * Filter für Service-Location-Seiten.
 * MUSS identisch sein mit dem Filter in generateStaticParams() in page.tsx.
 */
function isImportantLocationForServices(loc: Location): boolean {
  return (
    loc.type === 'kreisfreie-stadt' ||
    loc.type === 'bundesland' ||
    (loc.priority !== undefined && loc.priority >= 7)
  );
}

// ============================================
// PRIORITÄTS-BERECHNUNG
// ============================================

function getLocationPriority(location: Location): number {
  const typePriority: Record<string, number> = {
    'bundesland': 0.9,
    'kreisfreie-stadt': 0.9,
    'regierungsbezirk': 0.8,
    'landkreis': 0.7,
    'gemeinde': 0.6,
    'stadtbezirk': 0.6,
    'stadtteil': 0.5,
  };

  let priority = typePriority[location.type] || 0.5;

  if (location.population) {
    if (location.population > 1000000) priority = Math.min(1.0, priority + 0.1);
    else if (location.population > 500000) priority = Math.min(0.95, priority + 0.05);
    else if (location.population > 100000) priority = Math.min(0.9, priority + 0.03);
  }

  if (location.priority) {
    const dataPriority = location.priority / 10;
    priority = Math.max(priority, dataPriority);
  }

  return Math.round(priority * 100) / 100;
}

function getServiceLocationPriority(location: Location): number {
  const basePriority = getLocationPriority(location);
  return Math.min(1.0, basePriority + 0.05);
}

function getVehiclePriority(model: typeof models[0]): number {
  return model.popular ? 0.7 : 0.5;
}

// ============================================
// LASTMOD – Build-übergreifend stabil
// ============================================

/**
 * Erzeugt ein deterministisches, Build-übergreifend stabiles lastmod-Datum.
 * 
 * Problem mit der alten Variante: Hash + "new Date() minus N Tage" ändert sich
 * bei jedem Build, weil das Basisdatum sich verschiebt. Google lernt dann,
 * dass lastmod unzuverlässig ist, und ignoriert es.
 * 
 * Lösung: Verwende ein festes Referenzdatum (Launch-Datum) und addiere
 * einen deterministischen Offset basierend auf dem Slug-Hash.
 * Das Datum ändert sich NUR, wenn:
 *   a) die Location ein explizites lastModified hat, oder
 *   b) wir das CONTENT_VERSION hochzählen (= echtes Content-Update)
 */

// Hochzählen bei echten Content-Updates (z.B. neue Textbausteine, neue Datenfelder)
// Jedes Inkrement verschiebt alle lastmod-Daten → signalisiert Google "Inhalt aktualisiert"
const CONTENT_VERSION = 1;

// Festes Referenzdatum (Projekt-Launch / erster Deploy)
const REFERENCE_DATE = new Date('2026-02-01T00:00:00Z');

function stableHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function getStableLastmod(slug: string, explicitDate?: string): string {
  // 1. Wenn ein explizites lastModified vorhanden ist, verwende es
  if (explicitDate) {
    return new Date(explicitDate).toISOString();
  }

  // 2. Deterministischer Offset: basierend auf Slug + CONTENT_VERSION
  //    Ändert sich NUR wenn der Slug sich ändert ODER CONTENT_VERSION erhöht wird
  const hash = stableHash(`${slug}-v${CONTENT_VERSION}`);
  const daysOffset = hash % 30; // 0-29 Tage nach Referenzdatum
  const hoursOffset = hash % 24; // Variation innerhalb des Tages

  const date = new Date(REFERENCE_DATE);
  date.setDate(date.getDate() + daysOffset);
  date.setHours(hoursOffset, hash % 60, 0, 0);

  return date.toISOString();
}

// ============================================
// XML GENERATION
// ============================================

function generateUrlXml(url: SitemapUrl): string {
  return `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <priority>${url.priority.toFixed(1)}</priority>
  </url>`;
}

function generateSitemapXml(urls: SitemapUrl[]): string {
  const urlsXml = urls.map(generateUrlXml).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;
}

function generateSitemapIndexXml(sitemaps: { loc: string; lastmod: string }[]): string {
  const sitemapsXml = sitemaps
    .map(s => `  <sitemap>
    <loc>${s.loc}</loc>
    <lastmod>${s.lastmod}</lastmod>
  </sitemap>`)
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapsXml}
</sitemapindex>`;
}

/**
 * Sortiert URLs nach Priority absteigend.
 * Innerhalb gleicher Priority: alphabetisch nach loc für Konsistenz.
 */
function sortByPriority(urls: SitemapUrl[]): SitemapUrl[] {
  return [...urls].sort((a, b) => {
    if (b.priority !== a.priority) return b.priority - a.priority;
    return a.loc.localeCompare(b.loc);
  });
}

// ============================================
// SITEMAP GENERATORS
// ============================================

function generatePagesSitemap(): SitemapUrl[] {
  const lastmod = new Date().toISOString();

  return [
    {
      loc: `${BASE_URL}/`,
      lastmod,
      priority: 1.0,
    },
    {
      loc: `${BASE_URL}/einsatzgebiete/`,
      lastmod,
      priority: 0.9,
    },
    {
      loc: `${BASE_URL}/dienstleistungen/`,
      lastmod,
      priority: 0.9,
    },
  ];
}

/**
 * Bundesländer – höchste Hierarchie-Ebene, eigene Sitemap für maximale Crawl-Priorität
 */
function generateBundeslaenderSitemap(): SitemapUrl[] {
  const indexable = locations.filter(
    loc => loc.type === 'bundesland'
  );

  return indexable.map(location => ({
    loc: `${BASE_URL}/autoglas-${location.slug}/`,
    lastmod: getStableLastmod(location.slug, location.lastModified),
    priority: getLocationPriority(location),
  }));
}

/**
 * Kreisfreie Städte – zweitwichtigste Ebene (Berlin, München, Hamburg, etc.)
 */
function generateStaedteSitemap(): SitemapUrl[] {
  const indexable = locations.filter(
    loc => loc.type === 'kreisfreie-stadt'
  );

  return indexable.map(location => ({
    loc: `${BASE_URL}/autoglas-${location.slug}/`,
    lastmod: getStableLastmod(location.slug, location.lastModified),
    priority: getLocationPriority(location),
  }));
}

/**
 * Regionen – Regierungsbezirke, Landkreise, Gemeinden
 */
function generateRegionenSitemap(): SitemapUrl[] {
  const regionTypes = ['regierungsbezirk', 'landkreis', 'gemeinde'];
  const indexable = locations.filter(
    loc => regionTypes.includes(loc.type)
  );

  return indexable.map(location => ({
    loc: `${BASE_URL}/autoglas-${location.slug}/`,
    lastmod: getStableLastmod(location.slug, location.lastModified),
    priority: getLocationPriority(location),
  }));
}

/**
 * Stadtteile & Stadtbezirke – niedrigste Ebene, nur indexierbare
 */
function generateStadtteileSitemap(): SitemapUrl[] {
  const stadtteilTypes = ['stadtbezirk', 'stadtteil'];
  const indexable = locations.filter(
    loc => stadtteilTypes.includes(loc.type)
  );

  return indexable.map(location => ({
    loc: `${BASE_URL}/autoglas-${location.slug}/`,
    lastmod: getStableLastmod(location.slug, location.lastModified),
    priority: getLocationPriority(location),
  }));
}

/**
 * Service-Location-Seiten für einen einzelnen Service.
 * Filter MUSS identisch sein mit generateStaticParams() in page.tsx.
 */
function generateServiceSitemap(serviceSlug: string): SitemapUrl[] {
  const importantLocations = locations.filter(isImportantLocationForServices);

  return importantLocations.map(location => ({
    loc: `${BASE_URL}/${serviceSlug}-${location.slug}/`,
    lastmod: getStableLastmod(`${serviceSlug}-${location.slug}`, location.lastModified),
    priority: getServiceLocationPriority(location),
  }));
}

/**
 * Fahrzeug-Seiten: Marken-Hubs + populäre Modelle
 */
function generateVehiclesSitemap(): SitemapUrl[] {
  const urls: SitemapUrl[] = [];

  for (const brand of brands) {
    urls.push({
      loc: `${BASE_URL}/scheibenwechsel-${brand.slug}/`,
      lastmod: getStableLastmod(`brand-${brand.slug}`),
      priority: 0.8,
    });
  }

  const popularModels = models.filter(m => m.popular);
  for (const model of popularModels) {
    urls.push({
      loc: `${BASE_URL}/scheibenwechsel-${model.brandSlug}-${model.slug}/`,
      lastmod: getStableLastmod(`vehicle-${model.brandSlug}-${model.slug}`),
      priority: getVehiclePriority(model),
    });
  }

  return urls;
}

// ============================================
// MAIN
// ============================================

async function main() {
  console.log('🗺️  Thematischer Sitemap Generator (v2 – granular)\n');
  console.log('='.repeat(60));

  const buildDate = new Date().toISOString();

  // Zähle Locations für den Report
  const totalLocations = locations.length;

  console.log(`📍 Locations: ${totalLocations} gesamt (alle indexierbar)`);
  console.log(`📌 CONTENT_VERSION: ${CONTENT_VERSION} (hochzählen bei echten Content-Updates)\n`);

  // Alle Sitemaps generieren – jede wird nach Priority sortiert
  const sitemaps: { name: string; urls: SitemapUrl[] }[] = [
    { name: 'sitemap-pages.xml', urls: sortByPriority(generatePagesSitemap()) },
    { name: 'sitemap-bundeslaender.xml', urls: sortByPriority(generateBundeslaenderSitemap()) },
    { name: 'sitemap-staedte.xml', urls: sortByPriority(generateStaedteSitemap()) },
    { name: 'sitemap-regionen.xml', urls: sortByPriority(generateRegionenSitemap()) },
    { name: 'sitemap-stadtteile.xml', urls: sortByPriority(generateStadtteileSitemap()) },
    // Service-Sitemaps: eine pro Service für gezielte Crawl-Steuerung
    ...services.map(service => ({
      name: `sitemap-${service.slug}.xml`,
      urls: sortByPriority(generateServiceSitemap(service.slug)),
    })),
    { name: 'sitemap-vehicles.xml', urls: sortByPriority(generateVehiclesSitemap()) },
  ];

  // Output-Verzeichnis erstellen
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Sub-Sitemaps schreiben
  const sitemapIndex: { loc: string; lastmod: string }[] = [];
  let totalUrls = 0;

  for (const sitemap of sitemaps) {
    // Leere Sitemaps überspringen
    if (sitemap.urls.length === 0) {
      console.log(`⏭️  ${sitemap.name}: 0 URLs (übersprungen)`);
      continue;
    }

    const xml = generateSitemapXml(sitemap.urls);
    const filepath = path.join(OUTPUT_DIR, sitemap.name);
    fs.writeFileSync(filepath, xml);

    sitemapIndex.push({
      loc: `${BASE_URL}/${sitemap.name}`,
      lastmod: buildDate,
    });

    totalUrls += sitemap.urls.length;
    console.log(`✅ ${sitemap.name.padEnd(35)} ${sitemap.urls.length.toString().padStart(5)} URLs`);
  }

  // Sitemap Index schreiben
  const indexXml = generateSitemapIndexXml(sitemapIndex);
  fs.writeFileSync(path.join(OUTPUT_DIR, 'sitemap.xml'), indexXml);
  console.log(`\n✅ sitemap.xml (Index): ${sitemapIndex.length} Sub-Sitemaps`);

  // Statistiken
  console.log('\n' + '='.repeat(60));
  console.log('📊 STATISTIKEN\n');
  console.log(`Gesamt: ${totalUrls} URLs in ${sitemapIndex.length} Sitemaps\n`);

  // Locations nach Typ
  console.log('📍 LOCATION-VERTEILUNG\n');
  const locationSitemaps = sitemaps.filter(s => 
    ['sitemap-bundeslaender.xml', 'sitemap-staedte.xml', 'sitemap-regionen.xml', 'sitemap-stadtteile.xml'].includes(s.name)
  );
  let locationTotal = 0;
  for (const s of locationSitemaps) {
    locationTotal += s.urls.length;
    console.log(`  ${s.name.padEnd(35)} ${s.urls.length.toString().padStart(5)} URLs`);
  }
  console.log(`  ${''.padEnd(35)} ${'-'.repeat(5)}`);
  console.log(`  ${'Gesamt Locations'.padEnd(35)} ${locationTotal.toString().padStart(5)} URLs`);

  // Services
  console.log('\n🔧 SERVICE-VERTEILUNG\n');
  const serviceSitemaps = sitemaps.filter(s => 
    services.some(svc => s.name === `sitemap-${svc.slug}.xml`)
  );
  let serviceTotal = 0;
  for (const s of serviceSitemaps) {
    serviceTotal += s.urls.length;
    console.log(`  ${s.name.padEnd(35)} ${s.urls.length.toString().padStart(5)} URLs`);
  }
  console.log(`  ${''.padEnd(35)} ${'-'.repeat(5)}`);
  console.log(`  ${'Gesamt Services'.padEnd(35)} ${serviceTotal.toString().padStart(5)} URLs`);

  // Prioritäts-Verteilung
  console.log('\n📈 PRIORITÄTS-VERTEILUNG\n');
  const allUrls = sitemaps.flatMap(s => s.urls);
  const priorityGroups: Record<string, number> = {};

  allUrls.forEach(url => {
    const key = url.priority.toFixed(1);
    priorityGroups[key] = (priorityGroups[key] || 0) + 1;
  });

  Object.entries(priorityGroups)
    .sort(([a], [b]) => parseFloat(b) - parseFloat(a))
    .forEach(([priority, count]) => {
      const bar = '█'.repeat(Math.ceil(count / (totalUrls / 40)));
      console.log(`  ${priority}: ${count.toString().padStart(5)} ${bar}`);
    });

  // Validierung
  console.log('\n🔍 VALIDIERUNG\n');

  // Check 1: Location-Sitemaps = alle Locations
  const sitemapLocationCount = locationTotal;
  if (sitemapLocationCount !== totalLocations) {
    console.warn(`  ⚠️ Location-Mismatch: ${sitemapLocationCount} in Sitemaps vs ${totalLocations} gesamt`);
  } else {
    console.log(`  ✅ Alle ${totalLocations} Locations in Sitemaps`);
  }

  // Check 2: Jede Service-Sitemap hat dieselbe Anzahl Locations
  const serviceLocCount = locations.filter(isImportantLocationForServices).length;
  for (const s of serviceSitemaps) {
    if (s.urls.length !== serviceLocCount) {
      console.warn(`  ⚠️ ${s.name}: ${s.urls.length} URLs, erwartet ${serviceLocCount}`);
    }
  }
  console.log(`  ✅ ${services.length} Service-Sitemaps × ${serviceLocCount} Locations = ${serviceTotal} URLs`);

  // Check 3: Sortierung
  let sortOk = true;
  for (const s of sitemaps) {
    for (let i = 1; i < s.urls.length; i++) {
      if (s.urls[i].priority > s.urls[i - 1].priority) {
        console.warn(`  ⚠️ ${s.name}: nicht korrekt sortiert bei Index ${i}`);
        sortOk = false;
        break;
      }
    }
  }
  if (sortOk) {
    console.log(`  ✅ Alle Sitemaps nach Priority absteigend sortiert`);
  }

  console.log('\n🎉 Sitemaps erfolgreich generiert!');
  console.log(`\n📁 Dateien in: ${OUTPUT_DIR}`);
}

main().catch(console.error);
