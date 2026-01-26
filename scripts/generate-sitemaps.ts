/**
 * Thematischer Sitemap Generator für pSEO
 * 
 * Generiert separate Sitemaps nach Kategorie (wie autoglas-profis.de):
 * - sitemap.xml (Index)
 * - sitemap-pages.xml (Statische Seiten)
 * - sitemap-cities.xml (Städte/Orte)
 * - sitemap-services.xml (Service + Stadt Kombinationen)
 * - sitemap-vehicles.xml (Fahrzeug-Seiten)
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
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

// ============================================
// PRIORITÄTS-BERECHNUNG
// ============================================

/**
 * Berechnet die Priorität für eine Location basierend auf Typ und Wichtigkeit
 */
function getLocationPriority(location: Location): number {
  // Basis-Priorität nach Typ
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

  // Bonus für hohe Einwohnerzahl
  if (location.population) {
    if (location.population > 1000000) priority = Math.min(1.0, priority + 0.1);
    else if (location.population > 500000) priority = Math.min(0.95, priority + 0.05);
    else if (location.population > 100000) priority = Math.min(0.9, priority + 0.03);
  }

  // Nutze das priority-Feld wenn vorhanden (1-10 -> 0.1-1.0)
  if (location.priority) {
    const dataPriority = location.priority / 10;
    priority = Math.max(priority, dataPriority);
  }

  return Math.round(priority * 100) / 100; // Auf 2 Dezimalstellen runden
}

/**
 * Berechnet die Priorität für eine Service-Location-Kombination
 */
function getServiceLocationPriority(location: Location): number {
  const basePriority = getLocationPriority(location);
  // Service-Location-Seiten sind etwas wichtiger als reine Location-Seiten
  return Math.min(1.0, basePriority + 0.05);
}

/**
 * Berechnet die Priorität für eine Fahrzeugseite
 */
function getVehiclePriority(model: typeof models[0]): number {
  // Beliebte Modelle haben höhere Priorität
  return model.popular ? 0.7 : 0.5;
}

// ============================================
// XML GENERATION
// ============================================

function generateUrlXml(url: SitemapUrl): string {
  return `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
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

// ============================================
// SITEMAP GENERATORS
// ============================================

function generatePagesSitemap(): SitemapUrl[] {
  const lastmod = new Date().toISOString();
  
  // Impressum und Datenschutz werden nicht indexiert (noindex) 
  // und sind daher nicht in der Sitemap enthalten
  return [
    {
      loc: `${BASE_URL}/`,
      lastmod,
      changefreq: 'daily',
      priority: 1.0,
    },
    {
      loc: `${BASE_URL}/einsatzgebiete`,
      lastmod,
      changefreq: 'weekly',
      priority: 0.8,
    },
  ];
}

function generateCitiesSitemap(): SitemapUrl[] {
  const lastmod = new Date().toISOString();
  
  return locations.map(location => ({
    loc: `${BASE_URL}/autoglas-${location.slug}`,
    lastmod,
    changefreq: 'weekly' as const,
    priority: getLocationPriority(location),
  }));
}

function generateServicesSitemap(): SitemapUrl[] {
  const lastmod = new Date().toISOString();
  const urls: SitemapUrl[] = [];

  // Nur wichtige Locations für Service-Kombinationen
  // (kreisfreie Städte, Bundesländer, und Orte mit hoher Priorität)
  const importantLocations = locations.filter(loc => 
    loc.type === 'kreisfreie-stadt' || 
    loc.type === 'bundesland' ||
    loc.type === 'regierungsbezirk' ||
    (loc.priority && loc.priority >= 7) ||
    (loc.population && loc.population > 50000)
  );

  // Nur Hauptservices für Location-Kombis
  const mainServiceSlugs = ['scheibenwechsel'];
  const mainServices = services.filter(s => mainServiceSlugs.includes(s.slug));

  mainServices.forEach(service => {
    importantLocations.forEach(location => {
      urls.push({
        loc: `${BASE_URL}/${service.slug}-${location.slug}`,
        lastmod,
        changefreq: 'weekly',
        priority: getServiceLocationPriority(location),
      });
    });
  });

  return urls;
}

function generateVehiclesSitemap(): SitemapUrl[] {
  const lastmod = new Date().toISOString();
  
  // Nur populäre Modelle für bessere Qualität
  const popularModels = models.filter(m => m.popular);
  
  return popularModels.map(model => ({
    loc: `${BASE_URL}/scheibenwechsel-${model.brandSlug}-${model.slug}`,
    lastmod,
    changefreq: 'monthly' as const,
    priority: getVehiclePriority(model),
  }));
}

// ============================================
// MAIN
// ============================================

async function main() {
  console.log('🗺️  Thematischer Sitemap Generator\n');
  console.log('='.repeat(50));

  const lastmod = new Date().toISOString();

  // Sitemaps generieren
  const sitemaps: { name: string; urls: SitemapUrl[] }[] = [
    { name: 'sitemap-pages.xml', urls: generatePagesSitemap() },
    { name: 'sitemap-cities.xml', urls: generateCitiesSitemap() },
    { name: 'sitemap-services.xml', urls: generateServicesSitemap() },
    { name: 'sitemap-vehicles.xml', urls: generateVehiclesSitemap() },
  ];

  // Output-Verzeichnis erstellen
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Sub-Sitemaps schreiben
  const sitemapIndex: { loc: string; lastmod: string }[] = [];
  let totalUrls = 0;

  for (const sitemap of sitemaps) {
    const xml = generateSitemapXml(sitemap.urls);
    const filepath = path.join(OUTPUT_DIR, sitemap.name);
    fs.writeFileSync(filepath, xml);

    sitemapIndex.push({
      loc: `${BASE_URL}/${sitemap.name}`,
      lastmod,
    });

    totalUrls += sitemap.urls.length;
    console.log(`✅ ${sitemap.name}: ${sitemap.urls.length} URLs`);
  }

  // Sitemap Index schreiben
  const indexXml = generateSitemapIndexXml(sitemapIndex);
  fs.writeFileSync(path.join(OUTPUT_DIR, 'sitemap.xml'), indexXml);
  console.log(`\n✅ sitemap.xml (Index): ${sitemaps.length} Sub-Sitemaps`);

  // Statistiken
  console.log('\n' + '='.repeat(50));
  console.log('📊 STATISTIKEN\n');
  console.log(`Gesamt: ${totalUrls} URLs\n`);
  
  sitemaps.forEach(s => {
    const percentage = ((s.urls.length / totalUrls) * 100).toFixed(1);
    console.log(`  ${s.name.padEnd(25)} ${s.urls.length.toString().padStart(5)} URLs (${percentage}%)`);
  });

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
      const bar = '█'.repeat(Math.ceil(count / (totalUrls / 30)));
      console.log(`  ${priority}: ${count.toString().padStart(5)} ${bar}`);
    });

  console.log('\n🎉 Sitemaps erfolgreich generiert!');
  console.log(`\n📁 Dateien in: ${OUTPUT_DIR}`);
}

main().catch(console.error);
