/**
 * Content Module System for pSEO
 * 
 * Replaces synonym-spinning with data-driven, structurally diverse content.
 * Modules activate based on location attributes and produce unique paragraphs.
 * 
 * CRITICAL RULE: Autoglas-Rocket is a MOBILE service team.
 * NEVER imply local presence, fixed offices, or being "based in" a city.
 * All content must frame: mobile team comes to you, convenient, no workshop visit.
 */

import { Location, getLocationHierarchy } from '../data/locations';
import { pickFromPool, synonymPools, replacePlaceholders } from './content-generator';

// ============================================================================
// TYPES
// ============================================================================

export type ContentSection = 'intro' | 'local' | 'urgency' | 'serviceArea' | 'whyUs';

export interface ContentModule {
  id: string;
  section: ContentSection;
  priority: number; // higher = preferred when multiple modules match
  condition: (location: Location) => boolean;
  generate: (location: Location, seed: string) => string;
}

// ============================================================================
// POPULATION STATISTICS HELPER
// ============================================================================

export interface PopulationContext {
  estimatedCars: number;
  estimatedDamagesPerYear: number;
  trafficDensityLabel: string;
  carsFormatted: string;
  damagesFormatted: string;
}

/**
 * Derives factual statistics from population data.
 * Based on German averages:
 * - ~570 PKW per 1000 inhabitants (KBA Statistik)
 * - ~1% annual glass damage rate per vehicle
 */
export function getPopulationContext(population: number): PopulationContext {
  const estimatedCars = Math.round(population * 0.57);
  const estimatedDamages = Math.round(estimatedCars * 0.01);
  
  let trafficDensityLabel: string;
  if (population > 1_000_000) trafficDensityLabel = 'sehr hohes Verkehrsaufkommen';
  else if (population > 500_000) trafficDensityLabel = 'hohes Verkehrsaufkommen';
  else if (population > 200_000) trafficDensityLabel = 'erhöhtes Verkehrsaufkommen';
  else if (population > 100_000) trafficDensityLabel = 'moderates Verkehrsaufkommen';
  else trafficDensityLabel = 'regionales Verkehrsaufkommen';

  const carsFormatted = estimatedCars > 100_000
    ? `rund ${Math.round(estimatedCars / 1000)}. 000`
    : `ca. ${Math.round(estimatedCars / 1000)}.000`;
  
  const damagesFormatted = estimatedDamages > 1000
    ? `etwa ${Math.round(estimatedDamages / 1000)}.000`
    : `rund ${estimatedDamages}`;

  return {
    estimatedCars,
    estimatedDamagesPerYear: estimatedDamages,
    trafficDensityLabel,
    carsFormatted,
    damagesFormatted,
  };
}

// ============================================================================
// CONTENT MODULES
// ============================================================================

