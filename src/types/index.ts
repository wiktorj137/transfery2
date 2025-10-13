/**
 * TypeScript type definitions for the application
 */

// Vehicle types
export type VehicleType = 'standard' | 'premium' | 'van' | 'vip';

export interface Vehicle {
  id: VehicleType;
  name: string;
  description: string;
  example: string;
  capacity: string;
  priceMultiplier: number;
  features: string[];
  icon: string;
}

// Location types
export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Location {
  address: string;
  coords?: Coordinates;
  placeId?: number;
  displayName?: string;
}

export interface PopularLocation extends Location {
  icon?: 'airport' | 'train' | 'hotel' | 'location';
  isCustom?: boolean;
}

// Booking types
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
export type PaymentMethod = 'online' | 'cash';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface BookingData {
  // Step 1
  pickup: string;
  pickupCoords?: Coordinates;
  dropoff: string;
  dropoffCoords?: Coordinates;
  date: Date;
  passengers: number;
  
  // Step 2
  vehicleType: VehicleType;
  promoCode?: string;
  
  // Step 3
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  paymentMethod: PaymentMethod;
  
  // Calculated
  basePrice?: number;
  discount?: number;
  finalPrice?: number;
  distance?: number;
}

export interface Booking extends BookingData {
  id: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  createdAt: Date;
  updatedAt: Date;
}

// Promo code types
export interface PromoCode {
  code: string;
  discount: number; // percentage
  discountType: 'percentage' | 'fixed';
  validFrom: Date;
  validTo: Date;
  maxUses: number;
  currentUses: number;
  minAmount?: number;
}

// Pricing types
export interface PriceCalculation {
  basePrice: number;
  distance: number;
  vehicleMultiplier: number;
  discount: number;
  finalPrice: number;
  breakdown: {
    distancePrice: number;
    vehicleUpcharge: number;
    promoDiscount: number;
  };
}

// API Response types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
}

// Form state types
export interface FormStep {
  id: number;
  name: string;
  isValid: boolean;
  isComplete: boolean;
}

// Nominatim API types
export interface NominatimResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  address: {
    road?: string;
    house_number?: string;
    city?: string;
    town?: string;
    village?: string;
    country?: string;
  };
  isCustom?: boolean;
  icon?: 'airport' | 'train' | 'hotel' | 'location';
}

// Legacy types (kept for compatibility)
export interface BookingFormData {
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  pickupTime: string;
  passengers: string;
  transferType: 'airport-to-city' | 'city-to-airport';
  flightNumber?: string;
}

export interface FormErrors {
  [key: string]: string;
}

export interface Route {
  from: string;
  to: string;
  price: string;
  duration: string;
}

export interface Testimonial {
  name: string;
  role: string;
  rating: number;
  comment: string;
  avatar: string;
}

export interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}
