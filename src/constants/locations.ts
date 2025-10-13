/**
 * Constants - Popular Locations
 */

import type { NominatimResult } from '@/types';

export const POPULAR_LOCATIONS: NominatimResult[] = [
  {
    place_id: -1,
    display_name: 'Krakow Airport - Balice (KRK)',
    lat: '50.0777',
    lon: '19.7848',
    address: { city: 'Krakow' },
    isCustom: true,
    icon: 'airport',
  },
  {
    place_id: -2,
    display_name: 'Krakow Old Town - Main Square',
    lat: '50.0619',
    lon: '19.9369',
    address: { city: 'Krakow' },
    isCustom: true,
    icon: 'location',
  },
  {
    place_id: -3,
    display_name: 'Krakow Main Railway Station',
    lat: '50.0676',
    lon: '19.9467',
    address: { city: 'Krakow' },
    isCustom: true,
    icon: 'train',
  },
  {
    place_id: -4,
    display_name: 'Krakow Bus Station (MDA)',
    lat: '50.0682',
    lon: '19.9504',
    address: { city: 'Krakow' },
    isCustom: true,
    icon: 'train',
  },
  {
    place_id: -5,
    display_name: 'Hotel Stary - Szczepanska 5, Krakow',
    lat: '50.0621',
    lon: '19.9344',
    address: { city: 'Krakow', road: 'Szczepanska' },
    isCustom: true,
    icon: 'hotel',
  },
  {
    place_id: -6,
    display_name: 'Sheraton Grand Krakow - Powisle 7, Krakow',
    lat: '50.0598',
    lon: '19.9442',
    address: { city: 'Krakow', road: 'Powisle' },
    isCustom: true,
    icon: 'hotel',
  },
  {
    place_id: -7,
    display_name: 'Hotel Copernicus - Kanonicza 16, Krakow',
    lat: '50.0543',
    lon: '19.9363',
    address: { city: 'Krakow', road: 'Kanonicza' },
    isCustom: true,
    icon: 'hotel',
  },
  {
    place_id: -8,
    display_name: 'Radisson Blu Hotel - Straszewskiego 17, Krakow',
    lat: '50.0631',
    lon: '19.9311',
    address: { city: 'Krakow', road: 'Straszewskiego' },
    isCustom: true,
    icon: 'hotel',
  },
];

// Krakow Airport coordinates (for distance calculations)
export const KRAKOW_AIRPORT = {
  lat: 50.0777,
  lng: 19.7848,
  name: 'Krakow Airport (KRK)',
};

// City center coordinates
export const KRAKOW_CENTER = {
  lat: 50.0619,
  lng: 19.9369,
  name: 'Krakow Old Town',
};
