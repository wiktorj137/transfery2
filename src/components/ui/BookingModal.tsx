'use client';

import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useEffect } from 'react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function BookingModal({ isOpen, onClose, title, children }: BookingModalProps) {
  // Block body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="booking-modal-overlay fixed inset-0 bg-white md:bg-black/70 z-[9999] flex items-start justify-center overflow-y-auto animate-fadeIn">
      <div className="min-h-full h-auto w-full bg-white md:min-h-screen md:m-4 md:rounded-2xl md:shadow-2xl md:max-w-6xl animate-slideUp">
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 border-b border-gray-200 px-4 md:px-8 py-4 flex items-center justify-between md:rounded-t-2xl">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="px-4 md:px-8 py-6 md:py-8 pb-20 md:pb-12 min-h-[calc(100vh-180px)]">
          <div className="max-w-4xl mx-auto">{children}</div>
        </div>
      </div>
    </div>,
    document.body
  );
}
