import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Krakow Airport Transfer | Professional Private Taxi Service | 24/7",
  description: "Book reliable airport transfers in Krakow. Professional drivers, modern vehicles, competitive prices. Door-to-door service from Krakow Airport (KRK) to city center, hotels & tours.",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  keywords: [
    "Krakow airport transfer",
    "Krakow taxi",
    "airport shuttle Krakow",
    "private transfer Krakow",
    "KRK airport taxi",
    "Krakow transportation",
    "airport pickup Krakow",
    "Auschwitz tour",
    "Wieliczka transfer",
    "Zakopane transport"
  ],
  openGraph: {
    title: "Krakow Airport Transfer | Professional Private Taxi Service",
    description: "Book reliable airport transfers in Krakow. Professional drivers, modern vehicles, 24/7 service.",
    type: "website",
    locale: "en_US",
    siteName: "Krakow Transfer",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://krakowtransfer.com", // Zaktualizuj URL gdy będzie dostępny
    languages: {
      'en': 'https://krakowtransfer.com/en',
      'pl': 'https://krakowtransfer.com/pl',
      'de': 'https://krakowtransfer.com/de',
      'fr': 'https://krakowtransfer.com/fr',
      'it': 'https://krakowtransfer.com/it',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
