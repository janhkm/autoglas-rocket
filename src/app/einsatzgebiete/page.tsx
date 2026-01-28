import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FAQ from '@/components/FAQ';
import LocationSearch from '@/components/LocationSearch';
import { 
  locations, 
  getLocationsByType,
  getChildLocations,
  Location,
  LocationType
} from '@/data/locations';
import { 
  generateBreadcrumbSchema, 
  generateFAQSchema, 
  schemaToJsonLd 
} from '@/lib/schema';

const siteUrl = process.env.SITE_URL || 'https://autoglas-rocket.de';

export const metadata: Metadata = {
  title: 'Einsatzgebiete – Scheibenwechsel deutschlandweit | Autoglas-Rocket',
  description: 'Scheibenwechsel deutschlandweit ✓ Mobiler Service in allen 16 Bundesländern ✓ Alle Städte & Regionen ✓ Front- & Heckscheibe ✓ Teilkasko* ✓ Jetzt Einsatzgebiet finden!',
  alternates: { canonical: '/einsatzgebiete' },
  openGraph: {
    title: 'Scheibenwechsel deutschlandweit – Alle Einsatzgebiete | Autoglas-Rocket',
    description: 'Mobiler Autoglas-Service in ganz Deutschland. Finden Sie Ihr Einsatzgebiet für professionellen Scheibenwechsel.',
    type: 'website',
    locale: 'de_DE',
    url: `${siteUrl}/einsatzgebiete`,
    images: [
      {
        url: `${siteUrl}/autoglas-rocket-logo.png`,
        width: 1200,
        height: 630,
        alt: 'Autoglas-Rocket Einsatzgebiete - Scheibenwechsel deutschlandweit',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scheibenwechsel deutschlandweit – Alle Einsatzgebiete | Autoglas-Rocket',
    description: 'Mobiler Autoglas-Service in ganz Deutschland. Finden Sie Ihr Einsatzgebiet für professionellen Scheibenwechsel.',
    images: [`${siteUrl}/autoglas-rocket-logo.png`],
  },
};

// FAQ-Daten für die Einsatzgebiete-Seite
const einsatzgebieteFaqs = [
  {
    question: 'In welchen Städten bietet Autoglas-Rocket Scheibenwechsel an?',
    answer: 'Unser mobiler Scheibenwechsel-Service ist deutschlandweit verfügbar. Wir sind in allen 16 Bundesländern aktiv und decken alle großen Städte wie Berlin, Hamburg, München, Köln, Frankfurt, Stuttgart, Düsseldorf, Leipzig, Dresden und viele weitere ab. Auch in ländlichen Regionen kommen wir direkt zu Ihnen.',
  },
  {
    question: 'Wie funktioniert der mobile Service vor Ort?',
    answer: 'Unser Techniker kommt mit allen notwendigen Materialien und Werkzeugen direkt zu Ihrem Wunschort – ob zu Hause, am Arbeitsplatz oder an einem anderen Ort Ihrer Wahl. Der Scheibenwechsel dauert in der Regel 1-2 Stunden, und Ihr Fahrzeug ist danach sofort wieder fahrbereit.',
  },
  {
    question: 'Gibt es Unterschiede bei den Preisen je nach Region?',
    answer: 'Nein, unsere Preise sind deutschlandweit einheitlich und transparent. Es gibt keine versteckten Anfahrtskosten oder regionale Aufschläge. Bei Teilkaskoversicherung übernimmt Ihre Versicherung in der Regel die Kosten abzüglich Ihrer vereinbarten Selbstbeteiligung.',
  },
  {
    question: 'Wie schnell kann ein Termin vereinbart werden?',
    answer: 'In den meisten Regionen können wir innerhalb von 24-48 Stunden einen Termin anbieten. In Ballungsgebieten wie Berlin, München oder dem Ruhrgebiet oft sogar noch am selben oder nächsten Tag. Bei dringenden Fällen versuchen wir, Ihnen schnellstmöglich zu helfen.',
  },
  {
    question: 'Werden Originalscheiben verwendet?',
    answer: 'Ja, wir verwenden ausschließlich hochwertige Scheiben, die den Originalspezifikationen entsprechen. Alle Scheiben erfüllen die ECE-Prüfnormen und sind für Ihr spezifisches Fahrzeugmodell zugelassen. Auf Wunsch können wir auch Originalscheiben des Fahrzeugherstellers einbauen.',
  },
  {
    question: 'Was passiert bei schlechtem Wetter?',
    answer: 'Ein Scheibenwechsel kann bei den meisten Wetterbedingungen durchgeführt werden. Bei extremen Temperaturen unter -5°C oder über 35°C sowie bei starkem Regen empfehlen wir jedoch einen überdachten Stellplatz (Garage, Carport, Tiefgarage). Unser Techniker berät Sie bei der Terminvereinbarung entsprechend.',
  },
  {
    question: 'Wie läuft die Abrechnung mit der Versicherung?',
    answer: 'Wir übernehmen die komplette Schadensabwicklung mit Ihrer Versicherung. Sie müssen sich um nichts kümmern – wir kommunizieren direkt mit Ihrem Versicherer und rechnen den Schaden für Sie ab. Sie zahlen nur Ihre vertraglich vereinbarte Selbstbeteiligung.',
  },
  {
    question: 'Gibt es eine Garantie auf den Scheibenwechsel?',
    answer: 'Ja, auf jeden Scheibenwechsel geben wir eine Garantie auf Material und Einbau. Die Scheiben sind zudem durch eine lebenslange Dichtigkeitsgarantie abgesichert. Bei Problemen kommen wir selbstverständlich kostenlos zu Ihnen zurück.',
  },
];

// Bundesländer nach Population sortiert
const bundeslaender = getLocationsByType('bundesland')
  .sort((a, b) => (b.population || 0) - (a.population || 0));

// Kreisfreie Städte (Top-Städte) nach Population sortiert
const topStaedte = getLocationsByType('kreisfreie-stadt')
  .filter(city => (city.population || 0) >= 250000)
  .sort((a, b) => (b.population || 0) - (a.population || 0));

// Alle Kinder eines Standorts rekursiv sammeln
function getAllDescendants(parentSlug: string): Location[] {
  const children = getChildLocations(parentSlug);
  let all: Location[] = [...children];
  for (const child of children) {
    all = [...all, ...getAllDescendants(child.slug)];
  }
  return all;
}

// Typ-Label für die Anzeige
function getTypeLabel(type: LocationType): string {
  const labels: Record<LocationType, string> = {
    'bundesland': 'Bundesland',
    'regierungsbezirk': 'Regierungsbezirk',
    'landkreis': 'Landkreis',
    'kreisfreie-stadt': 'Stadt',
    'gemeinde': 'Gemeinde',
    'stadtbezirk': 'Bezirk',
    'stadtteil': 'Stadtteil'
  };
  return labels[type];
}

// Statistiken berechnen
const totalLocations = locations.length;
const totalBundeslaender = getLocationsByType('bundesland').length;
const totalStaedte = getLocationsByType('kreisfreie-stadt').length;
const totalBezirke = getLocationsByType('stadtbezirk').length;
const totalStadtteile = getLocationsByType('stadtteil').length;

// Breadcrumb für diese Seite
const breadcrumbItems = [
  { name: 'Start', url: '/' },
  { name: 'Einsatzgebiete' }
];

// Schema-Generierung
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);
const faqSchema = generateFAQSchema(einsatzgebieteFaqs);

export default function EinsatzgebietePage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToJsonLd(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToJsonLd(faqSchema) }}
      />

      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            }} />
          </div>
          
          <div className="container mx-auto px-4 py-20 md:py-28 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full text-orange-300 text-sm font-medium mb-6">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {totalLocations}+ Einsatzgebiete deutschlandweit
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Scheibenwechsel{' '}
                <span className="bg-gradient-to-r from-orange-400 to-red-400 text-transparent bg-clip-text">
                  deutschlandweit
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
                Mobiler Autoglas-Service in allen Bundesländern, Städten, Bezirken und Stadtteilen. 
                Wir kommen direkt zu Ihnen – überall in Deutschland.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                <div className="flex items-center gap-2 text-slate-300">
                  <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{totalBundeslaender} Bundesländer</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{totalStaedte} Städte</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{totalBezirke} Bezirke</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{totalStadtteile} Stadtteile</span>
                </div>
              </div>

              {/* Suchfeld */}
              <div className="mb-10">
                <LocationSearch 
                  locations={locations}
                  placeholder="Stadt, Bezirk oder PLZ eingeben..."
                />
                <p className="text-sm text-slate-400 mt-3">
                  Geben Sie Ihren Standort ein und gelangen Sie direkt zur passenden Seite
                </p>
              </div>
              
              <a
                href="#bundeslaender"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-all"
              >
                Oder alle Einsatzgebiete durchstöbern
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Intro Text Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Ihr Partner für professionellen Scheibenwechsel in ganz Deutschland
              </h2>
              
              <div className="prose prose-lg prose-slate max-w-none">
                <p className="text-xl text-slate-600 leading-relaxed mb-6">
                  Autoglas-Rocket ist Ihr zuverlässiger Ansprechpartner für den <strong>mobilen Scheibenwechsel deutschlandweit</strong>. 
                  Egal ob Sie in einer Großstadt wie Berlin, München oder Hamburg leben, in einem Vorort, einem Stadtbezirk oder 
                  in einer ländlichen Region – unser Service kommt direkt zu Ihnen.
                </p>
                
                <p className="text-slate-600 mb-6">
                  Mit unserem <strong>flächendeckenden Netzwerk</strong> sind wir in allen 16 Bundesländern für Sie da. 
                  Von der Küste in Schleswig-Holstein bis zu den Alpen in Bayern, von der Metropolregion Rhein-Ruhr 
                  bis nach Sachsen – überall in Deutschland profitieren Sie von unserem schnellen und unkomplizierten Service.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 p-6 bg-slate-50 rounded-2xl">
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-500 mb-2">{totalBundeslaender}</div>
                  <div className="text-sm text-slate-600">Bundesländer</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-500 mb-2">{totalStaedte}</div>
                  <div className="text-sm text-slate-600">Städte</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-500 mb-2">{totalBezirke + totalStadtteile}</div>
                  <div className="text-sm text-slate-600">Bezirke & Stadtteile</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-500 mb-2">100%</div>
                  <div className="text-sm text-slate-600">Mobil</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Top Städte Section */}
        <section className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Scheibenwechsel in Deutschlands größten Städten
                </h2>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                  In diesen Metropolen sind wir besonders schnell vor Ort – oft noch am selben oder nächsten Tag.
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {topStaedte.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/autoglas-${city.slug}`}
                    className="bg-white p-5 rounded-xl shadow-sm hover:shadow-lg border border-slate-200 hover:border-orange-300 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                        <svg className="w-6 h-6 text-orange-500 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-800 group-hover:text-orange-600 transition-colors block">
                          {city.name}
                        </span>
                        {city.population && (
                          <span className="text-xs text-slate-500">
                            {(city.population / 1000).toFixed(0)}k Einwohner
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Alle Bundesländer mit vollständiger Hierarchie */}
        <section id="bundeslaender" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Alle Einsatzgebiete nach Bundesland
                </h2>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                  Wählen Sie Ihr Bundesland und finden Sie alle verfügbaren Regionen, Städte, Bezirke und Stadtteile.
                </p>
              </div>

              <div className="space-y-8">
                {bundeslaender.map((bundesland) => {
                  // Alle direkten Kinder des Bundeslandes
                  const directChildren = getChildLocations(bundesland.slug);
                  
                  // Regierungsbezirke
                  const regierungsbezirke = directChildren.filter(c => c.type === 'regierungsbezirk');
                  
                  // Kreisfreie Städte (direkte Kinder)
                  const direkteStaedte = directChildren.filter(c => c.type === 'kreisfreie-stadt');
                  
                  // Für Regierungsbezirke: deren Städte sammeln
                  const staedteInBezirken: Location[] = [];
                  regierungsbezirke.forEach(rb => {
                    const rbChildren = getChildLocations(rb.slug);
                    staedteInBezirken.push(...rbChildren.filter(c => c.type === 'kreisfreie-stadt'));
                  });
                  
                  // Alle Städte kombinieren
                  const alleStaedte = [...direkteStaedte, ...staedteInBezirken]
                    .sort((a, b) => (b.population || 0) - (a.population || 0));
                  
                  // Stadtbezirke und Stadtteile für jede Stadt
                  const stadtMitBezirke: { stadt: Location; bezirke: Location[]; stadtteile: Location[] }[] = [];
                  
                  alleStaedte.forEach(stadt => {
                    const stadtKinder = getChildLocations(stadt.slug);
                    const bezirke = stadtKinder.filter(k => k.type === 'stadtbezirk');
                    const direkteStadtteile = stadtKinder.filter(k => k.type === 'stadtteil');
                    
                    // Stadtteile in Bezirken
                    const stadtteileInBezirken: Location[] = [];
                    bezirke.forEach(b => {
                      const bKinder = getChildLocations(b.slug);
                      stadtteileInBezirken.push(...bKinder.filter(k => k.type === 'stadtteil'));
                    });
                    
                    const alleStadtteile = [...direkteStadtteile, ...stadtteileInBezirken];
                    
                    if (bezirke.length > 0 || alleStadtteile.length > 0) {
                      stadtMitBezirke.push({
                        stadt,
                        bezirke,
                        stadtteile: alleStadtteile
                      });
                    }
                  });
                  
                  // Stadtbezirke/Stadtteile direkt unter dem Bundesland (z.B. Berlin, Hamburg)
                  const direkteBezirke = directChildren.filter(c => c.type === 'stadtbezirk');
                  const direkteStadtteileUnterBL = directChildren.filter(c => c.type === 'stadtteil');
                  
                  // Stadtteile in direkten Bezirken
                  const stadtteileInDirektenBezirken: Location[] = [];
                  direkteBezirke.forEach(b => {
                    const bKinder = getChildLocations(b.slug);
                    stadtteileInDirektenBezirken.push(...bKinder.filter(k => k.type === 'stadtteil'));
                  });
                  
                  const alleDirektenStadtteile = [...direkteStadtteileUnterBL, ...stadtteileInDirektenBezirken];
                  
                  return (
                    <div 
                      key={bundesland.slug}
                      className="bg-slate-50 rounded-2xl p-6 md:p-8"
                    >
                      {/* Bundesland Header */}
                      <Link
                        href={`/autoglas-${bundesland.slug}`}
                        className="flex items-center gap-4 mb-6 group"
                      >
                        <div className="w-16 h-16 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/25">
                          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                            {bundesland.name}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-slate-500">
                            {bundesland.population && (
                              <span>{(bundesland.population / 1000000).toFixed(1)} Mio. Einwohner</span>
                            )}
                            <span>•</span>
                            <span>{alleStaedte.length + (direkteBezirke.length > 0 ? 0 : 0)} Städte</span>
                          </div>
                        </div>
                        <svg className="w-6 h-6 text-slate-400 group-hover:text-orange-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                      
                      {/* Regierungsbezirke (falls vorhanden) */}
                      {regierungsbezirke.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
                            Regierungsbezirke
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {regierungsbezirke.map(rb => (
                              <Link
                                key={rb.slug}
                                href={`/autoglas-${rb.slug}`}
                                className="px-4 py-2 bg-white text-sm text-slate-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors border border-slate-200 hover:border-orange-300"
                              >
                                {rb.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Städte */}
                      {alleStaedte.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
                            Städte
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {alleStaedte.map(stadt => (
                              <Link
                                key={stadt.slug}
                                href={`/autoglas-${stadt.slug}`}
                                className="px-4 py-2 bg-white text-sm font-medium text-slate-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors border border-slate-200 hover:border-orange-300"
                              >
                                {stadt.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Bezirke direkt unter Bundesland (Berlin, Hamburg) */}
                      {direkteBezirke.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
                            Bezirke
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {direkteBezirke.map(bezirk => (
                              <Link
                                key={bezirk.slug}
                                href={`/autoglas-${bezirk.slug}`}
                                className="px-3 py-1.5 bg-orange-100 text-sm text-orange-700 hover:bg-orange-200 rounded-lg transition-colors"
                              >
                                {bezirk.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Stadtteile direkt unter Bundesland oder in Bezirken */}
                      {alleDirektenStadtteile.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
                            Stadtteile
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {alleDirektenStadtteile.map(stadtteil => (
                              <Link
                                key={stadtteil.slug}
                                href={`/autoglas-${stadtteil.slug}`}
                                className="px-3 py-1.5 bg-slate-200 text-xs text-slate-600 hover:bg-slate-300 hover:text-slate-800 rounded transition-colors"
                              >
                                {stadtteil.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Bezirke und Stadtteile für jede Stadt */}
                      {stadtMitBezirke.length > 0 && (
                        <div className="space-y-4 pt-4 border-t border-slate-200">
                          <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                            Stadtbezirke & Stadtteile
                          </h4>
                          
                          {stadtMitBezirke.map(({ stadt, bezirke, stadtteile }) => (
                            <div key={stadt.slug} className="bg-white rounded-xl p-4 border border-slate-200">
                              <h5 className="font-semibold text-slate-800 mb-3">
                                {stadt.name}
                              </h5>
                              
                              {bezirke.length > 0 && (
                                <div className="mb-3">
                                  <span className="text-xs font-medium text-slate-500 uppercase">Bezirke: </span>
                                  <div className="flex flex-wrap gap-1.5 mt-1">
                                    {bezirke.map(b => (
                                      <Link
                                        key={b.slug}
                                        href={`/autoglas-${b.slug}`}
                                        className="px-2.5 py-1 bg-orange-100 text-xs text-orange-700 hover:bg-orange-200 rounded transition-colors"
                                      >
                                        {b.name}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              {stadtteile.length > 0 && (
                                <div>
                                  <span className="text-xs font-medium text-slate-500 uppercase">Stadtteile: </span>
                                  <div className="flex flex-wrap gap-1.5 mt-1">
                                    {stadtteile.map(st => (
                                      <Link
                                        key={st.slug}
                                        href={`/autoglas-${st.slug}`}
                                        className="px-2.5 py-1 bg-slate-100 text-xs text-slate-600 hover:bg-slate-200 rounded transition-colors"
                                      >
                                        {st.name}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Warum Autoglas-Rocket Section */}
        <section className="py-16 md:py-24 bg-slate-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Warum Autoglas-Rocket wählen?
                </h2>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                  Profitieren Sie von unserem deutschlandweiten Service mit höchsten Qualitätsstandards.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-slate-800 rounded-2xl p-6">
                  <div className="w-14 h-14 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-7 h-7 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Schneller Service</h3>
                  <p className="text-slate-400">
                    Terminrückruf innerhalb von 24 Stunden. In Ballungsgebieten oft noch am selben Tag verfügbar.
                  </p>
                </div>

                <div className="bg-slate-800 rounded-2xl p-6">
                  <div className="w-14 h-14 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-7 h-7 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Qualitätsgarantie</h3>
                  <p className="text-slate-400">
                    ECE-geprüfte Scheiben mit lebenslanger Dichtigkeitsgarantie. Fachgerechte Montage durch geschulte Techniker.
                  </p>
                </div>

                <div className="bg-slate-800 rounded-2xl p-6">
                  <div className="w-14 h-14 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-7 h-7 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">100% Mobil</h3>
                  <p className="text-slate-400">
                    Wir kommen zu Ihnen – nach Hause, zur Arbeit oder an jeden anderen Ort Ihrer Wahl.
                  </p>
                </div>

                <div className="bg-slate-800 rounded-2xl p-6">
                  <div className="w-14 h-14 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-7 h-7 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Teilkasko-Abwicklung*</h3>
                  <p className="text-slate-400">
                    Wir übernehmen die komplette Schadensabwicklung mit Ihrer Versicherung – Sie zahlen nur die Selbstbeteiligung.
                  </p>
                </div>

                <div className="bg-slate-800 rounded-2xl p-6">
                  <div className="w-14 h-14 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-7 h-7 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Alle Fahrzeugtypen</h3>
                  <p className="text-slate-400">
                    PKW, Transporter, Wohnmobile – wir wechseln Scheiben für alle Fahrzeugtypen und Marken.
                  </p>
                </div>

                <div className="bg-slate-800 rounded-2xl p-6">
                  <div className="w-14 h-14 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-7 h-7 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Persönliche Beratung</h3>
                  <p className="text-slate-400">
                    Kostenlose Beratung und transparente Preise. Keine versteckten Kosten, keine bösen Überraschungen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEO-Text */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Mobiler Scheibenwechsel-Service: So funktioniert&apos;s
              </h2>
              
              <div className="prose prose-lg prose-slate max-w-none">
                <p>
                  Ein <strong>Steinschlag in der Windschutzscheibe</strong> oder ein größerer Riss muss nicht bedeuten, 
                  dass Sie Ihren Tag in einer Werkstatt verbringen müssen. Mit dem mobilen Scheibenwechsel-Service 
                  von Autoglas-Rocket bringen wir die Werkstatt zu Ihnen – <strong>deutschlandweit</strong>, 
                  ob in der Großstadt, im Vorort oder auf dem Land.
                </p>

                <h3>Der Ablauf Ihres Scheibenwechsels</h3>
                <p>
                  Nach Ihrer Anfrage melden wir uns innerhalb von 24 Stunden bei Ihnen zurück und vereinbaren 
                  einen Termin. Am vereinbarten Tag kommt unser geschulter Techniker mit einem voll ausgestatteten 
                  Servicefahrzeug zu Ihrem Wunschort. Der eigentliche Scheibenwechsel dauert je nach Fahrzeugtyp 
                  zwischen 1 und 2 Stunden. Anschließend ist Ihr Fahrzeug sofort wieder fahrbereit.
                </p>

                <h3>Qualität und Sicherheit</h3>
                <p>
                  Wir verwenden ausschließlich hochwertige Scheiben, die den <strong>ECE-Prüfnormen</strong> entsprechen 
                  und für Ihr spezifisches Fahrzeugmodell zugelassen sind. Bei Fahrzeugen mit <strong>Fahrerassistenzsystemen</strong> 
                  (wie Spurhalteassistent oder automatischer Abstandsregelung) führen wir nach dem Scheibenwechsel 
                  die erforderliche Kalibrierung durch, damit alle Systeme wieder einwandfrei funktionieren.
                </p>

                <h3>Kostenübernahme durch die Versicherung</h3>
                <p>
                  Bei den meisten <strong>Teilkaskoversicherungen</strong> sind Glasschäden mitversichert. 
                  Das bedeutet: Ihre Versicherung übernimmt die Kosten für den Scheibenwechsel – abzüglich 
                  Ihrer vereinbarten Selbstbeteiligung. Wir wickeln den Schaden direkt mit Ihrer Versicherung ab, 
                  sodass Sie sich um nichts kümmern müssen.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQ 
          faqs={einsatzgebieteFaqs} 
          title="Häufig gestellte Fragen zum deutschlandweiten Service" 
        />

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 to-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Jetzt Termin anfragen – deutschlandweit
              </h2>
              <p className="text-xl text-slate-300 mb-8">
                Kostenlos und unverbindlich – wir melden uns innerhalb von 24 Stunden
              </p>
              <a
                href="https://crm.autoglas-profis.de/sources/91c71989-afcf-4830-99b1-93e3e7a47998"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-lg font-semibold rounded-xl shadow-lg shadow-orange-500/25 transition-all"
              >
                🚀 Jetzt Termin anfragen
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
