import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FAQ from '@/components/FAQ';
import { services, allGlassServices } from '@/data/services';
import { getLocationsByType } from '@/data/locations';
import { brands, getPopularVehicleCombinations } from '@/data/vehicles';
import { 
  generateBreadcrumbSchema, 
  generateFAQSchema, 
  schemaToJsonLd 
} from '@/lib/schema';

const siteUrl = process.env.SITE_URL || 'https://autoglas-rocket.de';

export const metadata: Metadata = {
  title: 'Dienstleistungen – Scheibenwechsel & Autoglas-Service | Autoglas-Rocket',
  description: 'Alle Autoglas-Dienstleistungen: Scheibenwechsel ✓ Frontscheibe wechseln ✓ Heckscheibe wechseln ✓ Mobiler Service deutschlandweit ✓ Versicherungsabwicklung ✓',
  alternates: { canonical: '/dienstleistungen/' },
  openGraph: {
    title: 'Scheibenwechsel & Autoglas-Dienstleistungen | Autoglas-Rocket',
    description: 'Professioneller Autoglas-Service: Scheibenwechsel, Frontscheibe, Heckscheibe. Mobil, schnell und mit Versicherungsabwicklung.',
    type: 'website',
    locale: 'de_DE',
    url: `${siteUrl}/dienstleistungen/`,
  },
  twitter: {
    card: 'summary',
    title: 'Scheibenwechsel & Autoglas-Dienstleistungen | Autoglas-Rocket',
    description: 'Professioneller Autoglas-Service: Scheibenwechsel, Frontscheibe, Heckscheibe. Mobil, schnell und mit Versicherungsabwicklung.',
  },
};

// FAQ-Daten für die Dienstleistungen-Seite
const dienstleistungenFaqs = [
  {
    question: 'Welche Autoglas-Dienstleistungen bietet Autoglas-Rocket an?',
    answer: 'Wir bieten professionellen Scheibenwechsel für Front- und Heckscheiben an. Unser mobiler Service kommt direkt zu Ihnen – ob nach Hause oder zur Arbeit. Die Versicherungsabwicklung übernehmen wir komplett für Sie.',
  },
  {
    question: 'Wie lange dauert ein Scheibenwechsel?',
    answer: 'Ein Scheibenwechsel dauert in der Regel 1-2 Stunden. Nach dem Einbau muss der Kleber noch etwa 1 Stunde aushärten, bevor Sie wieder fahren können. Bei Fahrzeugen mit Assistenzsystemen kommt die Zeit für die Kalibrierung hinzu.',
  },
  {
    question: 'Was kostet ein Scheibenwechsel?',
    answer: 'Mit einer Teilkaskoversicherung zahlen Sie nur Ihre vereinbarte Selbstbeteiligung (meist 150€). Ohne Versicherung variieren die Kosten je nach Fahrzeugtyp zwischen 250€ und 800€. Wir erstellen Ihnen gerne ein individuelles Angebot.',
  },
  {
    question: 'Werden Originalscheiben verwendet?',
    answer: 'Ja, wir verwenden ausschließlich hochwertige Scheiben in Original-Qualität (OEM). Diese erfüllen alle Sicherheitsstandards und sind für Ihr spezifisches Fahrzeugmodell zugelassen. Auf Wunsch können wir auch Hersteller-Originalscheiben einbauen.',
  },
  {
    question: 'Wie funktioniert die Versicherungsabwicklung?',
    answer: 'Wir übernehmen die komplette Abwicklung mit Ihrer Versicherung. Sie müssen sich um nichts kümmern – wir kommunizieren direkt mit Ihrem Versicherer und rechnen den Schaden ab. Sie zahlen nur Ihre Selbstbeteiligung.',
  },
  {
    question: 'Muss ich für die Fahrassistenzsystem-Kalibrierung extra zahlen?',
    answer: 'Die Kalibrierung ist bei Fahrzeugen mit ADAS-Systemen (Spurhalteassistent, Abstandswarner etc.) erforderlich und wird in der Regel von der Teilkasko übernommen. Wir informieren Sie vorab über alle anfallenden Leistungen.',
  },
];

// Top Städte für Verlinkung
const topStaedte = getLocationsByType('kreisfreie-stadt')
  .filter(city => (city.population || 0) >= 300000)
  .sort((a, b) => (b.population || 0) - (a.population || 0))
  .slice(0, 12);

// Beliebte Fahrzeuge
const popularVehicles = getPopularVehicleCombinations().slice(0, 12);

