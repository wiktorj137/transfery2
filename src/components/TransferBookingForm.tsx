'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar, Users, ArrowRight, ArrowLeft, Car, Sparkles, Crown, Tag, Check, CreditCard, Banknote, X } from 'lucide-react';
import LocationAutocomplete from './LocationAutocomplete';

// Validation schema for step 1
const step1Schema = z.object({
  pickup: z.string().min(5, 'Please enter pickup location'),
  dropoff: z.string().min(5, 'Please enter drop-off location'),
  date: z.date({ message: 'Please select date and time' }),
  passengers: z.number().min(1).max(8),
});

// Validation schema for step 2
const step2Schema = z.object({
  vehicleType: z.enum(['standard', 'premium', 'van', 'vip'], {
    message: 'Please select vehicle type',
  }),
  promoCode: z.string().optional(),
});

// Validation schema for step 3
const step3Schema = z.object({
  firstName: z.string().min(2, 'Please enter first name'),
  lastName: z.string().min(2, 'Please enter last name'),
  email: z.string().email('Please enter valid email'),
  phone: z.string().min(9, 'Please enter valid phone number'),
  paymentMethod: z.enum(['online', 'cash'], {
    message: 'Please select payment method',
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
  const [isMounted, setIsMounted] = useState(false);

  // Sprawdź czy komponent jest zamontowany (dla SSR)
  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  // Vehicle types with price multiplier
  const vehicleTypes = [
    {
      id: 'standard' as const,
      name: 'Standard',
      description: 'Comfortable mid-size car',
      example: 'VW Passat / Toyota Camry',
      capacity: '1-4 people',
      icon: Car,
      multiplier: 1.0,
      features: ['Air conditioning', 'Trunk 450L'],
    },
    {
      id: 'premium' as const,
      name: 'Premium',
      description: 'Luxury higher-class vehicle',
      example: 'Mercedes E / BMW 5',
      capacity: '1-4 people',
      icon: Sparkles,
      multiplier: 1.5,
      features: ['Leather seats', 'Wi-Fi', 'Water'],
    },
    {
      id: 'van' as const,
      name: 'Van',
      description: 'Spacious for larger groups',
      example: 'Mercedes V / VW Caravelle',
      capacity: '5-8 people',
      icon: Users,
      multiplier: 1.8,
      features: ['Lots of space', 'Trunk 1000L'],
    },
    {
      id: 'vip' as const,
      name: 'VIP',
      description: 'Exclusive premium class',
      example: 'Mercedes S / BMW 7 / Audi A8',
      capacity: '1-3 people',
      icon: Crown,
      multiplier: 2.5,
      features: ['Maximum luxury', 'Champagne', 'Press'],
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
        // Zawsze zaczynaj od kroku 1 po odświeżeniu strony
        // (dane są zachowane, ale użytkownik musi przejść przez formularz)
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
      document.body.classList.add('modal-open');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    }
    
    // Cleanup przy unmount
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
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

  // Calculate price based on distance and vehicle type
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

    // Apply discount if promo code is active
    if (promoCodeApplied && discount > 0) {
      return Math.round(price * (1 - discount / 100));
    }

    return price;
  };

  // Recalculate price when vehicle type or coordinates change
  useEffect(() => {
    if (pickupCoords && dropoffCoords) {
      const price = calculatePrice();
      setEstimatedPrice(price);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicleType, pickupCoords, dropoffCoords, promoCodeApplied, discount]);

  // Handle promo code
  const handleApplyPromoCode = () => {
    if (promoCodeValue.toUpperCase() === 'PROMO10') {
      setPromoCodeApplied(true);
      setDiscount(10);
      setPromoCodeError('');
      const price = calculatePrice();
      setEstimatedPrice(price);
    } else {
      setPromoCodeError('Invalid code');
      setPromoCodeApplied(false);
      setDiscount(0);
    }
  };

  // Step 1: Continue
  const handleStep1Submit = step1Form.handleSubmit(() => {
    saveToLocalStorage();
    setCurrentStep(2);
  });

  // Step 2: Continue
  const handleStep2Submit = step2Form.handleSubmit(() => {
    saveToLocalStorage();
    setCurrentStep(3);
  });

  // Step 3: Final booking
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
        // TODO: Braintree integration
        alert('Online payment - integration in progress');
      } else {
        // Payment to driver - confirmation
        localStorage.removeItem(STORAGE_KEY);
        alert('Booking confirmed! Payment to the driver.');
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error during booking');
    }
  });

  return (
    <>
      {/* STEP 1 - Normal form */}
      {currentStep === 1 && (
        <div className="w-full bg-transparent">
          {/* Progress bar - Custom Stepper */}
          <div className="mb-4 sm:mb-5">
            <div className="flex items-center justify-between">
              {/* Step 1 */}
              <div className="flex flex-col items-center flex-1">
                <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  1
                </div>
                <span className={`text-xs mt-1.5 ${currentStep >= 1 ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>Route</span>
              </div>
              
              {/* Connector 1-2 */}
              <div className={`flex-1 h-1 mx-1.5 sm:mx-2 rounded-full transition-all ${currentStep > 1 ? 'bg-blue-300' : 'bg-gray-300'}`}></div>
              
              {/* Step 2 */}
              <div className="flex flex-col items-center flex-1">
                <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  2
                </div>
                <span className={`text-xs mt-1.5 ${currentStep >= 2 ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>Vehicle</span>
              </div>
              
              {/* Connector 2-3 */}
              <div className={`flex-1 h-1 mx-1.5 sm:mx-2 rounded-full transition-all ${currentStep > 2 ? 'bg-blue-300' : 'bg-gray-300'}`}></div>
              
              {/* Step 3 */}
              <div className="flex flex-col items-center flex-1">
                <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all ${currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  3
                </div>
                <span className={`text-xs mt-1.5 ${currentStep >= 3 ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>Payment</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleStep1Submit} className="space-y-3 sm:space-y-4">
          {/* From Location */}
          <div className="w-full">
            <LocationAutocomplete
              value={pickup || ''}
              onChange={(value, coords) => {
                step1Form.setValue('pickup', value);
                if (coords) {
                  setPickupCoords(coords);
                }
              }}
              label=""
              placeholder="From: Airport, Hotel, Address..."
            />
            {step1Form.formState.errors.pickup && (
              <p className="text-red-500 text-sm mt-1">
                {step1Form.formState.errors.pickup.message}
              </p>
            )}
          </div>

          {/* To Location */}
          <div className="w-full">
            <LocationAutocomplete
              value={dropoff || ''}
              onChange={(value, coords) => {
                step1Form.setValue('dropoff', value);
                if (coords) {
                  setDropoffCoords(coords);
                }
              }}
              label=""
              placeholder="To: City Center, Hotel, Address..."
            />
            {step1Form.formState.errors.dropoff && (
              <p className="text-red-500 text-sm mt-1">
                {step1Form.formState.errors.dropoff.message}
              </p>
            )}
          </div>

          {/* Date and Time - separated into two fields side by side */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full">
            {/* Date */}
            <div className="w-full min-w-0">
              <div className="relative w-full">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10" />
                <input
                  type="date"
                  {...step1Form.register('date', {
                    setValueAs: (value) => value ? new Date(value + 'T12:00:00') : undefined,
                  })}
                  min={new Date().toISOString().slice(0, 10)}
                  className="w-full pl-10 sm:pl-11 pr-2 sm:pr-3 py-3 sm:py-3.5 bg-white border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  style={{ 
                    fontSize: '16px',
                    WebkitAppearance: 'none',
                    appearance: 'none',
                    minHeight: '44px'
                  }}
                />
              </div>
              {step1Form.formState.errors.date && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {step1Form.formState.errors.date.message}
                </p>
              )}
            </div>

            {/* Time */}
            <div className="w-full min-w-0">
              <div className="relative w-full">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <input
                  type="time"
                  defaultValue="12:00"
                  className="w-full pl-10 sm:pl-11 pr-2 sm:pr-3 py-3 sm:py-3.5 bg-white border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  style={{ 
                    fontSize: '16px',
                    WebkitAppearance: 'none',
                    appearance: 'none',
                    minHeight: '44px'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Number of People */}
          <div className="w-full">
            <div className="relative w-full">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10" />
              <select
                {...step1Form.register('passengers', { valueAsNumber: true })}
                className="w-full pl-10 sm:pl-11 pr-8 sm:pr-10 py-3 sm:py-3.5 bg-white border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition appearance-none cursor-pointer"
                style={{ 
                  fontSize: '16px',
                  WebkitAppearance: 'none',
                  appearance: 'none',
                  minHeight: '44px'
                }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Person' : 'People'}
                  </option>
                ))}
              </select>
              <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 sm:py-3.5 px-6 rounded-xl hover:bg-blue-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-base sm:text-lg min-h-[48px]"
          >
            <span>Continue</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
        </div>
      )}

      {/* STEP 2 & 3 - Fullscreen Modal */}
      {(currentStep === 2 || currentStep === 3) && isMounted && createPortal(
        <div className="booking-modal-overlay fixed inset-0 bg-white md:bg-black/70 z-[9999] flex items-start justify-center overflow-y-auto animate-fadeIn">
          <div className="min-h-full h-auto w-full bg-white md:min-h-screen md:m-4 md:rounded-2xl md:shadow-2xl md:max-w-6xl animate-slideUp">
            {/* Close button */}
            <div className="sticky top-0 bg-white z-10 border-b border-gray-200 px-4 md:px-8 py-4 flex items-center justify-between md:rounded-t-2xl">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                {currentStep === 2 ? 'Select Vehicle' : 'Details & Payment'}
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

            {/* Progress bar - Custom Stepper */}
            <div className="px-4 md:px-8 py-4 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between max-w-md mx-auto">
                {/* Step 1 */}
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                    {currentStep > 1 ? <Check className="w-5 h-5" /> : '1'}
                  </div>
                  <span className={`text-xs sm:text-sm mt-2 ${currentStep >= 1 ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>Route</span>
                </div>
                
                {/* Connector 1-2 */}
                <div className={`flex-1 h-1 mx-2 rounded-full transition-all ${currentStep > 1 ? 'bg-blue-300' : 'bg-gray-300'}`}></div>
                
                {/* Step 2 */}
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                    {currentStep > 2 ? <Check className="w-5 h-5" /> : '2'}
                  </div>
                  <span className={`text-xs sm:text-sm mt-2 ${currentStep >= 2 ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>Vehicle</span>
                </div>
                
                {/* Connector 2-3 */}
                <div className={`flex-1 h-1 mx-2 rounded-full transition-all ${currentStep > 2 ? 'bg-blue-300' : 'bg-gray-300'}`}></div>
                
                {/* Step 3 */}
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                    3
                  </div>
                  <span className={`text-xs sm:text-sm mt-2 ${currentStep >= 3 ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>Payment</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-4 md:px-8 py-6 md:py-8 pb-20 md:pb-12 min-h-[calc(100vh-180px)]">
              <div className="max-w-4xl mx-auto">
              {/* STEP 2: Promo code + vehicle selection */}
              {currentStep === 2 && (
                <form onSubmit={handleStep2Submit} className="space-y-6">

          {/* Promo code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Promo Code (optional)
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
                  placeholder="e.g. PROMO10"
                  disabled={promoCodeApplied}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:bg-gray-100"
                  style={{ 
                    fontSize: '16px',
                    WebkitAppearance: 'none',
                    appearance: 'none',
                    minHeight: '48px'
                  }}
                />
              </div>
              <button
                type="button"
                onClick={handleApplyPromoCode}
                disabled={promoCodeApplied}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed min-h-[48px]"
              >
                {promoCodeApplied ? <Check className="w-5 h-5" /> : 'Apply'}
              </button>
            </div>
            {promoCodeError && (
              <p className="text-red-500 text-sm mt-1">{promoCodeError}</p>
            )}
            {promoCodeApplied && (
              <p className="text-green-600 text-sm mt-1 flex items-center gap-1">
                <Check className="w-4 h-4" />
                Code applied! Discount -{discount}%
              </p>
            )}
          </div>

          {/* Vehicle type selection with prices */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Vehicle Type
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

          {/* Navigation */}
          <div className="flex gap-4 sticky bottom-0 bg-white pt-4 pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:static border-t border-gray-200 md:border-0 mt-6">
            <button
              type="button"
              onClick={() => {
                saveToLocalStorage();
                setCurrentStep(1);
              }}
              className="flex-1 bg-gray-200 text-gray-700 font-semibold py-4 px-6 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2 min-h-[48px]"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white font-semibold py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl min-h-[48px]"
            >
              Payment
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>
      )}

      {/* STEP 3: Contact details + payment */}
      {currentStep === 3 && (
        <form onSubmit={handleStep3Submit} className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Contact Details & Payment
          </h2>

          {/* Booking summary */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <h3 className="font-semibold text-gray-900 mb-4">Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Route:</span>
                <span className="font-medium text-gray-900">
                  {step1Form.getValues('pickup')} → {step1Form.getValues('dropoff')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium text-gray-900">
                  {step1Form.getValues('date')?.toLocaleString('en-US')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Passengers:</span>
                <span className="font-medium text-gray-900">
                  {step1Form.getValues('passengers')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Vehicle:</span>
                <span className="font-medium text-gray-900">
                  {vehicleTypes.find(v => v.id === vehicleType)?.name}
                </span>
              </div>
              {promoCodeApplied && (
                <div className="flex justify-between text-green-600">
                  <span>Promo code:</span>
                  <span className="font-medium">-{discount}%</span>
                </div>
              )}
              <div className="pt-2 border-t border-blue-200 flex justify-between items-baseline">
                <span className="text-gray-900 font-semibold">Total Price:</span>
                <span className="text-3xl font-bold text-blue-600">{estimatedPrice} PLN</span>
              </div>
            </div>
          </div>

          {/* Contact details */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                {...step3Form.register('firstName')}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="John"
                style={{ 
                  fontSize: '16px',
                  WebkitAppearance: 'none',
                  appearance: 'none',
                  minHeight: '48px'
                }}
              />
              {step3Form.formState.errors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {step3Form.formState.errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                {...step3Form.register('lastName')}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="Smith"
                style={{ 
                  fontSize: '16px',
                  WebkitAppearance: 'none',
                  appearance: 'none',
                  minHeight: '48px'
                }}
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
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="john.smith@email.com"
                style={{ 
                  fontSize: '16px',
                  WebkitAppearance: 'none',
                  appearance: 'none',
                  minHeight: '48px'
                }}
              />
              {step3Form.formState.errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {step3Form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                {...step3Form.register('phone')}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="+48 123 456 789"
                style={{ 
                  fontSize: '16px',
                  WebkitAppearance: 'none',
                  appearance: 'none',
                  minHeight: '48px'
                }}
              />
              {step3Form.formState.errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {step3Form.formState.errors.phone.message}
                </p>
              )}
            </div>
          </div>

          {/* Payment method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Payment Method
            </label>
            <div className="grid md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => step3Form.setValue('paymentMethod', 'online')}
                className={`relative p-6 border-2 rounded-xl transition-all text-left ${
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
                    <p className="font-semibold text-gray-900 mb-1">Online Payment</p>
                    <p className="text-sm text-gray-600">Credit card / BLIK</p>
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
                    <p className="font-semibold text-gray-900 mb-1">Pay the Driver</p>
                    <p className="text-sm text-gray-600">Cash or card with driver</p>
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

          {/* Navigation */}
          <div className="flex gap-4 sticky bottom-0 bg-white pt-4 pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:static border-t border-gray-200 md:border-0 mt-6">
            <button
              type="button"
              onClick={() => {
                saveToLocalStorage();
                setCurrentStep(2);
              }}
              className="flex-1 bg-gray-200 text-gray-700 font-semibold py-4 px-6 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2 min-h-[48px]"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <button
              type="submit"
              disabled={step3Form.formState.isSubmitting}
              className="flex-1 bg-green-600 text-white font-semibold py-4 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 min-h-[48px]"
            >
              {step3Form.formState.isSubmitting ? 'Processing...' : 'Confirm'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <p className="text-sm text-gray-500 text-center pb-4">
            Free cancellation up to 24h before transfer
          </p>
        </form>
      )}
              </div>
            </div>
          </div>
        </div>
        ,document.body
      )}
    </>
  );
}
