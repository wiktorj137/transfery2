'use client';

import { useState } from 'react';
import { useBookingStore } from '@/store/bookingStore';
import { StepIndicator } from '@/components/ui/StepIndicator';
import { FormNavigation } from '@/components/ui/FormNavigation';
import { BookingStep1 } from '@/components/booking/BookingStep1';
import { BookingStep2 } from '@/components/booking/BookingStep2';
import { BookingStep3 } from '@/components/booking/BookingStep3';
import { submitBookingAction } from '@/app/actions/booking';
import { CheckCircle, XCircle } from 'lucide-react';

/**
 * Enhanced Transfer Booking Form
 * Best of both worlds: modern components + intuitive UX
 */

const STEPS = [
  {
    number: 1,
    name: 'Route',
    title: 'Route',
    description: 'Pick up & drop off',
  },
  {
    number: 2,
    name: 'Vehicle',
    title: 'Vehicle',
    description: 'Select your ride',
  },
  {
    number: 3,
    name: 'Details',
    title: 'Details',
    description: 'Contact & payment',
  },
];

export default function TransferBookingFormEnhanced() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    currentStep,
    nextStep,
    prevStep,
    reset,
    isComplete,
    // Step 1
    pickup,
    pickupCoords,
    dropoff,
    dropoffCoords,
    date,
    passengers,
    // Step 2
    vehicleType,
    promoCode,
    basePrice,
    discount,
    finalPrice,
    // Step 3
    firstName,
    lastName,
    email,
    phone,
    paymentMethod,
  } = useBookingStore();

  // Validate current step
  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return !!(pickup && dropoff && date && passengers);
      case 2:
        return !!vehicleType;
      case 3:
        return !!(firstName && lastName && email && phone && paymentMethod);
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (isStepValid()) {
      nextStep();
      // Smooth scroll to top on mobile
      if (window.innerWidth < 768) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleSubmit = async () => {
    if (!isComplete()) {
      setErrorMessage('Please fill in all required fields');
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
      return;
    }

    setIsSubmitting(true);
    setShowError(false);

    try {
      const bookingData = {
        pickup: pickup!,
        pickupCoords,
        dropoff: dropoff!,
        dropoffCoords,
        date: date!,
        passengers: passengers!,
        vehicleType: vehicleType!,
        promoCode,
        firstName: firstName!,
        lastName: lastName!,
        email: email!,
        phone: phone!,
        paymentMethod: paymentMethod!,
        basePrice,
        discount,
        finalPrice,
      };

      const result = await submitBookingAction(bookingData);

      if (result.success) {
        setShowSuccess(true);
        // Reset after showing success
        setTimeout(() => {
          reset();
          setShowSuccess(false);
        }, 5000);
      } else {
        setErrorMessage(result.error || 'Booking failed. Please try again.');
        setShowError(true);
        setTimeout(() => setShowError(false), 5000);
      }
    } catch {
      setErrorMessage('An unexpected error occurred. Please try again.');
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success Modal
  if (showSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-in fade-in duration-200">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in duration-300">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Booking Confirmed!
            </h3>
            <p className="text-gray-600 mb-6">
              We&apos;ve sent a confirmation email to <strong>{email}</strong>
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm text-gray-700">
                <strong>Booking Details:</strong>
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {pickup} → {dropoff}
              </p>
              <p className="text-sm text-gray-600">
                {date?.toLocaleDateString()} at {date?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </p>
              <p className="text-lg font-bold text-blue-600 mt-2">
                {finalPrice} PLN
              </p>
            </div>
            <button
              onClick={() => setShowSuccess(false)}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Book Your Transfer
        </h2>
        <p className="text-gray-600">
          Complete the form below to reserve your ride
        </p>
      </div>

      {/* Error Alert */}
      {showError && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-start gap-3">
            <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-red-900">
                Error
              </p>
              <p className="text-sm text-red-700 mt-1">
                {errorMessage}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Step Indicator */}
      <StepIndicator currentStep={currentStep} steps={STEPS} />

      {/* Form Content */}
      <div className="mt-8 space-y-6">
        {/* Step 1: Route */}
        <div className={currentStep === 1 ? 'block' : 'hidden'}>
          <BookingStep1 onNext={handleNext} />
        </div>

        {/* Step 2: Vehicle */}
        <div className={currentStep === 2 ? 'block' : 'hidden'}>
          <BookingStep2 onNext={handleNext} onBack={prevStep} />
        </div>

        {/* Step 3: Details */}
        <div className={currentStep === 3 ? 'block' : 'hidden'}>
          <BookingStep3 onBack={prevStep} onComplete={handleSubmit} />
        </div>

        {/* Navigation */}
        <FormNavigation
          currentStep={currentStep}
          totalSteps={STEPS.length}
          onNext={handleNext}
          onPrev={prevStep}
          onSubmit={handleSubmit}
          isNextDisabled={!isStepValid()}
          isSubmitting={isSubmitting}
          showPrice={currentStep > 1 && !!finalPrice}
          price={basePrice}
          discount={discount}
          finalPrice={finalPrice}
        />
      </div>

      {/* Trust Indicators */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>Secure booking</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>Free cancellation</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>24/7 support</span>
          </div>
        </div>
      </div>
    </div>
  );
}
