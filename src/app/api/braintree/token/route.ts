import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // W prawdziwej aplikacji użyj braintree SDK na backendzie
    // Tutaj zwracamy mock token dla sandbox
    
    const token = Buffer.from(
      JSON.stringify({
        merchantId: process.env.NEXT_PUBLIC_BRAINTREE_MERCHANT_ID,
        publicKey: process.env.NEXT_PUBLIC_BRAINTREE_PUBLIC_KEY,
        timestamp: Date.now(),
      })
    ).toString('base64');

    return NextResponse.json({
      clientToken: token,
    });
  } catch (error) {
    console.error('Error generating client token:', error);
    return NextResponse.json(
      { error: 'Failed to generate client token' },
      { status: 500 }
    );
  }
}
