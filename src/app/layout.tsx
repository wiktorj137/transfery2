import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Krakow Transfer - Airport Transfers & Tours",
  description: "Professional airport transfers in Krakow. Auschwitz, Zakopane, Wieliczka and more.",
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
