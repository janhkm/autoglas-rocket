/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://autoglas-rocket.de',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
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
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/termin-anfragen', '/_next/'],
      },
    ],
  },
  // Die dynamischen Routen werden automatisch von Next.js generateStaticParams erfasst
  // Für erweiterte Sitemap-Generierung: npm run seo:sitemap
};
