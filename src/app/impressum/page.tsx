import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Impressum | Autoglas-Rocket',
  description: 'Impressum und Anbieterkennzeichnung von Autoglas-Rocket – Ihrer Vermittlungsplattform für professionellen Scheibenwechsel deutschlandweit.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: '/impressum/',
  },
};

export default function ImpressumPage() {
  return (
    <>
      <Header />
      
      <main className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-8 text-sm">
              <ol className="flex items-center gap-2 text-slate-500">
                <li>
                  <Link href="/" className="hover:text-orange-500">Start</Link>
                </li>
                <li>/</li>
                <li className="text-slate-900 font-medium">Impressum</li>
              </ol>
            </nav>

            <h1 className="text-4xl font-bold text-slate-900 mb-8">Impressum</h1>

            <div className="prose prose-slate max-w-none">
              {/* Angaben gemäß § 5 TMG */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Angaben gemäß § 5 TMG</h2>
                
                <p className="text-slate-700 mb-4">
                  <strong>Autoglas-Rocket</strong><br />
                  Hemkemeier &amp; Awad GbR<br />
                  Mühlstraße 41<br />
                  71229 Leonberg<br />
                  Deutschland
                </p>
              </section>

              {/* Kontakt */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Kontakt</h2>
                <p className="text-slate-700">
                  Telefon: <a href="tel:+491746768392" className="text-orange-500 hover:text-orange-600">0174 6768392</a><br />
                  E-Mail: <a href="mailto:info@autoglas-rocket.de" className="text-orange-500 hover:text-orange-600">info@autoglas-rocket.de</a>
                </p>
              </section>

              {/* Umsatzsteuer-ID */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Umsatzsteuer-ID</h2>
                <p className="text-slate-700">
                  Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                  DE326611071
                </p>
              </section>

              {/* Art des Unternehmens */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Art des Dienstes</h2>
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                  <p className="text-slate-700 mb-4">
                    <strong>Autoglas-Rocket ist eine Vermittlungsplattform.</strong>
                  </p>
                  <p className="text-slate-600 mb-4">
                    Wir vermitteln Kundenanfragen für Scheibenwechsel und Autoglas-Reparaturen an qualifizierte 
                    Partner-Werkstätten in ganz Deutschland. Autoglas-Rocket selbst führt keine handwerklichen 
                    Leistungen durch.
                  </p>
                  <p className="text-slate-600">
                    Die tatsächliche Ausführung der Scheibenwechsel und Reparaturen erfolgt durch unsere 
                    unabhängigen Partner-Betriebe, die eigenverantwortlich und auf eigene Rechnung arbeiten.
                  </p>
                </div>
              </section>

              {/* Verantwortlich für den Inhalt */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
                <p className="text-slate-700">
                  Hemkemeier &amp; Awad GbR<br />
                  Mühlstraße 41<br />
                  71229 Leonberg
                </p>
              </section>

              {/* Streitschlichtung */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">EU-Streitschlichtung</h2>
                <p className="text-slate-600 mb-4">
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
                  <a 
                    href="https://ec.europa.eu/consumers/odr/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-orange-500 hover:text-orange-600"
                  >
                    https://ec.europa.eu/consumers/odr/
                  </a>
                </p>
                <p className="text-slate-600">
                  Unsere E-Mail-Adresse finden Sie oben im Impressum.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
                <p className="text-slate-600">
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
                  Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </section>

              {/* Haftungsausschluss */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Haftung für Inhalte</h2>
                <p className="text-slate-600 mb-4">
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den 
                  allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch 
                  nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach 
                  Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                </p>
                <p className="text-slate-600">
                  Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen 
                  Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt 
                  der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden 
                  Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Haftung für Links</h2>
                <p className="text-slate-600 mb-4">
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. 
                  Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der 
                  verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                </p>
                <p className="text-slate-600">
                  Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. 
                  Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche 
                  Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht 
                  zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Urheberrecht</h2>
                <p className="text-slate-600 mb-4">
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen 
                  Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der 
                  Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                </p>
                <p className="text-slate-600">
                  Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte 
                  Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem 
                  auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. 
                  Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
                </p>
              </section>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
