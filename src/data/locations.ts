/**
 * Hierarchische Standort-Datenbank für pSEO
 * 
 * Struktur:
 * Bundesland → (Regierungsbezirk) → Landkreis/Kreisfreie Stadt → Gemeinde → Stadtbezirk → Stadtteil
 */

export type LocationType = 
  | 'bundesland'
  | 'regierungsbezirk'
  | 'landkreis'
  | 'kreisfreie-stadt'
  | 'gemeinde'
  | 'stadtbezirk'
  | 'stadtteil';

export interface Location {
  slug: string;
  name: string;
  type: LocationType;
  parentSlug: string | null;
  plz?: string[];
  coordinates?: { lat: number; lng: number };
  population?: number;
  // SEO-relevante Felder
  priority?: number; // 1-10, höher = wichtiger für SEO
  // Extended pSEO fields (optional - override auto-generated values)
  canonicalPath?: string;      // e.g. "/autoglas-berlin/" - auto-generated if not set
  lastModified?: string;       // ISO date string for accurate dateModified in schema
  wikidataId?: string;         // e.g. "Q64" for Berlin - for Entity-Based Optimization (sameAs links)
  // Metadata overrides (optional - auto-generated if not set)
  title?: string;              // Custom page title (30-70 chars target)
  metaDescription?: string;    // Custom meta description (100-170 chars target)
  h1?: string;                 // Custom H1 heading (10-80 chars target)
}

export const locations: Location[] = [
  // =====================================================
  // BUNDESLÄNDER
  // =====================================================
  {
    slug: "baden-wuerttemberg",
    name: "Baden-Württemberg",
    type: "bundesland",
    parentSlug: null,
    population: 11103043,
    priority: 10,
    wikidataId: "Q985"
  },
  {
    slug: "bayern",
    name: "Bayern",
    type: "bundesland",
    parentSlug: null,
    population: 13140183,
    priority: 10,
    wikidataId: "Q980"
  },
  {
    slug: "berlin",
    name: "Berlin",
    type: "bundesland",
    parentSlug: null,
    population: 3664088,
    coordinates: { lat: 52.5200, lng: 13.4050 },
    priority: 10,
    wikidataId: "Q64"
  },
  {
    slug: "brandenburg",
    name: "Brandenburg",
    type: "bundesland",
    parentSlug: null,
    population: 2531071,
    priority: 8,
    wikidataId: "Q1208"
  },
  {
    slug: "bremen",
    name: "Bremen",
    type: "bundesland",
    parentSlug: null,
    population: 680130,
    priority: 7,
    wikidataId: "Q24879"
  },
  {
    slug: "hamburg",
    name: "Hamburg",
    type: "bundesland",
    parentSlug: null,
    population: 1853935,
    coordinates: { lat: 53.5511, lng: 9.9937 },
    priority: 10,
    wikidataId: "Q1055"
  },
  {
    slug: "hessen",
    name: "Hessen",
    type: "bundesland",
    parentSlug: null,
    population: 6293154,
    priority: 9,
    wikidataId: "Q1199"
  },
  {
    slug: "mecklenburg-vorpommern",
    name: "Mecklenburg-Vorpommern",
    type: "bundesland",
    parentSlug: null,
    population: 1610774,
    priority: 6,
    wikidataId: "Q1196"
  },
  {
    slug: "niedersachsen",
    name: "Niedersachsen",
    type: "bundesland",
    parentSlug: null,
    population: 8003421,
    priority: 9,
    wikidataId: "Q1197"
  },
  {
    slug: "nordrhein-westfalen",
    name: "Nordrhein-Westfalen",
    type: "bundesland",
    parentSlug: null,
    population: 17925570,
    priority: 10,
    wikidataId: "Q1198"
  },
  {
    slug: "rheinland-pfalz",
    name: "Rheinland-Pfalz",
    type: "bundesland",
    parentSlug: null,
    population: 4098391,
    priority: 8,
    wikidataId: "Q1200"
  },
  {
    slug: "saarland",
    name: "Saarland",
    type: "bundesland",
    parentSlug: null,
    population: 983991,
    priority: 6,
    wikidataId: "Q1201"
  },
  {
    slug: "sachsen",
    name: "Sachsen",
    type: "bundesland",
    parentSlug: null,
    population: 4056941,
    priority: 8,
    wikidataId: "Q1202"
  },
  {
    slug: "sachsen-anhalt",
    name: "Sachsen-Anhalt",
    type: "bundesland",
    parentSlug: null,
    population: 2180684,
    priority: 7,
    wikidataId: "Q1206"
  },
  {
    slug: "schleswig-holstein",
    name: "Schleswig-Holstein",
    type: "bundesland",
    parentSlug: null,
    population: 2910875,
    priority: 8,
    wikidataId: "Q1194"
  },
  {
    slug: "thueringen",
    name: "Thüringen",
    type: "bundesland",
    parentSlug: null,
    population: 2120237,
    priority: 7,
    wikidataId: "Q1205"
  },

  // =====================================================
  // BAYERN - Regierungsbezirke
  // =====================================================
  {
    slug: "oberbayern",
    name: "Oberbayern",
    type: "regierungsbezirk",
    parentSlug: "bayern",
    population: 4700000,
    priority: 9
  },
  {
    slug: "niederbayern",
    name: "Niederbayern",
    type: "regierungsbezirk",
    parentSlug: "bayern",
    priority: 7
  },
  {
    slug: "oberpfalz",
    name: "Oberpfalz",
    type: "regierungsbezirk",
    parentSlug: "bayern",
    priority: 7
  },
  {
    slug: "oberfranken",
    name: "Oberfranken",
    type: "regierungsbezirk",
    parentSlug: "bayern",
    priority: 7
  },
  {
    slug: "mittelfranken",
    name: "Mittelfranken",
    type: "regierungsbezirk",
    parentSlug: "bayern",
    priority: 8
  },
  {
    slug: "unterfranken",
    name: "Unterfranken",
    type: "regierungsbezirk",
    parentSlug: "bayern",
    priority: 7
  },
  {
    slug: "schwaben",
    name: "Schwaben",
    type: "regierungsbezirk",
    parentSlug: "bayern",
    priority: 8
  },

  // =====================================================
  // NRW - Regierungsbezirke
  // =====================================================
  {
    slug: "duesseldorf-bezirk",
    name: "Regierungsbezirk Düsseldorf",
    type: "regierungsbezirk",
    parentSlug: "nordrhein-westfalen",
    priority: 9
  },
  {
    slug: "koeln-bezirk",
    name: "Regierungsbezirk Köln",
    type: "regierungsbezirk",
    parentSlug: "nordrhein-westfalen",
    priority: 9
  },
  {
    slug: "muenster-bezirk",
    name: "Regierungsbezirk Münster",
    type: "regierungsbezirk",
    parentSlug: "nordrhein-westfalen",
    priority: 8
  },
  {
    slug: "detmold-bezirk",
    name: "Regierungsbezirk Detmold",
    type: "regierungsbezirk",
    parentSlug: "nordrhein-westfalen",
    priority: 7
  },
  {
    slug: "arnsberg-bezirk",
    name: "Regierungsbezirk Arnsberg",
    type: "regierungsbezirk",
    parentSlug: "nordrhein-westfalen",
    priority: 8
  },

  // =====================================================
  // KREISFREIE STÄDTE - Top 30
  // =====================================================
  
  // Berlin (ist gleichzeitig Bundesland)
  // Wird über das Bundesland abgedeckt
  
  // Hamburg (ist gleichzeitig Bundesland)
  // Wird über das Bundesland abgedeckt
  
  // München
  {
    slug: "muenchen",
    name: "München",
    type: "kreisfreie-stadt",
    parentSlug: "oberbayern",
    population: 1488000,
    coordinates: { lat: 48.1351, lng: 11.5820 },
    plz: ["80331", "80333", "80335", "80336", "80469", "80538", "80539", "80634", "80636", "80637"],
    priority: 10
  },
  
  // Köln
  {
    slug: "koeln",
    name: "Köln",
    type: "kreisfreie-stadt",
    parentSlug: "koeln-bezirk",
    population: 1084000,
    coordinates: { lat: 50.9375, lng: 6.9603 },
    plz: ["50667", "50668", "50670", "50672", "50674", "50676", "50677", "50678", "50679", "50733"],
    priority: 10
  },
  
  // Frankfurt
  {
    slug: "frankfurt",
    name: "Frankfurt am Main",
    type: "kreisfreie-stadt",
    parentSlug: "hessen",
    population: 753000,
    coordinates: { lat: 50.1109, lng: 8.6821 },
    plz: ["60306", "60308", "60310", "60311", "60313", "60314", "60316", "60318", "60320", "60322"],
    priority: 10
  },
  
  // Stuttgart
  {
    slug: "stuttgart",
    name: "Stuttgart",
    type: "kreisfreie-stadt",
    parentSlug: "baden-wuerttemberg",
    population: 635000,
    coordinates: { lat: 48.7758, lng: 9.1829 },
    plz: ["70173", "70174", "70176", "70178", "70180", "70182", "70184", "70186", "70188", "70190"],
    priority: 10
  },
  
  // Düsseldorf
  {
    slug: "duesseldorf",
    name: "Düsseldorf",
    type: "kreisfreie-stadt",
    parentSlug: "duesseldorf-bezirk",
    population: 620000,
    coordinates: { lat: 51.2277, lng: 6.7735 },
    plz: ["40210", "40211", "40212", "40213", "40215", "40217", "40219", "40221", "40223", "40225"],
    priority: 10
  },
  
  // Leipzig
  {
    slug: "leipzig",
    name: "Leipzig",
    type: "kreisfreie-stadt",
    parentSlug: "sachsen",
    population: 597000,
    coordinates: { lat: 51.3397, lng: 12.3731 },
    plz: ["04103", "04105", "04107", "04109", "04129", "04155", "04157", "04158", "04159", "04177"],
    priority: 9
  },
  
  // Dortmund
  {
    slug: "dortmund",
    name: "Dortmund",
    type: "kreisfreie-stadt",
    parentSlug: "arnsberg-bezirk",
    population: 588000,
    coordinates: { lat: 51.5136, lng: 7.4653 },
    plz: ["44135", "44137", "44139", "44141", "44143", "44145", "44147", "44149", "44225", "44227"],
    priority: 9
  },
  
  // Essen
  {
    slug: "essen",
    name: "Essen",
    type: "kreisfreie-stadt",
    parentSlug: "duesseldorf-bezirk",
    population: 583000,
    coordinates: { lat: 51.4556, lng: 7.0116 },
    plz: ["45127", "45128", "45130", "45131", "45133", "45134", "45136", "45138", "45139", "45141"],
    priority: 9
  },
  
  // Bremen (Stadt)
  {
    slug: "bremen-stadt",
    name: "Bremen",
    type: "kreisfreie-stadt",
    parentSlug: "bremen",
    population: 567000,
    coordinates: { lat: 53.0793, lng: 8.8017 },
    plz: ["28195", "28197", "28199", "28201", "28203", "28205", "28207", "28209", "28211", "28213"],
    priority: 9
  },
  
  // Dresden
  {
    slug: "dresden",
    name: "Dresden",
    type: "kreisfreie-stadt",
    parentSlug: "sachsen",
    population: 556000,
    coordinates: { lat: 51.0504, lng: 13.7373 },
    plz: ["01067", "01069", "01097", "01099", "01109", "01127", "01129", "01139", "01157", "01159"],
    priority: 9
  },
  
  // Hannover
  {
    slug: "hannover",
    name: "Hannover",
    type: "kreisfreie-stadt",
    parentSlug: "niedersachsen",
    population: 536000,
    coordinates: { lat: 52.3759, lng: 9.7320 },
    plz: ["30159", "30161", "30163", "30165", "30167", "30169", "30171", "30173", "30175", "30177"],
    priority: 9
  },
  
  // Nürnberg
  {
    slug: "nuernberg",
    name: "Nürnberg",
    type: "kreisfreie-stadt",
    parentSlug: "mittelfranken",
    population: 518000,
    coordinates: { lat: 49.4521, lng: 11.0767 },
    plz: ["90402", "90403", "90408", "90409", "90411", "90419", "90425", "90427", "90429", "90431"],
    priority: 9
  },
  
  // Duisburg
  {
    slug: "duisburg",
    name: "Duisburg",
    type: "kreisfreie-stadt",
    parentSlug: "duesseldorf-bezirk",
    population: 498000,
    coordinates: { lat: 51.4344, lng: 6.7623 },
    plz: ["47051", "47053", "47055", "47057", "47058", "47059", "47119", "47137", "47139", "47166"],
    priority: 8
  },
  
  // Bochum
  {
    slug: "bochum",
    name: "Bochum",
    type: "kreisfreie-stadt",
    parentSlug: "arnsberg-bezirk",
    population: 365000,
    coordinates: { lat: 51.4818, lng: 7.2162 },
    plz: ["44787", "44789", "44791", "44793", "44795", "44797", "44799", "44801", "44803", "44805"],
    priority: 8
  },
  
  // Wuppertal
  {
    slug: "wuppertal",
    name: "Wuppertal",
    type: "kreisfreie-stadt",
    parentSlug: "duesseldorf-bezirk",
    population: 355000,
    coordinates: { lat: 51.2562, lng: 7.1508 },
    plz: ["42103", "42105", "42107", "42109", "42111", "42113", "42115", "42117", "42119", "42275"],
    priority: 8
  },
  
  // Bielefeld
  {
    slug: "bielefeld",
    name: "Bielefeld",
    type: "kreisfreie-stadt",
    parentSlug: "detmold-bezirk",
    population: 334000,
    coordinates: { lat: 52.0302, lng: 8.5325 },
    plz: ["33602", "33604", "33605", "33607", "33609", "33611", "33613", "33615", "33617", "33619"],
    priority: 8
  },
  
  // Bonn
  {
    slug: "bonn",
    name: "Bonn",
    type: "kreisfreie-stadt",
    parentSlug: "koeln-bezirk",
    population: 330000,
    coordinates: { lat: 50.7374, lng: 7.0982 },
    plz: ["53111", "53113", "53115", "53117", "53119", "53121", "53123", "53125", "53127", "53129"],
    priority: 8
  },
  
  // Münster
  {
    slug: "muenster",
    name: "Münster",
    type: "kreisfreie-stadt",
    parentSlug: "muenster-bezirk",
    population: 315000,
    coordinates: { lat: 51.9607, lng: 7.6261 },
    plz: ["48143", "48145", "48147", "48149", "48151", "48153", "48155", "48157", "48159", "48161"],
    priority: 8
  },
  
  // Mannheim
  {
    slug: "mannheim",
    name: "Mannheim",
    type: "kreisfreie-stadt",
    parentSlug: "baden-wuerttemberg",
    population: 310000,
    coordinates: { lat: 49.4875, lng: 8.4660 },
    plz: ["68159", "68161", "68163", "68165", "68167", "68169", "68199", "68219", "68229", "68239"],
    priority: 8
  },
  
  // Karlsruhe
  {
    slug: "karlsruhe",
    name: "Karlsruhe",
    type: "kreisfreie-stadt",
    parentSlug: "baden-wuerttemberg",
    population: 308000,
    coordinates: { lat: 49.0069, lng: 8.4037 },
    plz: ["76131", "76133", "76135", "76137", "76139", "76149", "76185", "76187", "76189", "76199"],
    priority: 8
  },
  
  // Augsburg
  {
    slug: "augsburg",
    name: "Augsburg",
    type: "kreisfreie-stadt",
    parentSlug: "schwaben",
    population: 296000,
    coordinates: { lat: 48.3705, lng: 10.8978 },
    plz: ["86150", "86152", "86153", "86154", "86156", "86157", "86159", "86161", "86163", "86165"],
    priority: 8
  },
  
  // Wiesbaden
  {
    slug: "wiesbaden",
    name: "Wiesbaden",
    type: "kreisfreie-stadt",
    parentSlug: "hessen",
    population: 278000,
    coordinates: { lat: 50.0782, lng: 8.2398 },
    plz: ["65183", "65185", "65187", "65189", "65191", "65193", "65195", "65197", "65199", "65201"],
    priority: 8
  },
  
  // Aachen
  {
    slug: "aachen",
    name: "Aachen",
    type: "kreisfreie-stadt",
    parentSlug: "koeln-bezirk",
    population: 249000,
    coordinates: { lat: 50.7753, lng: 6.0839 },
    plz: ["52062", "52064", "52066", "52068", "52070", "52072", "52074", "52076", "52078", "52080"],
    priority: 8
  },

  // =====================================================
  // BERLIN - Bezirke (12 Stadtbezirke)
  // =====================================================
  {
    slug: "berlin-mitte",
    name: "Mitte",
    type: "stadtbezirk",
    parentSlug: "berlin",
    population: 384000,
    priority: 9
  },
  {
    slug: "berlin-friedrichshain-kreuzberg",
    name: "Friedrichshain-Kreuzberg",
    type: "stadtbezirk",
    parentSlug: "berlin",
    population: 289000,
    priority: 9
  },
  {
    slug: "berlin-pankow",
    name: "Pankow",
    type: "stadtbezirk",
    parentSlug: "berlin",
    population: 410000,
    priority: 8
  },
  {
    slug: "berlin-charlottenburg-wilmersdorf",
    name: "Charlottenburg-Wilmersdorf",
    type: "stadtbezirk",
    parentSlug: "berlin",
    population: 343000,
    priority: 9
  },
  {
    slug: "berlin-spandau",
    name: "Spandau",
    type: "stadtbezirk",
    parentSlug: "berlin",
    population: 245000,
    priority: 7
  },
  {
    slug: "berlin-steglitz-zehlendorf",
    name: "Steglitz-Zehlendorf",
    type: "stadtbezirk",
    parentSlug: "berlin",
    population: 310000,
    priority: 8
  },
  {
    slug: "berlin-tempelhof-schoeneberg",
    name: "Tempelhof-Schöneberg",
    type: "stadtbezirk",
    parentSlug: "berlin",
    population: 351000,
    priority: 8
  },
  {
    slug: "berlin-neukoelln",
    name: "Neukölln",
    type: "stadtbezirk",
    parentSlug: "berlin",
    population: 330000,
    priority: 8
  },
  {
    slug: "berlin-treptow-koepenick",
    name: "Treptow-Köpenick",
    type: "stadtbezirk",
    parentSlug: "berlin",
    population: 273000,
    priority: 7
  },
  {
    slug: "berlin-marzahn-hellersdorf",
    name: "Marzahn-Hellersdorf",
    type: "stadtbezirk",
    parentSlug: "berlin",
    population: 269000,
    priority: 7
  },
  {
    slug: "berlin-lichtenberg",
    name: "Lichtenberg",
    type: "stadtbezirk",
    parentSlug: "berlin",
    population: 296000,
    priority: 7
  },
  {
    slug: "berlin-reinickendorf",
    name: "Reinickendorf",
    type: "stadtbezirk",
    parentSlug: "berlin",
    population: 266000,
    priority: 7
  },

  // =====================================================
  // BERLIN - Stadtteile (Auswahl wichtigster)
  // =====================================================
  // Mitte
  {
    slug: "berlin-mitte-zentrum",
    name: "Mitte",
    type: "stadtteil",
    parentSlug: "berlin-mitte",
    plz: ["10115", "10117", "10119", "10178", "10179"],
    priority: 9
  },
  {
    slug: "berlin-wedding",
    name: "Wedding",
    type: "stadtteil",
    parentSlug: "berlin-mitte",
    plz: ["13347", "13349", "13351", "13353", "13355", "13357", "13359"],
    priority: 8
  },
  {
    slug: "berlin-moabit",
    name: "Moabit",
    type: "stadtteil",
    parentSlug: "berlin-mitte",
    plz: ["10551", "10553", "10555", "10557", "10559"],
    priority: 8
  },
  {
    slug: "berlin-tiergarten",
    name: "Tiergarten",
    type: "stadtteil",
    parentSlug: "berlin-mitte",
    plz: ["10785", "10787"],
    priority: 8
  },
  
  // Friedrichshain-Kreuzberg
  {
    slug: "berlin-friedrichshain",
    name: "Friedrichshain",
    type: "stadtteil",
    parentSlug: "berlin-friedrichshain-kreuzberg",
    plz: ["10243", "10245", "10247", "10249"],
    priority: 9
  },
  {
    slug: "berlin-kreuzberg",
    name: "Kreuzberg",
    type: "stadtteil",
    parentSlug: "berlin-friedrichshain-kreuzberg",
    plz: ["10961", "10963", "10965", "10967", "10969", "10997", "10999"],
    priority: 9
  },
  
  // Charlottenburg-Wilmersdorf
  {
    slug: "berlin-charlottenburg",
    name: "Charlottenburg",
    type: "stadtteil",
    parentSlug: "berlin-charlottenburg-wilmersdorf",
    plz: ["10585", "10587", "10589", "10623", "10625", "10627", "10629"],
    priority: 9
  },
  {
    slug: "berlin-wilmersdorf",
    name: "Wilmersdorf",
    type: "stadtteil",
    parentSlug: "berlin-charlottenburg-wilmersdorf",
    plz: ["10707", "10709", "10711", "10713", "10715", "10717", "10719"],
    priority: 8
  },
  
  // Pankow
  {
    slug: "berlin-prenzlauer-berg",
    name: "Prenzlauer Berg",
    type: "stadtteil",
    parentSlug: "berlin-pankow",
    plz: ["10405", "10407", "10409", "10435", "10437", "10439"],
    priority: 9
  },
  {
    slug: "berlin-pankow-ort",
    name: "Pankow",
    type: "stadtteil",
    parentSlug: "berlin-pankow",
    plz: ["13187", "13189"],
    priority: 7
  },
  
  // Neukölln
  {
    slug: "berlin-neukoelln-nord",
    name: "Neukölln",
    type: "stadtteil",
    parentSlug: "berlin-neukoelln",
    plz: ["12043", "12045", "12047", "12049", "12051", "12053", "12055", "12057", "12059"],
    priority: 8
  },

  // =====================================================
  // MÜNCHEN - Stadtbezirke (25 Bezirke)
  // =====================================================
  {
    slug: "muenchen-altstadt-lehel",
    name: "Altstadt-Lehel",
    type: "stadtbezirk",
    parentSlug: "muenchen",
    plz: ["80331", "80538", "80539"],
    priority: 9
  },
  {
    slug: "muenchen-ludwigsvorstadt-isarvorstadt",
    name: "Ludwigsvorstadt-Isarvorstadt",
    type: "stadtbezirk",
    parentSlug: "muenchen",
    plz: ["80336", "80337", "80469"],
    priority: 9
  },
  {
    slug: "muenchen-maxvorstadt",
    name: "Maxvorstadt",
    type: "stadtbezirk",
    parentSlug: "muenchen",
    plz: ["80333", "80335", "80539", "80799", "80801", "80802"],
    priority: 9
  },
  {
    slug: "muenchen-schwabing-west",
    name: "Schwabing-West",
    type: "stadtbezirk",
    parentSlug: "muenchen",
    plz: ["80797", "80798", "80799", "80801", "80803", "80804"],
    priority: 9
  },
  {
    slug: "muenchen-au-haidhausen",
    name: "Au-Haidhausen",
    type: "stadtbezirk",
    parentSlug: "muenchen",
    plz: ["81667", "81669", "81671", "81675", "81677"],
    priority: 8
  },
  {
    slug: "muenchen-sendling",
    name: "Sendling",
    type: "stadtbezirk",
    parentSlug: "muenchen",
    plz: ["81369", "81371", "81373"],
    priority: 8
  },
  {
    slug: "muenchen-sendling-westpark",
    name: "Sendling-Westpark",
    type: "stadtbezirk",
    parentSlug: "muenchen",
    plz: ["81373", "81377", "81379"],
    priority: 7
  },
  {
    slug: "muenchen-schwanthalerhoehe",
    name: "Schwanthalerhöhe",
    type: "stadtbezirk",
    parentSlug: "muenchen",
    plz: ["80339", "80636"],
    priority: 7
  },
  {
    slug: "muenchen-neuhausen-nymphenburg",
    name: "Neuhausen-Nymphenburg",
    type: "stadtbezirk",
    parentSlug: "muenchen",
    plz: ["80634", "80636", "80637", "80638", "80639"],
    priority: 8
  },
  {
    slug: "muenchen-moosach",
    name: "Moosach",
    type: "stadtbezirk",
    parentSlug: "muenchen",
    plz: ["80992", "80993", "80997"],
    priority: 7
  },
  {
    slug: "muenchen-milbertshofen-am-hart",
    name: "Milbertshofen-Am Hart",
    type: "stadtbezirk",
    parentSlug: "muenchen",
    plz: ["80807", "80809", "80937", "80939"],
    priority: 7
  },
  {
    slug: "muenchen-schwabing-freimann",
    name: "Schwabing-Freimann",
    type: "stadtbezirk",
    parentSlug: "muenchen",
    plz: ["80802", "80803", "80804", "80805", "80807", "80939"],
    priority: 8
  },
  {
    slug: "muenchen-bogenhausen",
    name: "Bogenhausen",
    type: "stadtbezirk",
    parentSlug: "muenchen",
    plz: ["81675", "81677", "81679", "81925", "81927", "81929"],
    priority: 8
  },
  {
    slug: "muenchen-berg-am-laim",
    name: "Berg am Laim",
    type: "stadtbezirk",
    parentSlug: "muenchen",
    plz: ["81671", "81673", "81735", "81825", "81829"],
    priority: 7
  },
  {
    slug: "muenchen-trudering-riem",
    name: "Trudering-Riem",
    type: "stadtbezirk",
    parentSlug: "muenchen",
    plz: ["81825", "81827", "81829"],
    priority: 7
  },
  {
    slug: "muenchen-ramersdorf-perlach",
    name: "Ramersdorf-Perlach",
    type: "stadtbezirk",
    parentSlug: "muenchen",
    plz: ["81735", "81737", "81739", "81549"],
    priority: 7
  },
  {
    slug: "muenchen-obergiesing-fasangarten",
    name: "Obergiesing-Fasangarten",
    type: "stadtbezirk",
    parentSlug: "muenchen",
    plz: ["81539", "81541", "81543"],
    priority: 7
  },
  {
    slug: "muenchen-untergiesing-harlaching",
    name: "Untergiesing-Harlaching",
    type: "stadtbezirk",
    parentSlug: "muenchen",
    plz: ["81543", "81545", "81547"],
    priority: 7
  },
  {
    slug: "muenchen-thalkirchen-obersendling-forstenried-fuerstenried-solln",
    name: "Thalkirchen-Obersendling-Forstenried-Fürstenried-Solln",
    type: "stadtbezirk",
    parentSlug: "muenchen",
    plz: ["81369", "81475", "81476", "81477", "81479"],
    priority: 7
  },
  {
    slug: "muenchen-hadern",
    name: "Hadern",
    type: "stadtbezirk",
    parentSlug: "muenchen",
    plz: ["81375", "81377", "81377"],
    priority: 6
  },
  {
    slug: "muenchen-pasing-obermenzing",
    name: "Pasing-Obermenzing",
    type: "stadtbezirk",
    parentSlug: "muenchen",
    plz: ["81241", "81243", "81245", "81247", "81249"],
    priority: 7
  },
  {
    slug: "muenchen-aubing-lochhausen-langwied",
    name: "Aubing-Lochhausen-Langwied",
    type: "stadtbezirk",
    parentSlug: "muenchen",
    plz: ["81243", "81245", "81249"],
    priority: 6
  },
  {
    slug: "muenchen-allach-untermenzing",
    name: "Allach-Untermenzing",
    type: "stadtbezirk",
    parentSlug: "muenchen",
    plz: ["80997", "80999"],
    priority: 6
  },
  {
    slug: "muenchen-feldmoching-hasenbergl",
    name: "Feldmoching-Hasenbergl",
    type: "stadtbezirk",
    parentSlug: "muenchen",
    plz: ["80933", "80935", "80995"],
    priority: 6
  },
  {
    slug: "muenchen-laim",
    name: "Laim",
    type: "stadtbezirk",
    parentSlug: "muenchen",
    plz: ["80686", "80687", "80689"],
    priority: 7
  },

  // =====================================================
  // HAMBURG - Bezirke (7 Bezirke)
  // =====================================================
  {
    slug: "hamburg-mitte",
    name: "Hamburg-Mitte",
    type: "stadtbezirk",
    parentSlug: "hamburg",
    population: 310000,
    priority: 9
  },
  {
    slug: "hamburg-altona",
    name: "Altona",
    type: "stadtbezirk",
    parentSlug: "hamburg",
    population: 275000,
    priority: 8
  },
  {
    slug: "hamburg-eimsbuettel",
    name: "Eimsbüttel",
    type: "stadtbezirk",
    parentSlug: "hamburg",
    population: 270000,
    priority: 8
  },
  {
    slug: "hamburg-nord",
    name: "Hamburg-Nord",
    type: "stadtbezirk",
    parentSlug: "hamburg",
    population: 320000,
    priority: 8
  },
  {
    slug: "hamburg-wandsbek",
    name: "Wandsbek",
    type: "stadtbezirk",
    parentSlug: "hamburg",
    population: 440000,
    priority: 8
  },
  {
    slug: "hamburg-bergedorf",
    name: "Bergedorf",
    type: "stadtbezirk",
    parentSlug: "hamburg",
    population: 130000,
    priority: 7
  },
  {
    slug: "hamburg-harburg",
    name: "Harburg",
    type: "stadtbezirk",
    parentSlug: "hamburg",
    population: 170000,
    priority: 7
  },

  // =====================================================
  // HAMBURG - Stadtteile (Auswahl wichtigster)
  // =====================================================
  {
    slug: "hamburg-st-pauli",
    name: "St. Pauli",
    type: "stadtteil",
    parentSlug: "hamburg-mitte",
    plz: ["20359"],
    priority: 9
  },
  {
    slug: "hamburg-altstadt",
    name: "Hamburg-Altstadt",
    type: "stadtteil",
    parentSlug: "hamburg-mitte",
    plz: ["20095", "20097"],
    priority: 9
  },
  {
    slug: "hamburg-neustadt",
    name: "Neustadt",
    type: "stadtteil",
    parentSlug: "hamburg-mitte",
    plz: ["20354", "20355", "20457", "20459"],
    priority: 8
  },
  {
    slug: "hamburg-hafencity",
    name: "HafenCity",
    type: "stadtteil",
    parentSlug: "hamburg-mitte",
    plz: ["20457"],
    priority: 8
  },
  {
    slug: "hamburg-winterhude",
    name: "Winterhude",
    type: "stadtteil",
    parentSlug: "hamburg-nord",
    plz: ["22299", "22301", "22303"],
    priority: 8
  },
  {
    slug: "hamburg-eppendorf",
    name: "Eppendorf",
    type: "stadtteil",
    parentSlug: "hamburg-nord",
    plz: ["20249", "20251", "20253"],
    priority: 8
  },
  {
    slug: "hamburg-ottensen",
    name: "Ottensen",
    type: "stadtteil",
    parentSlug: "hamburg-altona",
    plz: ["22763", "22765"],
    priority: 8
  },
  {
    slug: "hamburg-blankenese",
    name: "Blankenese",
    type: "stadtteil",
    parentSlug: "hamburg-altona",
    plz: ["22587", "22589"],
    priority: 7
  },

  // =====================================================
  // KÖLN - Stadtbezirke (9 Bezirke)
  // =====================================================
  {
    slug: "koeln-innenstadt",
    name: "Innenstadt",
    type: "stadtbezirk",
    parentSlug: "koeln",
    priority: 9
  },
  {
    slug: "koeln-rodenkirchen",
    name: "Rodenkirchen",
    type: "stadtbezirk",
    parentSlug: "koeln",
    priority: 7
  },
  {
    slug: "koeln-lindenthal",
    name: "Lindenthal",
    type: "stadtbezirk",
    parentSlug: "koeln",
    priority: 8
  },
  {
    slug: "koeln-ehrenfeld",
    name: "Ehrenfeld",
    type: "stadtbezirk",
    parentSlug: "koeln",
    priority: 8
  },
  {
    slug: "koeln-nippes",
    name: "Nippes",
    type: "stadtbezirk",
    parentSlug: "koeln",
    priority: 8
  },
  {
    slug: "koeln-chorweiler",
    name: "Chorweiler",
    type: "stadtbezirk",
    parentSlug: "koeln",
    priority: 6
  },
  {
    slug: "koeln-porz",
    name: "Porz",
    type: "stadtbezirk",
    parentSlug: "koeln",
    priority: 7
  },
  {
    slug: "koeln-kalk",
    name: "Kalk",
    type: "stadtbezirk",
    parentSlug: "koeln",
    priority: 7
  },
  {
    slug: "koeln-muelheim",
    name: "Mülheim",
    type: "stadtbezirk",
    parentSlug: "koeln",
    priority: 7
  },

  // =====================================================
  // KÖLN - Stadtteile (Auswahl)
  // =====================================================
  {
    slug: "koeln-altstadt-nord",
    name: "Altstadt-Nord",
    type: "stadtteil",
    parentSlug: "koeln-innenstadt",
    plz: ["50667", "50668"],
    priority: 9
  },
  {
    slug: "koeln-altstadt-sued",
    name: "Altstadt-Süd",
    type: "stadtteil",
    parentSlug: "koeln-innenstadt",
    plz: ["50676", "50677", "50678"],
    priority: 9
  },
  {
    slug: "koeln-neustadt-nord",
    name: "Neustadt-Nord",
    type: "stadtteil",
    parentSlug: "koeln-innenstadt",
    plz: ["50670", "50672", "50674"],
    priority: 8
  },
  {
    slug: "koeln-neustadt-sued",
    name: "Neustadt-Süd",
    type: "stadtteil",
    parentSlug: "koeln-innenstadt",
    plz: ["50674", "50677", "50679"],
    priority: 8
  },
  {
    slug: "koeln-deutz",
    name: "Deutz",
    type: "stadtteil",
    parentSlug: "koeln-innenstadt",
    plz: ["50679"],
    priority: 8
  },

  // =====================================================
  // FRANKFURT - Stadtteile (Auswahl)
  // =====================================================
  {
    slug: "frankfurt-innenstadt",
    name: "Innenstadt",
    type: "stadtteil",
    parentSlug: "frankfurt",
    plz: ["60311", "60313"],
    priority: 9
  },
  {
    slug: "frankfurt-altstadt",
    name: "Altstadt",
    type: "stadtteil",
    parentSlug: "frankfurt",
    plz: ["60311"],
    priority: 9
  },
  {
    slug: "frankfurt-sachsenhausen",
    name: "Sachsenhausen",
    type: "stadtteil",
    parentSlug: "frankfurt",
    plz: ["60594", "60596", "60598", "60599"],
    priority: 8
  },
  {
    slug: "frankfurt-bornheim",
    name: "Bornheim",
    type: "stadtteil",
    parentSlug: "frankfurt",
    plz: ["60385", "60389"],
    priority: 8
  },
  {
    slug: "frankfurt-bockenheim",
    name: "Bockenheim",
    type: "stadtteil",
    parentSlug: "frankfurt",
    plz: ["60486", "60487"],
    priority: 8
  },
  {
    slug: "frankfurt-nordend",
    name: "Nordend",
    type: "stadtteil",
    parentSlug: "frankfurt",
    plz: ["60316", "60318", "60322", "60389"],
    priority: 8
  },
  {
    slug: "frankfurt-westend",
    name: "Westend",
    type: "stadtteil",
    parentSlug: "frankfurt",
    plz: ["60322", "60323", "60325"],
    priority: 8
  },
  {
    slug: "frankfurt-gallus",
    name: "Gallus",
    type: "stadtteil",
    parentSlug: "frankfurt",
    plz: ["60326", "60327", "60486"],
    priority: 7
  },
  {
    slug: "frankfurt-hoechst",
    name: "Höchst",
    type: "stadtteil",
    parentSlug: "frankfurt",
    plz: ["65929"],
    priority: 7
  },

  // =====================================================
  // STUTTGART - Stadtbezirke (23 Bezirke, Auswahl)
  // =====================================================
  {
    slug: "stuttgart-mitte",
    name: "Stuttgart-Mitte",
    type: "stadtbezirk",
    parentSlug: "stuttgart",
    plz: ["70173", "70174", "70176", "70178", "70180", "70182"],
    priority: 9
  },
  {
    slug: "stuttgart-nord",
    name: "Stuttgart-Nord",
    type: "stadtbezirk",
    parentSlug: "stuttgart",
    plz: ["70191", "70192", "70193"],
    priority: 8
  },
  {
    slug: "stuttgart-sued",
    name: "Stuttgart-Süd",
    type: "stadtbezirk",
    parentSlug: "stuttgart",
    plz: ["70178", "70180", "70182", "70184"],
    priority: 8
  },
  {
    slug: "stuttgart-west",
    name: "Stuttgart-West",
    type: "stadtbezirk",
    parentSlug: "stuttgart",
    plz: ["70176", "70193", "70197"],
    priority: 8
  },
  {
    slug: "stuttgart-ost",
    name: "Stuttgart-Ost",
    type: "stadtbezirk",
    parentSlug: "stuttgart",
    plz: ["70186", "70188", "70190"],
    priority: 8
  },
  {
    slug: "stuttgart-bad-cannstatt",
    name: "Bad Cannstatt",
    type: "stadtbezirk",
    parentSlug: "stuttgart",
    plz: ["70372", "70374", "70376"],
    priority: 8
  },
  {
    slug: "stuttgart-vaihingen",
    name: "Vaihingen",
    type: "stadtbezirk",
    parentSlug: "stuttgart",
    plz: ["70563", "70565", "70567", "70569"],
    priority: 7
  },
  {
    slug: "stuttgart-feuerbach",
    name: "Feuerbach",
    type: "stadtbezirk",
    parentSlug: "stuttgart",
    plz: ["70469"],
    priority: 7
  },
  {
    slug: "stuttgart-degerloch",
    name: "Degerloch",
    type: "stadtbezirk",
    parentSlug: "stuttgart",
    plz: ["70597"],
    priority: 7
  },
  {
    slug: "stuttgart-zuffenhausen",
    name: "Zuffenhausen",
    type: "stadtbezirk",
    parentSlug: "stuttgart",
    plz: ["70435", "70437", "70439"],
    priority: 7
  },

  // =====================================================
  // WEITERE WICHTIGE STÄDTE MIT STADTTEILEN
  // =====================================================
  
  // DÜSSELDORF Stadtteile
  {
    slug: "duesseldorf-stadtmitte",
    name: "Stadtmitte",
    type: "stadtteil",
    parentSlug: "duesseldorf",
    plz: ["40210", "40211", "40212", "40213"],
    priority: 9
  },
  {
    slug: "duesseldorf-altstadt",
    name: "Altstadt",
    type: "stadtteil",
    parentSlug: "duesseldorf",
    plz: ["40213"],
    priority: 9
  },
  {
    slug: "duesseldorf-bilk",
    name: "Bilk",
    type: "stadtteil",
    parentSlug: "duesseldorf",
    plz: ["40221", "40223", "40225"],
    priority: 8
  },
  {
    slug: "duesseldorf-oberkassel",
    name: "Oberkassel",
    type: "stadtteil",
    parentSlug: "duesseldorf",
    plz: ["40545", "40547"],
    priority: 8
  },
  {
    slug: "duesseldorf-pempelfort",
    name: "Pempelfort",
    type: "stadtteil",
    parentSlug: "duesseldorf",
    plz: ["40211", "40474", "40476", "40477", "40479"],
    priority: 8
  },
  {
    slug: "duesseldorf-flingern",
    name: "Flingern",
    type: "stadtteil",
    parentSlug: "duesseldorf",
    plz: ["40233", "40235"],
    priority: 7
  },

  // DORTMUND Stadtteile
  {
    slug: "dortmund-innenstadt-west",
    name: "Innenstadt-West",
    type: "stadtteil",
    parentSlug: "dortmund",
    plz: ["44135", "44137", "44139"],
    priority: 8
  },
  {
    slug: "dortmund-innenstadt-ost",
    name: "Innenstadt-Ost",
    type: "stadtteil",
    parentSlug: "dortmund",
    plz: ["44135", "44137"],
    priority: 8
  },
  {
    slug: "dortmund-hoerde",
    name: "Hörde",
    type: "stadtteil",
    parentSlug: "dortmund",
    plz: ["44263", "44265", "44267"],
    priority: 7
  },

  // ESSEN Stadtteile
  {
    slug: "essen-stadtmitte",
    name: "Stadtmitte",
    type: "stadtteil",
    parentSlug: "essen",
    plz: ["45127", "45128"],
    priority: 8
  },
  {
    slug: "essen-ruettenscheid",
    name: "Rüttenscheid",
    type: "stadtteil",
    parentSlug: "essen",
    plz: ["45130", "45131"],
    priority: 8
  },
  {
    slug: "essen-werden",
    name: "Werden",
    type: "stadtteil",
    parentSlug: "essen",
    plz: ["45239"],
    priority: 7
  },

  // LEIPZIG Stadtteile
  {
    slug: "leipzig-mitte",
    name: "Mitte",
    type: "stadtteil",
    parentSlug: "leipzig",
    plz: ["04109"],
    priority: 8
  },
  {
    slug: "leipzig-connewitz",
    name: "Connewitz",
    type: "stadtteil",
    parentSlug: "leipzig",
    plz: ["04277", "04279"],
    priority: 8
  },
  {
    slug: "leipzig-plagwitz",
    name: "Plagwitz",
    type: "stadtteil",
    parentSlug: "leipzig",
    plz: ["04229"],
    priority: 8
  },

  // DRESDEN Stadtteile
  {
    slug: "dresden-altstadt",
    name: "Altstadt",
    type: "stadtteil",
    parentSlug: "dresden",
    plz: ["01067", "01069"],
    priority: 9
  },
  {
    slug: "dresden-neustadt",
    name: "Neustadt",
    type: "stadtteil",
    parentSlug: "dresden",
    plz: ["01097", "01099"],
    priority: 8
  },
  {
    slug: "dresden-blasewitz",
    name: "Blasewitz",
    type: "stadtteil",
    parentSlug: "dresden",
    plz: ["01309"],
    priority: 7
  },

  // HANNOVER Stadtteile
  {
    slug: "hannover-mitte",
    name: "Mitte",
    type: "stadtteil",
    parentSlug: "hannover",
    plz: ["30159", "30161"],
    priority: 8
  },
  {
    slug: "hannover-linden",
    name: "Linden",
    type: "stadtteil",
    parentSlug: "hannover",
    plz: ["30449", "30451", "30453"],
    priority: 8
  },
  {
    slug: "hannover-nordstadt",
    name: "Nordstadt",
    type: "stadtteil",
    parentSlug: "hannover",
    plz: ["30167", "30169"],
    priority: 7
  },

  // NÜRNBERG Stadtteile
  {
    slug: "nuernberg-altstadt",
    name: "Altstadt",
    type: "stadtteil",
    parentSlug: "nuernberg",
    plz: ["90402", "90403"],
    priority: 9
  },
  {
    slug: "nuernberg-goestenhof",
    name: "Gostenhof",
    type: "stadtteil",
    parentSlug: "nuernberg",
    plz: ["90429"],
    priority: 7
  },
  {
    slug: "nuernberg-st-johannis",
    name: "St. Johannis",
    type: "stadtteil",
    parentSlug: "nuernberg",
    plz: ["90419"],
    priority: 7
  },

  // =====================================================
  // BRANDENBURG - Städte
  // =====================================================
  {
    slug: "potsdam",
    name: "Potsdam",
    type: "kreisfreie-stadt",
    parentSlug: "brandenburg",
    population: 183000,
    coordinates: { lat: 52.3906, lng: 13.0645 },
    plz: ["14467", "14469", "14471", "14473", "14476", "14478", "14480", "14482"],
    priority: 8
  },
  {
    slug: "cottbus",
    name: "Cottbus",
    type: "kreisfreie-stadt",
    parentSlug: "brandenburg",
    population: 99000,
    coordinates: { lat: 51.7606, lng: 14.3350 },
    plz: ["03042", "03044", "03046", "03048", "03050", "03052", "03054", "03055"],
    priority: 7
  },
  {
    slug: "frankfurt-oder",
    name: "Frankfurt (Oder)",
    type: "kreisfreie-stadt",
    parentSlug: "brandenburg",
    population: 58000,
    coordinates: { lat: 52.3471, lng: 14.5506 },
    plz: ["15230", "15232", "15234", "15236"],
    priority: 6
  },
  {
    slug: "brandenburg-havel",
    name: "Brandenburg an der Havel",
    type: "kreisfreie-stadt",
    parentSlug: "brandenburg",
    population: 72000,
    coordinates: { lat: 52.4125, lng: 12.5316 },
    plz: ["14770", "14772", "14774", "14776"],
    priority: 6
  },

  // Potsdam Stadtteile
  {
    slug: "potsdam-innenstadt",
    name: "Innenstadt",
    type: "stadtteil",
    parentSlug: "potsdam",
    plz: ["14467", "14469"],
    priority: 8
  },
  {
    slug: "potsdam-babelsberg",
    name: "Babelsberg",
    type: "stadtteil",
    parentSlug: "potsdam",
    plz: ["14482"],
    priority: 7
  },

  // =====================================================
  // MECKLENBURG-VORPOMMERN - Städte
  // =====================================================
  {
    slug: "rostock",
    name: "Rostock",
    type: "kreisfreie-stadt",
    parentSlug: "mecklenburg-vorpommern",
    population: 209000,
    coordinates: { lat: 54.0924, lng: 12.0991 },
    plz: ["18055", "18057", "18059", "18069", "18106", "18107", "18109", "18119"],
    priority: 8
  },
  {
    slug: "schwerin",
    name: "Schwerin",
    type: "kreisfreie-stadt",
    parentSlug: "mecklenburg-vorpommern",
    population: 96000,
    coordinates: { lat: 53.6355, lng: 11.4012 },
    plz: ["19053", "19055", "19057", "19059", "19061", "19063"],
    priority: 7
  },
  {
    slug: "neubrandenburg",
    name: "Neubrandenburg",
    type: "gemeinde",
    parentSlug: "mecklenburg-vorpommern",
    population: 64000,
    coordinates: { lat: 53.5608, lng: 13.2612 },
    plz: ["17033", "17034", "17036"],
    priority: 6
  },
  {
    slug: "stralsund",
    name: "Stralsund",
    type: "gemeinde",
    parentSlug: "mecklenburg-vorpommern",
    population: 59000,
    coordinates: { lat: 54.3092, lng: 13.0818 },
    plz: ["18435", "18437", "18439"],
    priority: 6
  },
  {
    slug: "greifswald",
    name: "Greifswald",
    type: "gemeinde",
    parentSlug: "mecklenburg-vorpommern",
    population: 59000,
    coordinates: { lat: 54.0865, lng: 13.3923 },
    plz: ["17489", "17491", "17493"],
    priority: 6
  },
  {
    slug: "wismar",
    name: "Wismar",
    type: "gemeinde",
    parentSlug: "mecklenburg-vorpommern",
    population: 42000,
    coordinates: { lat: 53.8914, lng: 11.4658 },
    plz: ["23966", "23968", "23970"],
    priority: 6
  },

  // Rostock Stadtteile
  {
    slug: "rostock-stadtmitte",
    name: "Stadtmitte",
    type: "stadtteil",
    parentSlug: "rostock",
    plz: ["18055"],
    priority: 8
  },
  {
    slug: "rostock-warnemuende",
    name: "Warnemünde",
    type: "stadtteil",
    parentSlug: "rostock",
    plz: ["18119"],
    priority: 7
  },

  // =====================================================
  // RHEINLAND-PFALZ - Städte
  // =====================================================
  {
    slug: "mainz",
    name: "Mainz",
    type: "kreisfreie-stadt",
    parentSlug: "rheinland-pfalz",
    population: 218000,
    coordinates: { lat: 49.9929, lng: 8.2473 },
    plz: ["55116", "55118", "55120", "55122", "55124", "55126", "55127", "55128", "55129", "55130", "55131"],
    priority: 9
  },
  {
    slug: "ludwigshafen",
    name: "Ludwigshafen am Rhein",
    type: "kreisfreie-stadt",
    parentSlug: "rheinland-pfalz",
    population: 172000,
    coordinates: { lat: 49.4774, lng: 8.4452 },
    plz: ["67059", "67061", "67063", "67065", "67067", "67069", "67071"],
    priority: 8
  },
  {
    slug: "koblenz",
    name: "Koblenz",
    type: "kreisfreie-stadt",
    parentSlug: "rheinland-pfalz",
    population: 114000,
    coordinates: { lat: 50.3569, lng: 7.5890 },
    plz: ["56068", "56070", "56072", "56073", "56075", "56076", "56077"],
    priority: 8
  },
  {
    slug: "trier",
    name: "Trier",
    type: "kreisfreie-stadt",
    parentSlug: "rheinland-pfalz",
    population: 111000,
    coordinates: { lat: 49.7490, lng: 6.6371 },
    plz: ["54290", "54292", "54293", "54294", "54295", "54296"],
    priority: 7
  },
  {
    slug: "kaiserslautern",
    name: "Kaiserslautern",
    type: "kreisfreie-stadt",
    parentSlug: "rheinland-pfalz",
    population: 100000,
    coordinates: { lat: 49.4401, lng: 7.7491 },
    plz: ["67655", "67657", "67659", "67661", "67663"],
    priority: 7
  },
  {
    slug: "worms",
    name: "Worms",
    type: "kreisfreie-stadt",
    parentSlug: "rheinland-pfalz",
    population: 84000,
    coordinates: { lat: 49.6341, lng: 8.3507 },
    plz: ["67547", "67549", "67550", "67551"],
    priority: 6
  },
  {
    slug: "neustadt-weinstrasse",
    name: "Neustadt an der Weinstraße",
    type: "kreisfreie-stadt",
    parentSlug: "rheinland-pfalz",
    population: 53000,
    coordinates: { lat: 49.3506, lng: 8.1385 },
    plz: ["67433", "67434", "67435"],
    priority: 6
  },
  {
    slug: "speyer",
    name: "Speyer",
    type: "kreisfreie-stadt",
    parentSlug: "rheinland-pfalz",
    population: 51000,
    coordinates: { lat: 49.3173, lng: 8.4411 },
    plz: ["67346"],
    priority: 6
  },

  // Mainz Stadtteile
  {
    slug: "mainz-altstadt",
    name: "Altstadt",
    type: "stadtteil",
    parentSlug: "mainz",
    plz: ["55116"],
    priority: 8
  },
  {
    slug: "mainz-neustadt",
    name: "Neustadt",
    type: "stadtteil",
    parentSlug: "mainz",
    plz: ["55118"],
    priority: 7
  },

  // =====================================================
  // SAARLAND - Städte
  // =====================================================
  {
    slug: "saarbruecken",
    name: "Saarbrücken",
    type: "kreisfreie-stadt",
    parentSlug: "saarland",
    population: 180000,
    coordinates: { lat: 49.2354, lng: 6.9958 },
    plz: ["66111", "66113", "66115", "66117", "66119", "66121", "66123", "66125", "66126", "66127", "66128", "66129"],
    priority: 8
  },
  {
    slug: "neunkirchen-saar",
    name: "Neunkirchen",
    type: "gemeinde",
    parentSlug: "saarland",
    population: 47000,
    coordinates: { lat: 49.3448, lng: 7.1801 },
    plz: ["66538", "66539", "66540"],
    priority: 6
  },
  {
    slug: "voelklingen",
    name: "Völklingen",
    type: "gemeinde",
    parentSlug: "saarland",
    population: 39000,
    coordinates: { lat: 49.2517, lng: 6.8531 },
    plz: ["66333"],
    priority: 6
  },
  {
    slug: "homburg-saar",
    name: "Homburg",
    type: "gemeinde",
    parentSlug: "saarland",
    population: 42000,
    coordinates: { lat: 49.3265, lng: 7.3389 },
    plz: ["66424"],
    priority: 6
  },
  {
    slug: "st-ingbert",
    name: "St. Ingbert",
    type: "gemeinde",
    parentSlug: "saarland",
    population: 36000,
    coordinates: { lat: 49.2797, lng: 7.1150 },
    plz: ["66386"],
    priority: 5
  },
  {
    slug: "saarlouis",
    name: "Saarlouis",
    type: "gemeinde",
    parentSlug: "saarland",
    population: 34000,
    coordinates: { lat: 49.3136, lng: 6.7528 },
    plz: ["66740"],
    priority: 5
  },
  {
    slug: "merzig",
    name: "Merzig",
    type: "gemeinde",
    parentSlug: "saarland",
    population: 30000,
    coordinates: { lat: 49.4406, lng: 6.6389 },
    plz: ["66663"],
    priority: 5
  },

  // Saarbrücken Stadtteile
  {
    slug: "saarbruecken-mitte",
    name: "Mitte",
    type: "stadtteil",
    parentSlug: "saarbruecken",
    plz: ["66111", "66113"],
    priority: 8
  },
  {
    slug: "saarbruecken-st-johann",
    name: "St. Johann",
    type: "stadtteil",
    parentSlug: "saarbruecken",
    plz: ["66115"],
    priority: 7
  },

  // =====================================================
  // SACHSEN-ANHALT - Städte
  // =====================================================
  {
    slug: "magdeburg",
    name: "Magdeburg",
    type: "kreisfreie-stadt",
    parentSlug: "sachsen-anhalt",
    population: 238000,
    coordinates: { lat: 52.1205, lng: 11.6276 },
    plz: ["39104", "39106", "39108", "39110", "39112", "39114", "39116", "39118", "39120", "39122", "39124", "39126"],
    priority: 8
  },
  {
    slug: "halle-saale",
    name: "Halle (Saale)",
    type: "kreisfreie-stadt",
    parentSlug: "sachsen-anhalt",
    population: 239000,
    coordinates: { lat: 51.4828, lng: 11.9700 },
    plz: ["06108", "06110", "06112", "06114", "06116", "06118", "06120", "06122", "06124", "06126", "06128", "06130"],
    priority: 8
  },
  {
    slug: "dessau-rosslau",
    name: "Dessau-Roßlau",
    type: "kreisfreie-stadt",
    parentSlug: "sachsen-anhalt",
    population: 80000,
    coordinates: { lat: 51.8312, lng: 12.2465 },
    plz: ["06842", "06844", "06846", "06847", "06849"],
    priority: 6
  },
  {
    slug: "wittenberg",
    name: "Lutherstadt Wittenberg",
    type: "kreisfreie-stadt",
    parentSlug: "sachsen-anhalt",
    population: 46000,
    coordinates: { lat: 51.8661, lng: 12.6475 },
    plz: ["06886"],
    priority: 5
  },

  // Magdeburg Stadtteile
  {
    slug: "magdeburg-altstadt",
    name: "Altstadt",
    type: "stadtteil",
    parentSlug: "magdeburg",
    plz: ["39104"],
    priority: 8
  },
  {
    slug: "magdeburg-buckau",
    name: "Buckau",
    type: "stadtteil",
    parentSlug: "magdeburg",
    plz: ["39104"],
    priority: 7
  },

  // Halle Stadtteile
  {
    slug: "halle-mitte",
    name: "Mitte",
    type: "stadtteil",
    parentSlug: "halle-saale",
    plz: ["06108", "06110"],
    priority: 8
  },
  {
    slug: "halle-paulusviertel",
    name: "Paulusviertel",
    type: "stadtteil",
    parentSlug: "halle-saale",
    plz: ["06114"],
    priority: 7
  },

  // =====================================================
  // SCHLESWIG-HOLSTEIN - Städte
  // =====================================================
  {
    slug: "kiel",
    name: "Kiel",
    type: "kreisfreie-stadt",
    parentSlug: "schleswig-holstein",
    population: 247000,
    coordinates: { lat: 54.3233, lng: 10.1228 },
    plz: ["24103", "24105", "24106", "24107", "24109", "24111", "24113", "24114", "24116", "24118", "24143", "24145", "24146", "24147", "24148", "24149"],
    priority: 8
  },
  {
    slug: "luebeck",
    name: "Lübeck",
    type: "kreisfreie-stadt",
    parentSlug: "schleswig-holstein",
    population: 217000,
    coordinates: { lat: 53.8655, lng: 10.6866 },
    plz: ["23552", "23554", "23556", "23558", "23560", "23562", "23564", "23566", "23568", "23569", "23570"],
    priority: 8
  },
  {
    slug: "flensburg",
    name: "Flensburg",
    type: "kreisfreie-stadt",
    parentSlug: "schleswig-holstein",
    population: 90000,
    coordinates: { lat: 54.7937, lng: 9.4469 },
    plz: ["24937", "24939", "24941", "24943", "24944"],
    priority: 7
  },
  {
    slug: "neumuenster",
    name: "Neumünster",
    type: "kreisfreie-stadt",
    parentSlug: "schleswig-holstein",
    population: 80000,
    coordinates: { lat: 54.0737, lng: 9.9838 },
    plz: ["24534", "24536", "24537", "24539"],
    priority: 6
  },

  // Kiel Stadtteile
  {
    slug: "kiel-mitte",
    name: "Mitte",
    type: "stadtteil",
    parentSlug: "kiel",
    plz: ["24103", "24105"],
    priority: 8
  },
  {
    slug: "kiel-gaarden",
    name: "Gaarden",
    type: "stadtteil",
    parentSlug: "kiel",
    plz: ["24143"],
    priority: 7
  },

  // Lübeck Stadtteile
  {
    slug: "luebeck-altstadt",
    name: "Altstadt",
    type: "stadtteil",
    parentSlug: "luebeck",
    plz: ["23552"],
    priority: 8
  },
  {
    slug: "luebeck-st-juergen",
    name: "St. Jürgen",
    type: "stadtteil",
    parentSlug: "luebeck",
    plz: ["23564", "23566"],
    priority: 7
  },

  // =====================================================
  // THÜRINGEN - Städte
  // =====================================================
  {
    slug: "erfurt",
    name: "Erfurt",
    type: "kreisfreie-stadt",
    parentSlug: "thueringen",
    population: 214000,
    coordinates: { lat: 50.9787, lng: 11.0328 },
    plz: ["99084", "99085", "99086", "99087", "99089", "99091", "99092", "99094", "99096", "99097", "99098", "99099"],
    priority: 8
  },
  {
    slug: "jena",
    name: "Jena",
    type: "kreisfreie-stadt",
    parentSlug: "thueringen",
    population: 111000,
    coordinates: { lat: 50.9271, lng: 11.5892 },
    plz: ["07743", "07745", "07747", "07749", "07751"],
    priority: 7
  },
  {
    slug: "gera",
    name: "Gera",
    type: "kreisfreie-stadt",
    parentSlug: "thueringen",
    population: 93000,
    coordinates: { lat: 50.8810, lng: 12.0796 },
    plz: ["07545", "07546", "07548", "07549", "07551", "07552", "07554"],
    priority: 7
  },
  {
    slug: "weimar",
    name: "Weimar",
    type: "kreisfreie-stadt",
    parentSlug: "thueringen",
    population: 65000,
    coordinates: { lat: 50.9795, lng: 11.3235 },
    plz: ["99423", "99425", "99427", "99428"],
    priority: 7
  },
  {
    slug: "gotha",
    name: "Gotha",
    type: "kreisfreie-stadt",
    parentSlug: "thueringen",
    population: 45000,
    coordinates: { lat: 50.9489, lng: 10.7018 },
    plz: ["99867"],
    priority: 6
  },
  {
    slug: "eisenach",
    name: "Eisenach",
    type: "kreisfreie-stadt",
    parentSlug: "thueringen",
    population: 42000,
    coordinates: { lat: 50.9807, lng: 10.3193 },
    plz: ["99817"],
    priority: 6
  },
  {
    slug: "suhl",
    name: "Suhl",
    type: "kreisfreie-stadt",
    parentSlug: "thueringen",
    population: 36000,
    coordinates: { lat: 50.6090, lng: 10.6940 },
    plz: ["98527", "98528", "98529"],
    priority: 5
  },

  // Erfurt Stadtteile
  {
    slug: "erfurt-altstadt",
    name: "Altstadt",
    type: "stadtteil",
    parentSlug: "erfurt",
    plz: ["99084"],
    priority: 8
  },
  {
    slug: "erfurt-loebervorstadt",
    name: "Löbervorstadt",
    type: "stadtteil",
    parentSlug: "erfurt",
    plz: ["99096"],
    priority: 7
  },

  // =====================================================
  // WEITERE STÄDTE IN BADEN-WÜRTTEMBERG
  // =====================================================
  {
    slug: "freiburg",
    name: "Freiburg im Breisgau",
    type: "kreisfreie-stadt",
    parentSlug: "baden-wuerttemberg",
    population: 230000,
    coordinates: { lat: 47.9990, lng: 7.8421 },
    plz: ["79098", "79100", "79102", "79104", "79106", "79108", "79110", "79111", "79112", "79114", "79115", "79117"],
    priority: 8
  },
  {
    slug: "heidelberg",
    name: "Heidelberg",
    type: "kreisfreie-stadt",
    parentSlug: "baden-wuerttemberg",
    population: 160000,
    coordinates: { lat: 49.3988, lng: 8.6724 },
    plz: ["69115", "69117", "69118", "69120", "69121", "69123", "69124", "69126"],
    priority: 8
  },
  {
    slug: "heilbronn",
    name: "Heilbronn",
    type: "kreisfreie-stadt",
    parentSlug: "baden-wuerttemberg",
    population: 126000,
    coordinates: { lat: 49.1427, lng: 9.2109 },
    plz: ["74072", "74074", "74076", "74078", "74080", "74081"],
    priority: 7
  },
  {
    slug: "ulm",
    name: "Ulm",
    type: "kreisfreie-stadt",
    parentSlug: "baden-wuerttemberg",
    population: 126000,
    coordinates: { lat: 48.4011, lng: 9.9876 },
    plz: ["89073", "89075", "89077", "89079", "89081"],
    priority: 7
  },
  {
    slug: "pforzheim",
    name: "Pforzheim",
    type: "kreisfreie-stadt",
    parentSlug: "baden-wuerttemberg",
    population: 125000,
    coordinates: { lat: 48.8922, lng: 8.6947 },
    plz: ["75172", "75173", "75175", "75177", "75179", "75180", "75181"],
    priority: 7
  },
  {
    slug: "reutlingen",
    name: "Reutlingen",
    type: "kreisfreie-stadt",
    parentSlug: "baden-wuerttemberg",
    population: 116000,
    coordinates: { lat: 48.4928, lng: 9.2108 },
    plz: ["72760", "72762", "72764", "72766", "72768", "72770"],
    priority: 7
  },

  // Freiburg Stadtteile
  {
    slug: "freiburg-altstadt",
    name: "Altstadt",
    type: "stadtteil",
    parentSlug: "freiburg",
    plz: ["79098"],
    priority: 8
  },
  {
    slug: "freiburg-wiehre",
    name: "Wiehre",
    type: "stadtteil",
    parentSlug: "freiburg",
    plz: ["79100", "79102"],
    priority: 7
  },

  // Heidelberg Stadtteile
  {
    slug: "heidelberg-altstadt",
    name: "Altstadt",
    type: "stadtteil",
    parentSlug: "heidelberg",
    plz: ["69117"],
    priority: 8
  },
  {
    slug: "heidelberg-neuenheim",
    name: "Neuenheim",
    type: "stadtteil",
    parentSlug: "heidelberg",
    plz: ["69120"],
    priority: 7
  },

  // =====================================================
  // WEITERE STÄDTE IN BAYERN
  // =====================================================
  {
    slug: "regensburg",
    name: "Regensburg",
    type: "kreisfreie-stadt",
    parentSlug: "oberpfalz",
    population: 152000,
    coordinates: { lat: 49.0134, lng: 12.1016 },
    plz: ["93047", "93049", "93051", "93053", "93055", "93057", "93059"],
    priority: 8
  },
  {
    slug: "ingolstadt",
    name: "Ingolstadt",
    type: "kreisfreie-stadt",
    parentSlug: "oberbayern",
    population: 138000,
    coordinates: { lat: 48.7665, lng: 11.4258 },
    plz: ["85049", "85051", "85053", "85055", "85057"],
    priority: 7
  },
  {
    slug: "wuerzburg",
    name: "Würzburg",
    type: "kreisfreie-stadt",
    parentSlug: "unterfranken",
    population: 128000,
    coordinates: { lat: 49.7913, lng: 9.9534 },
    plz: ["97070", "97072", "97074", "97076", "97078", "97080", "97082", "97084"],
    priority: 8
  },
  {
    slug: "fuerth",
    name: "Fürth",
    type: "kreisfreie-stadt",
    parentSlug: "mittelfranken",
    population: 128000,
    coordinates: { lat: 49.4774, lng: 10.9886 },
    plz: ["90762", "90763", "90765", "90766", "90768"],
    priority: 7
  },
  {
    slug: "erlangen",
    name: "Erlangen",
    type: "kreisfreie-stadt",
    parentSlug: "mittelfranken",
    population: 112000,
    coordinates: { lat: 49.5897, lng: 11.0078 },
    plz: ["91052", "91054", "91056", "91058"],
    priority: 7
  },
  {
    slug: "bamberg",
    name: "Bamberg",
    type: "kreisfreie-stadt",
    parentSlug: "oberfranken",
    population: 77000,
    coordinates: { lat: 49.8988, lng: 10.9028 },
    plz: ["96047", "96049", "96050", "96052"],
    priority: 7
  },
  {
    slug: "bayreuth",
    name: "Bayreuth",
    type: "kreisfreie-stadt",
    parentSlug: "oberfranken",
    population: 74000,
    coordinates: { lat: 49.9456, lng: 11.5713 },
    plz: ["95444", "95445", "95447", "95448"],
    priority: 7
  },
  {
    slug: "landshut",
    name: "Landshut",
    type: "kreisfreie-stadt",
    parentSlug: "niederbayern",
    population: 73000,
    coordinates: { lat: 48.5373, lng: 12.1522 },
    plz: ["84028", "84030", "84032", "84034", "84036"],
    priority: 7
  },
  {
    slug: "aschaffenburg",
    name: "Aschaffenburg",
    type: "kreisfreie-stadt",
    parentSlug: "unterfranken",
    population: 71000,
    coordinates: { lat: 49.9739, lng: 9.1483 },
    plz: ["63739", "63741", "63743"],
    priority: 6
  },
  {
    slug: "kempten",
    name: "Kempten (Allgäu)",
    type: "kreisfreie-stadt",
    parentSlug: "schwaben",
    population: 69000,
    coordinates: { lat: 47.7267, lng: 10.3168 },
    plz: ["87435", "87437", "87439"],
    priority: 6
  },
  {
    slug: "rosenheim",
    name: "Rosenheim",
    type: "kreisfreie-stadt",
    parentSlug: "oberbayern",
    population: 64000,
    coordinates: { lat: 47.8571, lng: 12.1181 },
    plz: ["83022", "83024", "83026"],
    priority: 6
  },
  {
    slug: "passau",
    name: "Passau",
    type: "kreisfreie-stadt",
    parentSlug: "niederbayern",
    population: 53000,
    coordinates: { lat: 48.5748, lng: 13.4606 },
    plz: ["94032", "94034", "94036"],
    priority: 6
  },

  // Regensburg Stadtteile
  {
    slug: "regensburg-altstadt",
    name: "Altstadt",
    type: "stadtteil",
    parentSlug: "regensburg",
    plz: ["93047"],
    priority: 8
  },
  {
    slug: "regensburg-kasernenviertel",
    name: "Kasernenviertel",
    type: "stadtteil",
    parentSlug: "regensburg",
    plz: ["93051"],
    priority: 7
  },

  // Würzburg Stadtteile
  {
    slug: "wuerzburg-altstadt",
    name: "Altstadt",
    type: "stadtteil",
    parentSlug: "wuerzburg",
    plz: ["97070"],
    priority: 8
  },
  {
    slug: "wuerzburg-sanderau",
    name: "Sanderau",
    type: "stadtteil",
    parentSlug: "wuerzburg",
    plz: ["97072"],
    priority: 7
  },

  // =====================================================
  // WEITERE STÄDTE IN NIEDERSACHSEN
  // =====================================================
  {
    slug: "braunschweig",
    name: "Braunschweig",
    type: "kreisfreie-stadt",
    parentSlug: "niedersachsen",
    population: 249000,
    coordinates: { lat: 52.2689, lng: 10.5268 },
    plz: ["38100", "38102", "38104", "38106", "38108", "38110", "38112", "38114", "38116", "38118", "38120", "38122", "38124", "38126"],
    priority: 8
  },
  {
    slug: "oldenburg",
    name: "Oldenburg",
    type: "kreisfreie-stadt",
    parentSlug: "niedersachsen",
    population: 170000,
    coordinates: { lat: 53.1435, lng: 8.2146 },
    plz: ["26121", "26122", "26123", "26125", "26127", "26129", "26131", "26133", "26135"],
    priority: 8
  },
  {
    slug: "osnabrueck",
    name: "Osnabrück",
    type: "kreisfreie-stadt",
    parentSlug: "niedersachsen",
    population: 165000,
    coordinates: { lat: 52.2799, lng: 8.0472 },
    plz: ["49074", "49076", "49078", "49080", "49082", "49084", "49086"],
    priority: 8
  },
  {
    slug: "wolfsburg",
    name: "Wolfsburg",
    type: "kreisfreie-stadt",
    parentSlug: "niedersachsen",
    population: 125000,
    coordinates: { lat: 52.4227, lng: 10.7865 },
    plz: ["38440", "38442", "38444", "38446", "38448"],
    priority: 7
  },
  {
    slug: "goettingen",
    name: "Göttingen",
    type: "kreisfreie-stadt",
    parentSlug: "niedersachsen",
    population: 120000,
    coordinates: { lat: 51.5328, lng: 9.9352 },
    plz: ["37073", "37075", "37077", "37079", "37081", "37083", "37085"],
    priority: 7
  },
  {
    slug: "salzgitter",
    name: "Salzgitter",
    type: "kreisfreie-stadt",
    parentSlug: "niedersachsen",
    population: 105000,
    coordinates: { lat: 52.1508, lng: 10.3314 },
    plz: ["38226", "38228", "38229", "38239"],
    priority: 6
  },
  {
    slug: "hildesheim",
    name: "Hildesheim",
    type: "kreisfreie-stadt",
    parentSlug: "niedersachsen",
    population: 101000,
    coordinates: { lat: 52.1508, lng: 9.9510 },
    plz: ["31134", "31135", "31137", "31139", "31141"],
    priority: 7
  },
  {
    slug: "delmenhorst",
    name: "Delmenhorst",
    type: "kreisfreie-stadt",
    parentSlug: "niedersachsen",
    population: 77000,
    coordinates: { lat: 53.0510, lng: 8.6317 },
    plz: ["27749", "27751", "27753", "27755"],
    priority: 6
  },
  {
    slug: "wilhelmshaven",
    name: "Wilhelmshaven",
    type: "kreisfreie-stadt",
    parentSlug: "niedersachsen",
    population: 76000,
    coordinates: { lat: 53.5308, lng: 8.1069 },
    plz: ["26382", "26384", "26386", "26388", "26389"],
    priority: 6
  },

  // Braunschweig Stadtteile
  {
    slug: "braunschweig-innenstadt",
    name: "Innenstadt",
    type: "stadtteil",
    parentSlug: "braunschweig",
    plz: ["38100"],
    priority: 8
  },
  {
    slug: "braunschweig-westliches-ringgebiet",
    name: "Westliches Ringgebiet",
    type: "stadtteil",
    parentSlug: "braunschweig",
    plz: ["38118"],
    priority: 7
  },

  // Oldenburg Stadtteile
  {
    slug: "oldenburg-innenstadt",
    name: "Innenstadt",
    type: "stadtteil",
    parentSlug: "oldenburg",
    plz: ["26122"],
    priority: 8
  },
  {
    slug: "oldenburg-donnerschwee",
    name: "Donnerschwee",
    type: "stadtteil",
    parentSlug: "oldenburg",
    plz: ["26123"],
    priority: 7
  },

  // =====================================================
  // WEITERE STÄDTE IN HESSEN
  // =====================================================
  {
    slug: "kassel",
    name: "Kassel",
    type: "kreisfreie-stadt",
    parentSlug: "hessen",
    population: 202000,
    coordinates: { lat: 51.3127, lng: 9.4797 },
    plz: ["34117", "34119", "34121", "34123", "34125", "34127", "34128", "34130", "34131", "34132", "34134"],
    priority: 8
  },
  {
    slug: "darmstadt",
    name: "Darmstadt",
    type: "kreisfreie-stadt",
    parentSlug: "hessen",
    population: 159000,
    coordinates: { lat: 49.8728, lng: 8.6512 },
    plz: ["64283", "64285", "64287", "64289", "64291", "64293", "64295", "64297"],
    priority: 8
  },
  {
    slug: "offenbach",
    name: "Offenbach am Main",
    type: "kreisfreie-stadt",
    parentSlug: "hessen",
    population: 130000,
    coordinates: { lat: 50.0956, lng: 8.7761 },
    plz: ["63065", "63067", "63069", "63071", "63073", "63075"],
    priority: 7
  },
  {
    slug: "giessen",
    name: "Gießen",
    type: "kreisfreie-stadt",
    parentSlug: "hessen",
    population: 90000,
    coordinates: { lat: 50.5840, lng: 8.6784 },
    plz: ["35390", "35392", "35394", "35396"],
    priority: 7
  },
  {
    slug: "marburg",
    name: "Marburg",
    type: "kreisfreie-stadt",
    parentSlug: "hessen",
    population: 77000,
    coordinates: { lat: 50.8095, lng: 8.7710 },
    plz: ["35037", "35039", "35041", "35043"],
    priority: 7
  },
  {
    slug: "fulda",
    name: "Fulda",
    type: "kreisfreie-stadt",
    parentSlug: "hessen",
    population: 68000,
    coordinates: { lat: 50.5528, lng: 9.6778 },
    plz: ["36037", "36039", "36041", "36043"],
    priority: 6
  },
  {
    slug: "hanau",
    name: "Hanau",
    type: "kreisfreie-stadt",
    parentSlug: "hessen",
    population: 97000,
    coordinates: { lat: 50.1268, lng: 8.9170 },
    plz: ["63450", "63452", "63454", "63456", "63457"],
    priority: 7
  },

  // Kassel Stadtteile
  {
    slug: "kassel-mitte",
    name: "Mitte",
    type: "stadtteil",
    parentSlug: "kassel",
    plz: ["34117", "34119"],
    priority: 8
  },
  {
    slug: "kassel-vorderer-westen",
    name: "Vorderer Westen",
    type: "stadtteil",
    parentSlug: "kassel",
    plz: ["34119"],
    priority: 7
  },

  // Darmstadt Stadtteile
  {
    slug: "darmstadt-mitte",
    name: "Mitte",
    type: "stadtteil",
    parentSlug: "darmstadt",
    plz: ["64283"],
    priority: 8
  },
  {
    slug: "darmstadt-bessungen",
    name: "Bessungen",
    type: "stadtteil",
    parentSlug: "darmstadt",
    plz: ["64285"],
    priority: 7
  },

  // =====================================================
  // WEITERE STÄDTE IN NRW
  // =====================================================
  {
    slug: "gelsenkirchen",
    name: "Gelsenkirchen",
    type: "kreisfreie-stadt",
    parentSlug: "muenster-bezirk",
    population: 260000,
    coordinates: { lat: 51.5177, lng: 7.0857 },
    plz: ["45879", "45881", "45883", "45884", "45886", "45888", "45889", "45891", "45892", "45894", "45896", "45897"],
    priority: 8
  },
  {
    slug: "moenchengladbach",
    name: "Mönchengladbach",
    type: "kreisfreie-stadt",
    parentSlug: "duesseldorf-bezirk",
    population: 261000,
    coordinates: { lat: 51.1805, lng: 6.4428 },
    plz: ["41061", "41063", "41065", "41066", "41068", "41069", "41169", "41179", "41189", "41199", "41236", "41238", "41239"],
    priority: 8
  },
  {
    slug: "krefeld",
    name: "Krefeld",
    type: "kreisfreie-stadt",
    parentSlug: "duesseldorf-bezirk",
    population: 227000,
    coordinates: { lat: 51.3388, lng: 6.5853 },
    plz: ["47798", "47799", "47800", "47802", "47803", "47804", "47805", "47807", "47809"],
    priority: 8
  },
  {
    slug: "oberhausen",
    name: "Oberhausen",
    type: "kreisfreie-stadt",
    parentSlug: "duesseldorf-bezirk",
    population: 210000,
    coordinates: { lat: 51.4698, lng: 6.8514 },
    plz: ["46045", "46047", "46049", "46117", "46119", "46145", "46147", "46149"],
    priority: 8
  },
  {
    slug: "hagen",
    name: "Hagen",
    type: "kreisfreie-stadt",
    parentSlug: "arnsberg-bezirk",
    population: 189000,
    coordinates: { lat: 51.3671, lng: 7.4633 },
    plz: ["58089", "58091", "58093", "58095", "58097", "58099", "58119", "58135"],
    priority: 7
  },
  {
    slug: "hamm",
    name: "Hamm",
    type: "kreisfreie-stadt",
    parentSlug: "arnsberg-bezirk",
    population: 179000,
    coordinates: { lat: 51.6739, lng: 7.8159 },
    plz: ["59063", "59065", "59067", "59069", "59071", "59073", "59075", "59077"],
    priority: 7
  },
  {
    slug: "muelheim-ruhr",
    name: "Mülheim an der Ruhr",
    type: "kreisfreie-stadt",
    parentSlug: "duesseldorf-bezirk",
    population: 171000,
    coordinates: { lat: 51.4322, lng: 6.8782 },
    plz: ["45468", "45470", "45472", "45473", "45475", "45476", "45478", "45479", "45481"],
    priority: 7
  },
  {
    slug: "herne",
    name: "Herne",
    type: "kreisfreie-stadt",
    parentSlug: "arnsberg-bezirk",
    population: 156000,
    coordinates: { lat: 51.5369, lng: 7.2009 },
    plz: ["44623", "44625", "44627", "44628", "44629", "44649", "44651", "44652", "44653"],
    priority: 7
  },
  {
    slug: "solingen",
    name: "Solingen",
    type: "kreisfreie-stadt",
    parentSlug: "duesseldorf-bezirk",
    population: 159000,
    coordinates: { lat: 51.1652, lng: 7.0671 },
    plz: ["42651", "42653", "42655", "42657", "42659", "42697", "42699"],
    priority: 7
  },
  {
    slug: "leverkusen",
    name: "Leverkusen",
    type: "kreisfreie-stadt",
    parentSlug: "koeln-bezirk",
    population: 163000,
    coordinates: { lat: 51.0459, lng: 6.9844 },
    plz: ["51371", "51373", "51375", "51377", "51379", "51381"],
    priority: 7
  },
  {
    slug: "neuss",
    name: "Neuss",
    type: "kreisfreie-stadt",
    parentSlug: "duesseldorf-bezirk",
    population: 153000,
    coordinates: { lat: 51.2042, lng: 6.6879 },
    plz: ["41460", "41462", "41464", "41466", "41468", "41469", "41470", "41472"],
    priority: 7
  },
  {
    slug: "paderborn",
    name: "Paderborn",
    type: "kreisfreie-stadt",
    parentSlug: "detmold-bezirk",
    population: 151000,
    coordinates: { lat: 51.7189, lng: 8.7575 },
    plz: ["33098", "33100", "33102", "33104", "33106"],
    priority: 7
  },
  {
    slug: "recklinghausen",
    name: "Recklinghausen",
    type: "kreisfreie-stadt",
    parentSlug: "muenster-bezirk",
    population: 111000,
    coordinates: { lat: 51.6141, lng: 7.1979 },
    plz: ["45657", "45659", "45661", "45663", "45665"],
    priority: 7
  },
  {
    slug: "bottrop",
    name: "Bottrop",
    type: "kreisfreie-stadt",
    parentSlug: "muenster-bezirk",
    population: 117000,
    coordinates: { lat: 51.5243, lng: 6.9286 },
    plz: ["46236", "46238", "46240", "46242", "46244"],
    priority: 6
  },
  {
    slug: "remscheid",
    name: "Remscheid",
    type: "kreisfreie-stadt",
    parentSlug: "duesseldorf-bezirk",
    population: 111000,
    coordinates: { lat: 51.1787, lng: 7.1896 },
    plz: ["42853", "42855", "42857", "42859"],
    priority: 6
  },
  {
    slug: "siegen",
    name: "Siegen",
    type: "kreisfreie-stadt",
    parentSlug: "arnsberg-bezirk",
    population: 102000,
    coordinates: { lat: 50.8748, lng: 8.0243 },
    plz: ["57072", "57074", "57076", "57078", "57080"],
    priority: 7
  },

  // Gelsenkirchen Stadtteile
  {
    slug: "gelsenkirchen-altstadt",
    name: "Altstadt",
    type: "stadtteil",
    parentSlug: "gelsenkirchen",
    plz: ["45879"],
    priority: 7
  },
  {
    slug: "gelsenkirchen-buer",
    name: "Buer",
    type: "stadtteil",
    parentSlug: "gelsenkirchen",
    plz: ["45894", "45896"],
    priority: 7
  },

  // Mönchengladbach Stadtteile
  {
    slug: "moenchengladbach-stadtmitte",
    name: "Stadtmitte",
    type: "stadtteil",
    parentSlug: "moenchengladbach",
    plz: ["41061"],
    priority: 7
  },
  {
    slug: "moenchengladbach-rheydt",
    name: "Rheydt",
    type: "stadtteil",
    parentSlug: "moenchengladbach",
    plz: ["41236"],
    priority: 7
  },

  // =====================================================
  // WEITERE STÄDTE IN SACHSEN
  // =====================================================
  {
    slug: "chemnitz",
    name: "Chemnitz",
    type: "kreisfreie-stadt",
    parentSlug: "sachsen",
    population: 246000,
    coordinates: { lat: 50.8278, lng: 12.9214 },
    plz: ["09111", "09112", "09113", "09114", "09116", "09117", "09119", "09120", "09122", "09123", "09125", "09126", "09127", "09128", "09130", "09131"],
    priority: 8
  },
  {
    slug: "zwickau",
    name: "Zwickau",
    type: "kreisfreie-stadt",
    parentSlug: "sachsen",
    population: 88000,
    coordinates: { lat: 50.7189, lng: 12.4963 },
    plz: ["08056", "08058", "08060", "08062", "08064", "08066"],
    priority: 7
  },
  {
    slug: "plauen",
    name: "Plauen",
    type: "kreisfreie-stadt",
    parentSlug: "sachsen",
    population: 65000,
    coordinates: { lat: 50.4935, lng: 12.1341 },
    plz: ["08523", "08525", "08527", "08529"],
    priority: 6
  },
  {
    slug: "goerlitz",
    name: "Görlitz",
    type: "kreisfreie-stadt",
    parentSlug: "sachsen",
    population: 56000,
    coordinates: { lat: 51.1528, lng: 14.9872 },
    plz: ["02826", "02827", "02828"],
    priority: 6
  },
  {
    slug: "freiberg",
    name: "Freiberg",
    type: "kreisfreie-stadt",
    parentSlug: "sachsen",
    population: 41000,
    coordinates: { lat: 50.9119, lng: 13.3428 },
    plz: ["09599"],
    priority: 5
  },
  {
    slug: "bautzen",
    name: "Bautzen",
    type: "kreisfreie-stadt",
    parentSlug: "sachsen",
    population: 39000,
    coordinates: { lat: 51.1814, lng: 14.4244 },
    plz: ["02625"],
    priority: 5
  },

  // Chemnitz Stadtteile
  {
    slug: "chemnitz-zentrum",
    name: "Zentrum",
    type: "stadtteil",
    parentSlug: "chemnitz",
    plz: ["09111"],
    priority: 8
  },
  {
    slug: "chemnitz-kasberg",
    name: "Kaßberg",
    type: "stadtteil",
    parentSlug: "chemnitz",
    plz: ["09112"],
    priority: 7
  },

  // =====================================================
  // BREMEN - Stadtteile
  // =====================================================
  {
    slug: "bremen-mitte",
    name: "Mitte",
    type: "stadtteil",
    parentSlug: "bremen-stadt",
    plz: ["28195"],
    priority: 8
  },
  {
    slug: "bremen-neustadt",
    name: "Neustadt",
    type: "stadtteil",
    parentSlug: "bremen-stadt",
    plz: ["28199", "28201"],
    priority: 7
  },
  {
    slug: "bremen-oesterholz-tenever",
    name: "Osterholz-Tenever",
    type: "stadtteil",
    parentSlug: "bremen-stadt",
    plz: ["28325"],
    priority: 6
  },
  {
    slug: "bremen-viertel",
    name: "Viertel",
    type: "stadtteil",
    parentSlug: "bremen-stadt",
    plz: ["28203"],
    priority: 7
  },
  {
    slug: "bremerhaven",
    name: "Bremerhaven",
    type: "kreisfreie-stadt",
    parentSlug: "bremen",
    population: 113000,
    coordinates: { lat: 53.5396, lng: 8.5809 },
    plz: ["27568", "27570", "27572", "27574", "27576", "27578", "27580"],
    priority: 7
  },

  // =====================================================
  // WEITERE REGIERUNGSBEZIRKE - BADEN-WÜRTTEMBERG
  // =====================================================
  {
    slug: "stuttgart-bezirk",
    name: "Regierungsbezirk Stuttgart",
    type: "regierungsbezirk",
    parentSlug: "baden-wuerttemberg",
    priority: 9
  },
  {
    slug: "karlsruhe-bezirk",
    name: "Regierungsbezirk Karlsruhe",
    type: "regierungsbezirk",
    parentSlug: "baden-wuerttemberg",
    priority: 8
  },
  {
    slug: "freiburg-bezirk",
    name: "Regierungsbezirk Freiburg",
    type: "regierungsbezirk",
    parentSlug: "baden-wuerttemberg",
    priority: 8
  },
  {
    slug: "tuebingen-bezirk",
    name: "Regierungsbezirk Tübingen",
    type: "regierungsbezirk",
    parentSlug: "baden-wuerttemberg",
    priority: 7
  },

  // =====================================================
  // WEITERE REGIERUNGSBEZIRKE - HESSEN
  // =====================================================
  {
    slug: "darmstadt-bezirk",
    name: "Regierungsbezirk Darmstadt",
    type: "regierungsbezirk",
    parentSlug: "hessen",
    priority: 9
  },
  {
    slug: "giessen-bezirk",
    name: "Regierungsbezirk Gießen",
    type: "regierungsbezirk",
    parentSlug: "hessen",
    priority: 7
  },
  {
    slug: "kassel-bezirk",
    name: "Regierungsbezirk Kassel",
    type: "regierungsbezirk",
    parentSlug: "hessen",
    priority: 7
  },

  // =====================================================
  // FEHLENDE KREISFREIE STÄDTE - BAYERN
  // =====================================================
  {
    slug: "hof",
    name: "Hof",
    type: "kreisfreie-stadt",
    parentSlug: "oberfranken",
    population: 45000,
    coordinates: { lat: 50.3135, lng: 11.9128 },
    plz: ["95028", "95030", "95032"],
    priority: 6
  },
  {
    slug: "schweinfurt",
    name: "Schweinfurt",
    type: "kreisfreie-stadt",
    parentSlug: "unterfranken",
    population: 54000,
    coordinates: { lat: 50.0492, lng: 10.2268 },
    plz: ["97421", "97422", "97424"],
    priority: 6
  },
  {
    slug: "straubing",
    name: "Straubing",
    type: "kreisfreie-stadt",
    parentSlug: "niederbayern",
    population: 48000,
    coordinates: { lat: 48.8777, lng: 12.5731 },
    plz: ["94315"],
    priority: 6
  },
  {
    slug: "amberg",
    name: "Amberg",
    type: "kreisfreie-stadt",
    parentSlug: "oberpfalz",
    population: 42000,
    coordinates: { lat: 49.4443, lng: 11.8635 },
    plz: ["92224"],
    priority: 5
  },
  {
    slug: "coburg",
    name: "Coburg",
    type: "kreisfreie-stadt",
    parentSlug: "oberfranken",
    population: 41000,
    coordinates: { lat: 50.2612, lng: 10.9627 },
    plz: ["96450"],
    priority: 6
  },
  {
    slug: "kaufbeuren",
    name: "Kaufbeuren",
    type: "kreisfreie-stadt",
    parentSlug: "schwaben",
    population: 45000,
    coordinates: { lat: 47.8804, lng: 10.6222 },
    plz: ["87600"],
    priority: 5
  },
  {
    slug: "memmingen",
    name: "Memmingen",
    type: "kreisfreie-stadt",
    parentSlug: "schwaben",
    population: 44000,
    coordinates: { lat: 47.9838, lng: 10.1807 },
    plz: ["87700"],
    priority: 5
  },
  {
    slug: "schwabach",
    name: "Schwabach",
    type: "kreisfreie-stadt",
    parentSlug: "mittelfranken",
    population: 41000,
    coordinates: { lat: 49.3297, lng: 11.0233 },
    plz: ["91126"],
    priority: 5
  },
  {
    slug: "weiden",
    name: "Weiden in der Oberpfalz",
    type: "kreisfreie-stadt",
    parentSlug: "oberpfalz",
    population: 43000,
    coordinates: { lat: 49.6764, lng: 12.1628 },
    plz: ["92637"],
    priority: 5
  },
  {
    slug: "ansbach",
    name: "Ansbach",
    type: "kreisfreie-stadt",
    parentSlug: "mittelfranken",
    population: 42000,
    coordinates: { lat: 49.3006, lng: 10.5719 },
    plz: ["91522"],
    priority: 5
  },
  {
    slug: "neu-ulm",
    name: "Neu-Ulm",
    type: "gemeinde",
    parentSlug: "schwaben",
    population: 60000,
    coordinates: { lat: 48.3933, lng: 10.0125 },
    plz: ["89231"],
    priority: 6
  },
  {
    slug: "freising",
    name: "Freising",
    type: "gemeinde",
    parentSlug: "oberbayern",
    population: 50000,
    coordinates: { lat: 48.4028, lng: 11.7489 },
    plz: ["85354"],
    priority: 6
  },
  {
    slug: "dachau",
    name: "Dachau",
    type: "gemeinde",
    parentSlug: "oberbayern",
    population: 48000,
    coordinates: { lat: 48.2603, lng: 11.4340 },
    plz: ["85221"],
    priority: 6
  },
  {
    slug: "fuerstenfeldbruck",
    name: "Fürstenfeldbruck",
    type: "gemeinde",
    parentSlug: "oberbayern",
    population: 37000,
    coordinates: { lat: 48.1789, lng: 11.2553 },
    plz: ["82256"],
    priority: 5
  },
  {
    slug: "starnberg",
    name: "Starnberg",
    type: "gemeinde",
    parentSlug: "oberbayern",
    population: 24000,
    coordinates: { lat: 47.9972, lng: 11.3403 },
    plz: ["82319"],
    priority: 5
  },
  {
    slug: "erding",
    name: "Erding",
    type: "gemeinde",
    parentSlug: "oberbayern",
    population: 37000,
    coordinates: { lat: 48.3064, lng: 11.9069 },
    plz: ["85435"],
    priority: 5
  },
  {
    slug: "traunstein",
    name: "Traunstein",
    type: "gemeinde",
    parentSlug: "oberbayern",
    population: 22000,
    coordinates: { lat: 47.8681, lng: 12.6436 },
    plz: ["83278"],
    priority: 5
  },
  {
    slug: "garmisch-partenkirchen",
    name: "Garmisch-Partenkirchen",
    type: "gemeinde",
    parentSlug: "oberbayern",
    population: 27000,
    coordinates: { lat: 47.5000, lng: 11.0958 },
    plz: ["82467"],
    priority: 6
  },
  {
    slug: "deggendorf",
    name: "Deggendorf",
    type: "gemeinde",
    parentSlug: "niederbayern",
    population: 35000,
    coordinates: { lat: 48.8403, lng: 12.9603 },
    plz: ["94469"],
    priority: 5
  },

  // =====================================================
  // FEHLENDE KREISFREIE STÄDTE - BADEN-WÜRTTEMBERG
  // =====================================================
  {
    slug: "baden-baden",
    name: "Baden-Baden",
    type: "kreisfreie-stadt",
    parentSlug: "karlsruhe-bezirk",
    population: 55000,
    coordinates: { lat: 48.7606, lng: 8.2408 },
    plz: ["76530", "76532", "76534"],
    priority: 6
  },
  {
    slug: "tuebingen",
    name: "Tübingen",
    type: "gemeinde",
    parentSlug: "tuebingen-bezirk",
    population: 91000,
    coordinates: { lat: 48.5216, lng: 9.0576 },
    plz: ["72070", "72072", "72074", "72076"],
    priority: 7
  },
  {
    slug: "konstanz",
    name: "Konstanz",
    type: "gemeinde",
    parentSlug: "freiburg-bezirk",
    population: 85000,
    coordinates: { lat: 47.6633, lng: 9.1753 },
    plz: ["78462", "78464", "78465", "78467"],
    priority: 7
  },
  {
    slug: "sindelfingen",
    name: "Sindelfingen",
    type: "gemeinde",
    parentSlug: "stuttgart-bezirk",
    population: 64000,
    coordinates: { lat: 48.7131, lng: 9.0028 },
    plz: ["71063", "71065", "71067", "71069"],
    priority: 6
  },
  {
    slug: "ludwigsburg",
    name: "Ludwigsburg",
    type: "gemeinde",
    parentSlug: "stuttgart-bezirk",
    population: 93000,
    coordinates: { lat: 48.8975, lng: 9.1922 },
    plz: ["71634", "71636", "71638", "71640", "71642"],
    priority: 7
  },
  {
    slug: "esslingen",
    name: "Esslingen am Neckar",
    type: "gemeinde",
    parentSlug: "stuttgart-bezirk",
    population: 94000,
    coordinates: { lat: 48.7394, lng: 9.3108 },
    plz: ["73728", "73730", "73732", "73733", "73734"],
    priority: 7
  },
  {
    slug: "goeppingen",
    name: "Göppingen",
    type: "gemeinde",
    parentSlug: "stuttgart-bezirk",
    population: 58000,
    coordinates: { lat: 48.7025, lng: 9.6528 },
    plz: ["73033"],
    priority: 6
  },
  {
    slug: "waiblingen",
    name: "Waiblingen",
    type: "gemeinde",
    parentSlug: "stuttgart-bezirk",
    population: 55000,
    coordinates: { lat: 48.8306, lng: 9.3169 },
    plz: ["71332", "71334", "71336"],
    priority: 6
  },
  {
    slug: "villingen-schwenningen",
    name: "Villingen-Schwenningen",
    type: "gemeinde",
    parentSlug: "freiburg-bezirk",
    population: 86000,
    coordinates: { lat: 48.0622, lng: 8.4936 },
    plz: ["78048", "78050", "78052", "78054"],
    priority: 6
  },
  {
    slug: "offenburg",
    name: "Offenburg",
    type: "gemeinde",
    parentSlug: "freiburg-bezirk",
    population: 62000,
    coordinates: { lat: 48.4711, lng: 7.9403 },
    plz: ["77652", "77654", "77656"],
    priority: 6
  },
  {
    slug: "ravensburg",
    name: "Ravensburg",
    type: "gemeinde",
    parentSlug: "tuebingen-bezirk",
    population: 51000,
    coordinates: { lat: 47.7822, lng: 9.6111 },
    plz: ["88212", "88213", "88214"],
    priority: 6
  },
  {
    slug: "friedrichshafen",
    name: "Friedrichshafen",
    type: "gemeinde",
    parentSlug: "tuebingen-bezirk",
    population: 62000,
    coordinates: { lat: 47.6500, lng: 9.4797 },
    plz: ["88045", "88046", "88048"],
    priority: 6
  },
  {
    slug: "aalen",
    name: "Aalen",
    type: "gemeinde",
    parentSlug: "stuttgart-bezirk",
    population: 68000,
    coordinates: { lat: 48.8375, lng: 10.0933 },
    plz: ["73430", "73431", "73432", "73433", "73434"],
    priority: 6
  },
  {
    slug: "schwäbisch-gmuend",
    name: "Schwäbisch Gmünd",
    type: "gemeinde",
    parentSlug: "stuttgart-bezirk",
    population: 61000,
    coordinates: { lat: 48.7992, lng: 9.7981 },
    plz: ["73525", "73527", "73529"],
    priority: 6
  },
  {
    slug: "loerrach",
    name: "Lörrach",
    type: "gemeinde",
    parentSlug: "freiburg-bezirk",
    population: 50000,
    coordinates: { lat: 47.6153, lng: 7.6614 },
    plz: ["79539", "79540", "79541"],
    priority: 5
  },

  // =====================================================
  // FEHLENDE KREISFREIE STÄDTE - NIEDERSACHSEN
  // =====================================================
  {
    slug: "emden",
    name: "Emden",
    type: "kreisfreie-stadt",
    parentSlug: "niedersachsen",
    population: 50000,
    coordinates: { lat: 53.3669, lng: 7.2058 },
    plz: ["26721", "26723", "26725"],
    priority: 6
  },
  {
    slug: "celle",
    name: "Celle",
    type: "gemeinde",
    parentSlug: "niedersachsen",
    population: 70000,
    coordinates: { lat: 52.6256, lng: 10.0806 },
    plz: ["29221", "29223", "29225", "29227", "29229"],
    priority: 6
  },
  {
    slug: "lueneburg",
    name: "Lüneburg",
    type: "gemeinde",
    parentSlug: "niedersachsen",
    population: 77000,
    coordinates: { lat: 53.2464, lng: 10.4117 },
    plz: ["21335", "21337", "21339"],
    priority: 6
  },
  {
    slug: "cuxhaven",
    name: "Cuxhaven",
    type: "gemeinde",
    parentSlug: "niedersachsen",
    population: 48000,
    coordinates: { lat: 53.8617, lng: 8.6947 },
    plz: ["27472", "27474", "27476", "27478"],
    priority: 5
  },
  {
    slug: "hameln",
    name: "Hameln",
    type: "gemeinde",
    parentSlug: "niedersachsen",
    population: 57000,
    coordinates: { lat: 52.1039, lng: 9.3569 },
    plz: ["31785", "31787", "31789"],
    priority: 5
  },
  {
    slug: "lingen",
    name: "Lingen (Ems)",
    type: "gemeinde",
    parentSlug: "niedersachsen",
    population: 56000,
    coordinates: { lat: 52.5231, lng: 7.3169 },
    plz: ["49808", "49809"],
    priority: 5
  },
  {
    slug: "nordhorn",
    name: "Nordhorn",
    type: "gemeinde",
    parentSlug: "niedersachsen",
    population: 54000,
    coordinates: { lat: 52.4369, lng: 7.0672 },
    plz: ["48527", "48529", "48531"],
    priority: 5
  },
  {
    slug: "goslar",
    name: "Goslar",
    type: "gemeinde",
    parentSlug: "niedersachsen",
    population: 50000,
    coordinates: { lat: 51.9061, lng: 10.4289 },
    plz: ["38640", "38642", "38644"],
    priority: 5
  },
  {
    slug: "wolfenbuettel",
    name: "Wolfenbüttel",
    type: "gemeinde",
    parentSlug: "niedersachsen",
    population: 52000,
    coordinates: { lat: 52.1639, lng: 10.5369 },
    plz: ["38300", "38302", "38304"],
    priority: 5
  },
  {
    slug: "peine",
    name: "Peine",
    type: "gemeinde",
    parentSlug: "niedersachsen",
    population: 50000,
    coordinates: { lat: 52.3208, lng: 10.2361 },
    plz: ["31224", "31226", "31228"],
    priority: 5
  },

  // =====================================================
  // FEHLENDE KREISFREIE STÄDTE - RHEINLAND-PFALZ
  // =====================================================
  {
    slug: "frankenthal",
    name: "Frankenthal (Pfalz)",
    type: "kreisfreie-stadt",
    parentSlug: "rheinland-pfalz",
    population: 48000,
    coordinates: { lat: 49.5383, lng: 8.3547 },
    plz: ["67227"],
    priority: 5
  },
  {
    slug: "landau",
    name: "Landau in der Pfalz",
    type: "kreisfreie-stadt",
    parentSlug: "rheinland-pfalz",
    population: 47000,
    coordinates: { lat: 49.1989, lng: 8.1172 },
    plz: ["76829"],
    priority: 5
  },
  {
    slug: "pirmasens",
    name: "Pirmasens",
    type: "kreisfreie-stadt",
    parentSlug: "rheinland-pfalz",
    population: 40000,
    coordinates: { lat: 49.2014, lng: 7.6056 },
    plz: ["66953", "66954", "66955"],
    priority: 5
  },
  {
    slug: "zweibruecken",
    name: "Zweibrücken",
    type: "kreisfreie-stadt",
    parentSlug: "rheinland-pfalz",
    population: 34000,
    coordinates: { lat: 49.2489, lng: 7.3661 },
    plz: ["66482"],
    priority: 5
  },
  {
    slug: "bad-kreuznach",
    name: "Bad Kreuznach",
    type: "gemeinde",
    parentSlug: "rheinland-pfalz",
    population: 51000,
    coordinates: { lat: 49.8406, lng: 7.8672 },
    plz: ["55543", "55545"],
    priority: 5
  },
  {
    slug: "neuwied",
    name: "Neuwied",
    type: "gemeinde",
    parentSlug: "rheinland-pfalz",
    population: 65000,
    coordinates: { lat: 50.4286, lng: 7.4614 },
    plz: ["56564", "56566", "56567"],
    priority: 5
  },
  {
    slug: "andernach",
    name: "Andernach",
    type: "gemeinde",
    parentSlug: "rheinland-pfalz",
    population: 30000,
    coordinates: { lat: 50.4392, lng: 7.4022 },
    plz: ["56626"],
    priority: 4
  },
  {
    slug: "idar-oberstein",
    name: "Idar-Oberstein",
    type: "gemeinde",
    parentSlug: "rheinland-pfalz",
    population: 28000,
    coordinates: { lat: 49.7142, lng: 7.3167 },
    plz: ["55743"],
    priority: 4
  },

  // =====================================================
  // WEITERE STÄDTE - HESSEN
  // =====================================================
  {
    slug: "ruesselsheim",
    name: "Rüsselsheim am Main",
    type: "gemeinde",
    parentSlug: "darmstadt-bezirk",
    population: 66000,
    coordinates: { lat: 49.9950, lng: 8.4114 },
    plz: ["65428"],
    priority: 6
  },
  {
    slug: "bad-homburg",
    name: "Bad Homburg vor der Höhe",
    type: "gemeinde",
    parentSlug: "darmstadt-bezirk",
    population: 55000,
    coordinates: { lat: 50.2297, lng: 8.6181 },
    plz: ["61348", "61350", "61352"],
    priority: 6
  },
  {
    slug: "rodgau",
    name: "Rodgau",
    type: "gemeinde",
    parentSlug: "darmstadt-bezirk",
    population: 46000,
    coordinates: { lat: 50.0261, lng: 8.8853 },
    plz: ["63110"],
    priority: 5
  },
  {
    slug: "dreieich",
    name: "Dreieich",
    type: "gemeinde",
    parentSlug: "darmstadt-bezirk",
    population: 43000,
    coordinates: { lat: 50.0186, lng: 8.6972 },
    plz: ["63303"],
    priority: 5
  },
  {
    slug: "oberursel",
    name: "Oberursel (Taunus)",
    type: "gemeinde",
    parentSlug: "darmstadt-bezirk",
    population: 47000,
    coordinates: { lat: 50.2017, lng: 8.5772 },
    plz: ["61440"],
    priority: 5
  },
  {
    slug: "langen",
    name: "Langen",
    type: "gemeinde",
    parentSlug: "darmstadt-bezirk",
    population: 39000,
    coordinates: { lat: 49.9914, lng: 8.6772 },
    plz: ["63225"],
    priority: 5
  },
  {
    slug: "friedberg",
    name: "Friedberg (Hessen)",
    type: "gemeinde",
    parentSlug: "giessen-bezirk",
    population: 30000,
    coordinates: { lat: 50.3353, lng: 8.7550 },
    plz: ["61169"],
    priority: 5
  },
  {
    slug: "bad-vilbel",
    name: "Bad Vilbel",
    type: "gemeinde",
    parentSlug: "darmstadt-bezirk",
    population: 35000,
    coordinates: { lat: 50.1786, lng: 8.7381 },
    plz: ["61118"],
    priority: 5
  },
  {
    slug: "limburg",
    name: "Limburg an der Lahn",
    type: "gemeinde",
    parentSlug: "giessen-bezirk",
    population: 35000,
    coordinates: { lat: 50.3875, lng: 8.0653 },
    plz: ["65549", "65550", "65551"],
    priority: 5
  },

  // =====================================================
  // WEITERE STÄDTE - NRW
  // =====================================================
  {
    slug: "bergisch-gladbach",
    name: "Bergisch Gladbach",
    type: "gemeinde",
    parentSlug: "koeln-bezirk",
    population: 112000,
    coordinates: { lat: 50.9928, lng: 7.1353 },
    plz: ["51427", "51429", "51465", "51467", "51469"],
    priority: 7
  },
  {
    slug: "moers",
    name: "Moers",
    type: "gemeinde",
    parentSlug: "duesseldorf-bezirk",
    population: 104000,
    coordinates: { lat: 51.4525, lng: 6.6261 },
    plz: ["47441", "47443", "47445", "47447"],
    priority: 6
  },
  {
    slug: "ratingen",
    name: "Ratingen",
    type: "gemeinde",
    parentSlug: "duesseldorf-bezirk",
    population: 87000,
    coordinates: { lat: 51.2972, lng: 6.8494 },
    plz: ["40878", "40880", "40882", "40883", "40884", "40885"],
    priority: 6
  },
  {
    slug: "witten",
    name: "Witten",
    type: "gemeinde",
    parentSlug: "arnsberg-bezirk",
    population: 96000,
    coordinates: { lat: 51.4339, lng: 7.3411 },
    plz: ["58452", "58453", "58454", "58455", "58456"],
    priority: 6
  },
  {
    slug: "iserlohn",
    name: "Iserlohn",
    type: "gemeinde",
    parentSlug: "arnsberg-bezirk",
    population: 93000,
    coordinates: { lat: 51.3744, lng: 7.6947 },
    plz: ["58636", "58638", "58640", "58642", "58644"],
    priority: 6
  },
  {
    slug: "velbert",
    name: "Velbert",
    type: "gemeinde",
    parentSlug: "duesseldorf-bezirk",
    population: 81000,
    coordinates: { lat: 51.3392, lng: 7.0433 },
    plz: ["42549", "42551", "42553", "42555"],
    priority: 6
  },
  {
    slug: "troisdorf",
    name: "Troisdorf",
    type: "gemeinde",
    parentSlug: "koeln-bezirk",
    population: 77000,
    coordinates: { lat: 50.8161, lng: 7.1556 },
    plz: ["53840", "53842", "53844"],
    priority: 5
  },
  {
    slug: "marl",
    name: "Marl",
    type: "gemeinde",
    parentSlug: "muenster-bezirk",
    population: 84000,
    coordinates: { lat: 51.6556, lng: 7.0856 },
    plz: ["45768", "45770", "45772"],
    priority: 5
  },
  {
    slug: "minden",
    name: "Minden",
    type: "gemeinde",
    parentSlug: "detmold-bezirk",
    population: 83000,
    coordinates: { lat: 52.2889, lng: 8.9169 },
    plz: ["32423", "32425", "32427", "32429"],
    priority: 6
  },
  {
    slug: "detmold",
    name: "Detmold",
    type: "gemeinde",
    parentSlug: "detmold-bezirk",
    population: 74000,
    coordinates: { lat: 51.9369, lng: 8.8833 },
    plz: ["32756", "32758", "32760"],
    priority: 6
  },
  {
    slug: "luedenscheid",
    name: "Lüdenscheid",
    type: "gemeinde",
    parentSlug: "arnsberg-bezirk",
    population: 72000,
    coordinates: { lat: 51.2197, lng: 7.6306 },
    plz: ["58507", "58509", "58511", "58513", "58515"],
    priority: 5
  },
  {
    slug: "dorsten",
    name: "Dorsten",
    type: "gemeinde",
    parentSlug: "muenster-bezirk",
    population: 74000,
    coordinates: { lat: 51.6603, lng: 6.9642 },
    plz: ["46282", "46284", "46286"],
    priority: 5
  },
  {
    slug: "gladbeck",
    name: "Gladbeck",
    type: "gemeinde",
    parentSlug: "muenster-bezirk",
    population: 75000,
    coordinates: { lat: 51.5703, lng: 6.9856 },
    plz: ["45964", "45966", "45968"],
    priority: 5
  },
  {
    slug: "castrop-rauxel",
    name: "Castrop-Rauxel",
    type: "gemeinde",
    parentSlug: "arnsberg-bezirk",
    population: 73000,
    coordinates: { lat: 51.5506, lng: 7.3111 },
    plz: ["44575", "44577", "44579", "44581"],
    priority: 5
  },
  {
    slug: "dinslaken",
    name: "Dinslaken",
    type: "gemeinde",
    parentSlug: "duesseldorf-bezirk",
    population: 68000,
    coordinates: { lat: 51.5631, lng: 6.7444 },
    plz: ["46535", "46537", "46539"],
    priority: 5
  },
  {
    slug: "luenen",
    name: "Lünen",
    type: "gemeinde",
    parentSlug: "arnsberg-bezirk",
    population: 85000,
    coordinates: { lat: 51.6167, lng: 7.5264 },
    plz: ["44532", "44534", "44536"],
    priority: 5
  },
  {
    slug: "guetersloh",
    name: "Gütersloh",
    type: "gemeinde",
    parentSlug: "detmold-bezirk",
    population: 101000,
    coordinates: { lat: 51.9069, lng: 8.3847 },
    plz: ["33330", "33332", "33334", "33335"],
    priority: 6
  },
  {
    slug: "herford",
    name: "Herford",
    type: "gemeinde",
    parentSlug: "detmold-bezirk",
    population: 67000,
    coordinates: { lat: 52.1144, lng: 8.6731 },
    plz: ["32049", "32051", "32052"],
    priority: 5
  },
  {
    slug: "arnsberg",
    name: "Arnsberg",
    type: "gemeinde",
    parentSlug: "arnsberg-bezirk",
    population: 73000,
    coordinates: { lat: 51.3964, lng: 8.0636 },
    plz: ["59755", "59757", "59759"],
    priority: 5
  },
  {
    slug: "unna",
    name: "Unna",
    type: "gemeinde",
    parentSlug: "arnsberg-bezirk",
    population: 58000,
    coordinates: { lat: 51.5347, lng: 7.6889 },
    plz: ["59423", "59425", "59427"],
    priority: 5
  },
  {
    slug: "rheine",
    name: "Rheine",
    type: "gemeinde",
    parentSlug: "muenster-bezirk",
    population: 76000,
    coordinates: { lat: 52.2833, lng: 7.4361 },
    plz: ["48429", "48431", "48432"],
    priority: 5
  },

  // =====================================================
  // WEITERE STÄDTE - SACHSEN
  // =====================================================
  {
    slug: "meissen",
    name: "Meißen",
    type: "gemeinde",
    parentSlug: "sachsen",
    population: 28000,
    coordinates: { lat: 51.1631, lng: 13.4736 },
    plz: ["01662"],
    priority: 5
  },
  {
    slug: "pirna",
    name: "Pirna",
    type: "gemeinde",
    parentSlug: "sachsen",
    population: 39000,
    coordinates: { lat: 50.9575, lng: 13.9392 },
    plz: ["01796"],
    priority: 5
  },
  {
    slug: "radebeul",
    name: "Radebeul",
    type: "gemeinde",
    parentSlug: "sachsen",
    population: 34000,
    coordinates: { lat: 51.1064, lng: 13.6656 },
    plz: ["01445"],
    priority: 5
  },
  {
    slug: "freital",
    name: "Freital",
    type: "gemeinde",
    parentSlug: "sachsen",
    population: 39000,
    coordinates: { lat: 51.0161, lng: 13.6494 },
    plz: ["01705"],
    priority: 5
  },
  {
    slug: "limbach-oberfrohna",
    name: "Limbach-Oberfrohna",
    type: "gemeinde",
    parentSlug: "sachsen",
    population: 24000,
    coordinates: { lat: 50.8578, lng: 12.7622 },
    plz: ["09212"],
    priority: 4
  },

  // =====================================================
  // WEITERE STÄDTE - THÜRINGEN
  // =====================================================
  {
    slug: "nordhausen",
    name: "Nordhausen",
    type: "gemeinde",
    parentSlug: "thueringen",
    population: 42000,
    coordinates: { lat: 51.5058, lng: 10.7911 },
    plz: ["99734"],
    priority: 5
  },
  {
    slug: "muehlhausen",
    name: "Mühlhausen",
    type: "gemeinde",
    parentSlug: "thueringen",
    population: 35000,
    coordinates: { lat: 51.2081, lng: 10.4536 },
    plz: ["99974"],
    priority: 4
  },
  {
    slug: "altenburg",
    name: "Altenburg",
    type: "gemeinde",
    parentSlug: "thueringen",
    population: 32000,
    coordinates: { lat: 50.9867, lng: 12.4367 },
    plz: ["04600"],
    priority: 4
  },
  {
    slug: "ilmenau",
    name: "Ilmenau",
    type: "gemeinde",
    parentSlug: "thueringen",
    population: 26000,
    coordinates: { lat: 50.6872, lng: 10.9139 },
    plz: ["98693"],
    priority: 4
  },
  {
    slug: "arnstadt",
    name: "Arnstadt",
    type: "gemeinde",
    parentSlug: "thueringen",
    population: 26000,
    coordinates: { lat: 50.8350, lng: 10.9467 },
    plz: ["99310"],
    priority: 4
  },
  {
    slug: "rudolstadt",
    name: "Rudolstadt",
    type: "gemeinde",
    parentSlug: "thueringen",
    population: 24000,
    coordinates: { lat: 50.7200, lng: 11.3400 },
    plz: ["07407"],
    priority: 4
  },
  {
    slug: "sondershausen",
    name: "Sondershausen",
    type: "gemeinde",
    parentSlug: "thueringen",
    population: 21000,
    coordinates: { lat: 51.3683, lng: 10.8700 },
    plz: ["99706"],
    priority: 4
  },

  // =====================================================
  // WEITERE STÄDTE - SACHSEN-ANHALT
  // =====================================================
  {
    slug: "wernigerode",
    name: "Wernigerode",
    type: "gemeinde",
    parentSlug: "sachsen-anhalt",
    population: 33000,
    coordinates: { lat: 51.8342, lng: 10.7853 },
    plz: ["38855"],
    priority: 5
  },
  {
    slug: "halberstadt",
    name: "Halberstadt",
    type: "gemeinde",
    parentSlug: "sachsen-anhalt",
    population: 41000,
    coordinates: { lat: 51.8958, lng: 11.0458 },
    plz: ["38820", "38822"],
    priority: 5
  },
  {
    slug: "stendal",
    name: "Stendal",
    type: "gemeinde",
    parentSlug: "sachsen-anhalt",
    population: 39000,
    coordinates: { lat: 52.6058, lng: 11.8586 },
    plz: ["39576"],
    priority: 5
  },
  {
    slug: "bernburg",
    name: "Bernburg (Saale)",
    type: "gemeinde",
    parentSlug: "sachsen-anhalt",
    population: 33000,
    coordinates: { lat: 51.7931, lng: 11.7386 },
    plz: ["06406"],
    priority: 4
  },
  {
    slug: "merseburg",
    name: "Merseburg",
    type: "gemeinde",
    parentSlug: "sachsen-anhalt",
    population: 34000,
    coordinates: { lat: 51.3575, lng: 11.9922 },
    plz: ["06217"],
    priority: 5
  },
  {
    slug: "naumburg",
    name: "Naumburg (Saale)",
    type: "gemeinde",
    parentSlug: "sachsen-anhalt",
    population: 32000,
    coordinates: { lat: 51.1531, lng: 11.8097 },
    plz: ["06618"],
    priority: 4
  },
  {
    slug: "bitterfeld-wolfen",
    name: "Bitterfeld-Wolfen",
    type: "gemeinde",
    parentSlug: "sachsen-anhalt",
    population: 40000,
    coordinates: { lat: 51.6236, lng: 12.3269 },
    plz: ["06749", "06766"],
    priority: 5
  },
  {
    slug: "quedlinburg",
    name: "Quedlinburg",
    type: "gemeinde",
    parentSlug: "sachsen-anhalt",
    population: 24000,
    coordinates: { lat: 51.7875, lng: 11.1503 },
    plz: ["06484"],
    priority: 5
  },
  {
    slug: "schoenebeck",
    name: "Schönebeck (Elbe)",
    type: "gemeinde",
    parentSlug: "sachsen-anhalt",
    population: 30000,
    coordinates: { lat: 52.0167, lng: 11.7333 },
    plz: ["39218"],
    priority: 4
  },
  {
    slug: "weissenfels",
    name: "Weißenfels",
    type: "gemeinde",
    parentSlug: "sachsen-anhalt",
    population: 40000,
    coordinates: { lat: 51.1986, lng: 11.9700 },
    plz: ["06667"],
    priority: 5
  },

  // =====================================================
  // WEITERE STÄDTE - BRANDENBURG
  // =====================================================
  {
    slug: "oranienburg",
    name: "Oranienburg",
    type: "gemeinde",
    parentSlug: "brandenburg",
    population: 45000,
    coordinates: { lat: 52.7544, lng: 13.2422 },
    plz: ["16515"],
    priority: 5
  },
  {
    slug: "falkensee",
    name: "Falkensee",
    type: "gemeinde",
    parentSlug: "brandenburg",
    population: 45000,
    coordinates: { lat: 52.5589, lng: 13.0917 },
    plz: ["14612"],
    priority: 5
  },
  {
    slug: "bernau",
    name: "Bernau bei Berlin",
    type: "gemeinde",
    parentSlug: "brandenburg",
    population: 42000,
    coordinates: { lat: 52.6789, lng: 13.5872 },
    plz: ["16321"],
    priority: 5
  },
  {
    slug: "neuruppin",
    name: "Neuruppin",
    type: "gemeinde",
    parentSlug: "brandenburg",
    population: 30000,
    coordinates: { lat: 52.9256, lng: 12.8008 },
    plz: ["16816"],
    priority: 4
  },
  {
    slug: "koenigs-wusterhausen",
    name: "Königs Wusterhausen",
    type: "gemeinde",
    parentSlug: "brandenburg",
    population: 38000,
    coordinates: { lat: 52.3011, lng: 13.6328 },
    plz: ["15711"],
    priority: 5
  },
  {
    slug: "schwedt",
    name: "Schwedt/Oder",
    type: "gemeinde",
    parentSlug: "brandenburg",
    population: 30000,
    coordinates: { lat: 53.0606, lng: 14.2856 },
    plz: ["16303"],
    priority: 4
  },
  {
    slug: "eberswalde",
    name: "Eberswalde",
    type: "gemeinde",
    parentSlug: "brandenburg",
    population: 41000,
    coordinates: { lat: 52.8333, lng: 13.8167 },
    plz: ["16225", "16227"],
    priority: 5
  },
  {
    slug: "fuerstenwalde",
    name: "Fürstenwalde/Spree",
    type: "gemeinde",
    parentSlug: "brandenburg",
    population: 33000,
    coordinates: { lat: 52.3594, lng: 14.0619 },
    plz: ["15517"],
    priority: 4
  },
  {
    slug: "ludwigsfelde",
    name: "Ludwigsfelde",
    type: "gemeinde",
    parentSlug: "brandenburg",
    population: 27000,
    coordinates: { lat: 52.3022, lng: 13.2539 },
    plz: ["14974"],
    priority: 4
  },
  {
    slug: "werder-havel",
    name: "Werder (Havel)",
    type: "gemeinde",
    parentSlug: "brandenburg",
    population: 26000,
    coordinates: { lat: 52.3789, lng: 12.9339 },
    plz: ["14542"],
    priority: 4
  },
  {
    slug: "teltow",
    name: "Teltow",
    type: "gemeinde",
    parentSlug: "brandenburg",
    population: 27000,
    coordinates: { lat: 52.4022, lng: 13.2711 },
    plz: ["14513"],
    priority: 4
  },
  {
    slug: "kleinmachnow",
    name: "Kleinmachnow",
    type: "gemeinde",
    parentSlug: "brandenburg",
    population: 21000,
    coordinates: { lat: 52.4081, lng: 13.2250 },
    plz: ["14532"],
    priority: 4
  },
  {
    slug: "strausberg",
    name: "Strausberg",
    type: "gemeinde",
    parentSlug: "brandenburg",
    population: 27000,
    coordinates: { lat: 52.5800, lng: 13.8828 },
    plz: ["15344"],
    priority: 4
  },
  {
    slug: "hennigsdorf",
    name: "Hennigsdorf",
    type: "gemeinde",
    parentSlug: "brandenburg",
    population: 27000,
    coordinates: { lat: 52.6367, lng: 13.2061 },
    plz: ["16761"],
    priority: 4
  },
  {
    slug: "hohen-neuendorf",
    name: "Hohen Neuendorf",
    type: "gemeinde",
    parentSlug: "brandenburg",
    population: 26000,
    coordinates: { lat: 52.6756, lng: 13.2800 },
    plz: ["16540"],
    priority: 4
  },
  {
    slug: "senftenberg",
    name: "Senftenberg",
    type: "gemeinde",
    parentSlug: "brandenburg",
    population: 24000,
    coordinates: { lat: 51.5247, lng: 14.0017 },
    plz: ["01968"],
    priority: 4
  },
  {
    slug: "spremberg",
    name: "Spremberg",
    type: "gemeinde",
    parentSlug: "brandenburg",
    population: 22000,
    coordinates: { lat: 51.5706, lng: 14.3800 },
    plz: ["03130"],
    priority: 4
  },

  // =====================================================
  // WEITERE STÄDTE - SCHLESWIG-HOLSTEIN
  // =====================================================
  {
    slug: "norderstedt",
    name: "Norderstedt",
    type: "gemeinde",
    parentSlug: "schleswig-holstein",
    population: 80000,
    coordinates: { lat: 53.7069, lng: 9.9894 },
    plz: ["22844", "22846", "22848", "22850", "22851"],
    priority: 6
  },
  {
    slug: "elmshorn",
    name: "Elmshorn",
    type: "gemeinde",
    parentSlug: "schleswig-holstein",
    population: 51000,
    coordinates: { lat: 53.7536, lng: 9.6536 },
    plz: ["25335", "25336", "25337"],
    priority: 5
  },
  {
    slug: "pinneberg",
    name: "Pinneberg",
    type: "gemeinde",
    parentSlug: "schleswig-holstein",
    population: 44000,
    coordinates: { lat: 53.6561, lng: 9.7953 },
    plz: ["25421"],
    priority: 5
  },
  {
    slug: "wedel",
    name: "Wedel",
    type: "gemeinde",
    parentSlug: "schleswig-holstein",
    population: 34000,
    coordinates: { lat: 53.5836, lng: 9.7114 },
    plz: ["22880"],
    priority: 5
  },
  {
    slug: "ahrensburg",
    name: "Ahrensburg",
    type: "gemeinde",
    parentSlug: "schleswig-holstein",
    population: 34000,
    coordinates: { lat: 53.6747, lng: 10.2369 },
    plz: ["22926"],
    priority: 5
  },
  {
    slug: "itzehoe",
    name: "Itzehoe",
    type: "gemeinde",
    parentSlug: "schleswig-holstein",
    population: 31000,
    coordinates: { lat: 53.9261, lng: 9.5125 },
    plz: ["25524"],
    priority: 4
  },
  {
    slug: "geesthacht",
    name: "Geesthacht",
    type: "gemeinde",
    parentSlug: "schleswig-holstein",
    population: 31000,
    coordinates: { lat: 53.4372, lng: 10.3769 },
    plz: ["21502"],
    priority: 4
  },
  {
    slug: "rendsburg",
    name: "Rendsburg",
    type: "gemeinde",
    parentSlug: "schleswig-holstein",
    population: 28000,
    coordinates: { lat: 54.3064, lng: 9.6653 },
    plz: ["24768"],
    priority: 4
  },
  {
    slug: "heide",
    name: "Heide",
    type: "gemeinde",
    parentSlug: "schleswig-holstein",
    population: 22000,
    coordinates: { lat: 54.1956, lng: 9.0928 },
    plz: ["25746"],
    priority: 4
  },
  {
    slug: "husum",
    name: "Husum",
    type: "gemeinde",
    parentSlug: "schleswig-holstein",
    population: 23000,
    coordinates: { lat: 54.4861, lng: 9.0528 },
    plz: ["25813"],
    priority: 4
  },
  {
    slug: "bad-oldesloe",
    name: "Bad Oldesloe",
    type: "gemeinde",
    parentSlug: "schleswig-holstein",
    population: 25000,
    coordinates: { lat: 53.8111, lng: 10.3775 },
    plz: ["23843"],
    priority: 4
  },
  {
    slug: "reinbek",
    name: "Reinbek",
    type: "gemeinde",
    parentSlug: "schleswig-holstein",
    population: 28000,
    coordinates: { lat: 53.5108, lng: 10.2469 },
    plz: ["21465"],
    priority: 4
  },
  {
    slug: "neumuenster-stadtteile",
    name: "Neumünster-Stadtteile",
    type: "stadtteil",
    parentSlug: "neumuenster",
    plz: ["24534"],
    priority: 5
  },

  // =====================================================
  // GEMEINDEN 10.000+ EINWOHNER - BAYERN
  // =====================================================
  { slug: "geretsried", name: "Geretsried", type: "gemeinde", parentSlug: "oberbayern", population: 25000, plz: ["82538"], priority: 4 },
  { slug: "unterschleissheim", name: "Unterschleißheim", type: "gemeinde", parentSlug: "oberbayern", population: 30000, plz: ["85716"], priority: 4 },
  { slug: "olching", name: "Olching", type: "gemeinde", parentSlug: "oberbayern", population: 28000, plz: ["82140"], priority: 4 },
  { slug: "germering", name: "Germering", type: "gemeinde", parentSlug: "oberbayern", population: 41000, plz: ["82110"], priority: 5 },
  { slug: "haar", name: "Haar", type: "gemeinde", parentSlug: "oberbayern", population: 22000, plz: ["85540"], priority: 4 },
  { slug: "vaterstetten", name: "Vaterstetten", type: "gemeinde", parentSlug: "oberbayern", population: 24000, plz: ["85591"], priority: 4 },
  { slug: "puchheim", name: "Puchheim", type: "gemeinde", parentSlug: "oberbayern", population: 22000, plz: ["82178"], priority: 4 },
  { slug: "ottobrunn", name: "Ottobrunn", type: "gemeinde", parentSlug: "oberbayern", population: 22000, plz: ["85521"], priority: 4 },
  { slug: "unterhaching", name: "Unterhaching", type: "gemeinde", parentSlug: "oberbayern", population: 26000, plz: ["82008"], priority: 4 },
  { slug: "taufkirchen", name: "Taufkirchen", type: "gemeinde", parentSlug: "oberbayern", population: 19000, plz: ["82024"], priority: 4 },
  { slug: "garching", name: "Garching bei München", type: "gemeinde", parentSlug: "oberbayern", population: 19000, plz: ["85748"], priority: 4 },
  { slug: "neubiberg", name: "Neubiberg", type: "gemeinde", parentSlug: "oberbayern", population: 15000, plz: ["85579"], priority: 4 },
  { slug: "pullach", name: "Pullach im Isartal", type: "gemeinde", parentSlug: "oberbayern", population: 10000, plz: ["82049"], priority: 3 },
  { slug: "gilching", name: "Gilching", type: "gemeinde", parentSlug: "oberbayern", population: 20000, plz: ["82205"], priority: 4 },
  { slug: "gauting", name: "Gauting", type: "gemeinde", parentSlug: "oberbayern", population: 21000, plz: ["82131"], priority: 4 },
  { slug: "grafing", name: "Grafing bei München", type: "gemeinde", parentSlug: "oberbayern", population: 14000, plz: ["85567"], priority: 4 },
  { slug: "penzberg", name: "Penzberg", type: "gemeinde", parentSlug: "oberbayern", population: 17000, plz: ["82377"], priority: 4 },
  { slug: "miesbach", name: "Miesbach", type: "gemeinde", parentSlug: "oberbayern", population: 12000, plz: ["83714"], priority: 4 },
  { slug: "bad-aibling", name: "Bad Aibling", type: "gemeinde", parentSlug: "oberbayern", population: 19000, plz: ["83043"], priority: 4 },
  { slug: "kolbermoor", name: "Kolbermoor", type: "gemeinde", parentSlug: "oberbayern", population: 19000, plz: ["83059"], priority: 4 },
  { slug: "waldkraiburg", name: "Waldkraiburg", type: "gemeinde", parentSlug: "oberbayern", population: 24000, plz: ["84478"], priority: 4 },
  { slug: "mühldorf", name: "Mühldorf am Inn", type: "gemeinde", parentSlug: "oberbayern", population: 21000, plz: ["84453"], priority: 4 },
  { slug: "burghausen", name: "Burghausen", type: "gemeinde", parentSlug: "oberbayern", population: 19000, plz: ["84489"], priority: 4 },
  { slug: "altötting", name: "Altötting", type: "gemeinde", parentSlug: "oberbayern", population: 13000, plz: ["84503"], priority: 4 },
  { slug: "pfarrkirchen", name: "Pfarrkirchen", type: "gemeinde", parentSlug: "niederbayern", population: 13000, plz: ["84347"], priority: 4 },
  { slug: "dingolfing", name: "Dingolfing", type: "gemeinde", parentSlug: "niederbayern", population: 20000, plz: ["84130"], priority: 4 },
  { slug: "vilsbiburg", name: "Vilsbiburg", type: "gemeinde", parentSlug: "niederbayern", population: 12000, plz: ["84137"], priority: 4 },
  { slug: "cham", name: "Cham", type: "gemeinde", parentSlug: "oberpfalz", population: 17000, plz: ["93413"], priority: 4 },
  { slug: "schwandorf", name: "Schwandorf", type: "gemeinde", parentSlug: "oberpfalz", population: 30000, plz: ["92421"], priority: 5 },
  { slug: "neumarkt", name: "Neumarkt in der Oberpfalz", type: "gemeinde", parentSlug: "oberpfalz", population: 41000, plz: ["92318"], priority: 5 },
  { slug: "sulzbach-rosenberg", name: "Sulzbach-Rosenberg", type: "gemeinde", parentSlug: "oberpfalz", population: 19000, plz: ["92237"], priority: 4 },
  { slug: "forchheim", name: "Forchheim", type: "gemeinde", parentSlug: "oberfranken", population: 32000, plz: ["91301"], priority: 5 },
  { slug: "lichtenfels", name: "Lichtenfels", type: "gemeinde", parentSlug: "oberfranken", population: 20000, plz: ["96215"], priority: 4 },
  { slug: "kronach", name: "Kronach", type: "gemeinde", parentSlug: "oberfranken", population: 16000, plz: ["96317"], priority: 4 },
  { slug: "kulmbach", name: "Kulmbach", type: "gemeinde", parentSlug: "oberfranken", population: 26000, plz: ["95326"], priority: 4 },
  { slug: "selb", name: "Selb", type: "gemeinde", parentSlug: "oberfranken", population: 15000, plz: ["95100"], priority: 4 },
  { slug: "marktredwitz", name: "Marktredwitz", type: "gemeinde", parentSlug: "oberfranken", population: 17000, plz: ["95615"], priority: 4 },
  { slug: "wunsiedel", name: "Wunsiedel", type: "gemeinde", parentSlug: "oberfranken", population: 10000, plz: ["95632"], priority: 3 },
  { slug: "bad-kissingen", name: "Bad Kissingen", type: "gemeinde", parentSlug: "unterfranken", population: 23000, plz: ["97688"], priority: 4 },
  { slug: "bad-neustadt", name: "Bad Neustadt an der Saale", type: "gemeinde", parentSlug: "unterfranken", population: 15000, plz: ["97616"], priority: 4 },
  { slug: "hassfurt", name: "Haßfurt", type: "gemeinde", parentSlug: "unterfranken", population: 14000, plz: ["97437"], priority: 4 },
  { slug: "lohr", name: "Lohr am Main", type: "gemeinde", parentSlug: "unterfranken", population: 15000, plz: ["97816"], priority: 4 },
  { slug: "ochsenfurt", name: "Ochsenfurt", type: "gemeinde", parentSlug: "unterfranken", population: 11000, plz: ["97199"], priority: 3 },
  { slug: "kitzingen", name: "Kitzingen", type: "gemeinde", parentSlug: "unterfranken", population: 22000, plz: ["97318"], priority: 4 },
  { slug: "alzenau", name: "Alzenau", type: "gemeinde", parentSlug: "unterfranken", population: 19000, plz: ["63755"], priority: 4 },
  { slug: "gunzenhausen", name: "Gunzenhausen", type: "gemeinde", parentSlug: "mittelfranken", population: 17000, plz: ["91710"], priority: 4 },
  { slug: "weissenburg", name: "Weißenburg in Bayern", type: "gemeinde", parentSlug: "mittelfranken", population: 18000, plz: ["91781"], priority: 4 },
  { slug: "roth", name: "Roth", type: "gemeinde", parentSlug: "mittelfranken", population: 26000, plz: ["91154"], priority: 4 },
  { slug: "herzogenaurach", name: "Herzogenaurach", type: "gemeinde", parentSlug: "mittelfranken", population: 24000, plz: ["91074"], priority: 4 },
  { slug: "zirndorf", name: "Zirndorf", type: "gemeinde", parentSlug: "mittelfranken", population: 26000, plz: ["90513"], priority: 4 },
  { slug: "oberasbach", name: "Oberasbach", type: "gemeinde", parentSlug: "mittelfranken", population: 18000, plz: ["90522"], priority: 4 },
  { slug: "stein", name: "Stein", type: "gemeinde", parentSlug: "mittelfranken", population: 15000, plz: ["90547"], priority: 4 },
  { slug: "lauf", name: "Lauf an der Pegnitz", type: "gemeinde", parentSlug: "mittelfranken", population: 26000, plz: ["91207"], priority: 4 },
  { slug: "hersbruck", name: "Hersbruck", type: "gemeinde", parentSlug: "mittelfranken", population: 13000, plz: ["91217"], priority: 4 },
  { slug: "neustadt-aisch", name: "Neustadt an der Aisch", type: "gemeinde", parentSlug: "mittelfranken", population: 13000, plz: ["91413"], priority: 4 },
  { slug: "bad-windsheim", name: "Bad Windsheim", type: "gemeinde", parentSlug: "mittelfranken", population: 12000, plz: ["91438"], priority: 4 },
  { slug: "dinkelsbuehl", name: "Dinkelsbühl", type: "gemeinde", parentSlug: "mittelfranken", population: 12000, plz: ["91550"], priority: 4 },
  { slug: "donauwoerth", name: "Donauwörth", type: "gemeinde", parentSlug: "schwaben", population: 21000, plz: ["86609"], priority: 4 },
  { slug: "noerdlingen", name: "Nördlingen", type: "gemeinde", parentSlug: "schwaben", population: 21000, plz: ["86720"], priority: 4 },
  { slug: "dillingen", name: "Dillingen an der Donau", type: "gemeinde", parentSlug: "schwaben", population: 19000, plz: ["89407"], priority: 4 },
  { slug: "guenzburg", name: "Günzburg", type: "gemeinde", parentSlug: "schwaben", population: 21000, plz: ["89312"], priority: 4 },
  { slug: "illertissen", name: "Illertissen", type: "gemeinde", parentSlug: "schwaben", population: 18000, plz: ["89257"], priority: 4 },
  { slug: "senden", name: "Senden", type: "gemeinde", parentSlug: "schwaben", population: 22000, plz: ["89250"], priority: 4 },
  { slug: "lindau", name: "Lindau (Bodensee)", type: "gemeinde", parentSlug: "schwaben", population: 26000, plz: ["88131"], priority: 5 },
  { slug: "lindenberg", name: "Lindenberg im Allgäu", type: "gemeinde", parentSlug: "schwaben", population: 11000, plz: ["88161"], priority: 3 },
  { slug: "sonthofen", name: "Sonthofen", type: "gemeinde", parentSlug: "schwaben", population: 21000, plz: ["87527"], priority: 4 },
  { slug: "immenstadt", name: "Immenstadt im Allgäu", type: "gemeinde", parentSlug: "schwaben", population: 14000, plz: ["87509"], priority: 4 },
  { slug: "buchloe", name: "Buchloe", type: "gemeinde", parentSlug: "schwaben", population: 14000, plz: ["86807"], priority: 4 },
  { slug: "marktoberdorf", name: "Marktoberdorf", type: "gemeinde", parentSlug: "schwaben", population: 19000, plz: ["87616"], priority: 4 },
  { slug: "fuessen", name: "Füssen", type: "gemeinde", parentSlug: "schwaben", population: 16000, plz: ["87629"], priority: 4 },
  { slug: "bad-woerishofen", name: "Bad Wörishofen", type: "gemeinde", parentSlug: "schwaben", population: 16000, plz: ["86825"], priority: 4 },
  { slug: "mindelheim", name: "Mindelheim", type: "gemeinde", parentSlug: "schwaben", population: 15000, plz: ["87719"], priority: 4 },
  { slug: "krumbach", name: "Krumbach (Schwaben)", type: "gemeinde", parentSlug: "schwaben", population: 13000, plz: ["86381"], priority: 4 },

  // =====================================================
  // GEMEINDEN 10.000+ EINWOHNER - BADEN-WÜRTTEMBERG
  // =====================================================
  { slug: "biberach", name: "Biberach an der Riß", type: "gemeinde", parentSlug: "tuebingen-bezirk", population: 33000, plz: ["88400"], priority: 5 },
  { slug: "bad-saulgau", name: "Bad Saulgau", type: "gemeinde", parentSlug: "tuebingen-bezirk", population: 18000, plz: ["88348"], priority: 4 },
  { slug: "bad-waldsee", name: "Bad Waldsee", type: "gemeinde", parentSlug: "tuebingen-bezirk", population: 20000, plz: ["88339"], priority: 4 },
  { slug: "weingarten", name: "Weingarten", type: "gemeinde", parentSlug: "tuebingen-bezirk", population: 25000, plz: ["88250"], priority: 4 },
  { slug: "wangen", name: "Wangen im Allgäu", type: "gemeinde", parentSlug: "tuebingen-bezirk", population: 27000, plz: ["88239"], priority: 4 },
  { slug: "leutkirch", name: "Leutkirch im Allgäu", type: "gemeinde", parentSlug: "tuebingen-bezirk", population: 23000, plz: ["88299"], priority: 4 },
  { slug: "isny", name: "Isny im Allgäu", type: "gemeinde", parentSlug: "tuebingen-bezirk", population: 14000, plz: ["88316"], priority: 4 },
  { slug: "bad-wurzach", name: "Bad Wurzach", type: "gemeinde", parentSlug: "tuebingen-bezirk", population: 15000, plz: ["88410"], priority: 4 },
  { slug: "tettnang", name: "Tettnang", type: "gemeinde", parentSlug: "tuebingen-bezirk", population: 19000, plz: ["88069"], priority: 4 },
  { slug: "markdorf", name: "Markdorf", type: "gemeinde", parentSlug: "tuebingen-bezirk", population: 14000, plz: ["88677"], priority: 4 },
  { slug: "ueberlingen", name: "Überlingen", type: "gemeinde", parentSlug: "tuebingen-bezirk", population: 23000, plz: ["88662"], priority: 4 },
  { slug: "meersburg", name: "Meersburg", type: "gemeinde", parentSlug: "tuebingen-bezirk", population: 6000, plz: ["88709"], priority: 4 },
  { slug: "stockach", name: "Stockach", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 18000, plz: ["78333"], priority: 4 },
  { slug: "singen", name: "Singen (Hohentwiel)", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 48000, plz: ["78224"], priority: 5 },
  { slug: "radolfzell", name: "Radolfzell am Bodensee", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 31000, plz: ["78315"], priority: 5 },
  { slug: "engen", name: "Engen", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 11000, plz: ["78234"], priority: 4 },
  { slug: "tuttlingen", name: "Tuttlingen", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 36000, plz: ["78532"], priority: 5 },
  { slug: "rottweil", name: "Rottweil", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 25000, plz: ["78628"], priority: 5 },
  { slug: "schramberg", name: "Schramberg", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 21000, plz: ["78713"], priority: 4 },
  { slug: "donaueschingen", name: "Donaueschingen", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 22000, plz: ["78166"], priority: 4 },
  { slug: "bad-duerrheim", name: "Bad Dürrheim", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 13000, plz: ["78073"], priority: 4 },
  { slug: "st-georgen", name: "St. Georgen im Schwarzwald", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 13000, plz: ["78112"], priority: 4 },
  { slug: "triberg", name: "Triberg im Schwarzwald", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 5000, plz: ["78098"], priority: 4 },
  { slug: "furtwangen", name: "Furtwangen im Schwarzwald", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 9000, plz: ["78120"], priority: 4 },
  { slug: "titisee-neustadt", name: "Titisee-Neustadt", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 12000, plz: ["79822"], priority: 4 },
  { slug: "waldshut-tiengen", name: "Waldshut-Tiengen", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 24000, plz: ["79761"], priority: 4 },
  { slug: "bad-saeckingen", name: "Bad Säckingen", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 17000, plz: ["79713"], priority: 4 },
  { slug: "rheinfelden", name: "Rheinfelden (Baden)", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 33000, plz: ["79618"], priority: 5 },
  { slug: "weil-am-rhein", name: "Weil am Rhein", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 30000, plz: ["79576"], priority: 5 },
  { slug: "schopfheim", name: "Schopfheim", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 20000, plz: ["79650"], priority: 4 },
  { slug: "muellheim", name: "Müllheim", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 19000, plz: ["79379"], priority: 4 },
  { slug: "breisach", name: "Breisach am Rhein", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 16000, plz: ["79206"], priority: 4 },
  { slug: "bad-krozingen", name: "Bad Krozingen", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 21000, plz: ["79189"], priority: 4 },
  { slug: "staufen", name: "Staufen im Breisgau", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 8000, plz: ["79219"], priority: 4 },
  { slug: "emmendingen", name: "Emmendingen", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 28000, plz: ["79312"], priority: 5 },
  { slug: "waldkirch", name: "Waldkirch", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 22000, plz: ["79183"], priority: 4 },
  { slug: "elzach", name: "Elzach", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 8000, plz: ["79215"], priority: 4 },
  { slug: "lahr", name: "Lahr/Schwarzwald", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 47000, plz: ["77933"], priority: 5 },
  { slug: "ettenheim", name: "Ettenheim", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 13000, plz: ["77955"], priority: 4 },
  { slug: "kehl", name: "Kehl", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 37000, plz: ["77694"], priority: 5 },
  { slug: "oberkirch", name: "Oberkirch", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 20000, plz: ["77704"], priority: 4 },
  { slug: "achern", name: "Achern", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 26000, plz: ["77855"], priority: 4 },
  { slug: "buhl", name: "Bühl", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 30000, plz: ["77815"], priority: 5 },
  { slug: "gaggenau", name: "Gaggenau", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 30000, plz: ["76571"], priority: 5 },
  { slug: "rastatt", name: "Rastatt", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 49000, plz: ["76437"], priority: 5 },
  { slug: "ettlingen", name: "Ettlingen", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 40000, plz: ["76275"], priority: 5 },
  { slug: "bretten", name: "Bretten", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 30000, plz: ["75015"], priority: 5 },
  { slug: "bruchsal", name: "Bruchsal", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 45000, plz: ["76646"], priority: 5 },
  { slug: "philippsburg", name: "Philippsburg", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 14000, plz: ["76661"], priority: 4 },
  { slug: "waghäusel", name: "Waghäusel", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 22000, plz: ["68753"], priority: 4 },
  { slug: "schwetzingen", name: "Schwetzingen", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 22000, plz: ["68723"], priority: 4 },
  { slug: "hockenheim", name: "Hockenheim", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 22000, plz: ["68766"], priority: 4 },
  { slug: "walldorf-bw", name: "Walldorf", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 16000, plz: ["69190"], priority: 4 },
  { slug: "wiesloch", name: "Wiesloch", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 26000, plz: ["69168"], priority: 4 },
  { slug: "sinsheim", name: "Sinsheim", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 36000, plz: ["74889"], priority: 5 },
  { slug: "eppelheim", name: "Eppelheim", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 16000, plz: ["69214"], priority: 4 },
  { slug: "leimen", name: "Leimen", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 27000, plz: ["69181"], priority: 4 },
  { slug: "sandhausen", name: "Sandhausen", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 15000, plz: ["69207"], priority: 4 },
  { slug: "weinheim", name: "Weinheim", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 45000, plz: ["69469"], priority: 5 },
  { slug: "schriesheim", name: "Schriesheim", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 15000, plz: ["69198"], priority: 4 },
  { slug: "ladenburg", name: "Ladenburg", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 12000, plz: ["68526"], priority: 4 },
  { slug: "eberbach", name: "Eberbach", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 14000, plz: ["69412"], priority: 4 },
  { slug: "mosbach", name: "Mosbach", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 24000, plz: ["74821"], priority: 4 },
  { slug: "bad-rappenau", name: "Bad Rappenau", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 22000, plz: ["74906"], priority: 4 },
  { slug: "neckarsulm", name: "Neckarsulm", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 27000, plz: ["74172"], priority: 5 },
  { slug: "bad-friedrichshall", name: "Bad Friedrichshall", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 19000, plz: ["74177"], priority: 4 },
  { slug: "eppingen", name: "Eppingen", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 22000, plz: ["75031"], priority: 4 },
  { slug: "oehringen", name: "Öhringen", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 25000, plz: ["74613"], priority: 4 },
  { slug: "kuenzelsau", name: "Künzelsau", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 16000, plz: ["74653"], priority: 4 },
  { slug: "schwaebisch-hall", name: "Schwäbisch Hall", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 41000, plz: ["74523"], priority: 5 },
  { slug: "crailsheim", name: "Crailsheim", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 35000, plz: ["74564"], priority: 5 },
  { slug: "ellwangen", name: "Ellwangen (Jagst)", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 25000, plz: ["73479"], priority: 4 },
  { slug: "heidenheim", name: "Heidenheim an der Brenz", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 50000, plz: ["89518"], priority: 5 },
  { slug: "giengen", name: "Giengen an der Brenz", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 20000, plz: ["89537"], priority: 4 },
  { slug: "geislingen", name: "Geislingen an der Steige", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 28000, plz: ["73312"], priority: 4 },
  { slug: "eislingen", name: "Eislingen/Fils", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 21000, plz: ["73054"], priority: 4 },
  { slug: "suessen", name: "Süßen", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 10000, plz: ["73079"], priority: 4 },
  { slug: "uhingen", name: "Uhingen", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 15000, plz: ["73066"], priority: 4 },
  { slug: "ebersbach", name: "Ebersbach an der Fils", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 16000, plz: ["73061"], priority: 4 },
  { slug: "plochingen", name: "Plochingen", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 14000, plz: ["73207"], priority: 4 },
  { slug: "wendlingen", name: "Wendlingen am Neckar", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 16000, plz: ["73240"], priority: 4 },
  { slug: "kirchheim-teck", name: "Kirchheim unter Teck", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 41000, plz: ["73230"], priority: 5 },
  { slug: "nuertingen", name: "Nürtingen", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 42000, plz: ["72622"], priority: 5 },
  { slug: "filderstadt", name: "Filderstadt", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 46000, plz: ["70794"], priority: 5 },
  { slug: "leinfelden-echterdingen", name: "Leinfelden-Echterdingen", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 40000, plz: ["70771"], priority: 5 },
  { slug: "ostfildern", name: "Ostfildern", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 39000, plz: ["73760"], priority: 5 },
  { slug: "fellbach", name: "Fellbach", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 46000, plz: ["70734"], priority: 5 },
  { slug: "weinstadt", name: "Weinstadt", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 27000, plz: ["71384"], priority: 4 },
  { slug: "kernen", name: "Kernen im Remstal", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 16000, plz: ["71394"], priority: 4 },
  { slug: "schorndorf", name: "Schorndorf", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 40000, plz: ["73614"], priority: 5 },
  { slug: "winnenden", name: "Winnenden", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 29000, plz: ["71364"], priority: 4 },
  { slug: "backnang", name: "Backnang", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 37000, plz: ["71522"], priority: 5 },
  { slug: "murrhardt", name: "Murrhardt", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 14000, plz: ["71540"], priority: 4 },
  { slug: "kornwestheim", name: "Kornwestheim", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 34000, plz: ["70806"], priority: 5 },
  { slug: "remseck", name: "Remseck am Neckar", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 27000, plz: ["71686"], priority: 4 },
  { slug: "bietigheim-bissingen", name: "Bietigheim-Bissingen", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 43000, plz: ["74321"], priority: 5 },
  { slug: "freiberg-neckar", name: "Freiberg am Neckar", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 16000, plz: ["71691"], priority: 4 },
  { slug: "marbach", name: "Marbach am Neckar", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 16000, plz: ["71672"], priority: 4 },
  { slug: "sachsenheim", name: "Sachsenheim", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 18000, plz: ["74343"], priority: 4 },
  { slug: "vaihingen-enz", name: "Vaihingen an der Enz", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 29000, plz: ["71665"], priority: 4 },
  { slug: "muehlacker", name: "Mühlacker", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 26000, plz: ["75417"], priority: 4 },
  { slug: "leonberg", name: "Leonberg", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 49000, plz: ["71229"], priority: 5 },
  { slug: "ditzingen", name: "Ditzingen", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 25000, plz: ["71254"], priority: 4 },
  { slug: "gerlingen", name: "Gerlingen", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 20000, plz: ["70839"], priority: 4 },
  { slug: "renningen", name: "Renningen", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 18000, plz: ["71272"], priority: 4 },
  { slug: "weil-der-stadt", name: "Weil der Stadt", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 19000, plz: ["71263"], priority: 4 },
  { slug: "boeblingen", name: "Böblingen", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 51000, plz: ["71032", "71034"], priority: 5 },
  { slug: "herrenberg", name: "Herrenberg", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 32000, plz: ["71083"], priority: 5 },
  { slug: "nagold", name: "Nagold", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 23000, plz: ["72202"], priority: 4 },
  { slug: "calw", name: "Calw", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 23000, plz: ["75365"], priority: 4 },
  { slug: "bad-wildbad", name: "Bad Wildbad", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 10000, plz: ["75323"], priority: 4 },
  { slug: "metzingen", name: "Metzingen", type: "gemeinde", parentSlug: "tuebingen-bezirk", population: 22000, plz: ["72555"], priority: 4 },
  { slug: "bad-urach", name: "Bad Urach", type: "gemeinde", parentSlug: "tuebingen-bezirk", population: 13000, plz: ["72574"], priority: 4 },
  { slug: "muensingen", name: "Münsingen", type: "gemeinde", parentSlug: "tuebingen-bezirk", population: 15000, plz: ["72525"], priority: 4 },
  { slug: "balingen", name: "Balingen", type: "gemeinde", parentSlug: "tuebingen-bezirk", population: 35000, plz: ["72336"], priority: 5 },
  { slug: "albstadt", name: "Albstadt", type: "gemeinde", parentSlug: "tuebingen-bezirk", population: 46000, plz: ["72458", "72459", "72461", "72462"], priority: 5 },
  { slug: "hechingen", name: "Hechingen", type: "gemeinde", parentSlug: "tuebingen-bezirk", population: 19000, plz: ["72379"], priority: 4 },
  { slug: "rottenburg", name: "Rottenburg am Neckar", type: "gemeinde", parentSlug: "tuebingen-bezirk", population: 45000, plz: ["72108"], priority: 5 },
  { slug: "horb", name: "Horb am Neckar", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 25000, plz: ["72160"], priority: 4 },
  { slug: "freudenstadt", name: "Freudenstadt", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 23000, plz: ["72250"], priority: 4 },

  // =====================================================
  // GEMEINDEN 10.000+ EINWOHNER - NORDRHEIN-WESTFALEN
  // =====================================================
  { slug: "ahaus", name: "Ahaus", type: "gemeinde", parentSlug: "muenster-bezirk", population: 40000, plz: ["48683"], priority: 4 },
  { slug: "ahlen", name: "Ahlen", type: "gemeinde", parentSlug: "muenster-bezirk", population: 52000, plz: ["59227", "59229"], priority: 5 },
  { slug: "attendorn", name: "Attendorn", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 24000, plz: ["57439"], priority: 4 },
  { slug: "bad-berleburg", name: "Bad Berleburg", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 19000, plz: ["57319"], priority: 4 },
  { slug: "bad-driburg", name: "Bad Driburg", type: "gemeinde", parentSlug: "detmold-bezirk", population: 18000, plz: ["33014"], priority: 4 },
  { slug: "bad-lippspringe", name: "Bad Lippspringe", type: "gemeinde", parentSlug: "detmold-bezirk", population: 16000, plz: ["33175"], priority: 4 },
  { slug: "bad-oeynhausen", name: "Bad Oeynhausen", type: "gemeinde", parentSlug: "detmold-bezirk", population: 49000, plz: ["32545", "32547", "32549"], priority: 5 },
  { slug: "bad-salzuflen", name: "Bad Salzuflen", type: "gemeinde", parentSlug: "detmold-bezirk", population: 54000, plz: ["32105", "32107", "32108"], priority: 5 },
  { slug: "beckum", name: "Beckum", type: "gemeinde", parentSlug: "muenster-bezirk", population: 36000, plz: ["59269"], priority: 4 },
  { slug: "bergkamen", name: "Bergkamen", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 49000, plz: ["59192"], priority: 5 },
  { slug: "blomberg", name: "Blomberg", type: "gemeinde", parentSlug: "detmold-bezirk", population: 15000, plz: ["32825"], priority: 4 },
  { slug: "bocholt", name: "Bocholt", type: "gemeinde", parentSlug: "muenster-bezirk", population: 72000, plz: ["46395", "46397", "46399"], priority: 6 },
  { slug: "borken", name: "Borken", type: "gemeinde", parentSlug: "muenster-bezirk", population: 42000, plz: ["46325"], priority: 4 },
  { slug: "brakel", name: "Brakel", type: "gemeinde", parentSlug: "detmold-bezirk", population: 16000, plz: ["33034"], priority: 4 },
  { slug: "brilon", name: "Brilon", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 25000, plz: ["59929"], priority: 4 },
  { slug: "buehl-nrw", name: "Büren", type: "gemeinde", parentSlug: "detmold-bezirk", population: 22000, plz: ["33142"], priority: 4 },
  { slug: "coesfeld", name: "Coesfeld", type: "gemeinde", parentSlug: "muenster-bezirk", population: 36000, plz: ["48653"], priority: 4 },
  { slug: "datteln", name: "Datteln", type: "gemeinde", parentSlug: "muenster-bezirk", population: 35000, plz: ["45711"], priority: 4 },
  { slug: "delbrueck", name: "Delbrück", type: "gemeinde", parentSlug: "detmold-bezirk", population: 32000, plz: ["33129"], priority: 4 },
  { slug: "duelmen", name: "Dülmen", type: "gemeinde", parentSlug: "muenster-bezirk", population: 47000, plz: ["48249"], priority: 5 },
  { slug: "emmerich", name: "Emmerich am Rhein", type: "gemeinde", parentSlug: "duesseldorf-bezirk", population: 31000, plz: ["46446"], priority: 4 },
  { slug: "emsdetten", name: "Emsdetten", type: "gemeinde", parentSlug: "muenster-bezirk", population: 36000, plz: ["48282"], priority: 4 },
  { slug: "enger", name: "Enger", type: "gemeinde", parentSlug: "detmold-bezirk", population: 21000, plz: ["32130"], priority: 4 },
  { slug: "ennepetal", name: "Ennepetal", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 29000, plz: ["58256"], priority: 4 },
  { slug: "erkelenz", name: "Erkelenz", type: "gemeinde", parentSlug: "koeln-bezirk", population: 45000, plz: ["41812"], priority: 5 },
  { slug: "erwitte", name: "Erwitte", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 15000, plz: ["59597"], priority: 4 },
  { slug: "espelkamp", name: "Espelkamp", type: "gemeinde", parentSlug: "detmold-bezirk", population: 25000, plz: ["32339"], priority: 4 },
  { slug: "euskirchen", name: "Euskirchen", type: "gemeinde", parentSlug: "koeln-bezirk", population: 59000, plz: ["53879", "53881"], priority: 5 },
  { slug: "frechen", name: "Frechen", type: "gemeinde", parentSlug: "koeln-bezirk", population: 54000, plz: ["50226"], priority: 5 },
  { slug: "geilenkirchen", name: "Geilenkirchen", type: "gemeinde", parentSlug: "koeln-bezirk", population: 28000, plz: ["52511"], priority: 4 },
  { slug: "geldern", name: "Geldern", type: "gemeinde", parentSlug: "duesseldorf-bezirk", population: 34000, plz: ["47608"], priority: 4 },
  { slug: "geseke", name: "Geseke", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 21000, plz: ["59590"], priority: 4 },
  { slug: "gevelsberg", name: "Gevelsberg", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 31000, plz: ["58285"], priority: 4 },
  { slug: "goch", name: "Goch", type: "gemeinde", parentSlug: "duesseldorf-bezirk", population: 34000, plz: ["47574"], priority: 4 },
  { slug: "grevenbroich", name: "Grevenbroich", type: "gemeinde", parentSlug: "duesseldorf-bezirk", population: 64000, plz: ["41515", "41516", "41517", "41518", "41519"], priority: 5 },
  { slug: "gronau", name: "Gronau (Westf.)", type: "gemeinde", parentSlug: "muenster-bezirk", population: 48000, plz: ["48599"], priority: 5 },
  { slug: "gummersbach", name: "Gummersbach", type: "gemeinde", parentSlug: "koeln-bezirk", population: 51000, plz: ["51643", "51645", "51647"], priority: 5 },
  { slug: "haan", name: "Haan", type: "gemeinde", parentSlug: "duesseldorf-bezirk", population: 31000, plz: ["42781"], priority: 4 },
  { slug: "halle-westf", name: "Halle (Westf.)", type: "gemeinde", parentSlug: "detmold-bezirk", population: 22000, plz: ["33790"], priority: 4 },
  { slug: "haltern", name: "Haltern am See", type: "gemeinde", parentSlug: "muenster-bezirk", population: 38000, plz: ["45721"], priority: 4 },
  { slug: "heinsberg", name: "Heinsberg", type: "gemeinde", parentSlug: "koeln-bezirk", population: 43000, plz: ["52525"], priority: 4 },
  { slug: "hemer", name: "Hemer", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 34000, plz: ["58675"], priority: 4 },
  { slug: "hennef", name: "Hennef (Sieg)", type: "gemeinde", parentSlug: "koeln-bezirk", population: 48000, plz: ["53773"], priority: 5 },
  { slug: "herzebrock-clarholz", name: "Herzebrock-Clarholz", type: "gemeinde", parentSlug: "detmold-bezirk", population: 17000, plz: ["33442"], priority: 4 },
  { slug: "hiddenhausen", name: "Hiddenhausen", type: "gemeinde", parentSlug: "detmold-bezirk", population: 20000, plz: ["32120"], priority: 4 },
  { slug: "hilden", name: "Hilden", type: "gemeinde", parentSlug: "duesseldorf-bezirk", population: 56000, plz: ["40721", "40723", "40724"], priority: 5 },
  { slug: "hoerstel", name: "Hörstel", type: "gemeinde", parentSlug: "muenster-bezirk", population: 20000, plz: ["48477"], priority: 4 },
  { slug: "hoexter", name: "Höxter", type: "gemeinde", parentSlug: "detmold-bezirk", population: 29000, plz: ["37671"], priority: 4 },
  { slug: "horn-bad-meinberg", name: "Horn-Bad Meinberg", type: "gemeinde", parentSlug: "detmold-bezirk", population: 17000, plz: ["32805"], priority: 4 },
  { slug: "hueckelhoven", name: "Hückelhoven", type: "gemeinde", parentSlug: "koeln-bezirk", population: 40000, plz: ["41836"], priority: 4 },
  { slug: "hueckeswagen", name: "Hückeswagen", type: "gemeinde", parentSlug: "koeln-bezirk", population: 15000, plz: ["42499"], priority: 4 },
  { slug: "huerth", name: "Hürth", type: "gemeinde", parentSlug: "koeln-bezirk", population: 60000, plz: ["50354"], priority: 5 },
  { slug: "ibbenbueren", name: "Ibbenbüren", type: "gemeinde", parentSlug: "muenster-bezirk", population: 52000, plz: ["49477", "49479"], priority: 5 },
  { slug: "juelich", name: "Jülich", type: "gemeinde", parentSlug: "koeln-bezirk", population: 33000, plz: ["52428"], priority: 4 },
  { slug: "kaarst", name: "Kaarst", type: "gemeinde", parentSlug: "duesseldorf-bezirk", population: 44000, plz: ["41564"], priority: 5 },
  { slug: "kamp-lintfort", name: "Kamp-Lintfort", type: "gemeinde", parentSlug: "duesseldorf-bezirk", population: 38000, plz: ["47475"], priority: 4 },
  { slug: "kevelaer", name: "Kevelaer", type: "gemeinde", parentSlug: "duesseldorf-bezirk", population: 29000, plz: ["47623", "47624", "47625", "47626", "47627"], priority: 4 },
  { slug: "kleve", name: "Kleve", type: "gemeinde", parentSlug: "duesseldorf-bezirk", population: 52000, plz: ["47533"], priority: 5 },
  { slug: "koenigswinter", name: "Königswinter", type: "gemeinde", parentSlug: "koeln-bezirk", population: 42000, plz: ["53639"], priority: 4 },
  { slug: "korschenbroich", name: "Korschenbroich", type: "gemeinde", parentSlug: "duesseldorf-bezirk", population: 33000, plz: ["41352"], priority: 4 },
  { slug: "kreuztal", name: "Kreuztal", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 31000, plz: ["57223"], priority: 4 },
  { slug: "langenfeld", name: "Langenfeld (Rheinland)", type: "gemeinde", parentSlug: "duesseldorf-bezirk", population: 60000, plz: ["40764"], priority: 5 },
  { slug: "lemgo", name: "Lemgo", type: "gemeinde", parentSlug: "detmold-bezirk", population: 41000, plz: ["32657"], priority: 5 },
  { slug: "lennestadt", name: "Lennestadt", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 25000, plz: ["57368"], priority: 4 },
  { slug: "lippstadt", name: "Lippstadt", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 68000, plz: ["59555", "59556", "59557", "59558"], priority: 6 },
  { slug: "loehne", name: "Löhne", type: "gemeinde", parentSlug: "detmold-bezirk", population: 40000, plz: ["32584"], priority: 4 },
  { slug: "luebbecke", name: "Lübbecke", type: "gemeinde", parentSlug: "detmold-bezirk", population: 26000, plz: ["32312"], priority: 4 },
  { slug: "mechernich", name: "Mechernich", type: "gemeinde", parentSlug: "koeln-bezirk", population: 28000, plz: ["53894"], priority: 4 },
  { slug: "meinerzhagen", name: "Meinerzhagen", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 20000, plz: ["58540"], priority: 4 },
  { slug: "menden", name: "Menden (Sauerland)", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 53000, plz: ["58706", "58708", "58710"], priority: 5 },
  { slug: "meschede", name: "Meschede", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 30000, plz: ["59872"], priority: 4 },
  { slug: "mettmann", name: "Mettmann", type: "gemeinde", parentSlug: "duesseldorf-bezirk", population: 39000, plz: ["40822"], priority: 4 },
  { slug: "monheim", name: "Monheim am Rhein", type: "gemeinde", parentSlug: "duesseldorf-bezirk", population: 42000, plz: ["40789"], priority: 4 },
  { slug: "neukirchen-vluyn", name: "Neukirchen-Vluyn", type: "gemeinde", parentSlug: "duesseldorf-bezirk", population: 27000, plz: ["47506"], priority: 4 },
  { slug: "neunkirchen-seelscheid", name: "Neunkirchen-Seelscheid", type: "gemeinde", parentSlug: "koeln-bezirk", population: 20000, plz: ["53819"], priority: 4 },
  { slug: "niederkassel", name: "Niederkassel", type: "gemeinde", parentSlug: "koeln-bezirk", population: 39000, plz: ["53859"], priority: 4 },
  { slug: "ochtrup", name: "Ochtrup", type: "gemeinde", parentSlug: "muenster-bezirk", population: 20000, plz: ["48607"], priority: 4 },
  { slug: "oelde", name: "Oelde", type: "gemeinde", parentSlug: "muenster-bezirk", population: 30000, plz: ["59302"], priority: 4 },
  { slug: "oer-erkenschwick", name: "Oer-Erkenschwick", type: "gemeinde", parentSlug: "muenster-bezirk", population: 31000, plz: ["45739"], priority: 4 },
  { slug: "olpe", name: "Olpe", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 25000, plz: ["57462"], priority: 4 },
  { slug: "petershagen", name: "Petershagen", type: "gemeinde", parentSlug: "detmold-bezirk", population: 25000, plz: ["32469"], priority: 4 },
  { slug: "plettenberg", name: "Plettenberg", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 25000, plz: ["58840"], priority: 4 },
  { slug: "porta-westfalica", name: "Porta Westfalica", type: "gemeinde", parentSlug: "detmold-bezirk", population: 36000, plz: ["32457"], priority: 4 },
  { slug: "pulheim", name: "Pulheim", type: "gemeinde", parentSlug: "koeln-bezirk", population: 55000, plz: ["50259"], priority: 5 },
  { slug: "radevormwald", name: "Radevormwald", type: "gemeinde", parentSlug: "koeln-bezirk", population: 22000, plz: ["42477"], priority: 4 },
  { slug: "rees", name: "Rees", type: "gemeinde", parentSlug: "duesseldorf-bezirk", population: 22000, plz: ["46459"], priority: 4 },
  { slug: "rheda-wiedenbrueck", name: "Rheda-Wiedenbrück", type: "gemeinde", parentSlug: "detmold-bezirk", population: 48000, plz: ["33378"], priority: 5 },
  { slug: "rheinbach", name: "Rheinbach", type: "gemeinde", parentSlug: "koeln-bezirk", population: 28000, plz: ["53359"], priority: 4 },
  { slug: "rheinberg", name: "Rheinberg", type: "gemeinde", parentSlug: "duesseldorf-bezirk", population: 31000, plz: ["47495"], priority: 4 },
  { slug: "rietberg", name: "Rietberg", type: "gemeinde", parentSlug: "detmold-bezirk", population: 30000, plz: ["33397"], priority: 4 },
  { slug: "salzkotten", name: "Salzkotten", type: "gemeinde", parentSlug: "detmold-bezirk", population: 26000, plz: ["33154"], priority: 4 },
  { slug: "sankt-augustin", name: "Sankt Augustin", type: "gemeinde", parentSlug: "koeln-bezirk", population: 56000, plz: ["53757"], priority: 5 },
  { slug: "schloß-holte-stukenbrock", name: "Schloß Holte-Stukenbrock", type: "gemeinde", parentSlug: "detmold-bezirk", population: 27000, plz: ["33758"], priority: 4 },
  { slug: "schmallenberg", name: "Schmallenberg", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 24000, plz: ["57392"], priority: 4 },
  { slug: "schwelm", name: "Schwelm", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 28000, plz: ["58332"], priority: 4 },
  { slug: "schwerte", name: "Schwerte", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 47000, plz: ["58239"], priority: 5 },
  { slug: "selm", name: "Selm", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 26000, plz: ["59379"], priority: 4 },
  { slug: "senden-nrw", name: "Senden", type: "gemeinde", parentSlug: "muenster-bezirk", population: 21000, plz: ["48308"], priority: 4 },
  { slug: "siegburg", name: "Siegburg", type: "gemeinde", parentSlug: "koeln-bezirk", population: 42000, plz: ["53721"], priority: 5 },
  { slug: "soest", name: "Soest", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 48000, plz: ["59494"], priority: 5 },
  { slug: "spenge", name: "Spenge", type: "gemeinde", parentSlug: "detmold-bezirk", population: 15000, plz: ["32139"], priority: 4 },
  { slug: "sprockhövel", name: "Sprockhövel", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 24000, plz: ["45549"], priority: 4 },
  { slug: "steinfurt", name: "Steinfurt", type: "gemeinde", parentSlug: "muenster-bezirk", population: 35000, plz: ["48565"], priority: 4 },
  { slug: "stolberg", name: "Stolberg (Rheinland)", type: "gemeinde", parentSlug: "koeln-bezirk", population: 57000, plz: ["52222", "52223", "52224"], priority: 5 },
  { slug: "straelen", name: "Straelen", type: "gemeinde", parentSlug: "duesseldorf-bezirk", population: 16000, plz: ["47638"], priority: 4 },
  { slug: "sundern", name: "Sundern (Sauerland)", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 27000, plz: ["59846"], priority: 4 },
  { slug: "toenisvorst", name: "Tönisvorst", type: "gemeinde", parentSlug: "duesseldorf-bezirk", population: 30000, plz: ["47918"], priority: 4 },
  { slug: "versmold", name: "Versmold", type: "gemeinde", parentSlug: "detmold-bezirk", population: 22000, plz: ["33775"], priority: 4 },
  { slug: "viersen", name: "Viersen", type: "kreisfreie-stadt", parentSlug: "duesseldorf-bezirk", population: 77000, plz: ["41747", "41748", "41749", "41751"], priority: 6 },
  { slug: "vlotho", name: "Vlotho", type: "gemeinde", parentSlug: "detmold-bezirk", population: 18000, plz: ["32602"], priority: 4 },
  { slug: "voerde", name: "Voerde (Niederrhein)", type: "gemeinde", parentSlug: "duesseldorf-bezirk", population: 36000, plz: ["46562"], priority: 4 },
  { slug: "vreden", name: "Vreden", type: "gemeinde", parentSlug: "muenster-bezirk", population: 23000, plz: ["48691"], priority: 4 },
  { slug: "waltrop", name: "Waltrop", type: "gemeinde", parentSlug: "muenster-bezirk", population: 29000, plz: ["45731"], priority: 4 },
  { slug: "warburg", name: "Warburg", type: "gemeinde", parentSlug: "detmold-bezirk", population: 23000, plz: ["34414"], priority: 4 },
  { slug: "warendorf", name: "Warendorf", type: "gemeinde", parentSlug: "muenster-bezirk", population: 38000, plz: ["48231"], priority: 4 },
  { slug: "warstein", name: "Warstein", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 24000, plz: ["59581"], priority: 4 },
  { slug: "wegberg", name: "Wegberg", type: "gemeinde", parentSlug: "koeln-bezirk", population: 28000, plz: ["41844"], priority: 4 },
  { slug: "werdohl", name: "Werdohl", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 18000, plz: ["58791"], priority: 4 },
  { slug: "werl", name: "Werl", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 32000, plz: ["59457"], priority: 4 },
  { slug: "wermelskirchen", name: "Wermelskirchen", type: "gemeinde", parentSlug: "koeln-bezirk", population: 35000, plz: ["42929"], priority: 4 },
  { slug: "werne", name: "Werne", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 30000, plz: ["59368"], priority: 4 },
  { slug: "wesseling", name: "Wesseling", type: "gemeinde", parentSlug: "koeln-bezirk", population: 37000, plz: ["50389"], priority: 4 },
  { slug: "wetter", name: "Wetter (Ruhr)", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 27000, plz: ["58300"], priority: 4 },
  { slug: "wiehl", name: "Wiehl", type: "gemeinde", parentSlug: "koeln-bezirk", population: 26000, plz: ["51674"], priority: 4 },
  { slug: "willich", name: "Willich", type: "gemeinde", parentSlug: "duesseldorf-bezirk", population: 51000, plz: ["47877"], priority: 5 },
  { slug: "winterberg", name: "Winterberg", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 13000, plz: ["59955"], priority: 4 },
  { slug: "wipperfuerth", name: "Wipperfürth", type: "gemeinde", parentSlug: "koeln-bezirk", population: 21000, plz: ["51688"], priority: 4 },
  { slug: "wuerselen", name: "Würselen", type: "gemeinde", parentSlug: "koeln-bezirk", population: 39000, plz: ["52146"], priority: 4 },
  { slug: "wuelfrath", name: "Wülfrath", type: "gemeinde", parentSlug: "duesseldorf-bezirk", population: 21000, plz: ["42489"], priority: 4 },

  // =====================================================
  // GEMEINDEN 10.000+ EINWOHNER - NIEDERSACHSEN (Ergänzung)
  // =====================================================
  { slug: "achim", name: "Achim", type: "gemeinde", parentSlug: "niedersachsen", population: 33000, plz: ["28832"], priority: 4 },
  { slug: "aurich", name: "Aurich", type: "gemeinde", parentSlug: "niedersachsen", population: 43000, plz: ["26603", "26605", "26607"], priority: 5 },
  { slug: "bad-bentheim", name: "Bad Bentheim", type: "gemeinde", parentSlug: "niedersachsen", population: 16000, plz: ["48455"], priority: 4 },
  { slug: "bad-harzburg", name: "Bad Harzburg", type: "gemeinde", parentSlug: "niedersachsen", population: 22000, plz: ["38667"], priority: 4 },
  { slug: "bad-nenndorf", name: "Bad Nenndorf", type: "gemeinde", parentSlug: "niedersachsen", population: 11000, plz: ["31542"], priority: 4 },
  { slug: "bad-pyrmont", name: "Bad Pyrmont", type: "gemeinde", parentSlug: "niedersachsen", population: 19000, plz: ["31812"], priority: 4 },
  { slug: "bad-zwischenahn", name: "Bad Zwischenahn", type: "gemeinde", parentSlug: "niedersachsen", population: 29000, plz: ["26160"], priority: 4 },
  { slug: "barsinghausen", name: "Barsinghausen", type: "gemeinde", parentSlug: "niedersachsen", population: 35000, plz: ["30890"], priority: 4 },
  { slug: "brake", name: "Brake (Unterweser)", type: "gemeinde", parentSlug: "niedersachsen", population: 15000, plz: ["26919"], priority: 4 },
  { slug: "bramsche", name: "Bramsche", type: "gemeinde", parentSlug: "niedersachsen", population: 31000, plz: ["49565"], priority: 4 },
  { slug: "buchholz", name: "Buchholz in der Nordheide", type: "gemeinde", parentSlug: "niedersachsen", population: 41000, plz: ["21244"], priority: 4 },
  { slug: "bueckeburg", name: "Bückeburg", type: "gemeinde", parentSlug: "niedersachsen", population: 19000, plz: ["31675"], priority: 4 },
  { slug: "burgdorf", name: "Burgdorf", type: "gemeinde", parentSlug: "niedersachsen", population: 31000, plz: ["31303"], priority: 4 },
  { slug: "buxtehude", name: "Buxtehude", type: "gemeinde", parentSlug: "niedersachsen", population: 41000, plz: ["21614"], priority: 5 },
  { slug: "clausthal-zellerfeld", name: "Clausthal-Zellerfeld", type: "gemeinde", parentSlug: "niedersachsen", population: 15000, plz: ["38678"], priority: 4 },
  { slug: "cloppenburg", name: "Cloppenburg", type: "gemeinde", parentSlug: "niedersachsen", population: 36000, plz: ["49661"], priority: 4 },
  { slug: "edewecht", name: "Edewecht", type: "gemeinde", parentSlug: "niedersachsen", population: 23000, plz: ["26188"], priority: 4 },
  { slug: "einbeck", name: "Einbeck", type: "gemeinde", parentSlug: "niedersachsen", population: 30000, plz: ["37574"], priority: 4 },
  { slug: "friesoythe", name: "Friesoythe", type: "gemeinde", parentSlug: "niedersachsen", population: 23000, plz: ["26169"], priority: 4 },
  { slug: "ganderkesee", name: "Ganderkesee", type: "gemeinde", parentSlug: "niedersachsen", population: 32000, plz: ["27777"], priority: 4 },
  { slug: "garbsen", name: "Garbsen", type: "gemeinde", parentSlug: "niedersachsen", population: 61000, plz: ["30823", "30826", "30827"], priority: 5 },
  { slug: "georgsmarienhütte", name: "Georgsmarienhütte", type: "gemeinde", parentSlug: "niedersachsen", population: 32000, plz: ["49124"], priority: 4 },
  { slug: "gifhorn", name: "Gifhorn", type: "gemeinde", parentSlug: "niedersachsen", population: 43000, plz: ["38518"], priority: 5 },
  { slug: "göttingen", name: "Göttingen", type: "gemeinde", parentSlug: "niedersachsen", population: 119000, plz: ["37073", "37075", "37077", "37079", "37081", "37083", "37085"], priority: 8 },
  { slug: "hann-muenden", name: "Hann. Münden", type: "gemeinde", parentSlug: "niedersachsen", population: 23000, plz: ["34346"], priority: 4 },
  { slug: "helmstedt", name: "Helmstedt", type: "gemeinde", parentSlug: "niedersachsen", population: 24000, plz: ["38350"], priority: 4 },
  { slug: "hemmingen", name: "Hemmingen", type: "gemeinde", parentSlug: "niedersachsen", population: 19000, plz: ["30966"], priority: 4 },
  { slug: "holzminden", name: "Holzminden", type: "gemeinde", parentSlug: "niedersachsen", population: 20000, plz: ["37603"], priority: 4 },
  { slug: "ilsede", name: "Ilsede", type: "gemeinde", parentSlug: "niedersachsen", population: 22000, plz: ["31241"], priority: 4 },
  { slug: "isernhagen", name: "Isernhagen", type: "gemeinde", parentSlug: "niedersachsen", population: 24000, plz: ["30916"], priority: 4 },
  { slug: "jever", name: "Jever", type: "gemeinde", parentSlug: "niedersachsen", population: 15000, plz: ["26441"], priority: 4 },
  { slug: "laatzen", name: "Laatzen", type: "gemeinde", parentSlug: "niedersachsen", population: 42000, plz: ["30880"], priority: 5 },
  { slug: "langenhagen", name: "Langenhagen", type: "gemeinde", parentSlug: "niedersachsen", population: 54000, plz: ["30851", "30853", "30855"], priority: 5 },
  { slug: "leer", name: "Leer (Ostfriesland)", type: "gemeinde", parentSlug: "niedersachsen", population: 35000, plz: ["26789"], priority: 4 },
  { slug: "lehrte", name: "Lehrte", type: "gemeinde", parentSlug: "niedersachsen", population: 45000, plz: ["31275"], priority: 5 },
  { slug: "meppen", name: "Meppen", type: "gemeinde", parentSlug: "niedersachsen", population: 36000, plz: ["49716"], priority: 4 },
  { slug: "melle", name: "Melle", type: "gemeinde", parentSlug: "niedersachsen", population: 46000, plz: ["49324"], priority: 5 },
  { slug: "neustadt-rbge", name: "Neustadt am Rübenberge", type: "gemeinde", parentSlug: "niedersachsen", population: 44000, plz: ["31535"], priority: 4 },
  { slug: "nienburg", name: "Nienburg/Weser", type: "gemeinde", parentSlug: "niedersachsen", population: 31000, plz: ["31582"], priority: 4 },
  { slug: "norden", name: "Norden", type: "gemeinde", parentSlug: "niedersachsen", population: 25000, plz: ["26506"], priority: 4 },
  { slug: "nordenham", name: "Nordenham", type: "gemeinde", parentSlug: "niedersachsen", population: 26000, plz: ["26954"], priority: 4 },
  { slug: "northeim", name: "Northeim", type: "gemeinde", parentSlug: "niedersachsen", population: 29000, plz: ["37154"], priority: 4 },
  { slug: "osterholz-scharmbeck", name: "Osterholz-Scharmbeck", type: "gemeinde", parentSlug: "niedersachsen", population: 31000, plz: ["27711"], priority: 4 },
  { slug: "osterode", name: "Osterode am Harz", type: "gemeinde", parentSlug: "niedersachsen", population: 21000, plz: ["37520"], priority: 4 },
  { slug: "papenburg", name: "Papenburg", type: "gemeinde", parentSlug: "niedersachsen", population: 37000, plz: ["26871"], priority: 4 },
  { slug: "rinteln", name: "Rinteln", type: "gemeinde", parentSlug: "niedersachsen", population: 25000, plz: ["31737"], priority: 4 },
  { slug: "ronnenberg", name: "Ronnenberg", type: "gemeinde", parentSlug: "niedersachsen", population: 24000, plz: ["30952"], priority: 4 },
  { slug: "sarstedt", name: "Sarstedt", type: "gemeinde", parentSlug: "niedersachsen", population: 19000, plz: ["31157"], priority: 4 },
  { slug: "seelze", name: "Seelze", type: "gemeinde", parentSlug: "niedersachsen", population: 35000, plz: ["30926"], priority: 4 },
  { slug: "seesen", name: "Seesen", type: "gemeinde", parentSlug: "niedersachsen", population: 19000, plz: ["38723"], priority: 4 },
  { slug: "sehnde", name: "Sehnde", type: "gemeinde", parentSlug: "niedersachsen", population: 24000, plz: ["31319"], priority: 4 },
  { slug: "springe", name: "Springe", type: "gemeinde", parentSlug: "niedersachsen", population: 29000, plz: ["31832"], priority: 4 },
  { slug: "stade", name: "Stade", type: "gemeinde", parentSlug: "niedersachsen", population: 48000, plz: ["21680", "21682", "21683", "21684"], priority: 5 },
  { slug: "stadthagen", name: "Stadthagen", type: "gemeinde", parentSlug: "niedersachsen", population: 22000, plz: ["31655"], priority: 4 },
  { slug: "stuhr", name: "Stuhr", type: "gemeinde", parentSlug: "niedersachsen", population: 34000, plz: ["28816"], priority: 4 },
  { slug: "syke", name: "Syke", type: "gemeinde", parentSlug: "niedersachsen", population: 25000, plz: ["28857"], priority: 4 },
  { slug: "uelzen", name: "Uelzen", type: "gemeinde", parentSlug: "niedersachsen", population: 34000, plz: ["29525"], priority: 4 },
  { slug: "varel", name: "Varel", type: "gemeinde", parentSlug: "niedersachsen", population: 24000, plz: ["26316"], priority: 4 },
  { slug: "vechta", name: "Vechta", type: "gemeinde", parentSlug: "niedersachsen", population: 33000, plz: ["49377"], priority: 4 },
  { slug: "verden", name: "Verden (Aller)", type: "gemeinde", parentSlug: "niedersachsen", population: 28000, plz: ["27283"], priority: 4 },
  { slug: "wallenhorst", name: "Wallenhorst", type: "gemeinde", parentSlug: "niedersachsen", population: 23000, plz: ["49134"], priority: 4 },
  { slug: "walsrode", name: "Walsrode", type: "gemeinde", parentSlug: "niedersachsen", population: 23000, plz: ["29664"], priority: 4 },
  { slug: "wedemark", name: "Wedemark", type: "gemeinde", parentSlug: "niedersachsen", population: 30000, plz: ["30900"], priority: 4 },
  { slug: "westerstede", name: "Westerstede", type: "gemeinde", parentSlug: "niedersachsen", population: 23000, plz: ["26655"], priority: 4 },
  { slug: "winsen-luhe", name: "Winsen (Luhe)", type: "gemeinde", parentSlug: "niedersachsen", population: 36000, plz: ["21423"], priority: 4 },
  { slug: "wittmund", name: "Wittmund", type: "gemeinde", parentSlug: "niedersachsen", population: 21000, plz: ["26409"], priority: 4 },
  { slug: "wunstorf", name: "Wunstorf", type: "gemeinde", parentSlug: "niedersachsen", population: 42000, plz: ["31515"], priority: 5 },

  // =====================================================
  // GEMEINDEN 10.000+ EINWOHNER - HESSEN (Ergänzung)
  // =====================================================
  { slug: "alsfeld", name: "Alsfeld", type: "gemeinde", parentSlug: "giessen-bezirk", population: 16000, plz: ["36304"], priority: 4 },
  { slug: "bad-hersfeld", name: "Bad Hersfeld", type: "gemeinde", parentSlug: "kassel-bezirk", population: 30000, plz: ["36251"], priority: 4 },
  { slug: "bad-nauheim", name: "Bad Nauheim", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 32000, plz: ["61231"], priority: 4 },
  { slug: "bad-soden", name: "Bad Soden am Taunus", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 23000, plz: ["65812"], priority: 4 },
  { slug: "baunatal", name: "Baunatal", type: "gemeinde", parentSlug: "kassel-bezirk", population: 28000, plz: ["34225"], priority: 4 },
  { slug: "bensheim", name: "Bensheim", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 42000, plz: ["64625"], priority: 5 },
  { slug: "buedingen", name: "Büdingen", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 22000, plz: ["63654"], priority: 4 },
  { slug: "butzbach", name: "Butzbach", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 26000, plz: ["35510"], priority: 4 },
  { slug: "dillenburg", name: "Dillenburg", type: "gemeinde", parentSlug: "giessen-bezirk", population: 24000, plz: ["35683"], priority: 4 },
  { slug: "dietzenbach", name: "Dietzenbach", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 35000, plz: ["63128"], priority: 4 },
  { slug: "eltville", name: "Eltville am Rhein", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 17000, plz: ["65343", "65344", "65345", "65346", "65347"], priority: 4 },
  { slug: "eschborn", name: "Eschborn", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 22000, plz: ["65760"], priority: 4 },
  { slug: "eschwege", name: "Eschwege", type: "gemeinde", parentSlug: "kassel-bezirk", population: 19000, plz: ["37269"], priority: 4 },
  { slug: "frankenberg", name: "Frankenberg (Eder)", type: "gemeinde", parentSlug: "kassel-bezirk", population: 18000, plz: ["35066"], priority: 4 },
  { slug: "friedrichsdorf", name: "Friedrichsdorf", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 25000, plz: ["61381"], priority: 4 },
  { slug: "fritzlar", name: "Fritzlar", type: "gemeinde", parentSlug: "kassel-bezirk", population: 15000, plz: ["34560"], priority: 4 },
  { slug: "gross-gerau", name: "Groß-Gerau", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 26000, plz: ["64521"], priority: 4 },
  { slug: "gruenberg", name: "Grünberg", type: "gemeinde", parentSlug: "giessen-bezirk", population: 14000, plz: ["35305"], priority: 4 },
  { slug: "gruendau", name: "Gründau", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 15000, plz: ["63584"], priority: 4 },
  { slug: "hadamar", name: "Hadamar", type: "gemeinde", parentSlug: "giessen-bezirk", population: 13000, plz: ["65589"], priority: 4 },
  { slug: "hattersheim", name: "Hattersheim am Main", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 28000, plz: ["65795"], priority: 4 },
  { slug: "heppenheim", name: "Heppenheim", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 26000, plz: ["64646"], priority: 4 },
  { slug: "herborn", name: "Herborn", type: "gemeinde", parentSlug: "giessen-bezirk", population: 21000, plz: ["35745"], priority: 4 },
  { slug: "hochheim", name: "Hochheim am Main", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 18000, plz: ["65239"], priority: 4 },
  { slug: "hofgeismar", name: "Hofgeismar", type: "gemeinde", parentSlug: "kassel-bezirk", population: 15000, plz: ["34369"], priority: 4 },
  { slug: "hofheim", name: "Hofheim am Taunus", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 40000, plz: ["65719"], priority: 5 },
  { slug: "homberg-efze", name: "Homberg (Efze)", type: "gemeinde", parentSlug: "kassel-bezirk", population: 14000, plz: ["34576"], priority: 4 },
  { slug: "idstein", name: "Idstein", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 25000, plz: ["65510"], priority: 4 },
  { slug: "karben", name: "Karben", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 23000, plz: ["61184"], priority: 4 },
  { slug: "kelkheim", name: "Kelkheim (Taunus)", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 30000, plz: ["65779"], priority: 4 },
  { slug: "kirchhain", name: "Kirchhain", type: "gemeinde", parentSlug: "giessen-bezirk", population: 16000, plz: ["35274"], priority: 4 },
  { slug: "koenigstein", name: "Königstein im Taunus", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 17000, plz: ["61462"], priority: 4 },
  { slug: "korbach", name: "Korbach", type: "gemeinde", parentSlug: "kassel-bezirk", population: 24000, plz: ["34497"], priority: 4 },
  { slug: "kronberg", name: "Kronberg im Taunus", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 18000, plz: ["61476"], priority: 4 },
  { slug: "lampertheim", name: "Lampertheim", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 33000, plz: ["68623"], priority: 4 },
  { slug: "maintal", name: "Maintal", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 40000, plz: ["63477"], priority: 5 },
  { slug: "melsungen", name: "Melsungen", type: "gemeinde", parentSlug: "kassel-bezirk", population: 14000, plz: ["34212"], priority: 4 },
  { slug: "moerfelden-walldorf", name: "Mörfelden-Walldorf", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 35000, plz: ["64546"], priority: 4 },
  { slug: "muenster-hessen", name: "Münster (Hessen)", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 15000, plz: ["64839"], priority: 4 },
  { slug: "neu-anspach", name: "Neu-Anspach", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 15000, plz: ["61267"], priority: 4 },
  { slug: "neu-isenburg", name: "Neu-Isenburg", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 39000, plz: ["63263"], priority: 5 },
  { slug: "nidda", name: "Nidda", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 17000, plz: ["63667"], priority: 4 },
  { slug: "nidderau", name: "Nidderau", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 21000, plz: ["61130"], priority: 4 },
  { slug: "obertshausen", name: "Obertshausen", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 25000, plz: ["63179"], priority: 4 },
  { slug: "pfungstadt", name: "Pfungstadt", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 26000, plz: ["64319"], priority: 4 },
  { slug: "pohlheim", name: "Pohlheim", type: "gemeinde", parentSlug: "giessen-bezirk", population: 19000, plz: ["35415"], priority: 4 },
  { slug: "reinheim", name: "Reinheim", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 17000, plz: ["64354"], priority: 4 },
  { slug: "roedermark", name: "Rödermark", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 28000, plz: ["63322"], priority: 4 },
  { slug: "rosbach", name: "Rosbach vor der Höhe", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 13000, plz: ["61191"], priority: 4 },
  { slug: "rotenburg-fulda", name: "Rotenburg an der Fulda", type: "gemeinde", parentSlug: "kassel-bezirk", population: 14000, plz: ["36199"], priority: 4 },
  { slug: "schwalmstadt", name: "Schwalmstadt", type: "gemeinde", parentSlug: "kassel-bezirk", population: 18000, plz: ["34613"], priority: 4 },
  { slug: "seligenstadt", name: "Seligenstadt", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 21000, plz: ["63500"], priority: 4 },
  { slug: "solms", name: "Solms", type: "gemeinde", parentSlug: "giessen-bezirk", population: 14000, plz: ["35606"], priority: 4 },
  { slug: "stadtallendorf", name: "Stadtallendorf", type: "gemeinde", parentSlug: "giessen-bezirk", population: 21000, plz: ["35260"], priority: 4 },
  { slug: "steinbach", name: "Steinbach (Taunus)", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 11000, plz: ["61449"], priority: 4 },
  { slug: "taunusstein", name: "Taunusstein", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 31000, plz: ["65232"], priority: 4 },
  { slug: "usingen", name: "Usingen", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 15000, plz: ["61250"], priority: 4 },
  { slug: "viernheim", name: "Viernheim", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 34000, plz: ["68519"], priority: 4 },
  { slug: "weilburg", name: "Weilburg", type: "gemeinde", parentSlug: "giessen-bezirk", population: 13000, plz: ["35781"], priority: 4 },
  { slug: "wetzlar", name: "Wetzlar", type: "gemeinde", parentSlug: "giessen-bezirk", population: 53000, plz: ["35576", "35578", "35579", "35580", "35581", "35582", "35583", "35584", "35585", "35586"], priority: 6 },

  // =====================================================
  // GEMEINDEN 10.000+ EINWOHNER - SACHSEN (Ergänzung)
  // =====================================================
  { slug: "annaberg-buchholz", name: "Annaberg-Buchholz", type: "gemeinde", parentSlug: "sachsen", population: 20000, plz: ["09456"], priority: 4 },
  { slug: "aue", name: "Aue-Bad Schlema", type: "gemeinde", parentSlug: "sachsen", population: 20000, plz: ["08280"], priority: 4 },
  { slug: "borna", name: "Borna", type: "gemeinde", parentSlug: "sachsen", population: 19000, plz: ["04552"], priority: 4 },
  { slug: "coswig", name: "Coswig", type: "gemeinde", parentSlug: "sachsen", population: 20000, plz: ["01640"], priority: 4 },
  { slug: "crimmitschau", name: "Crimmitschau", type: "gemeinde", parentSlug: "sachsen", population: 18000, plz: ["08451"], priority: 4 },
  { slug: "delitzsch", name: "Delitzsch", type: "gemeinde", parentSlug: "sachsen", population: 25000, plz: ["04509"], priority: 4 },
  { slug: "doebeln", name: "Döbeln", type: "gemeinde", parentSlug: "sachsen", population: 24000, plz: ["04720"], priority: 4 },
  { slug: "eilenburg", name: "Eilenburg", type: "gemeinde", parentSlug: "sachsen", population: 15000, plz: ["04838"], priority: 4 },
  { slug: "falkenstein", name: "Falkenstein/Vogtl.", type: "gemeinde", parentSlug: "sachsen", population: 8000, plz: ["08223"], priority: 4 },
  { slug: "grimma", name: "Grimma", type: "gemeinde", parentSlug: "sachsen", population: 28000, plz: ["04668"], priority: 4 },
  { slug: "grossenhain", name: "Großenhain", type: "gemeinde", parentSlug: "sachsen", population: 18000, plz: ["01558"], priority: 4 },
  { slug: "heidenau", name: "Heidenau", type: "gemeinde", parentSlug: "sachsen", population: 16000, plz: ["01809"], priority: 4 },
  { slug: "hohenstein-ernstthal", name: "Hohenstein-Ernstthal", type: "gemeinde", parentSlug: "sachsen", population: 15000, plz: ["09337"], priority: 4 },
  { slug: "hoyerswerda", name: "Hoyerswerda", type: "kreisfreie-stadt", parentSlug: "sachsen", population: 32000, plz: ["02977"], priority: 5 },
  { slug: "kamenz", name: "Kamenz", type: "gemeinde", parentSlug: "sachsen", population: 17000, plz: ["01917"], priority: 4 },
  { slug: "loebau", name: "Löbau", type: "gemeinde", parentSlug: "sachsen", population: 15000, plz: ["02708"], priority: 4 },
  { slug: "marienberg", name: "Marienberg", type: "gemeinde", parentSlug: "sachsen", population: 17000, plz: ["09496"], priority: 4 },
  { slug: "markkleeberg", name: "Markkleeberg", type: "gemeinde", parentSlug: "sachsen", population: 25000, plz: ["04416"], priority: 4 },
  { slug: "meerane", name: "Meerane", type: "gemeinde", parentSlug: "sachsen", population: 14000, plz: ["08393"], priority: 4 },
  { slug: "mittweida", name: "Mittweida", type: "gemeinde", parentSlug: "sachsen", population: 15000, plz: ["09648"], priority: 4 },
  { slug: "oschatz", name: "Oschatz", type: "gemeinde", parentSlug: "sachsen", population: 14000, plz: ["04758"], priority: 4 },
  { slug: "reichenbach", name: "Reichenbach im Vogtland", type: "gemeinde", parentSlug: "sachsen", population: 21000, plz: ["08468"], priority: 4 },
  { slug: "riesa", name: "Riesa", type: "gemeinde", parentSlug: "sachsen", population: 29000, plz: ["01589", "01591"], priority: 5 },
  { slug: "schkeuditz", name: "Schkeuditz", type: "gemeinde", parentSlug: "sachsen", population: 18000, plz: ["04435"], priority: 4 },
  { slug: "schneeberg", name: "Schneeberg", type: "gemeinde", parentSlug: "sachsen", population: 14000, plz: ["08289"], priority: 4 },
  { slug: "schwarzenberg", name: "Schwarzenberg/Erzgeb.", type: "gemeinde", parentSlug: "sachsen", population: 17000, plz: ["08340"], priority: 4 },
  { slug: "stollberg", name: "Stollberg/Erzgeb.", type: "gemeinde", parentSlug: "sachsen", population: 11000, plz: ["09366"], priority: 4 },
  { slug: "torgau", name: "Torgau", type: "gemeinde", parentSlug: "sachsen", population: 20000, plz: ["04860"], priority: 4 },
  { slug: "werdau", name: "Werdau", type: "gemeinde", parentSlug: "sachsen", population: 21000, plz: ["08412"], priority: 4 },
  { slug: "weisswasser", name: "Weißwasser/O.L.", type: "gemeinde", parentSlug: "sachsen", population: 16000, plz: ["02943"], priority: 4 },
  { slug: "wurzen", name: "Wurzen", type: "gemeinde", parentSlug: "sachsen", population: 16000, plz: ["04808"], priority: 4 },
  { slug: "zittau", name: "Zittau", type: "gemeinde", parentSlug: "sachsen", population: 25000, plz: ["02763"], priority: 4 },

  // =====================================================
  // GEMEINDEN 10.000+ EINWOHNER - RHEINLAND-PFALZ (Ergänzung)
  // =====================================================
  { slug: "alzey", name: "Alzey", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 19000, plz: ["55232"], priority: 4 },
  { slug: "andernach-gemeinde", name: "Andernach", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 30000, plz: ["56626"], priority: 4 },
  { slug: "bad-duerkheim", name: "Bad Dürkheim", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 19000, plz: ["67098"], priority: 4 },
  { slug: "bad-ems", name: "Bad Ems", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 10000, plz: ["56130"], priority: 4 },
  { slug: "bad-neuenahr-ahrweiler", name: "Bad Neuenahr-Ahrweiler", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 28000, plz: ["53474"], priority: 4 },
  { slug: "bendorf", name: "Bendorf", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 17000, plz: ["56170"], priority: 4 },
  { slug: "bingen", name: "Bingen am Rhein", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 26000, plz: ["55411"], priority: 4 },
  { slug: "bitburg", name: "Bitburg", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 15000, plz: ["54634"], priority: 4 },
  { slug: "boppard", name: "Boppard", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 16000, plz: ["56154"], priority: 4 },
  { slug: "cochem", name: "Cochem", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 5000, plz: ["56812"], priority: 4 },
  { slug: "germersheim", name: "Germersheim", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 21000, plz: ["76726"], priority: 4 },
  { slug: "gruenstadt", name: "Grünstadt", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 14000, plz: ["67269"], priority: 4 },
  { slug: "hassloch", name: "Haßloch", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 21000, plz: ["67454"], priority: 4 },
  { slug: "herxheim", name: "Herxheim bei Landau/Pfalz", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 11000, plz: ["76863"], priority: 4 },
  { slug: "ingelheim", name: "Ingelheim am Rhein", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 35000, plz: ["55218"], priority: 4 },
  { slug: "konz", name: "Konz", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 18000, plz: ["54329"], priority: 4 },
  { slug: "lahnstein", name: "Lahnstein", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 18000, plz: ["56112"], priority: 4 },
  { slug: "limburgerhof", name: "Limburgerhof", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 11000, plz: ["67117"], priority: 4 },
  { slug: "mayen", name: "Mayen", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 19000, plz: ["56727"], priority: 4 },
  { slug: "montabaur", name: "Montabaur", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 14000, plz: ["56410"], priority: 4 },
  { slug: "muelheim-kaerlich", name: "Mülheim-Kärlich", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 11000, plz: ["56218"], priority: 4 },
  { slug: "mutterstadt", name: "Mutterstadt", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 13000, plz: ["67112"], priority: 4 },
  { slug: "remagen", name: "Remagen", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 17000, plz: ["53424"], priority: 4 },
  { slug: "schifferstadt", name: "Schifferstadt", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 21000, plz: ["67105"], priority: 4 },
  { slug: "sinzig", name: "Sinzig", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 18000, plz: ["53489"], priority: 4 },
  { slug: "wittlich", name: "Wittlich", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 19000, plz: ["54516"], priority: 4 },
  { slug: "woerth", name: "Wörth am Rhein", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 18000, plz: ["76744"], priority: 4 },

  // =====================================================
  // WEITERE GEMEINDEN - BAYERN (Ergänzung 10.000+)
  // =====================================================
  { slug: "aichach", name: "Aichach", type: "gemeinde", parentSlug: "schwaben", population: 22000, plz: ["86551"], priority: 4 },
  { slug: "altdorf", name: "Altdorf bei Nürnberg", type: "gemeinde", parentSlug: "mittelfranken", population: 15000, plz: ["90518"], priority: 4 },
  { slug: "altoetting", name: "Altötting", type: "gemeinde", parentSlug: "oberbayern", population: 13000, plz: ["84503"], priority: 4 },
  { slug: "bad-reichenhall", name: "Bad Reichenhall", type: "gemeinde", parentSlug: "oberbayern", population: 18000, plz: ["83435"], priority: 4 },
  { slug: "bad-toelz", name: "Bad Tölz", type: "gemeinde", parentSlug: "oberbayern", population: 19000, plz: ["83646"], priority: 4 },
  { slug: "bogen", name: "Bogen", type: "gemeinde", parentSlug: "niederbayern", population: 10000, plz: ["94327"], priority: 3 },
  { slug: "bruckmuehl", name: "Bruckmühl", type: "gemeinde", parentSlug: "oberbayern", population: 18000, plz: ["83052"], priority: 4 },
  { slug: "dorfen", name: "Dorfen", type: "gemeinde", parentSlug: "oberbayern", population: 15000, plz: ["84405"], priority: 4 },
  { slug: "ebersberg", name: "Ebersberg", type: "gemeinde", parentSlug: "oberbayern", population: 12000, plz: ["85560"], priority: 4 },
  { slug: "eggenfelden", name: "Eggenfelden", type: "gemeinde", parentSlug: "niederbayern", population: 14000, plz: ["84307"], priority: 4 },
  { slug: "eichstaett", name: "Eichstätt", type: "gemeinde", parentSlug: "oberbayern", population: 14000, plz: ["85072"], priority: 4 },
  { slug: "fuerstenzell", name: "Fürstenzell", type: "gemeinde", parentSlug: "niederbayern", population: 8000, plz: ["94081"], priority: 3 },
  { slug: "gaertringen", name: "Gärtringen", type: "gemeinde", parentSlug: "oberbayern", population: 13000, plz: ["85080"], priority: 4 },
  { slug: "grafenau", name: "Grafenau", type: "gemeinde", parentSlug: "niederbayern", population: 8000, plz: ["94481"], priority: 3 },
  { slug: "groebenzell", name: "Gröbenzell", type: "gemeinde", parentSlug: "oberbayern", population: 21000, plz: ["82194"], priority: 4 },
  { slug: "hallbergmoos", name: "Hallbergmoos", type: "gemeinde", parentSlug: "oberbayern", population: 12000, plz: ["85399"], priority: 4 },
  { slug: "hauzenberg", name: "Hauzenberg", type: "gemeinde", parentSlug: "niederbayern", population: 11000, plz: ["94051"], priority: 3 },
  { slug: "herrsching", name: "Herrsching am Ammersee", type: "gemeinde", parentSlug: "oberbayern", population: 11000, plz: ["82211"], priority: 4 },
  { slug: "holzkirchen", name: "Holzkirchen", type: "gemeinde", parentSlug: "oberbayern", population: 17000, plz: ["83607"], priority: 4 },
  { slug: "ismaning", name: "Ismaning", type: "gemeinde", parentSlug: "oberbayern", population: 17000, plz: ["85737"], priority: 4 },
  { slug: "kelheim", name: "Kelheim", type: "gemeinde", parentSlug: "niederbayern", population: 17000, plz: ["93309"], priority: 4 },
  { slug: "kirchheim-schwaben", name: "Kirchheim in Schwaben", type: "gemeinde", parentSlug: "schwaben", population: 4000, plz: ["87757"], priority: 3 },
  { slug: "kirchseeon", name: "Kirchseeon", type: "gemeinde", parentSlug: "oberbayern", population: 11000, plz: ["85614"], priority: 4 },
  { slug: "koenigsbrunn", name: "Königsbrunn", type: "gemeinde", parentSlug: "schwaben", population: 28000, plz: ["86343"], priority: 4 },
  { slug: "kronach-by", name: "Kronach", type: "gemeinde", parentSlug: "oberfranken", population: 16000, plz: ["96317"], priority: 4 },
  { slug: "mainburg", name: "Mainburg", type: "gemeinde", parentSlug: "niederbayern", population: 15000, plz: ["84048"], priority: 4 },
  { slug: "manching", name: "Manching", type: "gemeinde", parentSlug: "oberbayern", population: 12000, plz: ["85077"], priority: 4 },
  { slug: "marktoberdorf-by", name: "Marktoberdorf", type: "gemeinde", parentSlug: "schwaben", population: 19000, plz: ["87616"], priority: 4 },
  { slug: "meitingen", name: "Meitingen", type: "gemeinde", parentSlug: "schwaben", population: 12000, plz: ["86405"], priority: 4 },
  { slug: "moosburg", name: "Moosburg an der Isar", type: "gemeinde", parentSlug: "oberbayern", population: 19000, plz: ["85368"], priority: 4 },
  { slug: "muehldorf-am-inn", name: "Mühldorf am Inn", type: "gemeinde", parentSlug: "oberbayern", population: 21000, plz: ["84453"], priority: 4 },
  { slug: "neuburg-donau", name: "Neuburg an der Donau", type: "gemeinde", parentSlug: "oberbayern", population: 30000, plz: ["86633"], priority: 4 },
  { slug: "neufahrn", name: "Neufahrn bei Freising", type: "gemeinde", parentSlug: "oberbayern", population: 21000, plz: ["85375"], priority: 4 },
  { slug: "neuoetting", name: "Neuötting", type: "gemeinde", parentSlug: "oberbayern", population: 9000, plz: ["84524"], priority: 3 },
  { slug: "neutraubling", name: "Neutraubling", type: "gemeinde", parentSlug: "oberpfalz", population: 14000, plz: ["93073"], priority: 4 },
  { slug: "oberhaching", name: "Oberhaching", type: "gemeinde", parentSlug: "oberbayern", population: 14000, plz: ["82041"], priority: 4 },
  { slug: "oberschleissheim", name: "Oberschleißheim", type: "gemeinde", parentSlug: "oberbayern", population: 13000, plz: ["85764"], priority: 4 },
  { slug: "oettingen", name: "Oettingen in Bayern", type: "gemeinde", parentSlug: "schwaben", population: 5000, plz: ["86732"], priority: 3 },
  { slug: "osterzell", name: "Osterhofen", type: "gemeinde", parentSlug: "niederbayern", population: 12000, plz: ["94486"], priority: 4 },
  { slug: "parsberg", name: "Parsberg", type: "gemeinde", parentSlug: "oberpfalz", population: 7000, plz: ["92331"], priority: 3 },
  { slug: "peissenberg", name: "Peißenberg", type: "gemeinde", parentSlug: "oberbayern", population: 13000, plz: ["82380"], priority: 4 },
  { slug: "pfaffenhofen", name: "Pfaffenhofen an der Ilm", type: "gemeinde", parentSlug: "oberbayern", population: 26000, plz: ["85276"], priority: 4 },
  { slug: "planegg", name: "Planegg", type: "gemeinde", parentSlug: "oberbayern", population: 11000, plz: ["82152"], priority: 4 },
  { slug: "pocking", name: "Pocking", type: "gemeinde", parentSlug: "niederbayern", population: 16000, plz: ["94060"], priority: 4 },
  { slug: "prien", name: "Prien am Chiemsee", type: "gemeinde", parentSlug: "oberbayern", population: 11000, plz: ["83209"], priority: 4 },
  { slug: "rain", name: "Rain", type: "gemeinde", parentSlug: "schwaben", population: 9000, plz: ["86641"], priority: 3 },
  { slug: "raubling", name: "Raubling", type: "gemeinde", parentSlug: "oberbayern", population: 12000, plz: ["83064"], priority: 4 },
  { slug: "regen", name: "Regen", type: "gemeinde", parentSlug: "niederbayern", population: 11000, plz: ["94209"], priority: 4 },
  { slug: "roethenbach", name: "Röthenbach an der Pegnitz", type: "gemeinde", parentSlug: "mittelfranken", population: 12000, plz: ["90552"], priority: 4 },
  { slug: "schongau", name: "Schongau", type: "gemeinde", parentSlug: "oberbayern", population: 12000, plz: ["86956"], priority: 4 },
  { slug: "schwabmuenchen", name: "Schwabmünchen", type: "gemeinde", parentSlug: "schwaben", population: 14000, plz: ["86830"], priority: 4 },
  { slug: "simbach", name: "Simbach am Inn", type: "gemeinde", parentSlug: "niederbayern", population: 10000, plz: ["84359"], priority: 4 },
  { slug: "stadtbergen", name: "Stadtbergen", type: "gemeinde", parentSlug: "schwaben", population: 15000, plz: ["86391"], priority: 4 },
  { slug: "tegernsee", name: "Tegernsee", type: "gemeinde", parentSlug: "oberbayern", population: 4000, plz: ["83684"], priority: 4 },
  { slug: "tirschenreuth", name: "Tirschenreuth", type: "gemeinde", parentSlug: "oberpfalz", population: 9000, plz: ["95643"], priority: 3 },
  { slug: "traunreut", name: "Traunreut", type: "gemeinde", parentSlug: "oberbayern", population: 21000, plz: ["83301"], priority: 4 },
  { slug: "tutzing", name: "Tutzing", type: "gemeinde", parentSlug: "oberbayern", population: 10000, plz: ["82327"], priority: 4 },
  { slug: "unterfoehring", name: "Unterföhring", type: "gemeinde", parentSlug: "oberbayern", population: 11000, plz: ["85774"], priority: 4 },
  { slug: "vilshofen", name: "Vilshofen an der Donau", type: "gemeinde", parentSlug: "niederbayern", population: 17000, plz: ["94474"], priority: 4 },
  { slug: "vohburg", name: "Vohburg an der Donau", type: "gemeinde", parentSlug: "oberbayern", population: 8000, plz: ["85088"], priority: 3 },
  { slug: "wasserburg", name: "Wasserburg am Inn", type: "gemeinde", parentSlug: "oberbayern", population: 13000, plz: ["83512"], priority: 4 },
  { slug: "weilheim", name: "Weilheim in Oberbayern", type: "gemeinde", parentSlug: "oberbayern", population: 23000, plz: ["82362"], priority: 4 },
  { slug: "wolfratshausen", name: "Wolfratshausen", type: "gemeinde", parentSlug: "oberbayern", population: 18000, plz: ["82515"], priority: 4 },
  { slug: "zwiesel", name: "Zwiesel", type: "gemeinde", parentSlug: "niederbayern", population: 9000, plz: ["94227"], priority: 3 },

  // =====================================================
  // WEITERE GEMEINDEN - BADEN-WÜRTTEMBERG (Ergänzung)
  // =====================================================
  { slug: "asperg", name: "Asperg", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 14000, plz: ["71679"], priority: 4 },
  { slug: "bad-mergentheim", name: "Bad Mergentheim", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 24000, plz: ["97980"], priority: 4 },
  { slug: "bad-rappenau-bw", name: "Bad Rappenau", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 22000, plz: ["74906"], priority: 4 },
  { slug: "bad-schoenborn", name: "Bad Schönborn", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 13000, plz: ["76669"], priority: 4 },
  { slug: "baiersbronn", name: "Baiersbronn", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 15000, plz: ["72270"], priority: 4 },
  { slug: "besigheim", name: "Besigheim", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 12000, plz: ["74354"], priority: 4 },
  { slug: "bietigheim", name: "Bietigheim-Bissingen", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 43000, plz: ["74321"], priority: 5 },
  { slug: "birkenfeld-bw", name: "Birkenfeld", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 10000, plz: ["75217"], priority: 4 },
  { slug: "blaubeuren", name: "Blaubeuren", type: "gemeinde", parentSlug: "tuebingen-bezirk", population: 12000, plz: ["89143"], priority: 4 },
  { slug: "blaustein", name: "Blaustein", type: "gemeinde", parentSlug: "tuebingen-bezirk", population: 16000, plz: ["89134"], priority: 4 },
  { slug: "boennigheim", name: "Bönnigheim", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 8000, plz: ["74357"], priority: 3 },
  { slug: "brackenheim", name: "Brackenheim", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 16000, plz: ["74336"], priority: 4 },
  { slug: "burgstetten", name: "Burgstetten", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 4000, plz: ["71576"], priority: 3 },
  { slug: "denzlingen", name: "Denzlingen", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 14000, plz: ["79211"], priority: 4 },
  { slug: "donzdorf", name: "Donzdorf", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 11000, plz: ["73072"], priority: 4 },
  { slug: "dossenheim", name: "Dossenheim", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 13000, plz: ["69221"], priority: 4 },
  { slug: "durmersheim", name: "Durmersheim", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 12000, plz: ["76448"], priority: 4 },
  { slug: "eggenstein-leopoldshafen", name: "Eggenstein-Leopoldshafen", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 16000, plz: ["76344"], priority: 4 },
  { slug: "ehingen", name: "Ehingen (Donau)", type: "gemeinde", parentSlug: "tuebingen-bezirk", population: 26000, plz: ["89584"], priority: 4 },
  { slug: "ellhofen", name: "Ellhofen", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 4000, plz: ["74248"], priority: 3 },
  { slug: "ellwangen-bw", name: "Ellwangen (Jagst)", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 25000, plz: ["73479"], priority: 4 },
  { slug: "eppelheim-bw", name: "Eppelheim", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 16000, plz: ["69214"], priority: 4 },
  { slug: "erbach-bw", name: "Erbach", type: "gemeinde", parentSlug: "tuebingen-bezirk", population: 13000, plz: ["89155"], priority: 4 },
  { slug: "eutingen", name: "Eutingen im Gäu", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 6000, plz: ["72184"], priority: 3 },
  { slug: "filderstadt-bw", name: "Filderstadt", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 46000, plz: ["70794"], priority: 5 },
  { slug: "forst-bw", name: "Forst", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 8000, plz: ["76694"], priority: 3 },
  { slug: "frickenhausen", name: "Frickenhausen", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 9000, plz: ["72636"], priority: 3 },
  { slug: "gaildorf", name: "Gaildorf", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 12000, plz: ["74405"], priority: 4 },
  { slug: "gechingen", name: "Gechingen", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 4000, plz: ["75391"], priority: 3 },
  { slug: "gengenbach", name: "Gengenbach", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 11000, plz: ["77723"], priority: 4 },
  { slug: "gernsbach", name: "Gernsbach", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 14000, plz: ["76593"], priority: 4 },
  { slug: "gerstetten", name: "Gerstetten", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 12000, plz: ["89547"], priority: 4 },
  { slug: "giengen-bw", name: "Giengen an der Brenz", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 20000, plz: ["89537"], priority: 4 },
  { slug: "graben-neudorf", name: "Graben-Neudorf", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 12000, plz: ["76676"], priority: 4 },
  { slug: "grenzach-wyhlen", name: "Grenzach-Wyhlen", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 14000, plz: ["79639"], priority: 4 },
  { slug: "haigerloch", name: "Haigerloch", type: "gemeinde", parentSlug: "tuebingen-bezirk", population: 11000, plz: ["72401"], priority: 4 },
  { slug: "hambruecken", name: "Hambrücken", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 6000, plz: ["76707"], priority: 3 },
  { slug: "hardheim", name: "Hardheim", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 7000, plz: ["74736"], priority: 3 },
  { slug: "haslach", name: "Haslach im Kinzigtal", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 7000, plz: ["77716"], priority: 3 },
  { slug: "hausach", name: "Hausach", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 6000, plz: ["77756"], priority: 3 },
  { slug: "heddesheim", name: "Heddesheim", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 12000, plz: ["68542"], priority: 4 },
  { slug: "hemsbach", name: "Hemsbach", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 12000, plz: ["69502"], priority: 4 },
  { slug: "hemmingen-bw", name: "Hemmingen", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 7000, plz: ["71282"], priority: 3 },
  { slug: "herbolzheim", name: "Herbolzheim", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 11000, plz: ["79336"], priority: 4 },
  { slug: "hirschberg", name: "Hirschberg an der Bergstraße", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 10000, plz: ["69493"], priority: 4 },
  { slug: "holzgerlingen", name: "Holzgerlingen", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 13000, plz: ["71088"], priority: 4 },
  { slug: "igersheim", name: "Igersheim", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 6000, plz: ["97999"], priority: 3 },
  { slug: "ilsfeld", name: "Ilsfeld", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 9000, plz: ["74360"], priority: 3 },
  { slug: "ispringen", name: "Ispringen", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 6000, plz: ["75228"], priority: 3 },
  { slug: "kandern", name: "Kandern", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 8000, plz: ["79400"], priority: 3 },
  { slug: "kenzingen", name: "Kenzingen", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 11000, plz: ["79341"], priority: 4 },
  { slug: "ketsch", name: "Ketsch", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 13000, plz: ["68775"], priority: 4 },
  { slug: "kippenheim", name: "Kippenheim", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 5000, plz: ["77971"], priority: 3 },
  { slug: "knittlingen", name: "Knittlingen", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 8000, plz: ["75438"], priority: 3 },
  { slug: "koenigsbach-stein", name: "Königsbach-Stein", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 10000, plz: ["75203"], priority: 4 },
  { slug: "korntal-muenchingen", name: "Korntal-Münchingen", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 20000, plz: ["70825"], priority: 4 },
  { slug: "kraichtal", name: "Kraichtal", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 15000, plz: ["76703"], priority: 4 },
  { slug: "kuernbach", name: "Kürnbach", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 3000, plz: ["75057"], priority: 3 },
  { slug: "kuppenheim", name: "Kuppenheim", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 8000, plz: ["76456"], priority: 3 },
  { slug: "lauda-koenigshofen", name: "Lauda-Königshofen", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 14000, plz: ["97922"], priority: 4 },
  { slug: "lauffen", name: "Lauffen am Neckar", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 12000, plz: ["74348"], priority: 4 },
  { slug: "laupheim", name: "Laupheim", type: "gemeinde", parentSlug: "tuebingen-bezirk", population: 22000, plz: ["88471"], priority: 4 },
  { slug: "lorch-bw", name: "Lorch", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 11000, plz: ["73547"], priority: 4 },
  { slug: "malsch", name: "Malsch", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 14000, plz: ["76316"], priority: 4 },
  { slug: "markgroeningen", name: "Markgröningen", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 15000, plz: ["71706"], priority: 4 },
  { slug: "meckenbeuren", name: "Meckenbeuren", type: "gemeinde", parentSlug: "tuebingen-bezirk", population: 14000, plz: ["88074"], priority: 4 },
  { slug: "mengen", name: "Mengen", type: "gemeinde", parentSlug: "tuebingen-bezirk", population: 10000, plz: ["88512"], priority: 4 },
  { slug: "moegglingen", name: "Mögglingen", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 5000, plz: ["73563"], priority: 3 },
  { slug: "moessingen", name: "Mössingen", type: "gemeinde", parentSlug: "tuebingen-bezirk", population: 21000, plz: ["72116"], priority: 4 },
  { slug: "muehlhausen-bw", name: "Mühlhausen", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 9000, plz: ["69242"], priority: 3 },
  { slug: "muehlheim-donau", name: "Mühlheim an der Donau", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 4000, plz: ["78570"], priority: 3 },
  { slug: "muensingen-bw", name: "Münsingen", type: "gemeinde", parentSlug: "tuebingen-bezirk", population: 15000, plz: ["72525"], priority: 4 },
  { slug: "murrhardt-bw", name: "Murrhardt", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 14000, plz: ["71540"], priority: 4 },
  { slug: "neckargemuend", name: "Neckargemünd", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 13000, plz: ["69151"], priority: 4 },
  { slug: "neckartenzlingen", name: "Neckartenzlingen", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 6000, plz: ["72654"], priority: 3 },
  { slug: "neuenbuerg", name: "Neuenbürg", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 8000, plz: ["75305"], priority: 3 },
  { slug: "neuhausen-filder", name: "Neuhausen auf den Fildern", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 12000, plz: ["73765"], priority: 4 },
  { slug: "niefern-oeschelbronn", name: "Niefern-Öschelbronn", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 12000, plz: ["75223"], priority: 4 },
  { slug: "nufringen", name: "Nufringen", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 6000, plz: ["71154"], priority: 3 },
  { slug: "nussloch", name: "Nußloch", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 11000, plz: ["69226"], priority: 4 },
  { slug: "oberderdingen", name: "Oberderdingen", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 11000, plz: ["75038"], priority: 4 },
  { slug: "oberndorf", name: "Oberndorf am Neckar", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 14000, plz: ["78727"], priority: 4 },
  { slug: "oberstenfeld", name: "Oberstenfeld", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 8000, plz: ["71720"], priority: 3 },
  { slug: "oehringen-bw", name: "Öhringen", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 25000, plz: ["74613"], priority: 4 },
  { slug: "oppenau", name: "Oppenau", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 5000, plz: ["77728"], priority: 3 },
  { slug: "ostfildern-bw", name: "Ostfildern", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 39000, plz: ["73760"], priority: 5 },
  { slug: "pfullendorf", name: "Pfullendorf", type: "gemeinde", parentSlug: "tuebingen-bezirk", population: 13000, plz: ["88630"], priority: 4 },
  { slug: "pfullingen", name: "Pfullingen", type: "gemeinde", parentSlug: "tuebingen-bezirk", population: 19000, plz: ["72793"], priority: 4 },
  { slug: "pliezhausen", name: "Pliezhausen", type: "gemeinde", parentSlug: "tuebingen-bezirk", population: 10000, plz: ["72124"], priority: 4 },
  { slug: "plochingen-bw", name: "Plochingen", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 14000, plz: ["73207"], priority: 4 },
  { slug: "reichenbach-fils", name: "Reichenbach an der Fils", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 8000, plz: ["73262"], priority: 3 },
  { slug: "remchingen", name: "Remchingen", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 12000, plz: ["75196"], priority: 4 },
  { slug: "rheinau", name: "Rheinau", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 11000, plz: ["77866"], priority: 4 },
  { slug: "rheinstetten", name: "Rheinstetten", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 21000, plz: ["76287"], priority: 4 },
  { slug: "riedlingen", name: "Riedlingen", type: "gemeinde", parentSlug: "tuebingen-bezirk", population: 11000, plz: ["88499"], priority: 4 },
  { slug: "rielasingen-worblingen", name: "Rielasingen-Worblingen", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 12000, plz: ["78239"], priority: 4 },
  { slug: "roigheim", name: "Roigheim", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 3000, plz: ["74255"], priority: 3 },
  { slug: "rosenberg-bw", name: "Rosenberg", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 3000, plz: ["73494"], priority: 3 },
  { slug: "rottenburg-bw", name: "Rottenburg am Neckar", type: "gemeinde", parentSlug: "tuebingen-bezirk", population: 45000, plz: ["72108"], priority: 5 },
  { slug: "rudersberg", name: "Rudersberg", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 11000, plz: ["73635"], priority: 4 },
  { slug: "rutesheim", name: "Rutesheim", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 11000, plz: ["71277"], priority: 4 },
  { slug: "sachsenheim-bw", name: "Sachsenheim", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 18000, plz: ["74343"], priority: 4 },
  { slug: "salem", name: "Salem", type: "gemeinde", parentSlug: "tuebingen-bezirk", population: 12000, plz: ["88682"], priority: 4 },
  { slug: "salach", name: "Salach", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 8000, plz: ["73084"], priority: 3 },
  { slug: "sandhausen-bw", name: "Sandhausen", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 15000, plz: ["69207"], priority: 4 },
  { slug: "schallstadt", name: "Schallstadt", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 6000, plz: ["79227"], priority: 3 },
  { slug: "schiltach", name: "Schiltach", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 4000, plz: ["77761"], priority: 3 },
  { slug: "schluchsee", name: "Schluchsee", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 3000, plz: ["79859"], priority: 3 },
  { slug: "schwaigern", name: "Schwaigern", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 11000, plz: ["74193"], priority: 4 },
  { slug: "schwaikheim", name: "Schwaikheim", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 10000, plz: ["71409"], priority: 4 },
  { slug: "spaichingen", name: "Spaichingen", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 13000, plz: ["78549"], priority: 4 },
  { slug: "steinen", name: "Steinen", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 10000, plz: ["79585"], priority: 4 },
  { slug: "steinheim-murr", name: "Steinheim an der Murr", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 12000, plz: ["71711"], priority: 4 },
  { slug: "stetten-a-k-m", name: "Stetten am kalten Markt", type: "gemeinde", parentSlug: "tuebingen-bezirk", population: 5000, plz: ["72510"], priority: 3 },
  { slug: "stockach-bw", name: "Stockach", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 18000, plz: ["78333"], priority: 4 },
  { slug: "straubenhardt", name: "Straubenhardt", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 11000, plz: ["75334"], priority: 4 },
  { slug: "stutensee", name: "Stutensee", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 25000, plz: ["76297"], priority: 4 },
  { slug: "sulz", name: "Sulz am Neckar", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 12000, plz: ["72172"], priority: 4 },
  { slug: "sulzfeld", name: "Sulzfeld", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 5000, plz: ["75056"], priority: 3 },
  { slug: "tamm", name: "Tamm", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 13000, plz: ["71732"], priority: 4 },
  { slug: "tauberbischofsheim", name: "Tauberbischofsheim", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 13000, plz: ["97941"], priority: 4 },
  { slug: "teningen", name: "Teningen", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 12000, plz: ["79331"], priority: 4 },
  { slug: "todtnau", name: "Todtnau", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 5000, plz: ["79674"], priority: 3 },
  { slug: "trossingen", name: "Trossingen", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 16000, plz: ["78647"], priority: 4 },
  { slug: "ubstadt-weiher", name: "Ubstadt-Weiher", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 13000, plz: ["76698"], priority: 4 },
  { slug: "umkirch", name: "Umkirch", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 6000, plz: ["79224"], priority: 3 },
  { slug: "urbach", name: "Urbach", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 9000, plz: ["73660"], priority: 3 },
  { slug: "vorstetten", name: "Vorstetten", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 4000, plz: ["79279"], priority: 3 },
  { slug: "waeldi", name: "Wäldi", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 7000, plz: ["75417"], priority: 3 },
  { slug: "waldbronn", name: "Waldbronn", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 13000, plz: ["76337"], priority: 4 },
  { slug: "walddorfhaeslach", name: "Walddorfhäslach", type: "gemeinde", parentSlug: "tuebingen-bezirk", population: 5000, plz: ["72141"], priority: 3 },
  { slug: "waldenbuch", name: "Waldenbuch", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 9000, plz: ["71111"], priority: 3 },
  { slug: "waldshut-bw", name: "Waldshut-Tiengen", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 24000, plz: ["79761"], priority: 4 },
  { slug: "walldorf-bw2", name: "Walldorf", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 16000, plz: ["69190"], priority: 4 },
  { slug: "walzbachtal", name: "Walzbachtal", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 10000, plz: ["75045"], priority: 4 },
  { slug: "wehr", name: "Wehr", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 13000, plz: ["79664"], priority: 4 },
  { slug: "weilheim-teck", name: "Weilheim an der Teck", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 10000, plz: ["73235"], priority: 4 },
  { slug: "weinsberg", name: "Weinsberg", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 12000, plz: ["74189"], priority: 4 },
  { slug: "weissach", name: "Weissach", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 8000, plz: ["71287"], priority: 3 },
  { slug: "welzheim", name: "Welzheim", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 11000, plz: ["73642"], priority: 4 },
  { slug: "wernau", name: "Wernau (Neckar)", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 12000, plz: ["73249"], priority: 4 },
  { slug: "wertheim", name: "Wertheim", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 23000, plz: ["97877"], priority: 4 },
  { slug: "wimsheim", name: "Wimsheim", type: "gemeinde", parentSlug: "karlsruhe-bezirk", population: 3000, plz: ["71299"], priority: 3 },
  { slug: "wolfach", name: "Wolfach", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 6000, plz: ["77709"], priority: 3 },
  { slug: "wolfschlugen", name: "Wolfschlugen", type: "gemeinde", parentSlug: "stuttgart-bezirk", population: 6000, plz: ["72649"], priority: 3 },
  { slug: "zell-harmersbach", name: "Zell am Harmersbach", type: "gemeinde", parentSlug: "freiburg-bezirk", population: 8000, plz: ["77736"], priority: 3 },

  // =====================================================
  // WEITERE GEMEINDEN - NRW (Ergänzung)
  // =====================================================
  { slug: "aldenhoven", name: "Aldenhoven", type: "gemeinde", parentSlug: "koeln-bezirk", population: 14000, plz: ["52457"], priority: 4 },
  { slug: "alpen", name: "Alpen", type: "gemeinde", parentSlug: "duesseldorf-bezirk", population: 13000, plz: ["46519"], priority: 4 },
  { slug: "altena", name: "Altena", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 17000, plz: ["58762"], priority: 4 },
  { slug: "altenbeken", name: "Altenbeken", type: "gemeinde", parentSlug: "detmold-bezirk", population: 9000, plz: ["33184"], priority: 3 },
  { slug: "altenberge", name: "Altenberge", type: "gemeinde", parentSlug: "muenster-bezirk", population: 11000, plz: ["48341"], priority: 4 },
  { slug: "anroechte", name: "Anröchte", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 11000, plz: ["59609"], priority: 4 },
  { slug: "augustdorf", name: "Augustdorf", type: "gemeinde", parentSlug: "detmold-bezirk", population: 10000, plz: ["32832"], priority: 4 },
  { slug: "bad-holzhausen", name: "Bad Holzhausen", type: "gemeinde", parentSlug: "detmold-bezirk", population: 4000, plz: ["32361"], priority: 3 },
  { slug: "bad-laasphe", name: "Bad Laasphe", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 13000, plz: ["57334"], priority: 4 },
  { slug: "bad-muenstereifel", name: "Bad Münstereifel", type: "gemeinde", parentSlug: "koeln-bezirk", population: 18000, plz: ["53902"], priority: 4 },
  { slug: "bad-sassendorf", name: "Bad Sassendorf", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 12000, plz: ["59505"], priority: 4 },
  { slug: "bad-wuennenberg", name: "Bad Wünnenberg", type: "gemeinde", parentSlug: "detmold-bezirk", population: 12000, plz: ["33181"], priority: 4 },
  { slug: "balve", name: "Balve", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 11000, plz: ["58802"], priority: 4 },
  { slug: "barntrup", name: "Barntrup", type: "gemeinde", parentSlug: "detmold-bezirk", population: 9000, plz: ["32683"], priority: 3 },
  { slug: "bedburg", name: "Bedburg", type: "gemeinde", parentSlug: "koeln-bezirk", population: 24000, plz: ["50181"], priority: 4 },
  { slug: "bedburg-hau", name: "Bedburg-Hau", type: "gemeinde", parentSlug: "duesseldorf-bezirk", population: 13000, plz: ["47551"], priority: 4 },
  { slug: "beelen", name: "Beelen", type: "gemeinde", parentSlug: "muenster-bezirk", population: 7000, plz: ["48361"], priority: 3 },
  { slug: "bergneustadt", name: "Bergneustadt", type: "gemeinde", parentSlug: "koeln-bezirk", population: 19000, plz: ["51702"], priority: 4 },
  { slug: "beverungen", name: "Beverungen", type: "gemeinde", parentSlug: "detmold-bezirk", population: 13000, plz: ["37688"], priority: 4 },
  { slug: "billerbeck", name: "Billerbeck", type: "gemeinde", parentSlug: "muenster-bezirk", population: 12000, plz: ["48727"], priority: 4 },
  { slug: "blankenheim", name: "Blankenheim", type: "gemeinde", parentSlug: "koeln-bezirk", population: 8000, plz: ["53945"], priority: 3 },
  { slug: "bochum-bezirke", name: "Bochum-Wattenscheid", type: "stadtbezirk", parentSlug: "bochum", population: 72000, plz: ["44866"], priority: 5 },
  { slug: "boenen", name: "Bönen", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 18000, plz: ["59199"], priority: 4 },
  { slug: "borgentreich", name: "Borgentreich", type: "gemeinde", parentSlug: "detmold-bezirk", population: 9000, plz: ["34434"], priority: 3 },
  { slug: "borgholzhausen", name: "Borgholzhausen", type: "gemeinde", parentSlug: "detmold-bezirk", population: 9000, plz: ["33829"], priority: 3 },
  { slug: "breckerfeld", name: "Breckerfeld", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 9000, plz: ["58339"], priority: 3 },
  { slug: "bruehl", name: "Brühl", type: "gemeinde", parentSlug: "koeln-bezirk", population: 45000, plz: ["50321"], priority: 5 },
  { slug: "buende", name: "Bünde", type: "gemeinde", parentSlug: "detmold-bezirk", population: 46000, plz: ["32257"], priority: 5 },
  { slug: "dahlem", name: "Dahlem", type: "gemeinde", parentSlug: "koeln-bezirk", population: 4000, plz: ["53949"], priority: 3 },
  { slug: "drensteinfurt", name: "Drensteinfurt", type: "gemeinde", parentSlug: "muenster-bezirk", population: 16000, plz: ["48317"], priority: 4 },
  { slug: "eitorf", name: "Eitorf", type: "gemeinde", parentSlug: "koeln-bezirk", population: 19000, plz: ["53783"], priority: 4 },
  { slug: "elsdorf", name: "Elsdorf", type: "gemeinde", parentSlug: "koeln-bezirk", population: 22000, plz: ["50189"], priority: 4 },
  { slug: "engelskirchen", name: "Engelskirchen", type: "gemeinde", parentSlug: "koeln-bezirk", population: 20000, plz: ["51766"], priority: 4 },
  { slug: "ennigerloh", name: "Ennigerloh", type: "gemeinde", parentSlug: "muenster-bezirk", population: 20000, plz: ["59320"], priority: 4 },
  { slug: "erftstadt", name: "Erftstadt", type: "gemeinde", parentSlug: "koeln-bezirk", population: 51000, plz: ["50374"], priority: 5 },
  { slug: "extertal", name: "Extertal", type: "gemeinde", parentSlug: "detmold-bezirk", population: 10000, plz: ["32699"], priority: 4 },
  { slug: "finnentrop", name: "Finnentrop", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 16000, plz: ["57413"], priority: 4 },
  { slug: "froendenberg", name: "Fröndenberg/Ruhr", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 21000, plz: ["58730"], priority: 4 },
  { slug: "gangelt", name: "Gangelt", type: "gemeinde", parentSlug: "koeln-bezirk", population: 13000, plz: ["52538"], priority: 4 },
  { slug: "gescher", name: "Gescher", type: "gemeinde", parentSlug: "muenster-bezirk", population: 17000, plz: ["48712"], priority: 4 },
  { slug: "greven", name: "Greven", type: "gemeinde", parentSlug: "muenster-bezirk", population: 37000, plz: ["48268"], priority: 4 },
  { slug: "grefrath", name: "Grefrath", type: "gemeinde", parentSlug: "duesseldorf-bezirk", population: 15000, plz: ["47929"], priority: 4 },
  { slug: "harsewinkel", name: "Harsewinkel", type: "gemeinde", parentSlug: "detmold-bezirk", population: 25000, plz: ["33428"], priority: 4 },
  { slug: "havixbeck", name: "Havixbeck", type: "gemeinde", parentSlug: "muenster-bezirk", population: 12000, plz: ["48329"], priority: 4 },
  { slug: "heiligenhaus", name: "Heiligenhaus", type: "gemeinde", parentSlug: "duesseldorf-bezirk", population: 26000, plz: ["42579"], priority: 4 },
  { slug: "herscheid", name: "Herscheid", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 7000, plz: ["58849"], priority: 3 },
  { slug: "herzogenrath", name: "Herzogenrath", type: "gemeinde", parentSlug: "koeln-bezirk", population: 47000, plz: ["52134"], priority: 5 },
  { slug: "hille", name: "Hille", type: "gemeinde", parentSlug: "detmold-bezirk", population: 16000, plz: ["32479"], priority: 4 },
  { slug: "hoevelhof", name: "Hövelhof", type: "gemeinde", parentSlug: "detmold-bezirk", population: 16000, plz: ["33161"], priority: 4 },
  { slug: "horstmar", name: "Horstmar", type: "gemeinde", parentSlug: "muenster-bezirk", population: 7000, plz: ["48612"], priority: 3 },
  { slug: "huellhorst", name: "Hüllhorst", type: "gemeinde", parentSlug: "detmold-bezirk", population: 13000, plz: ["32609"], priority: 4 },
  { slug: "huenxe", name: "Hünxe", type: "gemeinde", parentSlug: "duesseldorf-bezirk", population: 14000, plz: ["46569"], priority: 4 },
  { slug: "juechen", name: "Jüchen", type: "gemeinde", parentSlug: "duesseldorf-bezirk", population: 24000, plz: ["41363"], priority: 4 },
  { slug: "kalletal", name: "Kalletal", type: "gemeinde", parentSlug: "detmold-bezirk", population: 14000, plz: ["32689"], priority: 4 },
  { slug: "kerpen", name: "Kerpen", type: "gemeinde", parentSlug: "koeln-bezirk", population: 67000, plz: ["50169", "50170", "50171"], priority: 5 },
  { slug: "kierspe", name: "Kierspe", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 16000, plz: ["58566"], priority: 4 },
  { slug: "kirchlengern", name: "Kirchlengern", type: "gemeinde", parentSlug: "detmold-bezirk", population: 16000, plz: ["32278"], priority: 4 },
  { slug: "kreuzau", name: "Kreuzau", type: "gemeinde", parentSlug: "koeln-bezirk", population: 18000, plz: ["52372"], priority: 4 },
  { slug: "laer", name: "Laer", type: "gemeinde", parentSlug: "muenster-bezirk", population: 7000, plz: ["48366"], priority: 3 },
  { slug: "lage", name: "Lage", type: "gemeinde", parentSlug: "detmold-bezirk", population: 35000, plz: ["32791"], priority: 4 },
  { slug: "langenberg", name: "Langenberg", type: "gemeinde", parentSlug: "detmold-bezirk", population: 8000, plz: ["33449"], priority: 3 },
  { slug: "langerwehe", name: "Langerwehe", type: "gemeinde", parentSlug: "koeln-bezirk", population: 14000, plz: ["52379"], priority: 4 },
  { slug: "leichlingen", name: "Leichlingen", type: "gemeinde", parentSlug: "koeln-bezirk", population: 28000, plz: ["42799"], priority: 4 },
  { slug: "leopoldshöhe", name: "Leopoldshöhe", type: "gemeinde", parentSlug: "detmold-bezirk", population: 16000, plz: ["33818"], priority: 4 },
  { slug: "lichtenau-nrw", name: "Lichtenau", type: "gemeinde", parentSlug: "detmold-bezirk", population: 11000, plz: ["33165"], priority: 4 },
  { slug: "lindlar", name: "Lindlar", type: "gemeinde", parentSlug: "koeln-bezirk", population: 22000, plz: ["51789"], priority: 4 },
  { slug: "linnich", name: "Linnich", type: "gemeinde", parentSlug: "koeln-bezirk", population: 13000, plz: ["52441"], priority: 4 },
  { slug: "lohmar", name: "Lohmar", type: "gemeinde", parentSlug: "koeln-bezirk", population: 31000, plz: ["53797"], priority: 4 },
  { slug: "loehne-nrw", name: "Löhne", type: "gemeinde", parentSlug: "detmold-bezirk", population: 40000, plz: ["32584"], priority: 4 },
  { slug: "lotte", name: "Lotte", type: "gemeinde", parentSlug: "muenster-bezirk", population: 14000, plz: ["49504"], priority: 4 },
  { slug: "luegde", name: "Lügde", type: "gemeinde", parentSlug: "detmold-bezirk", population: 10000, plz: ["32676"], priority: 4 },
  { slug: "marienheide", name: "Marienheide", type: "gemeinde", parentSlug: "koeln-bezirk", population: 14000, plz: ["51709"], priority: 4 },
  { slug: "marienmünster", name: "Marienmünster", type: "gemeinde", parentSlug: "detmold-bezirk", population: 5000, plz: ["37696"], priority: 3 },
  { slug: "marsberg", name: "Marsberg", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 20000, plz: ["34431"], priority: 4 },
  { slug: "medebach", name: "Medebach", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 8000, plz: ["59964"], priority: 3 },
  { slug: "meerbusch", name: "Meerbusch", type: "gemeinde", parentSlug: "duesseldorf-bezirk", population: 56000, plz: ["40667", "40668", "40670"], priority: 5 },
  { slug: "meinerzhagen-nrw", name: "Meinerzhagen", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 20000, plz: ["58540"], priority: 4 },
  { slug: "metelen", name: "Metelen", type: "gemeinde", parentSlug: "muenster-bezirk", population: 7000, plz: ["48629"], priority: 3 },
  { slug: "mettingen", name: "Mettingen", type: "gemeinde", parentSlug: "muenster-bezirk", population: 12000, plz: ["49497"], priority: 4 },
  { slug: "moehnesee", name: "Möhnesee", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 11000, plz: ["59519"], priority: 4 },
  { slug: "much", name: "Much", type: "gemeinde", parentSlug: "koeln-bezirk", population: 15000, plz: ["53804"], priority: 4 },
  { slug: "nachrodt-wiblingwerde", name: "Nachrodt-Wiblingwerde", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 6000, plz: ["58769"], priority: 3 },
  { slug: "netphen", name: "Netphen", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 23000, plz: ["57250"], priority: 4 },
  { slug: "nettersheim", name: "Nettersheim", type: "gemeinde", parentSlug: "koeln-bezirk", population: 8000, plz: ["53947"], priority: 3 },
  { slug: "neuenkirchen-nrw", name: "Neuenkirchen", type: "gemeinde", parentSlug: "muenster-bezirk", population: 14000, plz: ["48485"], priority: 4 },
  { slug: "neuenrade", name: "Neuenrade", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 12000, plz: ["58809"], priority: 4 },
  { slug: "niederkruechten", name: "Niederkrüchten", type: "gemeinde", parentSlug: "duesseldorf-bezirk", population: 16000, plz: ["41372"], priority: 4 },
  { slug: "niederzier", name: "Niederzier", type: "gemeinde", parentSlug: "koeln-bezirk", population: 14000, plz: ["52382"], priority: 4 },
  { slug: "nieheim", name: "Nieheim", type: "gemeinde", parentSlug: "detmold-bezirk", population: 6000, plz: ["33039"], priority: 3 },
  { slug: "nordkirchen", name: "Nordkirchen", type: "gemeinde", parentSlug: "muenster-bezirk", population: 10000, plz: ["59394"], priority: 4 },
  { slug: "nordwalde", name: "Nordwalde", type: "gemeinde", parentSlug: "muenster-bezirk", population: 10000, plz: ["48356"], priority: 4 },
  { slug: "nottuln", name: "Nottuln", type: "gemeinde", parentSlug: "muenster-bezirk", population: 20000, plz: ["48301"], priority: 4 },
  { slug: "nuembrecht", name: "Nümbrecht", type: "gemeinde", parentSlug: "koeln-bezirk", population: 18000, plz: ["51588"], priority: 4 },
  { slug: "olfen", name: "Olfen", type: "gemeinde", parentSlug: "muenster-bezirk", population: 13000, plz: ["59399"], priority: 4 },
  { slug: "olsberg", name: "Olsberg", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 14000, plz: ["59939"], priority: 4 },
  { slug: "oerlinghausen", name: "Oerlinghausen", type: "gemeinde", parentSlug: "detmold-bezirk", population: 17000, plz: ["33813"], priority: 4 },
  { slug: "overath", name: "Overath", type: "gemeinde", parentSlug: "koeln-bezirk", population: 28000, plz: ["51491"], priority: 4 },
  { slug: "preussisch-oldendorf", name: "Preußisch Oldendorf", type: "gemeinde", parentSlug: "detmold-bezirk", population: 13000, plz: ["32361"], priority: 4 },
  { slug: "rahden", name: "Rahden", type: "gemeinde", parentSlug: "detmold-bezirk", population: 16000, plz: ["32369"], priority: 4 },
  { slug: "recke", name: "Recke", type: "gemeinde", parentSlug: "muenster-bezirk", population: 12000, plz: ["49509"], priority: 4 },
  { slug: "reichshof", name: "Reichshof", type: "gemeinde", parentSlug: "koeln-bezirk", population: 19000, plz: ["51580"], priority: 4 },
  { slug: "roedinghausen", name: "Rödinghausen", type: "gemeinde", parentSlug: "detmold-bezirk", population: 10000, plz: ["32289"], priority: 4 },
  { slug: "roesrath", name: "Rösrath", type: "gemeinde", parentSlug: "koeln-bezirk", population: 29000, plz: ["51503"], priority: 4 },
  { slug: "ruethen", name: "Rüthen", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 11000, plz: ["59602"], priority: 4 },
  { slug: "sassenberg", name: "Sassenberg", type: "gemeinde", parentSlug: "muenster-bezirk", population: 14000, plz: ["48336"], priority: 4 },
  { slug: "saerbeck", name: "Saerbeck", type: "gemeinde", parentSlug: "muenster-bezirk", population: 7000, plz: ["48369"], priority: 3 },
  { slug: "schalksmühle", name: "Schalksmühle", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 10000, plz: ["58579"], priority: 4 },
  { slug: "schieder-schwalenberg", name: "Schieder-Schwalenberg", type: "gemeinde", parentSlug: "detmold-bezirk", population: 9000, plz: ["32816"], priority: 3 },
  { slug: "schlangen", name: "Schlangen", type: "gemeinde", parentSlug: "detmold-bezirk", population: 9000, plz: ["33189"], priority: 3 },
  { slug: "schoeppingen", name: "Schöppingen", type: "gemeinde", parentSlug: "muenster-bezirk", population: 8000, plz: ["48624"], priority: 3 },
  { slug: "selfkant", name: "Selfkant", type: "gemeinde", parentSlug: "koeln-bezirk", population: 10000, plz: ["52538"], priority: 4 },
  { slug: "senden-nrw2", name: "Senden", type: "gemeinde", parentSlug: "muenster-bezirk", population: 21000, plz: ["48308"], priority: 4 },
  { slug: "sendenhorst", name: "Sendenhorst", type: "gemeinde", parentSlug: "muenster-bezirk", population: 14000, plz: ["48324"], priority: 4 },
  { slug: "stadtlohn", name: "Stadtlohn", type: "gemeinde", parentSlug: "muenster-bezirk", population: 20000, plz: ["48703"], priority: 4 },
  { slug: "steinheim-nrw", name: "Steinheim", type: "gemeinde", parentSlug: "detmold-bezirk", population: 13000, plz: ["32839"], priority: 4 },
  { slug: "stemwede", name: "Stemwede", type: "gemeinde", parentSlug: "detmold-bezirk", population: 14000, plz: ["32351"], priority: 4 },
  { slug: "swisttal", name: "Swisttal", type: "gemeinde", parentSlug: "koeln-bezirk", population: 19000, plz: ["53913"], priority: 4 },
  { slug: "telgte", name: "Telgte", type: "gemeinde", parentSlug: "muenster-bezirk", population: 20000, plz: ["48291"], priority: 4 },
  { slug: "tecklenburg", name: "Tecklenburg", type: "gemeinde", parentSlug: "muenster-bezirk", population: 9000, plz: ["49545"], priority: 3 },
  { slug: "velen", name: "Velen", type: "gemeinde", parentSlug: "muenster-bezirk", population: 13000, plz: ["46342"], priority: 4 },
  { slug: "verl", name: "Verl", type: "gemeinde", parentSlug: "detmold-bezirk", population: 26000, plz: ["33415"], priority: 4 },
  { slug: "vlotho-nrw", name: "Vlotho", type: "gemeinde", parentSlug: "detmold-bezirk", population: 18000, plz: ["32602"], priority: 4 },
  { slug: "wachtberg", name: "Wachtberg", type: "gemeinde", parentSlug: "koeln-bezirk", population: 20000, plz: ["53343"], priority: 4 },
  { slug: "wadersloh", name: "Wadersloh", type: "gemeinde", parentSlug: "muenster-bezirk", population: 13000, plz: ["59329"], priority: 4 },
  { slug: "waldfeucht", name: "Waldfeucht", type: "gemeinde", parentSlug: "koeln-bezirk", population: 9000, plz: ["52525"], priority: 3 },
  { slug: "warburg-nrw", name: "Warburg", type: "gemeinde", parentSlug: "detmold-bezirk", population: 23000, plz: ["34414"], priority: 4 },
  { slug: "wassenberg", name: "Wassenberg", type: "gemeinde", parentSlug: "koeln-bezirk", population: 18000, plz: ["41849"], priority: 4 },
  { slug: "wenden", name: "Wenden", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 19000, plz: ["57482"], priority: 4 },
  { slug: "weeze", name: "Weeze", type: "gemeinde", parentSlug: "duesseldorf-bezirk", population: 11000, plz: ["47652"], priority: 4 },
  { slug: "weilerswist", name: "Weilerswist", type: "gemeinde", parentSlug: "koeln-bezirk", population: 17000, plz: ["53919"], priority: 4 },
  { slug: "welver", name: "Welver", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 12000, plz: ["59514"], priority: 4 },
  { slug: "werther", name: "Werther (Westf.)", type: "gemeinde", parentSlug: "detmold-bezirk", population: 12000, plz: ["33824"], priority: 4 },
  { slug: "westerkappeln", name: "Westerkappeln", type: "gemeinde", parentSlug: "muenster-bezirk", population: 11000, plz: ["49492"], priority: 4 },
  { slug: "wickede", name: "Wickede (Ruhr)", type: "gemeinde", parentSlug: "arnsberg-bezirk", population: 12000, plz: ["58739"], priority: 4 },
  { slug: "wipperfürth", name: "Wipperfürth", type: "gemeinde", parentSlug: "koeln-bezirk", population: 21000, plz: ["51688"], priority: 4 },
  { slug: "xanten", name: "Xanten", type: "gemeinde", parentSlug: "duesseldorf-bezirk", population: 22000, plz: ["46509"], priority: 4 },
  { slug: "zuelpich", name: "Zülpich", type: "gemeinde", parentSlug: "koeln-bezirk", population: 21000, plz: ["53909"], priority: 4 },

  // =====================================================
  // WEITERE GEMEINDEN - NIEDERSACHSEN (Ergänzung)
  // =====================================================
  { slug: "aerzen", name: "Aerzen", type: "gemeinde", parentSlug: "niedersachsen", population: 11000, plz: ["31855"], priority: 4 },
  { slug: "alfeld", name: "Alfeld (Leine)", type: "gemeinde", parentSlug: "niedersachsen", population: 19000, plz: ["31061"], priority: 4 },
  { slug: "bad-essen", name: "Bad Essen", type: "gemeinde", parentSlug: "niedersachsen", population: 15000, plz: ["49152"], priority: 4 },
  { slug: "bad-fallingbostel", name: "Bad Fallingbostel", type: "gemeinde", parentSlug: "niedersachsen", population: 12000, plz: ["29683"], priority: 4 },
  { slug: "bad-gandersheim", name: "Bad Gandersheim", type: "gemeinde", parentSlug: "niedersachsen", population: 10000, plz: ["37581"], priority: 4 },
  { slug: "bad-iburg", name: "Bad Iburg", type: "gemeinde", parentSlug: "niedersachsen", population: 11000, plz: ["49186"], priority: 4 },
  { slug: "bad-laer", name: "Bad Laer", type: "gemeinde", parentSlug: "niedersachsen", population: 9000, plz: ["49196"], priority: 3 },
  { slug: "bad-lauterberg", name: "Bad Lauterberg im Harz", type: "gemeinde", parentSlug: "niedersachsen", population: 10000, plz: ["37431"], priority: 4 },
  { slug: "bad-muender", name: "Bad Münder am Deister", type: "gemeinde", parentSlug: "niedersachsen", population: 18000, plz: ["31848"], priority: 4 },
  { slug: "bad-rothenfelde", name: "Bad Rothenfelde", type: "gemeinde", parentSlug: "niedersachsen", population: 8000, plz: ["49214"], priority: 3 },
  { slug: "bad-sachsa", name: "Bad Sachsa", type: "gemeinde", parentSlug: "niedersachsen", population: 7000, plz: ["37441"], priority: 3 },
  { slug: "belm", name: "Belm", type: "gemeinde", parentSlug: "niedersachsen", population: 14000, plz: ["49191"], priority: 4 },
  { slug: "bevern", name: "Bevern", type: "gemeinde", parentSlug: "niedersachsen", population: 4000, plz: ["37639"], priority: 3 },
  { slug: "bissendorf", name: "Bissendorf", type: "gemeinde", parentSlug: "niedersachsen", population: 15000, plz: ["49143"], priority: 4 },
  { slug: "bockhorn", name: "Bockhorn", type: "gemeinde", parentSlug: "niedersachsen", population: 9000, plz: ["26345"], priority: 3 },
  { slug: "bohmte", name: "Bohmte", type: "gemeinde", parentSlug: "niedersachsen", population: 12000, plz: ["49163"], priority: 4 },
  { slug: "bovenden", name: "Bovenden", type: "gemeinde", parentSlug: "niedersachsen", population: 14000, plz: ["37120"], priority: 4 },
  { slug: "braunlage", name: "Braunlage", type: "gemeinde", parentSlug: "niedersachsen", population: 6000, plz: ["38700"], priority: 3 },
  { slug: "bremervörde", name: "Bremervörde", type: "gemeinde", parentSlug: "niedersachsen", population: 19000, plz: ["27432"], priority: 4 },
  { slug: "clausthal", name: "Clausthal-Zellerfeld", type: "gemeinde", parentSlug: "niedersachsen", population: 15000, plz: ["38678"], priority: 4 },
  { slug: "damme", name: "Damme", type: "gemeinde", parentSlug: "niedersachsen", population: 17000, plz: ["49401"], priority: 4 },
  { slug: "delligsen", name: "Delligsen", type: "gemeinde", parentSlug: "niedersachsen", population: 8000, plz: ["31073"], priority: 3 },
  { slug: "diepholz", name: "Diepholz", type: "gemeinde", parentSlug: "niedersachsen", population: 17000, plz: ["49356"], priority: 4 },
  { slug: "dinklage", name: "Dinklage", type: "gemeinde", parentSlug: "niedersachsen", population: 13000, plz: ["49413"], priority: 4 },
  { slug: "duderstadt", name: "Duderstadt", type: "gemeinde", parentSlug: "niedersachsen", population: 21000, plz: ["37115"], priority: 4 },
  { slug: "edemissen", name: "Edemissen", type: "gemeinde", parentSlug: "niedersachsen", population: 12000, plz: ["31234"], priority: 4 },
  { slug: "edewecht-ns", name: "Edewecht", type: "gemeinde", parentSlug: "niedersachsen", population: 23000, plz: ["26188"], priority: 4 },
  { slug: "elze", name: "Elze", type: "gemeinde", parentSlug: "niedersachsen", population: 9000, plz: ["31008"], priority: 3 },
  { slug: "emlichheim", name: "Emlichheim", type: "gemeinde", parentSlug: "niedersachsen", population: 7000, plz: ["49824"], priority: 3 },
  { slug: "emstek", name: "Emstek", type: "gemeinde", parentSlug: "niedersachsen", population: 12000, plz: ["49685"], priority: 4 },
  { slug: "esens", name: "Esens", type: "gemeinde", parentSlug: "niedersachsen", population: 7000, plz: ["26427"], priority: 3 },
  { slug: "friedeburg", name: "Friedeburg", type: "gemeinde", parentSlug: "niedersachsen", population: 11000, plz: ["26446"], priority: 4 },
  { slug: "garbsen-ns", name: "Garbsen", type: "gemeinde", parentSlug: "niedersachsen", population: 61000, plz: ["30823", "30826", "30827"], priority: 5 },
  { slug: "garrel", name: "Garrel", type: "gemeinde", parentSlug: "niedersachsen", population: 15000, plz: ["49681"], priority: 4 },
  { slug: "gieboldehausen", name: "Gieboldehausen", type: "gemeinde", parentSlug: "niedersachsen", population: 7000, plz: ["37434"], priority: 3 },
  { slug: "grossefehn", name: "Großefehn", type: "gemeinde", parentSlug: "niedersachsen", population: 14000, plz: ["26629"], priority: 4 },
  { slug: "hagen-atw", name: "Hagen am Teutoburger Wald", type: "gemeinde", parentSlug: "niedersachsen", population: 14000, plz: ["49170"], priority: 4 },
  { slug: "harsum", name: "Harsum", type: "gemeinde", parentSlug: "niedersachsen", population: 11000, plz: ["31177"], priority: 4 },
  { slug: "haste", name: "Haste", type: "gemeinde", parentSlug: "niedersachsen", population: 4000, plz: ["31559"], priority: 3 },
  { slug: "hasbergen", name: "Hasbergen", type: "gemeinde", parentSlug: "niedersachsen", population: 11000, plz: ["49205"], priority: 4 },
  { slug: "hemmoor", name: "Hemmoor", type: "gemeinde", parentSlug: "niedersachsen", population: 9000, plz: ["21745"], priority: 3 },
  { slug: "herzberg", name: "Herzberg am Harz", type: "gemeinde", parentSlug: "niedersachsen", population: 13000, plz: ["37412"], priority: 4 },
  { slug: "hilter", name: "Hilter am Teutoburger Wald", type: "gemeinde", parentSlug: "niedersachsen", population: 10000, plz: ["49176"], priority: 4 },
  { slug: "hude", name: "Hude (Oldenburg)", type: "gemeinde", parentSlug: "niedersachsen", population: 16000, plz: ["27798"], priority: 4 },
  { slug: "ihlow", name: "Ihlow", type: "gemeinde", parentSlug: "niedersachsen", population: 13000, plz: ["26632"], priority: 4 },
  { slug: "jemgum", name: "Jemgum", type: "gemeinde", parentSlug: "niedersachsen", population: 4000, plz: ["26844"], priority: 3 },
  { slug: "krummhoern", name: "Krummhörn", type: "gemeinde", parentSlug: "niedersachsen", population: 12000, plz: ["26736"], priority: 4 },
  { slug: "langelsheim", name: "Langelsheim", type: "gemeinde", parentSlug: "niedersachsen", population: 11000, plz: ["38685"], priority: 4 },
  { slug: "liebenburg", name: "Liebenburg", type: "gemeinde", parentSlug: "niedersachsen", population: 8000, plz: ["38704"], priority: 3 },
  { slug: "lilienthal", name: "Lilienthal", type: "gemeinde", parentSlug: "niedersachsen", population: 19000, plz: ["28865"], priority: 4 },
  { slug: "loeningen", name: "Löningen", type: "gemeinde", parentSlug: "niedersachsen", population: 14000, plz: ["49624"], priority: 4 },
  { slug: "lohne", name: "Lohne (Oldenburg)", type: "gemeinde", parentSlug: "niedersachsen", population: 28000, plz: ["49393"], priority: 4 },
  { slug: "marienhafe", name: "Marienhafe", type: "gemeinde", parentSlug: "niedersachsen", population: 3000, plz: ["26529"], priority: 3 },
  { slug: "melle-ns", name: "Melle", type: "gemeinde", parentSlug: "niedersachsen", population: 46000, plz: ["49324"], priority: 5 },
  { slug: "moringen", name: "Moringen", type: "gemeinde", parentSlug: "niedersachsen", population: 7000, plz: ["37186"], priority: 3 },
  { slug: "neuenhaus", name: "Neuenhaus", type: "gemeinde", parentSlug: "niedersachsen", population: 10000, plz: ["49828"], priority: 4 },
  { slug: "nörten-hardenberg", name: "Nörten-Hardenberg", type: "gemeinde", parentSlug: "niedersachsen", population: 8000, plz: ["37176"], priority: 3 },
  { slug: "obernkirchen", name: "Obernkirchen", type: "gemeinde", parentSlug: "niedersachsen", population: 9000, plz: ["31683"], priority: 3 },
  { slug: "oederquart", name: "Oederquart", type: "gemeinde", parentSlug: "niedersachsen", population: 2000, plz: ["21734"], priority: 3 },
  { slug: "oelde-ns", name: "Ostercappeln", type: "gemeinde", parentSlug: "niedersachsen", population: 10000, plz: ["49179"], priority: 4 },
  { slug: "oyten", name: "Oyten", type: "gemeinde", parentSlug: "niedersachsen", population: 16000, plz: ["28876"], priority: 4 },
  { slug: "quakenbrueck", name: "Quakenbrück", type: "gemeinde", parentSlug: "niedersachsen", population: 13000, plz: ["49610"], priority: 4 },
  { slug: "rastede", name: "Rastede", type: "gemeinde", parentSlug: "niedersachsen", population: 22000, plz: ["26180"], priority: 4 },
  { slug: "rotenburg-wuemme", name: "Rotenburg (Wümme)", type: "gemeinde", parentSlug: "niedersachsen", population: 22000, plz: ["27356"], priority: 4 },
  { slug: "sachsenhagen", name: "Sachsenhagen", type: "gemeinde", parentSlug: "niedersachsen", population: 4000, plz: ["31553"], priority: 3 },
  { slug: "salzbergen", name: "Salzbergen", type: "gemeinde", parentSlug: "niedersachsen", population: 8000, plz: ["48499"], priority: 3 },
  { slug: "salzhausen", name: "Salzhausen", type: "gemeinde", parentSlug: "niedersachsen", population: 7000, plz: ["21376"], priority: 3 },
  { slug: "salzhemmendorf", name: "Salzhemmendorf", type: "gemeinde", parentSlug: "niedersachsen", population: 10000, plz: ["31020"], priority: 4 },
  { slug: "saterland", name: "Saterland", type: "gemeinde", parentSlug: "niedersachsen", population: 14000, plz: ["26683"], priority: 4 },
  { slug: "scheessel", name: "Scheeßel", type: "gemeinde", parentSlug: "niedersachsen", population: 13000, plz: ["27383"], priority: 4 },
  { slug: "schiffdorf", name: "Schiffdorf", type: "gemeinde", parentSlug: "niedersachsen", population: 14000, plz: ["27619"], priority: 4 },
  { slug: "schoeningen", name: "Schöningen", type: "gemeinde", parentSlug: "niedersachsen", population: 11000, plz: ["38364"], priority: 4 },
  { slug: "schwanewede", name: "Schwanewede", type: "gemeinde", parentSlug: "niedersachsen", population: 20000, plz: ["28790"], priority: 4 },
  { slug: "seevetal", name: "Seevetal", type: "gemeinde", parentSlug: "niedersachsen", population: 42000, plz: ["21217", "21218", "21220"], priority: 5 },
  { slug: "soltau", name: "Soltau", type: "gemeinde", parentSlug: "niedersachsen", population: 21000, plz: ["29614"], priority: 4 },
  { slug: "sottrum", name: "Sottrum", type: "gemeinde", parentSlug: "niedersachsen", population: 11000, plz: ["27367"], priority: 4 },
  { slug: "spelle", name: "Spelle", type: "gemeinde", parentSlug: "niedersachsen", population: 13000, plz: ["48480"], priority: 4 },
  { slug: "springe-ns", name: "Springe", type: "gemeinde", parentSlug: "niedersachsen", population: 29000, plz: ["31832"], priority: 4 },
  { slug: "steinfeld", name: "Steinfeld (Oldenburg)", type: "gemeinde", parentSlug: "niedersachsen", population: 10000, plz: ["49439"], priority: 4 },
  { slug: "stelle", name: "Stelle", type: "gemeinde", parentSlug: "niedersachsen", population: 11000, plz: ["21435"], priority: 4 },
  { slug: "sulingen", name: "Sulingen", type: "gemeinde", parentSlug: "niedersachsen", population: 13000, plz: ["27232"], priority: 4 },
  { slug: "tostedt", name: "Tostedt", type: "gemeinde", parentSlug: "niedersachsen", population: 14000, plz: ["21255"], priority: 4 },
  { slug: "twist", name: "Twist", type: "gemeinde", parentSlug: "niedersachsen", population: 10000, plz: ["49767"], priority: 4 },
  { slug: "uslar", name: "Uslar", type: "gemeinde", parentSlug: "niedersachsen", population: 14000, plz: ["37170"], priority: 4 },
  { slug: "visbek", name: "Visbek", type: "gemeinde", parentSlug: "niedersachsen", population: 10000, plz: ["49429"], priority: 4 },
  { slug: "wardenburg", name: "Wardenburg", type: "gemeinde", parentSlug: "niedersachsen", population: 16000, plz: ["26203"], priority: 4 },
  { slug: "wennigsen", name: "Wennigsen (Deister)", type: "gemeinde", parentSlug: "niedersachsen", population: 14000, plz: ["30974"], priority: 4 },
  { slug: "westoverledingen", name: "Westoverledingen", type: "gemeinde", parentSlug: "niedersachsen", population: 21000, plz: ["26810"], priority: 4 },
  { slug: "wietmarschen", name: "Wietmarschen", type: "gemeinde", parentSlug: "niedersachsen", population: 12000, plz: ["49835"], priority: 4 },
  { slug: "wildeshausen", name: "Wildeshausen", type: "gemeinde", parentSlug: "niedersachsen", population: 20000, plz: ["27793"], priority: 4 },
  { slug: "wittingen", name: "Wittingen", type: "gemeinde", parentSlug: "niedersachsen", population: 12000, plz: ["29378"], priority: 4 },
  { slug: "zeven", name: "Zeven", type: "gemeinde", parentSlug: "niedersachsen", population: 14000, plz: ["27404"], priority: 4 },

  // =====================================================
  // WEITERE GEMEINDEN - HESSEN (Ergänzung)
  // =====================================================
  { slug: "aarbergen", name: "Aarbergen", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 6000, plz: ["65326"], priority: 3 },
  { slug: "abtsteinach", name: "Abtsteinach", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 2000, plz: ["69518"], priority: 3 },
  { slug: "allendorf-eder", name: "Allendorf (Eder)", type: "gemeinde", parentSlug: "kassel-bezirk", population: 6000, plz: ["35108"], priority: 3 },
  { slug: "babenhausen", name: "Babenhausen", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 17000, plz: ["64832"], priority: 4 },
  { slug: "biebertal", name: "Biebertal", type: "gemeinde", parentSlug: "giessen-bezirk", population: 10000, plz: ["35444"], priority: 4 },
  { slug: "bickenbach", name: "Bickenbach", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 6000, plz: ["64404"], priority: 3 },
  { slug: "birstein", name: "Birstein", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 6000, plz: ["63633"], priority: 3 },
  { slug: "bruchkoebel", name: "Bruchköbel", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 21000, plz: ["63486"], priority: 4 },
  { slug: "buseck", name: "Buseck", type: "gemeinde", parentSlug: "giessen-bezirk", population: 13000, plz: ["35418"], priority: 4 },
  { slug: "edermuende", name: "Edermünde", type: "gemeinde", parentSlug: "kassel-bezirk", population: 7000, plz: ["34295"], priority: 3 },
  { slug: "egelsbach", name: "Egelsbach", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 12000, plz: ["63329"], priority: 4 },
  { slug: "eppertshausen", name: "Eppertshausen", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 6000, plz: ["64859"], priority: 3 },
  { slug: "erlensee", name: "Erlensee", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 15000, plz: ["63526"], priority: 4 },
  { slug: "erzhausen", name: "Erzhausen", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 8000, plz: ["64390"], priority: 3 },
  { slug: "felsberg", name: "Felsberg", type: "gemeinde", parentSlug: "kassel-bezirk", population: 11000, plz: ["34587"], priority: 4 },
  { slug: "fernwald", name: "Fernwald", type: "gemeinde", parentSlug: "giessen-bezirk", population: 7000, plz: ["35463"], priority: 3 },
  { slug: "florstadt", name: "Florstadt", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 9000, plz: ["61197"], priority: 3 },
  { slug: "freigericht", name: "Freigericht", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 15000, plz: ["63579"], priority: 4 },
  { slug: "geisenheim", name: "Geisenheim", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 12000, plz: ["65366"], priority: 4 },
  { slug: "ginsheim-gustavsburg", name: "Ginsheim-Gustavsburg", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 17000, plz: ["65462"], priority: 4 },
  { slug: "gladenbach", name: "Gladenbach", type: "gemeinde", parentSlug: "giessen-bezirk", population: 12000, plz: ["35075"], priority: 4 },
  { slug: "graefenhausen", name: "Gräfenhausen", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 4000, plz: ["64331"], priority: 3 },
  { slug: "grossalmerode", name: "Großalmerode", type: "gemeinde", parentSlug: "kassel-bezirk", population: 7000, plz: ["37247"], priority: 3 },
  { slug: "grossenlueder", name: "Großenlüder", type: "gemeinde", parentSlug: "kassel-bezirk", population: 9000, plz: ["36137"], priority: 3 },
  { slug: "gruenberg-he", name: "Grünberg", type: "gemeinde", parentSlug: "giessen-bezirk", population: 14000, plz: ["35305"], priority: 4 },
  { slug: "gudensberg", name: "Gudensberg", type: "gemeinde", parentSlug: "kassel-bezirk", population: 10000, plz: ["34281"], priority: 4 },
  { slug: "haiger", name: "Haiger", type: "gemeinde", parentSlug: "giessen-bezirk", population: 20000, plz: ["35708"], priority: 4 },
  { slug: "hainburg", name: "Hainburg", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 15000, plz: ["63512"], priority: 4 },
  { slug: "heusenstamm", name: "Heusenstamm", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 19000, plz: ["63150"], priority: 4 },
  { slug: "huenfeld", name: "Hünfeld", type: "gemeinde", parentSlug: "kassel-bezirk", population: 16000, plz: ["36088"], priority: 4 },
  { slug: "huenstetten", name: "Hünstetten", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 11000, plz: ["65510"], priority: 4 },
  { slug: "kriftel", name: "Kriftel", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 11000, plz: ["65830"], priority: 4 },
  { slug: "langenselbold", name: "Langenselbold", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 14000, plz: ["63505"], priority: 4 },
  { slug: "lauterbach-he", name: "Lauterbach (Hessen)", type: "gemeinde", parentSlug: "giessen-bezirk", population: 14000, plz: ["36341"], priority: 4 },
  { slug: "lich", name: "Lich", type: "gemeinde", parentSlug: "giessen-bezirk", population: 14000, plz: ["35423"], priority: 4 },
  { slug: "linden", name: "Linden", type: "gemeinde", parentSlug: "giessen-bezirk", population: 13000, plz: ["35440"], priority: 4 },
  { slug: "linsengericht", name: "Linsengericht", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 10000, plz: ["63589"], priority: 4 },
  { slug: "lohra", name: "Lohra", type: "gemeinde", parentSlug: "giessen-bezirk", population: 6000, plz: ["35102"], priority: 3 },
  { slug: "lorsch", name: "Lorsch", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 14000, plz: ["64653"], priority: 4 },
  { slug: "muehltal", name: "Mühltal", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 14000, plz: ["64367"], priority: 4 },
  { slug: "muecke", name: "Mücke", type: "gemeinde", parentSlug: "giessen-bezirk", population: 10000, plz: ["35325"], priority: 4 },
  { slug: "nauheim", name: "Nauheim", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 11000, plz: ["64569"], priority: 4 },
  { slug: "nidda-he", name: "Nidda", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 17000, plz: ["63667"], priority: 4 },
  { slug: "niedernhausen", name: "Niedernhausen", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 15000, plz: ["65527"], priority: 4 },
  { slug: "ober-ramstadt", name: "Ober-Ramstadt", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 15000, plz: ["64372"], priority: 4 },
  { slug: "oestrich-winkel", name: "Oestrich-Winkel", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 12000, plz: ["65375"], priority: 4 },
  { slug: "reichelsheim", name: "Reichelsheim (Odenwald)", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 9000, plz: ["64385"], priority: 3 },
  { slug: "reiskirchen", name: "Reiskirchen", type: "gemeinde", parentSlug: "giessen-bezirk", population: 11000, plz: ["35447"], priority: 4 },
  { slug: "riedstadt", name: "Riedstadt", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 25000, plz: ["64560"], priority: 4 },
  { slug: "rodenbach", name: "Rodenbach", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 12000, plz: ["63517"], priority: 4 },
  { slug: "roedermark-he", name: "Rödermark", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 28000, plz: ["63322"], priority: 4 },
  { slug: "ruesselsheim-he", name: "Rüsselsheim am Main", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 66000, plz: ["65428"], priority: 6 },
  { slug: "schlitz", name: "Schlitz", type: "gemeinde", parentSlug: "giessen-bezirk", population: 10000, plz: ["36110"], priority: 4 },
  { slug: "schlüchtern", name: "Schlüchtern", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 17000, plz: ["36381"], priority: 4 },
  { slug: "schoeneck", name: "Schöneck", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 12000, plz: ["61137"], priority: 4 },
  { slug: "schwalbach", name: "Schwalbach am Taunus", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 15000, plz: ["65824"], priority: 4 },
  { slug: "seeheim-jugenheim", name: "Seeheim-Jugenheim", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 17000, plz: ["64342"], priority: 4 },
  { slug: "staufenberg-he", name: "Staufenberg", type: "gemeinde", parentSlug: "giessen-bezirk", population: 8000, plz: ["35460"], priority: 3 },
  { slug: "sulzbach-ts", name: "Sulzbach (Taunus)", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 9000, plz: ["65843"], priority: 3 },
  { slug: "trebur", name: "Trebur", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 14000, plz: ["65468"], priority: 4 },
  { slug: "wehrheim", name: "Wehrheim", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 10000, plz: ["61273"], priority: 4 },
  { slug: "weiterstadt", name: "Weiterstadt", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 26000, plz: ["64331"], priority: 4 },
  { slug: "witzenhausen", name: "Witzenhausen", type: "gemeinde", parentSlug: "kassel-bezirk", population: 15000, plz: ["37213"], priority: 4 },
  { slug: "woelfersheim", name: "Wölfersheim", type: "gemeinde", parentSlug: "darmstadt-bezirk", population: 10000, plz: ["61200"], priority: 4 },

  // =====================================================
  // WEITERE GEMEINDEN - RHEINLAND-PFALZ (Ergänzung)
  // =====================================================
  { slug: "adenau", name: "Adenau", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 3000, plz: ["53518"], priority: 3 },
  { slug: "annweiler", name: "Annweiler am Trifels", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 7000, plz: ["76855"], priority: 3 },
  { slug: "bad-bergzabern", name: "Bad Bergzabern", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 8000, plz: ["76887"], priority: 3 },
  { slug: "bad-hoenningen", name: "Bad Hönningen", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 6000, plz: ["53557"], priority: 3 },
  { slug: "bad-sobernheim", name: "Bad Sobernheim", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 7000, plz: ["55566"], priority: 3 },
  { slug: "bellheim", name: "Bellheim", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 9000, plz: ["76756"], priority: 3 },
  { slug: "betzdorf", name: "Betzdorf", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 10000, plz: ["57518"], priority: 4 },
  { slug: "bingen-rp", name: "Bingen am Rhein", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 26000, plz: ["55411"], priority: 4 },
  { slug: "bobenheim-roxheim", name: "Bobenheim-Roxheim", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 10000, plz: ["67240"], priority: 4 },
  { slug: "boehl-iggelheim", name: "Böhl-Iggelheim", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 11000, plz: ["67459"], priority: 4 },
  { slug: "budenheim", name: "Budenheim", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 9000, plz: ["55257"], priority: 3 },
  { slug: "dannstadt-schauernheim", name: "Dannstadt-Schauernheim", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 9000, plz: ["67125"], priority: 3 },
  { slug: "daun", name: "Daun", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 8000, plz: ["54550"], priority: 3 },
  { slug: "diez", name: "Diez", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 11000, plz: ["65582"], priority: 4 },
  { slug: "dirmstein", name: "Dirmstein", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 3000, plz: ["67246"], priority: 3 },
  { slug: "dudenhofen", name: "Dudenhofen", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 6000, plz: ["67373"], priority: 3 },
  { slug: "edenkoben", name: "Edenkoben", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 7000, plz: ["67480"], priority: 3 },
  { slug: "eisenberg-pfalz", name: "Eisenberg (Pfalz)", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 10000, plz: ["67304"], priority: 4 },
  { slug: "gerolstein", name: "Gerolstein", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 8000, plz: ["54568"], priority: 3 },
  { slug: "gau-algesheim", name: "Gau-Algesheim", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 7000, plz: ["55435"], priority: 3 },
  { slug: "grafschaft", name: "Grafschaft", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 11000, plz: ["53501"], priority: 4 },
  { slug: "gruenstadt-rp", name: "Grünstadt", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 14000, plz: ["67269"], priority: 4 },
  { slug: "hachenburg", name: "Hachenburg", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 6000, plz: ["57627"], priority: 3 },
  { slug: "hermeskeil", name: "Hermeskeil", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 7000, plz: ["54411"], priority: 3 },
  { slug: "hoehr-grenzhausen", name: "Höhr-Grenzhausen", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 9000, plz: ["56203"], priority: 3 },
  { slug: "kandel", name: "Kandel", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 9000, plz: ["76870"], priority: 3 },
  { slug: "kirchen-sieg", name: "Kirchen (Sieg)", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 9000, plz: ["57548"], priority: 3 },
  { slug: "kirchheimbolanden", name: "Kirchheimbolanden", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 8000, plz: ["67292"], priority: 3 },
  { slug: "kirn", name: "Kirn", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 8000, plz: ["55606"], priority: 3 },
  { slug: "linz-rhein", name: "Linz am Rhein", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 6000, plz: ["53545"], priority: 3 },
  { slug: "maxdorf", name: "Maxdorf", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 8000, plz: ["67133"], priority: 3 },
  { slug: "mendig", name: "Mendig", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 9000, plz: ["56743"], priority: 3 },
  { slug: "morbach", name: "Morbach", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 11000, plz: ["54497"], priority: 4 },
  { slug: "neuhofen", name: "Neuhofen", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 7000, plz: ["67141"], priority: 3 },
  { slug: "nierstein", name: "Nierstein", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 8000, plz: ["55283"], priority: 3 },
  { slug: "nieder-olm", name: "Nieder-Olm", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 10000, plz: ["55268"], priority: 4 },
  { slug: "oberwesel", name: "Oberwesel", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 3000, plz: ["55430"], priority: 3 },
  { slug: "oppenheim", name: "Oppenheim", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 8000, plz: ["55276"], priority: 3 },
  { slug: "osthofen", name: "Osthofen", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 10000, plz: ["67574"], priority: 4 },
  { slug: "plaidt", name: "Plaidt", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 6000, plz: ["56637"], priority: 3 },
  { slug: "polch", name: "Polch", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 7000, plz: ["56751"], priority: 3 },
  { slug: "pruem", name: "Prüm", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 5000, plz: ["54595"], priority: 3 },
  { slug: "ramstein-miesenbach", name: "Ramstein-Miesenbach", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 8000, plz: ["66877"], priority: 3 },
  { slug: "rengsdorf", name: "Rengsdorf", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 4000, plz: ["56579"], priority: 3 },
  { slug: "rheinboellen", name: "Rheinböllen", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 4000, plz: ["55494"], priority: 3 },
  { slug: "rodalben", name: "Rodalben", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 7000, plz: ["66976"], priority: 3 },
  { slug: "saarburg", name: "Saarburg", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 7000, plz: ["54439"], priority: 3 },
  { slug: "schweich", name: "Schweich", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 9000, plz: ["54338"], priority: 3 },
  { slug: "simmern", name: "Simmern/Hunsrück", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 8000, plz: ["55469"], priority: 3 },
  { slug: "treis-karden", name: "Treis-Karden", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 2000, plz: ["56253"], priority: 3 },
  { slug: "unkel", name: "Unkel", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 5000, plz: ["53572"], priority: 3 },
  { slug: "vallendar", name: "Vallendar", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 9000, plz: ["56179"], priority: 3 },
  { slug: "waldsee", name: "Waldsee", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 5000, plz: ["67165"], priority: 3 },
  { slug: "weissenthurm", name: "Weißenthurm", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 8000, plz: ["56575"], priority: 3 },
  { slug: "wirges", name: "Wirges", type: "gemeinde", parentSlug: "rheinland-pfalz", population: 6000, plz: ["56422"], priority: 3 },

  // =====================================================
  // WEITERE GEMEINDEN - SACHSEN (Ergänzung)
  // =====================================================
  { slug: "adorf", name: "Adorf/Vogtl.", type: "gemeinde", parentSlug: "sachsen", population: 5000, plz: ["08626"], priority: 3 },
  { slug: "augustusburg", name: "Augustusburg", type: "gemeinde", parentSlug: "sachsen", population: 5000, plz: ["09573"], priority: 3 },
  { slug: "bad-elster", name: "Bad Elster", type: "gemeinde", parentSlug: "sachsen", population: 4000, plz: ["08645"], priority: 3 },
  { slug: "bad-muskau", name: "Bad Muskau", type: "gemeinde", parentSlug: "sachsen", population: 4000, plz: ["02953"], priority: 3 },
  { slug: "bad-schandau", name: "Bad Schandau", type: "gemeinde", parentSlug: "sachsen", population: 4000, plz: ["01814"], priority: 3 },
  { slug: "bannewitz", name: "Bannewitz", type: "gemeinde", parentSlug: "sachsen", population: 11000, plz: ["01728"], priority: 4 },
  { slug: "bischofswerda", name: "Bischofswerda", type: "gemeinde", parentSlug: "sachsen", population: 11000, plz: ["01877"], priority: 4 },
  { slug: "bobritzsch-hilbersdorf", name: "Bobritzsch-Hilbersdorf", type: "gemeinde", parentSlug: "sachsen", population: 6000, plz: ["09627"], priority: 3 },
  { slug: "borsdorf", name: "Borsdorf", type: "gemeinde", parentSlug: "sachsen", population: 8000, plz: ["04451"], priority: 3 },
  { slug: "brand-erbisdorf", name: "Brand-Erbisdorf", type: "gemeinde", parentSlug: "sachsen", population: 10000, plz: ["09618"], priority: 4 },
  { slug: "brandis", name: "Brandis", type: "gemeinde", parentSlug: "sachsen", population: 10000, plz: ["04821"], priority: 4 },
  { slug: "burgstaedt", name: "Burgstädt", type: "gemeinde", parentSlug: "sachsen", population: 12000, plz: ["09217"], priority: 4 },
  { slug: "cunewalde", name: "Cunewalde", type: "gemeinde", parentSlug: "sachsen", population: 5000, plz: ["02733"], priority: 3 },
  { slug: "dippoldiswalde", name: "Dippoldiswalde", type: "gemeinde", parentSlug: "sachsen", population: 14000, plz: ["01744"], priority: 4 },
  { slug: "doebern", name: "Döbern", type: "gemeinde", parentSlug: "sachsen", population: 3000, plz: ["03159"], priority: 3 },
  { slug: "ebersbach-neugersdorf", name: "Ebersbach-Neugersdorf", type: "gemeinde", parentSlug: "sachsen", population: 12000, plz: ["02730"], priority: 4 },
  { slug: "eibenstock", name: "Eibenstock", type: "gemeinde", parentSlug: "sachsen", population: 8000, plz: ["08309"], priority: 3 },
  { slug: "floeha", name: "Flöha", type: "gemeinde", parentSlug: "sachsen", population: 11000, plz: ["09557"], priority: 4 },
  { slug: "frankenberg-sa", name: "Frankenberg/Sa.", type: "gemeinde", parentSlug: "sachsen", population: 15000, plz: ["09669"], priority: 4 },
  { slug: "geithain", name: "Geithain", type: "gemeinde", parentSlug: "sachsen", population: 6000, plz: ["04643"], priority: 3 },
  { slug: "glauchau", name: "Glauchau", type: "gemeinde", parentSlug: "sachsen", population: 22000, plz: ["08371"], priority: 4 },
  { slug: "groitzsch", name: "Groitzsch", type: "gemeinde", parentSlug: "sachsen", population: 8000, plz: ["04539"], priority: 3 },
  { slug: "grossenhain-sa", name: "Großenhain", type: "gemeinde", parentSlug: "sachsen", population: 18000, plz: ["01558"], priority: 4 },
  { slug: "grosspösna", name: "Großpösna", type: "gemeinde", parentSlug: "sachsen", population: 6000, plz: ["04463"], priority: 3 },
  { slug: "hainichen", name: "Hainichen", type: "gemeinde", parentSlug: "sachsen", population: 9000, plz: ["09661"], priority: 3 },
  { slug: "hartha", name: "Hartha", type: "gemeinde", parentSlug: "sachsen", population: 8000, plz: ["04746"], priority: 3 },
  { slug: "herrnhut", name: "Herrnhut", type: "gemeinde", parentSlug: "sachsen", population: 6000, plz: ["02747"], priority: 3 },
  { slug: "kirchberg", name: "Kirchberg", type: "gemeinde", parentSlug: "sachsen", population: 9000, plz: ["08107"], priority: 3 },
  { slug: "klingenthal", name: "Klingenthal", type: "gemeinde", parentSlug: "sachsen", population: 8000, plz: ["08248"], priority: 3 },
  { slug: "koenigstein-sa", name: "Königstein/Sächs. Schw.", type: "gemeinde", parentSlug: "sachsen", population: 3000, plz: ["01824"], priority: 3 },
  { slug: "leisnig", name: "Leisnig", type: "gemeinde", parentSlug: "sachsen", population: 9000, plz: ["04703"], priority: 3 },
  { slug: "lichtenstein-sa", name: "Lichtenstein/Sa.", type: "gemeinde", parentSlug: "sachsen", population: 11000, plz: ["09350"], priority: 4 },
  { slug: "loessnitz", name: "Lößnitz", type: "gemeinde", parentSlug: "sachsen", population: 8000, plz: ["08294"], priority: 3 },
  { slug: "lunzenau", name: "Lunzenau", type: "gemeinde", parentSlug: "sachsen", population: 5000, plz: ["09328"], priority: 3 },
  { slug: "machern", name: "Machern", type: "gemeinde", parentSlug: "sachsen", population: 7000, plz: ["04827"], priority: 3 },
  { slug: "markranstaedt", name: "Markranstädt", type: "gemeinde", parentSlug: "sachsen", population: 16000, plz: ["04420"], priority: 4 },
  { slug: "markneukirchen", name: "Markneukirchen", type: "gemeinde", parentSlug: "sachsen", population: 8000, plz: ["08258"], priority: 3 },
  { slug: "meerane-sa", name: "Meerane", type: "gemeinde", parentSlug: "sachsen", population: 14000, plz: ["08393"], priority: 4 },
  { slug: "moritzburg", name: "Moritzburg", type: "gemeinde", parentSlug: "sachsen", population: 8000, plz: ["01468"], priority: 3 },
  { slug: "muegeln", name: "Mügeln", type: "gemeinde", parentSlug: "sachsen", population: 6000, plz: ["04769"], priority: 3 },
  { slug: "naunhof", name: "Naunhof", type: "gemeinde", parentSlug: "sachsen", population: 9000, plz: ["04683"], priority: 3 },
  { slug: "neustadt-sa", name: "Neustadt in Sachsen", type: "gemeinde", parentSlug: "sachsen", population: 12000, plz: ["01844"], priority: 4 },
  { slug: "niesky", name: "Niesky", type: "gemeinde", parentSlug: "sachsen", population: 10000, plz: ["02906"], priority: 4 },
  { slug: "nossen", name: "Nossen", type: "gemeinde", parentSlug: "sachsen", population: 8000, plz: ["01683"], priority: 3 },
  { slug: "oberlungwitz", name: "Oberlungwitz", type: "gemeinde", parentSlug: "sachsen", population: 6000, plz: ["09353"], priority: 3 },
  { slug: "oederan", name: "Oederan", type: "gemeinde", parentSlug: "sachsen", population: 8000, plz: ["09569"], priority: 3 },
  { slug: "oelsnitz-erzgeb", name: "Oelsnitz/Erzgeb.", type: "gemeinde", parentSlug: "sachsen", population: 10000, plz: ["09376"], priority: 4 },
  { slug: "oelsnitz-vogtl", name: "Oelsnitz/Vogtl.", type: "gemeinde", parentSlug: "sachsen", population: 11000, plz: ["08606"], priority: 4 },
  { slug: "olbernhau", name: "Olbernhau", type: "gemeinde", parentSlug: "sachsen", population: 10000, plz: ["09526"], priority: 4 },
  { slug: "oppach", name: "Oppach", type: "gemeinde", parentSlug: "sachsen", population: 4000, plz: ["02736"], priority: 3 },
  { slug: "ottendorf-okrilla", name: "Ottendorf-Okrilla", type: "gemeinde", parentSlug: "sachsen", population: 10000, plz: ["01458"], priority: 4 },
  { slug: "pegau", name: "Pegau", type: "gemeinde", parentSlug: "sachsen", population: 6000, plz: ["04523"], priority: 3 },
  { slug: "penig", name: "Penig", type: "gemeinde", parentSlug: "sachsen", population: 8000, plz: ["09322"], priority: 3 },
  { slug: "pulsnitz", name: "Pulsnitz", type: "gemeinde", parentSlug: "sachsen", population: 8000, plz: ["01896"], priority: 3 },
  { slug: "radeberg", name: "Radeberg", type: "gemeinde", parentSlug: "sachsen", population: 19000, plz: ["01454"], priority: 4 },
  { slug: "radeburg", name: "Radeburg", type: "gemeinde", parentSlug: "sachsen", population: 8000, plz: ["01471"], priority: 3 },
  { slug: "raschau-markersbach", name: "Raschau-Markersbach", type: "gemeinde", parentSlug: "sachsen", population: 6000, plz: ["08352"], priority: 3 },
  { slug: "rochlitz", name: "Rochlitz", type: "gemeinde", parentSlug: "sachsen", population: 6000, plz: ["09306"], priority: 3 },
  { slug: "rohrbach", name: "Rothenburg/O.L.", type: "gemeinde", parentSlug: "sachsen", population: 5000, plz: ["02929"], priority: 3 },
  { slug: "scheibenberg", name: "Scheibenberg", type: "gemeinde", parentSlug: "sachsen", population: 2000, plz: ["09481"], priority: 3 },
  { slug: "schirgiswalde", name: "Schirgiswalde-Kirschau", type: "gemeinde", parentSlug: "sachsen", population: 6000, plz: ["02681"], priority: 3 },
  { slug: "sebnitz", name: "Sebnitz", type: "gemeinde", parentSlug: "sachsen", population: 10000, plz: ["01855"], priority: 4 },
  { slug: "seiffen", name: "Seiffen/Erzgeb.", type: "gemeinde", parentSlug: "sachsen", population: 2000, plz: ["09548"], priority: 3 },
  { slug: "stolpen", name: "Stolpen", type: "gemeinde", parentSlug: "sachsen", population: 6000, plz: ["01833"], priority: 3 },
  { slug: "taucha", name: "Taucha", type: "gemeinde", parentSlug: "sachsen", population: 16000, plz: ["04425"], priority: 4 },
  { slug: "thalheim", name: "Thalheim/Erzgeb.", type: "gemeinde", parentSlug: "sachsen", population: 6000, plz: ["09380"], priority: 3 },
  { slug: "treuen", name: "Treuen", type: "gemeinde", parentSlug: "sachsen", population: 8000, plz: ["08233"], priority: 3 },
  { slug: "waldheim", name: "Waldheim", type: "gemeinde", parentSlug: "sachsen", population: 9000, plz: ["04736"], priority: 3 },
  { slug: "weinboehla", name: "Weinböhla", type: "gemeinde", parentSlug: "sachsen", population: 10000, plz: ["01689"], priority: 4 },
  { slug: "wilkau-hasslau", name: "Wilkau-Haßlau", type: "gemeinde", parentSlug: "sachsen", population: 10000, plz: ["08112"], priority: 4 },
  { slug: "wilsdruff", name: "Wilsdruff", type: "gemeinde", parentSlug: "sachsen", population: 14000, plz: ["01723"], priority: 4 },
  { slug: "zwenkau", name: "Zwenkau", type: "gemeinde", parentSlug: "sachsen", population: 9000, plz: ["04442"], priority: 3 },
  { slug: "zwoenitz", name: "Zwönitz", type: "gemeinde", parentSlug: "sachsen", population: 12000, plz: ["08297"], priority: 4 },

  // =====================================================
  // WEITERE GEMEINDEN - SCHLESWIG-HOLSTEIN (Ergänzung)
  // =====================================================
  { slug: "bargteheide", name: "Bargteheide", type: "gemeinde", parentSlug: "schleswig-holstein", population: 16000, plz: ["22941"], priority: 4 },
  { slug: "barmstedt", name: "Barmstedt", type: "gemeinde", parentSlug: "schleswig-holstein", population: 10000, plz: ["25355"], priority: 4 },
  { slug: "barsbüttel", name: "Barsbüttel", type: "gemeinde", parentSlug: "schleswig-holstein", population: 13000, plz: ["22885"], priority: 4 },
  { slug: "boostedt", name: "Boostedt", type: "gemeinde", parentSlug: "schleswig-holstein", population: 5000, plz: ["24598"], priority: 3 },
  { slug: "bordesholm", name: "Bordesholm", type: "gemeinde", parentSlug: "schleswig-holstein", population: 8000, plz: ["24582"], priority: 3 },
  { slug: "bornhoevel", name: "Bornhöved", type: "gemeinde", parentSlug: "schleswig-holstein", population: 4000, plz: ["24619"], priority: 3 },
  { slug: "brunsbuettel", name: "Brunsbüttel", type: "gemeinde", parentSlug: "schleswig-holstein", population: 13000, plz: ["25541"], priority: 4 },
  { slug: "buedelsdorf", name: "Büdelsdorf", type: "gemeinde", parentSlug: "schleswig-holstein", population: 10000, plz: ["24782"], priority: 4 },
  { slug: "busum", name: "Büsum", type: "gemeinde", parentSlug: "schleswig-holstein", population: 5000, plz: ["25761"], priority: 3 },
  { slug: "damp", name: "Damp", type: "gemeinde", parentSlug: "schleswig-holstein", population: 2000, plz: ["24351"], priority: 3 },
  { slug: "eckernfoerde", name: "Eckernförde", type: "gemeinde", parentSlug: "schleswig-holstein", population: 22000, plz: ["24340"], priority: 4 },
  { slug: "eutin", name: "Eutin", type: "gemeinde", parentSlug: "schleswig-holstein", population: 17000, plz: ["23701"], priority: 4 },
  { slug: "fehmarn", name: "Fehmarn", type: "gemeinde", parentSlug: "schleswig-holstein", population: 13000, plz: ["23769"], priority: 4 },
  { slug: "friedrichstadt", name: "Friedrichstadt", type: "gemeinde", parentSlug: "schleswig-holstein", population: 3000, plz: ["25840"], priority: 3 },
  { slug: "gluecksburg", name: "Glücksburg (Ostsee)", type: "gemeinde", parentSlug: "schleswig-holstein", population: 6000, plz: ["24960"], priority: 3 },
  { slug: "glueckstadt", name: "Glückstadt", type: "gemeinde", parentSlug: "schleswig-holstein", population: 11000, plz: ["25348"], priority: 4 },
  { slug: "grosshansdorf", name: "Großhansdorf", type: "gemeinde", parentSlug: "schleswig-holstein", population: 9000, plz: ["22927"], priority: 3 },
  { slug: "halstenbek", name: "Halstenbek", type: "gemeinde", parentSlug: "schleswig-holstein", population: 18000, plz: ["25469"], priority: 4 },
  { slug: "harrislee", name: "Harrislee", type: "gemeinde", parentSlug: "schleswig-holstein", population: 12000, plz: ["24955"], priority: 4 },
  { slug: "heiligenhafen", name: "Heiligenhafen", type: "gemeinde", parentSlug: "schleswig-holstein", population: 9000, plz: ["23774"], priority: 3 },
  { slug: "henstedt-ulzburg", name: "Henstedt-Ulzburg", type: "gemeinde", parentSlug: "schleswig-holstein", population: 29000, plz: ["24558"], priority: 4 },
  { slug: "hohenlockstedt", name: "Hohenlockstedt", type: "gemeinde", parentSlug: "schleswig-holstein", population: 6000, plz: ["25551"], priority: 3 },
  { slug: "hohenwestedt", name: "Hohenwestedt", type: "gemeinde", parentSlug: "schleswig-holstein", population: 5000, plz: ["24594"], priority: 3 },
  { slug: "kaltenkirchen", name: "Kaltenkirchen", type: "gemeinde", parentSlug: "schleswig-holstein", population: 22000, plz: ["24568"], priority: 4 },
  { slug: "kappeln", name: "Kappeln", type: "gemeinde", parentSlug: "schleswig-holstein", population: 9000, plz: ["24376"], priority: 3 },
  { slug: "kellinghusen", name: "Kellinghusen", type: "gemeinde", parentSlug: "schleswig-holstein", population: 8000, plz: ["25548"], priority: 3 },
  { slug: "kronshagen", name: "Kronshagen", type: "gemeinde", parentSlug: "schleswig-holstein", population: 12000, plz: ["24119"], priority: 4 },
  { slug: "lauenburg", name: "Lauenburg/Elbe", type: "gemeinde", parentSlug: "schleswig-holstein", population: 12000, plz: ["21481"], priority: 4 },
  { slug: "malente", name: "Malente", type: "gemeinde", parentSlug: "schleswig-holstein", population: 11000, plz: ["23714"], priority: 4 },
  { slug: "marne", name: "Marne", type: "gemeinde", parentSlug: "schleswig-holstein", population: 6000, plz: ["25709"], priority: 3 },
  { slug: "meldorf", name: "Meldorf", type: "gemeinde", parentSlug: "schleswig-holstein", population: 7000, plz: ["25704"], priority: 3 },
  { slug: "moelln", name: "Mölln", type: "gemeinde", parentSlug: "schleswig-holstein", population: 19000, plz: ["23879"], priority: 4 },
  { slug: "neustadt-holstein", name: "Neustadt in Holstein", type: "gemeinde", parentSlug: "schleswig-holstein", population: 15000, plz: ["23730"], priority: 4 },
  { slug: "niebüll", name: "Niebüll", type: "gemeinde", parentSlug: "schleswig-holstein", population: 10000, plz: ["25899"], priority: 4 },
  { slug: "nordstemmen", name: "Nordstemmen", type: "gemeinde", parentSlug: "schleswig-holstein", population: 11000, plz: ["31171"], priority: 4 },
  { slug: "oelde-sh", name: "Oldenburg in Holstein", type: "gemeinde", parentSlug: "schleswig-holstein", population: 10000, plz: ["23758"], priority: 4 },
  { slug: "ploen", name: "Plön", type: "gemeinde", parentSlug: "schleswig-holstein", population: 13000, plz: ["24306"], priority: 4 },
  { slug: "preetz", name: "Preetz", type: "gemeinde", parentSlug: "schleswig-holstein", population: 16000, plz: ["24211"], priority: 4 },
  { slug: "quickborn", name: "Quickborn", type: "gemeinde", parentSlug: "schleswig-holstein", population: 22000, plz: ["25451"], priority: 4 },
  { slug: "ratekau", name: "Ratekau", type: "gemeinde", parentSlug: "schleswig-holstein", population: 16000, plz: ["23626"], priority: 4 },
  { slug: "ratzeburg", name: "Ratzeburg", type: "gemeinde", parentSlug: "schleswig-holstein", population: 15000, plz: ["23909"], priority: 4 },
  { slug: "rellingen", name: "Rellingen", type: "gemeinde", parentSlug: "schleswig-holstein", population: 15000, plz: ["25462"], priority: 4 },
  { slug: "scharbeutz", name: "Scharbeutz", type: "gemeinde", parentSlug: "schleswig-holstein", population: 12000, plz: ["23683"], priority: 4 },
  { slug: "schenefeld", name: "Schenefeld", type: "gemeinde", parentSlug: "schleswig-holstein", population: 19000, plz: ["22869"], priority: 4 },
  { slug: "schleswig", name: "Schleswig", type: "gemeinde", parentSlug: "schleswig-holstein", population: 24000, plz: ["24837"], priority: 4 },
  { slug: "schwarzenbek", name: "Schwarzenbek", type: "gemeinde", parentSlug: "schleswig-holstein", population: 17000, plz: ["21493"], priority: 4 },
  { slug: "stockelsdorf", name: "Stockelsdorf", type: "gemeinde", parentSlug: "schleswig-holstein", population: 17000, plz: ["23617"], priority: 4 },
  { slug: "sylt", name: "Sylt", type: "gemeinde", parentSlug: "schleswig-holstein", population: 14000, plz: ["25980", "25996", "25997", "25999"], priority: 4 },
  { slug: "timmendorfer-strand", name: "Timmendorfer Strand", type: "gemeinde", parentSlug: "schleswig-holstein", population: 9000, plz: ["23669"], priority: 3 },
  { slug: "tornesch", name: "Tornesch", type: "gemeinde", parentSlug: "schleswig-holstein", population: 14000, plz: ["25436"], priority: 4 },
  { slug: "trappenkamp", name: "Trappenkamp", type: "gemeinde", parentSlug: "schleswig-holstein", population: 5000, plz: ["24610"], priority: 3 },
  { slug: "trittau", name: "Trittau", type: "gemeinde", parentSlug: "schleswig-holstein", population: 9000, plz: ["22946"], priority: 3 },
  { slug: "uetersen", name: "Uetersen", type: "gemeinde", parentSlug: "schleswig-holstein", population: 19000, plz: ["25436"], priority: 4 },
  { slug: "wahlstedt", name: "Wahlstedt", type: "gemeinde", parentSlug: "schleswig-holstein", population: 10000, plz: ["23812"], priority: 4 },
  { slug: "westerland", name: "Westerland", type: "gemeinde", parentSlug: "schleswig-holstein", population: 9000, plz: ["25980"], priority: 4 },
  { slug: "wyk-foehr", name: "Wyk auf Föhr", type: "gemeinde", parentSlug: "schleswig-holstein", population: 4000, plz: ["25938"], priority: 3 },

  // =====================================================
  // WEITERE GEMEINDEN - BRANDENBURG (Ergänzung)
  // =====================================================
  { slug: "angermünde", name: "Angermünde", type: "gemeinde", parentSlug: "brandenburg", population: 13000, plz: ["16278"], priority: 4 },
  { slug: "bad-belzig", name: "Bad Belzig", type: "gemeinde", parentSlug: "brandenburg", population: 11000, plz: ["14806"], priority: 4 },
  { slug: "bad-freienwalde", name: "Bad Freienwalde (Oder)", type: "gemeinde", parentSlug: "brandenburg", population: 12000, plz: ["16259"], priority: 4 },
  { slug: "bad-liebenwerda", name: "Bad Liebenwerda", type: "gemeinde", parentSlug: "brandenburg", population: 9000, plz: ["04924"], priority: 3 },
  { slug: "bad-saarow", name: "Bad Saarow", type: "gemeinde", parentSlug: "brandenburg", population: 5000, plz: ["15526"], priority: 3 },
  { slug: "beelitz", name: "Beelitz", type: "gemeinde", parentSlug: "brandenburg", population: 13000, plz: ["14547"], priority: 4 },
  { slug: "beeskow", name: "Beeskow", type: "gemeinde", parentSlug: "brandenburg", population: 8000, plz: ["15848"], priority: 3 },
  { slug: "bestensee", name: "Bestensee", type: "gemeinde", parentSlug: "brandenburg", population: 8000, plz: ["15741"], priority: 3 },
  { slug: "birkenwerder", name: "Birkenwerder", type: "gemeinde", parentSlug: "brandenburg", population: 8000, plz: ["16547"], priority: 3 },
  { slug: "blankenfelde-mahlow", name: "Blankenfelde-Mahlow", type: "gemeinde", parentSlug: "brandenburg", population: 29000, plz: ["15827"], priority: 4 },
  { slug: "brieselang", name: "Brieselang", type: "gemeinde", parentSlug: "brandenburg", population: 13000, plz: ["14656"], priority: 4 },
  { slug: "calau", name: "Calau", type: "gemeinde", parentSlug: "brandenburg", population: 8000, plz: ["03205"], priority: 3 },
  { slug: "dallgow-doeberitz", name: "Dallgow-Döberitz", type: "gemeinde", parentSlug: "brandenburg", population: 10000, plz: ["14624"], priority: 4 },
  { slug: "doberlug-kirchhain", name: "Doberlug-Kirchhain", type: "gemeinde", parentSlug: "brandenburg", population: 9000, plz: ["03253"], priority: 3 },
  { slug: "eisenhuettenstadt", name: "Eisenhüttenstadt", type: "gemeinde", parentSlug: "brandenburg", population: 24000, plz: ["15890"], priority: 4 },
  { slug: "erkner", name: "Erkner", type: "gemeinde", parentSlug: "brandenburg", population: 12000, plz: ["15537"], priority: 4 },
  { slug: "fehrbellin", name: "Fehrbellin", type: "gemeinde", parentSlug: "brandenburg", population: 9000, plz: ["16833"], priority: 3 },
  { slug: "finsterwalde", name: "Finsterwalde", type: "gemeinde", parentSlug: "brandenburg", population: 16000, plz: ["03238"], priority: 4 },
  { slug: "forst-lausitz", name: "Forst (Lausitz)", type: "gemeinde", parentSlug: "brandenburg", population: 18000, plz: ["03149"], priority: 4 },
  { slug: "fredersdorf-vogelsdorf", name: "Fredersdorf-Vogelsdorf", type: "gemeinde", parentSlug: "brandenburg", population: 15000, plz: ["15370"], priority: 4 },
  { slug: "glienicke", name: "Glienicke/Nordbahn", type: "gemeinde", parentSlug: "brandenburg", population: 13000, plz: ["16548"], priority: 4 },
  { slug: "grossr", name: "Großräschen", type: "gemeinde", parentSlug: "brandenburg", population: 8000, plz: ["01983"], priority: 3 },
  { slug: "gruenheide", name: "Grünheide (Mark)", type: "gemeinde", parentSlug: "brandenburg", population: 9000, plz: ["15537"], priority: 3 },
  { slug: "guben", name: "Guben", type: "gemeinde", parentSlug: "brandenburg", population: 17000, plz: ["03172"], priority: 4 },
  { slug: "hoppegarten", name: "Hoppegarten", type: "gemeinde", parentSlug: "brandenburg", population: 18000, plz: ["15366"], priority: 4 },
  { slug: "jüterbog", name: "Jüterbog", type: "gemeinde", parentSlug: "brandenburg", population: 12000, plz: ["14913"], priority: 4 },
  { slug: "kremmen", name: "Kremmen", type: "gemeinde", parentSlug: "brandenburg", population: 7000, plz: ["16766"], priority: 3 },
  { slug: "kyritz", name: "Kyritz", type: "gemeinde", parentSlug: "brandenburg", population: 9000, plz: ["16866"], priority: 3 },
  { slug: "lauchhammer", name: "Lauchhammer", type: "gemeinde", parentSlug: "brandenburg", population: 14000, plz: ["01979"], priority: 4 },
  { slug: "lehnin", name: "Kloster Lehnin", type: "gemeinde", parentSlug: "brandenburg", population: 11000, plz: ["14797"], priority: 4 },
  { slug: "liebenwalde", name: "Liebenwalde", type: "gemeinde", parentSlug: "brandenburg", population: 4000, plz: ["16559"], priority: 3 },
  { slug: "luckau", name: "Luckau", type: "gemeinde", parentSlug: "brandenburg", population: 9000, plz: ["15926"], priority: 3 },
  { slug: "luckenwalde", name: "Luckenwalde", type: "gemeinde", parentSlug: "brandenburg", population: 20000, plz: ["14943"], priority: 4 },
  { slug: "lübben", name: "Lübben (Spreewald)", type: "gemeinde", parentSlug: "brandenburg", population: 14000, plz: ["15907"], priority: 4 },
  { slug: "lübbenau", name: "Lübbenau/Spreewald", type: "gemeinde", parentSlug: "brandenburg", population: 16000, plz: ["03222"], priority: 4 },
  { slug: "michendorf", name: "Michendorf", type: "gemeinde", parentSlug: "brandenburg", population: 13000, plz: ["14552"], priority: 4 },
  { slug: "muehlenbecker-land", name: "Mühlenbecker Land", type: "gemeinde", parentSlug: "brandenburg", population: 16000, plz: ["16567"], priority: 4 },
  { slug: "nauen", name: "Nauen", type: "gemeinde", parentSlug: "brandenburg", population: 18000, plz: ["14641"], priority: 4 },
  { slug: "neuenhagen", name: "Neuenhagen bei Berlin", type: "gemeinde", parentSlug: "brandenburg", population: 19000, plz: ["15366"], priority: 4 },
  { slug: "peitz", name: "Peitz", type: "gemeinde", parentSlug: "brandenburg", population: 4000, plz: ["03185"], priority: 3 },
  { slug: "perleberg", name: "Perleberg", type: "gemeinde", parentSlug: "brandenburg", population: 12000, plz: ["19348"], priority: 4 },
  { slug: "petershagen-eggersdorf", name: "Petershagen/Eggersdorf", type: "gemeinde", parentSlug: "brandenburg", population: 16000, plz: ["15345"], priority: 4 },
  { slug: "premnitz", name: "Premnitz", type: "gemeinde", parentSlug: "brandenburg", population: 8000, plz: ["14727"], priority: 3 },
  { slug: "prenzlau", name: "Prenzlau", type: "gemeinde", parentSlug: "brandenburg", population: 19000, plz: ["17291"], priority: 4 },
  { slug: "pritzwalk", name: "Pritzwalk", type: "gemeinde", parentSlug: "brandenburg", population: 12000, plz: ["16928"], priority: 4 },
  { slug: "rangsdorf", name: "Rangsdorf", type: "gemeinde", parentSlug: "brandenburg", population: 11000, plz: ["15834"], priority: 4 },
  { slug: "rathenow", name: "Rathenow", type: "gemeinde", parentSlug: "brandenburg", population: 24000, plz: ["14712"], priority: 4 },
  { slug: "ruedersdorf", name: "Rüdersdorf bei Berlin", type: "gemeinde", parentSlug: "brandenburg", population: 16000, plz: ["15562"], priority: 4 },
  { slug: "schoenefeld", name: "Schönefeld", type: "gemeinde", parentSlug: "brandenburg", population: 17000, plz: ["12529"], priority: 4 },
  { slug: "schoeneiche", name: "Schöneiche bei Berlin", type: "gemeinde", parentSlug: "brandenburg", population: 13000, plz: ["15566"], priority: 4 },
  { slug: "schwarzheide", name: "Schwarzheide", type: "gemeinde", parentSlug: "brandenburg", population: 6000, plz: ["01987"], priority: 3 },
  { slug: "seelow", name: "Seelow", type: "gemeinde", parentSlug: "brandenburg", population: 5000, plz: ["15306"], priority: 3 },
  { slug: "stahnsdorf", name: "Stahnsdorf", type: "gemeinde", parentSlug: "brandenburg", population: 15000, plz: ["14532"], priority: 4 },
  { slug: "storkow", name: "Storkow (Mark)", type: "gemeinde", parentSlug: "brandenburg", population: 9000, plz: ["15859"], priority: 3 },
  { slug: "templin", name: "Templin", type: "gemeinde", parentSlug: "brandenburg", population: 16000, plz: ["17268"], priority: 4 },
  { slug: "vetschau", name: "Vetschau/Spreewald", type: "gemeinde", parentSlug: "brandenburg", population: 8000, plz: ["03226"], priority: 3 },
  { slug: "wandlitz", name: "Wandlitz", type: "gemeinde", parentSlug: "brandenburg", population: 24000, plz: ["16348"], priority: 4 },
  { slug: "wildau", name: "Wildau", type: "gemeinde", parentSlug: "brandenburg", population: 10000, plz: ["15745"], priority: 4 },
  { slug: "wittenberge", name: "Wittenberge", type: "gemeinde", parentSlug: "brandenburg", population: 17000, plz: ["19322"], priority: 4 },
  { slug: "wittstock", name: "Wittstock/Dosse", type: "gemeinde", parentSlug: "brandenburg", population: 14000, plz: ["16909"], priority: 4 },
  { slug: "zehdenick", name: "Zehdenick", type: "gemeinde", parentSlug: "brandenburg", population: 13000, plz: ["16792"], priority: 4 },
  { slug: "zossen", name: "Zossen", type: "gemeinde", parentSlug: "brandenburg", population: 20000, plz: ["15806"], priority: 4 },

  // =====================================================
  // WEITERE GEMEINDEN - SACHSEN-ANHALT (Ergänzung)
  // =====================================================
  { slug: "aschersleben", name: "Aschersleben", type: "gemeinde", parentSlug: "sachsen-anhalt", population: 27000, plz: ["06449"], priority: 4 },
  { slug: "bad-dueben", name: "Bad Düben", type: "gemeinde", parentSlug: "sachsen-anhalt", population: 8000, plz: ["04849"], priority: 3 },
  { slug: "bad-lauchstaedt", name: "Bad Lauchstädt", type: "gemeinde", parentSlug: "sachsen-anhalt", population: 9000, plz: ["06246"], priority: 3 },
  { slug: "bad-schmiedeberg", name: "Bad Schmiedeberg", type: "gemeinde", parentSlug: "sachsen-anhalt", population: 8000, plz: ["06905"], priority: 3 },
  { slug: "ballenstedt", name: "Ballenstedt", type: "gemeinde", parentSlug: "sachsen-anhalt", population: 9000, plz: ["06493"], priority: 3 },
  { slug: "blankenburg", name: "Blankenburg (Harz)", type: "gemeinde", parentSlug: "sachsen-anhalt", population: 20000, plz: ["38889"], priority: 4 },
  { slug: "burg-sa", name: "Burg", type: "gemeinde", parentSlug: "sachsen-anhalt", population: 23000, plz: ["39288"], priority: 4 },
  { slug: "calbe", name: "Calbe (Saale)", type: "gemeinde", parentSlug: "sachsen-anhalt", population: 9000, plz: ["39240"], priority: 3 },
  { slug: "coswig-anhalt", name: "Coswig (Anhalt)", type: "gemeinde", parentSlug: "sachsen-anhalt", population: 12000, plz: ["06869"], priority: 4 },
  { slug: "eisleben", name: "Lutherstadt Eisleben", type: "gemeinde", parentSlug: "sachsen-anhalt", population: 24000, plz: ["06295"], priority: 4 },
  { slug: "gardelegen", name: "Gardelegen", type: "gemeinde", parentSlug: "sachsen-anhalt", population: 22000, plz: ["39638"], priority: 4 },
  { slug: "genthin", name: "Genthin", type: "gemeinde", parentSlug: "sachsen-anhalt", population: 14000, plz: ["39307"], priority: 4 },
  { slug: "graefenhainichen", name: "Gräfenhainichen", type: "gemeinde", parentSlug: "sachsen-anhalt", population: 11000, plz: ["06773"], priority: 4 },
  { slug: "havelberg", name: "Havelberg", type: "gemeinde", parentSlug: "sachsen-anhalt", population: 7000, plz: ["39539"], priority: 3 },
  { slug: "hecklingen", name: "Hecklingen", type: "gemeinde", parentSlug: "sachsen-anhalt", population: 7000, plz: ["39444"], priority: 3 },
  { slug: "hettstedt", name: "Hettstedt", type: "gemeinde", parentSlug: "sachsen-anhalt", population: 14000, plz: ["06333"], priority: 4 },
  { slug: "jessen", name: "Jessen (Elster)", type: "gemeinde", parentSlug: "sachsen-anhalt", population: 14000, plz: ["06917"], priority: 4 },
  { slug: "koethen", name: "Köthen (Anhalt)", type: "gemeinde", parentSlug: "sachsen-anhalt", population: 26000, plz: ["06366"], priority: 4 },
  { slug: "landsberg-sa", name: "Landsberg", type: "gemeinde", parentSlug: "sachsen-anhalt", population: 15000, plz: ["06188"], priority: 4 },
  { slug: "leuna", name: "Leuna", type: "gemeinde", parentSlug: "sachsen-anhalt", population: 14000, plz: ["06237"], priority: 4 },
  { slug: "mansfeld", name: "Mansfeld", type: "gemeinde", parentSlug: "sachsen-anhalt", population: 9000, plz: ["06343"], priority: 3 },
  { slug: "moeckern", name: "Möckern", type: "gemeinde", parentSlug: "sachsen-anhalt", population: 13000, plz: ["39291"], priority: 4 },
  { slug: "nebra", name: "Nebra (Unstrut)", type: "gemeinde", parentSlug: "sachsen-anhalt", population: 4000, plz: ["06642"], priority: 3 },
  { slug: "nienburg-saale", name: "Nienburg (Saale)", type: "gemeinde", parentSlug: "sachsen-anhalt", population: 7000, plz: ["06429"], priority: 3 },
  { slug: "oberharz", name: "Oberharz am Brocken", type: "gemeinde", parentSlug: "sachsen-anhalt", population: 10000, plz: ["38875", "38899"], priority: 4 },
  { slug: "oebisfelde-weferlingen", name: "Oebisfelde-Weferlingen", type: "gemeinde", parentSlug: "sachsen-anhalt", population: 14000, plz: ["39646"], priority: 4 },
  { slug: "osterburg", name: "Osterburg (Altmark)", type: "gemeinde", parentSlug: "sachsen-anhalt", population: 10000, plz: ["39606"], priority: 4 },
  { slug: "osterwieck", name: "Osterwieck", type: "gemeinde", parentSlug: "sachsen-anhalt", population: 11000, plz: ["38835"], priority: 4 },
  { slug: "petersberg", name: "Petersberg", type: "gemeinde", parentSlug: "sachsen-anhalt", population: 8000, plz: ["06193"], priority: 3 },
  { slug: "querfurt", name: "Querfurt", type: "gemeinde", parentSlug: "sachsen-anhalt", population: 11000, plz: ["06268"], priority: 4 },
  { slug: "salzwedel", name: "Salzwedel", type: "gemeinde", parentSlug: "sachsen-anhalt", population: 24000, plz: ["29410"], priority: 4 },
  { slug: "sangerhausen", name: "Sangerhausen", type: "gemeinde", parentSlug: "sachsen-anhalt", population: 27000, plz: ["06526"], priority: 4 },
  { slug: "staßfurt", name: "Staßfurt", type: "gemeinde", parentSlug: "sachsen-anhalt", population: 25000, plz: ["39418"], priority: 4 },
  { slug: "tangermuende", name: "Tangermünde", type: "gemeinde", parentSlug: "sachsen-anhalt", population: 10000, plz: ["39590"], priority: 4 },
  { slug: "thale", name: "Thale", type: "gemeinde", parentSlug: "sachsen-anhalt", population: 17000, plz: ["06502"], priority: 4 },
  { slug: "teutschenthal", name: "Teutschenthal", type: "gemeinde", parentSlug: "sachsen-anhalt", population: 13000, plz: ["06179"], priority: 4 },
  { slug: "wegeleben", name: "Wegeleben", type: "gemeinde", parentSlug: "sachsen-anhalt", population: 3000, plz: ["38828"], priority: 3 },
  { slug: "wolfen", name: "Wolfen", type: "gemeinde", parentSlug: "sachsen-anhalt", population: 12000, plz: ["06766"], priority: 4 },
  { slug: "woerlitz", name: "Oranienbaum-Wörlitz", type: "gemeinde", parentSlug: "sachsen-anhalt", population: 9000, plz: ["06785"], priority: 3 },
  { slug: "zeitz", name: "Zeitz", type: "gemeinde", parentSlug: "sachsen-anhalt", population: 28000, plz: ["06712"], priority: 4 },
  { slug: "zerbst", name: "Zerbst/Anhalt", type: "gemeinde", parentSlug: "sachsen-anhalt", population: 22000, plz: ["39261"], priority: 4 },

  // =====================================================
  // WEITERE GEMEINDEN - THÜRINGEN (Ergänzung)
  // =====================================================
  { slug: "apolda", name: "Apolda", type: "gemeinde", parentSlug: "thueringen", population: 22000, plz: ["99510"], priority: 4 },
  { slug: "artern", name: "Artern/Unstrut", type: "gemeinde", parentSlug: "thueringen", population: 6000, plz: ["06556"], priority: 3 },
  { slug: "bad-berka", name: "Bad Berka", type: "gemeinde", parentSlug: "thueringen", population: 8000, plz: ["99438"], priority: 3 },
  { slug: "bad-blankenburg", name: "Bad Blankenburg", type: "gemeinde", parentSlug: "thueringen", population: 6000, plz: ["07422"], priority: 3 },
  { slug: "bad-frankenhausen", name: "Bad Frankenhausen/Kyffhäuser", type: "gemeinde", parentSlug: "thueringen", population: 9000, plz: ["06567"], priority: 3 },
  { slug: "bad-langensalza", name: "Bad Langensalza", type: "gemeinde", parentSlug: "thueringen", population: 18000, plz: ["99947"], priority: 4 },
  { slug: "bad-lobenstein", name: "Bad Lobenstein", type: "gemeinde", parentSlug: "thueringen", population: 6000, plz: ["07356"], priority: 3 },
  { slug: "bad-salzungen", name: "Bad Salzungen", type: "gemeinde", parentSlug: "thueringen", population: 15000, plz: ["36433"], priority: 4 },
  { slug: "bad-tabarz", name: "Bad Tabarz", type: "gemeinde", parentSlug: "thueringen", population: 4000, plz: ["99891"], priority: 3 },
  { slug: "dingelstaedt", name: "Dingelstädt", type: "gemeinde", parentSlug: "thueringen", population: 5000, plz: ["37351"], priority: 3 },
  { slug: "greiz", name: "Greiz", type: "gemeinde", parentSlug: "thueringen", population: 20000, plz: ["07973"], priority: 4 },
  { slug: "greussen", name: "Greußen", type: "gemeinde", parentSlug: "thueringen", population: 4000, plz: ["99718"], priority: 3 },
  { slug: "heilbad-heiligenstadt", name: "Heilbad Heiligenstadt", type: "gemeinde", parentSlug: "thueringen", population: 16000, plz: ["37308"], priority: 4 },
  { slug: "hildburghausen", name: "Hildburghausen", type: "gemeinde", parentSlug: "thueringen", population: 12000, plz: ["98646"], priority: 4 },
  { slug: "kahla", name: "Kahla", type: "gemeinde", parentSlug: "thueringen", population: 7000, plz: ["07768"], priority: 3 },
  { slug: "koelleda", name: "Kölleda", type: "gemeinde", parentSlug: "thueringen", population: 6000, plz: ["99625"], priority: 3 },
  { slug: "leinefelde-worbis", name: "Leinefelde-Worbis", type: "gemeinde", parentSlug: "thueringen", population: 19000, plz: ["37327"], priority: 4 },
  { slug: "meiningen", name: "Meiningen", type: "gemeinde", parentSlug: "thueringen", population: 26000, plz: ["98617"], priority: 4 },
  { slug: "neuhaus-rennweg", name: "Neuhaus am Rennweg", type: "gemeinde", parentSlug: "thueringen", population: 8000, plz: ["98724"], priority: 3 },
  { slug: "neustadt-orla", name: "Neustadt an der Orla", type: "gemeinde", parentSlug: "thueringen", population: 8000, plz: ["07806"], priority: 3 },
  { slug: "oberhof", name: "Oberhof", type: "gemeinde", parentSlug: "thueringen", population: 2000, plz: ["98559"], priority: 3 },
  { slug: "poessneck", name: "Pößneck", type: "gemeinde", parentSlug: "thueringen", population: 12000, plz: ["07381"], priority: 4 },
  { slug: "ruhla", name: "Ruhla", type: "gemeinde", parentSlug: "thueringen", population: 6000, plz: ["99842"], priority: 3 },
  { slug: "saalfeld", name: "Saalfeld/Saale", type: "gemeinde", parentSlug: "thueringen", population: 24000, plz: ["07318"], priority: 4 },
  { slug: "schleiz", name: "Schleiz", type: "gemeinde", parentSlug: "thueringen", population: 8000, plz: ["07907"], priority: 3 },
  { slug: "schmalkalden", name: "Schmalkalden", type: "gemeinde", parentSlug: "thueringen", population: 20000, plz: ["98574"], priority: 4 },
  { slug: "schmölln", name: "Schmölln", type: "gemeinde", parentSlug: "thueringen", population: 12000, plz: ["04626"], priority: 4 },
  { slug: "schwarzatal", name: "Schwarzatal", type: "gemeinde", parentSlug: "thueringen", population: 7000, plz: ["07427"], priority: 3 },
  { slug: "soemmerd", name: "Sömmerda", type: "gemeinde", parentSlug: "thueringen", population: 19000, plz: ["99610"], priority: 4 },
  { slug: "sonneberg", name: "Sonneberg", type: "gemeinde", parentSlug: "thueringen", population: 23000, plz: ["96515"], priority: 4 },
  { slug: "stadtroda", name: "Stadtroda", type: "gemeinde", parentSlug: "thueringen", population: 6000, plz: ["07646"], priority: 3 },
  { slug: "treffurt", name: "Treffurt", type: "gemeinde", parentSlug: "thueringen", population: 5000, plz: ["99830"], priority: 3 },
  { slug: "waltershausen", name: "Waltershausen", type: "gemeinde", parentSlug: "thueringen", population: 13000, plz: ["99880"], priority: 4 },
  { slug: "zella-mehlis", name: "Zella-Mehlis", type: "gemeinde", parentSlug: "thueringen", population: 12000, plz: ["98544"], priority: 4 },
  { slug: "zeulenroda-triebes", name: "Zeulenroda-Triebes", type: "gemeinde", parentSlug: "thueringen", population: 16000, plz: ["07937"], priority: 4 },


  // =====================================================
  // WEITERE GEMEINDEN - MECKLENBURG-VORPOMMERN (Ergänzung)
  // =====================================================
  { slug: "anklam", name: "Anklam", type: "gemeinde", parentSlug: "mecklenburg-vorpommern", population: 12000, plz: ["17389"], priority: 4 },
  { slug: "bad-doberan", name: "Bad Doberan", type: "gemeinde", parentSlug: "mecklenburg-vorpommern", population: 12000, plz: ["18209"], priority: 4 },
  { slug: "barth", name: "Barth", type: "gemeinde", parentSlug: "mecklenburg-vorpommern", population: 9000, plz: ["18356"], priority: 3 },
  { slug: "bergen-ruegen", name: "Bergen auf Rügen", type: "gemeinde", parentSlug: "mecklenburg-vorpommern", population: 13000, plz: ["18528"], priority: 4 },
  { slug: "binz", name: "Binz", type: "gemeinde", parentSlug: "mecklenburg-vorpommern", population: 5000, plz: ["18609"], priority: 3 },
  { slug: "boizenburg", name: "Boizenburg/Elbe", type: "gemeinde", parentSlug: "mecklenburg-vorpommern", population: 11000, plz: ["19258"], priority: 4 },
  { slug: "boltenhagen", name: "Boltenhagen", type: "gemeinde", parentSlug: "mecklenburg-vorpommern", population: 3000, plz: ["23946"], priority: 3 },
  { slug: "buetzow", name: "Bützow", type: "gemeinde", parentSlug: "mecklenburg-vorpommern", population: 8000, plz: ["18246"], priority: 3 },
  { slug: "dargun", name: "Dargun", type: "gemeinde", parentSlug: "mecklenburg-vorpommern", population: 4000, plz: ["17159"], priority: 3 },
  { slug: "demmin", name: "Demmin", type: "gemeinde", parentSlug: "mecklenburg-vorpommern", population: 11000, plz: ["17109"], priority: 4 },
  { slug: "friedland-mv", name: "Friedland", type: "gemeinde", parentSlug: "mecklenburg-vorpommern", population: 6000, plz: ["17098"], priority: 3 },
  { slug: "gadebusch", name: "Gadebusch", type: "gemeinde", parentSlug: "mecklenburg-vorpommern", population: 6000, plz: ["19205"], priority: 3 },
  { slug: "gnoien", name: "Gnoien", type: "gemeinde", parentSlug: "mecklenburg-vorpommern", population: 3000, plz: ["17179"], priority: 3 },
  { slug: "goldberg", name: "Goldberg", type: "gemeinde", parentSlug: "mecklenburg-vorpommern", population: 5000, plz: ["19399"], priority: 3 },
  { slug: "grabow", name: "Grabow", type: "gemeinde", parentSlug: "mecklenburg-vorpommern", population: 6000, plz: ["19300"], priority: 3 },
  { slug: "grimmen", name: "Grimmen", type: "gemeinde", parentSlug: "mecklenburg-vorpommern", population: 10000, plz: ["18507"], priority: 4 },
  { slug: "guestrow", name: "Güstrow", type: "gemeinde", parentSlug: "mecklenburg-vorpommern", population: 29000, plz: ["18273"], priority: 4 },
  { slug: "hagenow", name: "Hagenow", type: "gemeinde", parentSlug: "mecklenburg-vorpommern", population: 12000, plz: ["19230"], priority: 4 },
  { slug: "heringsdorf", name: "Heringsdorf", type: "gemeinde", parentSlug: "mecklenburg-vorpommern", population: 9000, plz: ["17419", "17424", "17429"], priority: 3 },
  { slug: "krakow-see", name: "Krakow am See", type: "gemeinde", parentSlug: "mecklenburg-vorpommern", population: 4000, plz: ["18292"], priority: 3 },
  { slug: "kuehlungsborn", name: "Kühlungsborn", type: "gemeinde", parentSlug: "mecklenburg-vorpommern", population: 8000, plz: ["18225"], priority: 3 },
  { slug: "laage", name: "Laage", type: "gemeinde", parentSlug: "mecklenburg-vorpommern", population: 7000, plz: ["18299"], priority: 3 },
  { slug: "ludwigslust", name: "Ludwigslust", type: "gemeinde", parentSlug: "mecklenburg-vorpommern", population: 12000, plz: ["19288"], priority: 4 },
  { slug: "luebz", name: "Lübz", type: "gemeinde", parentSlug: "mecklenburg-vorpommern", population: 6000, plz: ["19386"], priority: 3 },
  { slug: "malchin", name: "Malchin", type: "gemeinde", parentSlug: "mecklenburg-vorpommern", population: 8000, plz: ["17139"], priority: 3 },
  { slug: "malchow", name: "Malchow", type: "gemeinde", parentSlug: "mecklenburg-vorpommern", population: 7000, plz: ["17213"], priority: 3 },
  { slug: "marlow", name: "Marlow", type: "gemeinde", parentSlug: "mecklenburg-vorpommern", population: 5000, plz: ["18337"], priority: 3 },
  { slug: "neubukow", name: "Neubukow", type: "gemeinde", parentSlug: "mecklenburg-vorpommern", population: 4000, plz: ["18233"], priority: 3 },
  { slug: "neukloster", name: "Neukloster", type: "gemeinde", parentSlug: "mecklenburg-vorpommern", population: 4000, plz: ["23992"], priority: 3 },
  { slug: "neustrelitz", name: "Neustrelitz", type: "gemeinde", parentSlug: "mecklenburg-vorpommern", population: 20000, plz: ["17235"], priority: 4 },
  { slug: "parchim", name: "Parchim", type: "gemeinde", parentSlug: "mecklenburg-vorpommern", population: 18000, plz: ["19370"], priority: 4 },
  { slug: "pasewalk", name: "Pasewalk", type: "gemeinde", parentSlug: "mecklenburg-vorpommern", population: 10000, plz: ["17309"], priority: 4 },
  { slug: "plau-see", name: "Plau am See", type: "gemeinde", parentSlug: "mecklenburg-vorpommern", population: 6000, plz: ["19395"], priority: 3 },
  { slug: "prerow", name: "Prerow", type: "gemeinde", parentSlug: "mecklenburg-vorpommern", population: 2000, plz: ["18375"], priority: 3 },
  { slug: "rerik", name: "Rerik", type: "gemeinde", parentSlug: "mecklenburg-vorpommern", population: 2000, plz: ["18230"], priority: 3 },
  { slug: "ribnitz-damgarten", name: "Ribnitz-Damgarten", type: "gemeinde", parentSlug: "mecklenburg-vorpommern", population: 15000, plz: ["18311"], priority: 4 },
  { slug: "roebel", name: "Röbel/Müritz", type: "gemeinde", parentSlug: "mecklenburg-vorpommern", population: 5000, plz: ["17207"], priority: 3 },
  { slug: "sassnitz", name: "Sassnitz", type: "gemeinde", parentSlug: "mecklenburg-vorpommern", population: 9000, plz: ["18546"], priority: 3 },
  { slug: "schwaan", name: "Schwaan", type: "gemeinde", parentSlug: "mecklenburg-vorpommern", population: 5000, plz: ["18258"], priority: 3 },
  { slug: "stavenhagen", name: "Stavenhagen", type: "gemeinde", parentSlug: "mecklenburg-vorpommern", population: 6000, plz: ["17153"], priority: 3 },
  { slug: "sternberg", name: "Sternberg", type: "gemeinde", parentSlug: "mecklenburg-vorpommern", population: 4000, plz: ["19406"], priority: 3 },
  { slug: "teterow", name: "Teterow", type: "gemeinde", parentSlug: "mecklenburg-vorpommern", population: 9000, plz: ["17166"], priority: 3 },
  { slug: "torgelow", name: "Torgelow", type: "gemeinde", parentSlug: "mecklenburg-vorpommern", population: 9000, plz: ["17358"], priority: 3 },
  { slug: "ueckermuende", name: "Ueckermünde", type: "gemeinde", parentSlug: "mecklenburg-vorpommern", population: 8000, plz: ["17373"], priority: 3 },
  { slug: "waren-mueritz", name: "Waren (Müritz)", type: "gemeinde", parentSlug: "mecklenburg-vorpommern", population: 21000, plz: ["17192"], priority: 4 },
  { slug: "warin", name: "Warin", type: "gemeinde", parentSlug: "mecklenburg-vorpommern", population: 3000, plz: ["19417"], priority: 3 },
  { slug: "wolgast", name: "Wolgast", type: "gemeinde", parentSlug: "mecklenburg-vorpommern", population: 12000, plz: ["17438"], priority: 4 },
  { slug: "zarrentin", name: "Zarrentin am Schaalsee", type: "gemeinde", parentSlug: "mecklenburg-vorpommern", population: 5000, plz: ["19246"], priority: 3 },
  { slug: "zingst", name: "Zingst", type: "gemeinde", parentSlug: "mecklenburg-vorpommern", population: 3000, plz: ["18374"], priority: 3 },

  // =====================================================
  // WEITERE GEMEINDEN - SAARLAND (Ergänzung)
  // =====================================================
  { slug: "beckingen", name: "Beckingen", type: "gemeinde", parentSlug: "saarland", population: 15000, plz: ["66701"], priority: 4 },
  { slug: "bexbach", name: "Bexbach", type: "gemeinde", parentSlug: "saarland", population: 18000, plz: ["66450"], priority: 4 },
  { slug: "blieskastel", name: "Blieskastel", type: "gemeinde", parentSlug: "saarland", population: 21000, plz: ["66440"], priority: 4 },
  { slug: "dillingen-saar", name: "Dillingen/Saar", type: "gemeinde", parentSlug: "saarland", population: 20000, plz: ["66763"], priority: 4 },
  { slug: "eppelborn", name: "Eppelborn", type: "gemeinde", parentSlug: "saarland", population: 17000, plz: ["66571"], priority: 4 },
  { slug: "friedrichsthal", name: "Friedrichsthal", type: "gemeinde", parentSlug: "saarland", population: 10000, plz: ["66299"], priority: 4 },
  { slug: "grossrosseln", name: "Großrosseln", type: "gemeinde", parentSlug: "saarland", population: 8000, plz: ["66352"], priority: 3 },
  { slug: "heusweiler", name: "Heusweiler", type: "gemeinde", parentSlug: "saarland", population: 19000, plz: ["66265"], priority: 4 },
  { slug: "illingen-saar", name: "Illingen", type: "gemeinde", parentSlug: "saarland", population: 17000, plz: ["66557"], priority: 4 },
  { slug: "kirkel", name: "Kirkel", type: "gemeinde", parentSlug: "saarland", population: 10000, plz: ["66459"], priority: 4 },
  { slug: "kleinblittersdorf", name: "Kleinblittersdorf", type: "gemeinde", parentSlug: "saarland", population: 12000, plz: ["66271"], priority: 4 },
  { slug: "lebach", name: "Lebach", type: "gemeinde", parentSlug: "saarland", population: 19000, plz: ["66822"], priority: 4 },
  { slug: "losheim", name: "Losheim am See", type: "gemeinde", parentSlug: "saarland", population: 16000, plz: ["66679"], priority: 4 },
  { slug: "marpingen", name: "Marpingen", type: "gemeinde", parentSlug: "saarland", population: 11000, plz: ["66646"], priority: 4 },
  { slug: "mettlach", name: "Mettlach", type: "gemeinde", parentSlug: "saarland", population: 12000, plz: ["66693"], priority: 4 },
  { slug: "nohfelden", name: "Nohfelden", type: "gemeinde", parentSlug: "saarland", population: 10000, plz: ["66625"], priority: 4 },
  { slug: "ottweiler", name: "Ottweiler", type: "gemeinde", parentSlug: "saarland", population: 15000, plz: ["66564"], priority: 4 },
  { slug: "perl", name: "Perl", type: "gemeinde", parentSlug: "saarland", population: 9000, plz: ["66706"], priority: 3 },
  { slug: "puettlingen", name: "Püttlingen", type: "gemeinde", parentSlug: "saarland", population: 19000, plz: ["66346"], priority: 4 },
  { slug: "quierschied", name: "Quierschied", type: "gemeinde", parentSlug: "saarland", population: 13000, plz: ["66287"], priority: 4 },
  { slug: "riegelsberg", name: "Riegelsberg", type: "gemeinde", parentSlug: "saarland", population: 15000, plz: ["66292"], priority: 4 },
  { slug: "saarwellingen", name: "Saarwellingen", type: "gemeinde", parentSlug: "saarland", population: 13000, plz: ["66793"], priority: 4 },
  { slug: "schiffweiler", name: "Schiffweiler", type: "gemeinde", parentSlug: "saarland", population: 16000, plz: ["66578"], priority: 4 },
  { slug: "schmelz", name: "Schmelz", type: "gemeinde", parentSlug: "saarland", population: 16000, plz: ["66839"], priority: 4 },
  { slug: "schwalbach-saar", name: "Schwalbach", type: "gemeinde", parentSlug: "saarland", population: 18000, plz: ["66773"], priority: 4 },
  { slug: "spiesen-elversberg", name: "Spiesen-Elversberg", type: "gemeinde", parentSlug: "saarland", population: 13000, plz: ["66583"], priority: 4 },
  { slug: "sulzbach-saar", name: "Sulzbach/Saar", type: "gemeinde", parentSlug: "saarland", population: 16000, plz: ["66280"], priority: 4 },
  { slug: "tholey", name: "Tholey", type: "gemeinde", parentSlug: "saarland", population: 13000, plz: ["66636"], priority: 4 },
  { slug: "ueberherrn", name: "Überherrn", type: "gemeinde", parentSlug: "saarland", population: 12000, plz: ["66802"], priority: 4 },
  { slug: "wadgassen", name: "Wadgassen", type: "gemeinde", parentSlug: "saarland", population: 18000, plz: ["66787"], priority: 4 },
  { slug: "wadern", name: "Wadern", type: "gemeinde", parentSlug: "saarland", population: 16000, plz: ["66687"], priority: 4 },
  { slug: "wallerfangen", name: "Wallerfangen", type: "gemeinde", parentSlug: "saarland", population: 10000, plz: ["66798"], priority: 4 },
  { slug: "weiskirchen", name: "Weiskirchen", type: "gemeinde", parentSlug: "saarland", population: 7000, plz: ["66709"], priority: 3 },

];

// =====================================================
// HELPER FUNKTIONEN
// =====================================================

/**
 * Findet einen Standort anhand des Slugs
 */
export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find(loc => loc.slug === slug);
}

/**
 * Gibt alle Standorte eines bestimmten Typs zurück
 */
export function getLocationsByType(type: LocationType): Location[] {
  return locations.filter(loc => loc.type === type);
}

/**
 * Gibt alle direkten Kinder eines Standorts zurück
 */
export function getChildLocations(parentSlug: string): Location[] {
  return locations.filter(loc => loc.parentSlug === parentSlug);
}

/**
 * Gibt die komplette Hierarchie (Breadcrumb) für einen Standort zurück
 */
export function getLocationHierarchy(slug: string): Location[] {
  const hierarchy: Location[] = [];
  let current = getLocationBySlug(slug);
  
  while (current) {
    hierarchy.unshift(current);
    current = current.parentSlug ? getLocationBySlug(current.parentSlug) : undefined;
  }
  
  return hierarchy;
}

/**
 * Gibt alle Nachbar-Standorte zurück (gleiche Ebene, gleicher Parent)
 */
export function getSiblingLocations(slug: string, limit: number = 5): Location[] {
  const location = getLocationBySlug(slug);
  if (!location || !location.parentSlug) return [];
  
  return locations
    .filter(loc => 
      loc.parentSlug === location.parentSlug && 
      loc.slug !== slug &&
      loc.type === location.type
    )
    .sort((a, b) => (b.priority || 5) - (a.priority || 5))
    .slice(0, limit);
}

/**
 * Gibt alle Standorte eines Typs sortiert nach Priorität zurück
 */
export function getLocationsByPriority(type?: LocationType, limit?: number): Location[] {
  let filtered = type ? getLocationsByType(type) : locations;
  filtered = filtered.sort((a, b) => (b.priority || 5) - (a.priority || 5));
  return limit ? filtered.slice(0, limit) : filtered;
}

/**
 * Generiert alle Slugs für die statische Generierung
 */
export function getAllLocationSlugs(): string[] {
  return locations.map(loc => loc.slug);
}

/**
 * Prüft ob ein Standort existiert
 */
export function locationExists(slug: string): boolean {
  return locations.some(loc => loc.slug === slug);
}

/**
 * Gibt die Anzahl der Standorte pro Typ zurück
 */
export function getLocationStats(): Record<LocationType, number> {
  const stats: Record<LocationType, number> = {
    'bundesland': 0,
    'regierungsbezirk': 0,
    'landkreis': 0,
    'kreisfreie-stadt': 0,
    'gemeinde': 0,
    'stadtbezirk': 0,
    'stadtteil': 0
  };
  
  locations.forEach(loc => {
    stats[loc.type]++;
  });
  
  return stats;
}

/**
 * Konvertiert den Standort-Typ zu einem lesbaren deutschen Text
 */
export function getLocationTypeLabel(type: LocationType): string {
  const labels: Record<LocationType, string> = {
    'bundesland': 'Bundesland',
    'regierungsbezirk': 'Regierungsbezirk',
    'landkreis': 'Landkreis',
    'kreisfreie-stadt': 'Stadt',
    'gemeinde': 'Gemeinde',
    'stadtbezirk': 'Stadtbezirk',
    'stadtteil': 'Stadtteil'
  };
  return labels[type];
}
