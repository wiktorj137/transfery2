// Types for booking form
export interface BookingFormData {
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  pickupTime: string;
  passengers: string;
  transferType: 'airport-to-city' | 'city-to-airport';
  flightNumber?: string;
}

// Validation error type
export interface FormErrors {
  [key: string]: string;
}

// Types for popular routes
export interface Route {
  from: string;
  to: string;
  price: string;
  duration: string;
}

// Types for testimonials
export interface Testimonial {
  name: string;
  role: string;
  rating: number;
  comment: string;
  avatar: string;
}

// Types for features
export interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}
