/**
 * Redirect Configuration for pSEO
 * 
 * Manages URL redirects for:
 * - Legacy URLs to new structure
 * - Renamed locations
 * - Merged pages
 * 
 * All redirects are permanent (301) by default for SEO link equity preservation.
 */

export interface Redirect {
  source: string;
  destination: string;
  permanent: boolean;
}

/**
 * Active redirects
 * Add new redirects here when URLs change
 */
export const redirects: Redirect[] = [
  // Example redirects (uncomment and modify as needed):
  
  // Legacy URL patterns
  // { source: '/windschutzscheibe-wechseln/:slug', destination: '/scheibenwechsel-:slug/', permanent: true },
  // { source: '/glasreparatur/:slug', destination: '/autoglas-:slug/', permanent: true },
  
  // Renamed locations
  // { source: '/autoglas-muenchen-alt/', destination: '/autoglas-muenchen/', permanent: true },
  
  // Merged pages
  // { source: '/autoglas-stadtteil-removed/', destination: '/autoglas-parent-city/', permanent: true },
];

/**
 * Get all redirects for Next.js config
 */
export function getRedirects(): Redirect[] {
  return redirects;
}

/**
 * Add a redirect programmatically (for scripts)
 */
export function addRedirect(source: string, destination: string, permanent: boolean = true): void {
  redirects.push({ source, destination, permanent });
}
