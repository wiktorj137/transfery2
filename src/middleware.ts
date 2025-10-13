import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { RateLimiterMemory } from 'rate-limiter-flexible';

// Rate limiter configuration
const rateLimiter = new RateLimiterMemory({
  points: 100, // Number of requests
  duration: 15 * 60, // Per 15 minutes
});

// API rate limiter (stricter)
const apiRateLimiter = new RateLimiterMemory({
  points: 20,
  duration: 60, // Per minute
});

// Helper to get client IP
function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  return forwarded?.split(',')[0] || realIp || 'unknown';
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const clientIp = getClientIp(request);

  // Apply rate limiting
  try {
    // Stricter rate limiting for API routes
    if (pathname.startsWith('/api/')) {
      await apiRateLimiter.consume(clientIp);
    } else {
      await rateLimiter.consume(clientIp);
    }
  } catch (error) {
    // Rate limit exceeded
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: {
        'Retry-After': '60',
        'X-RateLimit-Limit': pathname.startsWith('/api/') ? '20' : '100',
        'X-RateLimit-Remaining': '0',
      },
    });
  }

  // Create response with security headers
  const response = NextResponse.next();

  // Security Headers (Production-grade)
  const headers = {
    // Content Security Policy
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https: blob:",
      "font-src 'self' data:",
      "connect-src 'self' https://nominatim.openstreetmap.org https://va.vercel-scripts.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),

    // Other security headers
    'X-DNS-Prefetch-Control': 'on',
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  };

  // Apply security headers
  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // CSRF Token (for form submissions)
  if (request.method === 'POST' && pathname.startsWith('/api/')) {
    const csrfToken = request.headers.get('x-csrf-token');
    const cookieCsrfToken = request.cookies.get('csrf-token')?.value;

    if (!csrfToken || csrfToken !== cookieCsrfToken) {
      return new NextResponse('Invalid CSRF Token', { status: 403 });
    }
  }

  return response;
}

// Configure which routes use middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
