// Pricing and Routes Configuration
// Easy to edit - all prices in PLN

export type VehicleType = 'standard' | 'comfort' | 'premium' | 'van';

export interface Vehicle {
  id: VehicleType;
  name: string;
  description: string;
  capacity: string;
  features: string[];
  image?: string;
}

export interface Route {
  id: string;
  name: string;
  nameEn: string;
  namePl: string;
  from: string;
  to: string;
  description?: string;
  distance: string;
  duration: string;
  popular: boolean;
  prices: {
    standard: number;
    comfort: number;
    premium: number;
    van: number;
  };
  image?: string;
}

// Vehicle types
export const VEHICLES: Record<VehicleType, Vehicle> = {
  standard: {
    id: 'standard',
    name: 'Standard Sedan',
    description: 'Comfortable sedan for up to 3 passengers',
    capacity: '1-3 passengers',
    features: ['Air conditioning', 'Free WiFi', 'Bottled water'],
  },
  comfort: {
    id: 'comfort',
    name: 'Comfort Class',
    description: 'Premium sedan - Mercedes E-Class or BMW 5 Series',
    capacity: '1-3 passengers',
    features: ['Air conditioning', 'Free WiFi', 'Bottled water', 'Phone charger', 'Newspaper'],
  },
  premium: {
    id: 'premium',
    name: 'Premium Class',
    description: 'Luxury sedan - Mercedes S-Class or BMW 7 Series',
    capacity: '1-3 passengers',
    features: ['Air conditioning', 'Free WiFi', 'Premium water', 'Phone charger', 'Newspaper', 'Leather seats'],
  },
  van: {
    id: 'van',
    name: 'Van / Minibus',
    description: 'Spacious van for groups and families',
    capacity: '4-8 passengers',
    features: ['Air conditioning', 'Free WiFi', 'Bottled water', 'Extra luggage space'],
  },
};

// Popular routes with fixed prices
export const ROUTES: Route[] = [
  // Airport transfers
  {
    id: 'krakow-airport-city',
    name: 'Krakow Airport → City Center',
    nameEn: 'Krakow Airport → City Center',
    namePl: 'Lotnisko Kraków → Centrum',
    from: 'Krakow Airport (KRK)',
    to: 'Krakow City Center',
    distance: '15 km',
    duration: '25 min',
    popular: true,
    prices: {
      standard: 90,
      comfort: 120,
      premium: 180,
      van: 140,
    },
  },
  {
    id: 'city-krakow-airport',
    name: 'City Center → Krakow Airport',
    nameEn: 'City Center → Krakow Airport',
    namePl: 'Centrum → Lotnisko Kraków',
    from: 'Krakow City Center',
    to: 'Krakow Airport (KRK)',
    distance: '15 km',
    duration: '25 min',
    popular: true,
    prices: {
      standard: 90,
      comfort: 120,
      premium: 180,
      van: 140,
    },
  },
  
  // Popular tourist destinations
  {
    id: 'krakow-auschwitz',
    name: 'Krakow → Auschwitz-Birkenau',
    nameEn: 'Krakow → Auschwitz-Birkenau',
    namePl: 'Kraków → Auschwitz-Birkenau',
    from: 'Krakow',
    to: 'Auschwitz-Birkenau Museum',
    description: 'Visit the UNESCO World Heritage Site',
    distance: '70 km',
    duration: '1h 15min',
    popular: true,
    prices: {
      standard: 350,
      comfort: 450,
      premium: 600,
      van: 400,
    },
  },
  {
    id: 'krakow-zakopane',
    name: 'Krakow → Zakopane',
    nameEn: 'Krakow → Zakopane',
    namePl: 'Kraków → Zakopane',
    from: 'Krakow',
    to: 'Zakopane',
    description: 'Mountain resort in the Tatra Mountains',
    distance: '110 km',
    duration: '2h',
    popular: true,
    prices: {
      standard: 500,
      comfort: 650,
      premium: 850,
      van: 600,
    },
  },
  {
    id: 'krakow-wieliczka',
    name: 'Krakow → Wieliczka Salt Mine',
    nameEn: 'Krakow → Wieliczka Salt Mine',
    namePl: 'Kraków → Kopalnia Soli Wieliczka',
    from: 'Krakow',
    to: 'Wieliczka Salt Mine',
    description: 'UNESCO World Heritage Site - underground salt mine',
    distance: '15 km',
    duration: '25 min',
    popular: true,
    prices: {
      standard: 120,
      comfort: 160,
      premium: 220,
      van: 150,
    },
  },
  {
    id: 'krakow-wadowice',
    name: 'Krakow → Wadowice',
    nameEn: 'Krakow → Wadowice',
    namePl: 'Kraków → Wadowice',
    from: 'Krakow',
    to: 'Wadowice (Pope John Paul II birthplace)',
    description: 'Birthplace of Pope John Paul II',
    distance: '50 km',
    duration: '1h',
    popular: true,
    prices: {
      standard: 280,
      comfort: 360,
      premium: 480,
      van: 320,
    },
  },
  {
    id: 'krakow-czestochowa',
    name: 'Krakow → Częstochowa',
    nameEn: 'Krakow → Częstochowa',
    namePl: 'Kraków → Częstochowa',
    from: 'Krakow',
    to: 'Częstochowa (Jasna Góra Monastery)',
    description: 'Famous pilgrimage site',
    distance: '140 km',
    duration: '2h',
    popular: false,
    prices: {
      standard: 600,
      comfort: 780,
      premium: 1000,
      van: 700,
    },
  },
  
  // Within Krakow
  {
    id: 'krakow-city-transfer',
    name: 'Krakow City Transfer',
    nameEn: 'Krakow City Transfer',
    namePl: 'Transfer po Krakowie',
    from: 'Any location in Krakow',
    to: 'Any location in Krakow',
    description: 'Point to point within city limits',
    distance: 'varies',
    duration: 'varies',
    popular: false,
    prices: {
      standard: 60,
      comfort: 80,
      premium: 120,
      van: 90,
    },
  },
];

// Promo codes (demo)
export interface PromoCode {
  code: string;
  discount: number; // percentage
  description: string;
  validUntil?: string;
}

export const PROMO_CODES: PromoCode[] = [
  {
    code: 'WELCOME10',
    discount: 10,
    description: '10% off your first booking',
  },
  {
    code: 'SUMMER2025',
    discount: 15,
    description: '15% summer discount',
  },
];

// Helper functions
export function getRouteById(id: string): Route | undefined {
  return ROUTES.find(route => route.id === id);
}

export function getPopularRoutes(): Route[] {
  return ROUTES.filter(route => route.popular);
}

export function calculatePrice(
  routeId: string, 
  vehicleType: VehicleType, 
  promoCode?: string
): { 
  basePrice: number; 
  discount: number; 
  finalPrice: number; 
  promoApplied: boolean;
} {
  const route = getRouteById(routeId);
  if (!route) {
    return { basePrice: 0, discount: 0, finalPrice: 0, promoApplied: false };
  }

  const basePrice = route.prices[vehicleType];
  
  // Check promo code
  const promo = PROMO_CODES.find(p => p.code.toUpperCase() === promoCode?.toUpperCase());
  const discount = promo ? Math.round(basePrice * (promo.discount / 100)) : 0;
  const finalPrice = basePrice - discount;

  return {
    basePrice,
    discount,
    finalPrice,
    promoApplied: !!promo,
  };
}

export function validatePromoCode(code: string): PromoCode | null {
  const promo = PROMO_CODES.find(p => p.code.toUpperCase() === code.toUpperCase());
  return promo || null;
}
