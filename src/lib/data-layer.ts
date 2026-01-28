/**
 * Centralized Data Access Layer for pSEO
 * 
 * This module provides a unified API for accessing all data sources:
 * - Locations
 * - Services
 * - Vehicles
 * 
 * It also handles slug parsing and page type detection.
 */

import { 
  Location, 
  getLocationBySlug as getLocationFromData,
  getAllLocationSlugs as getAllLocationSlugsFromData,
  getLocationHierarchy as getLocationHierarchyFromData,
  getLocationsByType as getLocationsByTypeFromData,
  LocationType
} from '@/data/locations';

import { 
  Service, 
  getServiceBySlug as getServiceFromData,
  getAllServiceSlugs as getAllServiceSlugsFromData,
  mainServices
} from '@/data/services';

import { 
  VehicleBrand, 
  VehicleModel,
  getBrandBySlug as getBrandFromData,
  getModelBySlug as getModelFromData,
  brands,
  getPopularVehicleCombinations
} from '@/data/vehicles';

// Re-export types
export type { Location, LocationType } from '@/data/locations';
export type { Service } from '@/data/services';
export type { VehicleBrand, VehicleModel } from '@/data/vehicles';

// ============================================
// Page Type Detection
// ============================================

export type PageType = 'location' | 'service-location' | 'vehicle' | 'unknown';

export interface ParsedSlug {
  type: PageType;
  locationSlug?: string;
  serviceSlug?: string;
  brandSlug?: string;
  modelSlug?: string;
}

/**
 * Parse a slug to determine page type and extract parameters
 */
export function parseSlug(slug: string): ParsedSlug {
  // T1: Location pages - /autoglas-[standort]/
  if (slug.startsWith('autoglas-')) {
    const locationSlug = slug.replace('autoglas-', '');
    const location = getLocationFromData(locationSlug);
    if (location) {
      return { type: 'location', locationSlug };
    }
  }

  // T3: Vehicle pages - /scheibenwechsel-[marke]-[modell]/
  if (slug.startsWith('scheibenwechsel-')) {
    const rest = slug.replace('scheibenwechsel-', '');
    
    // Try to match brand-model pattern
    for (const brand of brands) {
      if (rest.startsWith(brand.slug + '-')) {
        const modelSlug = rest.slice(brand.slug.length + 1);
        const model = getModelFromData(brand.slug, modelSlug);
        if (model) {
          return { type: 'vehicle', brandSlug: brand.slug, modelSlug };
        }
      }
    }
    
    // If no brand-model match, try as service-location
    const location = getLocationFromData(rest);
    if (location) {
      return { type: 'service-location', serviceSlug: 'scheibenwechsel', locationSlug: rest };
    }
  }

  // T2: Service-Location combinations - /[service]-[standort]/
  for (const service of mainServices) {
    if (slug.startsWith(service.slug + '-')) {
      const locationSlug = slug.slice(service.slug.length + 1);
      const location = getLocationFromData(locationSlug);
      if (location) {
        return { type: 'service-location', serviceSlug: service.slug, locationSlug };
      }
    }
  }

  return { type: 'unknown' };
}

// ============================================
// Location Data Access
// ============================================

export function getLocationData(slug: string): Location | null {
  return getLocationFromData(slug) || null;
}

export function getAllLocationSlugs(): string[] {
  return getAllLocationSlugsFromData();
}

export function getLocationHierarchy(slug: string): Location[] {
  return getLocationHierarchyFromData(slug);
}

export function getLocationsByType(type: LocationType): Location[] {
  return getLocationsByTypeFromData(type);
}

/**
 * Get canonical path for a location
 * Uses location.canonicalPath if set, otherwise generates from slug
 */
export function getLocationCanonicalPath(location: Location): string {
  return location.canonicalPath || `/autoglas-${location.slug}/`;
}

/**
 * Get Wikidata sameAs URL if wikidataId is set
 */
export function getLocationSameAs(location: Location): string | undefined {
  return location.wikidataId 
    ? `https://www.wikidata.org/wiki/${location.wikidataId}`
    : undefined;
}

// ============================================
// Service Data Access
// ============================================

export function getServiceData(slug: string): Service | null {
  return getServiceFromData(slug) || null;
}

export function getAllServiceSlugs(): string[] {
  return getAllServiceSlugsFromData();
}

// ============================================
// Vehicle Data Access
// ============================================

export function getBrandData(slug: string): VehicleBrand | null {
  return getBrandFromData(slug) || null;
}

export function getModelData(brandSlug: string, modelSlug: string): VehicleModel | null {
  return getModelFromData(brandSlug, modelSlug) || null;
}

export function getVehicleData(brandSlug: string, modelSlug: string): { brand: VehicleBrand; model: VehicleModel } | null {
  const brand = getBrandFromData(brandSlug);
  const model = getModelFromData(brandSlug, modelSlug);
  
  if (!brand || !model) return null;
  
  return { brand, model };
}

export function getPopularVehicles(): { brand: string; model: string }[] {
  return getPopularVehicleCombinations();
}

// ============================================
// Unified Slug Generation
// ============================================

export interface AllSlugsResult {
  locations: string[];
  serviceLocations: string[];
  vehicles: string[];
  total: number;
}

/**
 * Get all slugs for all page types
 * Used by generateStaticParams and sitemap generation
 */
export function getAllSlugs(): AllSlugsResult {
  const locations = getAllLocationSlugsFromData().map(s => `autoglas-${s}`);
  
  // Service-Location combinations (only important locations)
  const importantLocations = getLocationsByTypeFromData('kreisfreie-stadt')
    .concat(getLocationsByTypeFromData('bundesland'))
    .filter(loc => loc.priority && loc.priority >= 7);
  
  const serviceLocations: string[] = [];
  for (const service of mainServices) {
    for (const location of importantLocations) {
      serviceLocations.push(`${service.slug}-${location.slug}`);
    }
  }
  
  // Vehicle pages
  const vehicles = getPopularVehicleCombinations()
    .map(({ brand, model }) => `scheibenwechsel-${brand}-${model}`);
  
  return {
    locations,
    serviceLocations,
    vehicles,
    total: locations.length + serviceLocations.length + vehicles.length,
  };
}

// ============================================
// Build Date for dateModified
// ============================================

/**
 * Get the build date for use in schema dateModified
 * Uses BUILD_DATE env var if set, otherwise falls back to a fixed date
 */
export function getBuildDate(): string {
  return process.env.BUILD_DATE || '2026-01-28';
}

/**
 * Get dateModified for a location
 * Uses location.lastModified if set, otherwise returns build date
 */
export function getLocationDateModified(location: Location): string {
  return location.lastModified || getBuildDate();
}
