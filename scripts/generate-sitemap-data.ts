/**
 * Sitemap Data Generator
 * Generiert eine Übersicht aller URLs für die Sitemap
 * 
 * Ausführen mit: npx ts-node scripts/generate-sitemap-data.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { locations, getLocationsByType } from '../src/data/locations';
import { mainServices } from '../src/data/services';
import { models } from '../src/data/vehicles';

interface SitemapEntry {
  url: string;
  priority: number;
  changefreq: string;
  type: string;
}

const BASE_URL = 'https://autoglas-rocket.de';

function generateSitemapData(): SitemapEntry[] {
  const entries: SitemapEntry[] = [];

  // Homepage
  entries.push({
    url: '/',
    priority: 1.0,
    changefreq: 'daily',
    type: 'homepage'
  });

  // Alle Location-Seiten
  locations.forEach(location => {
    let priority = 0.7;
    
    // Priorität basierend auf Typ
    switch (location.type) {
      case 'bundesland':
        priority = 0.9;
        break;
      case 'kreisfreie-stadt':
        priority = 0.9;
        break;
      case 'regierungsbezirk':
        priority = 0.8;
        break;
      case 'stadtbezirk':
        priority = 0.7;
        break;
      case 'stadtteil':
        priority = 0.6;
        break;
    }

    entries.push({
      url: `/autoglas-${location.slug}/`,
      priority,
      changefreq: 'weekly',
      type: `location-${location.type}`
    });
  });

  // Service-Location-Kombinationen (nur für wichtige Standorte)
  const importantLocations = locations.filter(loc => 
    loc.type === 'kreisfreie-stadt' || 
    loc.type === 'bundesland' ||
    (loc.priority && loc.priority >= 7)
  );

  mainServices.forEach(service => {
    importantLocations.forEach(location => {
      entries.push({
        url: `/${service.slug}-${location.slug}/`,
        priority: 0.8,
        changefreq: 'weekly',
        type: 'service-location'
      });
    });
  });

  // T3: Fahrzeugseiten (nur beliebte Modelle)
  const popularModels = models.filter(m => m.popular);
  popularModels.forEach(model => {
    entries.push({
      url: `/scheibenwechsel-${model.brandSlug}-${model.slug}/`,
      priority: 0.7,
      changefreq: 'monthly',
      type: 'vehicle'
    });
  });

  return entries;
}

function generateXmlSitemap(entries: SitemapEntry[]): string {
  const urls = entries.map(entry => `
  <url>
    <loc>${BASE_URL}${entry.url}</loc>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

function generateStats(entries: SitemapEntry[]): void {
  const stats = {
    total: entries.length,
    byType: {} as Record<string, number>
  };

  entries.forEach(entry => {
    stats.byType[entry.type] = (stats.byType[entry.type] || 0) + 1;
  });

  console.log('\n📊 SITEMAP STATISTIKEN\n');
  console.log('='.repeat(40));
  console.log(`\nGesamt: ${stats.total} URLs\n`);
  console.log('Nach Typ:');
  Object.entries(stats.byType).forEach(([type, count]) => {
    console.log(`  - ${type}: ${count}`);
  });
  console.log('');
}

async function main() {
  console.log('🗺️  Sitemap Data Generator\n');
  
  const entries = generateSitemapData();
  
  // Statistiken anzeigen
  generateStats(entries);

  // JSON-Datei speichern
  const outputDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Sitemap URLs als JSON (für Debug/Analyse)
  fs.writeFileSync(
    path.join(outputDir, 'sitemap-urls.json'),
    JSON.stringify(entries, null, 2)
  );
  console.log('✅ sitemap-urls.json erstellt');

  // Sitemap XML
  const xml = generateXmlSitemap(entries);
  fs.writeFileSync(
    path.join(outputDir, 'sitemap-static.xml'),
    xml
  );
  console.log('✅ sitemap-static.xml erstellt');

  console.log(`\n🎉 ${entries.length} URLs generiert!`);
}

main().catch(console.error);
