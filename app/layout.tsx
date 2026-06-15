import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./lib/language";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: {
    default: "Breezy Island — Luxury Resort in Siwa Oasis, Egypt",
    template: "%s — Breezy Island Siwa Oasis",
  },
  description:
    "Discover Breezy Island, a luxury desert retreat in the heart of Siwa Oasis, Egypt. Experience unparalleled tranquility, private villas, salt lake views, and timeless Egyptian hospitality. Book your Siwa escape today.",
  keywords: [
    "Breezy Island",
    "Siwa Oasis",
    "hotels in Siwa",
    "Siwa Egypt hotels",
    "luxury resort Siwa",
    "desert resort Egypt",
    "Siwa accommodation",
    "Siwa vacation resort",
    "boutique hotel Siwa",
    "Siwa Oasis resort",
    "eco lodge Siwa",
    "best hotel in Siwa",
    "فنادق سيوة",
    "منتجع سيوة",
    "واحة سيوة",
  ],
  category: "travel",
  openGraph: {
    title: "Breezy Island — Luxury Resort in Siwa Oasis, Egypt",
    description:
      "Discover Breezy Island, a luxury desert retreat in the heart of Siwa Oasis, Egypt.",
    type: "website",
    locale: "en_US",
    siteName: "Breezy Island",
  },
  twitter: {
    card: "summary_large_image",
    title: "Breezy Island — Luxury Resort in Siwa Oasis, Egypt",
    description:
      "Discover Breezy Island, a luxury desert retreat in the heart of Siwa Oasis, Egypt.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "",
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cairo.variable}>
      <body className="antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
