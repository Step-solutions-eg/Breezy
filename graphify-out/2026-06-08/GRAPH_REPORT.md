# Graph Report - breezy  (2026-06-08)

## Corpus Check
- 49 files · ~589,163 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 384 nodes · 370 edges · 42 communities (26 shown, 16 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.92)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ddfa9520`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_App Pages & Navigation|App Pages & Navigation]]
- [[_COMMUNITY_Project Setup & Branding|Project Setup & Branding]]
- [[_COMMUNITY_Next.js Documentation|Next.js Documentation]]
- [[_COMMUNITY_Projects Showcase|Projects Showcase]]
- [[_COMMUNITY_Hero Section|Hero Section]]
- [[_COMMUNITY_Layout & Metadata|Layout & Metadata]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_PostCSS Config|PostCSS Config]]
- [[_COMMUNITY_Dev Server|Dev Server]]
- [[_COMMUNITY_Logos|Logos]]
- [[_COMMUNITY_TypeScript Env Types|TypeScript Env Types]]
- [[_COMMUNITY_File Icon|File Icon]]
- [[_COMMUNITY_Globe Icon|Globe Icon]]
- [[_COMMUNITY_Window Icon|Window Icon]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `Framer Motion (Motion v12) — Full Reference` - 13 edges
3. `GSAP ScrollTrigger — Full Reference` - 13 edges
4. `Micro-Interaction System Implementation Plan` - 13 edges
5. `BreezyIsland — Storytelling Narrative Redesign` - 13 edges
6. `Recipes with Copilot Prompts` - 11 edges
7. `Mirell Studio — Interior Design Website` - 10 edges
8. `Interaction Matrix` - 10 edges
9. `GSAP & Framer Motion — Scroll Animations Skill` - 9 edges
10. `Recipes with Copilot Prompts` - 9 edges

## Surprising Connections (you probably didn't know these)
- `HeroSection()` --references--> `Hero Interior Living Space`  [EXTRACTED]
  app/components/HeroSection.tsx → public/hero-interior.png
- `Stonehaven Residence Project Entry` --references--> `Stonehaven Residence Interior Photography`  [EXTRACTED]
  app/components/ProjectsSection.tsx → public/project-stonehaven.jpeg
- `Hero Interior Living Space` --conceptually_related_to--> `Stonehaven Residence Interior Photography`  [INFERRED]
  public/hero-interior.png → public/project-stonehaven.jpeg
- `Next.js Logo` --conceptually_related_to--> `Vercel Logo`  [INFERRED]
  public/next.svg → public/vercel.svg

## Import Cycles
- None detected.

## Communities (42 total, 16 thin omitted)

### Community 1 - "Project Setup & Branding"
Cohesion: 0.17
Nodes (12): app/page.tsx, Breezy, create-next-app, Geist Font, Learn Next.js, next/font, Next.js, Next.js Deployment Documentation (+4 more)

### Community 2 - "Next.js Documentation"
Cohesion: 0.08
Nodes (23): 1. Scroll Progress Bar, 2. Reusable ScrollReveal Wrapper, 3. Parallax Layers, 4. Horizontal Scroll Section, 5. Image Reveal with clipPath, 6. Scroll-linked Navbar (Hide on Scroll Down), 7. Staggered Card Grid, 8. 3D Tilt on Scroll (+15 more)

### Community 3 - "Projects Showcase"
Cohesion: 0.08
Nodes (23): 10. Animated Number Counter, 1. Fade-in Batch Reveal, 2. Scrub Animation (scroll-linked), 3. Pinned Timeline, 4. Parallax Layers, 5. Horizontal Scroll Section, 6. Character Stagger Text Reveal, 7. Scroll Snap Sections (+15 more)

### Community 4 - "Hero Section"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 6 - "Community 6"
Cohesion: 0.05
Nodes (8): features, diningMoments, experiences, pageLinks, galleryItems, philosophyItems, practices, testimonials

### Community 11 - "TypeScript Env Types"
Cohesion: 0.06
Nodes (34): Architecture, BreezyIsland — Storytelling Narrative Redesign, Changes from current, Changes from current, Changes from current, Changes from current, Changes from current, Changes from current (+26 more)

### Community 16 - "Community 16"
Cohesion: 0.11
Nodes (17): About (`AboutSection.tsx`), Approach, Articles (`ArticlesSection.tsx`), FAQ (`FaqSection.tsx`), Footer (`Footer.tsx`), Goal, Hero (`HeroSection.tsx`), Interaction Matrix (+9 more)

### Community 17 - "Community 17"
Cohesion: 0.12
Nodes (16): Animation Libraries, Architecture, Auto-Update Knowledge Graph, Available Skills (Agent-Mounted), Banned, Commands, Design Direction (Read Before Every Edit), Design Standards (Awwwards-Tier) (+8 more)

### Community 18 - "Community 18"
Cohesion: 0.12
Nodes (16): 1. Fade-in on enter (GSAP), 2. Fade-in on enter (Framer Motion), 3. Scrub / scroll-linked (GSAP), 4. Scroll-linked (Framer Motion), 5. Pinned timeline (GSAP), Copilot Prompting Tips, Critical Rules (Apply Always), Framer Motion (Motion v12, 2025) (+8 more)

### Community 19 - "Community 19"
Cohesion: 0.15
Nodes (12): fadeIn, fadeUp, hoverLift, hoverLiftHeavy, hoverScale, hoverScaleGlow, hoverSlide, tapCompact (+4 more)

### Community 20 - "Community 20"
Cohesion: 0.14
Nodes (13): Micro-Interaction System Implementation Plan, Task 10: ProcessCtaSection micro-interactions, Task 11: Footer micro-interactions, Task 1: Add micro-spring configs to `transitions.ts`, Task 2: Create `app/lib/micro-variants.ts`, Task 3: Navbar micro-interactions, Task 4: HeroSection micro-interactions, Task 5: AboutSection micro-interactions (+5 more)

### Community 21 - "Community 21"
Cohesion: 0.15
Nodes (12): computedHash, skillPath, source, sourceType, skills, gsap-framer-scroll-animation, web-design-guidelines, version (+4 more)

### Community 22 - "Community 22"
Cohesion: 0.07
Nodes (27): dependencies, ecc-universal, framer-motion, gsap, @gsap/react, lenis, locomotive-scroll, next (+19 more)

### Community 23 - "Community 23"
Cohesion: 0.22
Nodes (3): Home(), stats, articles

### Community 24 - "Community 24"
Cohesion: 0.40
Nodes (4): Guidelines Source, How It Works, Usage, Web Interface Guidelines

### Community 25 - "Community 25"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 32 - "Community 32"
Cohesion: 0.20
Nodes (9): Storytelling Redesign Implementation Plan, Task 1: Hero — Chapter 1 (The Problem), Task 2: About — Chapter 2 (The Realization), Task 3: Approach (Services → Chapter 3 - The Process), Task 4: Projects — Chapter 4 (The Proof), Task 5: Articles — Chapter 5 (The Insights), Task 6: FAQ — Chapter 6 (The Doubts), Task 7: ProcessCta + Footer — Chapter 7 (The Invitation) (+1 more)

### Community 33 - "Community 33"
Cohesion: 0.29
Nodes (4): projects, Stonehaven Residence Project Entry, Stonehaven Residence Interior Photography, Stonehaven Residence

### Community 34 - "Community 34"
Cohesion: 0.29
Nodes (3): Footer(), footerLinks, pageLinks

### Community 35 - "Community 35"
Cohesion: 0.33
Nodes (6): Changes from current, Chapter 7 — The Invitation (Footer + ProcessCta), Footer:, Layout, Narrative Copy, ProcessCta section:

### Community 36 - "Community 36"
Cohesion: 0.40
Nodes (3): breezyLinks, defaultLinks, Navbar()

### Community 39 - "Community 39"
Cohesion: 0.50
Nodes (3): HeroSection(), Hero Interior Living Space, Mirell Studio Brand

## Knowledge Gaps
- **240 isolated node(s):** `$schema`, `plugin`, `@opencode-ai/plugin`, `containerVariants`, `cardVariants` (+235 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `BreezyIsland — Storytelling Narrative Redesign` connect `TypeScript Env Types` to `Community 35`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **Why does `Home()` connect `Community 23` to `Community 37`?**
  _High betweenness centrality (0.004) - this node is a cross-community bridge._
- **Why does `HeroSection()` connect `Community 39` to `Community 23`?**
  _High betweenness centrality (0.003) - this node is a cross-community bridge._
- **What connects `$schema`, `plugin`, `@opencode-ai/plugin` to the rest of the system?**
  _241 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Next.js Documentation` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._
- **Should `Projects Showcase` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._
- **Should `Hero Section` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._