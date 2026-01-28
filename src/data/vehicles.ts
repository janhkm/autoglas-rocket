/**
 * Fahrzeug-Datenbank für pSEO (T3 Templates)
 * Fokus auf populäre Marken und Modelle in Deutschland
 */

export interface VehicleBrand {
  slug: string;
  name: string;
  country: string;
}

export interface VehicleModel {
  slug: string;
  name: string;
  brandSlug: string;
  years: string; // z.B. "2019-2024"
  popular: boolean;
  // Extended SEO content fields (optional - fallback generation if not provided)
  glasTypes?: string[];         // e.g. ["Frontscheibe mit Regensensor", "Akustikglas"]
  commonDamages?: string[];     // e.g. ["Steinschlag A-Säule", "Riss durch Temperatur"]
  priceRange?: string;          // e.g. "350-600€"
  repairTime?: string;          // e.g. "1,5-2 Stunden"
  specialFeatures?: string[];   // e.g. ["Kalibrierung ADAS", "Head-Up-Display"]
}

// Vehicle content generation for SEO enrichment
export interface VehicleContent {
  glasTypes: string[];
  commonDamages: string[];
  specialFeatures: string[];
  priceRange: string;
  repairTime: string;
}

/**
 * Generates vehicle-specific content for SEO
 * Uses model-specific data if available, otherwise generates based on brand/model characteristics
 */
export function getVehicleContent(brand: VehicleBrand, model: VehicleModel): VehicleContent {
  // If model has specific data, use it
  if (model.glasTypes && model.commonDamages && model.specialFeatures) {
    return {
      glasTypes: model.glasTypes,
      commonDamages: model.commonDamages,
      specialFeatures: model.specialFeatures,
      priceRange: model.priceRange || '350-650€',
      repairTime: model.repairTime || '1,5-2 Stunden'
    };
  }
  
  // Generate content based on brand and vehicle characteristics
  const isGermanBrand = ['vw', 'bmw', 'mercedes', 'audi', 'opel', 'porsche'].includes(brand.slug);
  const isPremiumBrand = ['bmw', 'mercedes', 'audi', 'porsche', 'volvo', 'tesla'].includes(brand.slug);
  const isElectric = ['id3', 'id4', 'model-3', 'model-y', 'model-s', 'model-x', 'e-tron', 'ioniq5', 'ev6', 'leaf', 'zoe', 'spring', 'e'].includes(model.slug);
  
  // Glass types based on vehicle class
  const glasTypes = [
    `Original-Frontscheibe für ${brand.name} ${model.name}`,
    'OEM-Äquivalent in Erstausrüster-Qualität',
  ];
  
  if (isPremiumBrand || isElectric) {
    glasTypes.push('Akustik-Verbundglas für verbesserte Geräuschdämmung');
    glasTypes.push('Wärmeschutzverglasung mit UV-Filter');
  } else {
    glasTypes.push('Optionale Wärmeschutzverglasung');
  }
  
  // Common damages
  const commonDamages = [
    'Steinschlag durch Straßensplit oder Rollsplitt',
    'Rissbildung durch Temperaturschwankungen',
    'Kratzer durch verschlissene Scheibenwischer',
  ];
  
  if (isPremiumBrand) {
    commonDamages.push('Beschädigung im Bereich der Kamerasysteme');
  }
  
  // Special features based on brand/model
  const specialFeatures: string[] = [];
  
  if (isPremiumBrand || isElectric) {
    specialFeatures.push('Kalibrierung Fahrassistenzsysteme (ADAS)');
    specialFeatures.push('Frontkamera-Neujustierung');
  }
  
  if (model.years.includes('2020') || model.years.includes('2021') || model.years.includes('2022') || model.years.includes('2023') || model.years.includes('2024')) {
    specialFeatures.push('Regensensor-Anpassung');
  }
  
  if (isGermanBrand) {
    specialFeatures.push('Verwendung von Original-Ersatzteilen');
  }
  
  if (specialFeatures.length === 0) {
    specialFeatures.push('Fachgerechte Montage nach Herstellervorgaben');
    specialFeatures.push('Dichtigkeitsprüfung nach Einbau');
  }
  
  // Price range based on brand
  let priceRange = '350-550€';
  if (isPremiumBrand) {
    priceRange = '450-850€';
  } else if (isElectric) {
    priceRange = '400-700€';
  }
  
  return {
    glasTypes,
    commonDamages,
    specialFeatures,
    priceRange,
    repairTime: isPremiumBrand ? '2-3 Stunden' : '1,5-2 Stunden'
  };
}

