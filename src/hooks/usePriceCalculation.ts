import { useState, useEffect } from 'react';
import { calculatePriceAction } from '@/app/actions/pricing';
import { useBookingStore } from '@/store/bookingStore';
import type { PriceCalculation } from '@/types';

/**
 * Custom hook for price calculation
 * Automatically calculates price when dependencies change
 */

export function usePriceCalculation() {
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [calculation, setCalculation] = useState<PriceCalculation | null>(null);
  
  const { pickupCoords, dropoffCoords, vehicleType, promoCode, date, setPrice } = useBookingStore();

  useEffect(() => {
    // Only calculate if we have all required data
    if (!pickupCoords || !dropoffCoords || !vehicleType || !date) {
      return;
    }

    let isCancelled = false;

    const calculatePrice = async () => {
      setIsCalculating(true);
      setError(null);

      try {
        const result = await calculatePriceAction({
          pickupCoords,
          dropoffCoords,
          vehicleType,
          promoCode,
          date: date,
        });

        if (!isCancelled) {
          if (result.success && result.data) {
            setCalculation(result.data);
            setPrice(result.data.basePrice, result.data.discount, result.data.finalPrice);
          } else {
            setError(result.error || 'Failed to calculate price');
          }
        }
      } catch (err) {
        if (!isCancelled) {
          setError('Failed to calculate price');
        }
      } finally {
        if (!isCancelled) {
          setIsCalculating(false);
        }
      }
    };

    calculatePrice();

    return () => {
      isCancelled = true;
    };
  }, [pickupCoords, dropoffCoords, vehicleType, promoCode, date, setPrice]);

  return {
    calculation,
    isCalculating,
    error,
    recalculate: () => {
      // Force recalculation
      if (pickupCoords && dropoffCoords && vehicleType && date) {
        calculatePriceAction({
          pickupCoords,
          dropoffCoords,
          vehicleType,
          promoCode,
          date: date,
        }).then((result) => {
          if (result.success && result.data) {
            setCalculation(result.data);
            setPrice(result.data.basePrice, result.data.discount, result.data.finalPrice);
          }
        });
      }
    },
  };
}
