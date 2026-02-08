/**
 * Content Generator mit Synonym-Pools
 * Verhindert Duplicate Content durch variable Textgenerierung
 * Erweitert für lokalen SEO-Content
 */

import { Location, getLocationHierarchy, getLocationBySlug } from '@/data/locations';
import { generateModularContent } from './content-modules';

// Synonym-Pools für verschiedene Textbausteine
export const synonymPools = {
  // Begrüßungen/Intros
  greetings: [
    "Willkommen bei Autoglas-Rocket",
    "Herzlich willkommen bei Autoglas-Rocket",
    "Schön, dass Sie zu uns gefunden haben",
    "Ihr Partner für Scheibenwechsel"
  ],

  // Professionell
  professional: [
    "professionell",
    "fachmännisch",
    "kompetent",
    "sachkundig",
    "fachgerecht",
    "qualifiziert"
  ],

  // Schnell
  fast: [
    "schnell",
    "zügig",
    "zeitnah",
    "prompt",
    "rasch",
    "umgehend"
  ],

  // Service-Beschreibungen
  serviceDescriptions: [
    "Wir bieten Ihnen erstklassigen Scheibenwechsel-Service",
    "Unser Team steht Ihnen für den Scheibenwechsel zur Verfügung",
    "Profitieren Sie von unserem professionellen Scheibenwechsel",
    "Verlassen Sie sich auf unseren zuverlässigen Scheibenwechsel-Service"
  ],

  // Mobiler Service
  mobileService: [
    "Wir kommen direkt zu Ihnen – ob nach Hause oder an den Arbeitsplatz",
    "Unser mobiler Service kommt zu Ihrem Wunschort",
    "Wir wechseln Ihre Scheibe dort, wo es Ihnen am besten passt",
    "Flexibel und mobil – wir kommen zu Ihnen",
    "Kein Werkstattbesuch nötig – wir arbeiten vor Ort"
  ],

  // Versicherung
  insurance: [
    "Die Kosten für den Scheibenwechsel werden in der Regel von Ihrer Teilkaskoversicherung übernommen",
    "Mit Teilkasko ist der Scheibenwechsel bis auf die Selbstbeteiligung abgedeckt",
    "Ihre Versicherung übernimmt üblicherweise die Kosten für den Scheibenwechsel",
    "Bei Teilkasko-Versicherung zahlen Sie nur Ihre vereinbarte Selbstbeteiligung"
  ],

  // Selbstbeteiligung
  deductible: [
    "Sie zahlen nur Ihre vereinbarte Selbstbeteiligung",
    "Lediglich die vertraglich festgelegte Selbstbeteiligung fällt an",
    "Die Selbstbeteiligung richtet sich nach Ihrem Versicherungsvertrag",
    "Nur die SB laut Vertrag wird fällig"
  ],

  // Scheibenwechsel spezifisch
  replacement: [
    "Ein professioneller Scheibenwechsel ist bei uns in besten Händen",
    "Wir tauschen Ihre Scheibe schnell und fachgerecht aus",
    "Der Scheibenwechsel wird von unseren Experten durchgeführt",
    "Vertrauen Sie auf unseren professionellen Scheibenwechsel-Service"
  ],

  // Qualität
  quality: [
    "Wir verwenden ausschließlich hochwertige Originalscheiben",
    "Nur Qualitätsprodukte kommen bei uns zum Einsatz",
    "Höchste Qualitätsstandards sind für uns selbstverständlich",
    "Wir setzen auf erstklassige Materialien und Verarbeitung"
  ],

  // Erfahrung
  experience: [
    "Profitieren Sie von unserer langjährigen Erfahrung",
    "Unsere Fachleute verfügen über umfassende Expertise",
    "Jahre der Erfahrung machen uns zu Ihrem idealen Partner",
    "Vertrauen Sie auf unser Know-how und unsere Kompetenz"
  ],

  // Terminvereinbarung
  appointment: [
    "Vereinbaren Sie jetzt Ihren Wunschtermin",
    "Buchen Sie noch heute einen Termin",
    "Kontaktieren Sie uns für eine Terminvereinbarung",
    "Sichern Sie sich Ihren Termin – wir sind für Sie da"
  ],

  // CTA-Texte
  ctaTexts: [
    "Jetzt Termin anfragen",
    "Kostenloses Angebot anfordern",
    "Jetzt unverbindlich anfragen",
    "Termin vereinbaren"
  ],

  // Regionale Formulierungen
  regional: [
    "in {city} und Umgebung",
    "im Raum {city}",
    "in {city} und der Region",
    "für {city} und umliegende Orte"
  ],

  // Mobiler Service Vorteile (NICHT ortsansässig – wir sind ein mobiles Team)
  localBenefits: [
    "Unser mobiles Team kommt direkt zu Ihnen nach {city} – einfach und bequem",
    "Unsere Techniker fahren regelmäßig nach {city} und erledigen den Scheibenwechsel direkt bei Ihnen vor Ort",
    "Für Ihren Scheibenwechsel in {city} kommen wir zu Ihrem Wunschort – ob nach Hause, zur Arbeit oder an einen anderen Ort",
    "Unser mobiler Service deckt {city} und die gesamte Region ab – kein Werkstattbesuch nötig"
  ],

  // Glasschaden-Risiko Formulierungen
  glassRiskReasons: [
    "Beschädigte Scheiben können die Sicherheit Ihres Fahrzeugs beeinträchtigen",
    "Eine defekte Windschutzscheibe kann bei der Hauptuntersuchung zum Problem werden",
    "Risse in der Scheibe können sich bei Temperaturschwankungen schnell ausbreiten",
    "Eine beschädigte Scheibe sollte zeitnah gewechselt werden"
  ],

  // Warum schnell handeln
  urgencyReasons: [
    "Ein Riss kann sich durch Temperaturschwankungen schnell ausbreiten",
    "Je früher Sie handeln, desto besser für Ihre Sicherheit",
    "Warten Sie nicht zu lange mit dem Scheibenwechsel",
    "Handeln Sie jetzt für klare Sicht und maximale Sicherheit"
  ],

  // Service-Versprechen
  servicePromises: [
    "Wir garantieren höchste Qualität bei allen Arbeiten",
    "Ihre Zufriedenheit steht bei uns an erster Stelle",
    "Profitieren Sie von unserem Rundum-Sorglos-Service",
    "Wir kümmern uns um alles – von der Terminvereinbarung bis zur Versicherungsabrechnung"
  ],

  // PLZ-bezogene Texte
  plzServiceArea: [
    "Unser Scheibenwechsel-Service ist in allen Postleitzahlen-Bereichen von {city} verfügbar",
    "Wir betreuen alle PLZ-Gebiete in {city} und Umgebung",
    "Egal in welchem Stadtteil Sie wohnen – wir kommen für den Scheibenwechsel zu Ihnen"
  ],

  // Fahrzeug-Beschreibungen
  vehicleIntro: [
    "Speziell für Ihren {brand} {model} bieten wir",
    "Für den {brand} {model} haben wir die passende Lösung",
    "Ihr {brand} {model} ist bei uns bestens aufgehoben",
    "Wir kennen uns mit dem {brand} {model} bestens aus"
  ],

  // Ablauf-Schritte
  processStep1: [
    "Sie kontaktieren uns telefonisch oder über unser Formular",
    "Nehmen Sie Kontakt zu uns auf – per Telefon oder online",
    "Melden Sie sich bei uns – wir sind für Sie erreichbar"
  ],
  processStep2: [
    "Wir rufen Sie zeitnah zurück und besprechen die Details",
    "Ein Rückruf unseres Teams erfolgt schnellstmöglich",
    "Wir melden uns umgehend bei Ihnen zurück"
  ],
  processStep3: [
    "Gemeinsam finden wir einen passenden Termin",
    "Wir vereinbaren einen Termin nach Ihren Wünschen",
    "Der Termin wird nach Ihren Vorstellungen festgelegt"
  ],
  processStep4: [
    "Unsere Fachleute führen den Scheibenwechsel vor Ort durch",
    "Der Austausch Ihrer Scheibe erfolgt bei Ihnen",
    "Wir erledigen den Scheibenwechsel direkt an Ihrem Standort"
  ],
  processStep5: [
    "Die Abrechnung erfolgt direkt mit Ihrer Versicherung",
    "Wir rechnen für Sie mit der Versicherung ab",
    "Die Kostenübernahme klären wir mit Ihrem Versicherer"
  ]
};

