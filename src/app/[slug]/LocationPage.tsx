import { 
  getLocationBySlug, 
  getChildLocations,
  getLocationHierarchy,
  getLocationTypeLabel,
  Location
} from '@/data/locations';
import { mainServices } from '@/data/services';
import { 
  generateCityIntro, 
  generateInsuranceText, 
  generateProcessSteps, 
  generateFaqs,
  generateExtendedLocalContent,
  generateAboutLocation,
  generateLocalFaqs
} from '@/lib/content-generator';
import { 
  generateLocalBusinessSchema, 
  generateFAQSchema, 
  generateBreadcrumbSchema,
  generateHowToSchema,
  generateDetailedServiceSchema,
  generateArticleSchema,
  schemaToJsonLd 
} from '@/lib/schema';
import { 
  getSiblingLocationLinks, 
  getChildLocationLinks,
  getServiceLinksForLocation,
  getVariedServiceLinks,
  generateBreadcrumbs,
  getDistrictLinks,
  getPopularVehicleLinks
} from '@/lib/internal-links';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Breadcrumbs from '@/components/Breadcrumbs';
import ServiceCards from '@/components/ServiceCards';
import ProcessSteps from '@/components/ProcessSteps';
import InsuranceInfo from '@/components/InsuranceInfo';
import FAQ from '@/components/FAQ';
import NearbyLinks from '@/components/NearbyLinks';
import ArticleMeta from '@/components/ArticleMeta';
import Link from 'next/link';

interface LocationPageProps {
  locationSlug: string;
}

