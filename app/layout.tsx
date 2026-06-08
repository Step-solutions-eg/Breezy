import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BreezyIsland — Interior Design",
  description:
    "Designing interiors that balance clarity, comfort, and elegance, transforming everyday spaces into considered living environments.",
  keywords:
    "interior design, BreezyIsland, luxury interiors, residential design",
  openGraph: {
    title: "BreezyIsland — Interior Design",
    description:
      "Transforming everyday spaces into considered living environments.",
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