export const brands: VehicleBrand[] = [
  { slug: "vw", name: "Volkswagen", country: "Deutschland" },
  { slug: "bmw", name: "BMW", country: "Deutschland" },
  { slug: "mercedes", name: "Mercedes-Benz", country: "Deutschland" },
  { slug: "audi", name: "Audi", country: "Deutschland" },
  { slug: "opel", name: "Opel", country: "Deutschland" },
  { slug: "ford", name: "Ford", country: "USA" },
  { slug: "skoda", name: "Škoda", country: "Tschechien" },
  { slug: "seat", name: "SEAT", country: "Spanien" },
  { slug: "toyota", name: "Toyota", country: "Japan" },
  { slug: "hyundai", name: "Hyundai", country: "Südkorea" },
  { slug: "kia", name: "Kia", country: "Südkorea" },
  { slug: "renault", name: "Renault", country: "Frankreich" },
  { slug: "peugeot", name: "Peugeot", country: "Frankreich" },
  { slug: "fiat", name: "Fiat", country: "Italien" },
  { slug: "mazda", name: "Mazda", country: "Japan" },
  { slug: "nissan", name: "Nissan", country: "Japan" },
  { slug: "honda", name: "Honda", country: "Japan" },
  { slug: "volvo", name: "Volvo", country: "Schweden" },
  { slug: "mini", name: "MINI", country: "Großbritannien" },
  { slug: "porsche", name: "Porsche", country: "Deutschland" },
  { slug: "tesla", name: "Tesla", country: "USA" },
  { slug: "dacia", name: "Dacia", country: "Rumänien" },
  { slug: "citroen", name: "Citroën", country: "Frankreich" },
  { slug: "suzuki", name: "Suzuki", country: "Japan" },
  { slug: "mitsubishi", name: "Mitsubishi", country: "Japan" }
];