export default function DienstleistungenPage() {
  // Schema
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Dienstleistungen' },
  ];
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);
  const faqSchema = generateFAQSchema(dienstleistungenFaqs);

  return (
    <>
      <Header />
      
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToJsonLd(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToJsonLd(faqSchema) }}
      />
      
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4">
            <nav className="text-sm mb-4 text-blue-100">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">›</span>
              <span>Dienstleistungen</span>
            </nav>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Unsere Autoglas-Dienstleistungen
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl">
              Professioneller Scheibenwechsel für alle Fahrzeugtypen. Front- und Heckscheibe. 
              Mobiler Service deutschlandweit mit direkter Versicherungsabwicklung.
            </p>
          </div>
        </section>
        
        {/* Services Grid */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">Alle Dienstleistungen im Überblick</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {allGlassServices.map((service) => (
                <div key={service.slug} className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="text-sm text-gray-500 mb-4 space-y-1">
                    <li>⏱ Dauer: {service.duration}</li>
                    <li>💰 Preis: {service.priceRange}</li>
                    {service.insuranceCovered && (
                      <li>✓ Teilkasko-Übernahme möglich</li>
                    )}
                  </ul>
                  <Link 
                    href={`/${service.slug}-berlin/`}
                    className="inline-block mt-2 text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    {service.shortName} in Ihrer Stadt →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Service-spezifische Links */}
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Service-Seiten nach Typ</h2>
            <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
              Für detaillierte Informationen zu unseren spezifischen Dienstleistungen in Ihrer Stadt:
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {allGlassServices.map((service) => (
                <div key={`links-${service.slug}`} className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <span>{service.icon}</span>
                    <span>{service.shortName}</span>
                  </h3>
                  <div className="space-y-2">
                    {topStaedte.slice(0, 4).map((city) => (
                      <Link
                        key={`${service.slug}-${city.slug}`}
                        href={`/${service.slug}-${city.slug}/`}
                        className="block text-sm text-blue-600 hover:text-blue-800"
                      >
                        {service.shortName} {city.name}
                      </Link>
                    ))}
                    <Link
                      href="/einsatzgebiete/"
                      className="block text-sm text-gray-500 hover:text-gray-700 mt-3"
                    >
                      Mehr Städte →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Service nach Stadt */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Scheibenwechsel in Ihrer Stadt</h2>
            <p className="text-gray-600 mb-8">
              Unser mobiler Service ist deutschlandweit verfügbar. Wählen Sie Ihre Stadt für lokale Informationen:
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {topStaedte.map((city) => (
                <Link
                  key={city.slug}
                  href={`/scheibenwechsel-${city.slug}/`}
                  className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
                >
                  <span className="font-medium text-blue-600 hover:text-blue-800">
                    {city.name}
                  </span>
                </Link>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Link
                href="/einsatzgebiete/"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                Alle Einsatzgebiete anzeigen →
              </Link>
            </div>
          </div>
        </section>
        
        {/* Service nach Fahrzeug */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Scheibenwechsel nach Fahrzeug</h2>
            <p className="text-gray-600 mb-8">
              Wir haben Erfahrung mit allen gängigen Fahrzeugmarken und -modellen:
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {popularVehicles.map(({ brand, model }) => {
                const brandData = brands.find(b => b.slug === brand);
                return (
                  <Link
                    key={`${brand}-${model}`}
                    href={`/scheibenwechsel-${brand}-${model}/`}
                    className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
                  >
                    <span className="font-medium text-blue-600 hover:text-blue-800">
                      {brandData?.name} {model.charAt(0).toUpperCase() + model.slice(1)}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
        
        {/* Vorteile */}
        <section className="py-12 bg-blue-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">Ihre Vorteile bei Autoglas-Rocket</h2>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">🚗</div>
                <h3 className="font-semibold mb-2">Mobiler Service</h3>
                <p className="text-sm text-gray-600">Wir kommen zu Ihnen – nach Hause oder zur Arbeit</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="font-semibold mb-2">Schnelle Termine</h3>
                <p className="text-sm text-gray-600">Meist innerhalb von 24-48 Stunden</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🛡️</div>
                <h3 className="font-semibold mb-2">Versicherung</h3>
                <p className="text-sm text-gray-600">Komplette Abwicklung mit Ihrer Teilkasko</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">✓</div>
                <h3 className="font-semibold mb-2">Qualität</h3>
                <p className="text-sm text-gray-600">Originalscheiben und zertifizierte Techniker</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Häufige Fragen zu unseren Dienstleistungen</h2>
            <FAQ faqs={dienstleistungenFaqs} />
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Jetzt Termin vereinbaren</h2>
            <p className="mb-6 text-blue-100">
              Kontaktieren Sie uns für ein unverbindliches Angebot oder vereinbaren Sie direkt einen Termin.
            </p>
            <Link
              href="/#kontakt"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Jetzt anfragen
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
