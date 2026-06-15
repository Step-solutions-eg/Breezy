# SEO Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement complete SEO optimization for Breezy Island luxury desert retreat website targeting Siwa Oasis travel keywords.

**Architecture:** Centralized SEO head component (`SeoHead`) injected per-page + dedicated structured data builders + dynamic sitemap + robots.txt + updated next.config for headers.

**Tech Stack:** Next.js 16, TypeScript 5, Tailwind CSS 4

---

### Task 1: Create Structured Data Builders

**Files:**
- Create: `app/lib/seo/structured-data.ts`

- [ ] **Step 1: Write structured data builder functions**

```typescript
export interface Breadcrumb {
  name: string;
  item: string;
}

export function hotelSchema(url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: "Breezy Island — Siwa Oasis Retreat",
    description:
      "A hidden sanctuary in the heart of Siwa Oasis, where desert silence meets unparalleled luxury and timeless Egyptian hospitality.",
    url,
    telephone: "+20 100 000 0000",
    priceRange: "$$$",
    image: "https://breezyisland.com/images/3.jpeg",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Siwa Oasis",
      addressLocality: "Siwa",
      addressRegion: "Matrouh",
      addressCountry: "EG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 29.2032,
      longitude: 25.5195,
    },
    starRating: {
      "@type": "Rating",
      ratingValue: "5",
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Swimming Pool" },
      { "@type": "LocationFeatureSpecification", name: "Spa" },
      { "@type": "LocationFeatureSpecification", name: "Restaurant" },
      { "@type": "LocationFeatureSpecification", name: "Free WiFi" },
      { "@type": "LocationFeatureSpecification", name: "Air Conditioning" },
    ],
  };
}

export function localBusinessSchema(url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Breezy Island — Siwa Oasis Retreat",
    description:
      "Luxury desert retreat in the heart of Siwa Oasis, Egypt.",
    url,
    telephone: "+20 100 000 0000",
    priceRange: "$$$",
    image: "https://breezyisland.com/images/3.jpeg",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Siwa Oasis",
      addressLocality: "Siwa",
      addressRegion: "Matrouh",
      addressCountry: "EG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 29.2032,
      longitude: 25.5195,
    },
    openingHours: "Mo-Su 00:00-23:59",
    sameAs: [
      "https://instagram.com/breezyisland",
      "https://facebook.com/breezyisland",
    ],
  };
}

export function breadcrumbSchema(items: Breadcrumb[], baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${baseUrl}${item.item}`,
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function productSchema(
  name: string,
  description: string,
  image: string,
  url: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image,
    url,
    brand: {
      "@type": "Brand",
      name: "Breezy Island",
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "EGP",
      url,
    },
  };
}
```

- [ ] **Step 2: Create the directory**

Run: `New-Item -ItemType Directory -Force -Path "D:\ai-practise\breezy\app\lib\seo"`

- [ ] **Step 3: Write the file**

Write `D:\ai-practise\breezy\app\lib\seo\structured-data.ts` with the content from Step 1.

- [ ] **Step 4: Build check**

Run: `pnpm build` to verify no TypeScript errors.

---

### Task 2: Create SeoHead Component

**Files:**
- Create: `app/lib/seo/seo-head.tsx`

- [ ] **Step 1: Write the SeoHead component**

This component accepts page-specific SEO data and renders it into the document head.

```typescript
"use client";

import { useEffect } from "react";

