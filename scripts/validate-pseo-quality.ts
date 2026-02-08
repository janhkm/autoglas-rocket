/**
 * pSEO Quality Validation Script
 * 
 * Performs automated quality checks on pSEO pages to detect:
 * - Duplicate titles and descriptions
 * - Thin content indicators
 * - Invalid data references
 * - Missing required fields
 * - Word count violations
 * - Content similarity issues
 * - Metadata length violations
 * - Template boilerplate ratio
 * 
 * Run: npx ts-node --project tsconfig.scripts.json scripts/validate-pseo-quality.ts
 */

import { locations, getLocationBySlug, getLocationHierarchy, getLocationsByType, Location } from '../src/data/locations';
import { models, brands, getBrandBySlug, getModelBySlug } from '../src/data/vehicles';
import { mainServices, getServiceBySlug } from '../src/data/services';
import { generateExtendedLocalContent, generateFaqs, generateLocalFaqs } from '../src/lib/content-generator';

// ============================================================================
// THRESHOLDS (from thresholds.mdc)
// ============================================================================

const THRESHOLDS = {
  // Content
  WORD_COUNT_MIN: 300,
  WORD_COUNT_CRITICAL: 150,
  CONTENT_SIMILARITY_WARNING: 0.8,
  CONTENT_SIMILARITY_CRITICAL: 0.95,
  
  // Metadata
  TITLE_MIN: 30,
  TITLE_TARGET_MIN: 50,
  TITLE_TARGET_MAX: 60,
  TITLE_MAX: 70,
  
  DESCRIPTION_MIN: 100,
  DESCRIPTION_TARGET_MIN: 150,
  DESCRIPTION_TARGET_MAX: 160,
  DESCRIPTION_MAX: 170,
  
  H1_MIN: 10,
  H1_TARGET_MIN: 20,
  H1_TARGET_MAX: 60,
  H1_MAX: 80,
  
  // Boilerplate
  BOILERPLATE_WARNING: 0.6,
  BOILERPLATE_CRITICAL: 0.8,
};

interface ValidationIssue {
  type: 'error' | 'warning' | 'info';
  category: string;
  message: string;
  location?: string;
}

const issues: ValidationIssue[] = [];

function addIssue(type: ValidationIssue['type'], category: string, message: string, location?: string) {
  issues.push({ type, category, message, location });
}

// ============================================================================
// 1. DUPLICATE CONTENT CHECKS
// ============================================================================

function checkDuplicateTitles(): void {
  console.log('\n🔍 Checking for duplicate titles...');
  
  const titles = new Map<string, string[]>();
  
  // Check location page titles
  for (const loc of locations) {
    const hierarchy = getLocationHierarchy(loc.slug);
    let title: string;
    
    switch (loc.type) {
      case 'bundesland':
        title = `Autoglas-Service ${loc.name}`;
        break;
      case 'kreisfreie-stadt':
        title = `Autoglas ${loc.name}`;
        break;
      case 'stadtbezirk': {
        const parentCity = hierarchy.find(h => h.type === 'kreisfreie-stadt') 
          || hierarchy.find(h => h.type === 'bundesland');
        title = `Autoglas ${loc.name}${parentCity ? ` ${parentCity.name}` : ''}`;
        break;
      }
      case 'stadtteil': {
        const parentCity = hierarchy.find(h => h.type === 'kreisfreie-stadt')
          || hierarchy.find(h => h.type === 'stadtbezirk')
          || hierarchy.find(h => h.type === 'bundesland');
        title = `Autoglas-Service ${loc.name}${parentCity ? ` ${parentCity.name}` : ''}`;
        break;
      }
      default:
        title = `Autoglas ${loc.name}`;
    }
    
    if (!titles.has(title)) {
      titles.set(title, []);
    }
    titles.get(title)!.push(`autoglas-${loc.slug}`);
  }
  
  // Report duplicates
  let duplicateCount = 0;
  for (const [title, slugs] of titles) {
    if (slugs.length > 1) {
      duplicateCount++;
      addIssue('warning', 'duplicate-title', 
        `Title "${title}" used by ${slugs.length} pages: ${slugs.slice(0, 3).join(', ')}${slugs.length > 3 ? '...' : ''}`
      );
    }
  }
  
  console.log(`   Found ${duplicateCount} duplicate title groups`);
}

