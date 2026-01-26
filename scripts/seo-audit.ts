/**
 * SEO Audit Script
 * Überprüft die SEO-Compliance gemäß PRD-Anforderungen
 * 
 * Ausführen mit: npx ts-node scripts/seo-audit.ts
 */

import { 
  locations, 
  getAllLocationSlugs, 
  getLocationBySlug,
  getLocationsByType,
  getChildLocations,
  getLocationStats
} from '../src/data/locations';
import { mainServices, getAllServiceSlugs } from '../src/data/services';
import { models, getPopularVehicleCombinations } from '../src/data/vehicles';
import { 
  generateCityIntro, 
  generateMetaDescription,
  generateFaqs 
} from '../src/lib/content-generator';
import { getAllInternalLinks } from '../src/lib/internal-links';

interface AuditResult {
  test: string;
  passed: boolean;
  details: string;
  severity: 'error' | 'warning' | 'info';
}

const results: AuditResult[] = [];

function log(result: AuditResult) {
  results.push(result);
  const icon = result.passed ? '✅' : result.severity === 'error' ? '❌' : '⚠️';
  console.log(`${icon} ${result.test}: ${result.details}`);
}

// =====================================================
// TEST 1: Mindestanzahl indexierbare Seiten (PRD: >500)
// =====================================================
function testIndexablePages() {
  const links = getAllInternalLinks();
  const totalPages = 
    links.locationPages.length + 
    links.servicePages.length + 
    links.vehiclePages.length + 
    1; // Homepage

  log({
    test: 'Indexierbare Seiten',
    passed: totalPages >= 500,
    details: `${totalPages} Seiten generiert (Ziel: >500)`,
    severity: totalPages >= 500 ? 'info' : 'error'
  });

  // Details nach Typ
  const stats = getLocationStats();
  log({
    test: 'Standort-Seiten Gesamt',
    passed: links.locationPages.length > 0,
    details: `${links.locationPages.length} Standortseiten`,
    severity: 'info'
  });

  Object.entries(stats).forEach(([type, count]) => {
    if (count > 0) {
      log({
        test: `  - ${type}`,
        passed: true,
        details: `${count} Seiten`,
        severity: 'info'
      });
    }
  });

  log({
    test: 'Service-Standort-Seiten',
    passed: links.servicePages.length > 0,
    details: `${links.servicePages.length} Service-Standort-Kombinationen`,
    severity: 'info'
  });

  log({
    test: 'Fahrzeugseiten',
    passed: links.vehiclePages.length > 0,
    details: `${links.vehiclePages.length} Fahrzeugseiten`,
    severity: 'info'
  });
}

// =====================================================
// TEST 2: Hierarchie-Struktur
// =====================================================
function testHierarchy() {
  const bundeslaender = getLocationsByType('bundesland');
  const staedte = getLocationsByType('kreisfreie-stadt');
  const stadtteile = getLocationsByType('stadtteil');
  
  log({
    test: 'Bundesländer',
    passed: bundeslaender.length === 16,
    details: `${bundeslaender.length}/16 Bundesländer vorhanden`,
    severity: bundeslaender.length === 16 ? 'info' : 'warning'
  });

  log({
    test: 'Kreisfreie Städte',
    passed: staedte.length >= 20,
    details: `${staedte.length} kreisfreie Städte`,
    severity: staedte.length >= 20 ? 'info' : 'warning'
  });

  log({
    test: 'Stadtteile',
    passed: stadtteile.length >= 50,
    details: `${stadtteile.length} Stadtteile`,
    severity: stadtteile.length >= 50 ? 'info' : 'warning'
  });

  // Prüfe Hierarchie-Integrität
  let orphanedLocations = 0;
  locations.forEach(loc => {
    if (loc.parentSlug && !getLocationBySlug(loc.parentSlug)) {
      orphanedLocations++;
    }
  });

  log({
    test: 'Hierarchie-Integrität',
    passed: orphanedLocations === 0,
    details: orphanedLocations === 0 
      ? 'Alle Parent-Referenzen gültig'
      : `${orphanedLocations} ungültige Parent-Referenzen`,
    severity: orphanedLocations === 0 ? 'info' : 'error'
  });
}

// =====================================================
// TEST 3: Duplicate Content Check
// =====================================================
function testDuplicateContent() {
  const intros = new Map<string, string[]>();
  
  getAllLocationSlugs().slice(0, 30).forEach(slug => {
    const location = getLocationBySlug(slug);
    if (location) {
      const intro = generateCityIntro(location.name, slug);
      if (!intros.has(intro)) {
        intros.set(intro, []);
      }
      intros.get(intro)!.push(slug);
    }
  });

  const duplicates = Array.from(intros.entries()).filter(([, slugs]) => slugs.length > 1);
  
  log({
    test: 'Duplicate Content (Intros)',
    passed: duplicates.length === 0,
    details: duplicates.length === 0 
      ? 'Keine doppelten Intros gefunden'
      : `${duplicates.length} doppelte Intros gefunden`,
    severity: duplicates.length === 0 ? 'info' : 'warning'
  });
}