export type SeoData = {
  title: string;
  description: string;
  keywords?: string;
  canonical: string;
  hreflang?: { lang: string; url: string }[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: "summary" | "summary_large_image";
  jsonLd?: Record<string, unknown>[];
};

const BASE_URL = "https://breezyisland.com";

function upsertTag(
  tagName: string,
  attributes: Record<string, string>,
  id: string,
) {
  const existing = document.head.querySelector(`[data-seo-id="${id}"]`);
  if (existing) {
    Object.entries(attributes).forEach(([key, value]) =>
      existing.setAttribute(key, value),
    );
    return existing;
  }
  const el = document.createElement(tagName);
  el.setAttribute("data-seo-id", id);
  Object.entries(attributes).forEach(([key, value]) =>
    el.setAttribute(key, value),
  );
  document.head.appendChild(el);
  return el;
}

function upsertLink(
  attributes: Record<string, string>,
  id: string,
) {
  return upsertTag("link", attributes, id);
}

function upsertMeta(
  attributes: Record<string, string>,
  id: string,
) {
  return upsertTag("meta", attributes, id);
}

function upsertScript(
  content: string,
  id: string,
) {
  const existing = document.head.querySelector(`[data-seo-id="${id}"]`);
  if (existing) {
    existing.textContent = content;
    return existing;
  }
  const el = document.createElement("script");
  el.setAttribute("data-seo-id", id);
  el.setAttribute("type", "application/ld+json");
  el.textContent = content;
  document.head.appendChild(el);
  return el;
}

function removeStaleTags(activeIds: Set<string>) {
  document.head
    .querySelectorAll("[data-seo-id]")
    .forEach((el) => {
      const id = el.getAttribute("data-seo-id");
      if (id && !activeIds.has(id)) {
        el.remove();
      }
    });
}

export default function SeoHead({ data }: { data: SeoData }) {
  useEffect(() => {
    const activeIds = new Set<string>();

    // Title
    const titleId = "seo-title";
    activeIds.add(titleId);
    let titleEl = document.head.querySelector(
      `[data-seo-id="${titleId}"]`,
    ) as HTMLTitleElement | null;
    if (titleEl) {
      titleEl.textContent = data.title;
    } else {
      titleEl = document.createElement("title");
      titleEl.setAttribute("data-seo-id", titleId);
      titleEl.textContent = data.title;
      document.head.appendChild(titleEl);
    }

    // Canonical
    const canonicalId = "seo-canonical";
    activeIds.add(canonicalId);
    upsertLink(
      { rel: "canonical", href: `${BASE_URL}${data.canonical}` },
      canonicalId,
    );

    // Description
    const descId = "seo-description";
    activeIds.add(descId);
    upsertMeta(
      { name: "description", content: data.description },
      descId,
    );

    // Keywords
    if (data.keywords) {
      const kwId = "seo-keywords";
      activeIds.add(kwId);
      upsertMeta(
        { name: "keywords", content: data.keywords },
        kwId,
      );
    }

    // Hreflang
    if (data.hreflang) {
      data.hreflang.forEach((hl) => {
        const hlId = `seo-hreflang-${hl.lang}`;
        activeIds.add(hlId);
        upsertLink(
          { rel: "alternate", hreflang: hl.lang, href: `${BASE_URL}${hl.url}` },
          hlId,
        );
      });
      // x-default
      const xdefId = "seo-hreflang-x-default";
      activeIds.add(xdefId);
      upsertLink(
        { rel: "alternate", hreflang: "x-default", href: `${BASE_URL}${data.canonical}` },
        xdefId,
      );
    }

    // OG
    const ogTitleId = "seo-og-title";
    activeIds.add(ogTitleId);
    upsertMeta(
      { property: "og:title", content: data.ogTitle ?? data.title },
      ogTitleId,
    );

    const ogDescId = "seo-og-description";
    activeIds.add(ogDescId);
    upsertMeta(
      { property: "og:description", content: data.ogDescription ?? data.description },
      ogDescId,
    );

    const ogUrlId = "seo-og-url";
    activeIds.add(ogUrlId);
    upsertMeta(
      { property: "og:url", content: `${BASE_URL}${data.canonical}` },
      ogUrlId,
    );

    const ogTypeId = "seo-og-type";
    activeIds.add(ogTypeId);
    upsertMeta(
      { property: "og:type", content: data.ogType ?? "website" },
      ogTypeId,
    );

    if (data.ogImage) {
      const ogImgId = "seo-og-image";
      activeIds.add(ogImgId);
      upsertMeta(
        { property: "og:image", content: `${BASE_URL}${data.ogImage}` },
        ogImgId,
      );
      const ogImgWidthId = "seo-og-image-width";
      activeIds.add(ogImgWidthId);
      upsertMeta(
        { property: "og:image:width", content: "1200" },
        ogImgWidthId,
      );
      const ogImgHeightId = "seo-og-image-height";
      activeIds.add(ogImgHeightId);
      upsertMeta(
        { property: "og:image:height", content: "630" },
        ogImgHeightId,
      );

      // Twitter uses same image
      const twImgId = "seo-twitter-image";
      activeIds.add(twImgId);
      upsertMeta(
        { name: "twitter:image", content: `${BASE_URL}${data.ogImage}` },
        twImgId,
      );
    }

    // Twitter Card
    const twCardId = "seo-twitter-card";
    activeIds.add(twCardId);
    upsertMeta(
      { name: "twitter:card", content: data.twitterCard ?? "summary_large_image" },
      twCardId,
    );

    const twTitleId = "seo-twitter-title";
    activeIds.add(twTitleId);
    upsertMeta(
      { name: "twitter:title", content: data.ogTitle ?? data.title },
      twTitleId,
    );

    const twDescId = "seo-twitter-description";
    activeIds.add(twDescId);
    upsertMeta(
      { name: "twitter:description", content: data.ogDescription ?? data.description },
      twDescId,
    );

    // JSON-LD
    if (data.jsonLd) {
      data.jsonLd.forEach((schema, i) => {
        const ldId = `seo-jsonld-${i}`;
        activeIds.add(ldId);
        upsertScript(JSON.stringify(schema), ldId);
      });
    }

    // Remove stale tags
    removeStaleTags(activeIds);
  }, [data]);

  return null;
}

export { BASE_URL };
```

- [ ] **Step 2: Write the file**

Write `D:\ai-practise\breezy\app\lib\seo\seo-head.tsx` with the content from Step 1.

- [ ] **Step 3: Build check**

Run: `pnpm build` to verify no TypeScript errors.

---

### Task 3: Update Root Layout Metadata

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Enhance the root metadata**

```typescript
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
    google: "", // Add Google Search Console verification code
  },
  other: {
    "google-site-verification": "", // Backup for older format
  },
};

