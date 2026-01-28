/**
 * Generator Script for llms-full.txt
 * Creates a comprehensive page index for LLM crawlers
 * 
 * Run with: npx ts-node scripts/generate-llms-txt.ts
 */

import * as fs from 'fs';
import * as path from 'path';

// Import data sources
import { locations, getLocationsByType, Location } from '../src/data/locations';
import { services } from '../src/data/services';
import { brands, models, getPopularVehicleCombinations } from '../src/data/vehicles';

const BASE_URL = 'https://autoglas-rocket.de';
const OUTPUT_PATH = path.join(__dirname, '../public/llms-full.txt');

function getLocationDescription(location: Location): string {
  const typeLabels: Record<string, string> = {
    'bundesland': 'Bundesland',
    'regierungsbezirk': 'Regierungsbezirk',
    'kreisfreie-stadt': 'Stadt',
    'landkreis': 'Landkreis',
    'gemeinde': 'Gemeinde',
    'stadtbezirk': 'Stadtbezirk',
    'stadtteil': 'Stadtteil'
  };
  
  const typeLabel = typeLabels[location.type] || 'Ort';
  const plzInfo = location.plz?.length ? ` (PLZ: ${location.plz.slice(0, 3).join(', ')}${location.plz.length > 3 ? '...' : ''})` : '';
  
  return `Autoglas-Service in ${location.name} (${typeLabel})${plzInfo}`;
}

function generateLlmsFullTxt(): string {
  const lines: string[] = [];
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Header
  lines.push('# Autoglas-Rocket - Vollständige Seitenübersicht');
  lines.push('');
  lines.push(`> Generiert am ${currentDate}`);
  lines.push('');
  lines.push('Diese Datei enthält alle verfügbaren Seiten mit Beschreibungen für LLM-Indexierung.');
  lines.push('');
  
  // === Bundesländer ===
  lines.push('## Bundesländer');
  lines.push('');
  const bundeslaender = getLocationsByType('bundesland');
  for (const bl of bundeslaender) {
    lines.push(`- [/autoglas-${bl.slug}/](${BASE_URL}/autoglas-${bl.slug}/): ${getLocationDescription(bl)}`);
  }
  lines.push('');
  
  // === Großstädte ===
  lines.push('## Großstädte');
  lines.push('');
  const cities = getLocationsByType('kreisfreie-stadt')
    .filter(c => c.population && c.population > 100000)
    .sort((a, b) => (b.population || 0) - (a.population || 0))
    .slice(0, 50); // Top 50 cities
  
  for (const city of cities) {
    const pop = city.population ? ` – ${Math.round(city.population / 1000)}k Einwohner` : '';
    lines.push(`- [/autoglas-${city.slug}/](${BASE_URL}/autoglas-${city.slug}/): Autoglas-Service ${city.name}${pop}`);
  }
  lines.push('');
  
  // === Service-Location Kombinationen ===
  lines.push('## Scheibenwechsel nach Stadt');
  lines.push('');
  lines.push('Spezifische Scheibenwechsel-Seiten für wichtige Städte:');
  lines.push('');
  
  const importantCities = locations.filter(loc => 
    loc.type === 'kreisfreie-stadt' || 
    loc.type === 'bundesland' ||
    (loc.priority && loc.priority >= 8)
  ).slice(0, 30);
  
  for (const city of importantCities) {
    lines.push(`- [/scheibenwechsel-${city.slug}/](${BASE_URL}/scheibenwechsel-${city.slug}/): Scheibenwechsel in ${city.name}`);
  }
  lines.push('');
  
  // === Fahrzeuge ===
  lines.push('## Fahrzeug-Seiten');
  lines.push('');
  lines.push('Scheibenwechsel nach Fahrzeugmarke und Modell:');
  lines.push('');
  
  // Group by brand
  for (const brand of brands) {
    const brandModels = models.filter(m => m.brandSlug === brand.slug && m.popular);
    if (brandModels.length === 0) continue;
    
    lines.push(`### ${brand.name}`);
    lines.push('');
    for (const model of brandModels) {
      lines.push(`- [/scheibenwechsel-${brand.slug}-${model.slug}/](${BASE_URL}/scheibenwechsel-${brand.slug}-${model.slug}/): Scheibenwechsel ${brand.name} ${model.name} (${model.years})`);
    }
    lines.push('');
  }
  
  // === Statistiken ===
  lines.push('## Statistiken');
  lines.push('');
  lines.push(`- Gesamt Standorte: ${locations.length}`);
  lines.push(`- Bundesländer: ${bundeslaender.length}`);
  lines.push(`- Großstädte (>100k): ${cities.length}`);
  lines.push(`- Fahrzeugmarken: ${brands.length}`);
  lines.push(`- Fahrzeugmodelle: ${models.filter(m => m.popular).length} (populär)`);
  lines.push('');
  
  // === Weitere Ressourcen ===
  lines.push('## Weitere Ressourcen');
  lines.push('');
  lines.push(`- [/sitemap.xml](${BASE_URL}/sitemap.xml): XML Sitemap`);
  lines.push(`- [/einsatzgebiete/](${BASE_URL}/einsatzgebiete/): Alle Einsatzgebiete auf einer Seite`);
  lines.push(`- [/](${BASE_URL}/): Startseite`);
  lines.push('');
  
  return lines.join('\n');
}

// Main execution
function main() {
  console.log('🔄 Generating llms-full.txt...');
  
  const content = generateLlmsFullTxt();
  fs.writeFileSync(OUTPUT_PATH, content, 'utf-8');
  
  console.log(`✅ Generated ${OUTPUT_PATH}`);
  console.log(`   File size: ${(content.length / 1024).toFixed(2)} KB`);
  console.log(`   Lines: ${content.split('\n').length}`);
}

main();
