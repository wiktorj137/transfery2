/**
 * Constants - Pricing Configuration
 */

// Base pricing structure
export const PRICING = {
  // Base price per kilometer
  BASE_PRICE_PER_KM: 4.5, // PLN
  
  // Minimum fare
  MINIMUM_FARE: 80, // PLN
  
  // Airport surcharge
  AIRPORT_SURCHARGE: 20, // PLN
  
  // Night surcharge (22:00 - 06:00)
  NIGHT_SURCHARGE_MULTIPLIER: 1.2,
  
  // Holiday surcharge
  HOLIDAY_SURCHARGE_MULTIPLIER: 1.15,
  
  // Waiting time per minute
  WAITING_TIME_PER_MINUTE: 2, // PLN
  
  // Free waiting time
  FREE_WAITING_TIME_MINUTES: 15,
} as const;

// Promo codes configuration
export const PROMO_CODES: Record<string, {
  code: string;
  discount: number;
  discountType: 'percentage' | 'fixed';
  minAmount?: number;
  description: string;
}> = {
  WELCOME10: {
    code: 'WELCOME10',
    discount: 10,
    discountType: 'percentage',
    minAmount: 100,
    description: '10% off for new customers (min. 100 PLN)',
  },
  AIRPORT20: {
    code: 'AIRPORT20',
    discount: 20,
    discountType: 'fixed',
    minAmount: 150,
    description: '20 PLN off airport transfers (min. 150 PLN)',
  },
  SUMMER2025: {
    code: 'SUMMER2025',
    discount: 15,
    discountType: 'percentage',
    description: '15% off summer special',
  },
} as const;

// Popular routes with estimated prices
export const POPULAR_ROUTES = [
  {
    from: 'Airport',
    to: 'Old Town',
    estimatedPrice: 120,
    distance: 18,
    duration: '25 min',
  },
  {
    from: 'Airport',
    to: 'Kazimierz',
    estimatedPrice: 130,
    distance: 20,
    duration: '30 min',
  },
  {
    from: 'Old Town',
    to: 'Wieliczka Salt Mine',
    estimatedPrice: 180,
    distance: 15,
    duration: '25 min',
  },
  {
    from: 'Krakow',
    to: 'Auschwitz',
    estimatedPrice: 320,
    distance: 70,
    duration: '1h 15min',
  },
  {
    from: 'Krakow',
    to: 'Zakopane',
    estimatedPrice: 450,
    distance: 110,
    duration: '2h',
  },
] as const;

// Payment methods
export const PAYMENT_METHODS = [
  {
    id: 'online',
    name: 'Online Payment',
    description: 'Pay securely online',
    fee: 0,
    icon: 'CreditCard',
  },
  {
    id: 'cash',
    name: 'Cash',
    description: 'Pay driver in cash',
    fee: 0,
    icon: 'Banknote',
  },
] as const;

// Currency
export const CURRENCY = {
  code: 'PLN',
  symbol: 'zł',
  name: 'Polish Złoty',
} as const;