// Seed-basierter Zufallsgenerator für konsistente Ergebnisse
function seededRandom(seed: string): () => number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  
  return function() {
    hash = Math.sin(hash) * 10000;
    return hash - Math.floor(hash);
  };
}

// Wählt ein Element aus einem Pool basierend auf einem Seed
export function pickFromPool(pool: string[], seed: string): string {
  const random = seededRandom(seed);
  const index = Math.floor(random() * pool.length);
  return pool[index];
}

// Ersetzt Platzhalter in einem Text
export function replacePlaceholders(
  text: string,
  replacements: Record<string, string>
): string {
  let result = text;
  for (const [key, value] of Object.entries(replacements)) {
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
  }
  return result;
}

// Generiert einen variablen Intro-Text für eine Stadtseite
export function generateCityIntro(cityName: string, citySlug: string): string {
  const seed = `city-intro-${citySlug}`;
  const greeting = pickFromPool(synonymPools.greetings, seed + '-greeting');
  const serviceDesc = pickFromPool(synonymPools.serviceDescriptions, seed + '-service');
  const mobileDesc = pickFromPool(synonymPools.mobileService, seed + '-mobile');
  const regional = pickFromPool(synonymPools.regional, seed + '-regional');
  
  return `${greeting} ${regional.replace('{city}', cityName)}! ${serviceDesc}. ${mobileDesc}`;
}

