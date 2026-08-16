"use client";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import ServicesSection from "./components/ServicesSection";
import RestaurantTransportSection from "./components/RestaurantTransportSection";
import ArticlesSection from "./components/ArticlesSection";
import FaqSection from "./components/FaqSection";
import ProcessCtaSection from "./components/ProcessCtaSection";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";
import ScrollProgressBar from "./components/ScrollProgressBar";
import SeoHead, { BASE_URL } from "./lib/seo/seo-head";
import {
  hotelSchema,
  localBusinessSchema,
  breadcrumbSchema,
} from "./lib/seo/structured-data";

export default function Home() {
  return (
    <SmoothScroll>
      <SeoHead
        data={{
          title: "Breezy Island — Luxury Resort in Siwa Oasis, Egypt",
          description:
            "Discover Breezy Island, a luxury desert retreat in the heart of Siwa Oasis, Egypt. Experience unparalleled tranquility, private villas, salt lake views, and timeless Egyptian hospitality. Book your Siwa escape today.",
          keywords:
            "Siwa hotels, hotels in Siwa, Siwa Oasis resort, luxury hotel Siwa, best hotel in Siwa, Siwa accommodation, desert resort Egypt, boutique hotel Siwa, eco lodge Siwa, Siwa getaway, فندق في سيوة, منتجع سيوة, واحة سيوة",
          canonical: "/",
          hreflang: [
            { lang: "en", url: "/" },
            { lang: "ar", url: "/" },
          ],
          ogTitle: "Breezy Island — Luxury Resort in Siwa Oasis, Egypt",
          ogDescription:
            "A hidden sanctuary in the heart of Siwa Oasis, where desert silence meets unparalleled luxury.",
          ogImage: "/images/3.jpeg",
          ogType: "website",
          twitterCard: "summary_large_image",
          jsonLd: [
            hotelSchema(`${BASE_URL}/`),
            localBusinessSchema(`${BASE_URL}/`),
            breadcrumbSchema(
              [{ name: "Home", item: "/" }],
              BASE_URL,
            ),
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "How do I get to Breezy Island?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Siwa Oasis is approximately a 7-hour drive from Cairo or a 4-hour drive from Marsa Matrouh. We can arrange private transfers or help coordinate your journey from either city.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What is the best time to visit Siwa?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "The ideal time is between October and April when temperatures are mild and pleasant. Winter months offer cool desert nights perfect for campfires and stargazing.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do you offer airport transfers?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. We provide private airport transfers from Marsa Matrouh International Airport and can arrange pickup from Cairo or Alexandria upon request.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What amenities are included in my stay?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Every stay includes daily breakfast, complimentary Wi-Fi, access to our spa facilities, guided property tours, and 24-hour concierge service.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is the hotel suitable for families?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Absolutely. We offer family-friendly suites, children's activities, and can arrange private excursions suitable for all ages.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What dining options are available?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Our restaurant serves authentic Siwan cuisine made from locally sourced ingredients. We also offer private dining experiences, cooking classes, and sunset dinners in the dunes.",
                  },
                },
              ],
            },
          ],
        }}
      />
      <ScrollProgressBar />
      <main>
        <Navbar />
        <HeroSection />
        <div className="relative z-10 -mt-[100vh] pointer-events-none">
          <div className="h-screen pointer-events-none" />
          <div className="pointer-events-auto">
            <AboutSection />
          </div>
        </div>
        <ProjectsSection />
        <ServicesSection />
        <RestaurantTransportSection />
        <ArticlesSection />
        <FaqSection />
        <ProcessCtaSection />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
