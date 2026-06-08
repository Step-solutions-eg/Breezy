# BreezyIsland — Storytelling Narrative Redesign

## Overview

Transform the existing BreezyIsland interior design website from a section-based portfolio into a cinematic 7-chapter storytelling experience. The emotional arc moves visitors through: Problem → Realization → Process → Proof → Insights → Doubts → Invitation.

## Architecture

- **Framework**: Next.js 16 (App Router), TypeScript strict
- **Animation**: GSAP ScrollTrigger + Framer Motion (existing hybrid setup)
- **Scroll**: Lenis (already integrated)
- **Styling**: Tailwind CSS v4 with existing theme tokens
- **Components**: All 7 sections live in `app/components/`, composed in `app/page.tsx`

---

## Chapter 1 — The Problem (Hero)

**File**: `HeroSection.tsx`

### Narrative Copy
```
Eyebrow: "Why Most Interiors Feel Incomplete"

Headline (revealed line by line):
"Most rooms are decorated.
Few are designed.

The difference between a room
you walk through and a space
you feel — is intent."

CTA: "Explore Our Philosophy"
```

### Motion
- Hero image: existing scale-on-load (1.3 → 1, power3.out, 1.2s)
- Text lines: GSAP timeline, each line fades in (`opacity: 0, y: 40` → `opacity: 1, y: 0`) with 2s delay between lines
- CTA button: appears 1s after last text line
- Watermark "BreezyIsland": unchanged
- Sticky hero + dark overlay gradients: unchanged

### Changes from current
- Replace existing body copy with 4-line manifesto
- Add `data-hero-line` attributes to each line for GSAP targeting
- Update eyebrow badge text
- Update CTA text
- Remove "Get In Touch" → "Explore Our Philosophy"

---

## Chapter 2 — The Realization (About)

**File**: `AboutSection.tsx`

### Narrative Copy
```
Eyebrow: "The Difference Between Décor & Design"

Manifesto (revealed line by line):
"Design is not how a room looks.
It is how a room feels.
How it moves.
How it breathes.
How it changes the people inside it.

Most interiors are assembled.
Ours are composed."

Sub-paragraph (single block):
"An interior that follows trends will fade before the paint dries. 
An interior shaped by intent — by how light moves through a room 
at 4pm, by how a hallway transitions into a living space, by how 
every surface invites touch — that interior endures. This is not 
decoration. It is design as a discipline."

Stats: Keep existing 4 stats, repositioned as "evidence"
```

### Motion
- Manifesto lines: GSAP timeline with ScrollTrigger, each line fades up (stagger: 0.3, y: 30, opacity: 0 → 1)
- Sub-paragraph: fades in after manifesto completes (delay: 0.5)
- Stats: count up animation (existing) triggers after text reveals
- Badge: slide in from left (existing)

### Changes from current
- Replace heading with 6-line manifesto
- Add new sub-paragraph
- Keep stats with same counter animation
- Update eyebrow badge text
- Stats change: "Years of experience delivering thoughtful..." → keep as-is (already evidence-oriented)

---

## Chapter 3 — The Approach (Services → Process)

**File**: `ServicesSection.tsx` → rename component concept to process/approach

### Narrative Copy
```
Eyebrow: "Our Process"

Heading:
"Every great space follows a journey.
Not a checklist.
A conversation between vision and craft."

5-Step Process:
Step 01 | Discovery
"We listen before we draw."
Understanding how you live, move, and inhabit your space.

Step 02 | Strategy
"Every decision has a reason."
Defining the intent behind every square foot.

Step 03 | Concept
"The first sketch tells the story."
Translating strategy into spatial narratives and material palettes.

Step 04 | Execution
"Precision is invisible. Its absence is not."
Coordinating every detail from foundation to finish.

Step 05 | Layering
"The difference between a house and a home."
The final touches that make a space feel lived-in, not just photographed.

CTA: "Begin Your Journey"
```