// Rest of layout stays the same...
```

- [ ] **Step 2: Edit the file**

- [ ] **Step 3: Build check**

Run: `pnpm build` to verify.

---

### Task 4: Create Dynamic Sitemap

**Files:**
- Create: `app/sitemap.ts`

- [ ] **Step 1: Write the sitemap route**

```typescript
import type { MetadataRoute } from "next";

const BASE_URL = "https://breezyisland.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/rooms`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/story`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/adventure-club`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
```

- [ ] **Step 2: Write the file**

Write `D:\ai-practise\breezy\app\sitemap.ts` with content above.

- [ ] **Step 3: Build check**

Run: `pnpm build`

---

### Task 5: Create robots.txt

**Files:**
- Create: `public/robots.txt`

- [ ] **Step 1: Write robots.txt**

```
User-agent: *
Allow: /

Sitemap: https://breezyisland.com/sitemap.xml
```

- [ ] **Step 2: Write the file**

Write `D:\ai-practise\breezy\public\robots.txt` with content above.

---

### Task 6: Update Next.js Config with SEO Headers

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1: Write updated config with security/SEO headers**

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

- [ ] **Step 2: Edit next.config.ts**

- [ ] **Step 3: Build check**

Run: `pnpm build`

---

### Task 7: Add SEO to Home Page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Import SeoHead and structured data, add to component**

Add at the top:
```typescript
import SeoHead, { BASE_URL } from "./lib/seo/seo-head";
import { hotelSchema, localBusinessSchema, breadcrumbSchema, faqSchema } from "./lib/seo/structured-data";
```

Add inside the root `<SmoothScroll>` or `<main>`:
```typescript
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
      faqSchema([
        {
          question: "How do I get to Breezy Island?",
          answer:
            "Siwa Oasis is approximately a 7-hour drive from Cairo or a 4-hour drive from Marsa Matrouh. We can arrange private transfers or help coordinate your journey from either city.",
        },
        {
          question: "What is the best time to visit Siwa?",
          answer:
            "The ideal time is between October and April when temperatures are mild and pleasant. Winter months offer cool desert nights perfect for campfires and stargazing.",
        },
        {
          question: "Do you offer airport transfers?",
          answer:
            "Yes. We provide private airport transfers from Marsa Matrouh International Airport and can arrange pickup from Cairo or Alexandria upon request.",
        },
        {
          question: "What amenities are included in my stay?",
          answer:
            "Every stay includes daily breakfast, complimentary Wi-Fi, access to our spa facilities, guided property tours, and 24-hour concierge service.",
        },
        {
          question: "Is the hotel suitable for families?",
          answer:
            "Absolutely. We offer family-friendly suites, children's activities, and can arrange private excursions suitable for all ages.",
        },
        {
          question: "What dining options are available?",
          answer:
            "Our restaurant serves authentic Siwan cuisine made from locally sourced ingredients. We also offer private dining experiences, cooking classes, and sunset dinners in the dunes.",
        },
      ]),
    ],
  }}