export const models: VehicleModel[] = [
  // Volkswagen
  { slug: "golf", name: "Golf", brandSlug: "vw", years: "1974-2024", popular: true },
  { slug: "passat", name: "Passat", brandSlug: "vw", years: "1973-2024", popular: true },
  { slug: "polo", name: "Polo", brandSlug: "vw", years: "1975-2024", popular: true },
  { slug: "tiguan", name: "Tiguan", brandSlug: "vw", years: "2007-2024", popular: true },
  { slug: "t-roc", name: "T-Roc", brandSlug: "vw", years: "2017-2024", popular: true },
  { slug: "touran", name: "Touran", brandSlug: "vw", years: "2003-2024", popular: true },
  { slug: "arteon", name: "Arteon", brandSlug: "vw", years: "2017-2024", popular: false },
  { slug: "id3", name: "ID.3", brandSlug: "vw", years: "2020-2024", popular: true },
  { slug: "id4", name: "ID.4", brandSlug: "vw", years: "2021-2024", popular: true },
  { slug: "transporter", name: "Transporter", brandSlug: "vw", years: "1950-2024", popular: true },
  { slug: "caddy", name: "Caddy", brandSlug: "vw", years: "1980-2024", popular: false },

  // BMW
  { slug: "1er", name: "1er", brandSlug: "bmw", years: "2004-2024", popular: true },
  { slug: "2er", name: "2er", brandSlug: "bmw", years: "2014-2024", popular: false },
  { slug: "3er", name: "3er", brandSlug: "bmw", years: "1975-2024", popular: true },
  { slug: "4er", name: "4er", brandSlug: "bmw", years: "2013-2024", popular: false },
  { slug: "5er", name: "5er", brandSlug: "bmw", years: "1972-2024", popular: true },
  { slug: "x1", name: "X1", brandSlug: "bmw", years: "2009-2024", popular: true },
  { slug: "x3", name: "X3", brandSlug: "bmw", years: "2003-2024", popular: true },
  { slug: "x5", name: "X5", brandSlug: "bmw", years: "1999-2024", popular: true },
  { slug: "i3", name: "i3", brandSlug: "bmw", years: "2013-2022", popular: false },
  { slug: "ix", name: "iX", brandSlug: "bmw", years: "2021-2024", popular: false },

  // Mercedes-Benz
  { slug: "a-klasse", name: "A-Klasse", brandSlug: "mercedes", years: "1997-2024", popular: true },
  { slug: "b-klasse", name: "B-Klasse", brandSlug: "mercedes", years: "2005-2024", popular: false },
  { slug: "c-klasse", name: "C-Klasse", brandSlug: "mercedes", years: "1993-2024", popular: true },
  { slug: "e-klasse", name: "E-Klasse", brandSlug: "mercedes", years: "1993-2024", popular: true },
  { slug: "s-klasse", name: "S-Klasse", brandSlug: "mercedes", years: "1972-2024", popular: false },
  { slug: "gla", name: "GLA", brandSlug: "mercedes", years: "2013-2024", popular: true },
  { slug: "glc", name: "GLC", brandSlug: "mercedes", years: "2015-2024", popular: true },
  { slug: "gle", name: "GLE", brandSlug: "mercedes", years: "2015-2024", popular: false },
  { slug: "cla", name: "CLA", brandSlug: "mercedes", years: "2013-2024", popular: true },
  { slug: "vito", name: "Vito", brandSlug: "mercedes", years: "1996-2024", popular: true },
  { slug: "sprinter", name: "Sprinter", brandSlug: "mercedes", years: "1995-2024", popular: true },

  // Audi
  { slug: "a1", name: "A1", brandSlug: "audi", years: "2010-2024", popular: true },
  { slug: "a3", name: "A3", brandSlug: "audi", years: "1996-2024", popular: true },
  { slug: "a4", name: "A4", brandSlug: "audi", years: "1994-2024", popular: true },
  { slug: "a5", name: "A5", brandSlug: "audi", years: "2007-2024", popular: false },
  { slug: "a6", name: "A6", brandSlug: "audi", years: "1994-2024", popular: true },
  { slug: "q2", name: "Q2", brandSlug: "audi", years: "2016-2024", popular: false },
  { slug: "q3", name: "Q3", brandSlug: "audi", years: "2011-2024", popular: true },
  { slug: "q5", name: "Q5", brandSlug: "audi", years: "2008-2024", popular: true },
  { slug: "q7", name: "Q7", brandSlug: "audi", years: "2005-2024", popular: false },
  { slug: "e-tron", name: "e-tron", brandSlug: "audi", years: "2018-2024", popular: true },

  // Opel
  { slug: "corsa", name: "Corsa", brandSlug: "opel", years: "1982-2024", popular: true },
  { slug: "astra", name: "Astra", brandSlug: "opel", years: "1991-2024", popular: true },
  { slug: "insignia", name: "Insignia", brandSlug: "opel", years: "2008-2024", popular: true },
  { slug: "mokka", name: "Mokka", brandSlug: "opel", years: "2012-2024", popular: true },
  { slug: "crossland", name: "Crossland", brandSlug: "opel", years: "2017-2024", popular: false },
  { slug: "grandland", name: "Grandland", brandSlug: "opel", years: "2017-2024", popular: true },
  { slug: "zafira", name: "Zafira", brandSlug: "opel", years: "1999-2019", popular: false },

  // Ford
  { slug: "fiesta", name: "Fiesta", brandSlug: "ford", years: "1976-2023", popular: true },
  { slug: "focus", name: "Focus", brandSlug: "ford", years: "1998-2024", popular: true },
  { slug: "mondeo", name: "Mondeo", brandSlug: "ford", years: "1993-2022", popular: false },
  { slug: "kuga", name: "Kuga", brandSlug: "ford", years: "2008-2024", popular: true },
  { slug: "puma", name: "Puma", brandSlug: "ford", years: "2019-2024", popular: true },
  { slug: "mustang-mach-e", name: "Mustang Mach-E", brandSlug: "ford", years: "2020-2024", popular: false },
  { slug: "transit", name: "Transit", brandSlug: "ford", years: "1965-2024", popular: true },

  // Škoda
  { slug: "fabia", name: "Fabia", brandSlug: "skoda", years: "1999-2024", popular: true },
  { slug: "octavia", name: "Octavia", brandSlug: "skoda", years: "1996-2024", popular: true },
  { slug: "superb", name: "Superb", brandSlug: "skoda", years: "2001-2024", popular: true },
  { slug: "karoq", name: "Karoq", brandSlug: "skoda", years: "2017-2024", popular: true },
  { slug: "kodiaq", name: "Kodiaq", brandSlug: "skoda", years: "2016-2024", popular: true },
  { slug: "kamiq", name: "Kamiq", brandSlug: "skoda", years: "2019-2024", popular: false },
  { slug: "enyaq", name: "Enyaq", brandSlug: "skoda", years: "2021-2024", popular: true },

  // SEAT
  { slug: "ibiza", name: "Ibiza", brandSlug: "seat", years: "1984-2024", popular: true },
  { slug: "leon", name: "Leon", brandSlug: "seat", years: "1999-2024", popular: true },
  { slug: "ateca", name: "Ateca", brandSlug: "seat", years: "2016-2024", popular: true },
  { slug: "arona", name: "Arona", brandSlug: "seat", years: "2017-2024", popular: true },
  { slug: "tarraco", name: "Tarraco", brandSlug: "seat", years: "2018-2024", popular: false },

  // Toyota
  { slug: "yaris", name: "Yaris", brandSlug: "toyota", years: "1999-2024", popular: true },
  { slug: "corolla", name: "Corolla", brandSlug: "toyota", years: "1966-2024", popular: true },
  { slug: "aygo", name: "Aygo", brandSlug: "toyota", years: "2005-2024", popular: true },
  { slug: "rav4", name: "RAV4", brandSlug: "toyota", years: "1994-2024", popular: true },
  { slug: "c-hr", name: "C-HR", brandSlug: "toyota", years: "2016-2024", popular: true },
  { slug: "prius", name: "Prius", brandSlug: "toyota", years: "1997-2024", popular: false },
  { slug: "camry", name: "Camry", brandSlug: "toyota", years: "1982-2024", popular: false },

  // Hyundai
  { slug: "i10", name: "i10", brandSlug: "hyundai", years: "2007-2024", popular: true },
  { slug: "i20", name: "i20", brandSlug: "hyundai", years: "2008-2024", popular: true },
  { slug: "i30", name: "i30", brandSlug: "hyundai", years: "2007-2024", popular: true },
  { slug: "tucson", name: "Tucson", brandSlug: "hyundai", years: "2004-2024", popular: true },
  { slug: "kona", name: "Kona", brandSlug: "hyundai", years: "2017-2024", popular: true },
  { slug: "ioniq", name: "IONIQ", brandSlug: "hyundai", years: "2016-2024", popular: true },
  { slug: "ioniq5", name: "IONIQ 5", brandSlug: "hyundai", years: "2021-2024", popular: true },

  // Kia
  { slug: "picanto", name: "Picanto", brandSlug: "kia", years: "2004-2024", popular: true },
  { slug: "rio", name: "Rio", brandSlug: "kia", years: "2000-2024", popular: true },
  { slug: "ceed", name: "Ceed", brandSlug: "kia", years: "2006-2024", popular: true },
  { slug: "sportage", name: "Sportage", brandSlug: "kia", years: "1993-2024", popular: true },
  { slug: "niro", name: "Niro", brandSlug: "kia", years: "2016-2024", popular: true },
  { slug: "ev6", name: "EV6", brandSlug: "kia", years: "2021-2024", popular: true },

  // Renault
  { slug: "clio", name: "Clio", brandSlug: "renault", years: "1990-2024", popular: true },
  { slug: "megane", name: "Mégane", brandSlug: "renault", years: "1995-2024", popular: true },
  { slug: "captur", name: "Captur", brandSlug: "renault", years: "2013-2024", popular: true },
  { slug: "kadjar", name: "Kadjar", brandSlug: "renault", years: "2015-2024", popular: false },
  { slug: "scenic", name: "Scénic", brandSlug: "renault", years: "1996-2024", popular: false },
  { slug: "zoe", name: "ZOE", brandSlug: "renault", years: "2012-2024", popular: true },
  { slug: "twingo", name: "Twingo", brandSlug: "renault", years: "1992-2024", popular: false },

  // Peugeot
  { slug: "208", name: "208", brandSlug: "peugeot", years: "2012-2024", popular: true },
  { slug: "308", name: "308", brandSlug: "peugeot", years: "2007-2024", popular: true },
  { slug: "508", name: "508", brandSlug: "peugeot", years: "2010-2024", popular: false },
  { slug: "2008", name: "2008", brandSlug: "peugeot", years: "2013-2024", popular: true },
  { slug: "3008", name: "3008", brandSlug: "peugeot", years: "2009-2024", popular: true },
  { slug: "5008", name: "5008", brandSlug: "peugeot", years: "2009-2024", popular: false },

  // Fiat
  { slug: "500", name: "500", brandSlug: "fiat", years: "2007-2024", popular: true },
  { slug: "panda", name: "Panda", brandSlug: "fiat", years: "1980-2024", popular: true },
  { slug: "tipo", name: "Tipo", brandSlug: "fiat", years: "2015-2024", popular: false },
  { slug: "ducato", name: "Ducato", brandSlug: "fiat", years: "1981-2024", popular: true },

  // Tesla
  { slug: "model-3", name: "Model 3", brandSlug: "tesla", years: "2017-2024", popular: true },
  { slug: "model-y", name: "Model Y", brandSlug: "tesla", years: "2020-2024", popular: true },
  { slug: "model-s", name: "Model S", brandSlug: "tesla", years: "2012-2024", popular: false },
  { slug: "model-x", name: "Model X", brandSlug: "tesla", years: "2015-2024", popular: false },

  // MINI
  { slug: "cooper", name: "Cooper", brandSlug: "mini", years: "2001-2024", popular: true },
  { slug: "countryman", name: "Countryman", brandSlug: "mini", years: "2010-2024", popular: true },
  { slug: "clubman", name: "Clubman", brandSlug: "mini", years: "2007-2024", popular: false },

  // Volvo
  { slug: "v40", name: "V40", brandSlug: "volvo", years: "2012-2019", popular: false },
  { slug: "v60", name: "V60", brandSlug: "volvo", years: "2010-2024", popular: true },
  { slug: "v90", name: "V90", brandSlug: "volvo", years: "2016-2024", popular: false },
  { slug: "xc40", name: "XC40", brandSlug: "volvo", years: "2017-2024", popular: true },
  { slug: "xc60", name: "XC60", brandSlug: "volvo", years: "2008-2024", popular: true },
  { slug: "xc90", name: "XC90", brandSlug: "volvo", years: "2002-2024", popular: false },

  // Porsche
  { slug: "cayenne", name: "Cayenne", brandSlug: "porsche", years: "2002-2024", popular: true },
  { slug: "macan", name: "Macan", brandSlug: "porsche", years: "2014-2024", popular: true },
  { slug: "911", name: "911", brandSlug: "porsche", years: "1963-2024", popular: true },
  { slug: "taycan", name: "Taycan", brandSlug: "porsche", years: "2019-2024", popular: true },
  { slug: "panamera", name: "Panamera", brandSlug: "porsche", years: "2009-2024", popular: false },

  // Dacia
  { slug: "sandero", name: "Sandero", brandSlug: "dacia", years: "2007-2024", popular: true },
  { slug: "duster", name: "Duster", brandSlug: "dacia", years: "2010-2024", popular: true },
  { slug: "spring", name: "Spring", brandSlug: "dacia", years: "2021-2024", popular: true },
  { slug: "jogger", name: "Jogger", brandSlug: "dacia", years: "2021-2024", popular: false },

  // Mazda
  { slug: "mazda2", name: "Mazda2", brandSlug: "mazda", years: "2003-2024", popular: true },
  { slug: "mazda3", name: "Mazda3", brandSlug: "mazda", years: "2003-2024", popular: true },
  { slug: "mazda6", name: "Mazda6", brandSlug: "mazda", years: "2002-2024", popular: false },
  { slug: "cx-3", name: "CX-3", brandSlug: "mazda", years: "2015-2024", popular: false },
  { slug: "cx-5", name: "CX-5", brandSlug: "mazda", years: "2012-2024", popular: true },
  { slug: "mx-5", name: "MX-5", brandSlug: "mazda", years: "1989-2024", popular: false },

  // Citroën
  { slug: "c3", name: "C3", brandSlug: "citroen", years: "2002-2024", popular: true },
  { slug: "c4", name: "C4", brandSlug: "citroen", years: "2004-2024", popular: false },
  { slug: "c5-aircross", name: "C5 Aircross", brandSlug: "citroen", years: "2017-2024", popular: true },
  { slug: "berlingo", name: "Berlingo", brandSlug: "citroen", years: "1996-2024", popular: true },

  // Nissan
  { slug: "micra", name: "Micra", brandSlug: "nissan", years: "1982-2024", popular: true },
  { slug: "qashqai", name: "Qashqai", brandSlug: "nissan", years: "2006-2024", popular: true },
  { slug: "juke", name: "Juke", brandSlug: "nissan", years: "2010-2024", popular: true },
  { slug: "leaf", name: "Leaf", brandSlug: "nissan", years: "2010-2024", popular: true },
  { slug: "x-trail", name: "X-Trail", brandSlug: "nissan", years: "2001-2024", popular: false },

  // Honda
  { slug: "jazz", name: "Jazz", brandSlug: "honda", years: "2001-2024", popular: true },
  { slug: "civic", name: "Civic", brandSlug: "honda", years: "1972-2024", popular: true },
  { slug: "cr-v", name: "CR-V", brandSlug: "honda", years: "1995-2024", popular: true },
  { slug: "hr-v", name: "HR-V", brandSlug: "honda", years: "2015-2024", popular: false },
  { slug: "e", name: "e", brandSlug: "honda", years: "2020-2024", popular: false },
];

// Helper Funktionen
export function getBrandBySlug(slug: string): VehicleBrand | undefined {
  return brands.find(brand => brand.slug === slug);
}

export function getModelBySlug(brandSlug: string, modelSlug: string): VehicleModel | undefined {
  return models.find(model => model.brandSlug === brandSlug && model.slug === modelSlug);
}

export function getModelsByBrand(brandSlug: string): VehicleModel[] {
  return models.filter(model => model.brandSlug === brandSlug);
}

export function getPopularModels(): VehicleModel[] {
  return models.filter(model => model.popular);
}

export function getAllBrandSlugs(): string[] {
  return brands.map(brand => brand.slug);
}

export function getAllVehicleCombinations(): { brand: string; model: string }[] {
  return models.map(model => ({
    brand: model.brandSlug,
    model: model.slug
  }));
}

export function getPopularVehicleCombinations(): { brand: string; model: string }[] {
  return getPopularModels().map(model => ({
    brand: model.brandSlug,
    model: model.slug
  }));
}
