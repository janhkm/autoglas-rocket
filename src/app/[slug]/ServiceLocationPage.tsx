import { getLocationBySlug, getLocationHierarchy, getLocationTypeLabel } from '@/data/locations';
import { getServiceBySlug } from '@/data/services';
import { 
  generateInsuranceText, 
  generateProcessSteps, 
  generateFaqs,
  pickFromPool,
  synonymPools
} from '@/lib/content-generator';
import { 
  generateLocalBusinessSchema, 
  generateServiceSchema,
  generateFAQSchema, 
  generateBreadcrumbSchema,
  generateArticleSchema,
  schemaToJsonLd 
} from '@/lib/schema';
import { 
  getSiblingLocationLinks,
  getPopularVehicleLinks,
  generateBreadcrumbs,
  getLocationUrl,
  getDistrictLinksForServiceLocation
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
import Link from 'next/link';

interface ServiceLocationPageProps {
  serviceSlug: string;
  locationSlug: string;
}

export default function ServiceLocationPage({ serviceSlug, locationSlug }: ServiceLocationPageProps) {
  const service = getServiceBySlug(serviceSlug)!;
  const location = getLocationBySlug(locationSlug)!;
  const hierarchy = getLocationHierarchy(locationSlug);
  const seed = `${serviceSlug}-${locationSlug}`;

  // Generate unique content
  const insuranceText = generateInsuranceText(seed);
  const processSteps = generateProcessSteps(seed);
  const faqs = generateFaqs('service', { city: location.name, service: service.name }, seed);
  const serviceIntro = pickFromPool(synonymPools.serviceDescriptions, seed);
  const qualityText = pickFromPool(synonymPools.quality, seed);
  
  // Get internal links
  const siblingLinks = getSiblingLocationLinks(locationSlug, 5);
  const vehicleLinks = getPopularVehicleLinks(6);
  const districtLinks = getDistrictLinksForServiceLocation(locationSlug, serviceSlug, 8);
  const breadcrumbItems = generateBreadcrumbs('service-location', { locationSlug, service });

  // Generate schemas
  const localBusinessSchema = generateLocalBusinessSchema(location);
  const serviceSchema = generateServiceSchema(service, location);
  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);
  
  // Article Schema for E-E-A-T
  const pageUrl = `https://autoglas-rocket.de/${serviceSlug}-${locationSlug}/`;
  const articleSchema = generateArticleSchema(
    `${service.name} in ${location.name}`,
    `${service.description} in ${location.name}. Mobiler Service vor Ort mit Versicherungsabrechnung.`,
    pageUrl
  );

  // Get region info from hierarchy
  const parentRegion = hierarchy.find(h => h.type === 'regierungsbezirk' || h.type === 'bundesland');
  
  // Service-specific content - determine if it's front or rear windshield
  const isFrontWindshield = service.slug === 'frontscheibe-wechseln' || service.slug === 'scheibenwechsel';
  const isRearWindshield = service.slug === 'heckscheibe-wechseln';

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToJsonLd(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToJsonLd(serviceSchema) }}
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
          title={`${service.name} in ${location.name}`}
          subtitle={`${service.description} – mobil und professionell in ${location.name}${parentRegion ? ` und ${parentRegion.name}` : ''}.`}
          cityName={location.name}
        />

        {/* Service Details */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* E-E-A-T Signals */}
              <ArticleMeta 
                author="Autoglas-Rocket Redaktion"
                lastUpdated={location.lastModified}
              />
              
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-slate-600 leading-relaxed mb-8">
                  {serviceIntro} {qualityText}
                </p>

                <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
                  Wann ist ein Scheibenwechsel notwendig?
                </h2>
                <p className="text-slate-600 mb-4">
                  Ein Austausch der {isRearWindshield ? 'Heckscheibe' : 'Frontscheibe'} wird empfohlen bei:
                </p>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-600">Rissen oder größeren Beschädigungen</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-600">{isFrontWindshield ? 'Schäden im Sichtfeld des Fahrers' : 'Eingeschränkter Sicht nach hinten'}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-600">Schäden am Scheibenrand oder an der Dichtung</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-600">{isFrontWindshield ? 'Defekten Sensoren oder Kamerasystemen' : 'Defekter Heizung oder Antenne'}</span>
                  </li>
                </ul>

                {/* Service Details Card */}
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-100 not-prose">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{service.name} auf einen Blick</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                      <div className="text-3xl mb-2">{service.icon}</div>
                      <div className="text-sm text-slate-600">Dauer</div>
                      <div className="font-semibold text-slate-900">{service.duration}</div>
                    </div>
                    <div>
                      <div className="text-3xl mb-2">💰</div>
                      <div className="text-sm text-slate-600">Kosten</div>
                      <div className="font-semibold text-slate-900">{service.priceRange}</div>
                    </div>
                    <div>
                      <div className="text-3xl mb-2">🛡️</div>
                      <div className="text-sm text-slate-600">Versicherung</div>
                      <div className="font-semibold text-green-600">
                        {service.insuranceCovered ? 'Wird übernommen' : 'Selbstzahler'}
                      </div>
                    </div>
                  </div>
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
        <FAQ faqs={faqs} title={`Häufige Fragen zu ${service.name} in ${location.name}`} />

        {/* Vehicle Links */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-xl font-bold text-slate-900 mb-6">
                Beliebte Fahrzeuge für Scheibenwechsel
              </h3>
              <div className="flex flex-wrap gap-3">
                {vehicleLinks.map((link, index) => (
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

        {/* District Links - for better Stadtteil inbound links */}
        {districtLinks.length > 0 && (
          <section className="py-12 bg-slate-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  {service.name} auch in diesen Stadtteilen
                </h3>
                <p className="text-slate-600 mb-6">
                  Unser mobiler Service ist auch in den Stadtteilen von {location.name} für Sie da:
                </p>
                <div className="flex flex-wrap gap-3">
                  {districtLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      title={link.title}
                      className="px-4 py-2 bg-white rounded-lg border border-slate-200 hover:border-orange-300 text-slate-700 hover:text-orange-600 transition-colors text-sm"
                    >
                      {link.text}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Nearby Locations */}
        {siblingLinks.length > 0 && (
          <NearbyLinks 
            links={siblingLinks.map(link => ({
              ...link,
              href: `/${service.slug}-${link.href.replace('/autoglas-', '').replace('/', '')}/`,
              text: `${service.shortName} ${link.text}`
            }))}
            title={`${service.name} auch in der Nähe`}
          />
        )}

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 to-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {service.name} in {location.name} anfragen
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
