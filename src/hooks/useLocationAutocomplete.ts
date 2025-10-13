import { useState, useEffect, useCallback, useRef } from 'react';
import { searchLocationsAction } from '@/app/actions/geocoding';
import { POPULAR_LOCATIONS } from '@/constants/locations';
import { debounce } from '@/lib/utils';
import type { NominatimResult } from '@/types';

/**
 * Custom hook for location autocomplete with caching
 */

interface UseLocationAutocompleteOptions {
  minQueryLength?: number;
  debounceMs?: number;
}

export function useLocationAutocomplete(
  query: string,
  options: UseLocationAutocompleteOptions = {}
) {
  const { minQueryLength = 3, debounceMs = 300 } = options;

  const [results, setResults] = useState<NominatimResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cacheRef = useRef<Map<string, NominatimResult[]>>(new Map());

  const searchLocations = useCallback(
    async (searchQuery: string) => {
      if (searchQuery.length < minQueryLength) {
        setResults(POPULAR_LOCATIONS as NominatimResult[]);
        return;
      }

      // Check cache first
      const cached = cacheRef.current.get(searchQuery);
      if (cached) {
        setResults([...POPULAR_LOCATIONS, ...cached]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const result = await searchLocationsAction(searchQuery);

        if (result.success && result.data) {
          // Cache the results
          cacheRef.current.set(searchQuery, result.data);
          setResults(result.data);
        } else {
          setError(result.error || 'Failed to search locations');
          setResults([]);
        }
      } catch (err) {
        setError('Failed to search locations');
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    },
    [minQueryLength]
  );

  // Debounced search
  const debouncedSearch = useCallback(
    debounce(searchLocations, debounceMs),
    [searchLocations, debounceMs]
  );

  useEffect(() => {
    if (query.length === 0) {
      setResults(POPULAR_LOCATIONS as NominatimResult[]);
      setIsLoading(false);
      return;
    }

    if (query.length < minQueryLength) {
      setResults([]);
      return;
    }

    debouncedSearch(query);
  }, [query, minQueryLength, debouncedSearch]);

  return {
    results,
    isLoading,
    error,
    clearCache: () => cacheRef.current.clear(),
  };
}
