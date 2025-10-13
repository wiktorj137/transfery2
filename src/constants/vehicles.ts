/**
 * Constants - Vehicle Types Configuration
 */

import { Vehicle } from '@/types';

export const VEHICLES: Record<string, Vehicle> = {
  standard: {
    id: 'standard',
    name: 'Standard',
    description: 'Comfortable mid-size car',
    example: 'VW Passat / Toyota Camry',
    capacity: '1-4 people',
    priceMultiplier: 1.0,
    features: ['Air Conditioning', 'Free WiFi', 'Comfortable Seats', 'Luggage Space'],
    icon: 'Car',
  },
  premium: {
    id: 'premium',
    name: 'Premium',
    description: 'Luxury executive car',
    example: 'Mercedes E-Class / BMW 5 Series',
    capacity: '1-4 people',
    priceMultiplier: 1.4,
    features: [
      'Leather Seats',
      'Premium Sound',
      'Climate Control',
      'Refreshments',
      'Phone Chargers',
    ],
    icon: 'Sparkles',
  },
  van: {
    id: 'van',
    name: 'Van',
    description: 'Spacious minivan',
    example: 'Mercedes V-Class / VW Caravelle',
    capacity: '5-8 people',
    priceMultiplier: 1.6,
    features: [
      'Extra Luggage Space',
      'Group Travel',
      'Air Conditioning',
      'USB Charging Ports',
    ],
    icon: 'Users',
  },
  vip: {
    id: 'vip',
    name: 'VIP',
    description: 'Ultimate luxury experience',
    example: 'Mercedes S-Class / BMW 7 Series',
    capacity: '1-3 people',
    priceMultiplier: 2.0,
    features: [
      'Chauffeur Service',
      'Massage Seats',
      'Premium Bar',
      'Privacy Glass',
      'Concierge Service',
      'Red Carpet Service',
    ],
    icon: 'Crown',
  },
};

export const VEHICLE_TYPES = Object.values(VEHICLES);

// Helper to get vehicle by ID
export const getVehicle = (id: string): Vehicle | undefined => {
  return VEHICLES[id];
};

// Get vehicle price multiplier
export const getVehicleMultiplier = (id: string): number => {
  return VEHICLES[id]?.priceMultiplier || 1.0;
};
