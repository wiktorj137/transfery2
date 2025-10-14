'use client';

import { CreditCard, Banknote, Check } from 'lucide-react';
import type { UseFormReturn } from 'react-hook-form';
import type { Step1Data, Step2Data, Step3Data } from '@/hooks/useBookingForm';
import { VEHICLE_TYPES } from '@/hooks/useBookingForm';

interface BookingStep3Props {
  form: UseFormReturn<Step3Data>;
  step1Form: UseFormReturn<Step1Data>;
  step2Form: UseFormReturn<Step2Data>;
  estimatedPrice: number | null;
  promoApplied: boolean;
  discount: number;
}

export function BookingStep3({
  form,
  step1Form,
  step2Form,
  estimatedPrice,
  promoApplied,
  discount,
}: BookingStep3Props) {
  const { register, setValue, watch, formState: { errors, isSubmitting } } = form;
  const paymentMethod = watch('paymentMethod');

  const step1Data = step1Form.getValues();
  const step2Data = step2Form.getValues();
  const selectedVehicle = VEHICLE_TYPES.find((v) => v.id === step2Data.vehicleType);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Contact Details & Payment
      </h2>

      {/* Booking Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <h3 className="font-semibold text-gray-900 mb-4">Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Route:</span>
            <span className="font-medium text-gray-900">
              {step1Data.pickup} → {step1Data.dropoff}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Date:</span>
            <span className="font-medium text-gray-900">
              {step1Data.date?.toLocaleString('en-US')}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Passengers:</span>
            <span className="font-medium text-gray-900">{step1Data.passengers}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Vehicle:</span>
            <span className="font-medium text-gray-900">{selectedVehicle?.name}</span>
          </div>
          {promoApplied && (
            <div className="flex justify-between text-green-600">
              <span>Promo code:</span>
              <span className="font-medium">-{discount}%</span>
            </div>
          )}
          <div className="pt-2 border-t border-blue-200 flex justify-between items-baseline">
            <span className="text-gray-900 font-semibold">Total Price:</span>
            <span className="text-3xl font-bold text-blue-600">{estimatedPrice} PLN</span>
          </div>
        </div>
      </div>

      {/* Contact Details */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          <input
            type="text"
            {...register('firstName')}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="John"
            style={{
              fontSize: '16px',
              WebkitAppearance: 'none',
              appearance: 'none',
              minHeight: '48px',
            }}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <input
            type="text"
            {...register('lastName')}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="Smith"
            style={{
              fontSize: '16px',
              WebkitAppearance: 'none',
              appearance: 'none',
              minHeight: '48px',
            }}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            {...register('email')}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="john.smith@email.com"
            style={{
              fontSize: '16px',
              WebkitAppearance: 'none',
              appearance: 'none',
              minHeight: '48px',
            }}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <input
            type="tel"
            {...register('phone')}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="+48 123 456 789"
            style={{
              fontSize: '16px',
              WebkitAppearance: 'none',
              appearance: 'none',
              minHeight: '48px',
            }}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>
      </div>

      {/* Payment Method */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
        <div className="grid md:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setValue('paymentMethod', 'online')}
            className={`relative p-6 border-2 rounded-xl transition-all text-left ${
              paymentMethod === 'online'
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start gap-4">
              <CreditCard
                className={`w-8 h-8 ${
                  paymentMethod === 'online' ? 'text-blue-600' : 'text-gray-600'
                }`}
              />
              <div>
                <p className="font-semibold text-gray-900 mb-1">Online Payment</p>
                <p className="text-sm text-gray-600">Credit card / BLIK</p>
              </div>
            </div>
            {paymentMethod === 'online' && (
              <div className="absolute top-4 right-4">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              </div>
            )}
          </button>

          <button
            type="button"
            onClick={() => setValue('paymentMethod', 'cash')}
            className={`p-6 border-2 rounded-xl transition-all text-left relative ${
              paymentMethod === 'cash'
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start gap-4">
              <Banknote
                className={`w-8 h-8 ${
                  paymentMethod === 'cash' ? 'text-blue-600' : 'text-gray-600'
                }`}
              />
              <div>
                <p className="font-semibold text-gray-900 mb-1">Pay the Driver</p>
                <p className="text-sm text-gray-600">Cash or card with driver</p>
              </div>
            </div>
            {paymentMethod === 'cash' && (
              <div className="absolute top-4 right-4">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              </div>
            )}
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-500 text-center">
        Free cancellation up to 24h before transfer
      </p>
    </div>
  );
}
