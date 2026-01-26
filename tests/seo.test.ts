/**
 * SEO Compliance Tests
 * Diese Tests prüfen die Einhaltung der PRD-SEO-Anforderungen
 * 
 * Ausführen mit: npm test
 */

import { describe, test, expect } from '@jest/globals';
import { 
  locations, 
  getLocationBySlug, 
  getChildLocations, 
  getAllLocationSlugs,
  getLocationsByType,
  getLocationHierarchy,
  getLocationStats
} from '../src/data/locations';
import { mainServices, getServiceBySlug, getAllServiceSlugs } from '../src/data/services';
import { brands, models, getPopularVehicleCombinations, getBrandBySlug, getModelBySlug } from '../src/data/vehicles';
import { 
  generateCityIntro, 
  generateMetaDescription,
  generateFaqs,
  generateInsuranceText,
  generateProcessSteps,
  pickFromPool,
  synonymPools
} from '../src/lib/content-generator';
import {
  generateLocalBusinessSchema,
  generateServiceSchema,
  generateFAQSchema
} from '../src/lib/schema';
import { getAllInternalLinks, getSiblingLocationLinks, getChildLocationLinks } from '../src/lib/internal-links';

describe('SEO Compliance Tests', () => {
  
  // ==============================================
  // PRD Requirement: >500 indexierbare Seiten
  // ==============================================
  describe('Indexierbare Seiten', () => {
    test('sollte mindestens 500 Seiten generieren', () => {
      const links = getAllInternalLinks();
      const total = links.locationPages.length + links.servicePages.length + links.vehiclePages.length + 1;
      expect(total).toBeGreaterThanOrEqual(500);
    });

    test('sollte alle Standorte als Seiten haben', () => {
      const links = getAllInternalLinks();
      expect(links.locationPages.length).toBe(locations.length);
    });
  });

  // ==============================================
  // Hierarchie-Struktur
  // ==============================================
  describe('Hierarchie-Struktur', () => {
    test('sollte 16 Bundesländer haben', () => {
      const bundeslaender = getLocationsByType('bundesland');
      expect(bundeslaender.length).toBe(16);
    });

    test('alle Parent-Referenzen sollten gültig sein', () => {
      locations.forEach(loc => {
        if (loc.parentSlug) {
          const parent = getLocationBySlug(loc.parentSlug);
          expect(parent).toBeDefined();
        }
      });
    });

    test('Hierarchie sollte korrekt aufgelöst werden', () => {
      // Test: Berlin → Mitte → Wedding
      const wedding = getLocationBySlug('berlin-wedding');
      if (wedding) {
        const hierarchy = getLocationHierarchy('berlin-wedding');
        expect(hierarchy.length).toBeGreaterThanOrEqual(2);
        expect(hierarchy[0].type).toBe('bundesland');
      }
    });

    test('Kinder sollten korrekt gefunden werden', () => {
      const berlinChildren = getChildLocations('berlin');
      expect(berlinChildren.length).toBeGreaterThan(0);
      berlinChildren.forEach(child => {
        expect(child.parentSlug).toBe('berlin');
      });
    });
  });

  // ==============================================
  // PRD Requirement: Duplicate Content Vermeidung
  // ==============================================
  describe('Duplicate Content Vermeidung', () => {
    test('Intros sollten für verschiedene Standorte variieren', () => {
      const intros = new Set<string>();
      const slugs = getAllLocationSlugs().slice(0, 10);
      
      slugs.forEach(slug => {
        const location = getLocationBySlug(slug);
        if (location) {
          const intro = generateCityIntro(location.name, slug);
          intros.add(intro);
        }
      });

      expect(intros.size).toBeGreaterThanOrEqual(slugs.length * 0.7);
    });

    test('Meta Descriptions sollten einzigartig sein', () => {
      const descriptions = new Set<string>();
      const slugs = getAllLocationSlugs().slice(0, 10);
      
      slugs.forEach(slug => {
        const location = getLocationBySlug(slug);
        if (location) {
          const desc = generateMetaDescription('city', { city: location.name }, slug);
          descriptions.add(desc);
        }
      });

      expect(descriptions.size).toBeGreaterThanOrEqual(slugs.length * 0.9);
    });
  });

  // ==============================================
  // PRD Requirement: URL-Pattern Konformität
  // ==============================================
  describe('URL-Patterns', () => {
    test('Standortseiten-URLs sollten dem Pattern /autoglas-[standort]/ entsprechen', () => {
      const links = getAllInternalLinks();
      links.locationPages.forEach(url => {
        expect(url).toMatch(/^\/autoglas-[a-z0-9-]+\/$/);
      });
    });

    test('Service-Seiten-URLs sollten dem Pattern /[service]-[standort]/ entsprechen', () => {
      const links = getAllInternalLinks();
      links.servicePages.forEach(url => {
        expect(url).toMatch(/^\/[a-z-]+-[a-z0-9-]+\/$/);
      });
    });

    test('Fahrzeug-URLs sollten dem Pattern /scheibenwechsel-[marke]-[modell]/ entsprechen', () => {
      const links = getAllInternalLinks();
      links.vehiclePages.forEach(url => {
        expect(url).toMatch(/^\/scheibenwechsel-[a-z0-9-]+-[a-z0-9-]+\/$/);
      });
    });
  });

  // ==============================================
  // PRD Requirement: Interne Verlinkung
  // ==============================================
  describe('Interne Verlinkung', () => {
    test('Städte sollten Stadtteile als Kinder haben', () => {
      const muenchen = getLocationBySlug('muenchen');
      expect(muenchen).toBeDefined();
      
      const children = getChildLocations('muenchen');
      expect(children.length).toBeGreaterThan(0);
    });

    test('getSiblingLocationLinks sollte Geschwister zurückgeben', () => {
      const links = getSiblingLocationLinks('muenchen', 5);
      expect(links.length).toBeGreaterThan(0);
      links.forEach(link => {
        expect(link.href).toMatch(/^\/autoglas-[a-z0-9-]+\/$/);
      });
    });

    test('getChildLocationLinks sollte Kind-Links zurückgeben', () => {
      const links = getChildLocationLinks('berlin', 5);
      expect(links.length).toBeGreaterThan(0);
    });
  });

  // ==============================================
  // PRD Requirement: Schema.org Markup
  // ==============================================
  describe('Schema.org Markup', () => {
    test('AutoRepair Schema sollte vollständig sein', () => {
      const location = locations.find(l => l.type === 'kreisfreie-stadt');
      expect(location).toBeDefined();
      
      const schema = generateLocalBusinessSchema(location!);

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('AutoRepair');
      expect(schema.name).toContain(location!.name);
      expect(schema.telephone).toBeDefined();
      expect(schema.address).toBeDefined();
      expect(schema.openingHoursSpecification).toBeDefined();
      expect(schema.aggregateRating).toBeDefined();
      expect(schema.review).toBeDefined();
      expect(schema.review!.length).toBeGreaterThan(0);
    });

    test('Service Schema sollte vollständig sein', () => {
      const service = mainServices[0];
      const location = locations.find(l => l.type === 'kreisfreie-stadt');
      const schema = generateServiceSchema(service, location);

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('Service');
      expect(schema.provider).toBeDefined();
    });
  });

  // ==============================================
  // Datenqualität
  // ==============================================
  describe('Datenqualität', () => {
    test('kreisfreie Städte sollten Koordinaten haben', () => {
      const staedte = getLocationsByType('kreisfreie-stadt');
      const mitCoords = staedte.filter(s => s.coordinates);
      expect(mitCoords.length).toBe(staedte.length);
    });

    test('alle Services sollten Keywords haben', () => {
      mainServices.forEach(service => {
        expect(service.keywords).toBeDefined();
        expect(service.keywords.length).toBeGreaterThanOrEqual(3);
      });
    });

    test('beliebte Fahrzeuge sollten existieren', () => {
      const popular = getPopularVehicleCombinations();
      expect(popular.length).toBeGreaterThan(30);
    });

    test('alle Modelle sollten gültige Marken referenzieren', () => {
      models.forEach(model => {
        const brand = getBrandBySlug(model.brandSlug);
        expect(brand).toBeDefined();
      });
    });
  });

  // ==============================================
  // Statistiken
  // ==============================================
  describe('Statistiken', () => {
    test('getLocationStats sollte korrekte Zahlen liefern', () => {
      const stats = getLocationStats();
      
      expect(stats.bundesland).toBe(16);
      expect(stats['kreisfreie-stadt']).toBeGreaterThan(0);
    });
  });
});
