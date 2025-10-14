'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

/**
 * Custom hook for booking form logic
 * Separates business logic from presentation
 */

// Validation schemas
const step1Schema = z.object({
  pickup: z.string().min(5, 'Please enter pickup location'),
  dropoff: z.string().min(5, 'Please enter drop-off location'),
  date: z.date({ message: 'Please select date and time' }),
  passengers: z.number().min(1).max(8),
});

const step2Schema = z.object({
  vehicleType: z.enum(['standard', 'premium', 'van', 'vip'], {
    message: 'Please select vehicle type',
  }),
  promoCode: z.string().optional(),
});

const step3Schema = z.object({
  firstName: z.string().min(2, 'Please enter first name'),
  lastName: z.string().min(2, 'Please enter last name'),
  email: z.string().email('Please enter valid email'),
  phone: z.string().min(9, 'Please enter valid phone number'),
  paymentMethod: z.enum(['online', 'cash'], {
    message: 'Please select payment method',
  }),
});

export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;

const STORAGE_KEY = 'transfer_booking_data';

// Vehicle types configuration
export const VEHICLE_TYPES = [
  {
    id: 'standard' as const,
    name: 'Standard',
    description: 'Comfortable mid-size car',
    example: 'VW Passat / Toyota Camry',
    capacity: '1-4 people',
    multiplier: 1.0,
    features: ['Air conditioning', 'Trunk 450L'],
  },
  {
    id: 'premium' as const,
    name: 'Premium',
    description: 'Luxury higher-class vehicle',
    example: 'Mercedes E / BMW 5',
    capacity: '1-4 people',
    multiplier: 1.5,
    features: ['Leather seats', 'Wi-Fi', 'Water'],
  },
  {
    id: 'van' as const,
    name: 'Van',
    description: 'Spacious for larger groups',
    example: 'Mercedes V / VW Caravelle',
    capacity: '5-8 people',
    multiplier: 1.8,
    features: ['Lots of space', 'Trunk 1000L'],
  },
  {
    id: 'vip' as const,
    name: 'VIP',
    description: 'Exclusive premium class',
    example: 'Mercedes S / BMW 7 / Audi A8',
    capacity: '1-3 people',
    multiplier: 2.5,
    features: ['Maximum luxury', 'Champagne', 'Press'],
  },
] as const;

interface UseBookingFormOptions {
  defaultDestination?: string;
}