export const contentModules: ContentModule[] = [
  // =========================================
  // INTRO MODULES
  // =========================================
  
  // Metropole (> 1M)
  {
    id: 'metropole-intro',
    section: 'intro',
    priority: 10,
    condition: (loc) => (loc.population || 0) > 1_000_000 && loc.type === 'kreisfreie-stadt',
    generate: (loc, seed) => {
      const pop = getPopulationContext(loc.population!);
      return `${loc.name} gehört mit über ${(loc.population! / 1_000_000).toFixed(1)} Millionen Einwohnern zu den größten Städten Deutschlands. ` +
        `Mit ${pop.carsFormatted} zugelassenen Fahrzeugen und ${pop.trafficDensityLabel} kommt es hier statistisch zu ${pop.damagesFormatted} Glasschäden pro Jahr. ` +
        `Unser mobiles Team ist regelmäßig in ${loc.name} unterwegs und erledigt Ihren Scheibenwechsel bequem bei Ihnen vor Ort – ob zu Hause, am Arbeitsplatz oder an einem anderen Ort Ihrer Wahl. ` +
        `Wir verwenden ausschließlich hochwertige Originalscheiben oder geprüfte OEM-Äquivalente und übernehmen die komplette Versicherungsabwicklung. ` +
        `Vereinbaren Sie jetzt einen Termin – wir sind meist innerhalb von 24 bis 48 Stunden bei Ihnen.`;
    },
  },

  // Großstadt (500k-1M)
  {
    id: 'grossstadt-intro',
    section: 'intro',
    priority: 9,
    condition: (loc) => (loc.population || 0) > 500_000 && (loc.population || 0) <= 1_000_000,
    generate: (loc, seed) => {
      const pop = getPopulationContext(loc.population!);
      return `In ${loc.name} mit rund ${Math.round(loc.population! / 1000)}.000 Einwohnern und ${pop.carsFormatted} zugelassenen PKW sind Glasschäden an Fahrzeugen keine Seltenheit. ` +
        `Ob Steinschlag auf der Autobahn oder ein Riss durch Temperaturschwankungen – unser mobiles Team kommt direkt zu Ihnen nach ${loc.name} und erledigt den Scheibenwechsel vor Ort. ` +
        `Kein Werkstattbesuch, keine Wartezeit im Autohaus. Wir bringen alles mit, was für den professionellen Scheibenwechsel benötigt wird. ` +
        `Unsere zertifizierten Techniker arbeiten mit Originalscheiben und übernehmen die gesamte Versicherungsabwicklung für Sie.`;
    },
  },

  // Mittelstadt (100k-500k)
  {
    id: 'mittelstadt-intro',
    section: 'intro',
    priority: 8,
    condition: (loc) => (loc.population || 0) >= 100_000 && (loc.population || 0) <= 500_000,
    generate: (loc, seed) => {
      return `Für Ihren Scheibenwechsel in ${loc.name} kommen wir direkt zu Ihnen – einfach und bequem. ` +
        `Unser mobiles Team erledigt den Austausch von Front- und Heckscheiben professionell bei Ihnen vor Ort. ` +
        `Sie müssen Ihr Fahrzeug nicht in eine Werkstatt bringen und sparen wertvolle Zeit. ` +
        `Wir verwenden ausschließlich hochwertige Scheiben in Erstausrüster-Qualität und kümmern uns um die komplette Abwicklung mit Ihrer Versicherung. ` +
        `Bei Teilkasko zahlen Sie nur Ihre vereinbarte Selbstbeteiligung – wir erledigen den Rest.`;
    },
  },

  // Bundesland intro
  {
    id: 'bundesland-intro',
    section: 'intro',
    priority: 10,
    condition: (loc) => loc.type === 'bundesland',
    generate: (loc, seed) => {
      const pop = loc.population ? getPopulationContext(loc.population) : null;
      const popText = pop ? `Mit ${pop.carsFormatted} zugelassenen Fahrzeugen gibt es in ${loc.name} jährlich ${pop.damagesFormatted} Glasschäden. ` : '';
      return `Unser mobiler Scheibenwechsel-Service ist in ganz ${loc.name} für Sie verfügbar. ` +
        `${popText}` +
        `Ob Landeshauptstadt oder ländliche Region – unser Team kommt direkt zu Ihnen und erledigt den Scheibenwechsel bequem vor Ort. ` +
        `Front- und Heckscheibe wechseln wir professionell mit Originalscheiben, inklusive Versicherungsabwicklung. ` +
        `Vereinbaren Sie einen Termin und wir sind meist innerhalb von 24 bis 48 Stunden bei Ihnen.`;
    },
  },

  // Stadtteil/Bezirk intro
  {
    id: 'stadtteil-intro',
    section: 'intro',
    priority: 7,
    condition: (loc) => loc.type === 'stadtteil' || loc.type === 'stadtbezirk',
    generate: (loc, seed) => {
      const hierarchy = getLocationHierarchy(loc.slug);
      const parentCity = hierarchy.find(h => h.type === 'kreisfreie-stadt' || h.type === 'bundesland');
      const parentName = parentCity?.name || '';
      const plzText = loc.plz?.length ? ` (PLZ ${loc.plz.slice(0, 3).join(', ')})` : '';
      return `Unser mobiler Scheibenwechsel-Service kommt direkt zu Ihnen nach ${loc.name}${plzText}${parentName ? ` in ${parentName}` : ''}. ` +
        `Ob Steinschlag oder kompletter Scheibenbruch – wir erledigen den Austausch bequem bei Ihnen vor Ort. ` +
        `Kein Werkstattbesuch nötig: Wir bringen alle Materialien mit und tauschen Ihre Front- oder Heckscheibe professionell direkt an Ihrem Wunschort. ` +
        `Die Versicherungsabwicklung übernehmen wir komplett für Sie.`;
    },
  },

  // =========================================
  // LOCAL / REGIONAL MODULES
  // =========================================

  // Autobahn module
  {
    id: 'autobahn-local',
    section: 'local',
    priority: 10,
    condition: (loc) => !!(loc.nearbyAutobahn && loc.nearbyAutobahn.length > 0),
    generate: (loc, seed) => {
      const autobahnen = loc.nearbyAutobahn!.slice(0, 4).join(', ');
      const cityName = loc.name;
      return `${cityName} ist über die Autobahnen ${autobahnen} hervorragend angebunden. ` +
        `Auf diesen stark befahrenen Strecken ist Steinschlag durch aufgewirbelten Split eine der häufigsten Ursachen für Glasschäden. ` +
        `Besonders in den Wintermonaten, wenn Streugut auf den Fahrbahnen liegt, steigt das Risiko deutlich an. ` +
        `Unser mobiles Team ist regelmäßig in ${cityName} unterwegs und kann schnell einen Termin für Ihren Scheibenwechsel einrichten. ` +
        `Warten Sie nicht zu lange – ein kleiner Steinschlag kann sich durch Vibrationen und Temperaturschwankungen schnell zu einem großen Riss ausweiten.`;
    },
  },

  // knownFor orientation module
  {
    id: 'landmarks-local',
    section: 'local',
    priority: 8,
    condition: (loc) => !!(loc.knownFor && loc.knownFor.length >= 2),
    generate: (loc, seed) => {
      const landmarks = loc.knownFor!.slice(0, 3).join(', ');
      return `Egal ob in der Nähe von ${landmarks} oder in den Außenbezirken – ` +
        `unser mobiler Scheibenwechsel-Service kommt zu Ihrem Wunschort in ${loc.name}. ` +
        `Sie nennen uns Ihre Adresse, wir kümmern uns um den Rest. ` +
        `Die Anfahrt zu Ihnen ist für uns selbstverständlich – Sie müssen Ihr beschädigtes Fahrzeug nicht erst in eine Werkstatt fahren.`;
    },
  },

  // High traffic module
  {
    id: 'traffic-local',
    section: 'local',
    priority: 7,
    condition: (loc) => loc.localTraffic === 'hoch',
    generate: (loc, seed) => {
      return `${loc.name} ist bekannt für sein hohes Verkehrsaufkommen. ` +
        `Das bedeutet auch ein erhöhtes Risiko für Steinschläge und andere Glasschäden. ` +
        `Der Vorteil unseres mobilen Service: Sie müssen sich nicht auch noch durch den Verkehr zu einer Werkstatt kämpfen. ` +
        `Wir kommen stattdessen direkt zu Ihnen – ob nach Hause, an den Arbeitsplatz oder auf einen Parkplatz Ihrer Wahl. ` +
        `So sparen Sie Zeit und Nerven.`;
    },
  },

  // Bundesland coverage module
  {
    id: 'bundesland-local',
    section: 'local',
    priority: 9,
    condition: (loc) => loc.type === 'bundesland',
    generate: (loc, seed) => {
      const autobahnText = loc.nearbyAutobahn?.length
        ? `Über die Autobahnen ${loc.nearbyAutobahn.slice(0, 4).join(', ')} sind wir schnell in allen Teilen von ${loc.name} erreichbar. `
        : '';
      return `Unser mobiler Service deckt ganz ${loc.name} ab – von den Großstädten bis in die ländlichen Regionen. ` +
        `${autobahnText}` +
        `Egal wo in ${loc.name} Sie wohnen oder arbeiten – wir fahren zu Ihnen und erledigen den Scheibenwechsel direkt vor Ort. ` +
        `Flexible Terminplanung und schnelle Verfügbarkeit sind dabei unser Markenzeichen.`;
    },
  },

  // Generic fallback local
  {
    id: 'fallback-local',
    section: 'local',
    priority: 1,
    condition: () => true,
    generate: (loc, seed) => {
      const benefit = replacePlaceholders(
        pickFromPool(synonymPools.localBenefits, seed + '-local'),
        { city: loc.name }
      );
      const risk = pickFromPool(synonymPools.glassRiskReasons, seed + '-risk');
      return `${benefit}. ${risk}. ` +
        `Deshalb ist es wichtig, einen zuverlässigen Partner für Scheibenwechsel in ${loc.name} an der Seite zu haben. ` +
        `Unser mobiles Team fährt regelmäßig nach ${loc.name} und in die nähere Umgebung – Sie müssen nicht in eine Werkstatt fahren. ` +
        `Profitieren Sie von kurzen Wartezeiten und flexiblen Terminoptionen, die sich an Ihren Alltag anpassen.`;
    },
  },

  // =========================================
  // URGENCY MODULES
  // =========================================

  // Climate-based urgency: Winter / Nord / Alpin
  {
    id: 'winter-urgency',
    section: 'urgency',
    priority: 9,
    condition: (loc) => loc.climateZone === 'nord' || loc.climateZone === 'alpin',
    generate: (loc, seed) => {
      const isAlpin = loc.climateZone === 'alpin';
      return `${isAlpin ? 'In der Alpenregion' : 'In Norddeutschland'} sind Temperaturschwankungen eine häufige Ursache für Glasschäden. ` +
        `${isAlpin ? 'Extreme Unterschiede zwischen warmen Tagen und frostigen Nächten' : 'Kalte Winter mit Temperaturen unter dem Gefrierpunkt'} setzen der Windschutzscheibe zu. ` +
        `Ein kleiner Steinschlag kann sich durch Frost schnell zu einem langen Riss ausweiten. ` +
        `Warten Sie daher nicht zu lange mit dem Scheibenwechsel – handeln Sie rechtzeitig. ` +
        `Unser mobiles Team wechselt Ihre Scheibe professionell in 1-2 Stunden direkt bei Ihnen vor Ort. ` +
        `Die Versicherungsabwicklung übernehmen wir komplett.`;
    },
  },

  // Climate-based urgency: Süd / Sommer
  {
    id: 'sommer-urgency',
    section: 'urgency',
    priority: 9,
    condition: (loc) => loc.climateZone === 'sued',
    generate: (loc, seed) => {
      return `In Süddeutschland sorgen heiße Sommer für zusätzliche Belastung der Autoscheiben. ` +
        `Starke Sonneneinstrahlung und anschließendes Abkühlen (z.B. durch Klimaanlage oder Gewitterregen) können Risse in der Windschutzscheibe verursachen oder bestehende Steinschläge vergrößern. ` +
        `Ein schneller Scheibenwechsel schützt Sie vor größeren Schäden und vor Problemen bei der Hauptuntersuchung. ` +
        `Unser mobiles Team kommt direkt zu Ihnen nach ${loc.name} – in der Regel innerhalb von 24 bis 48 Stunden.`;
    },
  },

  // Generic urgency fallback
  {
    id: 'fallback-urgency',
    section: 'urgency',
    priority: 1,
    condition: () => true,
    generate: (loc, seed) => {
      const urgency = pickFromPool(synonymPools.urgencyReasons, seed + '-urgency');
      const replacement = pickFromPool(synonymPools.replacement, seed + '-replacement');
      return `${urgency}. ${replacement}. ` +
        `Wir wechseln sowohl Front- als auch Heckscheiben professionell vor Ort – in der Regel innerhalb von ein bis zwei Stunden. ` +
        `Nach dem Einbau muss der spezielle Kleber noch etwa eine Stunde aushärten, dann sind Sie wieder sicher unterwegs. ` +
        `Eine beschädigte Windschutzscheibe kann bei der Hauptuntersuchung zu Problemen führen. ` +
        `Handeln Sie daher zeitnah und nutzen Sie unseren unkomplizierten Terminservice.`;
    },
  },

  // =========================================
  // SERVICE AREA MODULES
  // =========================================

  // PLZ-based service area
  {
    id: 'plz-servicearea',
    section: 'serviceArea',
    priority: 8,
    condition: (loc) => !!(loc.plz && loc.plz.length > 0),
    generate: (loc, seed) => {
      const plzList = loc.plz!.slice(0, 5).join(', ');
      return `Unser mobiler Scheibenwechsel-Service ist in allen Postleitzahlen-Bereichen von ${loc.name} verfügbar – ` +
        `darunter ${plzList}${loc.plz!.length > 5 ? ' und weitere' : ''}. ` +
        `Wir kommen zu Ihrem Wunschort: nach Hause, an den Arbeitsplatz oder an einen anderen vereinbarten Treffpunkt. ` +
        `So sparen Sie Zeit und müssen Ihr beschädigtes Fahrzeug nicht erst in eine Werkstatt bringen. ` +
        `Wir bringen alle notwendigen Materialien und Werkzeuge mit und erledigen den Scheibenwechsel direkt vor Ort. ` +
        `Kontaktieren Sie uns telefonisch oder über unser Online-Formular – wir melden uns schnellstmöglich zurück.`;
    },
  },

  // Bundesland-wide service area
  {
    id: 'bundesland-servicearea',
    section: 'serviceArea',
    priority: 9,
    condition: (loc) => loc.type === 'bundesland',
    generate: (loc, seed) => {
      return `Unser mobiler Scheibenwechsel-Service deckt ganz ${loc.name} ab. ` +
        `Von den Großstädten bis in die ländlichen Regionen – unser Team kommt direkt zu Ihnen. ` +
        `Dabei sind wir flexibel und kommen zu Ihrem Wunschort: ob an die Heimadresse, den Arbeitsplatz oder einen Parkplatz Ihrer Wahl. ` +
        `So müssen Sie Ihr Fahrzeug nicht bewegen und sparen wertvolle Zeit. ` +
        `Kontaktieren Sie uns telefonisch oder über unser Online-Formular und vereinbaren Sie einen passenden Termin.`;
    },
  },

  // Generic fallback service area
  {
    id: 'fallback-servicearea',
    section: 'serviceArea',
    priority: 1,
    condition: () => true,
    generate: (loc, seed) => {
      return `Unser mobiler Scheibenwechsel-Service deckt ganz ${loc.name} und alle umliegenden Gebiete ab. ` +
        `Wir kommen flexibel zu Ihrem Wunschort – ob zu Hause, am Arbeitsplatz oder an einem anderen vereinbarten Treffpunkt. ` +
        `So sparen Sie wertvolle Zeit und müssen Ihr Fahrzeug nicht in eine Werkstatt bringen. ` +
        `Wir bringen alle notwendigen Materialien und das passende Werkzeug mit und erledigen den Scheibenwechsel professionell direkt vor Ort. ` +
        `Kontaktieren Sie uns – unser Team meldet sich schnellstmöglich bei Ihnen zurück.`;
    },
  },

  // =========================================
  // WHY US MODULES
  // =========================================

  // University city module
  {
    id: 'uni-whyus',
    section: 'whyUs',
    priority: 9,
    condition: (loc) => loc.universityCity === true,
    generate: (loc, seed) => {
      return `Ob Studierende mit dem ersten eigenen Auto oder Berufstätige mit Pendlerfahrzeug – ` +
        `in der Universitätsstadt ${loc.name} sind viele Fahrzeuge täglich auf den Straßen unterwegs. ` +
        `Unser mobiler Service ist besonders praktisch: Kein Werkstattbesuch, keine langen Wartezeiten. ` +
        `Wir kommen zu Ihnen und erledigen den Scheibenwechsel, während Sie Ihrem Alltag nachgehen. ` +
        `Unsere Techniker sind zertifiziert und arbeiten mit Originalscheiben. ` +
        `Transparente Preise und die komplette Versicherungsabwicklung gehören bei uns zum Standard.`;
    },
  },

  // Industrial hub module
  {
    id: 'industrial-whyus',
    section: 'whyUs',
    priority: 9,
    condition: (loc) => loc.industrialHub === true,
    generate: (loc, seed) => {
      return `${loc.name} ist ein wichtiger Wirtschaftsstandort mit vielen Gewerbebetrieben und Firmenfuhrparks. ` +
        `Unser mobiler Scheibenwechsel-Service bietet gerade für Firmenkunden erhebliche Vorteile: ` +
        `Ihre Mitarbeiter müssen nicht in eine Werkstatt fahren – wir kommen direkt auf den Firmenparkplatz. ` +
        `Auch für Transporter und Nutzfahrzeuge sind wir ausgestattet. ` +
        `Unsere Techniker arbeiten nach höchsten Standards und übernehmen auch die Kalibrierung von Fahrassistenzsystemen. ` +
        `Die Versicherungsabwicklung erledigen wir komplett – Sie zahlen nur die vereinbarte Selbstbeteiligung.`;
    },
  },

  // Premium / generic why us fallback
  {
    id: 'fallback-whyus',
    section: 'whyUs',
    priority: 1,
    condition: () => true,
    generate: (loc, seed) => {
      const quality = pickFromPool(synonymPools.quality, seed + '-quality');
      const experience = pickFromPool(synonymPools.experience, seed + '-exp');
      const servicePromise = pickFromPool(synonymPools.servicePromises, seed + '-promise');
      return `${quality}. ${experience}. ${servicePromise}. ` +
        `Unsere Techniker sind nach höchsten Standards ausgebildet und verfügen über langjährige Erfahrung mit allen Fahrzeugtypen. ` +
        `Bei jedem Scheibenwechsel führen wir eine gründliche Qualitätskontrolle durch und prüfen die einwandfreie Funktion aller betroffenen Systeme. ` +
        `Falls Ihr Fahrzeug über Assistenzsysteme wie Spurhalteassistent oder Abstandswarner verfügt, übernehmen wir auch die fachgerechte Kalibrierung. ` +
        `Transparente Preise und die komplette Abwicklung mit Ihrer Versicherung gehören bei uns zum Standard.`;
    },
  },
];

