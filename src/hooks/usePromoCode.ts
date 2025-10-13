import { useState, useCallback } from 'react';
import { validatePromoCodeAction } from '@/app/actions/pricing';

/**
 * Custom hook for promo code validation
 */

interface UsePromoCodeReturn {
  isValidating: boolean;
  isValid: boolean;
  error: string | null;
  discountAmount: number;
  message: string | null;
  validateCode: (code: string, amount: number) => Promise<void>;
  reset: () => void;
}

export function usePromoCode(): UsePromoCodeReturn {
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [message, setMessage] = useState<string | null>(null);

  const validateCode = useCallback(async (code: string, amount: number) => {
    if (!code || code.length < 3) {
      setError('Please enter a valid promo code');
      return;
    }

    setIsValidating(true);
    setError(null);
    setMessage(null);

    try {
      const result = await validatePromoCodeAction(code, amount);

      if (result.success && result.data) {
        setIsValid(result.data.isValid);
        setDiscountAmount(result.data.discountAmount);
        setMessage(result.data.message);

        if (!result.data.isValid) {
          setError(result.data.message);
        }
      } else {
        setError(result.error || 'Failed to validate promo code');
        setIsValid(false);
      }
    } catch (err) {
      setError('Failed to validate promo code');
      setIsValid(false);
    } finally {
      setIsValidating(false);
    }
  }, []);

  const reset = useCallback(() => {
    setIsValidating(false);
    setIsValid(false);
    setError(null);
    setDiscountAmount(0);
    setMessage(null);
  }, []);

  return {
    isValidating,
    isValid,
    error,
    discountAmount,
    message,
    validateCode,
    reset,
  };
}
