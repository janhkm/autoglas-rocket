/** @type {import('next-sitemap').IConfig} */
// HINWEIS: Diese Config wird NICHT aktiv genutzt.
// Sitemaps werden von scripts/generate-sitemaps.ts generiert (npm run sitemap / postbuild).
// robots.txt wird manuell in public/robots.txt gepflegt.
// generateRobotsTxt und generateIndexSitemap sind deaktiviert,
// damit ein versehentliches `npx next-sitemap` nichts überschreibt.
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://autoglas-rocket.de',
  generateRobotsTxt: false,
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: [
    '/api/*',
    '/termin-anfragen',
    '/danke',
    '/404',
    '/500',
  ],
};