/**
 * Generiert erweiterten lokalen Content für SEO (400+ Wörter)
 * 
 * Uses the modular content system (content-modules.ts) for locations with 
 * enrichment data, falling back to synonym pools for non-enriched locations.
 * 
 * Optimiert für LLM-Extraktion: Jeder Abschnitt zielt auf 134-167 Wörter
 * (Answer Capsule Pattern aus GEO-Forschung)
 */
export function generateExtendedLocalContent(location: Location): {
  intro: string;
  localSection: string;
  whyUs: string;
  urgencySection: string;
  serviceArea: string;
} {
  // Use the modular content system - it includes fallbacks for all sections
  return generateModularContent(location);
}

/**
 * Generiert einen kompakten "Über den Standort" Text
 * Uses enrichment data (knownFor, nearbyAutobahn, population) when available.
 */
export function generateAboutLocation(location: Location): string {
  const hierarchy = getLocationHierarchy(location.slug);
  
  // Enrichment-based content fragments
  const landmarkText = location.knownFor?.length
    ? ` Ob in der Nähe von ${location.knownFor.slice(0, 2).join(' oder ')} – unser mobiles Team kommt zu Ihrem Wunschort.`
    : '';
  
  const autobahnText = location.nearbyAutobahn?.length
    ? ` Die Autobahnen ${location.nearbyAutobahn.slice(0, 3).join(', ')} sorgen für hohes Verkehrsaufkommen und entsprechend häufige Steinschlagschäden in der Region.`
    : '';
  
  switch (location.type) {
    case 'bundesland': {
      const popText = location.population && location.population > 5_000_000
        ? `Als eines der bevölkerungsreichsten Bundesländer Deutschlands`
        : `Als Bundesland`;
      return `${popText} ist ${location.name} ein wichtiges Einsatzgebiet für unseren mobilen Scheibenwechsel-Service.${autobahnText} Unser Team fährt in alle Regionen und Städte von ${location.name} – direkt zu Ihnen.`;
    }
    
    case 'kreisfreie-stadt': {
      const bundesland = hierarchy.find(h => h.type === 'bundesland');
      const popText = location.population
        ? ` mit rund ${Math.round(location.population / 1000)}.000 Einwohnern`
        : '';
      return `${location.name}${bundesland ? ` in ${bundesland.name}` : ''}${popText} gehört zu den Städten, in denen unser mobiles Team regelmäßig Scheibenwechsel durchführt.${autobahnText}${landmarkText} Egal ob Innenstadt oder Außenbezirk – wir kommen direkt zu Ihnen.`;
    }
    
    case 'stadtbezirk':
    case 'stadtteil': {
      const parentCity = hierarchy.find(h => h.type === 'kreisfreie-stadt' || h.type === 'bundesland');
      const plzText = location.plz?.length ? ` (PLZ ${location.plz.slice(0, 2).join(', ')})` : '';
      return `${location.name}${plzText} ist ${location.type === 'stadtteil' ? 'ein Stadtteil' : 'ein Bezirk'} von ${parentCity?.name || 'der Stadt'}. Unser mobiles Team kommt direkt zu Ihnen nach ${location.name} – einfach und bequem, ohne Werkstattbesuch.`;
    }
    
    default:
      return `${location.name} gehört zu unserem Einsatzgebiet. Unser mobiles Team kommt direkt zu Ihnen – für den Scheibenwechsel von Front- und Heckscheibe.`;
  }
}

