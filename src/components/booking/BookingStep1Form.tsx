'use client';

import { Calendar, Users } from 'lucide-react';
import LocationAutocomplete from '../LocationAutocomplete';
import type { UseFormReturn } from 'react-hook-form';
import type { Step1Data } from '@/hooks/useBookingForm';

interface BookingStep1Props {
  form: UseFormReturn<Step1Data>;
  onPickupChange: (address: string, coords?: { lat: number; lng: number }) => void;
  onDropoffChange: (address: string, coords?: { lat: number; lng: number }) => void;
}

export function BookingStep1({ form, onPickupChange, onDropoffChange }: BookingStep1Props) {
  const { register, formState: { errors }, watch } = form;
  const pickup = watch('pickup');
  const dropoff = watch('dropoff');

  return (
    <div className="space-y-3 sm:space-y-4 w-full max-w-full">
      {/* Pickup Location */}
      <div className="w-full max-w-full">
        <LocationAutocomplete
          value={pickup || ''}
          onChange={(value, coords) => {
            form.setValue('pickup', value);
            if (coords) onPickupChange(value, coords);
          }}
          label=""
          placeholder="From: Airport, Hotel, Address..."
        />
        {errors.pickup && (
          <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.pickup.message}</p>
        )}
      </div>

      {/* Dropoff Location */}
      <div className="w-full max-w-full">
        <LocationAutocomplete
          value={dropoff || ''}
          onChange={(value, coords) => {
            form.setValue('dropoff', value);
            if (coords) onDropoffChange(value, coords);
          }}
          label=""
          placeholder="To: City Center, Hotel, Address..."
        />
        {errors.dropoff && (
          <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.dropoff.message}</p>
        )}
      </div>

      {/* Date and Time */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full max-w-full">
        <div className="w-full min-w-0">
          <div className="relative w-full">
            <Calendar className="absolute left-2 sm:left-3 top-3 sm:top-3.5 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none z-10" />
            <input
              type="date"
              {...register('date', {
                setValueAs: (value) => (value ? new Date(value + 'T12:00:00') : undefined),
              })}
              min={new Date().toISOString().slice(0, 10)}
              className="w-full pl-8 sm:pl-10 pr-2 py-3 sm:py-3.5 bg-white border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm sm:text-base"
              style={{
                fontSize: '14px',
                WebkitAppearance: 'none',
                appearance: 'none'
              }}
            />
          </div>
          {errors.date && (
            <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
          )}
        </div>

        <div className="w-full min-w-0">
          <div className="relative w-full">
            <svg
              className="absolute left-2 sm:left-3 top-3 sm:top-3.5 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <input
              type="time"
              defaultValue="12:00"
              className="w-full pl-8 sm:pl-10 pr-2 py-3 sm:py-3.5 bg-white border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm sm:text-base"
              style={{
                fontSize: '14px',
                WebkitAppearance: 'none',
                appearance: 'none'
              }}
            />
          </div>
        </div>
      </div>

      {/* Passengers */}
      <div className="w-full max-w-full">
        <div className="relative w-full">
          <Users className="absolute left-3 top-3 sm:top-3.5 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none z-10" />
          <select
            {...register('passengers', { valueAsNumber: true })}
            className="w-full pl-9 sm:pl-11 pr-8 sm:pr-10 py-3 sm:py-3.5 bg-white border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition appearance-none cursor-pointer text-sm sm:text-base"
            style={{
              fontSize: '16px',
              WebkitAppearance: 'none',
              appearance: 'none'
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'Person' : 'People'}
              </option>
            ))}
          </select>
          <div className="absolute right-2 sm:right-3 top-3 sm:top-3.5 pointer-events-none">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
