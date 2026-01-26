# 🚀 Autoglas-Rocket

**Programmatic SEO-getriebene Autoglas-Service-Plattform**

Eine skalierbare Next.js-Anwendung, die automatisch tausende lokale Landingpages generiert, um Autoglas-Suchanfragen systematisch abzudecken.

## 📋 Features

- **Programmatic SEO**: Automatische Generierung von 500+ indexierbaren Seiten
- **3 Template-Typen**: 
  - T1: Stadtseiten (`/autoglas-[stadt]/`)
  - T2: Leistung+Stadt (`/steinschlag-reparatur-[stadt]/`)
  - T3: Fahrzeugseiten (`/scheibenwechsel-[marke]-[modell]/`)
- **Duplicate-Content-Vermeidung**: Synonym-Pool System für einzigartige Inhalte
- **Schema.org Markup**: LocalBusiness, Service, FAQPage, BreadcrumbList
- **Interne Verlinkung**: Automatische Querverweise zwischen Seiten
- **Lead-Generierung**: Integriertes Anfrage-Formular mit Tracking
- **Mobile-First Design**: Responsive UI mit Tailwind CSS

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router, SSR/SSG)
- **Sprache**: TypeScript
- **Styling**: Tailwind CSS 4
- **SEO**: next-sitemap, Schema.org JSON-LD
- **Testing**: Jest

## 🚀 Schnellstart

```bash
# Dependencies installieren
npm install

# Entwicklungsserver starten
npm run dev

# Produktion-Build erstellen
npm run build

# Produktion-Server starten
npm run start
```

## 📁 Projektstruktur

```
autoglas-rocket/
├── src/
│   ├── app/                    # Next.js App Router Seiten
│   │   ├── autoglas-[city]/    # T1: Stadtseiten
│   │   ├── [service]-[city]/   # T2: Leistung+Stadt
│   │   └── scheibenwechsel-[brand]-[model]/  # T3: Fahrzeuge
│   ├── components/             # React Komponenten
│   │   ├── ui/                 # UI-Primitives (Button, Card)
│   │   ├── Hero.tsx
│   │   ├── LeadForm.tsx
│   │   ├── FAQ.tsx
│   │   └── ...
│   ├── data/                   # Datenbasis
│   │   ├── cities.ts           # 50+ Städte
│   │   ├── services.ts         # Leistungen
│   │   └── vehicles.ts         # 100+ Fahrzeugmodelle
│   └── lib/                    # Utilities
│       ├── content-generator.ts # Synonym-Pool & Content
│       ├── schema.ts           # Schema.org Generierung
│       └── internal-links.ts   # Verlinkung
├── scripts/                    # SEO-Scripts
│   ├── seo-audit.ts            # PRD-Compliance Check
│   └── generate-sitemap-data.ts
├── tests/                      # Jest Tests
│   └── seo.test.ts
└── next-sitemap.config.js      # Sitemap-Konfiguration
```

## 🧪 Testing & SEO-Audit

```bash
# Unit Tests ausführen
npm test

# SEO-Audit (PRD-Compliance)
npm run seo:audit

# Sitemap-Daten generieren
npm run seo:sitemap
```

## 📊 SEO-Metriken (PRD-Ziele)

| KPI | Ziel | Status |
|-----|------|--------|
| Indexierte Seiten | >500 | ✅ |
| URL-Pattern Konformität | 100% | ✅ |
| Duplicate Content | 0% | ✅ |
| Schema.org Markup | Vollständig | ✅ |
| Core Web Vitals | Grün | ⏳ |

## 🔧 Konfiguration

### Umgebungsvariablen

```env
# .env.local
SITE_URL=https://autoglas-rocket.de
```

### Neue Stadt hinzufügen

Bearbeite `src/data/cities.ts`:

```typescript
{
  slug: "neue-stadt",
  name: "Neue Stadt",
  region: "Region",
  bundesland: "Bundesland",
  population: 100000,
  plz: ["12345"],
  nearby: ["nachbar-stadt"],
  coordinates: { lat: 50.0, lng: 8.0 }
}
```

### Neues Fahrzeugmodell hinzufügen

Bearbeite `src/data/vehicles.ts`:

```typescript
{
  slug: "neues-modell",
  name: "Neues Modell",
  brandSlug: "marke",
  years: "2020-2024",
  popular: true
}
```

## 📝 Lizenz

Proprietär - Alle Rechte vorbehalten.

## 👥 Kontakt

- Website: [autoglas-rocket.de](https://autoglas-rocket.de)
- E-Mail: info@autoglas-rocket.de
- Telefon: 0800 123 4567
