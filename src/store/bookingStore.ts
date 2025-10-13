import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { BookingData, VehicleType, PaymentMethod } from '@/types';

interface BookingStore extends Partial<BookingData> {
  currentStep: number;
  
  // Actions
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  
  // Step 1
  setPickup: (address: string, coords?: { lat: number; lng: number }) => void;
  setDropoff: (address: string, coords?: { lat: number; lng: number }) => void;
  setDate: (date: Date) => void;
  setPassengers: (count: number) => void;
  
  // Step 2
  setVehicleType: (type: VehicleType) => void;
  setPromoCode: (code: string) => void;
  setPrice: (basePrice: number, discount: number, finalPrice: number) => void;
  
  // Step 3
  setPersonalInfo: (info: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  
  // Reset
  reset: () => void;
  isComplete: () => boolean;
}

const initialState = {
  currentStep: 1,
  passengers: 1,
  vehicleType: 'standard' as VehicleType,
  paymentMethod: 'online' as PaymentMethod,
};

export const useBookingStore = create<BookingStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      // Step management
      setStep: (step) => set({ currentStep: step }),
      nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 3) })),
      prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),
      
      // Step 1 actions
      setPickup: (address, coords) => set({ 
        pickup: address, 
        pickupCoords: coords 
      }),
      setDropoff: (address, coords) => set({ 
        dropoff: address, 
        dropoffCoords: coords 
      }),
      setDate: (date) => set({ date }),
      setPassengers: (passengers) => set({ passengers }),
      
      // Step 2 actions
      setVehicleType: (vehicleType) => set({ vehicleType }),
      setPromoCode: (promoCode) => set({ promoCode }),
      setPrice: (basePrice, discount, finalPrice) => set({ 
        basePrice, 
        discount, 
        finalPrice 
      }),
      
      // Step 3 actions
      setPersonalInfo: (info) => set(info),
      setPaymentMethod: (paymentMethod) => set({ paymentMethod }),
      
      // Utility
      reset: () => set(initialState),
      isComplete: () => {
        const state = get();
        return !!(
          state.pickup &&
          state.dropoff &&
          state.date &&
          state.vehicleType &&
          state.firstName &&
          state.lastName &&
          state.email &&
          state.phone &&
          state.paymentMethod
        );
      },
    }),
    {
      name: 'booking-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Only persist booking data, not actions
        pickup: state.pickup,
        pickupCoords: state.pickupCoords,
        dropoff: state.dropoff,
        dropoffCoords: state.dropoffCoords,
        date: state.date,
        passengers: state.passengers,
        vehicleType: state.vehicleType,
        promoCode: state.promoCode,
        basePrice: state.basePrice,
        discount: state.discount,
        finalPrice: state.finalPrice,
        currentStep: state.currentStep,
      }),
    }
  )
);
