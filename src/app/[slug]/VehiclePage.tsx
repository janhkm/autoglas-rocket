import Link from 'next/link';
import { brands, getBrandBySlug, getModelBySlug, getModelsByBrand, getVehicleContent } from '@/data/vehicles';
import { mainServices } from '@/data/services';
import { 
  generateVehicleIntro,
  generateInsuranceText, 
  generateProcessSteps, 
  generateFaqs,
  pickFromPool,
  synonymPools
} from '@/lib/content-generator';
import { 
  generateVehicleServiceSchema,
  generateFAQSchema, 
  generateBreadcrumbSchema,
  generateArticleSchema,
  schemaToJsonLd 
} from '@/lib/schema';
import { 
  getTopCityLinks,
  generateBreadcrumbs 
} from '@/lib/internal-links';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProcessSteps from '@/components/ProcessSteps';
import InsuranceInfo from '@/components/InsuranceInfo';
import FAQ from '@/components/FAQ';
import NearbyLinks from '@/components/NearbyLinks';
import ArticleMeta from '@/components/ArticleMeta';

interface VehiclePageProps {
  brandSlug: string;
  modelSlug: string;
}

export default function VehiclePage({ brandSlug, modelSlug }: VehiclePageProps) {
  const brand = getBrandBySlug(brandSlug)!;
  const model = getModelBySlug(brandSlug, modelSlug)!;
  const seed = `vehicle-${brandSlug}-${modelSlug}`;

  // Generate unique content
  const vehicleIntro = generateVehicleIntro(brand.name, model.name, seed);
  const insuranceText = generateInsuranceText(seed);
  const processSteps = generateProcessSteps(seed);
  const faqs = generateFaqs('vehicle', { brand: brand.name, model: model.name }, seed);
  const qualityText = pickFromPool(synonymPools.quality, seed);
  const experienceText = pickFromPool(synonymPools.experience, seed);
  
  // Get vehicle-specific content for SEO enrichment
  const vehicleContent = getVehicleContent(brand, model);
  
  // Get internal links
  const cityLinks = getTopCityLinks(8);
  const otherModelLinks = getModelsByBrand(brandSlug)
    .filter(m => m.slug !== modelSlug)
    .slice(0, 6);
  const breadcrumbItems = generateBreadcrumbs('vehicle', { brand, model });

  // Generate schemas
  const vehicleServiceSchema = generateVehicleServiceSchema(brand, model);
  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);
  
  // Article Schema for E-E-A-T
  const pageUrl = `https://autoglas-rocket.de/scheibenwechsel-${brandSlug}-${modelSlug}/`;
  const articleSchema = generateArticleSchema(
    `Scheibenwechsel ${brand.name} ${model.name}`,
    `Professioneller Scheibenwechsel für ${brand.name} ${model.name}. Originalscheiben und mobiler Service deutschlandweit.`,
    pageUrl
  );

  // Get the main scheibenwechsel service
  const scheibenwechselService = mainServices.find(s => s.slug === 'scheibenwechsel');

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToJsonLd(vehicleServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToJsonLd(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToJsonLd(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToJsonLd(articleSchema) }}
      />

      <Header />
      <Breadcrumbs items={breadcrumbItems} />

      <main>
        {/* Hero Section */}
        <Hero
          title={`Scheibenwechsel ${brand.name} ${model.name}`}
          subtitle={`Professioneller Windschutzscheiben-Wechsel für Ihren ${brand.name} ${model.name}. Original-Qualität, mobiler Service, Versicherung inklusive.`}
        />

        {/* Vehicle Details */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* E-E-A-T Signals */}
              <ArticleMeta author="Autoglas-Rocket Redaktion" />
              
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-slate-600 leading-relaxed mb-8">
                  {vehicleIntro} {qualityText} {experienceText}
                </p>

                {/* Vehicle Info Card */}
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 border border-slate-200 not-prose mb-12">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                      {brand.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">{brand.name} {model.name}</h2>
                      <p className="text-slate-600">{model.years} • {brand.country}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-white p-4 rounded-xl">
                      <div className="text-sm text-slate-600 mb-1">Dauer</div>
                      <div className="font-semibold text-slate-900">
                        {scheibenwechselService?.duration || 'ca. 1-2 Stunden'}
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl">
                      <div className="text-sm text-slate-600 mb-1">Kosten</div>
                      <div className="font-semibold text-slate-900">
                        {scheibenwechselService?.priceRange || 'ab 250 €'}
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl">
                      <div className="text-sm text-slate-600 mb-1">Service</div>
                      <div className="font-semibold text-green-600">
                        Mobil vor Ort
                      </div>
                    </div>
                  </div>
                </div>

                {/* Structured Data Table for SEO and LLM extraction */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden my-8 not-prose">
                  <table className="w-full">
                    <caption className="sr-only">Technische Daten zum Scheibenwechsel beim {brand.name} {model.name}</caption>
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900" colSpan={2}>
                          Fahrzeugdaten & Scheibenwechsel-Spezifikationen
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="px-6 py-3 text-sm text-slate-600">Fahrzeugmarke</td>
                        <td className="px-6 py-3 text-sm font-medium text-slate-900">{brand.name}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 text-sm text-slate-600">Modell</td>
                        <td className="px-6 py-3 text-sm font-medium text-slate-900">{model.name}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 text-sm text-slate-600">Baujahre</td>
                        <td className="px-6 py-3 text-sm font-medium text-slate-900">{model.years}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 text-sm text-slate-600">Herkunftsland</td>
                        <td className="px-6 py-3 text-sm font-medium text-slate-900">{brand.country}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 text-sm text-slate-600">Kosten (ohne Versicherung)</td>
                        <td className="px-6 py-3 text-sm font-medium text-slate-900">{vehicleContent.priceRange}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 text-sm text-slate-600">Arbeitszeit</td>
                        <td className="px-6 py-3 text-sm font-medium text-slate-900">{vehicleContent.repairTime}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 text-sm text-slate-600">Service-Art</td>
                        <td className="px-6 py-3 text-sm font-medium text-green-600">Mobiler Service vor Ort</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 text-sm text-slate-600">Versicherung</td>
                        <td className="px-6 py-3 text-sm font-medium text-slate-900">Teilkasko übernimmt Kosten (abzgl. SB)</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 text-sm text-slate-600">Garantie</td>
                        <td className="px-6 py-3 text-sm font-medium text-slate-900">Auf Material und Einbau</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
                  Scheibenwechsel beim {brand.name} {model.name}
                </h2>
                <p className="text-slate-600 mb-6">
                  Der {brand.name} {model.name} ist eines der beliebtesten Fahrzeuge auf deutschen Straßen. 
                  Bei einem Scheibenwechsel achten wir besonders auf:
                </p>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-600">
                      <strong>Originalscheiben</strong> – Wir verwenden ausschließlich Scheiben in OEM-Qualität für Ihren {model.name}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-600">
                      <strong>Sensoren & Kameras</strong> – Fachgerechte Kalibrierung aller Assistenzsysteme nach dem Einbau
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-600">
                      <strong>Dichtigkeit</strong> – Professionelle Verklebung für dauerhaft wasserdichte Ergebnisse
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-600">
                      <strong>Garantie</strong> – Volle Garantie auf Material und Einbau
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Verfügbare Scheibentypen - SEO Content Enrichment */}
        <section className="py-12 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Verfügbare Scheibentypen für {brand.name} {model.name}
              </h2>
              <p className="text-slate-600 mb-6">
                Für den {brand.name} {model.name} bieten wir verschiedene hochwertige Scheibenoptionen an:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vehicleContent.glasTypes.map((glasType, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                    <svg className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-slate-700">{glasType}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Häufige Schäden - SEO Content Enrichment */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Häufige Glasschäden beim {brand.name} {model.name}
              </h2>
              <p className="text-slate-600 mb-6">
                Als Besitzer eines {brand.name} {model.name} sollten Sie auf folgende typische Schadensmuster achten:
              </p>
              <div className="space-y-4">
                {vehicleContent.commonDamages.map((damage, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <span className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </span>
                    <div>
                      <span className="text-slate-700 font-medium">{damage}</span>
                      {index === 0 && (
                        <p className="text-slate-500 text-sm mt-1">
                          Steinschläge entstehen häufig auf Autobahnen und Landstraßen durch aufgewirbelten Split.
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Besonderheiten beim Einbau - SEO Content Enrichment */}
        <section className="py-12 bg-gradient-to-br from-orange-50 to-red-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Besonderheiten beim Scheibenwechsel am {brand.name} {model.name}
              </h2>
              <p className="text-slate-600 mb-6">
                Der {brand.name} {model.name} erfordert besondere Sorgfalt beim Scheibenwechsel. 
                Unsere zertifizierten Techniker achten auf folgende Punkte:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {vehicleContent.specialFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                    <svg className="w-5 h-5 text-orange-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className="text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              {/* Price and Time Info */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-semibold text-slate-900">Kosten ohne Versicherung</span>
                  </div>
                  <p className="text-2xl font-bold text-orange-500">{vehicleContent.priceRange}</p>
                  <p className="text-sm text-slate-500 mt-1">Je nach Scheibentyp und Ausstattung</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-semibold text-slate-900">Arbeitszeit</span>
                  </div>
                  <p className="text-2xl font-bold text-orange-500">{vehicleContent.repairTime}</p>
                  <p className="text-sm text-slate-500 mt-1">Inkl. Aushärtezeit des Klebers</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <ProcessSteps steps={processSteps} />

        {/* Insurance Info */}
        <InsuranceInfo insuranceText={insuranceText} />

        {/* FAQ */}
        <FAQ faqs={faqs} title={`Häufige Fragen zum Scheibenwechsel beim ${brand.name} ${model.name}`} />

        {/* Other Models */}
        {otherModelLinks.length > 0 && (
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-xl font-bold text-slate-900 mb-6">
                  Weitere {brand.name} Modelle
                </h3>
                <div className="flex flex-wrap gap-3">
                  {otherModelLinks.map((otherModel, index) => (
                    <Link
                      key={index}
                      href={`/scheibenwechsel-${brandSlug}-${otherModel.slug}`}
                      className="px-4 py-2 bg-slate-100 hover:bg-orange-100 rounded-lg text-slate-700 hover:text-orange-600 transition-colors text-sm"
                    >
                      {brand.name} {otherModel.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* City Links */}
        <NearbyLinks 
          links={cityLinks.map(link => ({
            ...link,
            href: `/scheibenwechsel-${link.href.replace('/autoglas-', '').replace('/', '')}/`,
            text: `Scheibenwechsel ${link.text}`
          }))}
          title="Scheibenwechsel in Ihrer Stadt"
          introText={`Wir führen den Scheibenwechsel für Ihren ${brand.name} ${model.name} deutschlandweit durch.`}
        />

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 to-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Scheibenwechsel für {brand.name} {model.name} anfragen
              </h2>
              <p className="text-xl text-slate-300 mb-8">
                Kostenlos und unverbindlich – wir melden uns schnellstmöglich
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
