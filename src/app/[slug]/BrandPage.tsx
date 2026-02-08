import Link from 'next/link';
import { 
  getBrandBySlug, 
  getModelsByBrand, 
  brands,
  getVehicleContent,
  VehicleBrand,
  VehicleModel
} from '@/data/vehicles';
import { 
  generateFAQSchema, 
  generateBreadcrumbSchema,
  generateArticleSchema,
  generateVehicleServiceSchema,
  schemaToJsonLd 
} from '@/lib/schema';
import { getTopCityLinks, generateBreadcrumbs } from '@/lib/internal-links';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQ from '@/components/FAQ';
import ArticleMeta from '@/components/ArticleMeta';

interface BrandPageProps {
  brandSlug: string;
}

/**
 * Determine brand characteristics for content differentiation
 */
function getBrandCharacteristics(brand: VehicleBrand) {
  const premiumBrands = ['bmw', 'mercedes', 'audi', 'porsche', 'volvo', 'tesla'];
  const electricBrands = ['tesla'];
  const germanBrands = ['vw', 'bmw', 'mercedes', 'audi', 'opel', 'porsche'];
  const commercialBrands = ['vw', 'mercedes', 'ford', 'fiat', 'citroen', 'peugeot'];

  return {
    isPremium: premiumBrands.includes(brand.slug),
    isElectric: electricBrands.includes(brand.slug),
    isGerman: germanBrands.includes(brand.slug),
    hasCommercialVehicles: commercialBrands.includes(brand.slug),
  };
}

/**
 * Generate brand-specific intro text
 */
function generateBrandIntro(brand: VehicleBrand, modelCount: number, chars: ReturnType<typeof getBrandCharacteristics>): string {
  const base = `Wir bieten professionellen Scheibenwechsel für alle ${brand.name} Modelle an – insgesamt ${modelCount} Modellreihen. Unser mobiles Team kommt direkt zu Ihnen und erledigt den Scheibenwechsel bequem vor Ort.`;
  
  if (chars.isPremium) {
    return `${base} Bei Premium-Fahrzeugen wie ${brand.name} legen wir besonderen Wert auf die fachgerechte Kalibrierung aller Fahrassistenzsysteme (ADAS) nach dem Scheibenwechsel. Wir verwenden ausschließlich Scheiben in Erstausrüster-Qualität mit Akustik-Verbundglas und Wärmeschutzverglasung.`;
  }
  
  if (chars.isElectric) {
    return `${base} Elektrofahrzeuge von ${brand.name} verfügen über spezielle Scheiben mit integrierter Wärmeschutztechnologie und Akustikglas. Unsere Techniker sind speziell für den Scheibenwechsel an E-Fahrzeugen geschult – inklusive Kalibrierung der Kamera- und Sensorsysteme.`;
  }
  
  if (chars.hasCommercialVehicles) {
    return `${base} Ob PKW oder Transporter – wir wechseln Scheiben für die gesamte ${brand.name} Modellpalette. Auch für Firmenkunden mit Fuhrpark bieten wir attraktive Konditionen und flexible Terminplanung.`;
  }
  
  return `${base} Wir arbeiten mit hochwertigen Originalscheiben oder geprüften OEM-Äquivalenten und übernehmen die komplette Versicherungsabwicklung für Sie.`;
}

/**
 * Generate brand-specific FAQs
 */