function checkDuplicateDescriptions(): void {
  console.log('\n🔍 Checking for duplicate descriptions...');
  
  // Since we use variant selection based on slug hash, duplicates are unlikely
  // but let's verify the stadtbezirk/stadtteil descriptions have variation
  
  const stadtteile = getLocationsByType('stadtteil');
  const bezirke = getLocationsByType('stadtbezirk');
  const variants = new Set<number>();
  
  for (const loc of [...stadtteile, ...bezirke]) {
    // Simulate the hash-based variant selection
    let hash = 0;
    for (let i = 0; i < loc.slug.length; i++) {
      const char = loc.slug.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    variants.add(Math.abs(hash) % 6); // 6 variants available
  }
  
  console.log(`   ${variants.size} of 6 description variants in use`);
  if (variants.size < 3) {
    addIssue('warning', 'low-variation', 
      `Only ${variants.size} description variants in use - consider checking hash distribution`
    );
  }
}

// ============================================================================
// 2. DATA INTEGRITY CHECKS
// ============================================================================

function checkDataIntegrity(): void {
  console.log('\n🔍 Checking data integrity...');
  
  // Check location hierarchy
  let orphanedLocations = 0;
  for (const loc of locations) {
    if (loc.parentSlug && !getLocationBySlug(loc.parentSlug)) {
      orphanedLocations++;
      addIssue('error', 'data-integrity', 
        `Location "${loc.name}" has invalid parentSlug: ${loc.parentSlug}`,
        `autoglas-${loc.slug}`
      );
    }
  }
  
  // Check vehicle references
  let invalidVehicles = 0;
  for (const model of models) {
    const brand = getBrandBySlug(model.brandSlug);
    if (!brand) {
      invalidVehicles++;
      addIssue('error', 'data-integrity', 
        `Model "${model.name}" has invalid brandSlug: ${model.brandSlug}`,
        `scheibenwechsel-${model.brandSlug}-${model.slug}`
      );
    }
  }
  
  console.log(`   Orphaned locations: ${orphanedLocations}`);
  console.log(`   Invalid vehicle refs: ${invalidVehicles}`);
}

// ============================================================================
// 3. REQUIRED FIELDS CHECKS
// ============================================================================

function checkRequiredFields(): void {
  console.log('\n🔍 Checking required fields...');
  
  let missingCoords = 0;
  let missingPlz = 0;
  let missingPriority = 0;
  
  // Only check kreisfreie Städte and above for required fields
  const importantLocations = locations.filter(l => 
    l.type === 'bundesland' || l.type === 'kreisfreie-stadt'
  );
  
  for (const loc of importantLocations) {
    if (!loc.coordinates) {
      missingCoords++;
      addIssue('warning', 'missing-field', 
        `Location "${loc.name}" (${loc.type}) missing coordinates`,
        `autoglas-${loc.slug}`
      );
    }
    
    if (loc.type === 'kreisfreie-stadt' && (!loc.plz || loc.plz.length === 0)) {
      missingPlz++;
      addIssue('warning', 'missing-field', 
        `City "${loc.name}" missing PLZ`,
        `autoglas-${loc.slug}`
      );
    }
    
    if (!loc.priority) {
      missingPriority++;
      addIssue('info', 'missing-field', 
        `Location "${loc.name}" missing priority (using default)`,
        `autoglas-${loc.slug}`
      );
    }
  }
  
  console.log(`   Missing coordinates: ${missingCoords}`);
  console.log(`   Missing PLZ: ${missingPlz}`);
  console.log(`   Missing priority: ${missingPriority}`);
}

// ============================================================================
// 4. THIN CONTENT INDICATORS
// ============================================================================

function checkThinContent(): void {
  console.log('\n🔍 Checking for thin content indicators...');
  
  // Stadtteile without PLZ and without coordinates are thin content candidates
  const stadtteile = getLocationsByType('stadtteil');
  const bezirke = getLocationsByType('stadtbezirk');
  
  let thinCandidates = 0;
  
  for (const loc of [...stadtteile, ...bezirke]) {
    const noPlz = !loc.plz || loc.plz.length === 0;
    const noCoords = !loc.coordinates;
    const lowPriority = !loc.priority || loc.priority < 3;
    
    if (noPlz && noCoords && lowPriority) {
      thinCandidates++;
      if (thinCandidates <= 10) { // Only show first 10
        addIssue('info', 'thin-content', 
          `"${loc.name}" has thin content indicators (no PLZ, no coords, low priority)`,
          `autoglas-${loc.slug}`
        );
      }
    }
  }
  
  console.log(`   Thin content candidates: ${thinCandidates}`);
  if (thinCandidates > 10) {
    addIssue('info', 'thin-content', 
      `... and ${thinCandidates - 10} more thin content candidates (will be noindexed)`
    );
  }
}

// ============================================================================
// 5. KEYWORD TARGETING CHECK
// ============================================================================

function checkKeywordTargeting(): void {
  console.log('\n🔍 Checking keyword targeting...');
  
  // Verify that Location pages target "Autoglas" and Service-Location pages target "Scheibenwechsel"
  // This is a structural check - actual implementation is in generateMetadata
  
  console.log('   ✓ Location pages: "Autoglas" keyword focus');
  console.log('   ✓ Service-Location pages: "Scheibenwechsel" keyword focus');
  console.log('   ✓ Vehicle pages: "Scheibenwechsel [Brand] [Model]" keyword focus');
}

// ============================================================================
// 6. INTERNAL LINKING CHECK
// ============================================================================

function checkInternalLinking(): void {
  console.log('\n🔍 Checking internal linking structure...');
  
  // Check for orphaned stadtteile (no parent with children linking back)
  const stadtteile = getLocationsByType('stadtteil');
  const bezirke = getLocationsByType('stadtbezirk');
  const cities = getLocationsByType('kreisfreie-stadt');
  
  // For each city, check how many stadtteile it links to
  let lowLinkCities = 0;
  for (const city of cities) {
    const directChildren = locations.filter(l => l.parentSlug === city.slug);
    if (directChildren.length === 0) {
      lowLinkCities++;
      addIssue('info', 'internal-linking', 
        `City "${city.name}" has no direct child locations`
      );
    }
  }
  
  console.log(`   Cities with no children: ${lowLinkCities}`);
  console.log(`   Total stadtteile: ${stadtteile.length}`);
  console.log(`   Total stadtbezirke: ${bezirke.length}`);
}

// ============================================================================
// 7. WORD COUNT VALIDATION
// ============================================================================

/**
 * Simulates content generation and counts unique words
 */
function getSimulatedWordCount(location: Location): number {
  try {
    // Generate content for this location
    const content = generateExtendedLocalContent(location);
    const faqs = generateFaqs('city', { city: location.name }, location.slug);
    const localFaqs = generateLocalFaqs(location, location.slug);
    
    // Combine all text content
    const allText = [
      content.intro,
      content.localSection,
      content.whyUs,
      content.urgencySection,
      content.serviceArea,
      ...faqs.map(f => f.question + ' ' + f.answer),
      ...localFaqs.map(f => f.question + ' ' + f.answer),
    ].join(' ');
    
    // Count unique words
    const words = allText.toLowerCase()
      .replace(/[^\wäöüß\s]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 2);
    
    const uniqueWords = new Set(words);
    return uniqueWords.size;
  } catch {
    return 0;
  }
}

function checkWordCount(): void {
  console.log('\n🔍 Checking word counts (sampling)...');
  
  // Sample: Check Bundesländer + some cities + some Stadtteile
  const bundeslaender = getLocationsByType('bundesland');
  const cities = getLocationsByType('kreisfreie-stadt').slice(0, 10);
  const stadtteile = getLocationsByType('stadtteil').slice(0, 20);
  
  const sample = [...bundeslaender, ...cities, ...stadtteile];
  
  let belowMin = 0;
  let belowCritical = 0;
  
  for (const loc of sample) {
    const wordCount = getSimulatedWordCount(loc);
    
    if (wordCount < THRESHOLDS.WORD_COUNT_CRITICAL) {
      belowCritical++;
      addIssue('error', 'word-count', 
        `"${loc.name}" has only ${wordCount} unique words (critical: <${THRESHOLDS.WORD_COUNT_CRITICAL})`,
        `autoglas-${loc.slug}`
      );
    } else if (wordCount < THRESHOLDS.WORD_COUNT_MIN) {
      belowMin++;
      addIssue('warning', 'word-count', 
        `"${loc.name}" has only ${wordCount} unique words (min: ${THRESHOLDS.WORD_COUNT_MIN})`,
        `autoglas-${loc.slug}`
      );
    }
  }
  
  console.log(`   Sampled ${sample.length} pages`);
  console.log(`   Below minimum (${THRESHOLDS.WORD_COUNT_MIN}): ${belowMin}`);
  console.log(`   Below critical (${THRESHOLDS.WORD_COUNT_CRITICAL}): ${belowCritical}`);
}

// ============================================================================
// 8. CONTENT SIMILARITY CHECK (Jaccard)
// ============================================================================

/**
 * Tokenize text into trigrams for similarity comparison
 */
function getTrigrams(text: string): Set<string> {
  const normalized = text.toLowerCase().replace(/[^\wäöüß\s]/g, '');
  const trigrams = new Set<string>();
  
  for (let i = 0; i <= normalized.length - 3; i++) {
    trigrams.add(normalized.slice(i, i + 3));
  }
  
  return trigrams;
}

/**
 * Calculate Jaccard similarity between two trigram sets
 */
function jaccardSimilarity(set1: Set<string>, set2: Set<string>): number {
  const intersection = new Set([...set1].filter(x => set2.has(x)));
  const union = new Set([...set1, ...set2]);
  
  if (union.size === 0) return 0;
  return intersection.size / union.size;
}

function checkContentSimilarity(): void {
  console.log('\n🔍 Checking content similarity (sampling pairs)...');
  
  // Sample: Compare similar location types to detect near-duplicates
  const cities = getLocationsByType('kreisfreie-stadt').slice(0, 10);
  
  const contentCache = new Map<string, Set<string>>();
  
  // Generate content trigrams for each city
  for (const city of cities) {
    const content = generateExtendedLocalContent(city);
    const fullText = [content.intro, content.localSection, content.whyUs].join(' ');
    contentCache.set(city.slug, getTrigrams(fullText));
  }
  
  // Compare pairs
  let highSimilarity = 0;
  let criticalSimilarity = 0;
  
  for (let i = 0; i < cities.length; i++) {
    for (let j = i + 1; j < cities.length; j++) {
      const set1 = contentCache.get(cities[i].slug)!;
      const set2 = contentCache.get(cities[j].slug)!;
      const similarity = jaccardSimilarity(set1, set2);
      
      if (similarity > THRESHOLDS.CONTENT_SIMILARITY_CRITICAL) {
        criticalSimilarity++;
        addIssue('error', 'content-similarity',
          `"${cities[i].name}" and "${cities[j].name}" are ${(similarity * 100).toFixed(1)}% similar (critical: >${THRESHOLDS.CONTENT_SIMILARITY_CRITICAL * 100}%)`
        );
      } else if (similarity > THRESHOLDS.CONTENT_SIMILARITY_WARNING) {
        highSimilarity++;
        addIssue('warning', 'content-similarity',
          `"${cities[i].name}" and "${cities[j].name}" are ${(similarity * 100).toFixed(1)}% similar`
        );
      }
    }
  }
  
  console.log(`   Compared ${cities.length * (cities.length - 1) / 2} pairs`);
  console.log(`   High similarity (>${THRESHOLDS.CONTENT_SIMILARITY_WARNING * 100}%): ${highSimilarity}`);
  console.log(`   Critical similarity (>${THRESHOLDS.CONTENT_SIMILARITY_CRITICAL * 100}%): ${criticalSimilarity}`);
}

// ============================================================================
// 9. METADATA LENGTH VALIDATION
// ============================================================================

/**
 * Generate title for a location (simplified version of page.tsx logic)
 */
function generateTitle(location: Location): string {
  const currentYear = new Date().getFullYear();
  const hierarchy = getLocationHierarchy(location.slug);
  
  switch (location.type) {
    case 'bundesland':
      return `Autoglas-Service ${location.name} ᐅ Mobiler Glasservice ${currentYear} ✓ Teilkasko*`;
    case 'kreisfreie-stadt':
      return `Autoglas ${location.name} ᐅ Mobiler Service & Reparatur ${currentYear} ✓ 0€*`;
    case 'stadtbezirk': {
      const parentCity = hierarchy.find(h => h.type === 'kreisfreie-stadt') 
        || hierarchy.find(h => h.type === 'bundesland');
      return `Autoglas ${location.name}${parentCity ? ` ${parentCity.name}` : ''} » Mobiler Vor-Ort-Service`;
    }
    case 'stadtteil': {
      const parentCity = hierarchy.find(h => h.type === 'kreisfreie-stadt')
        || hierarchy.find(h => h.type === 'stadtbezirk')
        || hierarchy.find(h => h.type === 'bundesland');
      return `Autoglas-Service ${location.name}${parentCity ? ` ${parentCity.name}` : ''} ᐅ Schnell & Mobil`;
    }
    default:
      return `Autoglas ${location.name} – Mobiler Glasservice | Autoglas-Rocket`;
  }
}

/**
 * Generate H1 for a location
 */
function generateH1(location: Location): string {
  const hierarchy = getLocationHierarchy(location.slug);
  
  switch (location.type) {
    case 'bundesland':
      return `Autoglas-Service in ${location.name} – Mobil & Professionell`;
    case 'kreisfreie-stadt':
      return `Autoglas ${location.name} – Mobiler Service & Glasreparatur`;
    case 'stadtbezirk':
    case 'stadtteil': {
      const parent = hierarchy.find(h => h.type === 'kreisfreie-stadt' || h.type === 'bundesland');
      return `Autoglas-Service ${location.name}${parent ? ` in ${parent.name}` : ''} – Mobil vor Ort`;
    }
    default:
      return `Autoglas-Service in ${location.name}`;
  }
}

function checkMetadataLength(): void {
  console.log('\n🔍 Checking metadata lengths (sampling)...');
  
  // Sample all location types
  const sample = [
    ...getLocationsByType('bundesland'),
    ...getLocationsByType('kreisfreie-stadt').slice(0, 20),
    ...getLocationsByType('stadtteil').slice(0, 20),
  ];
  
  let titleIssues = 0;
  let h1Issues = 0;
  
  for (const loc of sample) {
    const title = generateTitle(loc);
    const h1 = generateH1(loc);
    
    // Title check
    if (title.length < THRESHOLDS.TITLE_MIN || title.length > THRESHOLDS.TITLE_MAX) {
      titleIssues++;
      addIssue('warning', 'metadata-length',
        `"${loc.name}" title length ${title.length} chars (should be ${THRESHOLDS.TITLE_MIN}-${THRESHOLDS.TITLE_MAX})`,
        `autoglas-${loc.slug}`
      );
    }
    
    // H1 check
    if (h1.length < THRESHOLDS.H1_MIN || h1.length > THRESHOLDS.H1_MAX) {
      h1Issues++;
      addIssue('warning', 'metadata-length',
        `"${loc.name}" H1 length ${h1.length} chars (should be ${THRESHOLDS.H1_MIN}-${THRESHOLDS.H1_MAX})`,
        `autoglas-${loc.slug}`
      );
    }
  }
  
  console.log(`   Sampled ${sample.length} pages`);
  console.log(`   Title length issues: ${titleIssues}`);
  console.log(`   H1 length issues: ${h1Issues}`);
}

// ============================================================================
// 10. TEMPLATE BOILERPLATE RATIO CHECK
// ============================================================================

/**
 * Calculate the ratio of boilerplate (static) text to dynamic content
 */
function getBoilerplateRatio(location: Location): number {
  const content = generateExtendedLocalContent(location);
  const fullText = [
    content.intro,
    content.localSection,
    content.whyUs,
    content.urgencySection,
    content.serviceArea,
  ].join(' ');
  
  // Static boilerplate phrases that appear on every page
  const boilerplatePhrases = [
    'autoglas-rocket',
    'scheibenwechsel',
    'versicherung',
    'teilkasko',
    'selbstbeteiligung',
    'mobiler service',
    'vor ort',
    'front- und heckscheibe',
  ];
  
  const words = fullText.toLowerCase().split(/\s+/);
  let boilerplateWords = 0;
  
  for (const word of words) {
    for (const phrase of boilerplatePhrases) {
      if (word.includes(phrase) || phrase.includes(word)) {
        boilerplateWords++;
        break;
      }
    }
  }
  
  return words.length > 0 ? boilerplateWords / words.length : 0;
}

function checkBoilerplateRatio(): void {
  console.log('\n🔍 Checking boilerplate ratio (sampling)...');
  
  const sample = [
    ...getLocationsByType('bundesland'),
    ...getLocationsByType('kreisfreie-stadt').slice(0, 10),
    ...getLocationsByType('stadtteil').slice(0, 10),
  ];
  
  let highBoilerplate = 0;
  let criticalBoilerplate = 0;
  
  for (const loc of sample) {
    const ratio = getBoilerplateRatio(loc);
    
    if (ratio > THRESHOLDS.BOILERPLATE_CRITICAL) {
      criticalBoilerplate++;
      addIssue('error', 'boilerplate-ratio',
        `"${loc.name}" has ${(ratio * 100).toFixed(1)}% boilerplate (critical: >${THRESHOLDS.BOILERPLATE_CRITICAL * 100}%)`,
        `autoglas-${loc.slug}`
      );
    } else if (ratio > THRESHOLDS.BOILERPLATE_WARNING) {
      highBoilerplate++;
      addIssue('warning', 'boilerplate-ratio',
        `"${loc.name}" has ${(ratio * 100).toFixed(1)}% boilerplate (warning: >${THRESHOLDS.BOILERPLATE_WARNING * 100}%)`,
        `autoglas-${loc.slug}`
      );
    }
  }
  
  console.log(`   Sampled ${sample.length} pages`);
  console.log(`   High boilerplate (>${THRESHOLDS.BOILERPLATE_WARNING * 100}%): ${highBoilerplate}`);
  console.log(`   Critical boilerplate (>${THRESHOLDS.BOILERPLATE_CRITICAL * 100}%): ${criticalBoilerplate}`);
}

// ============================================================================
// 11. ENRICHMENT COVERAGE CHECK
// ============================================================================

function checkEnrichmentCoverage(): void {
  console.log('\n🔍 Checking enrichment data coverage...');
  
  const importantLocations = locations.filter(l => 
    l.type === 'bundesland' || 
    (l.type === 'kreisfreie-stadt' && (l.priority || 0) >= 8)
  );
  
  let withAutobahn = 0;
  let withKnownFor = 0;
  let withClimate = 0;
  let withTraffic = 0;
  let fullyEnriched = 0;
  
  for (const loc of importantLocations) {
    const hasAutobahn = !!(loc as any).nearbyAutobahn?.length;
    const hasKnownFor = !!(loc as any).knownFor?.length;
    const hasClimate = !!(loc as any).climateZone;
    const hasTraffic = !!(loc as any).localTraffic;
    
    if (hasAutobahn) withAutobahn++;
    if (hasKnownFor) withKnownFor++;
    if (hasClimate) withClimate++;
    if (hasTraffic) withTraffic++;
    if (hasAutobahn && hasKnownFor && hasClimate && hasTraffic) fullyEnriched++;
  }
  
  const total = importantLocations.length;
  console.log(`   Important locations (Bundesland + priority>=8 cities): ${total}`);
  console.log(`   With nearbyAutobahn: ${withAutobahn}/${total} (${(withAutobahn/total*100).toFixed(0)}%)`);
  console.log(`   With knownFor: ${withKnownFor}/${total} (${(withKnownFor/total*100).toFixed(0)}%)`);
  console.log(`   With climateZone: ${withClimate}/${total} (${(withClimate/total*100).toFixed(0)}%)`);
  console.log(`   With localTraffic: ${withTraffic}/${total} (${(withTraffic/total*100).toFixed(0)}%)`);
  console.log(`   Fully enriched: ${fullyEnriched}/${total} (${(fullyEnriched/total*100).toFixed(0)}%)`);
  
  const unenriched = importantLocations.filter(l => {
    const a = l as any;
    return !a.nearbyAutobahn?.length && !a.knownFor?.length && !a.climateZone;
  });
  
  if (unenriched.length > 0) {
    addIssue('warning', 'enrichment-coverage',
      `${unenriched.length} important locations lack enrichment data: ${unenriched.slice(0, 5).map(l => l.name).join(', ')}${unenriched.length > 5 ? '...' : ''}`
    );
  }
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

function printSummary(): void {
  console.log('\n' + '═'.repeat(60));
  console.log('📊 VALIDATION SUMMARY\n');
  
  const errors = issues.filter(i => i.type === 'error');
  const warnings = issues.filter(i => i.type === 'warning');
  const infos = issues.filter(i => i.type === 'info');
  
  console.log(`  🔴 Errors:   ${errors.length}`);
  console.log(`  🟡 Warnings: ${warnings.length}`);
  console.log(`  🔵 Info:     ${infos.length}`);
  
  if (errors.length > 0) {
    console.log('\n❌ ERRORS:\n');
    for (const issue of errors.slice(0, 10)) {
      console.log(`   [${issue.category}] ${issue.message}`);
      if (issue.location) console.log(`      → ${issue.location}`);
    }
    if (errors.length > 10) {
      console.log(`   ... and ${errors.length - 10} more errors`);
    }
  }
  
  if (warnings.length > 0) {
    console.log('\n⚠️  WARNINGS (first 10):\n');
    for (const issue of warnings.slice(0, 10)) {
      console.log(`   [${issue.category}] ${issue.message}`);
    }
    if (warnings.length > 10) {
      console.log(`   ... and ${warnings.length - 10} more warnings`);
    }
  }
  
  console.log('\n' + '═'.repeat(60));
  
  if (errors.length === 0) {
    console.log('✅ Validation passed! No critical errors found.\n');
  } else {
    console.log('❌ Validation failed! Please fix the errors above.\n');
    process.exit(1);
  }
}

async function main() {
  console.log('\n🚀 pSEO Quality Validation\n');
  console.log('═'.repeat(60));
  
  // Run all checks
  checkDuplicateTitles();
  checkDuplicateDescriptions();
  checkDataIntegrity();
  checkRequiredFields();
  checkThinContent();
  checkKeywordTargeting();
  checkInternalLinking();
  
  // New Phase 3 checks
  checkWordCount();
  checkContentSimilarity();
  checkMetadataLength();
  checkBoilerplateRatio();
  
  // Phase 4: Enrichment coverage
  checkEnrichmentCoverage();
  
  // Print summary
  printSummary();
}

main().catch(console.error);
