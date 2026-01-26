import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung | Autoglas-Rocket',
  description: 'Datenschutzerklärung von Autoglas-Rocket. Informationen zur Verarbeitung Ihrer personenbezogenen Daten und Ihren Rechten.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: '/datenschutz/',
  },
};

export default function DatenschutzPage() {
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
                <li className="text-slate-900 font-medium">Datenschutz</li>
              </ol>
            </nav>

            <h1 className="text-4xl font-bold text-slate-900 mb-8">Datenschutzerklärung</h1>

            <div className="prose prose-slate max-w-none">

              {/* Einleitung */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Datenschutz auf einen Blick</h2>
                
                <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">Allgemeine Hinweise</h3>
                <p className="text-slate-600 mb-4">
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen 
                  Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen 
                  Sie persönlich identifiziert werden können.
                </p>

                <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">Datenerfassung auf dieser Website</h3>
                <p className="text-slate-600 mb-4">
                  <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
                  Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten 
                  können Sie dem{' '}
                  <Link href="/impressum/" className="text-orange-500 hover:text-orange-600">Impressum</Link> 
                  {' '}dieser Website entnehmen.
                </p>

                <p className="text-slate-600 mb-4">
                  <strong>Wie erfassen wir Ihre Daten?</strong><br />
                  Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich 
                  z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
                </p>

                <p className="text-slate-600">
                  Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere 
                  IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder 
                  Uhrzeit des Seitenaufrufs).
                </p>
              </section>

              {/* Wichtiger Hinweis: Vermittlungsplattform */}
              <section className="mb-10">
                <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    🔔 Wichtiger Hinweis: Weitergabe an Partner-Werkstätten
                  </h2>
                  <p className="text-slate-700 mb-4">
                    <strong>Autoglas-Rocket ist eine Vermittlungsplattform.</strong> Wenn Sie über unser Kontaktformular 
                    oder telefonisch eine Anfrage für einen Scheibenwechsel stellen, werden Ihre Daten an geeignete 
                    Partner-Werkstätten in Ihrer Region weitergegeben, um Ihnen ein Angebot zu erstellen und den 
                    Service durchzuführen.
                  </p>
                  <p className="text-slate-700 mb-4">
                    <strong>Welche Daten werden weitergegeben?</strong><br />
                    Name, Telefonnummer, E-Mail-Adresse, Standort/PLZ, Fahrzeugdaten (Marke, Modell) sowie 
                    Informationen zum gewünschten Service.
                  </p>
                  <p className="text-slate-700 mb-4">
                    <strong>An wen werden die Daten weitergegeben?</strong><br />
                    An zertifizierte Autoglas-Fachbetriebe in Ihrer Region, die den Scheibenwechsel durchführen können.
                  </p>
                  <p className="text-slate-700">
                    <strong>Rechtsgrundlage:</strong><br />
                    Die Weitergabe erfolgt auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), die Sie 
                    durch das Absenden des Kontaktformulars oder durch Ihre telefonische Anfrage erteilen. Sie können 
                    diese Einwilligung jederzeit für die Zukunft widerrufen.
                  </p>
                </div>
              </section>

              {/* Verantwortliche Stelle */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Verantwortliche Stelle</h2>
                <p className="text-slate-600 mb-4">
                  Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
                </p>
                <p className="text-slate-700 mb-4">
                  <strong>Autoglas-Rocket</strong><br />
                  Hemkemeier &amp; Awad GbR<br />
                  Mühlstraße 41<br />
                  71229 Leonberg<br />
                  <br />
                  Telefon: <a href="tel:+491746768392" className="text-orange-500 hover:text-orange-600">0174 6768392</a><br />
                  E-Mail: <a href="mailto:info@autoglas-rocket.de" className="text-orange-500 hover:text-orange-600">info@autoglas-rocket.de</a>
                </p>
                <p className="text-slate-600">
                  Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit 
                  anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.
                </p>
              </section>

              {/* Speicherdauer */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Speicherdauer</h2>
                <p className="text-slate-600">
                  Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, 
                  verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. 
                  Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung 
                  widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für 
                  die Speicherung Ihrer personenbezogenen Daten haben (z.B. steuer- oder handelsrechtliche 
                  Aufbewahrungsfristen).
                </p>
              </section>

              {/* Rechte der Betroffenen */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Ihre Rechte</h2>
                
                <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">Recht auf Auskunft</h3>
                <p className="text-slate-600 mb-4">
                  Sie haben das Recht, jederzeit unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer 
                  gespeicherten personenbezogenen Daten zu erhalten (Art. 15 DSGVO).
                </p>

                <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">Recht auf Berichtigung</h3>
                <p className="text-slate-600 mb-4">
                  Sie haben das Recht, die Berichtigung unrichtiger oder die Vervollständigung Ihrer bei uns 
                  gespeicherten personenbezogenen Daten zu verlangen (Art. 16 DSGVO).
                </p>

                <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">Recht auf Löschung</h3>
                <p className="text-slate-600 mb-4">
                  Sie haben das Recht, die Löschung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen, 
                  soweit nicht die Verarbeitung zur Ausübung des Rechts auf freie Meinungsäußerung und Information, 
                  zur Erfüllung einer rechtlichen Verpflichtung, aus Gründen des öffentlichen Interesses oder zur 
                  Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen erforderlich ist (Art. 17 DSGVO).
                </p>

                <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">Recht auf Einschränkung der Verarbeitung</h3>
                <p className="text-slate-600 mb-4">
                  Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen 
                  (Art. 18 DSGVO).
                </p>

                <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">Recht auf Datenübertragbarkeit</h3>
                <p className="text-slate-600 mb-4">
                  Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines 
                  Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, 
                  maschinenlesbaren Format aushändigen zu lassen (Art. 20 DSGVO).
                </p>

                <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">Widerspruchsrecht</h3>
                <p className="text-slate-600 mb-4">
                  Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen 
                  die Verarbeitung Sie betreffender personenbezogener Daten Widerspruch einzulegen (Art. 21 DSGVO).
                </p>

                <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">Widerruf Ihrer Einwilligung</h3>
                <p className="text-slate-600 mb-4">
                  Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können 
                  eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf 
                  erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
                </p>

                <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">Beschwerderecht bei der Aufsichtsbehörde</h3>
                <p className="text-slate-600">
                  Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer 
                  Aufsichtsbehörde zu (Art. 77 DSGVO). Eine Liste der Datenschutzaufsichtsbehörden in Deutschland 
                  finden Sie unter:{' '}
                  <a 
                    href="https://www.bfdi.bund.de/DE/Service/Anschriften/Laender/Laender-node.html" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-orange-500 hover:text-orange-600"
                  >
                    www.bfdi.bund.de
                  </a>
                </p>
              </section>

              {/* Datenerfassung auf der Website */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Datenerfassung auf dieser Website</h2>
                
                <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">Kontaktformular / Terminanfrage</h3>
                <p className="text-slate-600 mb-4">
                  Wenn Sie uns per Kontaktformular oder über das Terminanfrage-Formular Anfragen zukommen lassen, 
                  werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten 
                  zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
                </p>
                <p className="text-slate-600 mb-4">
                  <strong>Erfasste Daten:</strong> Name, E-Mail-Adresse, Telefonnummer, PLZ/Ort, Fahrzeugdaten, 
                  Nachricht/Schadensbeschreibung
                </p>
                <p className="text-slate-600 mb-4">
                  <strong>Zweck:</strong> Bearbeitung Ihrer Anfrage, Vermittlung an geeignete Partner-Werkstätten, 
                  Kontaktaufnahme zur Terminvereinbarung
                </p>
                <p className="text-slate-600 mb-4">
                  <strong>Rechtsgrundlage:</strong> Die Verarbeitung erfolgt auf Grundlage Ihrer Einwilligung 
                  (Art. 6 Abs. 1 lit. a DSGVO). Sie willigen durch das Absenden des Formulars ein, dass Ihre Daten 
                  zur Bearbeitung Ihrer Anfrage und zur Vermittlung an Partner-Werkstätten verwendet werden dürfen.
                </p>
                <p className="text-slate-600">
                  <strong>Speicherdauer:</strong> Die von Ihnen eingegebenen Daten verbleiben bei uns, bis Sie uns 
                  zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die 
                  Datenspeicherung entfällt. Zwingende gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen 
                  – bleiben unberührt.
                </p>

                <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">Telefonische Anfragen</h3>
                <p className="text-slate-600 mb-4">
                  Wenn Sie uns telefonisch kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden 
                  personenbezogenen Daten (Name, Anfrage, Telefonnummer) zum Zwecke der Bearbeitung Ihres Anliegens 
                  bei uns gespeichert und verarbeitet. Diese Daten geben wir – mit Ihrer Einwilligung – an 
                  Partner-Werkstätten weiter.
                </p>
                <p className="text-slate-600">
                  <strong>Rechtsgrundlage:</strong> Die Verarbeitung erfolgt auf Grundlage Ihrer Einwilligung 
                  (Art. 6 Abs. 1 lit. a DSGVO), die Sie durch Ihren Anruf und die Mitteilung Ihrer Daten erteilen.
                </p>
              </section>

              {/* Server-Log-Files */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Server-Log-Dateien</h2>
                <p className="text-slate-600 mb-4">
                  Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten 
                  Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
                </p>
                <ul className="list-disc list-inside text-slate-600 mb-4 space-y-1">
                  <li>Browsertyp und Browserversion</li>
                  <li>verwendetes Betriebssystem</li>
                  <li>Referrer URL</li>
                  <li>Hostname des zugreifenden Rechners</li>
                  <li>Uhrzeit der Serveranfrage</li>
                  <li>IP-Adresse</li>
                </ul>
                <p className="text-slate-600 mb-4">
                  Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.
                </p>
                <p className="text-slate-600">
                  <strong>Rechtsgrundlage:</strong> Die Erfassung dieser Daten erfolgt auf Grundlage von 
                  Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der 
                  technisch fehlerfreien Darstellung und der Optimierung seiner Website.
                </p>
              </section>

              {/* Hosting */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Hosting</h2>
                <p className="text-slate-600 mb-4">
                  Diese Website wird bei <strong>Vercel Inc.</strong> gehostet. Vercel ist ein Cloud-Plattform-Anbieter 
                  mit Sitz in den USA (340 S Lemon Ave #4133, Walnut, CA 91789, USA).
                </p>
                <p className="text-slate-600 mb-4">
                  Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern von Vercel 
                  gespeichert. Hierbei kann es sich v.a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, 
                  Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.
                </p>
                <p className="text-slate-600 mb-4">
                  <strong>Rechtsgrundlage:</strong> Der Einsatz von Vercel erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. 
                  Wir haben ein berechtigtes Interesse an einer zuverlässigen und schnellen Bereitstellung unserer Website.
                </p>
                <p className="text-slate-600">
                  Weitere Informationen finden Sie in der Datenschutzerklärung von Vercel:{' '}
                  <a 
                    href="https://vercel.com/legal/privacy-policy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-orange-500 hover:text-orange-600"
                  >
                    https://vercel.com/legal/privacy-policy
                  </a>
                </p>
              </section>

              {/* Auftragsverarbeiter */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Auftragsverarbeiter und Drittanbieter</h2>
                
                <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">CRM-System zur Lead-Erfassung</h3>
                <p className="text-slate-600 mb-4">
                  Für die Erfassung und Verarbeitung von Terminanfragen nutzen wir ein externes CRM-System. Wenn Sie 
                  über unsere Website eine Terminanfrage stellen, werden Ihre Daten in diesem System erfasst und 
                  verarbeitet.
                </p>
                <p className="text-slate-600 mb-4">
                  <strong>Erfasste Daten:</strong> Name, Kontaktdaten (Telefon, E-Mail), Standort, Fahrzeugdaten, 
                  Schadensbeschreibung, Versicherungsinformationen
                </p>
                <p className="text-slate-600 mb-4">
                  <strong>Zweck:</strong> Verwaltung von Kundenanfragen, Vermittlung an Partner-Werkstätten, 
                  Terminkoordination, Nachverfolgung
                </p>
                <p className="text-slate-600">
                  <strong>Rechtsgrundlage:</strong> Die Verarbeitung erfolgt auf Grundlage Ihrer Einwilligung 
                  (Art. 6 Abs. 1 lit. a DSGVO), die Sie durch das Absenden des Anfrage-Formulars erteilen.
                </p>

                <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">Partner-Werkstätten</h3>
                <p className="text-slate-600 mb-4">
                  Zur Durchführung der von Ihnen angefragten Dienstleistungen geben wir Ihre Daten an qualifizierte 
                  Partner-Werkstätten in Ihrer Region weiter. Diese Partner sind eigenständige Unternehmen, die den 
                  Scheibenwechsel oder die Reparatur durchführen.
                </p>
                <p className="text-slate-600">
                  <strong>Rechtsgrundlage:</strong> Die Weitergabe erfolgt auf Grundlage Ihrer Einwilligung 
                  (Art. 6 Abs. 1 lit. a DSGVO). Sie können diese Einwilligung jederzeit mit Wirkung für die 
                  Zukunft widerrufen.
                </p>
              </section>

              {/* Drittlandübermittlung */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Datenübermittlung in Drittländer</h2>
                <p className="text-slate-600 mb-4">
                  Wir setzen Dienstleister ein, die ihren Sitz in den USA haben (insbesondere Vercel für das Hosting). 
                  Die USA gelten als Drittland im Sinne der DSGVO.
                </p>
                <p className="text-slate-600 mb-4">
                  <strong>EU-US Data Privacy Framework:</strong> Die von uns eingesetzten US-Dienstleister sind unter 
                  dem EU-US Data Privacy Framework zertifiziert. Dieses Abkommen zwischen der EU und den USA stellt 
                  sicher, dass ein angemessenes Datenschutzniveau gewährleistet ist (Angemessenheitsbeschluss der 
                  EU-Kommission vom 10. Juli 2023).
                </p>
                <p className="text-slate-600">
                  Weitere Informationen zum EU-US Data Privacy Framework finden Sie unter:{' '}
                  <a 
                    href="https://www.dataprivacyframework.gov/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-orange-500 hover:text-orange-600"
                  >
                    https://www.dataprivacyframework.gov
                  </a>
                </p>
              </section>

              {/* Schriftarten */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Schriftarten (Google Fonts)</h2>
                <p className="text-slate-600 mb-4">
                  Diese Website verwendet Schriftarten von Google (Google Fonts). Die Schriftarten werden jedoch 
                  <strong> lokal auf unserem Server gehostet</strong> und nicht von Google-Servern geladen.
                </p>
                <p className="text-slate-600 mb-4">
                  Das bedeutet: <strong>Es findet keine Verbindung zu Google-Servern statt</strong>, wenn Sie unsere 
                  Website besuchen. Ihre IP-Adresse wird nicht an Google übermittelt. Die Schriftarten werden 
                  ausschließlich von unseren eigenen Servern (bzw. denen unseres Hosters Vercel) ausgeliefert.
                </p>
                <p className="text-slate-600">
                  <strong>Rechtsgrundlage:</strong> Da keine Datenübertragung an Google stattfindet, ist keine 
                  gesonderte Rechtsgrundlage für Google Fonts erforderlich.
                </p>
              </section>

              {/* SSL/TLS */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">11. SSL- bzw. TLS-Verschlüsselung</h2>
                <p className="text-slate-600 mb-4">
                  Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, 
                  wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine 
                  SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die 
                  Adresszeile des Browsers von „http://" auf „https://" wechselt und an dem Schloss-Symbol in 
                  Ihrer Browserzeile.
                </p>
                <p className="text-slate-600">
                  Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, 
                  nicht von Dritten mitgelesen werden.
                </p>
              </section>

              {/* Cookies */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">12. Cookies</h2>
                <p className="text-slate-600 mb-4">
                  Unsere Internetseiten verwenden so genannte „Cookies". Cookies sind kleine Datenpakete und richten 
                  auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung 
                  (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert.
                </p>
                <p className="text-slate-600 mb-4">
                  Session-Cookies werden nach Ende Ihres Besuchs automatisch gelöscht. Permanente Cookies bleiben auf 
                  Ihrem Endgerät gespeichert, bis Sie diese selbst löschen oder eine automatische Löschung durch Ihren 
                  Webbrowser erfolgt.
                </p>
                <p className="text-slate-600 mb-4">
                  <strong>Technisch notwendige Cookies:</strong> Diese sind erforderlich, um Ihnen grundlegende 
                  Funktionen der Website bereitzustellen. Sie können in Ihrem Browser die Einstellung so ändern, 
                  dass Cookies nicht gespeichert werden. Bitte beachten Sie, dass dann ggf. nicht alle Funktionen 
                  dieser Seite in vollem Umfang nutzbar sind.
                </p>
                <p className="text-slate-600">
                  <strong>Rechtsgrundlage:</strong> Soweit Cookies für die Bereitstellung unserer Website technisch 
                  erforderlich sind, ist Art. 6 Abs. 1 lit. f DSGVO unsere Rechtsgrundlage. Für alle anderen Cookies 
                  holen wir Ihre Einwilligung ein (Art. 6 Abs. 1 lit. a DSGVO).
                </p>
              </section>

              {/* Änderungen */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">13. Änderungen dieser Datenschutzerklärung</h2>
                <p className="text-slate-600 mb-4">
                  Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen 
                  rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der 
                  Datenschutzerklärung umzusetzen.
                </p>
                <p className="text-slate-600">
                  Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.
                </p>
              </section>

              {/* Stand */}
              <section className="mb-10 pt-8 border-t border-slate-200">
                <p className="text-slate-500 text-sm">
                  Stand: Januar 2026
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
