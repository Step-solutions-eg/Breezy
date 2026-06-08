# Storytelling Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform BreezyIsland website from a portfolio into a 7-chapter cinematic storytelling experience

**Architecture:** Rewrite copy and animations in 7 existing components. No new files. Each section gets new narrative copy, GSAP reveal animation refinements, and updated CTAs. Approach (Services) section gets a new process-step layout with a connecting scroll line.

**Tech Stack:** Next.js 16, TypeScript, GSAP ScrollTrigger, Framer Motion, Tailwind CSS v4, Lenis

---

### Task 1: Hero — Chapter 1 (The Problem)

**Files:**

- Modify: `app/components/HeroSection.tsx`

- [ ] **Step 1: Replace copy and add line-by-line data attributes**

Replace the existing hero body copy with the 4-line manifesto. Add `data-hero-line` attributes for GSAP targeting.

Edit `HeroSection.tsx`:

```
"Most rooms are decorated.
Few are designed.

The difference between a room
you walk through and a space
you feel — is intent."
```

Update the paragraph element:

```tsx
<p
  style={{
    fontFamily: '"SF Mono", monospace',
    fontSize: "26px",
    fontWeight: 400,
    letterSpacing: "-0.02em",
    lineHeight: "1.2em",
  }}
>
  <span data-hero-line className="block">
    Most rooms are decorated.
  </span>
  <span data-hero-line className="block">
    Few are designed.
  </span>
  <span data-hero-line className="block">
    &nbsp;
  </span>
  <span data-hero-line className="block">
    The difference between a room
  </span>
  <span data-hero-line className="block">
    you walk through and a space
  </span>
  <span data-hero-line className="block">
    you feel — is intent.
  </span>
</p>
```

- [ ] **Step 2: Update badge text**

Change `className="mb-12 inline-flex...` badge text from "About Us" to "Why Most Interiors Feel Incomplete".

Replace the badge span content inside the `pointer-events-auto` div. Add a new badge above the text:

```tsx
<div className="mb-6 inline-flex h-7 w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 backdrop-blur-sm">
  <span className="text-[10px] uppercase tracking-[0.2em] text-white/80">
    Why Most Interiors Feel Incomplete
  </span>
</div>
```

- [ ] **Step 3: Update CTA text**

Change "Get In Touch" to "Explore Our Philosophy":

```tsx
<span className="whitespace-nowrap text-base font-medium leading-none">
  Explore Our Philosophy
</span>
```

- [ ] **Step 4: Add GSAP line-by-line reveal**

In the existing `useGSAP` block, after the background scale animation, add a line-by-line reveal timeline:

```tsx
const heroLines = gsap.utils.toArray<HTMLElement>("[data-hero-line]");
const tl = gsap.timeline({ delay: 0.8 });
heroLines.forEach((line, i) => {
  tl.from(
    line,
    {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out",
    },
    i > 0 ? "+=0.15" : "+=0",
  );
});
```

Add `data-hero-line` scope to sectionRef.

- [ ] **Step 5: Verify build**

```bash
pnpm build
```

---

### Task 2: About — Chapter 2 (The Realization)

**Files:**

- Modify: `app/components/AboutSection.tsx`

- [ ] **Step 1: Replace badge text**

Change badge text from "About Us" to "The Difference Between Décor & Design".

- [ ] **Step 2: Replace heading with manifesto lines**

Replace the existing h2 heading with 6 manifesto lines wrapped in individual `data-about-line` spans:

```tsx
<h2
  className="max-w-[650px] text-[clamp(48px,3.35vw,64px)] font-medium uppercase leading-[0.985] tracking-normal"
  style={{ fontFamily: '"SF Mono", monospace' }}
>
  <span data-about-line className="block">
    Design is not how a room looks.
  </span>
  <span data-about-line className="block">
    It is how a room feels.
  </span>
  <span data-about-line className="block">
    How it moves.
  </span>
  <span data-about-line className="block">
    How it breathes.
  </span>
  <span data-about-line className="block">
    How it changes the people inside it.
  </span>
</h2>
```

- [ ] **Step 3: Add sub-paragraph after heading**

Add after the heading div:

```tsx
<p
  data-about-sub
  className="max-w-[850px] pt-8 text-[clamp(27px,1.62vw,32px)] font-normal leading-[1.22] tracking-normal"
>
  An interior that follows trends will fade before the paint dries. An interior
  shaped by intent — by how light moves through a room at 4pm, by how a hallway
  transitions into a living space, by how every surface invites touch — that
  interior endures. This is not decoration. It is design as a discipline.
</p>
```

- [ ] **Step 4: Add reveal timeline for manifesto lines**

In `useGSAP`, after the badge animation:

