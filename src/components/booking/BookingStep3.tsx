'use client';

import { memo, useState } from 'react';
import { CreditCard, Banknote, Check, Loader2 } from 'lucide-react';
import { useBookingStore } from '@/store/bookingStore';
import { submitBookingAction } from '@/app/actions/booking';
import { formatPrice } from '@/lib/utils';
import type { PaymentMethod } from '@/types';

/**
 * Booking Step 3: Personal Details & Payment
 * User enters contact info and selects payment method
 */

interface BookingStep3Props {
  onBack: () => void;
  onComplete: () => void;
}

export const BookingStep3 = memo(function BookingStep3({
  onBack,
  onComplete,
}: BookingStep3Props) {
  const store = useBookingStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: store.firstName || '',
    lastName: store.lastName || '',
    email: store.email || '',
    phone: store.phone || '',
    terms: false,
  });

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.terms) {
      setError('Please accept the terms and conditions');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Update store with personal info
      store.setPersonalInfo({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
      });

      // Submit booking
      const result = await submitBookingAction({
        pickup: store.pickup!,
        pickupCoords: store.pickupCoords,
        dropoff: store.dropoff!,
        dropoffCoords: store.dropoffCoords,
        date: store.date!,
        passengers: store.passengers!,
        vehicleType: store.vehicleType!,
        promoCode: store.promoCode,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        paymentMethod: store.paymentMethod!,
        basePrice: store.basePrice,
        discount: store.discount,
        finalPrice: store.finalPrice,
      });

      if (result.success) {
        onComplete();
        // Could redirect to confirmation page
      } else {
        setError(result.error || 'Failed to submit booking');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValid =
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.phone &&
    formData.terms &&
    store.paymentMethod;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Your Information
        </h3>
        
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            required
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+48 123 456 789"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            required
          />
        </div>
      </div>

      {/* Payment Method */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Payment Method
        </h3>
        
        <div className="grid sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => store.setPaymentMethod('online')}
            className={`
              p-6 rounded-xl border-2 text-left transition-all duration-200 relative
              ${store.paymentMethod === 'online'
                ? 'border-blue-600 bg-blue-50 shadow-lg ring-2 ring-blue-100'
                : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
              }
            `}
          >
            {store.paymentMethod === 'online' && (
              <div className="absolute top-4 right-4 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
            <CreditCard className="w-8 h-8 text-blue-600 mb-3" />
            <h4 className="font-semibold text-gray-900 mb-1">Online Payment</h4>
            <p className="text-sm text-gray-600">Pay securely online</p>
          </button>

          <button
            type="button"
            onClick={() => store.setPaymentMethod('cash')}
            className={`
              p-6 rounded-xl border-2 text-left transition-all duration-200 relative
              ${store.paymentMethod === 'cash'
                ? 'border-blue-600 bg-blue-50 shadow-lg ring-2 ring-blue-100'
                : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
              }
            `}
          >
            {store.paymentMethod === 'cash' && (
              <div className="absolute top-4 right-4 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
            <Banknote className="w-8 h-8 text-green-600 mb-3" />
            <h4 className="font-semibold text-gray-900 mb-1">Cash</h4>
            <p className="text-sm text-gray-600">Pay driver in cash</p>
          </button>
        </div>
      </div>

      {/* Price Summary */}
      {store.finalPrice && (
        <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Total Amount</p>
            <p className="text-3xl font-bold text-blue-600">
              {formatPrice(store.finalPrice)}
            </p>
          </div>
        </div>
      )}

      {/* Terms and Conditions */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="terms"
          checked={formData.terms}
          onChange={(e) => handleChange('terms', e.target.checked)}
          className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          required
        />
        <label htmlFor="terms" className="text-sm text-gray-600">
          I agree to the{' '}
          <a href="#" className="text-blue-600 hover:underline">
            terms and conditions
          </a>{' '}
          and{' '}
          <a href="#" className="text-blue-600 hover:underline">
            privacy policy
          </a>
        </label>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="flex-1 py-3 px-6 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 disabled:opacity-50 transition-all duration-200"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="flex-1 py-3 px-6 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Submitting...
            </>
          ) : (
            'Confirm Booking'
          )}
        </button>
      </div>
    </form>
  );
});
