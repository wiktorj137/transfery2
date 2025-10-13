/**
 * Environment Variables Configuration
 * Centralized access to environment variables with type safety
 */

const getEnvVar = (key: string, fallback?: string): string => {
  const value = process.env[key] || fallback;
  if (!value) {
    console.warn(`⚠️ Environment variable ${key} is not set`);
  }
  return value || '';
};

export const env = {
  // App Configuration
  app: {
    url: getEnvVar('NEXT_PUBLIC_APP_URL', 'http://localhost:3000'),
    name: getEnvVar('NEXT_PUBLIC_APP_NAME', 'Krakow Transfer'),
    env: getEnvVar('NODE_ENV', 'development'),
  },

  // Company Info
  company: {
    phone: getEnvVar('NEXT_PUBLIC_COMPANY_PHONE', '+48123456789'),
    email: getEnvVar('NEXT_PUBLIC_COMPANY_EMAIL', 'info@krakowtransfer.com'),
  },

  // External APIs
  api: {
    nominatimEmail: getEnvVar('NEXT_PUBLIC_NOMINATIM_EMAIL', 'dev@localhost.com'),
    googleMapsKey: getEnvVar('NEXT_PUBLIC_GOOGLE_MAPS_API_KEY', ''),
  },

  // Payment
  payment: {
    stripePublicKey: getEnvVar('STRIPE_PUBLIC_KEY', ''),
    stripeSecretKey: getEnvVar('STRIPE_SECRET_KEY', ''),
    stripeWebhookSecret: getEnvVar('STRIPE_WEBHOOK_SECRET', ''),
  },

  // Security
  security: {
    csrfSecret: getEnvVar('CSRF_SECRET', 'dev_secret_change_in_production'),
    rateLimitMax: parseInt(getEnvVar('RATE_LIMIT_MAX_REQUESTS', '100')),
    rateLimitWindow: parseInt(getEnvVar('RATE_LIMIT_WINDOW_MS', '900000')),
  },

  // Feature Flags
  features: {
    enablePromoCodes: getEnvVar('NEXT_PUBLIC_ENABLE_PROMO_CODES', 'true') === 'true',
    enablePayment: getEnvVar('NEXT_PUBLIC_ENABLE_PAYMENT', 'false') === 'true',
    maintenanceMode: getEnvVar('NEXT_PUBLIC_MAINTENANCE_MODE', 'false') === 'true',
  },

  // Analytics
  analytics: {
    sentryDsn: getEnvVar('NEXT_PUBLIC_SENTRY_DSN', ''),
    gaTrackingId: getEnvVar('NEXT_PUBLIC_GA_TRACKING_ID', ''),
  },
} as const;

// Type-safe environment variable access
export type Env = typeof env;

// Validation on startup (only in production)
if (env.app.env === 'production') {
  const requiredVars = [
    'NEXT_PUBLIC_APP_URL',
    'CSRF_SECRET',
    'NEXT_PUBLIC_NOMINATIM_EMAIL',
  ];

  const missing = requiredVars.filter((key) => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(
      `❌ Missing required environment variables: ${missing.join(', ')}`
    );
  }
}
