'use server';

import { z } from 'zod';
import { calculateDistance } from '@/lib/utils';
import { PRICING } from '@/constants/pricing';
import { getVehicleMultiplier } from '@/constants/vehicles';
import type { PriceCalculation } from '@/types';

/**
 * Server Action: Calculate transfer price
 * Safe server-side price calculation
 */

const calculatePriceSchema = z.object({
  pickupCoords: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  dropoffCoords: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  vehicleType: z.enum(['standard', 'premium', 'van', 'vip']),
  promoCode: z.string().optional(),
  date: z.coerce.date(),
});

type CalculatePriceInput = z.infer<typeof calculatePriceSchema>;

export async function calculatePriceAction(
  input: CalculatePriceInput
): Promise<{ success: boolean; data?: PriceCalculation; error?: string }> {
  try {
    // Validate input
    const validated = calculatePriceSchema.parse(input);

    // Calculate distance
    const distance = calculateDistance(
      validated.pickupCoords.lat,
      validated.pickupCoords.lng,
      validated.dropoffCoords.lat,
      validated.dropoffCoords.lng
    );

    // Base price calculation
    const basePrice = Math.max(
      distance * PRICING.BASE_PRICE_PER_KM,
      PRICING.MINIMUM_FARE
    );

    // Vehicle multiplier
    const vehicleMultiplier = getVehicleMultiplier(validated.vehicleType);
    const vehicleUpcharge = basePrice * (vehicleMultiplier - 1);

    // Check for night/holiday surcharges
    const hour = validated.date.getHours();
    const isNight = hour >= 22 || hour < 6;
    let surchargeMultiplier = 1;

    if (isNight) {
      surchargeMultiplier *= PRICING.NIGHT_SURCHARGE_MULTIPLIER;
    }

    // Calculate total before discount
    const totalBeforeDiscount = (basePrice + vehicleUpcharge) * surchargeMultiplier;

    // Apply promo code discount (if valid)
    let discount = 0;
    
    if (validated.promoCode) {
      const promoResult = await validatePromoCodeAction(
        validated.promoCode,
        totalBeforeDiscount
      );
      if (promoResult.success && promoResult.data) {
        discount = promoResult.data.discountAmount;
      }
    }

    // Final price
    const finalPrice = Math.round(totalBeforeDiscount - discount);

    const calculation: PriceCalculation = {
      basePrice: Math.round(basePrice),
      distance: Math.round(distance * 10) / 10,
      vehicleMultiplier,
      discount,
      finalPrice,
      breakdown: {
        distancePrice: Math.round(basePrice),
        vehicleUpcharge: Math.round(vehicleUpcharge),
        promoDiscount: Math.round(discount),
      },
    };

    return { success: true, data: calculation };
  } catch (error) {
    console.error('Price calculation error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to calculate price',
    };
  }
}

/**
 * Server Action: Validate promo code
 */

const promoCodeSchema = z.object({
  code: z.string().min(1).toUpperCase(),
  amount: z.number().positive(),
});

export async function validatePromoCodeAction(
  code: string,
  amount: number
): Promise<{
  success: boolean;
  data?: { isValid: boolean; discountAmount: number; message: string };
  error?: string;
}> {
  try {
    const validated = promoCodeSchema.parse({ code: code.toUpperCase(), amount });

    // Import promo codes (in real app, fetch from database)
    const { PROMO_CODES } = await import('@/constants/pricing');
    const promo = PROMO_CODES[validated.code];

    if (!promo) {
      return {
        success: true,
        data: {
          isValid: false,
          discountAmount: 0,
          message: 'Invalid promo code',
        },
      };
    }

    // Check minimum amount
    if (promo.minAmount && amount < promo.minAmount) {
      return {
        success: true,
        data: {
          isValid: false,
          discountAmount: 0,
          message: `Minimum amount ${promo.minAmount} PLN required`,
        },
      };
    }

    // Calculate discount
    let discountAmount = 0;
    if (promo.discountType === 'percentage') {
      discountAmount = (amount * promo.discount) / 100;
    } else {
      discountAmount = promo.discount;
    }

    return {
      success: true,
      data: {
        isValid: true,
        discountAmount: Math.round(discountAmount),
        message: `${promo.description} applied!`,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: 'Invalid promo code format',
    };
  }
}
