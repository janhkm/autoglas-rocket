/**
 * Build Statistics Script
 * 
 * Calculates and displays build statistics for pSEO pages.
 * Helps monitor scale and estimate build times.
 * 
 * Run: npx ts-node --project tsconfig.scripts.json scripts/build-stats.ts
 */

import { locations, getLocationsByType } from '../src/data/locations';
import { services, mainServices } from '../src/data/services';
import { models, brands } from '../src/data/vehicles';

interface BuildStats {
  locationPages: number;
  serviceLocationPages: number;
  vehiclePages: number;
  staticPages: number;
  total: number;
  breakdown: {
    bundeslaender: number;
    kreisfreieStaedte: number;
    stadtbezirke: number;
    stadtteile: number;
    other: number;
  };
}

function calculateBuildStats(): BuildStats {
  // Location pages (all locations)
  const locationPages = locations.length;
  
  // Service-Location combinations (only for important locations)
  const importantLocations = locations.filter(loc => 
    loc.type === 'kreisfreie-stadt' || 
    loc.type === 'bundesland' ||
    loc.type === 'regierungsbezirk' ||
    (loc.priority && loc.priority >= 7)
  );
  
  // Only main services for location combos (currently just 'scheibenwechsel')
  const mainServiceSlugs = mainServices.map(s => s.slug);
  const serviceLocationPages = importantLocations.length * mainServiceSlugs.length;
  
  // Vehicle pages (popular models only)
  const vehiclePages = models.filter(m => m.popular).length;
  
  // Static pages
  const staticPages = 4; // Home, Impressum, Datenschutz, Einsatzgebiete
  
  // Location breakdown
  const bundeslaender = getLocationsByType('bundesland').length;
  const kreisfreieStaedte = getLocationsByType('kreisfreie-stadt').length;
  const stadtbezirke = getLocationsByType('stadtbezirk').length;
  const stadtteile = getLocationsByType('stadtteil').length;
  const other = locationPages - bundeslaender - kreisfreieStaedte - stadtbezirke - stadtteile;
  
  return {
    locationPages,
    serviceLocationPages,
    vehiclePages,
    staticPages,
    total: locationPages + serviceLocationPages + vehiclePages + staticPages,
    breakdown: {
      bundeslaender,
      kreisfreieStaedte,
      stadtbezirke,
      stadtteile,
      other
    }
  };
}

function formatNumber(num: number): string {
  return num.toLocaleString('de-DE');
}

function printStats(): void {
  const stats = calculateBuildStats();
  
  console.log('\n📊 pSEO Build Statistics\n');
  console.log('═'.repeat(50));
  
  console.log('\n📄 PAGE COUNTS\n');
  console.log(`  Location Pages (T1):       ${formatNumber(stats.locationPages).padStart(8)}`);
  console.log(`  Service-Location (T2):     ${formatNumber(stats.serviceLocationPages).padStart(8)}`);
  console.log(`  Vehicle Pages (T3):        ${formatNumber(stats.vehiclePages).padStart(8)}`);
  console.log(`  Static Pages:              ${formatNumber(stats.staticPages).padStart(8)}`);
  console.log('  ' + '─'.repeat(35));
  console.log(`  TOTAL:                     ${formatNumber(stats.total).padStart(8)}`);
  
  console.log('\n📍 LOCATION BREAKDOWN\n');
  console.log(`  Bundesländer:              ${formatNumber(stats.breakdown.bundeslaender).padStart(8)}`);
  console.log(`  Kreisfreie Städte:         ${formatNumber(stats.breakdown.kreisfreieStaedte).padStart(8)}`);
  console.log(`  Stadtbezirke:              ${formatNumber(stats.breakdown.stadtbezirke).padStart(8)}`);
  console.log(`  Stadtteile:                ${formatNumber(stats.breakdown.stadtteile).padStart(8)}`);
  console.log(`  Andere:                    ${formatNumber(stats.breakdown.other).padStart(8)}`);
  
  console.log('\n🚗 VEHICLE DATA\n');
  console.log(`  Marken:                    ${formatNumber(brands.length).padStart(8)}`);
  console.log(`  Modelle gesamt:            ${formatNumber(models.length).padStart(8)}`);
  console.log(`  Populäre Modelle:          ${formatNumber(models.filter(m => m.popular).length).padStart(8)}`);
  
  console.log('\n⏱️  BUILD TIME ESTIMATE\n');
  // Rough estimate: ~0.3s per page on average for SSG
  const estimatedMinSeconds = Math.ceil(stats.total * 0.2);
  const estimatedMaxSeconds = Math.ceil(stats.total * 0.5);
  const minMinutes = Math.floor(estimatedMinSeconds / 60);
  const maxMinutes = Math.ceil(estimatedMaxSeconds / 60);
  
  console.log(`  Estimated build time:      ${minMinutes}-${maxMinutes} minutes`);
  console.log(`  Pages per second:          ~2-5 pages/s`);
  
  // Warnings
  console.log('\n⚠️  SCALE WARNINGS\n');
  
  if (stats.total > 10000) {
    console.log('  🔴 CRITICAL: Over 10,000 pages!');
    console.log('     Consider: ISR, data externalization, or page pruning');
  } else if (stats.total > 5000) {
    console.log('  🟡 WARNING: Over 5,000 pages');
    console.log('     Monitor build times and memory usage');
  } else if (stats.total > 2000) {
    console.log('  🟢 OK: Page count is manageable');
    console.log('     Build should complete in reasonable time');
  } else {
    console.log('  ✅ GOOD: Under 2,000 pages');
    console.log('     No scale concerns at this level');
  }
  
  // Memory estimate
  const estimatedMemoryMB = Math.ceil(stats.locationPages * 0.15); // ~150KB per location entry
  console.log(`\n  Estimated data memory:     ~${estimatedMemoryMB} MB`);
  
  console.log('\n' + '═'.repeat(50));
  console.log('✅ Stats calculation complete!\n');
}

// Run the script
printStats();
