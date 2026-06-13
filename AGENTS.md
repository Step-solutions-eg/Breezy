# Breezy Island — Siwa Oasis Retreat

This file is read by AI agents before editing. **It is authoritative.** Follow it.

**IMPORTANT: Always read `DESIGN.md` at the start of every prompt before making any changes.** It is the canonical design reference and takes precedence over general patterns.

## Project Identity

A luxury desert retreat website for **Breezy Island** in Siwa Oasis, Egypt. Every line of code must feel like a $150k+ agency build — award-worthy craftsmanship, obsessive micro-interaction detail, cinematic spatial rhythm.

## Architecture

- **Framework:** Next.js 16 (App Router) — Turbopack dev
- **Language:** TypeScript 5 — strict mode
- **Styling:** Tailwind CSS v4 with `@theme inline` custom tokens
- **Animation:** GSAP 3.15 (`@gsap/react`) + Framer Motion 12.40
- **Smooth Scroll:** Lenis 1.3.23
- **Package Manager:** pnpm

### Source Structure

```
app/
  globals.css          — Tailwind v4 theme tokens, fonts, base styles
  layout.tsx           — metadata, font preconnects
  page.tsx             — section composition, "use client"
  lib/transitions.ts   — shared spring/tween configs & variants
  components/
    SmoothScroll.tsx   — Lenis wrapper (exposes window.__lenis)
    ScrollProgressBar.tsx  — scroll progress (Framer Motion)
    Navbar.tsx         — fixed header, scroll-aware show/hide, mobile menu overlay
    HeroSection.tsx    — fullscreen hero, GSAP reveal, CTA, watermark
    AboutSection.tsx   — stats counters, company intro
    ProjectsSection.tsx  — retreat carousel
    ServicesSection.tsx  — service cards, parallax image
    ArticlesSection.tsx  — rooms showcase with modal
    FaqSection.tsx       — accordion (AnimatePresence)
    ProcessCtaSection.tsx — CTA with avatars & parallax
    Footer.tsx           — contact form, links, watermark
```

## Design Standards

### Banned
- Inter, Roboto, Arial, Open Sans, Helvetica fonts
- Standard thick-stroked icons (Lucide, FontAwesome, Material)
- Generic 1px solid gray borders, harsh drop shadows
- Edge-to-edge sticky navbars, symmetrical 3-column grids
- `linear` or `ease-in-out` transitions, instant state changes

### Mandated
- **Typography:** New York (serif) for headings, SF Mono (monospace) for body text
- **Icons:** Ultra-light precise lines (custom SVG)
- **Button-in-Button CTAs:** Trailing arrow in its own circular wrapper, flush against button edge
- **Macro-Whitespace:** Section padding `py-24` to `py-40`
- **Motion:** Custom cubic-bezier (`cubic-bezier(0.32,0.72,0,1)`), spring physics with real mass/damping
- **Logo:** `Breezy<span class="font-heading font-normal italic">Island</span>` — no space, Island in New York serif italic

### Navbar
- Desktop: centered links + Book Now link, scroll-aware show/hide and color transitions
- Mobile: hamburger morphs to X (rotating bars, `cubic-bezier(0.32,0.72,0,1)` duration 500ms)
- Mobile menu overlay: cream background (`bg-surface-base/95 backdrop-blur-3xl`), links in espresso/caption color (`#5E6B57`), Book Now as text link matching other links
- Staggered blur-in animation (`translate-y-56 blur-[8px] opacity-0` → `translate-y-0 blur-0 opacity-100`), 0.065s stagger, 0.08s initial delay
- Logo: two color states — white on hero, `#5E6B57` when scrolled. `Breezy` in New York, `Island` in New York italic

### Watermark Text (Hero & Footer)
- `Breezy<span className="font-heading font-normal italic">Island</span>`
- Hero: `clamp(40px,12vw,420px)`, hero `font-black` + `font-normal italic`
- Footer: `clamp(48px,16vw,580px)`, `font-black` + `font-normal italic`
- Both use `leading-[0.7]`, positioned absolute at bottom
- Footer uses `overflow-hidden` to clip oversized text

### Scroll & Entry
- **Lenis** for smooth scroll (already integrated)
- All section entries: `translate-y-16 blur-md opacity-0` → `translate-y-0 blur-0 opacity-100` (800ms+)
- GPU-safe: animate only `transform` and `opacity` — never `top`, `left`, `width`, `height`
- `backdrop-blur` only on fixed/sticky elements, never scrolling content
- Use `min-h-[100dvh]` not `h-screen` for full-height sections

### Performance
- `will-change: transform` only on actively animating elements
- No continuous `window.addEventListener('scroll')` — use `IntersectionObserver` or Framer Motion's `whileInView`
- Grain/noise overlays as fixed `pointer-events-none` pseudo-elements only
- z-index reserved for systemic layers only

## Animation Libraries

- **GSAP** (`@gsap/react`): Hero reveals, scroll-triggered timelines, counters, project carousel
- **Framer Motion**: Navbar scroll-awareness, article stagger, FAQ accordion, progress bar, spring configs, mobile menu, modal animations
- **Lenis**: Smooth scroll wrapper on the root layout

## Lenis Integration

Lenis is exposed globally via `window.__lenis` in `SmoothScroll.tsx`. When opening modals or the mobile menu, always call `window.__lenis.stop()` and `window.__lenis.start()` on close to prevent scroll leaking.

## Available Skills

These skills are installed and must be invoked automatically when their conditions are met:
- `gsap-framer-scroll-animation` — any scroll animation, parallax, reveal, GSAP ScrollTrigger, Framer Motion scroll work
- `web-design-guidelines` — UI review, accessibility audit, best-practice compliance check
- `high-end-visual-design` — any visual design, layout, component, or motion work (the content above)
- `graphify` — knowledge graph at `graphify-out/graph.json` for project-wide understanding

## Commands

```bash
pnpm dev        # Next.js dev server (Turbopack)
pnpm build      # Production build
pnpm start      # Start production server
pnpm lint       # ESLint
```

## Design Direction

This is **Breezy Island** — a luxury desert retreat in Siwa Oasis. Every visual decision must whisper warmth, escape, and natural luxury. The overall vibe is **Editorial Luxury**: warm creams, deep espresso tones, sage green accents, high-contrast serif/monospace typography, and photographic storytelling. The hero image is the brand's anchor — treat it as hero art, not a generic background.

Before writing code, roll the variance engine: choose a vibe archetype (Ethereal Glass / Editorial Luxury / Soft Structuralism) and a layout archetype (Asymmetrical Bento / Z-Axis Cascade / Editorial Split) that fits the component's role in the narrative. Never generate the same layout twice.
