# Micro-Interaction System — Mirell Studio

## Goal
Add polished, premium micro-interactions (Jakub Krehel style) to **every visible element** across all 11 components. Subtle spring physics, purposeful hover/tap/entrance states, magnetic button effects.

## Approach
**Hybrid Framer Motion + GSAP:**
- **Framer Motion** — all hover/tap/focus/entrance micro-interactions (declarative `whileHover`, `whileTap`, `whileInView`, `variants`)
- **GSAP** — existing scroll-triggered entrances and parallax left untouched

## New Files
- `app/lib/micro-variants.ts` — shared Framer Motion variant objects

## Modified Files
- `app/lib/transitions.ts` — add `microSpring`, `microTap`, `microMagnetic` configs
- All 11 components

## Interaction Matrix

### Navbar (`Navbar.tsx`)
- Logo → `hoverScale` 1.05, spring 400/26
- Nav links (×4) → underline `scaleX` animation, `hoverSlide` x:4
- "Contact Us" → `hoverSlide` x:4
- Hamburger bars → hover: individual bar slight y-shift + opacity
- Hamburger → full X morph + glass overlay + staggered links

### Hero (`HeroSection.tsx`)
- CTA → existing dual-SVG swap (keep), add `tapPress`
- Watermark → `hoverScale` 1.01 on words

### About (`AboutSection.tsx`)
- Badge arrow → `hoverSlide` diagonal + circle `hoverScale`
- Stat cards (×4) → `hoverLift` y:-4, bg shift `#f3f4f7→#e8eaf0`, value `hoverScale`
- Stat card borders → subtle shadow on hover

### Projects (`ProjectsSection.tsx`)
- Nav arrows → `hoverScale` 1.15 + path morph
- Thumbnail card → `hoverLift` + glass border glow
- All existing entrances kept

### Services (`ServicesSection.tsx`)
- Badge arrow → same as About badge
- Service cards (×4) → `hoverLift` y:-6, bg `#f3f4f7→#e8eaf0`, number circle `hoverScale`
- Description → subtle color shift on card hover

### Articles (`ArticlesSection.tsx`)
- Article cards → existing hover zoom kept, add card border highlight + date/title subtle lift
- Category badge → `hoverScale`
- Arrow → existing (keep)

### FAQ (`FaqSection.tsx`)
- Row hover → bg `rgba(0,0,0,0.05)→rgba(0,0,0,0.08)`
- Plus icon → existing rotate (keep) + `hoverScale`
- Answer → existing AnimatePresence (keep) + fadeUp

### Process CTA (`ProcessCtaSection.tsx`)
- Avatars (×5) → `hoverScale` 1.1 + stagger entrance
- "Partnering" text → `fadeUp` entrance

### Footer (`Footer.tsx`)
- Input → focus ring + border animation
- Submit → `hoverSlide` arrow + `tapPress`
- Links (×9) → `hoverSlide` x:4 + color
- Watermark → `hoverScale` 1.005

## Reduced Motion
All hover/tap interactions disable when `prefers-reduced-motion` is active via Framer Motion's `useReducedMotion()`.

## Spring Physics (in `transitions.ts`)
| Config | Stiffness | Damping | Mass | Use |
|--------|-----------|---------|------|-----|
| `microSpring` | 400 | 26 | 1 | hovers |
| `microTap` | 1000 | 10 | 0.5 | taps |
| `microMagnetic` | 150 | 12 | 1 | magnetic buttons |
