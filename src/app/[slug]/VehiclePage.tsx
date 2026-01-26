import Link from 'next/link';
import { brands, getBrandBySlug, getModelBySlug, getModelsByBrand } from '@/data/vehicles';
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
                      href={`/scheibenwechsel-${brandSlug}-${otherModel.slug}/`}
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