```tsx
const aboutLines = gsap.utils.toArray<HTMLElement>("[data-about-line]");
const aboutTl = gsap.timeline({
  scrollTrigger: {
    trigger: "[data-about-line]",
    start: "top 80%",
    toggleActions: "play none none none",
  },
});
aboutLines.forEach((line, i) => {
  aboutTl.from(
    line,
    {
      opacity: 0,
      y: 30,
      duration: 0.7,
      ease: "power3.out",
    },
    i > 0 ? "+=0.12" : "+=0",
  );
});

gsap.from("[data-about-sub]", {
  opacity: 0,
  y: 30,
  duration: 0.8,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "[data-about-sub]",
    start: "top 85%",
    toggleActions: "play none none none",
  },
});
```

- [ ] **Step 5: Update stat grid positioning**

The stat grid `className` already has `mt-[122px]`. No structural changes needed.

- [ ] **Step 6: Verify build**

```bash
pnpm build
```

---

### Task 3: Approach (Services → Chapter 3 - The Process)

**Files:**

- Modify: `app/components/ServicesSection.tsx`

- [ ] **Step 1: Replace service data with 5-step process**

Replace the `services` array with process steps:

```tsx
const processSteps = [
  {
    number: "01",
    title: "Discovery",
    tagline: "We listen before we draw.",
    description:
      "Understanding how you live, move, and inhabit your space — before a single line is sketched.",
  },
  {
    number: "02",
    title: "Strategy",
    tagline: "Every decision has a reason.",
    description:
      "Defining the intent behind every square foot. Light, flow, material — each choice has a purpose.",
  },
  {
    number: "03",
    title: "Concept",
    tagline: "The first sketch tells the story.",
    description:
      "Translating strategy into spatial narratives, material palettes, and the feeling a space should evoke.",
  },
  {
    number: "04",
    title: "Execution",
    tagline: "Precision is invisible. Its absence is not.",
    description:
      "Coordinating every detail from foundation to finish with clarity and care.",
  },
  {
    number: "05",
    title: "Layering",
    tagline: "The difference between a house and a home.",
    description:
      "The final touches that make a space feel lived-in, warm, and complete — not just photographed.",
  },
];
```

- [ ] **Step 2: Add process step data attributes**

Each step renders:

```tsx
<div data-process-step className="flex gap-5">
  <div className="flex flex-col items-center">
    <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-surface-overlay text-white text-lg font-medium leading-none">
      {step.number}
    </div>
    <div
      data-process-line
      className="mt-2 w-px flex-1 bg-accent-secondary/20"
    />
  </div>
  <div className="pb-10">
    <h3 className="text-[22px] font-normal leading-[1.05] tracking-normal">
      {step.title}
    </h3>
    <p className="mt-1 text-[18px] font-normal leading-[1.22] text-text-secondary italic">
      {step.tagline}
    </p>
    <p className="mt-3 max-w-[380px] text-[16px] font-normal leading-[1.4] text-text-secondary">
      {step.description}
    </p>
  </div>
</div>
```

- [ ] **Step 3: Replace the service cards grid with process flow**

Replace the `serviceGridRef` div contents. Remove the old cards. Add the process steps with a connecting line:

```tsx
<div ref={processRef} className="mt-20 flex flex-col">
  <div
    data-process-line-full
    className="absolute left-6 top-0 h-0 w-px bg-accent-secondary/40"
  />
  {processSteps.map((step, i) => (
    <div data-process-step key={step.number} className="relative flex gap-5">
      <div className="flex flex-col items-center">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-surface-overlay text-white text-lg font-medium">
          {step.number}
        </div>
        {i < processSteps.length - 1 && (
          <div
            data-process-connector
            className="mt-2 w-px flex-1 bg-accent-secondary/20"
          />
        )}
      </div>
      <div className="pb-14">
        <h3 className="text-[22px] font-normal leading-[1.05] tracking-normal">
          {step.title}
        </h3>
        <p className="mt-1 text-[18px] font-normal leading-[1.22] text-text-secondary italic">
          {step.tagline}
        </p>
        <p className="mt-3 max-w-[380px] text-[16px] font-normal leading-[1.4] text-text-secondary">
          {step.description}
        </p>
      </div>
    </div>
  ))}
</div>
```

- [ ] **Step 4: Add GSAP connecting line animation**

In `useGSAP`, after existing animations:

```tsx
gsap.to("[data-process-line-full]", {
  height: "100%",
  duration: 1.5,
  ease: "none",
  scrollTrigger: {
    trigger: "[data-process-line-full]",
    start: "top 85%",
    end: "bottom 60%",
    scrub: true,
  },
});

gsap.from("[data-process-step]", {
  opacity: 0,
  x: -20,
  stagger: 0.2,
  duration: 0.8,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "[data-process-step]",
    start: "top 85%",
    toggleActions: "play none none none",
  },
});
```

