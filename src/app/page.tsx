import { Metadata } from 'next';
import Link from 'next/link';
import { mainServices } from '@/data/services';
import { getTopCityLinks, getPopularVehicleLinks, getBundeslandLinks } from '@/lib/internal-links';
import { generateWebSiteSchema, generateMainBusinessSchema, schemaToJsonLd } from '@/lib/schema';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ServiceCards from '@/components/ServiceCards';
import Button from '@/components/ui/Button';
import Card, { CardBody } from '@/components/ui/Card';

const siteUrl = process.env.SITE_URL || 'https://autoglas-rocket.de';

export const metadata: Metadata = {
  title: 'Autoglas-Rocket – Mobiler Scheibenwechsel Service | Front- & Heckscheibe',
  description: 'Professioneller Scheibenwechsel deutschlandweit. Front- und Heckscheibe mit Versicherungsabwicklung. Mobiler Service direkt vor Ort. Jetzt Termin buchen!',
  openGraph: {
    title: 'Autoglas-Rocket – Mobiler Scheibenwechsel Service',
    description: 'Professioneller Scheibenwechsel deutschlandweit. Front- und Heckscheibe mit Versicherungsabwicklung.',
    type: 'website',
    locale: 'de_DE',
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/autoglas-rocket-logo.png`,
        width: 1200,
        height: 630,
        alt: 'Autoglas-Rocket - Mobiler Scheibenwechsel Service',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Autoglas-Rocket – Mobiler Scheibenwechsel Service',
    description: 'Professioneller Scheibenwechsel deutschlandweit. Front- und Heckscheibe mit Versicherungsabwicklung.',
    images: [`${siteUrl}/autoglas-rocket-logo.png`],
  },
  alternates: {
    canonical: '/',
  },
};

// Schemas für die Startseite
const webSiteSchema = generateWebSiteSchema();
const mainBusinessSchema = generateMainBusinessSchema();

export default function HomePage() {
  const topCities = getTopCityLinks(12);
  const popularVehicles = getPopularVehicleLinks(12);
  const bundeslaender = getBundeslandLinks();

  return (
    <>
      {/* JSON-LD Structured Data für die Startseite */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToJsonLd(webSiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToJsonLd(mainBusinessSchema) }}
      />

      <Header />

      <main>
        {/* Hero Section */}
        <Hero
          title="Professioneller Scheibenwechsel deutschlandweit"
          subtitle="Front- und Heckscheibe wechseln – mobil, professionell und mit direkter Versicherungsabwicklung."
        />

        {/* Trust Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-500 mb-2">16</div>
                <div className="text-slate-600">Bundesländer</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-500 mb-2">1-2 Std</div>
                <div className="text-slate-600">Scheibenwechsel</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-500 mb-2">100%</div>
                <div className="text-slate-600">Mobiler Service</div>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <ServiceCards services={mainServices} />

        {/* How It Works */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                So einfach geht&apos;s
              </h2>
              <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                In nur wenigen Schritten zur neuen Scheibe
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {[
                { step: '1', icon: '📱', title: 'Anfrage stellen', desc: 'Online oder telefonisch – in 2 Minuten erledigt' },
                { step: '2', icon: '📞', title: 'Rückruf erhalten', desc: 'Wir melden uns innerhalb von 24 Stunden' },
                { step: '3', icon: '📅', title: 'Termin vereinbaren', desc: 'Flexibler Termin an Ihrem Wunschort' },
                { step: '4', icon: '✅', title: 'Fertig!', desc: 'Professioneller Scheibenwechsel vor Ort' },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="relative inline-block mb-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-3xl">
                      {item.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white text-slate-900 rounded-full flex items-center justify-center font-bold text-sm">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="#standorte">
                <Button size="lg">
                  🚀 Jetzt Standort finden
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Insurance Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                    Kostenübernahme durch Ihre Versicherung
                  </h2>
                  <p className="text-lg text-slate-600 mb-6">
                    Die gute Nachricht: Bei Glasschäden übernimmt in den meisten Fällen Ihre Teilkaskoversicherung 
                    die kompletten Kosten für den Scheibenwechsel. Wir kümmern uns um die gesamte Abwicklung 
                    mit Ihrer Versicherung.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-slate-700">Direkte Abrechnung mit Ihrer Versicherung</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-slate-700">Keine Schadensfreiheitsrabatt-Rückstufung</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-slate-700">Nur Selbstbeteiligung laut Vertrag</span>
                    </li>
                  </ul>
                </div>
                <Card variant="glass" className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-100">
                  <CardBody className="p-8 text-center">
                    <div className="text-6xl mb-4">🛡️</div>
                    <div className="text-4xl font-bold text-orange-500 mb-2">Teilkasko*</div>
                    <div className="text-xl text-slate-700 mb-4">übernimmt Scheibenwechsel</div>
                    <p className="text-slate-600 text-sm">
                      Mit Teilkaskoversicherung zahlen Sie nur Ihre vereinbarte Selbstbeteiligung – wir erledigen den Rest.
                    </p>
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Bundesländer Section */}
        <section id="standorte" className="py-16 md:py-24 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Autoglas-Service in ganz Deutschland
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Wählen Sie Ihr Bundesland oder eine Stadt in Ihrer Nähe:
              </p>
            </div>

            {/* Bundesländer Grid */}
            <div className="max-w-5xl mx-auto mb-12">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Bundesländer</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {bundeslaender.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="px-4 py-3 bg-white rounded-xl shadow-sm hover:shadow-md border border-slate-200 hover:border-orange-300 text-slate-700 hover:text-orange-600 transition-all font-medium text-center"
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            </div>

            {/* Top Städte */}
            <div className="max-w-5xl mx-auto">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Top Städte</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {topCities.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="px-5 py-3 bg-white rounded-xl shadow-sm hover:shadow-md border border-slate-200 hover:border-orange-300 text-slate-700 hover:text-orange-600 transition-all font-medium"
                  >
                    📍 {link.text}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Vehicles Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Scheibenwechsel für alle Fahrzeuge
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Wir arbeiten mit allen gängigen Marken und Modellen. Original-Qualität garantiert.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap justify-center gap-3">
                {popularVehicles.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="px-4 py-2 bg-slate-100 hover:bg-orange-100 rounded-lg text-slate-700 hover:text-orange-600 transition-colors"
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Scheibe beschädigt?<br />
              Wir helfen sofort!
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Ob Frontscheibe oder Heckscheibe – wir wechseln Ihre Scheibe schnell und professionell. 
              Mobiler Service direkt bei Ihnen vor Ort.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/autoglas-berlin/">
                <Button size="lg" variant="secondary">
                  🚀 Standort wählen
                </Button>
              </Link>
              <a href="tel:+491746768392">
                <Button size="lg" className="bg-white text-orange-500 hover:bg-orange-50">
                  📞 0174 6768392
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
