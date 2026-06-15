# SEO Optimization — Breezy Hotel Siwa

## Status: Design Approved

## Overview

Comprehensive SEO optimization for Breezy Island, a luxury desert retreat in Siwa Oasis, Egypt. The site is a Next.js 16 app with 5 pages (Home, Rooms, Story, Adventure Club, Contact Us) and a client-side English/Arabic language switcher.

## Architecture

### 1. SEO Head Component (`app/lib/seo/seo-head.tsx`)
A `"use client"` component injected into each page that renders `<head>` metadata via `document.head` manipulation + `<Helmet>`-style pattern. Each page gets:
- Unique `<title>` and `<meta name="description">`
- `<meta name="keywords">` with multilingual keywords
- `<link rel="canonical">` pointing to canonical URL
- `<link rel="alternate" hreflang="en">` and `hreflang="ar"` tags
- Open Graph (`og:title`, `og:description`, `og:image`, `og:type`, `og:url`)
- Twitter Cards (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`)
- JSON-LD structured data injected into `<script type="application/ld+json">`

### 2. Structured Data Builders (`app/lib/seo/structured-data.ts`)
Reusable JSON-LD builders:
- **Hotel** schema (home page) — name, description, address (Siwa Oasis, Matrouh, Egypt), telephone, priceRange, image, starRating
- **LocalBusiness** schema (home & contact) — same address data, serves as parent
- **BreadcrumbList** (every page) — site hierarchy breadcrumbs
- **FAQPage** (FAQ section of home page) — question/answer pairs
- **Product** schemas for each room type on rooms page

### 3. Sitemap (`app/sitemap.ts`)
Dynamic XML sitemap using Next.js App Router sitemap convention:
- All 5 pages with appropriate `lastmod`, `changeFrequency`, `priority`
- Home: weekly, 1.0
- Rooms: weekly, 0.9
- Story: monthly, 0.7
- Adventure Club: monthly, 0.8
- Contact Us: monthly, 0.6

### 4. Robots.txt (`public/robots.txt`)
Allows all crawlers, points to sitemap.

### 5. Next.js Config Update (`next.config.ts`)
Add redirects, headers for SEO.

### 6. Image Alt Attributes
Update all `<Image>` and `<img>` elements with keyword-optimized alt text.

## Keyword Strategy

Primary keywords (English):
- "Siwa hotels", "hotels in Siwa", "Siwa Oasis resort", "luxury hotel Siwa"
- "Siwa Egypt accommodation", "boutique hotel Siwa", "desert resort Egypt"

Primary keywords (Arabic):
- "فنادق سيوة", "منتجع سيوة", "واحة سيوة", "فندق في سيوة"

## Page-Level SEO Plan

| Page | Title | H1 |
|------|-------|----|
| Home | Breezy Island — Luxury Resort in Siwa Oasis, Egypt | "A Hidden Sanctuary in the Heart of Siwa" |
| Rooms | Luxury Rooms & Suites — Breezy Island Siwa Oasis | "Where You Stay" |
| Story | Our Story — Breezy Island Siwa Oasis Retreat | "Born from the Silence of Siwa" |
| Adventure Club | Siwa Travel Club & Desert Adventures — Breezy Island | "Adventure Club" |
| Contact Us | Book Your Stay — Breezy Island Siwa Oasis | "Let us plan your escape" |

## Implementation Order

1. Create `app/lib/seo/` directory with structured data builders
2. Create `app/lib/seo/seo-head.tsx` component
3. Update `app/layout.tsx` core metadata
4. Add SEO to `app/page.tsx` (Home)
5. Add SEO to `app/rooms/page.tsx`
6. Add SEO to `app/story/page.tsx`
7. Add SEO to `app/adventure-club/page.tsx`
8. Add SEO to `app/contact-us/page.tsx`
9. Create `app/sitemap.ts`
10. Create `public/robots.txt`
11. Update `next.config.ts`
12. Update image alt attributes across all components

## Files to Create
- `app/lib/seo/seo-head.tsx`
- `app/lib/seo/structured-data.ts`
- `app/sitemap.ts`
- `public/robots.txt`

## Files to Modify
- `app/layout.tsx`
- `app/page.tsx`
- `app/rooms/page.tsx`
- `app/story/page.tsx`
- `app/adventure-club/page.tsx`
- `app/contact-us/page.tsx`
- `next.config.ts`
- Various component files with `<Image>` elements