/>
```

- [ ] **Step 2: Edit `app/page.tsx`**

- [ ] **Step 3: Build check**

Run: `pnpm build`

---

### Task 8: Add SEO to Rooms Page

**Files:**
- Modify: `app/rooms/page.tsx`

- [ ] **Step 1: Import and add SeoHead**

Add import:
```typescript
import SeoHead, { BASE_URL } from "../lib/seo/seo-head";
import { breadcrumbSchema, productSchema } from "../lib/seo/structured-data";
```

Add inside the `<SmoothScroll>` or after `<ScrollProgressBar />`:
```typescript
<SeoHead
  data={{
    title: "Luxury Rooms & Suites in Siwa Oasis — Breezy Island",
    description:
      "Explore four distinct luxury accommodations at Breezy Island in Siwa Oasis: Palm Courtyard Suite, Desert Vista Villa, Oasis Hideaway Room, and Salt Lake Penthouse. Each sanctuary frames the silence of the desert in its own way. Book your Siwa room today.",
    keywords:
      "Siwa hotel rooms, luxury suites Siwa, Siwa villa rental, boutique accommodation Siwa, Siwa Oasis accommodation, hotels in Siwa Egypt, Siwa resort rooms, family hotel in Siwa, romantic resort Siwa, eco lodge Siwa rooms",
    canonical: "/rooms",
    hreflang: [
      { lang: "en", url: "/rooms" },
      { lang: "ar", url: "/rooms" },
    ],
    ogTitle: "Luxury Rooms & Suites in Siwa Oasis — Breezy Island",
    ogDescription:
      "Four distinct sanctuaries in Siwa Oasis, each crafted to frame the silence and beauty of the desert in its own way.",
    ogImage: "/images/4.jpeg",
    ogType: "website",
    twitterCard: "summary_large_image",
    jsonLd: [
      breadcrumbSchema(
        [
          { name: "Home", item: "/" },
          { name: "Rooms", item: "/rooms" },
        ],
        BASE_URL,
      ),
      ...rooms.map((room) =>
        productSchema(
          room.name,
          room.description,
          `${BASE_URL}${room.image}`,
          `${BASE_URL}/rooms`,
        ),
      ),
    ],
  }}
/>
```

- [ ] **Step 2: Edit `app/rooms/page.tsx`**

Add import at the top, and add `<SeoHead ... />` right inside the `<SmoothScroll>` component (before `<ScrollProgressBar />`).

- [ ] **Step 3: Build check**

Run: `pnpm build`

---

### Task 9: Add SEO to Story Page

**Files:**
- Modify: `app/story/page.tsx`

- [ ] **Step 1: Import and add SeoHead**

Add import:
```typescript
import SeoHead, { BASE_URL } from "../lib/seo/seo-head";
import { breadcrumbSchema } from "../lib/seo/structured-data";
```

Add inside `<SmoothScroll>`:
```typescript
<SeoHead
  data={{
    title: "Our Story — Breezy Island Siwa Oasis Retreat",
    description:
      "Discover the story behind Breezy Island, a luxury desert retreat born from the silence of Siwa Oasis. Learn about our philosophy, our journey from dream to destination, and our commitment to authentic Siwan hospitality.",
    keywords:
      "Breezy Island story, about Siwa Oasis, Siwa history, desert retreat philosophy, Siwan hospitality, eco tourism Siwa, wellness retreat Siwa, sustainable tourism Egypt",
    canonical: "/story",
    hreflang: [
      { lang: "en", url: "/story" },
      { lang: "ar", url: "/story" },
    ],
    ogTitle: "Our Story — Breezy Island Siwa Oasis Retreat",
    ogDescription:
      "Born from the silence of Siwa — discover the journey behind the luxury desert retreat.",
    ogImage: "/images/hero-interior-1.jpeg",
    ogType: "website",
    twitterCard: "summary_large_image",
    jsonLd: [
      breadcrumbSchema(
        [
          { name: "Home", item: "/" },
          { name: "Our Story", item: "/story" },
        ],
        BASE_URL,
      ),
    ],
  }}
/>
```

- [ ] **Step 2: Edit `app/story/page.tsx`**

- [ ] **Step 3: Build check**

Run: `pnpm build`

---

### Task 10: Add SEO to Adventure Club Page

**Files:**
- Modify: `app/adventure-club/page.tsx`

- [ ] **Step 1: Import and add SeoHead**

Add import:
```typescript
import SeoHead, { BASE_URL } from "../lib/seo/seo-head";
import { breadcrumbSchema } from "../lib/seo/structured-data";
```

Add inside the component (after `<Navbar />` or inside `<main>`):
```typescript
<SeoHead
  data={{
    title: "Siwa Travel Club & Desert Adventures — Breezy Island",
    description:
      "Join the Siwa Travel Club at Breezy Island. Explore curated desert adventures, wellness retreats, salt lake excursions, and cultural immersion experiences in Siwa Oasis, Egypt.",
    keywords:
      "Siwa travel club, Siwa desert safari, Siwa adventure, things to do in Siwa, Siwa attractions, desert safari Egypt, Siwa salt lakes, Siwa Oasis tours, wellness retreat Siwa, eco tourism Siwa",
    canonical: "/adventure-club",
    hreflang: [
      { lang: "en", url: "/adventure-club" },
      { lang: "ar", url: "/adventure-club" },
    ],
    ogTitle: "Siwa Travel Club & Desert Adventures — Breezy Island",
    ogDescription:
      "More than a travel experience — a gateway into the raw beauty, culture, and spirit of Siwa Oasis.",
    ogImage: "/images/SAC Main Photo.jpg",
    ogType: "website",
    twitterCard: "summary_large_image",
    jsonLd: [
      breadcrumbSchema(
        [
          { name: "Home", item: "/" },
          { name: "Adventure Club", item: "/adventure-club" },
        ],
        BASE_URL,
      ),
    ],
  }}
