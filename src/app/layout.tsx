import type { Metadata } from "next";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/react";
import { StructuredData } from "@/components/StructuredData";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://krakowtransfer.com'),
  
  title: {
    default: "Krakow Airport Transfer | Professional Private Taxi Service | 24/7",
    template: "%s | Krakow Transfer"
  },
  
  description: "Book reliable airport transfers in Krakow. Professional drivers, modern vehicles, competitive prices. Door-to-door service from Krakow Airport (KRK) to city center, hotels & tours.",
  
  applicationName: "Krakow Transfer",
  authors: [{ name: "Krakow Transfer" }],
  generator: "Next.js",
  
  keywords: [
    "Krakow airport transfer",
    "Krakow taxi",
    "airport shuttle Krakow",
    "private transfer Krakow",
    "KRK airport taxi",
    "Krakow transportation",
    "airport pickup Krakow",
    "Auschwitz tour from Krakow",
    "Wieliczka Salt Mine transfer",
    "Zakopane transport from Krakow",
    "Krakow city tours",
    "private driver Krakow"
  ],
  
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Krakow Transfer",
    title: "Krakow Airport Transfer | Professional Private Taxi Service",
    description: "Book reliable airport transfers in Krakow. Professional drivers, modern vehicles, 24/7 service. Fixed prices, no hidden fees.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Krakow Transfer - Professional Airport Transportation"
      }
    ],
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Krakow Airport Transfer | Professional Service",
    description: "Book reliable airport transfers in Krakow. 24/7 service, professional drivers.",
    images: ["/images/twitter-image.jpg"],
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  verification: {
    // Add when you have accounts
    google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
  
  alternates: {
    canonical: "/",
  },
  
  category: "Travel & Transportation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* PWA */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        
        {/* iOS */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Krakow Transfer" />
        
        {/* Other */}
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className="antialiased">
        <StructuredData />
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
