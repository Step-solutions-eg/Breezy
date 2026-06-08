---
version: alpha
name: Breezy Island
description: Editorial Luxury interior design studio — warm creams, deep espresso tones, high-contrast serif/variable typography, film-grain texture overlay, floating glass components, and photographic storytelling.
colors:
  surface-base: "#F2F1EF"
  surface-raised: "#F3EEE7"
  surface-overlay: "#503A26"
  text-primary: "#503A26"
  text-secondary: "#5E6B57"
  text-tertiary: "#C8A17E"
  border-default: "#7D9C9A"
  accent: "#C8A17E"
  accent-secondary: "#7D9C9A"
typography:
  heading-display:
    fontFamily: "New York"
    fontSize: 64px
    fontWeight: 400
    lineHeight: 0.985
    letterSpacing: 0em
  heading-xl:
    fontFamily: "SF Mono"
    fontSize: 48px
    fontWeight: 500
    lineHeight: 0.985
    letterSpacing: 0em
  body-lg:
    fontFamily: "SF Mono"
    fontSize: 22px
    fontWeight: 400
    lineHeight: 1.2
  body-md:
    fontFamily: "SF Mono"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: "SF Mono"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.4
  label-caps:
    fontFamily: "SF Mono"
    fontSize: 10px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0.2em
rounded:
  sm: 7px
  md: 12px
  lg: 16px
  xl: 24px
  xxl: 32px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  section-y: 96px
components:
  badge:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.full}"
    padding: 4px 16px
  badge-icon-wrapper:
    backgroundColor: "{colors.surface-overlay}"
    textColor: "#FFFFFF"
    rounded: "{rounded.full}"
    size: 28px
  button-cta:
    backgroundColor: "{colors.surface-overlay}"
    textColor: "#FFFFFF"
    rounded: "{rounded.full}"
    padding: 8px 24px
  button-cta-hover:
    backgroundColor: "{colors.surface-overlay}"
    textColor: "#FFFFFF"
    opacity: 0.9
  button-cta-icon:
    backgroundColor: "#FFFFFF"
    textColor: "{colors.surface-overlay}"
    rounded: "{rounded.full}"
    size: 40px
  card-article:
    backgroundColor: "{colors.surface-overlay}"
    textColor: "#FFFFFF"
    rounded: 7px
  card-project:
    backdropFilter: blur-xl
    backgroundColor: "rgba(255,255,255,0.12)"
    rounded: 7px
  double-bezel-outer:
    padding: 6px
    rounded: 32px
    borderColor: "rgba(255,255,255,0.1)"
  double-bezel-inner:
    rounded: 26px
    insetShadow: true
---

## Overview

**Editorial Luxury** — Breezy Island is a high-end interior design brand. Every visual decision whispers luxury, spatial awareness, and tactile warmth. The overall vibe is warm creams, deep espresso tones, high-contrast serif/variable typography with monospace accent, film-grain texture overlay, floating glass components, and photographic storytelling. The hero image is the brand's anchor — treated as hero art, not a generic background.

## Colors

The palette is rooted in warm neutrals with deep espresso and sage green accents, evoking natural materials, earth, and refined craftsmanship.

