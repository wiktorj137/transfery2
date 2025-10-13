'use client';

import { useBookingStore } from '@/store/bookingStore';
import { StepIndicator } from '@/components/ui/StepIndicator';
import { BookingStep1 } from '@/components/booking/BookingStep1';
import { BookingStep2 } from '@/components/booking/BookingStep2';
import { BookingStep3 } from '@/components/booking/BookingStep3';

/**
 * Main Booking Form Component
 * Refactored from 900+ lines monolith to clean component composition
 */

const STEPS = [
  {
    number: 1,
    name: 'Route',
    description: 'Pick up & drop off',
  },
  {
    number: 2,
    name: 'Vehicle',
    description: 'Select your ride',
  },
  {
    number: 3,
    name: 'Details',
    description: 'Contact & payment',
  },
];

export default function TransferBookingForm() {
  const { currentStep, nextStep, prevStep, reset } = useBookingStore();

  const handleComplete = () => {
    // Show success message
    alert('Booking submitted successfully! Check your email for confirmation.');
    
    // Reset form
    reset();
  };

  return (
    <div className="w-full">
      <StepIndicator currentStep={currentStep} steps={STEPS} />

      <div className="mt-8">
        {currentStep === 1 && <BookingStep1 onNext={nextStep} />}
        {currentStep === 2 && <BookingStep2 onNext={nextStep} onBack={prevStep} />}
        {currentStep === 3 && (
          <BookingStep3 onBack={prevStep} onComplete={handleComplete} />
        )}
      </div>
    </div>
  );
}
