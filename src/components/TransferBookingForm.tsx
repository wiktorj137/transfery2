'use client';

import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useBookingForm } from '@/hooks/useBookingForm';
import { StepIndicator } from './ui/StepIndicator';
import { BookingModal } from './ui/BookingModal';
import { BookingStep1 } from './booking/BookingStep1Form';
import { BookingStep2 } from './booking/BookingStep2Form';
import { BookingStep3 } from './booking/BookingStep3Form';

/**
 * Main Booking Form Component
 * Clean orchestrator pattern - delegates to specialized components
 * Business logic extracted to useBookingForm hook
 * 
 * Before refactor: 910 lines (monster!)
 * After refactor: ~150 lines (readable!)
 */

interface TransferBookingFormProps {
  defaultDestination?: string;
}

const STEPS = [
  { number: 1, label: 'Route' },
  { number: 2, label: 'Vehicle' },
  { number: 3, label: 'Payment' },
];

export default function TransferBookingForm({ defaultDestination }: TransferBookingFormProps = {}) {
  // All business logic in custom hook
  const {
    currentStep,
    isMounted,
    estimatedPrice,
    promoCode,
    promoError,
    promoApplied,
    discount,
    step1Form,
    step2Form,
    step3Form,
    setPickupCoords,
    setDropoffCoords,
    applyPromoCode,
    updatePromoCode,
    goToStep,
    prevStep,
    calculatePrice,
    handleStep1Submit,
    handleStep2Submit,
    handleStep3Submit,
  } = useBookingForm({ defaultDestination });

  return (
    <>
      {/* STEP 1: Route Selection (Inline) */}
      {currentStep === 1 && (
        <div className="w-full bg-transparent">
          {/* Compact Step Indicator */}
          <StepIndicator 
            currentStep={currentStep} 
            steps={STEPS.map(s => ({ number: s.number, name: s.label, description: '' }))} 
          />

          {/* Step 1 Form */}
          <form onSubmit={handleStep1Submit} className="space-y-3 sm:space-y-4">
            <BookingStep1
              form={step1Form}
              onPickupChange={(address, coords) => {
                step1Form.setValue('pickup', address);
                if (coords) setPickupCoords(coords);
              }}
              onDropoffChange={(address, coords) => {
                step1Form.setValue('dropoff', address);
                if (coords) setDropoffCoords(coords);
              }}
            />

            {/* Submit Button */}
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

      {/* STEP 2 & 3: Modal */}
      {(currentStep === 2 || currentStep === 3) && isMounted && (
        <BookingModal
          isOpen={currentStep > 1}
          onClose={() => goToStep(1)}
          title={currentStep === 2 ? 'Select Vehicle' : 'Details & Payment'}
        >
          {/* Step Indicator */}
          <div className="mb-6">
            <StepIndicator 
              currentStep={currentStep} 
              steps={STEPS.map(s => ({ number: s.number, name: s.label, description: '' }))} 
            />
          </div>

          {/* STEP 2: Vehicle Selection */}
          {currentStep === 2 && (
            <form onSubmit={handleStep2Submit}>
              <BookingStep2
                form={step2Form}
                calculatePrice={calculatePrice}
                promoCode={promoCode}
                promoError={promoError}
                promoApplied={promoApplied}
                discount={discount}
                onPromoChange={updatePromoCode}
                onPromoApply={applyPromoCode}
              />

              {/* Navigation */}
              <div className="flex gap-4 sticky bottom-0 bg-white pt-4 pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:static border-t border-gray-200 md:border-0 mt-6">
                <button
                  type="button"
                  onClick={prevStep}
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

          {/* STEP 3: Contact & Payment */}
          {currentStep === 3 && (
            <form onSubmit={handleStep3Submit}>
              <BookingStep3
                form={step3Form}
                step1Form={step1Form}
                step2Form={step2Form}
                estimatedPrice={estimatedPrice}
                promoApplied={promoApplied}
                discount={discount}
              />

              {/* Navigation */}
              <div className="flex gap-4 sticky bottom-0 bg-white pt-4 pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:static border-t border-gray-200 md:border-0 mt-6">
                <button
                  type="button"
                  onClick={prevStep}
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
            </form>
          )}
        </BookingModal>
      )}
    </>
  );
}