export function useBookingForm({ defaultDestination }: UseBookingFormOptions = {}) {
  // Step management
  const [currentStep, setCurrentStep] = useState(1);
  const [isMounted, setIsMounted] = useState(false);

  // Location coordinates
  const [pickupCoords, setPickupCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [dropoffCoords, setDropoffCoords] = useState<{ lat: number; lng: number } | null>(null);

  // Price and promo
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  // Forms
  const step1Form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: { passengers: 1 },
  });

  const step2Form = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: { vehicleType: 'standard' },
  });

  const step3Form = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: { paymentMethod: 'online' },
  });

  // Watchers
  const vehicleType = step2Form.watch('vehicleType');

  // SSR safety
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Load from localStorage on mount
  useEffect(() => {
    // Check for booking_prefill first (from location selection)
    const prefill = localStorage.getItem('booking_prefill');
    if (prefill) {
      try {
        const prefillData = JSON.parse(prefill);
        if (prefillData.pickup) step1Form.setValue('pickup', prefillData.pickup);
        if (prefillData.dropoff) step1Form.setValue('dropoff', prefillData.dropoff);
        if (prefillData.pickupCoords) setPickupCoords(prefillData.pickupCoords);
        if (prefillData.dropoffCoords) setDropoffCoords(prefillData.dropoffCoords);
        // Clear prefill after loading
        localStorage.removeItem('booking_prefill');
      } catch (error) {
        console.error('Error loading prefill:', error);
      }
    }

    // Then load saved booking data
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.step1) {
          // Only load if not already prefilled
          if (!prefill) {
            step1Form.setValue('pickup', data.step1.pickup || '');
            step1Form.setValue('dropoff', data.step1.dropoff || defaultDestination || '');
            if (data.step1.pickupCoords) setPickupCoords(data.step1.pickupCoords);
            if (data.step1.dropoffCoords) setDropoffCoords(data.step1.dropoffCoords);
          }
          if (data.step1.date) step1Form.setValue('date', new Date(data.step1.date));
          step1Form.setValue('passengers', data.step1.passengers || 1);
        }
        if (data.step2) {
          step2Form.setValue('vehicleType', data.step2.vehicleType || 'standard');
          if (data.step2.promoCode) {
            setPromoCode(data.step2.promoCode);
            setPromoApplied(true);
            setDiscount(10);
          }
        }
      } catch (error) {
        // Ignore parsing errors
      }
    } else if (defaultDestination) {
      step1Form.setValue('dropoff', defaultDestination);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Block body scroll when modal is open
  useEffect(() => {
    if (currentStep === 2 || currentStep === 3) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    };
  }, [currentStep]);

  // Save to localStorage
  const saveToStorage = () => {
    const data = {
      currentStep,
      step1: {
        ...step1Form.getValues(),
        pickupCoords,
        dropoffCoords,
      },
      step2: {
        ...step2Form.getValues(),
        promoCode: promoApplied ? promoCode : '',
      },
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  // Calculate price based on distance and vehicle type
  const calculatePrice = (vehicleId?: string) => {
    if (!pickupCoords || !dropoffCoords) return 0;

    // Haversine formula
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

    const vehicle = VEHICLE_TYPES.find((v) => v.id === (vehicleId || vehicleType));
    const multiplier = vehicle?.multiplier || 1;
    const basePrice = distance * 3 + 20;
    const price = Math.round(basePrice * multiplier);

    // Apply discount
    if (promoApplied && discount > 0) {
      return Math.round(price * (1 - discount / 100));
    }

    return price;
  };

  // Recalculate price when dependencies change
  useEffect(() => {
    if (pickupCoords && dropoffCoords) {
      const price = calculatePrice();
      setEstimatedPrice(price);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicleType, pickupCoords, dropoffCoords, promoApplied, discount]);

  // Promo code handlers
  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'PROMO10') {
      setPromoApplied(true);
      setDiscount(10);
      setPromoError('');
      const price = calculatePrice();
      setEstimatedPrice(price);
    } else {
      setPromoError('Invalid code');
      setPromoApplied(false);
      setDiscount(0);
    }
  };

  const updatePromoCode = (value: string) => {
    setPromoCode(value.toUpperCase());
    setPromoError('');
    setPromoApplied(false);
  };

  // Navigation handlers
  const goToStep = (step: number) => {
    saveToStorage();
    setCurrentStep(step);
  };

  const nextStep = () => {
    saveToStorage();
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    saveToStorage();
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // Form submission handlers
  const handleStep1Submit = step1Form.handleSubmit(() => {
    nextStep();
  });

  const handleStep2Submit = step2Form.handleSubmit(() => {
    nextStep();
  });

  const handleStep3Submit = step3Form.handleSubmit(async (data) => {
    try {
      const bookingData = {
        ...step1Form.getValues(),
        ...step2Form.getValues(),
        ...data,
        price: estimatedPrice,
        discount: promoApplied ? discount : 0,
      };

      if (data.paymentMethod === 'online') {
        // TODO: Payment gateway integration
        alert('Online payment - integration in progress');
      } else {
        localStorage.removeItem(STORAGE_KEY);
        alert('Booking confirmed! Payment to the driver.');
        window.location.href = '/';
      }
    } catch (error) {
      alert('Error during booking');
    }
  });

  return {
    // State
    currentStep,
    isMounted,
    pickupCoords,
    dropoffCoords,
    estimatedPrice,
    promoCode,
    promoError,
    promoApplied,
    discount,

    // Forms
    step1Form,
    step2Form,
    step3Form,

    // Watchers
    vehicleType,

    // Actions
    setPickupCoords,
    setDropoffCoords,
    applyPromoCode,
    updatePromoCode,
    goToStep,
    nextStep,
    prevStep,
    calculatePrice,

    // Handlers
    handleStep1Submit,
    handleStep2Submit,
    handleStep3Submit,
  };
}
