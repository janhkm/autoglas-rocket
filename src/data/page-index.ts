/**
 * Page Index - Lightweight data structure for generateStaticParams()
 * 
 * This is the "thin" tier of the Two-Tier Data Model.
 * Contains only the minimal data needed for:
 * - Generating static params (slugs)
 * - Priority-based filtering
 * - Type identification
 * 
 * Full data is loaded on-demand via data-layer.ts
 */

export type PageType = 'location' | 'service-location' | 'vehicle';

export interface PageIndex {
  slug: string;
  type: PageType;
  priority: number;
}

// Import from existing data sources
import { locations } from './locations';
import { mainServices } from './services';
import { getPopularVehicleCombinations } from './vehicles';

/**
 * Generate the page index from existing data sources
 * This is computed once at build time
 */
function generatePageIndex(): PageIndex[] {
  const index: PageIndex[] = [];
  
  // T1: Location pages
  for (const location of locations) {
    index.push({
      slug: `autoglas-${location.slug}`,
      type: 'location',
      priority: location.priority || 1,
    });
  }
  
  // T2: Service-Location combinations (only important locations)
  const importantLocations = locations.filter(loc => 
    loc.type === 'kreisfreie-stadt' || 
    loc.type === 'bundesland' ||
    (loc.priority && loc.priority >= 7)
  );
  
  for (const service of mainServices) {
    for (const location of importantLocations) {
      index.push({
        slug: `${service.slug}-${location.slug}`,
        type: 'service-location',
        priority: location.priority || 5,
      });
    }
  }
  
  // T3: Vehicle pages (popular only)
  for (const { brand, model } of getPopularVehicleCombinations()) {
    index.push({
      slug: `scheibenwechsel-${brand}-${model}`,
      type: 'vehicle',
      priority: 6, // Default priority for popular vehicles
    });
  }
  
  return index;
}

// Export the pre-computed index
export const pageIndex = generatePageIndex();

/**
 * Get all slugs for generateStaticParams
 */
export function getAllPageSlugs(): string[] {
  return pageIndex.map(p => p.slug);
}

/**
 * Get slugs filtered by type
 */
export function getPageSlugsByType(type: PageType): string[] {
  return pageIndex.filter(p => p.type === type).map(p => p.slug);
}

/**
 * Get slugs filtered by minimum priority
 */
export function getPageSlugsByPriority(minPriority: number): string[] {
  return pageIndex.filter(p => p.priority >= minPriority).map(p => p.slug);
}

/**
 * Get page info by slug
 */
export function getPageInfo(slug: string): PageIndex | undefined {
  return pageIndex.find(p => p.slug === slug);
}

/**
 * Get total page count
 */
export function getPageCount(): { total: number; byType: Record<PageType, number> } {
  const byType: Record<PageType, number> = {
    'location': 0,
    'service-location': 0,
    'vehicle': 0,
  };
  
  for (const page of pageIndex) {
    byType[page.type]++;
  }
  
  return {
    total: pageIndex.length,
    byType,
  };
}
