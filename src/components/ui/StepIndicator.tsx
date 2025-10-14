'use client';

import { memo } from 'react';
import { Check, MapPin, Car, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Step Indicator Component
 * Modern, clean design with always visible labels
 */

interface Step {
  number: number;
  name: string;
  description: string;
}

interface StepIndicatorProps {
  currentStep: number;
  steps: Step[];
}

// Icons for each step
const STEP_ICONS = [MapPin, Car, CreditCard];

export const StepIndicator = memo(function StepIndicator({
  currentStep,
  steps,
}: StepIndicatorProps) {
  return (
    <div className="w-full mb-6 sm:mb-8 max-w-full pt-3">
      {/* Mobile: Compact horizontal with labels */}
      <div className="block sm:hidden">
        <div className="flex items-start justify-between px-1">
          {steps.map((step, index) => {
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;
            const isLast = index === steps.length - 1;
            const StepIcon = STEP_ICONS[index] || MapPin;

            return (
              <div key={step.number} className="flex-1 flex items-start">
                <div className="flex flex-col items-center w-full">
                  {/* Circle with icon/number */}
                  <div
                    className={cn(
                      'relative w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 mb-2',
                      isCompleted && 'bg-green-500 text-white shadow-lg',
                      isCurrent && 'bg-blue-600 text-white shadow-lg ring-4 ring-blue-100 scale-110',
                      !isCompleted && !isCurrent && 'bg-gray-200 text-gray-500'
                    )}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5" strokeWidth={3} />
                    ) : (
                      <StepIcon className="w-5 h-5" strokeWidth={2.5} />
                    )}
                  </div>
                  
                  {/* Label */}
                  <div className="text-center">
                    <p
                      className={cn(
                        'text-[10px] font-semibold leading-tight',
                        isCurrent && 'text-blue-600',
                        isCompleted && 'text-green-600',
                        !isCompleted && !isCurrent && 'text-gray-400'
                      )}
                    >
                      {step.name}
                    </p>
                  </div>
                </div>

                {/* Connector Line */}
                {!isLast && (
                  <div className="flex items-center pt-5 px-1">
                    <div
                      className={cn(
                        'h-0.5 w-full min-w-[16px] rounded-full transition-all duration-500',
                        isCompleted ? 'bg-green-500' : 'bg-gray-200'
                      )}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop: Larger with descriptions */}
      <div className="hidden sm:block">
        <div className="flex items-start justify-center max-w-2xl mx-auto">
          {steps.map((step, index) => {
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;
            const isLast = index === steps.length - 1;
            const StepIcon = STEP_ICONS[index] || MapPin;

            return (
              <div key={step.number} className="flex items-start flex-1">
                <div className="flex flex-col items-center w-full">
                  {/* Circle with icon */}
                  <div
                    className={cn(
                      'relative w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center transition-all duration-300 mb-3',
                      isCompleted && 'bg-green-500 text-white shadow-xl shadow-green-500/30',
                      isCurrent && 'bg-blue-600 text-white shadow-xl shadow-blue-600/40 ring-4 ring-blue-100 scale-110',
                      !isCompleted && !isCurrent && 'bg-gray-200 text-gray-400'
                    )}
                  >
                    {isCompleted ? (
                      <Check className="w-6 h-6 lg:w-7 lg:h-7" strokeWidth={3} />
                    ) : (
                      <StepIcon className="w-6 h-6 lg:w-7 lg:h-7" strokeWidth={2.5} />
                    )}
                    
                    {/* Step number badge */}
                    <div
                      className={cn(
                        'absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white',
                        isCompleted && 'bg-green-600',
                        isCurrent && 'bg-blue-700',
                        !isCompleted && !isCurrent && 'bg-gray-400'
                      )}
                    >
                      {step.number}
                    </div>
                  </div>
                  
                  {/* Label */}
                  <div className="text-center max-w-[100px]">
                    <p
                      className={cn(
                        'text-sm lg:text-base font-bold mb-1 transition-colors',
                        isCurrent && 'text-blue-600',
                        isCompleted && 'text-green-600',
                        !isCompleted && !isCurrent && 'text-gray-500'
                      )}
                    >
                      {step.name}
                    </p>
                    {step.description && (
                      <p className="text-xs text-gray-400">
                        {step.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Connector Line */}
                {!isLast && (
                  <div className="flex items-center pt-6 px-2 lg:px-4 flex-1">
                    <div
                      className={cn(
                        'h-1 w-full rounded-full transition-all duration-500 relative',
                        isCompleted ? 'bg-green-500' : 'bg-gray-200'
                      )}
                    >
                      {/* Animated gradient effect for completed */}
                      {isCompleted && (
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-full animate-pulse" />
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});
