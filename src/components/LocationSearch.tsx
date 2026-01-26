'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Location, LocationType } from '@/data/locations';

interface LocationSearchProps {
  locations: Location[];
  placeholder?: string;
  className?: string;
}

// Typ-Label für die Anzeige
function getTypeLabel(type: LocationType): string {
  const labels: Record<LocationType, string> = {
    'bundesland': 'Bundesland',
    'regierungsbezirk': 'Regierungsbezirk',
    'landkreis': 'Landkreis',
    'kreisfreie-stadt': 'Stadt',
    'gemeinde': 'Stadt',
    'stadtbezirk': 'Bezirk',
    'stadtteil': 'Stadtteil'
  };
  return labels[type];
}

// Typ-Farbe für Badges
function getTypeBadgeColor(type: LocationType): string {
  const colors: Record<LocationType, string> = {
    'bundesland': 'bg-blue-100 text-blue-800',
    'regierungsbezirk': 'bg-purple-100 text-purple-800',
    'landkreis': 'bg-gray-100 text-gray-800',
    'kreisfreie-stadt': 'bg-green-100 text-green-800',
    'gemeinde': 'bg-emerald-100 text-emerald-800',
    'stadtbezirk': 'bg-orange-100 text-orange-800',
    'stadtteil': 'bg-yellow-100 text-yellow-800'
  };
  return colors[type];
}

export default function LocationSearch({ 
  locations, 
  placeholder = 'Stadt, Bezirk oder PLZ eingeben...',
  className = ''
}: LocationSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Location[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Suche ausführen
  const search = useCallback((searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const normalizedQuery = searchQuery.toLowerCase().trim();
    
    // Nach Name und PLZ suchen
    const filtered = locations
      .filter(location => {
        // Name-Match
        const nameMatch = location.name.toLowerCase().includes(normalizedQuery);
        
        // PLZ-Match
        const plzMatch = location.plz?.some(plz => plz.startsWith(normalizedQuery));
        
        return nameMatch || plzMatch;
      })
      // Nach Priorität und Population sortieren
      .sort((a, b) => {
        // Exakter Match zuerst
        const aExact = a.name.toLowerCase() === normalizedQuery;
        const bExact = b.name.toLowerCase() === normalizedQuery;
        if (aExact && !bExact) return -1;
        if (!aExact && bExact) return 1;
        
        // Starts with zuerst
        const aStarts = a.name.toLowerCase().startsWith(normalizedQuery);
        const bStarts = b.name.toLowerCase().startsWith(normalizedQuery);
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
        
        // Nach Priorität
        const priorityDiff = (b.priority || 0) - (a.priority || 0);
        if (priorityDiff !== 0) return priorityDiff;
        
        // Nach Population
        return (b.population || 0) - (a.population || 0);
      })
      .slice(0, 10); // Max 10 Ergebnisse
    
    setResults(filtered);
    setIsOpen(filtered.length > 0);
    setSelectedIndex(0);
  }, [locations]);

  // Debounced Search
  useEffect(() => {
    const timer = setTimeout(() => {
      search(query);
    }, 150);

    return () => clearTimeout(timer);
  }, [query, search]);

  // Keyboard Navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (results[selectedIndex]) {
          navigateToLocation(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  // Zur Location navigieren
  const navigateToLocation = (location: Location) => {
    setIsOpen(false);
    setQuery('');
    router.push(`/autoglas-${location.slug}/`);
  };

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        resultsRef.current && 
        !resultsRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll selected item into view
  useEffect(() => {
    if (isOpen && resultsRef.current) {
      const selectedItem = resultsRef.current.children[selectedIndex] as HTMLElement;
      if (selectedItem) {
        selectedItem.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex, isOpen]);

  return (
    <div className={`relative w-full max-w-2xl mx-auto ${className}`}>
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg 
            className="h-5 w-5 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>
        
        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length >= 2 && results.length > 0 && setIsOpen(true)}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all duration-200 shadow-sm hover:shadow-md"
          aria-label="Standort suchen"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          role="combobox"
        />
        
        {/* Clear Button */}
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setResults([]);
              setIsOpen(false);
              inputRef.current?.focus();
            }}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
            aria-label="Suche löschen"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div 
          ref={resultsRef}
          className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-96 overflow-y-auto"
          role="listbox"
        >
          {results.map((location, index) => (
            <button
              key={location.slug}
              onClick={() => navigateToLocation(location)}
              onMouseEnter={() => setSelectedIndex(index)}
              className={`w-full px-4 py-3 flex items-center justify-between text-left transition-colors ${
                index === selectedIndex 
                  ? 'bg-orange-50 text-orange-900' 
                  : 'hover:bg-gray-50'
              } ${index === 0 ? 'rounded-t-xl' : ''} ${index === results.length - 1 ? 'rounded-b-xl' : ''}`}
              role="option"
              aria-selected={index === selectedIndex}
            >
              <div className="flex items-center gap-3">
                {/* Grüner Haken mit Animation */}
                <div 
                  className="flex-shrink-0 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center animate-scale-in shadow-sm"
                  style={{ 
                    animationDelay: `${index * 50}ms`,
                    animationFillMode: 'backwards'
                  }}
                >
                  <svg 
                    className="w-4 h-4 text-white animate-checkmark" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    style={{ animationDelay: `${index * 50 + 100}ms` }}
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={3} 
                      d="M5 13l4 4L19 7" 
                    />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900">{location.name}</span>
                  {location.plz && location.plz.length > 0 && (
                    <span className="text-sm text-gray-500">
                      PLZ: {location.plz.slice(0, 3).join(', ')}{location.plz.length > 3 ? '...' : ''}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium hidden sm:inline-flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Einsatzgebiet
                </span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getTypeBadgeColor(location.type)}`}>
                  {getTypeLabel(location.type)}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No Results */}
      {isOpen && query.length >= 2 && results.length === 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl p-4 text-center">
          <p className="text-gray-500">Kein Einsatzgebiet gefunden für &quot;{query}&quot;</p>
          <p className="text-sm text-gray-400 mt-1">Versuchen Sie einen anderen Suchbegriff</p>
        </div>
      )}
    </div>
  );
}
