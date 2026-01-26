import type { Metadata } from 'next';
import { DM_Sans, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { generateOrganizationSchema, schemaToJsonLd } from '@/lib/schema';
import CookieBanner from '@/components/CookieBanner';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const siteUrl = process.env.SITE_URL || 'https://autoglas-rocket.de';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Autoglas-Rocket – Mobiler Scheibenwechsel Service | Front- & Heckscheibe',
    template: '%s | Autoglas-Rocket',
  },
  description: 'Professioneller Scheibenwechsel deutschlandweit. Front- & Heckscheibe wechseln mit Teilkasko*. Mobiler Service direkt vor Ort. Jetzt Termin buchen!',
  keywords: [
    'scheibenwechsel',
    'frontscheibe wechseln',
    'heckscheibe wechseln',
    'windschutzscheibe austauschen',
    'mobiler autoglas service',
    'autoglas service',
    'scheibenwechsel kosten',
    'autoscheibe wechseln',
  ],
  authors: [{ name: 'Autoglas-Rocket' }],
  creator: 'Autoglas-Rocket',
  publisher: 'Autoglas-Rocket',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'icon', url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'icon', url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  verification: {
    // Füge hier deinen Google Site Verification Code ein:
    // google: 'dein-verification-code',
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: 'Autoglas-Rocket',
    title: 'Autoglas-Rocket – Mobiler Scheibenwechsel Service',
    description: 'Professioneller Scheibenwechsel deutschlandweit. Front- & Heckscheibe wechseln mit Teilkasko*. Mobiler Service direkt vor Ort.',
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/autoglas-rocket-logo.png`,
        width: 1200,
        height: 630,
        alt: 'Autoglas-Rocket - Mobiler Scheibenwechsel Service deutschlandweit',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Autoglas-Rocket – Mobiler Scheibenwechsel Service',
    description: 'Professioneller Scheibenwechsel deutschlandweit. Front- & Heckscheibe wechseln mit Teilkasko*. Mobiler Service direkt vor Ort.',
    images: [`${siteUrl}/autoglas-rocket-logo.png`],
    creator: '@autoglasrocket',
  },
  alternates: {
    canonical: siteUrl,
  },
};

// Organization Schema für die gesamte Website
const organizationSchema = generateOrganizationSchema();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${dmSans.variable} ${spaceGrotesk.variable}`}>
      <head>
        {/* Organization Schema - Global für die gesamte Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaToJsonLd(organizationSchema) }}
        />
      </head>
      <body className="font-sans antialiased bg-white text-slate-900">
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