// Generiert Versicherungstext
export function generateInsuranceText(seed: string): string {
  const insuranceText = pickFromPool(synonymPools.insurance, seed + '-insurance');
  const deductibleText = pickFromPool(synonymPools.deductible, seed + '-deductible');
  
  return `${insuranceText}. ${deductibleText}.`;
}

// Generiert Ablauf-Beschreibung
export function generateProcessSteps(seed: string): string[] {
  return [
    pickFromPool(synonymPools.processStep1, seed + '-step1'),
    pickFromPool(synonymPools.processStep2, seed + '-step2'),
    pickFromPool(synonymPools.processStep3, seed + '-step3'),
    pickFromPool(synonymPools.processStep4, seed + '-step4'),
    pickFromPool(synonymPools.processStep5, seed + '-step5')
  ];
}

// Generiert einen CTA-Text
export function generateCtaText(seed: string): string {
  return pickFromPool(synonymPools.ctaTexts, seed + '-cta');
}

// Generiert Fahrzeug-spezifischen Intro
export function generateVehicleIntro(brandName: string, modelName: string, seed: string): string {
  const intro = pickFromPool(synonymPools.vehicleIntro, seed + '-vehicle-intro');
  return replacePlaceholders(intro, { brand: brandName, model: modelName });
}

// Generiert einzigartige Meta-Description
export function generateMetaDescription(
  type: 'city' | 'service-city' | 'vehicle',
  params: { city?: string; service?: string; brand?: string; model?: string },
  seed: string
): string {
  const fast = pickFromPool(synonymPools.fast, seed + '-meta-fast');
  const professional = pickFromPool(synonymPools.professional, seed + '-meta-pro');
  
  switch (type) {
    case 'city':
      return `${professional}er Scheibenwechsel in ${params.city}. Front- & Heckscheibe wechseln. Mobiler Service ✓ ${fast} ✓ Versicherung ✓ Jetzt anfragen!`;
    case 'service-city':
      return `${params.service} in ${params.city}. ${professional} & ${fast}. Mobiler Service vor Ort ✓ Direkte Versicherungsabrechnung ✓ Jetzt Termin buchen!`;
    case 'vehicle':
      return `Scheibenwechsel für ${params.brand} ${params.model}. ${professional}e Arbeit mit Originalscheiben. Mobiler Service ✓ ${fast} ✓ Versicherung ✓`;
    default:
      return '';
  }
}

