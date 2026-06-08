# Mirell Studio — Interior Design Website

This file is read by AI agents before editing. **It is authoritative.** Follow it.

## Project Identity

A high-end interior design studio site for **Mirell Studio**. Every line of code must feel like a $150k+ agency build — award-worthy craftsmanship, obsessive micro-interaction detail, cinematic spatial rhythm.

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
    SmoothScroll.tsx   — Lenis wrapper
    ScrollProgressBar.tsx  — scroll progress (Framer Motion)
    Navbar.tsx         — fixed header, scroll-aware show/hide
    HeroSection.tsx    — fullscreen hero, GSAP reveal, CTA
    AboutSection.tsx   — stats counters, company intro
    ProjectsSection.tsx  — project carousel (Stonehaven, Cedarwood, Aldine)
    ServicesSection.tsx  — 4 service cards, parallax image
    ArticlesSection.tsx  — blog cards with stagger animation
    FaqSection.tsx       — accordion (AnimatePresence)
    ProcessCtaSection.tsx — CTA with avatars & parallax
    Footer.tsx           — contact form, links, watermark
```

## Design Standards (Awwwards-Tier)

### Banned
- Inter, Roboto, Arial, Open Sans, Helvetica fonts
- Standard thick-stroked icons (Lucide, FontAwesome, Material)
- Generic 1px solid gray borders, harsh drop shadows
- Edge-to-edge sticky navbars, symmetrical 3-column grids
- `linear` or `ease-in-out` transitions, instant state changes

### Mandated
- **Typography:** Use Geist, Clash Display, Playfair Display (serif headings), Inter Display
- **Icons:** Ultra-light precise lines (Phosphor Light, Remix Line, custom SVG)
- **Double-Bezel (Doppelrand):** Nested card architecture — outer shell (`p-1.5`, `rounded-[2rem]`, `border-white/10`) + inner core with inset shadow
- **Button-in-Button CTAs:** Trailing arrow in its own circular wrapper, flush against button edge
- **Macro-Whitespace:** Section padding `py-24` to `py-40`
- **Eyebrow Tags:** Microscopic pill badges before H1/H2s (`rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em]`)
- **Motion:** Custom cubic-bezier (`cubic-bezier(0.32,0.72,0,1)`), spring physics with real mass/damping

### Navbar: Fluid Island
- Floating glass pill (`mt-6 mx-auto w-max rounded-full`)
- Hamburger morphs to X with rotating bars
- Full-screen glass overlay menu (`backdrop-blur-3xl bg-black/80`)
- Staggered link reveal (`translate-y-12 opacity-0` → `translate-y-0 opacity-100`)

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
- **Framer Motion**: Navbar scroll-awareness, article stagger, FAQ accordion, progress bar, spring configs
- **Lenis**: Smooth scroll wrapper on the root layout

Shared spring configs live in `app/lib/transitions.ts`. Extend that file — don't inline magic numbers.

## Available Skills (Agent-Mounted)

These skills are installed and must be invoked automatically when their conditions are met:
- `gsap-framer-scroll-animation` — any scroll animation, parallax, reveal, GSAP ScrollTrigger, Framer Motion scroll work
- `web-design-guidelines` — UI review, accessibility audit, best-practice compliance check
- `high-end-visual-design` — any visual design, layout, component, or motion work (the content above)
- `graphify` — knowledge graph at `graphify-out/graph.json` for project-wide understanding

## Knowledge Graph

`graphify-out/GRAPH_REPORT.md` contains a structured map of all project files, relationships, and communities. Read it before making cross-cutting changes to understand how components connect.

**Key graph findings:**
- 48 nodes, 38 edges, 16 communities
- God nodes: `Next.js` (6 edges), `Breezy` (4 edges), `Stonehaven Residence Interior Photography` (4 edges)
- Communities: App Pages & Navigation, Project Setup & Branding, Next.js Documentation, Projects Showcase, Hero Section, Layout & Metadata, Footer, PostCSS Config, Logos

## Auto-Update Knowledge Graph

After every prompt — whether you read files, edit files, or simply answer a question — run `graphify update` on the project root to keep the knowledge graph in sync:

```bash
graphify update .
```

This re-extracts only changed/new files (incremental), prunes deleted ones, reclusters, and regenerates `graph.html` + `GRAPH_REPORT.md`. It is fast (seconds when few files change) and ensures the graph always reflects the actual project state. **Do not skip this step.**

If the `graphify` CLI is unavailable, run the Python equivalent:
```bash
cd /path/to/project && python3 -m graphify --update .
```

## Commands

```bash
pnpm dev        # Next.js dev server (Turbopack)
pnpm build      # Production build
pnpm start      # Start production server
pnpm lint       # ESLint
```

## Design Direction (Read Before Every Edit)

This is **Mirell Studio** — an interior design brand. Every visual decision must whisper luxury, spatial awareness, and tactile warmth. The overall vibe is **Editorial Luxury**: warm creams, deep espresso tones, high-contrast serif/variable typography, film-grain texture overlay, floating glass components, and photographic storytelling. The hero image is the brand's anchor — treat it as hero art, not a generic background.

Before writing code, roll the variance engine: choose a vibe archetype (Ethereal Glass / Editorial Luxury / Soft Structuralism) and a layout archetype (Asymmetrical Bento / Z-Axis Cascade / Editorial Split) that fits the component's role in the narrative. Never generate the same layout twice.
