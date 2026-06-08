# Graph Report - breezy  (2026-06-08)

## Corpus Check
- 33 files · ~70,137 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 295 nodes · 282 edges · 31 communities (19 shown, 12 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.92)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_App Pages & Navigation|App Pages & Navigation]]
- [[_COMMUNITY_Project Setup & Branding|Project Setup & Branding]]
- [[_COMMUNITY_Next.js Documentation|Next.js Documentation]]
- [[_COMMUNITY_Projects Showcase|Projects Showcase]]
- [[_COMMUNITY_Hero Section|Hero Section]]
- [[_COMMUNITY_Layout & Metadata|Layout & Metadata]]
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

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `Framer Motion (Motion v12) — Full Reference` - 13 edges
3. `GSAP ScrollTrigger — Full Reference` - 13 edges
4. `Micro-Interaction System Implementation Plan` - 13 edges
5. `Recipes with Copilot Prompts` - 11 edges
6. `Mirell Studio — Interior Design Website` - 10 edges
7. `Interaction Matrix` - 10 edges
8. `GSAP & Framer Motion — Scroll Animations Skill` - 9 edges
9. `Recipes with Copilot Prompts` - 9 edges
10. `Micro-Interaction System — Mirell Studio` - 8 edges

## Surprising Connections (you probably didn't know these)
- `HeroSection()` --references--> `Hero Interior Living Space`  [EXTRACTED]
  app/components/HeroSection.tsx → public/hero-interior.png
- `Stonehaven Residence Project Entry` --references--> `Stonehaven Residence Interior Photography`  [EXTRACTED]
  app/components/ProjectsSection.tsx → public/project-stonehaven.png
- `Hero Interior Living Space` --conceptually_related_to--> `Stonehaven Residence Interior Photography`  [INFERRED]
  public/hero-interior.png → public/project-stonehaven.png
- `Next.js Logo` --conceptually_related_to--> `Vercel Logo`  [INFERRED]
  public/next.svg → public/vercel.svg

## Import Cycles
- None detected.

## Communities (31 total, 12 thin omitted)

### Community 0 - "App Pages & Navigation"
Cohesion: 0.08
Nodes (6): cardVariants, containerVariants, faqs, collaborators, projects, services

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

### Community 11 - "TypeScript Env Types"
Cohesion: 0.22
Nodes (9): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom (+1 more)

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
Cohesion: 0.11
Nodes (18): dependencies, ecc-universal, framer-motion, gsap, @gsap/react, lenis, locomotive-scroll, next (+10 more)

### Community 23 - "Community 23"
Cohesion: 0.08
Nodes (14): Home(), stats, articles, Footer(), footerLinks, pageLinks, HeroSection(), Navbar() (+6 more)

### Community 24 - "Community 24"
Cohesion: 0.40
Nodes (4): Guidelines Source, How It Works, Usage, Web Interface Guidelines

### Community 25 - "Community 25"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

## Knowledge Gaps
- **191 isolated node(s):** `$schema`, `plugin`, `@opencode-ai/plugin`, `containerVariants`, `cardVariants` (+186 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What connects `$schema`, `plugin`, `@opencode-ai/plugin` to the rest of the system?**
  _192 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App Pages & Navigation` be split into smaller, more focused modules?**
  _Cohesion score 0.0812807881773399 - nodes in this community are weakly interconnected._
- **Should `Next.js Documentation` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._
- **Should `Projects Showcase` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._
- **Should `Hero Section` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `Community 16` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._
- **Should `Community 17` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._