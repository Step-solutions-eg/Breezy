import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Breezy Island — Siwa Oasis Retreat",
  description:
    "A hidden sanctuary in the heart of Siwa Oasis, where desert silence meets unparalleled luxury and timeless Egyptian hospitality.",
  keywords:
    "Breezy Island, Siwa Oasis, Egypt hotel, desert retreat, luxury resort Siwa",
  openGraph: {
    title: "Breezy Island — Siwa Oasis Retreat",
    description:
      "A hidden sanctuary in Siwa where desert silence meets unparalleled luxury.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
