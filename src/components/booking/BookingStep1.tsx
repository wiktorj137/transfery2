'use client';

import { memo } from 'react';
import { Users } from 'lucide-react';
import { useBookingStore } from '@/store/bookingStore';
import LocationAutocomplete from '@/components/LocationAutocomplete';
import { DatePicker } from '@/components/ui/DatePicker';

/**
 * Booking Step 1: Route and Date Selection
 * User selects pickup, dropoff, date, and passengers
 */

interface BookingStep1Props {
  onNext: () => void;
}

export const BookingStep1 = memo(function BookingStep1({ onNext }: BookingStep1Props) {
  const {
    pickup,
    dropoff,
    date,
    passengers,
    pickupCoords,
    dropoffCoords,
    setPickup,
    setDropoff,
    setDate,
    setPassengers,
  } = useBookingStore();

  const isValid = !!(pickup && dropoff && date && pickupCoords && dropoffCoords);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Pickup Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Pickup Location <span className="text-red-500">*</span>
        </label>
        <LocationAutocomplete
          value={pickup || ''}
          onChange={(address, coords) => setPickup(address, coords)}
          placeholder="Enter pickup address..."
          label=""
        />
      </div>

      {/* Dropoff Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Drop-off Location <span className="text-red-500">*</span>
        </label>
        <LocationAutocomplete
          value={dropoff || ''}
          onChange={(address, coords) => setDropoff(address, coords)}
          placeholder="Enter drop-off address..."
          label=""
        />
      </div>

      {/* Date and Time */}
      <DatePicker
        value={date}
        onChange={setDate}
        label="Pickup Date & Time"
        required
      />

      {/* Number of Passengers */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Number of Passengers <span className="text-red-500">*</span>
        </label>
        <div className="relative flex items-center gap-3 w-full px-4 py-3 border border-gray-200 rounded-xl bg-white shadow-sm hover:border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
          <Users className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <input
            type="number"
            min="1"
            max="8"
            value={passengers}
            onChange={(e) => setPassengers(parseInt(e.target.value) || 1)}
            className="flex-1 bg-transparent border-none outline-none text-gray-900"
            required
          />
        </div>
        <p className="mt-1.5 text-xs text-gray-500">Maximum 8 passengers</p>
      </div>

      {/* Distance Info (if available) */}
      {pickupCoords && dropoffCoords && (
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
          <p className="text-sm text-blue-700">
            ✓ Route validated. Click &quot;Continue&quot; to select your vehicle.
          </p>
        </div>
      )}

      {/* Next Button */}
      <button
        type="submit"
        disabled={!isValid}
        className="w-full py-3.5 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg transition-all duration-200"
      >
        Continue to Vehicle Selection
      </button>
    </form>
  );
});