/>
```

- [ ] **Step 2: Edit `app/adventure-club/page.tsx`**

- [ ] **Step 3: Build check**

Run: `pnpm build`

---

### Task 11: Add SEO to Contact Us Page

**Files:**
- Modify: `app/contact-us/page.tsx`

- [ ] **Step 1: Import and add SeoHead**

Add import:
```typescript
import SeoHead, { BASE_URL } from "../lib/seo/seo-head";
import { breadcrumbSchema, localBusinessSchema } from "../lib/seo/structured-data";
```

Add inside `<SmoothScroll>`:
```typescript
<SeoHead
  data={{
    title: "Book Your Stay at Breezy Island — Siwa Oasis, Egypt",
    description:
      "Contact Breezy Island to plan your luxury desert escape in Siwa Oasis. Request availability, ask about our rooms and suites, or arrange a custom itinerary. We reply within 24 hours.",
    keywords:
      "book Siwa hotel, Siwa reservation, contact Breezy Island, Siwa booking, hotels near Siwa attractions, Siwa swimming pool hotel, Siwa Oasis reservation, Egypt desert resort booking",
    canonical: "/contact-us",
    hreflang: [
      { lang: "en", url: "/contact-us" },
      { lang: "ar", url: "/contact-us" },
    ],
    ogTitle: "Book Your Stay at Breezy Island — Siwa Oasis, Egypt",
    ogDescription:
      "Tell us when you want to arrive, who is coming, and what kind of stay you imagine. We will reply with the next simple step.",
    ogImage: "/images/5.jpeg",
    ogType: "website",
    twitterCard: "summary_large_image",
    jsonLd: [
      breadcrumbSchema(
        [
          { name: "Home", item: "/" },
          { name: "Contact Us", item: "/contact-us" },
        ],
        BASE_URL,
      ),
      localBusinessSchema(`${BASE_URL}/contact-us`),
    ],
  }}
/>
```

- [ ] **Step 2: Edit `app/contact-us/page.tsx`**

- [ ] **Step 3: Build check**

Run: `pnpm build`

---

### Task 12: Update Image Alt Attributes Across Components

**Files:**
- Modify: `app/components/HeroSection.tsx`
- Modify: `app/components/AboutSection.tsx`
- Modify: `app/components/ProjectsSection.tsx`
- Modify: `app/components/ServicesSection.tsx`
- Modify: `app/components/ArticlesSection.tsx`
- Modify: `app/components/Footer.tsx`

- [ ] **Step 1: Read each component file and identify all `<Image>` and `<img>` elements**

- [ ] **Step 2: Update alt text for each image with descriptive, keyword-rich alt attributes**

Key replacements:
- Generic alts like "Breezy Island luxury room" → "Luxury suite at Breezy Island resort in Siwa Oasis, Egypt"
- "Siwa Oasis landscape" → "Siwa Oasis desert landscape with palm groves at sunset — Breezy Island luxury retreat"
- "Desert landscape" → "Golden sand dunes of the Great Sand Sea near Siwa Oasis, Egypt"
- etc.

- [ ] **Step 3: Build check**

Run: `pnpm build`

---

### Task 13: Build & Verify Final Output

- [ ] **Step 1: Production build**

Run: `pnpm build`

- [ ] **Step 2: Verify sitemap**

Run dev server and check `http://localhost:3000/sitemap.xml` returns valid XML.

- [ ] **Step 3: Verify robots.txt**

Check `http://localhost:3000/robots.txt` returns the correct content.

- [ ] **Step 4: Verify structured data (optional)**

If possible, use Google Rich Results Test or check JSON-LD in browser DevTools → Elements → search for `application/ld+json`.

---
