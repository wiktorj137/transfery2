'use client';

import { Car, Sparkles, Users, Crown, Tag, Check } from 'lucide-react';
import type { UseFormReturn } from 'react-hook-form';
import type { Step2Data } from '@/hooks/useBookingForm';
import { VEHICLE_TYPES } from '@/hooks/useBookingForm';

interface BookingStep2Props {
  form: UseFormReturn<Step2Data>;
  calculatePrice: (vehicleId?: string) => number;
  promoCode: string;
  promoError: string;
  promoApplied: boolean;
  discount: number;
  onPromoChange: (value: string) => void;
  onPromoApply: () => void;
}

const VEHICLE_ICONS = {
  standard: Car,
  premium: Sparkles,
  van: Users,
  vip: Crown,
} as const;

export function BookingStep2({
  form,
  calculatePrice,
  promoCode,
  promoError,
  promoApplied,
  discount,
  onPromoChange,
  onPromoApply,
}: BookingStep2Props) {
  const { setValue, watch, formState: { errors } } = form;
  const vehicleType = watch('vehicleType');

  return (
    <div className="space-y-6">
      {/* Promo Code */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Promo Code (optional)
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={promoCode}
              onChange={(e) => onPromoChange(e.target.value)}
              placeholder="e.g. PROMO10"
              disabled={promoApplied}
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:bg-gray-100"
              style={{
                fontSize: '16px',
                WebkitAppearance: 'none',
                appearance: 'none',
                minHeight: '48px',
              }}
            />
          </div>
          <button
            type="button"
            onClick={onPromoApply}
            disabled={promoApplied}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed min-h-[48px]"
          >
            {promoApplied ? <Check className="w-5 h-5" /> : 'Apply'}
          </button>
        </div>
        {promoError && <p className="text-red-500 text-sm mt-1">{promoError}</p>}
        {promoApplied && (
          <p className="text-green-600 text-sm mt-1 flex items-center gap-1">
            <Check className="w-4 h-4" />
            Code applied! Discount -{discount}%
          </p>
        )}
      </div>

      {/* Vehicle Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Select Vehicle Type
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {VEHICLE_TYPES.map((vehicle) => {
            const price = calculatePrice(vehicle.id);
            const originalPrice = promoApplied
              ? Math.round(price / (1 - discount / 100))
              : price;
            const Icon = VEHICLE_ICONS[vehicle.id];
            const isSelected = vehicleType === vehicle.id;

            return (
              <button
                key={vehicle.id}
                type="button"
                onClick={() => setValue('vehicleType', vehicle.id)}
                className={`relative p-6 border-2 rounded-xl transition-all text-left ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start gap-4">
                  <Icon
                    className={`w-8 h-8 flex-shrink-0 ${
                      isSelected ? 'text-blue-600' : 'text-gray-600'
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-lg text-gray-900 mb-1">{vehicle.name}</p>
                    <p className="text-sm text-gray-600 mb-1">{vehicle.example}</p>
                    <p className="text-xs text-gray-500 mb-3">{vehicle.capacity}</p>

                    <div className="flex items-baseline gap-2">
                      {promoApplied && (
                        <span className="text-lg text-gray-400 line-through">
                          {originalPrice} PLN
                        </span>
                      )}
                      <span className="text-2xl font-bold text-blue-600">{price} PLN</span>
                    </div>
                  </div>
                </div>

                {isSelected && (
                  <div className="absolute top-4 right-4">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
        {errors.vehicleType && (
          <p className="text-red-500 text-sm mt-2">{errors.vehicleType.message}</p>
        )}
      </div>
    </div>
  );
}
