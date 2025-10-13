'use client';

import { memo } from 'react';
import { Calendar } from 'lucide-react';

/**
 * Modern DatePicker Component
 * Simple, accessible, native HTML5 datetime-local input
 * No external dependencies, better performance
 */

interface DatePickerProps {
  value?: Date;
  onChange: (date: Date) => void;
  minDate?: Date;
  label?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
}

export const DatePicker = memo(function DatePicker({
  value,
  onChange,
  minDate,
  label = 'Date and Time',
  error,
  required = false,
}: DatePickerProps) {
  // Format date for datetime-local input
  const formatDateTimeLocal = (date: Date | undefined | null): string => {
    if (!date) return '';
    
    // Ensure it's a Date object
    const dateObj = date instanceof Date ? date : new Date(date);
    
    // Check if valid date
    if (isNaN(dateObj.getTime())) return '';
    
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // Set default minimum date to now
  const defaultMinDate = minDate || new Date();

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div
        className={`
          relative flex items-center gap-3 w-full px-4 py-3 
          border rounded-xl bg-white shadow-sm
          transition-all duration-200
          ${error 
            ? 'border-red-500 focus-within:ring-2 focus-within:ring-red-500' 
            : 'border-gray-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500'
          }
          hover:border-gray-300
        `}
      >
        <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0" />
        
        <input
          type="datetime-local"
          value={formatDateTimeLocal(value)}
          onChange={(e) => {
            if (e.target.value) {
              const newDate = new Date(e.target.value);
              if (!isNaN(newDate.getTime())) {
                onChange(newDate);
              }
            }
          }}
          min={formatDateTimeLocal(defaultMinDate)}
          required={required}
          className="flex-1 bg-transparent border-none outline-none text-gray-900 text-sm
                     placeholder:text-gray-400 cursor-pointer
                     [&::-webkit-calendar-picker-indicator]:cursor-pointer"
        />
      </div>

      {error && (
        <p className="mt-1.5 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});
