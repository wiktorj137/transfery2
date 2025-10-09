'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Flatpickr from 'react-flatpickr';
import { Calendar, Users, ArrowRight, ArrowLeft, Car, Sparkles, Crown, Tag, Check, CreditCard, Banknote, X } from 'lucide-react';
import LocationAutocomplete from './LocationAutocomplete';
import 'flatpickr/dist/flatpickr.min.css';
import { Polish } from 'flatpickr/dist/l10n/pl';

// Schemat walidacji dla kroku 1
const step1Schema = z.object({
  pickup: z.string().min(5, 'Podaj miejsce odbioru'),
  dropoff: z.string().min(5, 'Podaj miejsce docelowe'),
  date: z.date({ message: 'Wybierz datę i godzinę' }),
  passengers: z.number().min(1).max(8),
});

// Schemat walidacji dla kroku 2
const step2Schema = z.object({
  vehicleType: z.enum(['standard', 'premium', 'van', 'vip'], {
    message: 'Wybierz typ pojazdu',
  }),
  promoCode: z.string().optional(),
});

// Schemat walidacji dla kroku 3
const step3Schema = z.object({
  firstName: z.string().min(2, 'Podaj imię'),
  lastName: z.string().min(2, 'Podaj nazwisko'),
  email: z.string().email('Podaj prawidłowy email'),
  phone: z.string().min(9, 'Podaj prawidłowy numer telefonu'),
  paymentMethod: z.enum(['online', 'cash'], {
    message: 'Wybierz metodę płatności',
  }),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;
type Step3Data = z.infer<typeof step3Schema>;

const STORAGE_KEY = 'transfer_booking_data';

interface TransferBookingFormProps {
  defaultDestination?: string;
}

export default function TransferBookingForm({ defaultDestination }: TransferBookingFormProps = {}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [pickupCoords, setPickupCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [dropoffCoords, setDropoffCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [promoCodeValue, setPromoCodeValue] = useState('');
  const [promoCodeError, setPromoCodeError] = useState('');
  const [promoCodeApplied, setPromoCodeApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  // Formularz dla kroku 1
  const step1Form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      passengers: 1,
    },
  });

  // Formularz dla kroku 2
  const step2Form = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      vehicleType: 'standard',
    },
  });

  // Formularz dla kroku 3
  const step3Form = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      paymentMethod: 'online',
    },
  });

  const pickup = step1Form.watch('pickup');
  const dropoff = step1Form.watch('dropoff');
  const vehicleType = step2Form.watch('vehicleType');
  const paymentMethod = step3Form.watch('paymentMethod');

  // Typy pojazdów z mnożnikiem ceny
  const vehicleTypes = [
    {
      id: 'standard' as const,
      name: 'Standard',
      description: 'Komfortowe auto średniej klasy',
      example: 'VW Passat / Toyota Camry',
      capacity: '1-4 osoby',
      icon: Car,
      multiplier: 1.0,
      features: ['Klimatyzacja', 'Bagażnik 450L'],
    },
    {
      id: 'premium' as const,
      name: 'Premium',
      description: 'Luksusowy pojazd klasy wyższej',
      example: 'Mercedes E / BMW 5',
      capacity: '1-4 osoby',
      icon: Sparkles,
      multiplier: 1.5,
      features: ['Skórzana tapicerka', 'Wi-Fi', 'Woda'],
    },
    {
      id: 'van' as const,
      name: 'Van',
      description: 'Przestronny dla większych grup',
      example: 'Mercedes V / VW Caravelle',
      capacity: '5-8 osób',
      icon: Users,
      multiplier: 1.8,
      features: ['Dużo miejsca', 'Bagażnik 1000L'],
    },
    {
      id: 'vip' as const,
      name: 'VIP',
      description: 'Ekskluzywna klasa premium',
      example: 'Mercedes S / BMW 7 / Audi A8',
      capacity: '1-3 osoby',
      icon: Crown,
      multiplier: 2.5,
      features: ['Maksymalny luksus', 'Szampan', 'Prasa'],
    },
  ];

  // Wczytaj dane z localStorage przy montowaniu
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.step1) {
          step1Form.setValue('pickup', data.step1.pickup || '');
          step1Form.setValue('dropoff', data.step1.dropoff || defaultDestination || '');
          if (data.step1.date) step1Form.setValue('date', new Date(data.step1.date));
          step1Form.setValue('passengers', data.step1.passengers || 1);
          if (data.step1.pickupCoords) setPickupCoords(data.step1.pickupCoords);
          if (data.step1.dropoffCoords) setDropoffCoords(data.step1.dropoffCoords);
        }
        if (data.step2) {
          step2Form.setValue('vehicleType', data.step2.vehicleType || 'standard');
          if (data.step2.promoCode) {
            setPromoCodeValue(data.step2.promoCode);
            setPromoCodeApplied(true);
            setDiscount(10);
          }
        }
        if (data.currentStep) setCurrentStep(data.currentStep);
      } catch (e) {
        console.error('Błąd wczytywania danych:', e);
      }
    } else if (defaultDestination) {
      // Ustaw domyślną destynację, jeśli nie ma zapisanych danych
      step1Form.setValue('dropoff', defaultDestination);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Blokuj scroll body gdy modal jest otwarty (krok 2 lub 3)
  useEffect(() => {
    if (currentStep === 2 || currentStep === 3) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    // Cleanup przy unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [currentStep]);

  // Zapisz dane do localStorage
  const saveToLocalStorage = () => {
    const data = {
      currentStep,
      step1: {
        ...step1Form.getValues(),
        pickupCoords,
        dropoffCoords,
      },
      step2: {
        ...step2Form.getValues(),
        promoCode: promoCodeApplied ? promoCodeValue : '',
      },
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  // Oblicz cenę na podstawie odległości i typu pojazdu
  const calculatePrice = (vehicleId?: string) => {
    if (!pickupCoords || !dropoffCoords) return 0;

    const R = 6371;
    const dLat = ((dropoffCoords.lat - pickupCoords.lat) * Math.PI) / 180;
    const dLon = ((dropoffCoords.lng - pickupCoords.lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((pickupCoords.lat * Math.PI) / 180) *
        Math.cos((dropoffCoords.lat * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    const vehicle = vehicleTypes.find(v => v.id === (vehicleId || vehicleType));
    const multiplier = vehicle?.multiplier || 1;
    const basePrice = distance * 3 + 20;
    const price = Math.round(basePrice * multiplier);

    // Zastosuj zniżkę jeśli promo code jest aktywny
    if (promoCodeApplied && discount > 0) {
      return Math.round(price * (1 - discount / 100));
    }

    return price;
  };

  // Przelicz cenę gdy zmieni się typ pojazdu lub współrzędne
  useEffect(() => {
    if (pickupCoords && dropoffCoords) {
      const price = calculatePrice();
      setEstimatedPrice(price);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicleType, pickupCoords, dropoffCoords, promoCodeApplied, discount]);

  // Obsługa promo code
  const handleApplyPromoCode = () => {
    if (promoCodeValue.toUpperCase() === 'PROMO10') {
      setPromoCodeApplied(true);
      setDiscount(10);
      setPromoCodeError('');
      const price = calculatePrice();
      setEstimatedPrice(price);
    } else {
      setPromoCodeError('Kod nieprawidłowy');
      setPromoCodeApplied(false);
      setDiscount(0);
    }
  };

  // Krok 1: Przejdź dalej
  const handleStep1Submit = step1Form.handleSubmit(() => {
    saveToLocalStorage();
    setCurrentStep(2);
  });

  // Krok 2: Przejdź dalej
  const handleStep2Submit = step2Form.handleSubmit(() => {
    saveToLocalStorage();
    setCurrentStep(3);
  });

  // Krok 3: Finalna rezerwacja
  const handleStep3Submit = step3Form.handleSubmit(async (data) => {
    try {
      const bookingData = {
        ...step1Form.getValues(),
        ...step2Form.getValues(),
        ...data,
        price: estimatedPrice,
        discount: promoCodeApplied ? discount : 0,
      };

      console.log('Booking data:', bookingData);

      if (data.paymentMethod === 'online') {
        // TODO: Integracja z Braintree
        alert('Płatność online - integracja w trakcie');
      } else {
        // Zapłata kierowcy - potwierdzenie
        localStorage.removeItem(STORAGE_KEY);
        alert('Rezerwacja potwierdzona! Zapłata u kierowcy.');
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Błąd podczas rezerwacji');
    }
  });

  return (
    <>
      {/* KROK 1 - Normalny formularz */}
      {currentStep === 1 && (
        <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Krok 1 z 3</span>
              <span className="text-sm text-gray-500">Szczegóły transferu</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: '33.33%' }}
              />
            </div>
          </div>

          <form onSubmit={handleStep1Submit} className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Szczegóły transferu
            </h2>

          {/* Lokalizacje */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <LocationAutocomplete
                value={pickup || ''}
                onChange={(value, coords) => {
                  step1Form.setValue('pickup', value);
                  if (coords) {
                    setPickupCoords(coords);
                  }
                }}
                label="Miejsce odbioru"
                placeholder="np. Lotnisko Kraków-Balice"
              />
              {step1Form.formState.errors.pickup && (
                <p className="text-red-500 text-sm mt-1">
                  {step1Form.formState.errors.pickup.message}
                </p>
              )}
            </div>

            <div>
              <LocationAutocomplete
                value={dropoff || ''}
                onChange={(value, coords) => {
                  step1Form.setValue('dropoff', value);
                  if (coords) {
                    setDropoffCoords(coords);
                  }
                }}
                label="Miejsce docelowe"
                placeholder="np. Rynek Główny, Kraków"
              />
              {step1Form.formState.errors.dropoff && (
                <p className="text-red-500 text-sm mt-1">
                  {step1Form.formState.errors.dropoff.message}
                </p>
              )}
            </div>
          </div>

          {/* Data/Czas i Pasażerowie */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data i godzina odbioru
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10 pointer-events-none" />
                <Flatpickr
                  options={{
                    enableTime: true,
                    dateFormat: 'Y-m-d H:i',
                    minDate: 'today',
                    time_24hr: true,
                    locale: Polish,
                    minuteIncrement: 15,
                  }}
                  onChange={(dates) => {
                    if (dates[0]) step1Form.setValue('date', dates[0]);
                  }}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="Wybierz datę i godzinę"
                />
              </div>
              {step1Form.formState.errors.date && (
                <p className="text-red-500 text-sm mt-1">
                  {step1Form.formState.errors.date.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Liczba pasażerów
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  {...step1Form.register('passengers', { valueAsNumber: true })}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition appearance-none bg-white"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'osoba' : 'osoby'}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
          >
            Dalej
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
        </div>
      )}

      {/* KROK 2 i 3 - Fullscreen Modal */}
      {(currentStep === 2 || currentStep === 3) && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto animate-fadeIn">
          <div className="min-h-screen w-full bg-white md:m-4 md:rounded-2xl md:shadow-2xl md:max-w-6xl animate-slideUp">
            {/* Close button */}
            <div className="sticky top-0 bg-white z-10 border-b border-gray-200 px-4 md:px-8 py-4 flex items-center justify-between md:rounded-t-2xl">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                {currentStep === 2 ? 'Wybierz pojazd' : 'Dane i płatność'}
              </h2>
              <button
                type="button"
                onClick={() => {
                  setCurrentStep(1);
                  saveToLocalStorage();
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Progress bar */}
            <div className="px-4 md:px-8 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Krok {currentStep} z 3</span>
                <span className="text-sm text-gray-500">
                  {currentStep === 2 && 'Wybór pojazdu'}
                  {currentStep === 3 && 'Dane i płatność'}
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                />
              </div>
            </div>

            {/* Content */}
            <div className="px-4 md:px-8 py-6 md:py-8 pb-12">
              <div className="max-w-4xl mx-auto">
              {/* KROK 2: Promo code + wybór pojazdu */}
              {currentStep === 2 && (
                <form onSubmit={handleStep2Submit} className="space-y-6">

          {/* Promo code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kod promocyjny (opcjonalnie)
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={promoCodeValue}
                  onChange={(e) => {
                    setPromoCodeValue(e.target.value.toUpperCase());
                    setPromoCodeError('');
                    setPromoCodeApplied(false);
                  }}
                  placeholder="np. PROMO10"
                  disabled={promoCodeApplied}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:bg-gray-100"
                />
              </div>
              <button
                type="button"
                onClick={handleApplyPromoCode}
                disabled={promoCodeApplied}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {promoCodeApplied ? <Check className="w-5 h-5" /> : 'Zastosuj'}
              </button>
            </div>
            {promoCodeError && (
              <p className="text-red-500 text-sm mt-1">{promoCodeError}</p>
            )}
            {promoCodeApplied && (
              <p className="text-green-600 text-sm mt-1 flex items-center gap-1">
                <Check className="w-4 h-4" />
                Kod zastosowany! Zniżka -{discount}%
              </p>
            )}
          </div>

          {/* Wybór typu pojazdu z cenami */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Wybierz typ pojazdu
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {vehicleTypes.map((vehicle) => {
                const price = calculatePrice(vehicle.id);
                const originalPrice = promoCodeApplied 
                  ? Math.round(price / (1 - discount / 100))
                  : price;

                return (
                  <button
                    key={vehicle.id}
                    type="button"
                    onClick={() => step2Form.setValue('vehicleType', vehicle.id)}
                    className={`relative p-6 border-2 rounded-xl transition-all text-left ${
                      vehicleType === vehicle.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <vehicle.icon
                        className={`w-8 h-8 flex-shrink-0 ${
                          vehicleType === vehicle.id ? 'text-blue-600' : 'text-gray-600'
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-lg text-gray-900 mb-1">{vehicle.name}</p>
                        <p className="text-sm text-gray-600 mb-1">{vehicle.example}</p>
                        <p className="text-xs text-gray-500 mb-3">{vehicle.capacity}</p>
                        
                        <div className="flex items-baseline gap-2">
                          {promoCodeApplied && (
                            <span className="text-lg text-gray-400 line-through">
                              {originalPrice} PLN
                            </span>
                          )}
                          <span className="text-2xl font-bold text-blue-600">
                            {price} PLN
                          </span>
                        </div>
                      </div>
                    </div>

                    {vehicleType === vehicle.id && (
                      <div className="absolute top-4 right-4">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
            {step2Form.formState.errors.vehicleType && (
              <p className="text-red-500 text-sm mt-2">
                {step2Form.formState.errors.vehicleType.message}
              </p>
            )}
          </div>

          {/* Nawigacja */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => {
                saveToLocalStorage();
                setCurrentStep(1);
              }}
              className="flex-1 bg-gray-200 text-gray-700 font-semibold py-4 px-6 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Wstecz
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white font-semibold py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              Przejdź do płatności
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>
      )}

      {/* KROK 3: Dane kontaktowe + płatność */}
      {currentStep === 3 && (
        <form onSubmit={handleStep3Submit} className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Dane kontaktowe i płatność
          </h2>

          {/* Podsumowanie rezerwacji */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <h3 className="font-semibold text-gray-900 mb-4">Podsumowanie</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Trasa:</span>
                <span className="font-medium text-gray-900">
                  {step1Form.getValues('pickup')} → {step1Form.getValues('dropoff')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Data:</span>
                <span className="font-medium text-gray-900">
                  {step1Form.getValues('date')?.toLocaleString('pl-PL')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pasażerowie:</span>
                <span className="font-medium text-gray-900">
                  {step1Form.getValues('passengers')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pojazd:</span>
                <span className="font-medium text-gray-900">
                  {vehicleTypes.find(v => v.id === vehicleType)?.name}
                </span>
              </div>
              {promoCodeApplied && (
                <div className="flex justify-between text-green-600">
                  <span>Kod promocyjny:</span>
                  <span className="font-medium">-{discount}%</span>
                </div>
              )}
              <div className="pt-2 border-t border-blue-200 flex justify-between items-baseline">
                <span className="text-gray-900 font-semibold">Cena całkowita:</span>
                <span className="text-3xl font-bold text-blue-600">{estimatedPrice} PLN</span>
              </div>
            </div>
          </div>

          {/* Dane kontaktowe */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Imię
              </label>
              <input
                type="text"
                {...step3Form.register('firstName')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="Jan"
              />
              {step3Form.formState.errors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {step3Form.formState.errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nazwisko
              </label>
              <input
                type="text"
                {...step3Form.register('lastName')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="Kowalski"
              />
              {step3Form.formState.errors.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {step3Form.formState.errors.lastName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                {...step3Form.register('email')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="jan.kowalski@email.com"
              />
              {step3Form.formState.errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {step3Form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefon
              </label>
              <input
                type="tel"
                {...step3Form.register('phone')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="+48 123 456 789"
              />
              {step3Form.formState.errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {step3Form.formState.errors.phone.message}
                </p>
              )}
            </div>
          </div>

          {/* Metoda płatności */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Metoda płatności
            </label>
            <div className="grid md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => step3Form.setValue('paymentMethod', 'online')}
                className={`p-6 border-2 rounded-xl transition-all text-left ${
                  paymentMethod === 'online'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start gap-4">
                  <CreditCard
                    className={`w-8 h-8 ${
                      paymentMethod === 'online' ? 'text-blue-600' : 'text-gray-600'
                    }`}
                  />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Płatność online</p>
                    <p className="text-sm text-gray-600">Karta płatnicza / BLIK</p>
                  </div>
                </div>
                {paymentMethod === 'online' && (
                  <div className="absolute top-4 right-4">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
              </button>

              <button
                type="button"
                onClick={() => step3Form.setValue('paymentMethod', 'cash')}
                className={`p-6 border-2 rounded-xl transition-all text-left relative ${
                  paymentMethod === 'cash'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start gap-4">
                  <Banknote
                    className={`w-8 h-8 ${
                      paymentMethod === 'cash' ? 'text-blue-600' : 'text-gray-600'
                    }`}
                  />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Zapłać kierowcy</p>
                    <p className="text-sm text-gray-600">Gotówka lub karta u kierowcy</p>
                  </div>
                </div>
                {paymentMethod === 'cash' && (
                  <div className="absolute top-4 right-4">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Nawigacja */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => {
                saveToLocalStorage();
                setCurrentStep(2);
              }}
              className="flex-1 bg-gray-200 text-gray-700 font-semibold py-4 px-6 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Wstecz
            </button>
            <button
              type="submit"
              disabled={step3Form.formState.isSubmitting}
              className="flex-1 bg-green-600 text-white font-semibold py-4 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              {step3Form.formState.isSubmitting ? 'Przetwarzanie...' : 'Potwierdź rezerwację'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <p className="text-sm text-gray-500 text-center">
            Bezpłatna anulacja do 24h przed transferem
          </p>
        </form>
      )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
