'use client';

import { useState, useRef } from 'react';
import { MapPin, Loader2, Plane, Hotel, Train } from 'lucide-react';

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
  icon?: 'airport' | 'train' | 'hotel' | 'location';
}

const POPULAR_LOCATIONS: NominatimResult[] = [
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
  {
    place_id: -9,
    display_name: 'Grand Hotel - Slawkowska 5/7, Krakow',
    lat: '50.0637',
    lon: '19.9359',
    address: { city: 'Kraków', road: 'Sławkowska' },
    isCustom: true,
    icon: 'hotel',
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
      setSuggestions(POPULAR_LOCATIONS);
      return;
    }

    setIsLoading(true);

    try {
      const matchingLocations = POPULAR_LOCATIONS.filter((location) =>
        location.display_name.toLowerCase().includes(query.toLowerCase())
      );

      // Wyszukaj w Krakowie i okolicach używając bounding box
      // Współrzędne obejmują Kraków i okolice (~50km promień)
      // South-West: 49.8, 19.6 | North-East: 50.3, 20.3
      const krakowResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?` +
          `q=${encodeURIComponent(query)}` +
          `&countrycodes=pl` +
          `&bounded=1` +
          `&viewbox=19.6,50.3,20.3,49.8` +
          `&format=json` +
          `&addressdetails=1` +
          `&limit=10` +
          `&accept-language=pl`,
        {
          headers: {
            'User-Agent': 'AirportTransfer/1.0',
          },
        }
      );

      const krakowData = await krakowResponse.json();

      // Upewnij się że krakowData jest tablicą
      const krakowResults = Array.isArray(krakowData) ? krakowData : [];

      // Szukaj również w całej Polsce dla szerszego kontekstu
      let additionalResults: NominatimResult[] = [];
      const polandResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?` +
          `q=${encodeURIComponent(query)}` +
          `&countrycodes=pl` +
          `&format=json` +
          `&addressdetails=1` +
          `&limit=8` +
          `&accept-language=pl`,
        {
          headers: {
            'User-Agent': 'AirportTransfer/1.0',
          },
        }
      );
      const polandData = await polandResponse.json();
      additionalResults = Array.isArray(polandData) ? polandData : [];

      // Połącz wszystkie wyniki
      const allResults = [...krakowResults, ...additionalResults];
      
      // Usuń duplikaty na podstawie place_id
      const uniqueResults = allResults.filter(
        (result, index, self) =>
          index === self.findIndex((r) => r.place_id === result.place_id)
      );

      // Współrzędne centrum Krakowa
      const krakowLat = 50.0647;
      const krakowLon = 19.9450;
      
      // Funkcja obliczająca odległość w km
      const getDistance = (lat: number, lon: number) => {
        const R = 6371; // promień Ziemi w km
        const dLat = ((lat - krakowLat) * Math.PI) / 180;
        const dLon = ((lon - krakowLon) * Math.PI) / 180;
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos((krakowLat * Math.PI) / 180) *
            Math.cos((lat * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
      };

      // Sortuj po odległości od Krakowa
      const sortedResults = uniqueResults.sort((a: NominatimResult, b: NominatimResult) => {
        const distA = getDistance(parseFloat(a.lat), parseFloat(a.lon));
        const distB = getDistance(parseFloat(b.lat), parseFloat(b.lon));
        return distA - distB;
      });

      const finalResults = [
        ...matchingLocations, 
        ...sortedResults
      ];

      setSuggestions(finalResults.slice(0, 10));
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
      setSuggestions(POPULAR_LOCATIONS);
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
    const displayParts = suggestion.display_name.split(', ');
    
    // Główna nazwa - pierwsza część (ulica, hotel, miejsce)
    const mainName = displayParts[0] || '';
    
    // Szczegóły - reszta adresu
    const details = displayParts.slice(1).join(', ');
    
    return {
      main: mainName,
      details: details,
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
              setSuggestions(POPULAR_LOCATIONS);
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
            const isCustom = suggestion.isCustom;
            const icon = suggestion.icon || 'location';
            
            // Determine icon component based on type
            let IconComponent;
            let iconColor = 'text-gray-400';
            
            if (isCustom) {
              switch (icon) {
                case 'airport':
                  IconComponent = Plane;
                  iconColor = 'text-blue-600';
                  break;
                case 'train':
                  IconComponent = Train;
                  iconColor = 'text-green-600';
                  break;
                case 'hotel':
                  IconComponent = Hotel;
                  iconColor = 'text-purple-600';
                  break;
                case 'location':
                default:
                  IconComponent = MapPin;
                  iconColor = 'text-orange-600';
                  break;
              }
            } else {
              IconComponent = MapPin;
              iconColor = 'text-gray-400';
            }
            
            return (
              <button
                key={suggestion.place_id}
                onClick={() => handleSelectSuggestion(suggestion)}
                className={`w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-0 ${
                  isCustom ? 'bg-blue-50/50' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <IconComponent className={`w-4 h-4 ${iconColor} mt-1 flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold ${isCustom ? 'text-blue-900' : 'text-gray-900'}`}>
                      {addr.main}
                    </p>
                    {addr.details && (
                      <p className="text-xs text-gray-500 mt-0.5">
                        {addr.details}
                      </p>
                    )}
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