// ============================================================================
// MODULE SELECTION ENGINE
// ============================================================================

/**
 * Seed-based deterministic selection from matching modules.
 * Uses the highest-priority matching module. If multiple modules share the
 * same priority, uses a hash to pick deterministically (consistent across builds).
 */
function hashSeed(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash);
}

export function selectAndGenerate(
  modules: ContentModule[],
  location: Location,
  section: ContentSection,
  seed: string
): string {
  // Filter to matching modules for this section
  const matching = modules
    .filter(m => m.section === section && m.condition(location))
    .sort((a, b) => b.priority - a.priority);

  if (matching.length === 0) {
    return ''; // Should not happen with fallback modules
  }

  // Get the highest priority
  const highestPriority = matching[0].priority;
  const topModules = matching.filter(m => m.priority === highestPriority);

  // Deterministic selection among equal-priority modules
  const selectedModule = topModules[hashSeed(seed + section) % topModules.length];
  
  return selectedModule.generate(location, seed);
}

/**
 * Generate all content sections using the module system.
 * This is the main entry point, called by content-generator.ts.
 */
export function generateModularContent(location: Location): {
  intro: string;
  localSection: string;
  whyUs: string;
  urgencySection: string;
  serviceArea: string;
} {
  const seed = `extended-${location.slug}`;
  
  return {
    intro: selectAndGenerate(contentModules, location, 'intro', seed),
    localSection: selectAndGenerate(contentModules, location, 'local', seed),
    whyUs: selectAndGenerate(contentModules, location, 'whyUs', seed),
    urgencySection: selectAndGenerate(contentModules, location, 'urgency', seed),
    serviceArea: selectAndGenerate(contentModules, location, 'serviceArea', seed),
  };
}