- [ ] **Step 5: Update badge, heading, CTA**

- Badge: "Our Services" → "Our Process"
- Heading: "Design Services For Refined Interior Spaces" → "Every great space follows a journey. Not a checklist. A conversation between vision and craft."
- CTA: "More About Us" → "Begin Your Journey"

- [ ] **Step 6: Verify build**

```bash
pnpm build
```

---

### Task 4: Projects — Chapter 4 (The Proof)

**Files:**

- Modify: `app/components/ProjectsSection.tsx`

- [ ] **Step 1: Update project data with before/after/result**

```tsx
const projects = [
  {
    id: "01",
    name: "Stonehaven Residence",
    category: "Private Residential Interior",
    before: "Dark, compartmentalized, disconnected from its surroundings.",
    after: "Light, open, every room connected to the landscape.",
    result: "A 1900s row home reimagined for modern family life.",
    bedrooms: 3,
    bathrooms: 3,
    size: "2,450",
    image: "/images/project-stonehaven.jpeg",
    thumbnail: "/images/project-stonehaven.jpeg",
  },
  {
    id: "02",
    name: "Cedarwood Penthouse",
    category: "Penthouse Interior",
    before: "Sparse, cold, felt more like a showroom than a home.",
    after: "Warm, layered, every surface inviting touch.",
    result: "A penthouse transformed into a gathering space.",
    bedrooms: 4,
    bathrooms: 4,
    size: "3,800",
    image: "/images/project-stonehaven.jpeg",
    thumbnail: "/images/project-stonehaven.jpeg",
  },
  {
    id: "03",
    name: "The Aldine Apartment",
    category: "Urban Residential",
    before: "Cramped, poorly lit, no sense of arrival.",
    after: "Airy, intentional, a sense of calm from the moment you enter.",
    result: "A compact urban apartment that lives like a house.",
    bedrooms: 2,
    bathrooms: 2,
    size: "1,650",
    image: "/images/project-stonehaven.jpeg",
    thumbnail: "/images/project-stonehaven.jpeg",
  },
];
```

- [ ] **Step 2: Add before/after/result to the UI**

Below the project title, add:

```tsx
<p data-project-before className="text-base text-white/60 line-through mb-2">
  Before: {project.before}
</p>
<p data-project-after className="text-base text-white/90 mb-2">
  After: {project.after}
</p>
```

After the stats, add:

```tsx
<p data-project-result className="text-lg font-medium text-white/80 mt-6">
  {project.result}
</p>
```

- [ ] **Step 3: Add typewriter effect for project name**

In `useGSAP`, after existing animations:

```tsx
// Typewriter effect for project name
gsap.from("[data-project-title]", {
  duration: 0.8,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "[data-project-title]",
    start: "top 80%",
    toggleActions: "play none none none",
  },
  onStart: function () {
    const el = document.querySelector("[data-project-title]");
    if (!el) return;
    const text = el.textContent || "";
    el.textContent = "";
    let chars = text.split("");
    el.textContent = "";
    let current = "";
    chars.forEach((char, i) => {
      gsap.delayedCall(i * 0.03, () => {
        current += char;
        el!.textContent = current;
      });
    });
  },
});
```

- [ ] **Step 4: Add reveal for before/after/result**

```tsx
gsap.from("[data-project-before]", {
  opacity: 0,
  y: 10,
  duration: 0.5,
  delay: 0.8,
  ease: "power2.out",
  scrollTrigger: {
    trigger: "[data-project-before]",
    start: "top 80%",
    toggleActions: "play none none none",
  },
});

gsap.from("[data-project-after]", {
  opacity: 0,
  y: 10,
  duration: 0.5,
  delay: 1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: "[data-project-after]",
    start: "top 80%",
    toggleActions: "play none none none",
  },
});

gsap.from("[data-project-result]", {
  opacity: 0,
  y: 15,
  duration: 0.6,
  delay: 1.3,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "[data-project-result]",
    start: "top 80%",
    toggleActions: "play none none none",
  },
});
```

- [ ] **Step 5: Update badge, heading**

- Badge: "Featured Projects" → "Evidence"
- Heading stays as project.name (but the static "Featured Projects" label changes)

Add a static heading above the carousel or as a label:

```tsx
<span data-project-label className="absolute left-[30px] top-9 text-base font-medium leading-none tracking-normal">
  Evidence
</span>
<p className="absolute left-[30px] top-16 text-sm text-white/60 tracking-wide">
  Not projects. Transformations.
</p>
```

- [ ] **Step 6: Verify build**

```bash
pnpm build
```

---

### Task 5: Articles — Chapter 5 (The Insights)

**Files:**

- Modify: `app/components/ArticlesSection.tsx`