// FAQ-Varianten für verschiedene Seitentypen (erweitert auf 6-8 FAQs)
export function generateFaqs(
  type: 'city' | 'service' | 'vehicle',
  params: { city?: string; service?: string; brand?: string; model?: string },
  seed: string
): { question: string; answer: string }[] {
  const baseFaqs = [
    {
      question: "Wie läuft der mobile Service ab?",
      answer: pickFromPool(synonymPools.mobileService, seed + '-faq1')
    },
    {
      question: "Übernimmt die Versicherung die Kosten?",
      answer: pickFromPool(synonymPools.insurance, seed + '-faq2') + " " + pickFromPool(synonymPools.deductible, seed + '-faq2b')
    },
    {
      question: "Wie lange dauert der Scheibenwechsel?",
      answer: "Ein Scheibenwechsel dauert in der Regel 1-2 Stunden. Danach muss der Kleber noch etwa 1 Stunde aushärten."
    },
    {
      question: "Welche Scheiben verwenden Sie?",
      answer: pickFromPool(synonymPools.quality, seed + '-faq-quality') + " Wir arbeiten ausschließlich mit zertifizierten Originalscheiben oder OEM-Äquivalenten."
    },
    {
      question: "Kann ich nach dem Scheibenwechsel sofort weiterfahren?",
      answer: "Nach dem Scheibenwechsel sollte der Kleber ca. 1 Stunde aushärten – dann sind Sie wieder mobil. Bei modernen Schnellklebern kann die Wartezeit auch kürzer sein."
    }
  ];

  if (type === 'city' && params.city) {
    baseFaqs.push({
      question: `Kommen Sie auch direkt nach ${params.city}?`,
      answer: `Ja, unser mobiler Service ist ${pickFromPool(synonymPools.regional, seed + '-faq-city').replace('{city}', params.city)} verfügbar. Wir kommen zu Ihnen – ob nach Hause, zur Arbeit oder an einen anderen Ort Ihrer Wahl.`
    });
    
    baseFaqs.push({
      question: `Wie schnell können Sie in ${params.city} vor Ort sein?`,
      answer: `In der Regel können wir innerhalb von 24-48 Stunden einen Termin in ${params.city} anbieten. Bei dringenden Fällen versuchen wir, noch am selben Tag zu kommen.`
    });
    
    baseFaqs.push({
      question: `Was kostet ein Scheibenwechsel in ${params.city}?`,
      answer: `Mit einer Teilkaskoversicherung* zahlen Sie nur Ihre vereinbarte Selbstbeteiligung. Ohne Versicherung variieren die Kosten je nach Fahrzeugtyp – wir erstellen Ihnen gerne ein individuelles Angebot.`
    });
    
    baseFaqs.push({
      question: "Wechseln Sie auch Heckscheiben?",
      answer: `Ja, wir wechseln sowohl Front- als auch Heckscheiben in ${params.city}. Der Ablauf ist bei beiden Scheibentypen ähnlich professionell.`
    });
  }

  if (type === 'vehicle' && params.brand && params.model) {
    baseFaqs.push({
      question: `Haben Sie Erfahrung mit ${params.brand} ${params.model}?`,
      answer: `${pickFromPool(synonymPools.experience, seed + '-faq-vehicle')} Wir arbeiten regelmäßig an Fahrzeugen von ${params.brand} und kennen die Besonderheiten des ${params.model}.`
    });
    
    baseFaqs.push({
      question: `Gibt es Originalscheiben für den ${params.brand} ${params.model}?`,
      answer: `Ja, wir haben Zugang zu Originalscheiben für alle gängigen ${params.brand}-Modelle, einschließlich des ${params.model}. Alternativ bieten wir hochwertige OEM-Scheiben an.`
    });
    
    baseFaqs.push({
      question: `Wie teuer ist ein Scheibenwechsel beim ${params.brand} ${params.model}?`,
      answer: `Die Kosten variieren je nach Ausstattung (z.B. Regen-/Lichtsensor, beheizte Scheibe). Mit Teilkasko* zahlen Sie je nach Tarif nur die Selbstbeteiligung. Gerne erstellen wir Ihnen ein individuelles Angebot.`
    });
  }

  return baseFaqs;
}

/**
 * Generiert lokale FAQ-Erweiterungen basierend auf dem Standorttyp
 */
