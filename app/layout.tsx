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
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://www.hornezinmobiliaria.com"),
  title: "Hornez Inmobiliaria",
  description: "Encontrá tu lugar en el mundo",
  icons: {
    icon: "/img/logo.svg",
    shortcut: "/img/logo.svg",
    apple: "/img/logoColor.png",
  },
  openGraph: {
    title: "Hornez Inmobiliaria",
    description: "Encontrá tu lugar en el mundo",
    siteName: "Hornez Inmobiliaria",
    type: "website",
    images: [
      {
        url: "/img/logoColor.png",
        width: 600,
        height: 135,
        alt: "Hornez Inmobiliaria",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hornez Inmobiliaria",
    description: "Encontrá tu lugar en el mundo",
    images: ["/img/logoColor.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-screen flex flex-col overflow-x-hidden">
        <GoogleMapsProvider>
          <PrimeReactProvider>
            <main className="flex-1 flex flex-col">{children}</main>
          </PrimeReactProvider>
        </GoogleMapsProvider>
      </body>
    </html>
  );
}

