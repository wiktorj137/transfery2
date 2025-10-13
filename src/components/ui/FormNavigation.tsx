'use client';

import { memo } from 'react';
import { ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
  isNextDisabled?: boolean;
  isSubmitting?: boolean;
  showPrice?: boolean;
  price?: number;
  discount?: number;
  finalPrice?: number;
}

export const FormNavigation = memo(function FormNavigation({
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  onSubmit,
  isNextDisabled = false,
  isSubmitting = false,
  showPrice = false,
  price,
  discount = 0,
  finalPrice,
}: FormNavigationProps) {
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="space-y-4">
      {/* Price Summary (if available) */}
      {showPrice && finalPrice && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Estimated Price</p>
              {discount > 0 && price && (
                <p className="text-sm text-gray-400 line-through">{price} PLN</p>
              )}
              <p className="text-2xl font-bold text-blue-600">
                {finalPrice} PLN
              </p>
            </div>
            {discount > 0 && (
              <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                -{discount} PLN saved
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-3">
        {currentStep > 1 && (
          <button
            type="button"
            onClick={onPrev}
            disabled={isSubmitting}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all",
              "border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
        )}

        {isLastStep ? (
          <button
            type="button"
            onClick={onSubmit}
            disabled={isNextDisabled || isSubmitting}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all",
              "bg-gradient-to-r from-blue-600 to-indigo-600 text-white",
              "hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg",
              "transform hover:scale-[1.02] active:scale-[0.98]"
            )}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Complete Booking
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            disabled={isNextDisabled || isSubmitting}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all",
              "bg-gradient-to-r from-blue-600 to-indigo-600 text-white",
              "hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg",
              "transform hover:scale-[1.02] active:scale-[0.98]"
            )}
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
});
