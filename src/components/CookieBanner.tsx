'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const COOKIE_CONSENT_KEY = 'cookie-consent-accepted';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Prüfe, ob bereits zugestimmt wurde
    const hasConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!hasConsent) {
      // Kurze Verzögerung für bessere UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-white border-t border-slate-200 shadow-lg"
      role="dialog"
      aria-label="Cookie-Hinweis"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900 mb-1">
              🍪 Cookie-Hinweis
            </h3>
            <p className="text-slate-600 text-sm md:text-base">
              Diese Website verwendet ausschließlich technisch notwendige Cookies, die für den Betrieb 
              der Website erforderlich sind. Es werden keine Tracking- oder Marketing-Cookies eingesetzt.{' '}
              <Link 
                href="/datenschutz/" 
                className="text-orange-500 hover:text-orange-600 underline"
              >
                Mehr erfahren
              </Link>
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link
              href="/datenschutz/"
              className="px-4 py-2 text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors"
            >
              Datenschutz
            </Link>
            <button
              onClick={handleAccept}
              className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-lg shadow-md transition-all"
            >
              Verstanden
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
