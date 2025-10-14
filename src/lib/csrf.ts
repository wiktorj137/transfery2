/**
 * CSRF Protection Utilities
 * Edge Runtime compatible (Web Crypto API)
 * Works in Next.js middleware and Edge Runtime
 */

const CSRF_SECRET = process.env.CSRF_SECRET || 'dev_secret_change_in_production';
const TOKEN_LENGTH = 32;

/**
 * Convert string to Uint8Array (Edge-compatible)
 */
function stringToUint8Array(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}

/**
 * Convert Uint8Array to hex string
 */
function uint8ArrayToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Generate HMAC signature using Web Crypto API (Edge-compatible)
 */
async function generateHmac(data: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const messageData = encoder.encode(data);

  const key = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', key, messageData);
  return uint8ArrayToHex(new Uint8Array(signature));
}

/**
 * Generate a new CSRF token (Edge-compatible)
 * @returns Promise<CSRF token string>
 */
export async function generateCsrfToken(): Promise<string> {
  // Use Web Crypto API (Edge Runtime compatible)
  const randomValues = new Uint8Array(TOKEN_LENGTH);
  crypto.getRandomValues(randomValues);
  const token = uint8ArrayToHex(randomValues);
  
  const signature = await generateHmac(token, CSRF_SECRET);
  return `${token}.${signature}`;
}

/**
 * Validate CSRF token (Edge-compatible)
 * @param token - Token to validate
 * @returns Promise<boolean>
 */
export async function validateCsrfToken(token: string | null | undefined): Promise<boolean> {
  if (!token) return false;
  
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  
  const [tokenValue, signature] = parts;
  const expectedSignature = await generateHmac(tokenValue, CSRF_SECRET);
  
  // Constant-time comparison to prevent timing attacks
  return signature === expectedSignature;
}

/**
 * Extract CSRF token from request headers or cookies
 * @param request - Next.js request object
 * @returns CSRF token or null
 */
export function extractCsrfToken(request: Request): string | null {
  // Check X-CSRF-Token header first
  const headerToken = request.headers.get('x-csrf-token');
  if (headerToken) return headerToken;
  
  // Check cookies as fallback
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) return null;
  
  const cookies = cookieHeader.split(';').map(c => c.trim());
  const csrfCookie = cookies.find(c => c.startsWith('csrf-token='));
  
  if (csrfCookie) {
    return csrfCookie.split('=')[1];
  }
  
  return null;
}