### Layout
- Remove existing 4 service cards grid
- 5 process steps flow vertically with a connecting progress line that animates on scroll
- Each step: number circle + title + short poetic line + description
- Right side: existing parallax image stays

### Motion
- Connecting line: GSAP `scaleY` from 0 to full height as you scroll through steps
- Steps: staggered reveal (y: 40, opacity: 0) as each enters viewport
- Image parallax: unchanged

### Changes from current
- Replace 4 service cards with 5-step process flow
- Add visual connecting line between steps
- Update badge, heading, CTA text
- Remove service card hover effects and number circles

---

## Chapter 4 — The Proof (Projects)

**File**: `ProjectsSection.tsx`

### Narrative Copy
```
Eyebrow: "Evidence"

Heading:
"Not projects. Transformations."

Before/After narrative per project:
Stonehaven Residence:
Before: "Dark, compartmentalized, disconnected from its surroundings."
After: "Light, open, every room connected to the landscape."
Result: "A 1900s row home reimagined for modern family life."

Cedarwood Penthouse:
Before: "Sparse, cold, felt more like a showroom than a home."
After: "Warm, layered, every surface inviting touch."
Result: "A penthouse transformed into a gathering space."

The Aldine Apartment:
Before: "Cramped, poorly lit, no sense of arrival."
After: "Airy, intentional, a sense of calm from the moment you enter."
Result: "A compact urban apartment that lives like a house."
```

### Layout
- Same fullscreen carousel structure
- Add before/after text above or beside the title
- Keep stats (bedrooms, bathrooms, size)
- Add "Result" line as new data point

### Motion
- Project name: typewriter effect (GSAP) — existing reveal but with character-by-character feel
- Before/After: crossfade on slide change
- Stats: counter animation (existing)
- Result line: fades in last after stats finish
- Navigation arrows: unchanged

### Changes from current
- Add `data-project-before`, `data-project-after`, `data-project-result` to project data
- Update badge and heading text
- Add before/after/result render in the UI
- Add typewriter-style animation for project name

---

## Chapter 5 — The Insights (Articles)

**File**: `ArticlesSection.tsx`

### Narrative Copy
```
Eyebrow: "From The Studio"

Heading:
"What We've Learned Building Interiors"

Sub:
"Lessons from the field. Not blog posts. Real experience."

Article cards:
1. "Why Open Plan Doesn't Always Mean Connected"
2. "The One Material That Changes Every Room"
3. "What We Learned From 120+ Interior Projects"

CTA: "Read The Journal"
```

### Layout
- Same 3-column card grid
- Updated titles only (images stay)
- Updated CTA text and destination href

### Motion
- Same stagger reveal + parallax on card images (existing)
- No structural changes

### Changes from current
- Replace article titles
- Update badge, heading, sub text
- Update CTA text

---

## Chapter 6 — The Doubts (FAQ)

**File**: `FaqSection.tsx`

### Narrative Copy
```
Eyewbrow: "Still Thinking?"

Heading:
"The Questions That Matter Most"

Sub:
"Concerns we hear before every project — and what the answer actually is."

Q&A pairs (reimagined as doubt → resolution):
1. Q: "I'm not sure if we need full design support"
   A: "Most people don't. A single room consultation, a material palette review, or a full renovation — we tailor the scope to what you actually need. No package. No pressure."

2. Q: "I don't know where to begin"
   A: "A 30-minute conversation is all it takes. We walk through your space together, understand what's working and what isn't, and by the end you'll have clarity on exactly what the next step looks like."

3. Q: "Can this work if I'm not local?"
   A: "Most of our clients start with a single call. We work remotely through structured presentations, digital approvals, and coordinated guidance. Distance doesn't diminish detail."

4. Q: "I'm worried about timelines"
   A: "Every timeline begins with understanding what 'done' means to you. Some projects move in weeks. Others unfold over months. We design the pace around your life, not ours."

5. Q: "Is my project the right fit?"
   A: "If you care about how a space feels — how light behaves in it, how materials age in it, how people move through it — you're already our client. The rest is just process."

6. Q: "Will this add value to my property?"
   A: "Good design doesn't cost — it compounds. A well-considered interior increases not just resale value but daily quality of life. That's the return that matters."

CTA: "Still Have Doubts? Let's Talk"
```