function generateBrandFaqs(brand: VehicleBrand, models: VehicleModel[], chars: ReturnType<typeof getBrandCharacteristics>): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = [
    {
      question: `Welche ${brand.name} Modelle werden unterstützt?`,
      answer: `Wir bieten Scheibenwechsel für alle gängigen ${brand.name} Modelle an, darunter ${models.filter(m => m.popular).slice(0, 5).map(m => m.name).join(', ')} und weitere. Sowohl aktuelle als auch ältere Baujahre werden abgedeckt.`
    },
    {
      question: `Was kostet ein Scheibenwechsel beim ${brand.name}?`,
      answer: `Die Kosten variieren je nach Modell und Ausstattung (z.B. Regensensor, beheizte Scheibe). Mit Teilkaskoversicherung zahlen Sie nur Ihre vereinbarte Selbstbeteiligung. Ohne Versicherung liegen die Kosten je nach Modell zwischen 250€ und 850€.`
    },
    {
      question: `Verwenden Sie Originalscheiben für ${brand.name}?`,
      answer: `Ja, wir verwenden hochwertige Scheiben in Original-Qualität (OEM), die alle Sicherheitsstandards erfüllen. Auf Wunsch können wir auch Hersteller-Originalscheiben für Ihren ${brand.name} einbauen.`
    },
    {
      question: `Wie läuft der mobile Scheibenwechsel ab?`,
      answer: `Einfach und bequem: Sie kontaktieren uns, wir vereinbaren einen Termin, und unser mobiles Team kommt direkt zu Ihrem Wunschort – ob nach Hause, zur Arbeit oder woanders. Der Scheibenwechsel dauert 1-2 Stunden.`
    },
    {
      question: 'Übernimmt meine Versicherung die Kosten?',
      answer: 'In den meisten Fällen ja. Bei einer Teilkaskoversicherung wird der Scheibenwechsel übernommen – Sie zahlen nur Ihre vereinbarte Selbstbeteiligung. Wir kümmern uns um die komplette Abwicklung mit Ihrer Versicherung.'
    },
  ];

  if (chars.isPremium) {
    faqs.push({
      question: `Werden die Assistenzsysteme meines ${brand.name} nach dem Scheibenwechsel kalibriert?`,
      answer: `Ja, die Kalibrierung der Fahrassistenzsysteme (ADAS) ist bei ${brand.name} Fahrzeugen besonders wichtig. Unsere Techniker führen nach jedem Scheibenwechsel eine fachgerechte Kalibrierung von Frontkamera, Spurhalteassistent und Abstandswarner durch.`
    });
  }

  if (chars.hasCommercialVehicles) {
    faqs.push({
      question: `Bieten Sie auch Scheibenwechsel für ${brand.name} Transporter an?`,
      answer: `Ja, wir wechseln Scheiben für die gesamte ${brand.name} Palette – einschließlich Transporter und Nutzfahrzeuge. Auch Großkunden mit Fuhrpark betreuen wir mit flexiblen Terminen und attraktiven Konditionen.`
    });
  }

  return faqs;
}

/**
 * Categorize models for price overview
 */
function categorizeModels(models: VehicleModel[], brand: VehicleBrand): { category: string; models: string[]; priceRange: string; repairTime: string }[] {
  const categories: { category: string; models: string[]; priceRange: string; repairTime: string }[] = [];
  
  const compact = models.filter(m => 
    ['polo', 'golf', '1er', '2er', 'a-klasse', 'b-klasse', 'a1', 'a3', 'corsa', 'astra',
     'fiesta', 'focus', 'fabia', 'ibiza', 'leon', 'yaris', 'i10', 'i20', 'i30',
     'picanto', 'rio', 'ceed', 'clio', 'megane', '208', '308', '500', 'panda',
     'cooper', 'mazda2', 'mazda3', 'c3', 'micra', 'jazz', 'civic',
     'sandero', 'spring', 'arona', 'twingo', 'aygo', 'tipo'].includes(m.slug)
  );
  
  const suv = models.filter(m => 
    ['tiguan', 't-roc', 'x1', 'x3', 'x5', 'gla', 'glc', 'gle', 'q2', 'q3', 'q5', 'q7',
     'mokka', 'grandland', 'crossland', 'kuga', 'puma', 'karoq', 'kodiaq', 'ateca', 'tarraco',
     'rav4', 'c-hr', 'tucson', 'kona', 'sportage', 'niro', 'captur', 'kadjar',
     '2008', '3008', '5008', 'cx-3', 'cx-5', 'c5-aircross', 'qashqai', 'juke', 'x-trail',
     'cr-v', 'hr-v', 'cayenne', 'macan', 'countryman', 'xc40', 'xc60', 'xc90',
     'duster', 'kamiq', 'id4', 'ix', 'model-y', 'model-x', 'ev6', 'ioniq5', 'enyaq',
     'mustang-mach-e', 'jogger'].includes(m.slug)
  );

  const sedan = models.filter(m => !compact.some(c => c.slug === m.slug) && !suv.some(s => s.slug === m.slug));

  const isPremium = ['bmw', 'mercedes', 'audi', 'porsche', 'volvo', 'tesla'].includes(brand.slug);

  if (compact.length > 0) {
    categories.push({
      category: 'Kompaktklasse',
      models: compact.map(m => m.name),
      priceRange: isPremium ? '400–600€' : '300–500€',
      repairTime: '1,5–2 Stunden',
    });
  }
  if (suv.length > 0) {
    categories.push({
      category: 'SUV / Crossover',
      models: suv.map(m => m.name),
      priceRange: isPremium ? '500–850€' : '400–650€',
      repairTime: isPremium ? '2–3 Stunden' : '1,5–2,5 Stunden',
    });
  }
  if (sedan.length > 0) {
    categories.push({
      category: 'Limousine / Kombi / Sonstige',
      models: sedan.map(m => m.name),
      priceRange: isPremium ? '450–750€' : '350–550€',
      repairTime: isPremium ? '2–3 Stunden' : '1,5–2 Stunden',
    });
  }

  return categories;
}

