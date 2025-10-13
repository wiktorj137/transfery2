import { z } from 'zod';

/**
 * Validation schemas for the application
 * Centralized validation logic using Zod
 */

// Coordinates validation
export const coordinatesSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
});

// Location validation
export const locationSchema = z.object({
  address: z.string().min(3, 'Address must be at least 3 characters'),
  coords: coordinatesSchema.optional(),
});

// Date validation (must be in the future)
export const futureDateSchema = z.date().refine(
  (date) => date > new Date(),
  { message: 'Date must be in the future' }
);

// Step 1: Route and passengers
export const bookingStep1Schema = z.object({
  pickup: z.string().min(5, 'Please enter pickup location'),
  dropoff: z.string().min(5, 'Please enter drop-off location'),
  date: futureDateSchema,
  passengers: z.number().int().min(1).max(8, 'Maximum 8 passengers'),
});

// Step 2: Vehicle selection
export const bookingStep2Schema = z.object({
  vehicleType: z.enum(['standard', 'premium', 'van', 'vip'], 'Please select a vehicle type'),
  promoCode: z.string().optional(),
});

// Step 3: Personal details and payment
export const bookingStep3Schema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(9, 'Please enter a valid phone number'),
  paymentMethod: z.enum(['online', 'cash'], 'Please select a payment method'),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
});

// Complete booking schema
export const completeBookingSchema = bookingStep1Schema
  .merge(bookingStep2Schema)
  .merge(bookingStep3Schema);

// Promo code validation
export const promoCodeSchema = z.object({
  code: z.string().min(3).max(20).toUpperCase(),
});

// Contact form validation
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

// Export types
export type Coordinates = z.infer<typeof coordinatesSchema>;
export type Location = z.infer<typeof locationSchema>;
export type BookingStep1 = z.infer<typeof bookingStep1Schema>;
export type BookingStep2 = z.infer<typeof bookingStep2Schema>;
export type BookingStep3 = z.infer<typeof bookingStep3Schema>;
export type CompleteBooking = z.infer<typeof completeBookingSchema>;
export type PromoCode = z.infer<typeof promoCodeSchema>;
export type ContactForm = z.infer<typeof contactFormSchema>;