### Layout
- Same accordion layout (existing)
- Updated question/answer content only
- Update badge, heading, sub, CTA

### Motion
- Same stagger reveal + AnimatePresence accordion (existing)

### Changes from current
- Replace all Q&A pairs with doubt→resolution format
- Update badge, heading, sub text
- Update CTA text

---

## Chapter 7 — The Invitation (Footer + ProcessCta)

**Files**: `Footer.tsx`, `ProcessCtaSection.tsx`

### Narrative Copy

#### ProcessCta section:
```
Eyebrow: "Ready?"

Heading:
"Some Spaces Are Seen.
Yours Will Be Remembered."

Sub:
"You've read the philosophy. You've seen the evidence. The next step is a conversation."

CTA: "Start The Conversation"
```

#### Footer:
```
Heading:
"Begin Your Design Journey"

Sub:
"Every great space starts with a single decision."

Email placeholder: "Tell us about your space"
Submit button: "Start The Conversation"

Column headers:
"Pages" → "Navigate"
"Legals" → "Foundation"
"Social" → "Connect"

Closing: "Every great space starts with a single decision." (added below watermark)
```

### Layout
- ProcessCta: keep existing 2-column layout, update text
- Footer: keep existing layout, update text

### Changes from current
- Update ProcessCta badge, heading, sub, CTA
- Update Footer heading, sub, form placeholder, button, column headers
- Add closing quote line to Footer

---

## Implementation Files Summary

| File | Changes |
|------|---------|
| `app/components/HeroSection.tsx` | New copy, line-by-line GSAP reveal |
| `app/components/AboutSection.tsx` | New manifesto copy, sub-paragraph, reveal timeline |
| `app/components/ServicesSection.tsx` | Rewrite as Approach/Process, 5 steps, connecting line |
| `app/components/ProjectsSection.tsx` | Add before/after/result, typewriter effect |
| `app/components/ArticlesSection.tsx` | New titles, badge, heading, sub, CTA |
| `app/components/FaqSection.tsx` | New Q&A pairs (doubt→resolution format) |
| `app/components/ProcessCtaSection.tsx` | New copy, CTA text |
| `app/components/Footer.tsx` | New copy, form labels, column headers, closing line |
| `app/components/Navbar.tsx` | No changes (brand name stays) |

## Design Principles Applied

- **Vibe Archetype**: Editorial Luxury (warm creams, deep espresso, high-contrast typography)
- **Layout Archetype**: Editorial Split / Z-Axis Cascade (varies by section)
- **Motion**: Custom cubic-bezier `(0.32, 0.72, 0, 1)` — no ease-in-out
- **GPU-safe**: Only `transform` + `opacity` — no `top`, `left`, `width`, `height`
- **Reduced motion**: All GSAP animations wrapped in `matchMedia("(prefers-reduced-motion: no-preference)")`
- **Whitespace**: Section padding `py-24` to `py-36`
- **CTA buttons**: Button-in-button pattern with MagneticWrapper

## Success Criteria

- [ ] Each section reads as a distinct chapter in a story
- [ ] Copy is cohesive (interior design voice throughout)
- [ ] Scroll reveals build narrative tension progressively
- [ ] Hero stops scrolling with first 2 seconds
- [ ] FAQ builds confidence by addressing real objections
- [ ] Footer feels like an invitation, not a form
- [ ] All animations respect prefers-reduced-motion
- [ ] Build compiles with zero errors
