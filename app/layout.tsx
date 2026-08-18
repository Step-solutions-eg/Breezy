import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./lib/language";
import WhatsAppFloat from "./components/WhatsAppFloat";
import { SITE_NAME, SITE_URL } from "./lib/site";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Breezy Island — Luxury Desert Resort in Siwa Oasis, Egypt",
    template: "%s — Breezy Island Siwa Oasis",
  },
  description:
    "Book Breezy Island, a 5-star luxury desert resort in Siwa Oasis, Egypt. Private villas with salt lake views, salt pools, authentic Bedouin hospitality & unforgettable desert adventures.",
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
    "Siwa salt lake",
    "فنادق سيوة",
    "منتجع سيوة",
    "واحة سيوة",
    "حجز فندق سيوة",
  ],
  category: "travel",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Breezy Island — Luxury Desert Resort in Siwa Oasis, Egypt",
    description:
      "Book Breezy Island, a 5-star luxury desert resort in Siwa Oasis, Egypt. Private villas with salt lake views, salt pools & authentic Bedouin hospitality.",
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    url: SITE_URL,
    images: [
      {
        url: "/images/SAC%20Main%20Photo.webp",
        width: 1200,
        height: 630,
        alt: "Breezy Island luxury desert resort in Siwa Oasis, Egypt",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Breezy Island — Luxury Desert Resort in Siwa Oasis, Egypt",
    description:
      "Book Breezy Island, a 5-star luxury desert resort in Siwa Oasis, Egypt. Private villas with salt lake views & authentic Bedouin hospitality.",
    images: ["/images/SAC%20Main%20Photo.webp"],
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Resort",
  name: SITE_NAME,
  url: SITE_URL,
  description:
    "Luxury desert resort in Siwa Oasis, Egypt with private villas, salt lake views and authentic Bedouin hospitality.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Siwa Oasis",
    addressCountry: "EG",
  },
  priceRange: "$$$",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cairo.variable}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LanguageProvider>
          {children}
          <WhatsAppFloat />
        </LanguageProvider>
      </body>
    </html>
  );
}
