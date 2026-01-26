'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from './ui/Button';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center" title="Autoglas-Rocket Startseite">
            <Image
              src="/autoglas-rocket-logo.png"
              alt="Autoglas-Rocket Logo - Mobiler Scheibenwechsel Service für Front- und Heckscheiben deutschlandweit"
              width={240}
              height={240}
              className="h-16 md:h-20 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/scheibenwechsel-berlin/" className="text-slate-600 hover:text-orange-500 font-medium transition-colors">
              Scheibenwechsel
            </Link>
            <Link href="/einsatzgebiete/" className="text-slate-600 hover:text-orange-500 font-medium transition-colors">
              Einsatzgebiete
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <a href="tel:+491746768392" className="text-slate-600 hover:text-orange-500 font-medium">
              📞 0174 6768392
            </a>
            <a href="https://crm.autoglas-profis.de/sources/91c71989-afcf-4830-99b1-93e3e7a47998" target="_blank" rel="noopener noreferrer">
              <Button size="sm">Termin anfragen</Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menü öffnen"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-100">
            <nav className="flex flex-col gap-4">
              <Link 
                href="/scheibenwechsel-berlin/" 
                className="text-slate-600 hover:text-orange-500 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Scheibenwechsel
              </Link>
              <Link 
                href="/einsatzgebiete/" 
                className="text-slate-600 hover:text-orange-500 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Einsatzgebiete
              </Link>
              <div className="pt-4 border-t border-slate-100">
                <a href="tel:+491746768392" className="block text-orange-500 font-bold text-lg mb-4">
                  📞 0174 6768392
                </a>
                <a href="https://crm.autoglas-profis.de/sources/91c71989-afcf-4830-99b1-93e3e7a47998" target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full">Termin anfragen</Button>
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