export default function BrandPage({ brandSlug }: BrandPageProps) {
  const brand = getBrandBySlug(brandSlug)!;
  const allModels = getModelsByBrand(brandSlug);
  const chars = getBrandCharacteristics(brand);

  // Content
  const brandIntro = generateBrandIntro(brand, allModels.length, chars);
  const faqs = generateBrandFaqs(brand, allModels, chars);
  const priceCategories = categorizeModels(allModels, brand);

  // Internal links
  const cityLinks = getTopCityLinks(8);
  const otherBrands = brands
    .filter(b => b.slug !== brandSlug)
    .slice(0, 6);
  const breadcrumbItems = generateBreadcrumbs('vehicle', { brand });

  // Schemas
  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);
  const serviceSchema = allModels.length > 0 
    ? generateVehicleServiceSchema(brand, allModels[0]) 
    : null;
  const pageUrl = `https://autoglas-rocket.de/scheibenwechsel-${brandSlug}/`;
  const articleSchema = generateArticleSchema(
    `Scheibenwechsel für alle ${brand.name} Modelle`,
    `Professioneller Scheibenwechsel für ${brand.name}. Alle Modelle, Originalscheiben, mobiler Service deutschlandweit.`,
    pageUrl
  );

  // ItemList schema for models (only if models exist)
  const itemListSchema = allModels.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Scheibenwechsel ${brand.name} – Alle Modelle`,
    numberOfItems: allModels.length,
    itemListElement: allModels.map((model, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `Scheibenwechsel ${brand.name} ${model.name}`,
      url: `https://autoglas-rocket.de/scheibenwechsel-${brandSlug}-${model.slug}/`,
    })),
  } : null;

  // Sort models: popular first
  const sortedModels = [...allModels].sort((a, b) => {
    if (a.popular && !b.popular) return -1;
    if (!a.popular && b.popular) return 1;
    return 0;
  });

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToJsonLd(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToJsonLd(breadcrumbSchema) }}
      />
      {serviceSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaToJsonLd(serviceSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToJsonLd(articleSchema) }}
      />
      {itemListSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      )}

      <Header />
      <Breadcrumbs items={breadcrumbItems} />

      <main>
        {/* Hero Section */}
        <Hero
          title={`Scheibenwechsel für alle ${brand.name} Modelle`}
          subtitle={`Professioneller Scheibenwechsel für Ihren ${brand.name} – mobil, mit Originalscheiben und Versicherungsabwicklung. ${allModels.length} Modellreihen verfügbar.`}
        />

        {/* Brand Intro */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <ArticleMeta author="Autoglas-Rocket Redaktion" />

              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                  {brand.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{brand.name}</h2>
                  <p className="text-slate-600">{brand.country} &middot; {allModels.length} Modellreihen</p>
                </div>
              </div>

              <p className="text-xl text-slate-600 leading-relaxed mb-8">
                {brandIntro}
              </p>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500 mb-1">{allModels.length}</div>
                  <div className="text-sm text-slate-600">Modellreihen</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500 mb-1">1-2 Std</div>
                  <div className="text-sm text-slate-600">Scheibenwechsel</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500 mb-1">Teilkasko*</div>
                  <div className="text-sm text-slate-600">Abrechnung</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500 mb-1">100%</div>
                  <div className="text-sm text-slate-600">Mobiler Service</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Models Grid */}
        <section className="py-12 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
                Alle {brand.name} Modelle für Scheibenwechsel
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {sortedModels.map((model) => {
                  const content = getVehicleContent(brand, model);
                  return (
                    <Link
                      key={model.slug}
                      href={`/scheibenwechsel-${brandSlug}-${model.slug}/`}
                      className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-slate-200 hover:border-orange-300 transition-all group"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                          <span className="text-orange-500 group-hover:text-white font-bold transition-colors">
                            {model.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 group-hover:text-orange-600 transition-colors">
                            {model.name}
                          </div>
                          <div className="text-xs text-slate-500">{model.years}</div>
                        </div>
                      </div>
                      <div className="text-sm text-slate-600">
                        <span className="font-medium">{content.priceRange}</span>
                        <span className="text-slate-400 mx-1">&middot;</span>
                        <span>{content.repairTime}</span>
                      </div>
                      {model.popular && (
                        <div className="mt-2 inline-block px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-xs font-medium">
                          Beliebt
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Price Overview Table */}
        {priceCategories.length > 0 && (
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Preisübersicht Scheibenwechsel {brand.name}
                </h2>
                <p className="text-slate-600 mb-8">
                  Die Kosten für den Scheibenwechsel variieren je nach {brand.name} Modell und Ausstattung.
                  Mit einer Teilkaskoversicherung zahlen Sie nur Ihre vereinbarte Selbstbeteiligung.
                </p>
                <div className="overflow-hidden rounded-xl border border-slate-200">
                  <table className="w-full">
                    <caption className="sr-only">Preisübersicht Scheibenwechsel {brand.name} nach Fahrzeugkategorie</caption>
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Kategorie</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Modelle</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Kosten*</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 hidden md:table-cell">Dauer</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {priceCategories.map((cat) => (
                        <tr key={cat.category}>
                          <td className="px-6 py-4 text-sm font-medium text-slate-900">{cat.category}</td>
                          <td className="px-6 py-4 text-sm text-slate-600">{cat.models.slice(0, 4).join(', ')}{cat.models.length > 4 ? ' u.a.' : ''}</td>
                          <td className="px-6 py-4 text-sm font-semibold text-orange-600">{cat.priceRange}</td>
                          <td className="px-6 py-4 text-sm text-slate-600 hidden md:table-cell">{cat.repairTime}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-slate-500 mt-4">
                  * Preise ohne Versicherung. Mit Teilkasko zahlen Sie nur Ihre Selbstbeteiligung.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        <FAQ faqs={faqs} title={`Häufige Fragen zum Scheibenwechsel bei ${brand.name}`} />

        {/* City Links */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                {brand.name} Scheibenwechsel in Ihrer Stadt
              </h3>
              <p className="text-slate-600 mb-6">
                Unser mobiles Team ist deutschlandweit für Sie unterwegs. Wählen Sie Ihre Stadt:
              </p>
              <div className="flex flex-wrap gap-3">
                {cityLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="px-4 py-2 bg-slate-100 hover:bg-orange-100 rounded-lg text-slate-700 hover:text-orange-600 transition-colors text-sm"
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Other Brands */}
        <section className="py-12 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-xl font-bold text-slate-900 mb-6">
                Scheibenwechsel für weitere Marken
              </h3>
              <div className="flex flex-wrap gap-3">
                {otherBrands.map((otherBrand) => (
                  <Link
                    key={otherBrand.slug}
                    href={`/scheibenwechsel-${otherBrand.slug}/`}
                    className="px-5 py-3 bg-white rounded-xl shadow-sm hover:shadow-md border border-slate-200 hover:border-orange-300 text-slate-700 hover:text-orange-600 transition-all font-medium"
                  >
                    {otherBrand.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 to-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Scheibenwechsel für Ihren {brand.name} anfragen
              </h2>
              <p className="text-xl text-slate-300 mb-8">
                Kostenlos und unverbindlich – unser mobiles Team kommt direkt zu Ihnen
              </p>
              <a
                href="https://crm.autoglas-profis.de/sources/91c71989-afcf-4830-99b1-93e3e7a47998"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-lg font-semibold rounded-xl shadow-lg shadow-orange-500/25 transition-all"
              >
                Jetzt Termin anfragen
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