export function generateLocalFaqs(
  location: Location,
  seed: string
): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = [];
  const hierarchy = getLocationHierarchy(location.slug);
  const bundesland = hierarchy.find(h => h.type === 'bundesland');
  
  // Grundlegende lokale FAQs
  faqs.push({
    question: `In welchen Gebieten von ${location.name} sind Sie tätig?`,
    answer: location.type === 'bundesland' 
      ? `Wir sind in ganz ${location.name} aktiv – von den großen Städten bis zu den ländlichen Regionen.`
      : `Unser Service deckt ganz ${location.name} ab. ${location.plz?.length ? `Dazu gehören die PLZ-Bereiche ${location.plz.slice(0, 3).join(', ')} und weitere.` : ''}`
  });
  
  if (bundesland && location.type !== 'bundesland') {
    faqs.push({
      question: `Welche Versicherungen arbeiten in ${bundesland.name} mit Ihnen zusammen?`,
      answer: `Wir arbeiten mit allen großen Versicherungen in ${bundesland.name} zusammen: Allianz, HUK-Coburg, DEVK, AXA, R+V und viele weitere. Die Abrechnung übernehmen wir für Sie.`
    });
  }
  
  // Standortspezifische FAQs
  if (location.type === 'kreisfreie-stadt' || location.type === 'bundesland') {
    faqs.push({
      question: "Bieten Sie auch Flottenlösungen für Unternehmen an?",
      answer: `Ja, wir betreuen zahlreiche Firmenkunden in ${location.name}. Für Flotten ab 5 Fahrzeugen bieten wir attraktive Konditionen und einen persönlichen Ansprechpartner.`
    });
  }
  
  if (location.type === 'stadtteil' || location.type === 'stadtbezirk') {
    const parentCity = hierarchy.find(h => h.type === 'kreisfreie-stadt');
    if (parentCity) {
      faqs.push({
        question: `Wie funktioniert der mobile Service in ${location.name}?`,
        answer: `Unser mobiles Team kommt direkt zu Ihnen nach ${location.name} – ob nach Hause, zur Arbeit oder an einen anderen Ort in ${parentCity.name}. Sie sparen sich den Weg in eine Werkstatt und wir erledigen den Scheibenwechsel bequem vor Ort.`
      });
    }
  }
  
  // === ENRICHMENT-BASED FAQs ===
  
  // Autobahn FAQ
  if (location.nearbyAutobahn && location.nearbyAutobahn.length > 0) {
    const autobahnList = location.nearbyAutobahn.slice(0, 3).join(', ');
    faqs.push({
      question: `Wie häufig kommt Steinschlag auf der ${location.nearbyAutobahn[0]} vor?`,
      answer: `Die ${autobahnList} gehören zu den stark befahrenen Strecken in der Region ${location.name}. Steinschlag durch aufgewirbelten Split ist hier besonders häufig – vor allem in den Wintermonaten, wenn Streugut auf den Fahrbahnen liegt. Bei einem Steinschlag sollten Sie schnell handeln, bevor sich der Schaden vergrößert.`
    });
  }
  
  // University city FAQ
  if (location.universityCity) {
    faqs.push({
      question: `Gibt es spezielle Angebote für Studierende in ${location.name}?`,
      answer: `Als Universitätsstadt hat ${location.name} viele junge Autofahrer. Unser Service ist für alle gleich fair: Mit Teilkaskoversicherung zahlen Sie nur die Selbstbeteiligung. Ohne Versicherung erstellen wir Ihnen gerne ein individuelles Angebot. Der mobile Service spart Ihnen in jedem Fall den Weg zur Werkstatt.`
    });
  }
  
  // High traffic FAQ
  if (location.localTraffic === 'hoch') {
    faqs.push({
      question: `Wie schnell bekommen Sie in ${location.name} einen Termin?`,
      answer: `Trotz des hohen Verkehrsaufkommens in ${location.name} können wir in der Regel innerhalb von 24-48 Stunden einen Termin anbieten. Der Vorteil unseres mobilen Service: Sie müssen sich nicht durch den Verkehr zu einer Werkstatt kämpfen – wir kommen direkt zu Ihnen.`
    });
  }
  
  // Industrial hub FAQ
  if (location.industrialHub) {
    faqs.push({
      question: `Bieten Sie Fuhrpark-Service für Unternehmen in ${location.name} an?`,
      answer: `Ja, als Wirtschaftsstandort hat ${location.name} viele Firmenkunden mit Fuhrparks. Wir bieten Flottenlösungen ab 5 Fahrzeugen mit attraktiven Konditionen, festem Ansprechpartner und flexibler Terminplanung – direkt auf Ihrem Firmenparkplatz.`
    });
  }
  
  return faqs;
}
