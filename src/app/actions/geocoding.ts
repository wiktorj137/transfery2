'use server';

import { env } from '@/lib/env';
import type { NominatimResult } from '@/types';

/**
 * Server Action: Search locations using Nominatim
 * Geocoding service - runs on server to protect API keys
 */

const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org';

export async function searchLocationsAction(
  query: string
): Promise<{ success: boolean; data?: NominatimResult[]; error?: string }> {
  try {
    if (query.length < 3) {
      return { success: true, data: [] };
    }

    const params = new URLSearchParams({
      q: query,
      format: 'json',
      addressdetails: '1',
      limit: '8',
      countrycodes: 'pl', // Focus on Poland
      email: env.api.nominatimEmail,
    });

    const response = await fetch(`${NOMINATIM_BASE_URL}/search?${params}`, {
      headers: {
        'User-Agent': `${env.app.name}/1.0`,
        'Accept-Language': 'en',
      },
      next: {
        revalidate: 3600, // Cache for 1 hour
      },
    });

    if (!response.ok) {
      throw new Error('Geocoding service unavailable');
    }

    const results: NominatimResult[] = await response.json();

    return {
      success: true,
      data: results,
    };
  } catch (error) {
    console.error('Location search error:', error);
    return {
      success: false,
      error: 'Failed to search locations',
    };
  }
}

/**
 * Server Action: Reverse geocode coordinates
 */

export async function reverseGeocodeAction(
  lat: number,
  lng: number
): Promise<{ success: boolean; data?: string; error?: string }> {
  try {
    const params = new URLSearchParams({
      lat: lat.toString(),
      lon: lng.toString(),
      format: 'json',
      email: env.api.nominatimEmail,
    });

    const response = await fetch(`${NOMINATIM_BASE_URL}/reverse?${params}`, {
      headers: {
        'User-Agent': `${env.app.name}/1.0`,
      },
      next: {
        revalidate: 86400, // Cache for 24 hours
      },
    });

    if (!response.ok) {
      throw new Error('Reverse geocoding failed');
    }

    const result = await response.json();

    return {
      success: true,
      data: result.display_name || 'Unknown location',
    };
  } catch {
    return {
      success: false,
      error: 'Failed to reverse geocode',
    };
  }
}
