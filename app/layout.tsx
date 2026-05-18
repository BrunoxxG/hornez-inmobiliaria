import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PrimeReactProvider } from "primereact/api";
import GoogleMapsProvider from "./providers/GoogleMapsProvider";

import "primeicons/primeicons.css";
import "./globals.css";
import "primereact/resources/themes/saga-blue/theme.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hornez Inmobiliaria",
  description: "Encontrá tu lugar en el mundo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-screen flex flex-col">
        <GoogleMapsProvider>
          <PrimeReactProvider>
            <main className="flex-1 flex flex-col">{children}</main>
          </PrimeReactProvider>
        </GoogleMapsProvider>
      </body>
    </html>
  );
}