- [ ] **Step 1: Update article data**

```tsx
const articles = [
  {
    category: "Architectural Design",
    date: "Dec 17, 2025",
    title: "Why Open Plan Doesn't Always Mean Connected",
    image: "/images/project-stonehaven.jpeg",
    href: "#",
  },
  {
    category: "Material Studies",
    date: "Jan 1, 2026",
    title: "The One Material That Changes Every Room",
    image: "/images/hero-interior.png",
    href: "#",
  },
  {
    category: "Studio Insights",
    date: "Dec 30, 2025",
    title: "What We Learned From 120+ Interior Projects",
    image: "/images/project-stonehaven.jpeg",
    href: "#",
  },
];
```

- [ ] **Step 2: Update badge, heading, sub, CTA**

- Badge: "Recent Articles" → "From The Studio"
- Heading: "Design Stories & Studio Journal" → "What We've Learned Building Interiors"
- Sub: "Insights and reflections on interior design..." → "Lessons from the field. Not blog posts. Real experience."
- CTA: "See All Articles" → "Read The Journal"

- [ ] **Step 3: Verify build**

```bash
pnpm build
```

---

### Task 6: FAQ — Chapter 6 (The Doubts)

**Files:**

- Modify: `app/components/FaqSection.tsx`

- [ ] **Step 1: Replace FAQ data**

```tsx
const faqs = [
  {
    question: "I'm not sure if we need full design support",
    answer:
      "Most people don't. A single room consultation, a material palette review, or a full renovation — we tailor the scope to what you actually need. No package. No pressure.",
  },
  {
    question: "I don't know where to begin",
    answer:
      "A 30-minute conversation is all it takes. We walk through your space together, understand what's working and what isn't, and by the end you'll have clarity on exactly what the next step looks like.",
  },
  {
    question: "Can this work if I'm not local?",
    answer:
      "Most of our clients start with a single call. We work remotely through structured presentations, digital approvals, and coordinated guidance. Distance doesn't diminish detail.",
  },
  {
    question: "I'm worried about timelines",
    answer:
      "Every timeline begins with understanding what 'done' means to you. Some projects move in weeks. Others unfold over months. We design the pace around your life, not ours.",
  },
  {
    question: "Is my project the right fit?",
    answer:
      "If you care about how a space feels — how light behaves in it, how materials age in it, how people move through it — you're already our client. The rest is just process.",
  },
  {
    question: "Will this add value to my property?",
    answer:
      "Good design doesn't cost — it compounds. A well-considered interior increases not just resale value but daily quality of life. That's the return that matters.",
  },
];
```

- [ ] **Step 2: Update badge, heading, sub, CTA**

- Badge: "FAQ'S" → "Still Thinking?"
- Heading: "Your Questions, Answered" → "The Questions That Matter Most"
- Sub: "Helpful information designed to guide you..." → "Concerns we hear before every project — and what the answer actually is."
- CTA: "Learn More About Our Process" → "Still Have Doubts? Let's Talk"

- [ ] **Step 3: Verify build**

```bash
pnpm build
```

---

### Task 7: ProcessCta + Footer — Chapter 7 (The Invitation)

**Files:**

- Modify: `app/components/ProcessCtaSection.tsx`
- Modify: `app/components/Footer.tsx`

- [ ] **Step 1: Update ProcessCta copy**

- Badge: "Years of Experience, Projects Still Growing" → "Ready?"
- Heading: "Start A Thoughtful Design Process" → "Some Spaces Are Seen. Yours Will Be Remembered."
- Sub: "Let's work together to create..." → "You've read the philosophy. You've seen the evidence. The next step is a conversation."
- CTA: "Get In Touch With Us" → "Start The Conversation"

- [ ] **Step 2: Update Footer copy**

- Heading: "Begin Your Design Journey" (matches current)
- Sub: "Get in touch to discuss your project..." → "Every great space starts with a single decision."
- Placeholder: "jane@framer.com" → "Tell us about your space"
- Submit button: "Submit" → "Start The Conversation"
- Column 1 heading: "Pages" → "Navigate"
- Column 2 heading: "Legals" → "Foundation"
- Column 3 heading: "Social" → "Connect"

- [ ] **Step 3: Add closing quote to Footer**

After the watermark, add:

```tsx
<p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-white/30 tracking-wider">
  Every great space starts with a single decision.
</p>
```

- [ ] **Step 4: Verify build**

```bash
pnpm build
```

---

### Task 8: Full Build Verification

- [ ] **Step 1: Run build**

```bash
pnpm build
```

- [ ] **Step 2: Verify no TypeScript errors, no build warnings**

- [ ] **Step 3: Commit all changes**

```bash
git add -A
git commit -m "feat: cinematic 7-chapter storytelling narrative redesign"
```
