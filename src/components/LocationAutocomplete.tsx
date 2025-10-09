'use client';

import { useState, useRef } from 'react';
import { MapPin, Loader2, Plane } from 'lucide-react';

interface LocationAutocompleteProps {
  value: string;
  onChange: (value: string, coords?: { lat: number; lng: number }) => void;
  placeholder?: string;
  label?: string;
}

interface NominatimResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  address: {
    road?: string;
    house_number?: string;
    city?: string;
    town?: string;
    village?: string;
  };
  isCustom?: boolean;
}

const POPULAR_AIRPORTS: NominatimResult[] = [
  {
    place_id: -1,
    display_name: 'Lotnisko Kraków-Balice im. Jana Pawła II (KRK)',
    lat: '50.0777',
    lon: '19.7848',
    address: { city: 'Kraków' },
    isCustom: true,
  },
  {
    place_id: -2,
    display_name: 'Lotnisko Warszawa-Okęcie im. Fryderyka Chopina (WAW)',
    lat: '52.1657',
    lon: '20.9679',
    address: { city: 'Warszawa' },
    isCustom: true,
  },
  {
    place_id: -3,
    display_name: 'Lotnisko Warszawa-Modlin (WMI)',
    lat: '52.4511',
    lon: '20.6519',
    address: { city: 'Warszawa' },
    isCustom: true,
  },
  {
    place_id: -4,
    display_name: 'Lotnisko Gdańsk im. Lecha Wałęsy (GDN)',
    lat: '54.3776',
    lon: '18.4662',
    address: { city: 'Gdańsk' },
    isCustom: true,
  },
  {
    place_id: -5,
    display_name: 'Lotnisko Katowice-Pyrzowice (KTW)',
    lat: '50.4743',
    lon: '19.0800',
    address: { city: 'Katowice' },
    isCustom: true,
  },
  {
    place_id: -6,
    display_name: 'Lotnisko Wrocław-Strachowice (WRO)',
    lat: '51.1027',
    lon: '16.8858',
    address: { city: 'Wrocław' },
    isCustom: true,
  },
  {
    place_id: -7,
    display_name: 'Lotnisko Poznań-Ławica (POZ)',
    lat: '52.4210',
    lon: '16.8263',
    address: { city: 'Poznań' },
    isCustom: true,
  },
];

export default function LocationAutocomplete({
  value,
  onChange,
  placeholder = 'Wpisz adres...',
  label,
}: LocationAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const searchAddress = async (query: string) => {
    if (query.length < 3) {
      setSuggestions(POPULAR_AIRPORTS);
      return;
    }

    setIsLoading(true);

    try {
      const matchingAirports = POPULAR_AIRPORTS.filter((airport) =>
        airport.display_name.toLowerCase().includes(query.toLowerCase()) ||
        query.toLowerCase().includes('lotnisk')
      );

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?` +
          `q=${encodeURIComponent(query)}` +
          `&countrycodes=pl` +
          `&format=json` +
          `&addressdetails=1` +
          `&limit=5` +
          `&accept-language=pl`,
        {
          headers: {
            'User-Agent': 'AirportTransfer/1.0',
          },
        }
      );

      const data = await response.json();
      const combinedResults = [...matchingAirports, ...(data || [])];
      setSuggestions(combinedResults);
    } catch (error) {
      console.error('Błąd wyszukiwania:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setShowSuggestions(true);

    if (newValue.length < 3) {
      setSuggestions(POPULAR_AIRPORTS);
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      searchAddress(newValue);
    }, 500);
  };

  const handleSelectSuggestion = (suggestion: NominatimResult) => {
    onChange(suggestion.display_name, {
      lat: parseFloat(suggestion.lat),
      lng: parseFloat(suggestion.lon),
    });
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const formatAddress = (suggestion: NominatimResult) => {
    const addr = suggestion.address;
    const street = addr.road ? 
      `${addr.road}${addr.house_number ? ' ' + addr.house_number : ''}` : '';
    const city = addr.city || addr.town || addr.village || '';
    
    return {
      main: street || city,
      full: suggestion.display_name,
    };
  };

  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={() => {
            setShowSuggestions(true);
            if (!value || value.length < 3) {
              setSuggestions(POPULAR_AIRPORTS);
            }
          }}
          placeholder={placeholder}
          className="w-full pl-11 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600 animate-spin" />
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((suggestion) => {
            const addr = formatAddress(suggestion);
            const isAirport = suggestion.isCustom;
            
            return (
              <button
                key={suggestion.place_id}
                onClick={() => handleSelectSuggestion(suggestion)}
                className={`w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-0 ${
                  isAirport ? 'bg-blue-50/50' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  {isAirport ? (
                    <Plane className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                  ) : (
                    <MapPin className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${isAirport ? 'text-blue-900' : 'text-gray-900'}`}>
                      {addr.main}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {addr.full}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {showSuggestions && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowSuggestions(false)}
        />
      )}
    </div>
  );
}