export default function LocationPage({ locationSlug }: LocationPageProps) {
  const location = getLocationBySlug(locationSlug)!;
  const hierarchy = getLocationHierarchy(locationSlug);
  const children = getChildLocations(locationSlug);
  const typeLabel = getLocationTypeLabel(location.type);

  // Generate extended unique content based on location
  const extendedContent = generateExtendedLocalContent(location);
  const aboutLocation = generateAboutLocation(location);
  const insuranceText = generateInsuranceText(locationSlug);
  const processSteps = generateProcessSteps(locationSlug);
  
  // Erweiterte FAQs (6-8 Stück)
  const baseFaqs = generateFaqs('city', { city: location.name }, locationSlug);
  const localFaqs = generateLocalFaqs(location, locationSlug);
  const allFaqs = [...baseFaqs, ...localFaqs].slice(0, 8);
  
  // Get internal links (mit Variation)
  const siblingLinks = getSiblingLocationLinks(locationSlug, 5);
  const childLinks = getChildLocationLinks(locationSlug, 16);
  const serviceLinks = getServiceLinksForLocation(locationSlug);
  const variedServiceLinks = getVariedServiceLinks(locationSlug);
  const vehicleLinks = getPopularVehicleLinks(8);
  const breadcrumbItems = generateBreadcrumbs('location', { locationSlug });

  // Generate all schemas
  const localBusinessSchema = generateLocalBusinessSchema(location);
  const faqSchema = generateFAQSchema(allFaqs);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);
  const howToSchema = generateHowToSchema(location);
  
  // Article Schema for E-E-A-T
  const pageUrl = `https://autoglas-rocket.de/autoglas-${locationSlug}/`;
  const articleSchema = generateArticleSchema(
    `Autoglas-Service in ${location.name}`,
    `Professioneller mobiler Autoglas-Service in ${location.name}. Scheibenwechsel, Glasreparatur und mehr.`,
    pageUrl
  );
  
  // Service Schemas für die Hauptleistungen
  const serviceSchemas = mainServices.slice(0, 2).map(service => 
    generateDetailedServiceSchema(service, location)
  );

  // Dynamic H1 based on location type
  // Focused on "Autoglas" to differentiate from Service-Location pages (which target "Scheibenwechsel")
  // Uses location.h1 override if set
  const getH1 = () => {
    // Use custom H1 if provided
    if (location.h1) return location.h1;
    
    switch (location.type) {
      case 'bundesland':
        return `Autoglas-Service in ${location.name} – Mobil & Professionell`;
      case 'regierungsbezirk':
        return `Autoglas ${location.name} – Ihr Partner für Glasreparatur`;
      case 'kreisfreie-stadt':
        return `Autoglas ${location.name} – Mobiler Service & Glasreparatur`;
      case 'stadtbezirk':
      case 'stadtteil': {
        const parentCity = hierarchy.find(h => h.type === 'kreisfreie-stadt' || h.type === 'bundesland');
        return `Autoglas-Service ${location.name}${parentCity ? ` in ${parentCity.name}` : ''} – Mobil vor Ort`;
      }
      default:
        return `Autoglas-Service in ${location.name}`;
    }
  };

  // Determine the subtitle based on location type
  const getSubtitle = () => {
    switch (location.type) {
      case 'bundesland':
        return `Professioneller mobiler Autoglas-Service in ganz ${location.name}. Front- und Heckscheibe wechseln – wir kommen zu Ihnen.`;
      case 'regierungsbezirk':
        return `Ihr Partner für Autoglas-Service in ${location.name}. Mobiler Service für Front- und Heckscheibe.`;
      case 'kreisfreie-stadt':
        return `Professioneller mobiler Autoglas-Service für Front- und Heckscheibe in ${location.name}. Schnell, zuverlässig, vor Ort.`;
      case 'stadtbezirk':
      case 'stadtteil':
        const parentCity = hierarchy.find(h => h.type === 'kreisfreie-stadt' || h.type === 'bundesland');
        return `Autoglas-Service in ${location.name}${parentCity ? ` (${parentCity.name})` : ''}. Wir kommen direkt zu Ihnen – mobil und professionell.`;
      default:
        return `Mobiler Autoglas-Service in ${location.name} und Umgebung.`;
    }
  };

  return (
    <>
      {/* JSON-LD Structured Data - Erweitert */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToJsonLd(localBusinessSchema) }}
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
        dangerouslySetInnerHTML={{ __html: schemaToJsonLd(howToSchema) }}
      />
      {serviceSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaToJsonLd(schema) }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToJsonLd(articleSchema) }}
      />

      <Header />
      <Breadcrumbs items={breadcrumbItems} />

      <main>
        {/* Hero Section mit optimiertem H1 */}
        <Hero
          title={getH1()}
          subtitle={getSubtitle()}
          cityName={location.name}
        />

        {/* Intro Section mit erweitertem Content */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="inline-block px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium mb-6">
                {typeLabel}
              </div>
              
              {/* E-E-A-T Signals */}
              <ArticleMeta 
                author="Autoglas-Rocket Redaktion" 
                lastUpdated={location.lastModified}
              />
              
              {/* H2 für semantische Struktur */}
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                Ihr zuverlässiger Partner für Autoglas-Service in {location.name}
              </h2>
              
              <p className="text-xl text-slate-600 leading-relaxed mb-6">
                {extendedContent.intro}
              </p>
              
              {/* Erweiterter Content-Bereich */}
              <div className="prose prose-lg prose-slate max-w-none mb-8">
                <p>{extendedContent.localSection}</p>
                <p>{extendedContent.whyUs}</p>
              </div>
              
              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500 mb-1">24h</div>
                  <div className="text-sm text-slate-600">Termin-Rückruf</div>
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

        {/* Über den Standort / Servicegebiet */}
        <section className="py-12 bg-white border-y border-slate-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Scheibenwechsel-Service in {location.name}
              </h2>
              <p className="text-lg text-slate-600 mb-4">
                {aboutLocation}
              </p>
              {extendedContent.serviceArea && (
                <p className="text-slate-600">
                  {extendedContent.serviceArea}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Child Locations (Untergeordnete Gebiete) */}
        {childLinks.length > 0 && (
          <section className="py-12 bg-slate-50">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                  {location.type === 'bundesland' && 'Regionen und Städte'}
                  {location.type === 'regierungsbezirk' && 'Städte und Landkreise'}
                  {location.type === 'kreisfreie-stadt' && 'Stadtbezirke und Stadtteile'}
                  {location.type === 'stadtbezirk' && 'Stadtteile'}
                  {!['bundesland', 'regierungsbezirk', 'kreisfreie-stadt', 'stadtbezirk'].includes(location.type) && 'Einsatzgebiete'}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {childLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md border border-slate-200 hover:border-orange-300 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                          <svg className="w-5 h-5 text-orange-500 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <span className="font-medium text-slate-700 group-hover:text-orange-600 transition-colors">
                          {link.text}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Warum schnell handeln? */}
        <section className="py-12 bg-gradient-to-r from-orange-50 to-red-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                ⚠️ Warum Sie bei Glasschäden schnell handeln sollten
              </h2>
              <p className="text-lg text-slate-700">
                {extendedContent.urgencySection}
              </p>
              <div className="mt-6">
                <a
                  href="https://crm.autoglas-profis.de/sources/91c71989-afcf-4830-99b1-93e3e7a47998"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
                >
                  Jetzt Termin anfragen
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <ServiceCards services={mainServices} citySlug={locationSlug} />

        {/* Process Steps */}
        <ProcessSteps steps={processSteps} />

        {/* Insurance Info */}
        <InsuranceInfo insuranceText={insuranceText} />

        {/* FAQ - Erweitert */}
        <FAQ faqs={allFaqs} title={`Häufige Fragen zum Autoglas-Service in ${location.name}`} />

        {/* Vehicle Links - Cross-Linking */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Scheibenwechsel für beliebte Fahrzeuge in {location.name}
              </h3>
              <p className="text-slate-600 mb-6">
                Unser mobiler Autoglas-Service in {location.name} ist für alle Fahrzeugmarken und -modelle verfügbar:
              </p>
              <div className="flex flex-wrap gap-3">
                {vehicleLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    title={link.title}
                    className="px-4 py-2 bg-slate-100 hover:bg-orange-100 rounded-lg text-slate-700 hover:text-orange-600 transition-colors text-sm"
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sibling Locations (Nachbargebiete) */}
        {siblingLinks.length > 0 && (
          <NearbyLinks 
            links={siblingLinks}
            title="Auch in der Nähe verfügbar"
            introText={`Unser mobiler Scheibenwechsel-Service ist auch in den benachbarten ${
              location.type === 'stadtteil' ? 'Stadtteilen' : 
              location.type === 'stadtbezirk' ? 'Bezirken' : 
              location.type === 'kreisfreie-stadt' ? 'Städten' : 'Regionen'
            } für Sie da.`}
          />
        )}

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 to-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Jetzt Termin in {location.name} anfragen
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

        {/* Internal Links Section - Mit variierten Anchor-Texten */}
        <section className="py-12 bg-white border-t border-slate-100">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h3 className="text-xl font-bold text-slate-900 mb-6">
                Unsere Leistungen in {location.name}
              </h3>
              <div className="flex flex-wrap gap-3 mb-8">
                {variedServiceLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    title={link.title}
                    className="px-4 py-2 bg-slate-100 hover:bg-orange-100 rounded-lg text-slate-700 hover:text-orange-600 transition-colors text-sm"
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
              
              {/* Zusätzliche Service-Links mit anderer Variation */}
              <h4 className="text-lg font-semibold text-slate-800 mb-4">
                Weitere Services
              </h4>
              <div className="flex flex-wrap gap-2">
                {serviceLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    title={link.title}
                    className="px-3 py-1.5 bg-white border border-slate-200 hover:border-orange-300 rounded text-slate-600 hover:text-orange-600 transition-colors text-xs"
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
