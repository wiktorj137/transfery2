import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { BookingData, VehicleType, PaymentMethod } from '@/types';

interface BookingStore extends Partial<BookingData> {
  currentStep: number;
  _hasHydrated: boolean;
  
  // Actions
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setHasHydrated: (state: boolean) => void;
  
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
      _hasHydrated: false,
      
      // Hydration
      setHasHydrated: (state) => set({ _hasHydrated: state }),
      
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
      storage: createJSONStorage(() => {
        // SSR-safe: Only use localStorage in browser environment
        if (typeof window !== 'undefined') {
          return localStorage;
        }
        // Fallback for SSR - no persistence
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
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
      // Custom serialization/deserialization for Date objects
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Convert date strings back to Date objects
          if (state.date && typeof state.date === 'string') {
            state.date = new Date(state.date);
          }
          // Mark store as hydrated
          state.setHasHydrated(true);
        }
      },
    }
  )
);

/**
 * Hook to check if store has been hydrated from localStorage
 * Use this to prevent hydration mismatches in SSR
 * 
 * @example
 * const hasHydrated = useHasHydrated();
 * if (!hasHydrated) return <Skeleton />;
 */
export const useHasHydrated = () => {
  return useBookingStore((state) => state._hasHydrated);
};