- **Surface Base (#F2F1EF):** Warm cream foundation for all page backgrounds. Softer than pure white, evokes natural linen.
- **Surface Raised (#F3EEE7):** Slightly warmer tone for cards, badges, and raised elements. Subtle shift from base.
- **Surface Overlay (#503A26):** Deep espresso used for navbars, overlays, button backgrounds, and dark text on light surfaces. The anchoring dark tone.
- **Text Primary (#503A26):** Espresso for all body text, headings in monospace sections. Provides warmth while maintaining readability.
- **Text Secondary (#5E6B57):** Muted sage green for secondary text, captions, and metadata. Evokes olive branches and natural foliage.
- **Text Tertiary (#C8A17E):** Warm gold for accent text, decorative elements, and tertiary information.
- **Border Default (#7D9C9A):** Teal-gray for borders, dividers, and structural lines. Adds a subtle cool counterpoint to warm browns.
- **Accent (#C8A17E):** Warm gold — the primary driver for interactive highlights and decorative accents.
- **Accent Secondary (#7D9C9A):** Teal-gray — secondary accent used sparingly for variety.

## Typography

The typography strategy pairs **New York** (serif) for editorial headings with **SF Mono** (monospace) for body text and labels. This unexpected combination creates a distinctive, editorial-meets-technical voice.

- **Heading Display:** New York serif, 64px, regular weight, tight leading (0.985). Used for hero titles and major section headings. Evokes magazine spread sophistication.
- **Heading XL:** SF Mono, 48px, medium weight, uppercase. Used for section headers in the monospace style. Transforms the utilitarian nature of monospace into a design statement.
- **Body LG:** SF Mono, 22px, regular. Used for feature descriptions and lead paragraphs.
- **Body MD:** SF Mono, 16px, regular. Default body text for articles, project descriptions, and general content.
- **Body SM:** SF Mono, 14px. Small print, captions, and metadata.
- **Label Caps:** SF Mono, 10px, medium weight, 0.2em letter-spacing, uppercase. Used for eyebrow tags and badge labels.

## Layout

The layout follows an **Asymmetrical Bento / Editorial Cascade** model. Sections use generous vertical whitespace (py-24 to py-40) with content grouped into intentional, asymmetric grids.

- **Macro-Whitespace:** Section padding of 96px–160px vertically creates a slow, rhythmic scroll experience.
- **Asymmetric Grids:** Content is never centered symmetrically. Text and image blocks use intentional off-balance ratios (e.g., 0.49fr / 0.51fr, or 1fr / auto).
- **Max-width content:** Text blocks are capped at 650px–780px for optimal readability.
- **Fluid typography:** Uses `clamp()` for fluid type scaling (e.g., `clamp(48px, 3.35vw, 64px)`).

## Elevation & Depth

Depth is achieved through **tonal layering** and **glass morphism** rather than heavy shadows.

- **Glass panels:** Floating navbar uses `backdrop-blur-xl backdrop-saturate-150` with subtle white border overlay (`inset 0 1px 0 rgba(255,255,255,0.24)`).
- **Project cards** use `box-shadow: 0 24px 70px rgba(0,0,0,0.28)` with glass backdrop.
- **Image overlays** use dark gradients (`rgba(8,8,7, 0.48)` to `rgba(8,8,7, 0.4)`) rather than drop shadows.
- **No harsh drop shadows** on standard elements. Hierarchy is conveyed through color contrast and spacing.

## Shapes

The shape language balances **architectural precision** with organic softness.

- **7px radius** — the default corner radius for cards, images, and containers. A deliberate middle ground between sharp and pill.
- **Full/9999px** — used exclusively for badge pills, CTA buttons, and the floating navbar.
- **32px / 2rem** — used for the outer shell of double-bezel (Doppelrand) cards.
- **No mixing** of sharp and rounded corners within the same component.

## Components

### Fluid Island Navbar
- Floating glass pill, `mt-6 mx-auto w-max rounded-full`
- `backdrop-blur-3xl bg-black/80` for full-screen menu overlay
- Hamburger morphs to X with rotating bars
- Staggered link reveal (translate-y → 0, opacity 0 → 1)

### Button-in-Button CTA
- Trailing arrow in its own circular wrapper, flush against button edge
- Dual SVG arrows with translate transforms on hover for directional reveal
- `rounded-full`, white icon circle on dark button

### Double-Bezel (Doppelrand) Cards
- Outer shell: `p-1.5 rounded-[2rem] border-white/10`
- Inner core: inset shadow, `rounded-[1.625rem]`
- Used for featured content cards and project showcases

### Section Badge
- `inline-flex h-10 rounded-full bg-surface-raised py-1 pl-2 pr-4`
- Icon wrapper: 28px circle with `bg-surface-overlay text-white`
- Label: SF Mono, 16px, regular weight

### Article Cards
- Full-height clickable card with background image
- Dark gradient overlay (`rgba(8,8,7,0.48)` → `rgba(8,8,7,0.4)`) on hover
- Bottom gradient fade for text readability
- Category pill: `rounded-full bg-[rgba(135,132,124,0.82)] backdrop-blur-[2px]`
- Hover: image scales 1.08×, title shifts right 3px

## Do's and Don'ts

- Do use New York serif for major editorial headings and SF Mono for all body text
- Don't use Inter, Roboto, Arial, Open Sans, or Helvetica fonts
- Do use the double-bezel (Doppelrand) card pattern for featured content
- Don't use generic 1px solid gray borders or harsh drop shadows
- Do use `cubic-bezier(0.32,0.72,0,1)` for custom transitions
- Don't use `linear` or `ease-in-out` transitions
- Do use `min-h-[100dvh]` not `h-screen` for full-height sections
- Don't animate `top`, `left`, `width`, or `height` — only `transform` and `opacity`
- Do use `IntersectionObserver` or Framer Motion's `whileInView` — never `window.addEventListener('scroll')`
- Do apply `will-change: transform` only on actively animating elements
