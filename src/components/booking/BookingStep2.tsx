'use client';

import { memo } from 'react';
import { Car, Crown, Users as UsersIcon, Sparkles, Check } from 'lucide-react';
import { useBookingStore } from '@/store/bookingStore';
import { usePriceCalculation } from '@/hooks/usePriceCalculation';
import { VEHICLES } from '@/constants/vehicles';
import { formatPrice } from '@/lib/utils';
import type { VehicleType } from '@/types';

/**
 * Booking Step 2: Vehicle Selection
 * User selects vehicle type and applies promo code
 */

interface BookingStep2Props {
  onNext: () => void;
  onBack: () => void;
}

const ICON_MAP = {
  Car: Car,
  Crown: Crown,
  Users: UsersIcon,
  Sparkles: Sparkles,
};

export const BookingStep2 = memo(function BookingStep2({
  onNext,
  onBack,
}: BookingStep2Props) {
  const { vehicleType, setVehicleType } = useBookingStore();
  const { calculation, isCalculating } = usePriceCalculation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Vehicle Selection */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Select Your Vehicle
        </h3>
        
        <div className="grid sm:grid-cols-2 gap-4">
          {Object.values(VEHICLES).map((vehicle) => {
            const isSelected = vehicleType === vehicle.id;
            const Icon = ICON_MAP[vehicle.icon as keyof typeof ICON_MAP] || Car;
            
            const vehiclePrice = calculation
              ? Math.round(calculation.basePrice * vehicle.priceMultiplier)
              : null;

            return (
              <button
                key={vehicle.id}
                type="button"
                onClick={() => setVehicleType(vehicle.id as VehicleType)}
                className={`
                  relative p-6 rounded-xl border-2 text-left transition-all duration-200
                  ${isSelected
                    ? 'border-blue-600 bg-blue-50 shadow-lg ring-2 ring-blue-100'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
                  }
                `}
              >
                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-4 right-4 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}

                {/* Icon */}
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${
                  isSelected ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <Icon className={`w-6 h-6 ${isSelected ? 'text-blue-600' : 'text-gray-600'}`} />
                </div>

                {/* Vehicle Info */}
                <h4 className="font-semibold text-gray-900 mb-1">{vehicle.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{vehicle.example}</p>
                <p className="text-xs text-gray-500 mb-3">{vehicle.capacity}</p>

                {/* Features */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {vehicle.features.slice(0, 2).map((feature) => (
                    <span
                      key={feature}
                      className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Price */}
                {vehiclePrice && (
                  <div className="text-lg font-bold text-blue-600">
                    {formatPrice(vehiclePrice)}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Summary */}
      {calculation && !isCalculating && (
        <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700">Distance</span>
            <span className="font-semibold text-gray-900">
              {calculation.distance} km
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700">Base Price</span>
            <span className="font-semibold text-gray-900">
              {formatPrice(calculation.basePrice)}
            </span>
          </div>
          {calculation.discount > 0 && (
            <div className="flex justify-between items-center mb-2 text-green-600">
              <span>Discount</span>
              <span className="font-semibold">
                -{formatPrice(calculation.discount)}
              </span>
            </div>
          )}
          <div className="pt-3 mt-3 border-t border-blue-200 flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900">
              Total Price
            </span>
            <span className="text-2xl font-bold text-blue-600">
              {formatPrice(calculation.finalPrice)}
            </span>
          </div>
        </div>
      )}

      {isCalculating && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent" />
          <p className="mt-2 text-sm text-gray-600">Calculating price...</p>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-3 px-6 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={!vehicleType || isCalculating}
          className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          Continue to Details
        </button>
      </div>
    </form>
  );
});
