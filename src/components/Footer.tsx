import Link from 'next/link';
import { getFooterLinks } from '@/lib/internal-links';

export default function Footer() {
  const footerLinks = getFooterLinks();

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🚀</span>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-red-400 text-transparent bg-clip-text">
                Autoglas-Rocket
              </span>
            </Link>
            <p className="text-slate-400 mb-4">
              Der schnellste mobile Autoglas-Service – direkt bei Ihnen vor Ort, deutschlandweit.
            </p>
            <div className="space-y-2 text-slate-400">
              <a href="tel:+491746768392" className="flex items-center gap-2 hover:text-orange-400 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                0174 6768392
              </a>
              <a href="mailto:info@autoglas-rocket.de" className="flex items-center gap-2 hover:text-orange-400 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@autoglas-rocket.de
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Leistungen</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-slate-400 hover:text-orange-400 transition-colors"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bundesländer */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Bundesländer</h4>
            <ul className="space-y-2">
              {footerLinks.bundeslaender.slice(0, 6).map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-slate-400 hover:text-orange-400 transition-colors"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Cities */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Top Städte</h4>
            <ul className="space-y-2">
              {footerLinks.topCities.slice(0, 6).map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-slate-400 hover:text-orange-400 transition-colors"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Vehicles Row */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <h4 className="font-semibold text-lg mb-4">Beliebte Fahrzeuge</h4>
          <div className="flex flex-wrap gap-3">
            {footerLinks.vehicles.map((link, index) => (
              <Link 
                key={index}
                href={link.href}
                className="text-slate-400 hover:text-orange-400 transition-colors text-sm"
              >
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-slate-800 bg-slate-900/50">
        <div className="container mx-auto px-4 py-4">
          <p className="text-xs text-slate-500 leading-relaxed">
            <span className="font-semibold text-slate-400">* Teilkasko:</span> Die Kostenübernahme für Glasschäden durch die Teilkaskoversicherung ist abhängig von Ihrem individuellen Versicherungstarif und den vereinbarten Leistungen. Die Höhe der Selbstbeteiligung richtet sich nach Ihrem Versicherungsvertrag. Wir empfehlen, die genauen Konditionen vorab mit Ihrer Versicherung zu klären. Gerne unterstützen wir Sie bei der Abwicklung mit Ihrem Versicherer.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <p>© {new Date().getFullYear()} Autoglas-Rocket. Alle Rechte vorbehalten.</p>
            <div className="flex gap-6">
              <Link href="/impressum/" className="hover:text-orange-400 transition-colors">
                Impressum
              </Link>
              <Link href="/datenschutz/" className="hover:text-orange-400 transition-colors">
                Datenschutz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