// =====================================================
// TEST 4: URL-Pattern Konformität
// =====================================================
function testUrlPatterns() {
  const links = getAllInternalLinks();
  let invalidUrls = 0;

  // Standortseiten: /autoglas-[standort]/
  links.locationPages.forEach(url => {
    if (!url.match(/^\/autoglas-[a-z0-9-]+\/$/)) {
      invalidUrls++;
    }
  });

  // Service-Seiten: /[service]-[standort]/
  links.servicePages.forEach(url => {
    if (!url.match(/^\/[a-z-]+-[a-z0-9-]+\/$/)) {
      invalidUrls++;
    }
  });

  // Fahrzeugseiten: /scheibenwechsel-[marke]-[modell]/
  links.vehiclePages.forEach(url => {
    if (!url.match(/^\/scheibenwechsel-[a-z0-9-]+-[a-z0-9-]+\/$/)) {
      invalidUrls++;
    }
  });

  log({
    test: 'URL-Pattern Konformität',
    passed: invalidUrls === 0,
    details: invalidUrls === 0 
      ? 'Alle URLs entsprechen dem definierten Muster'
      : `${invalidUrls} URLs entsprechen nicht dem Muster`,
    severity: invalidUrls === 0 ? 'info' : 'error'
  });
}

// =====================================================
// TEST 5: Datenqualität
// =====================================================
function testDataQuality() {
  // Standorte mit Koordinaten
  const locationsWithCoords = locations.filter(l => l.coordinates);
  const staedte = getLocationsByType('kreisfreie-stadt');
  const staedteMitCoords = staedte.filter(s => s.coordinates);

  log({
    test: 'Städte mit Koordinaten',
    passed: staedteMitCoords.length === staedte.length,
    details: `${staedteMitCoords.length}/${staedte.length} kreisfreie Städte haben GPS-Koordinaten`,
    severity: staedteMitCoords.length === staedte.length ? 'info' : 'warning'
  });

  // Standorte mit PLZ
  const locationsWithPLZ = locations.filter(l => l.plz && l.plz.length > 0);

  log({
    test: 'Standorte mit PLZ',
    passed: locationsWithPLZ.length > locations.length * 0.3,
    details: `${locationsWithPLZ.length}/${locations.length} haben PLZ-Daten`,
    severity: locationsWithPLZ.length > locations.length * 0.3 ? 'info' : 'warning'
  });

  // Services mit Keywords
  const servicesWithKeywords = mainServices.filter(s => s.keywords && s.keywords.length >= 3);

  log({
    test: 'Services mit Keywords',
    passed: servicesWithKeywords.length === mainServices.length,
    details: `${servicesWithKeywords.length}/${mainServices.length} Services haben ≥3 Keywords`,
    severity: servicesWithKeywords.length === mainServices.length ? 'info' : 'warning'
  });

  // Fahrzeuge
  const popularVehicles = getPopularVehicleCombinations();

  log({
    test: 'Beliebte Fahrzeugmodelle',
    passed: popularVehicles.length >= 50,
    details: `${popularVehicles.length} populäre Fahrzeugkombinationen`,
    severity: popularVehicles.length >= 50 ? 'info' : 'warning'
  });
}

// =====================================================
// MAIN
// =====================================================
async function runAudit() {
  console.log('\n🔍 SEO AUDIT - Autoglas-Rocket\n');
  console.log('='.repeat(50));
  console.log('Prüfung der PRD-Anforderungen (Hierarchische Struktur)\n');

  testIndexablePages();
  console.log('');
  testHierarchy();
  console.log('');
  testDuplicateContent();
  console.log('');
  testUrlPatterns();
  console.log('');
  testDataQuality();

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 ZUSAMMENFASSUNG\n');
  
  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed && r.severity === 'error').length;
  const warnings = results.filter(r => !r.passed && r.severity === 'warning').length;

  console.log(`✅ Bestanden: ${passed}`);
  console.log(`❌ Fehler: ${failed}`);
  console.log(`⚠️ Warnungen: ${warnings}`);
  console.log(`📝 Gesamt: ${results.length} Tests\n`);

  if (failed > 0) {
    console.log('❌ Audit NICHT bestanden - Fehler beheben!');
    process.exit(1);
  } else if (warnings > 0) {
    console.log('⚠️ Audit bestanden mit Warnungen');
    process.exit(0);
  } else {
    console.log('✅ Audit vollständig bestanden!');
    process.exit(0);
  }
}

runAudit();
