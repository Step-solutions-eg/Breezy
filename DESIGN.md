---
version: alpha
name: Breezy Island
description: Editorial Luxury desert retreat — warm creams, deep espresso tones, sage green accents, serif/monospace typography, glass morphism, and photographic storytelling.
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
  logo:
    fontFamily: "New York"
    fontSize: "clamp(18px, 1.5vw, 20px) / clamp(40px, 12vw, 420px) / clamp(48px, 16vw, 580px)"
    fontWeight: 400
    lineHeight: 0.7
---
# Breezy Island Design System

## Overview

**Editorial Luxury** — Breezy Island is a luxury desert retreat in Siwa Oasis, Egypt. The design whispers warmth, escape, and natural luxury through warm creams, deep espresso tones, sage green accents, high-contrast serif/monospace typography, and photographic storytelling.

## Brand Voice
- Warm, inviting, and exclusive
- Editorial and sophisticated
- Desert-inspired natural luxury
- Not generic beach resort — Siwa Oasis is ancient, mystical, remote

## Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `surface-base` | `#F2F1EF` | Page backgrounds, warm cream |
| `surface-raised` | `#F3EEE7` | Cards, badges, raised elements |
| `surface-overlay` | `#503A26` | Navbars, button fills, dark elements |
| `text-primary` | `#503A26` | Body text, headings |
| `text-secondary` | `#5E6B57` | Secondary text, nav links, sage green |
| `text-tertiary` | `#C8A17E` | Accent text, decorative |
| `border-default` | `#7D9C9A` | Borders, dividers, teal-gray |
| `accent` | `#C8A17E` | Interactive highlights, warm gold |
| `accent-secondary` | `#7D9C9A` | Secondary accent, teal-gray |

## Typography

### Font Pairing
- **New York (serif):** Editorial headings, logo mark, display text
- **SF Mono (monospace):** Body text, labels, navigation

### Logo Mark
- `Breezy` + `Island` (no space) — both in New York serif
- `Island` is italic (`font-normal italic`)
- Three sizes depending on placement:
  - Navbar: `clamp(18px, 1.5vw, 20px)`
  - Hero watermark: `clamp(40px, 12vw, 420px)` with `font-black`
  - Footer watermark: `clamp(48px, 16vw, 580px)` with `font-black`
- All use `leading-[0.7]`

### Fluid Type Scale
| Token | Size | Usage |
|-------|------|-------|
| heading-display | `clamp(48px, 4.3vw, 86px)` | Section titles |
| body-lg | `clamp(18px, 2.2vw, 26px)` | Feature descriptions |
| navbar-links | `16px` | Desktop nav links, SF Mono |
| label-caps | `10px, 0.2em tracking` | Eyebrow badges |

## Layout

### Section Spacing
- `py-24` to `py-40` vertical padding
- Content max-width varies by section (no universal container)
- Asymmetric grids preferred over symmetrical layouts

### Hero Section
- Full-screen (`h-dvh` / `h-screen`)
- Background image with multiple dark overlay layers (rgba(12,10,8, opacity))
- Solid overlay: 0.55 opacity
- Horizontal gradient: 0.50/0.20/0.35
- Bottom gradient: 0.55/0.20
- CTA: white button-in-button with dual SVG arrow animation
- Watermark at bottom: "Breezy Island" in New York serif

### Navbar
- Fixed header, scroll-aware show/hide
- Desktop: centered links + Book Now link
- Mobile: hamburger morphs to X (500ms, custom cubic-bezier)
- Mobile menu overlay:
  - Background: `bg-surface-base/95 backdrop-blur-3xl` (cream)
  - Links: New York serif, espresso/caption color `#5E6B57`
  - Staggered blur-in: `opacity: 0; y: 56; filter: blur(8px)` → reveal
  - Book Now matches other link styles
  - Lenis stop/start on open/close

## Components

### Button-in-Button CTA
- Trailing arrow in circular wrapper, flush against edge
- Dual SVG arrows with translate transforms on hover
- `rounded-full`, white icon circle, dark text

### Mobile Menu
- Full-screen cream overlay
- Links in New York serif at `text-5xl/sm:text-7xl`
- Staggered blur reveal (0.065s per item, 0.08s initial delay)
- Hamburger SVG: 24x24 viewBox, `#5E6B57` fill, white only on hero
- Decorative top rule (`h-px bg-[#503A26]/10`)

### Watermark Text
- Absolute positioned at bottom of section
- Flex layout with `justify-center`
- Hero: `bottom-6`
- Footer: `bottom-[6%]`, `overflow-hidden` on parent
- Both: `pointer-events-none select-none leading-none`

## Elevation & Depth
- Dark overlays over hero image using rgba values
- Glass morphism via `backdrop-blur` on fixed elements only
- No harsh drop shadows—hierarchy through color and spacing
- Tonal layering for depth

## Motion
- Custom cubic-bezier: `cubic-bezier(0.32,0.72,0,1)` for all custom transitions
- Spring physics with real mass/damping for interactive elements
- Section entry: 800ms+, translate-y + blur + opacity
- GPU-safe: transform and opacity only
- No `linear` or `ease-in-out` transitions

## Do's and Don'ts
- Do use New York serif for editorial headings, SF Mono for body
- Don't use Inter, Roboto, Arial, Open Sans, Helvetica
- Do use the button-in-button pattern for CTAs
- Don't use generic 1px solid gray borders or harsh shadows
- Do use `cubic-bezier(0.32,0.72,0,1)` for transitions
- Don't use `linear` or `ease-in-out`
- Do use `min-h-[100dvh]` over `h-screen`
- Don't animate `top`, `left`, `width`, `height`
- Do stop Lenis when opening modals/menus
- Do read DESIGN.md before every edit
