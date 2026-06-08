# Micro-Interaction System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add polished, premium micro-interactions (Jakub Krehel style) to every visible element — spring physics on hovers, magnetic button effects, press states, and entrance variants.

**Architecture:** Hybrid Framer Motion + GSAP. Centralize all spring configs in `transitions.ts` and all reusable variants in new `micro-variants.ts`. Each component gets `whileHover`, `whileTap`, `whileInView` / `variants` for its interactive elements.

**Tech Stack:** Next.js 16, TypeScript 5, Tailwind CSS v4, Framer Motion 12.40, GSAP 3.15

---

### Task 1: Add micro-spring configs to `transitions.ts`

**Files:**
- Modify: `app/lib/transitions.ts`

- [ ] **Step 1: Add microSpring, microTap, microMagnetic configs**

```ts
export const transitions = {
  spring: {
    type: "spring" as const,
    stiffness: 300,
    damping: 24,
  },
  springBouncy: {
    type: "spring" as const,
    stiffness: 500,
    damping: 15,
  },
  springStiff: {
    type: "spring" as const,
    stiffness: 700,
    damping: 30,
  },
  smooth: {
    type: "tween" as const,
    duration: 0.3,
    ease: "easeInOut" as const,
  },
  snappy: {
    type: "tween" as const,
    duration: 0.15,
    ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
  },
  microSpring: {
    type: "spring" as const,
    stiffness: 400,
    damping: 26,
    mass: 1,
  },
  microTap: {
    type: "spring" as const,
    stiffness: 1000,
    damping: 10,
    mass: 0.5,
  },
};

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};
```

---

### Task 2: Create `app/lib/micro-variants.ts`

**Files:**
- Create: `app/lib/micro-variants.ts`

- [ ] **Step 1: Create shared micro-interaction variant objects**

```ts
import { transitions } from "./transitions";

export const hoverLift = {
  whileHover: { y: -4, scale: 1.02 },
  transition: transitions.microSpring,
};

export const hoverLiftHeavy = {
  whileHover: { y: -6, scale: 1.03 },
  transition: transitions.microSpring,
};

export const hoverScale = {
  whileHover: { scale: 1.05 },
  transition: transitions.microSpring,
};

export const hoverSlide = {
  whileHover: { x: 4 },
  transition: transitions.microSpring,
};

export const tapPress = {
  whileTap: { scale: 0.97 },
  transition: transitions.microTap,
};

export const tapCompact = {
  whileTap: { scale: 0.99 },
  transition: transitions.microTap,
};

export const hoverScaleGlow = {
  whileHover: { scale: 1.15 },
  transition: transitions.microSpring,
};

export const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
};

export const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5 },
};
```

---

### Task 3: Navbar micro-interactions

**Files:**
- Modify: `app/components/Navbar.tsx`

- [ ] **Step 1: Add imports for micro-variants and motion**

Replace:
```ts
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
```
With:
```ts
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { hoverScale, hoverSlide, tapPress, transitions } from "@/app/lib/micro-variants";
```

- [ ] **Step 2: Add micro-interactions to logo**

Replace:
```tsx
<Link
  href="/"
  className={`select-none text-base font-black leading-[0.78] no-underline transition-colors duration-200 ${
    isDark ? "text-white" : "text-text-primary"
  }`}
>
  mirell
</Link>
```
With:
```tsx
<motion.div
  whileHover={{ scale: 1.05 }}
  transition={transitions.microSpring}
>
  <Link
    href="/"
    className={`select-none text-base font-black leading-[0.78] no-underline transition-colors duration-200 ${
      isDark ? "text-white" : "text-text-primary"
    }`}
  >
    mirell
  </Link>
</motion.div>
```

- [ ] **Step 3: Add micro-interactions to nav links**

Replace:
```tsx
{navLinks.map((link) => (
  <Link
    key={link.label}
    href={link.href}
    className={`text-base font-normal leading-none transition-colors duration-200 ${
      isDark ? "text-white/80 hover:text-white" : "text-text-primary hover:text-surface-overlay"
    }`}
  >
    {link.label}
    {link.label !== "Articles" && ","}
  </Link>
))}
```
With:
```tsx
{navLinks.map((link) => (
  <motion.div
    key={link.label}
    whileHover={{ x: 3 }}
    transition={transitions.microSpring}
  >
    <Link
      href={link.href}
      className={`group relative text-base font-normal leading-none transition-colors duration-200 ${
        isDark ? "text-white/80 hover:text-white" : "text-text-primary hover:text-surface-overlay"
      }`}
    >
      {link.label}
      <span className={`absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-x-100 ${
        isDark ? "bg-white" : "bg-surface-overlay"
      }`} />
      {link.label !== "Articles" && ","}
    </Link>
  </motion.div>
))}
```

- [ ] **Step 4: Add micro-interactions to "Contact Us"**

Replace:
```tsx
<Link
  href="#contact"
  className={`hidden text-base font-normal leading-none md:block ${
    isDark ? "text-white/80 hover:text-white" : "text-text-primary hover:text-surface-overlay"
  }`}
>
  Contact Us
</Link>
```
With:
```tsx
<motion.div
  whileHover={{ x: 3 }}
  transition={transitions.microSpring}
  className="hidden md:block"
>
  <Link
    href="#contact"
    className={`text-base font-normal leading-none transition-colors duration-200 ${
      isDark ? "text-white/80 hover:text-white" : "text-text-primary hover:text-surface-overlay"
    }`}
  >
    Contact Us
  </Link>
</motion.div>
```

- [ ] **Step 5: Add micro-interactions to hamburger button (bars animate on hover)**

Replace the hamburger button section:
```tsx
<button
  className="rounded-[7px] p-2 transition-colors duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-[#5E6AD2] md:hidden"
  aria-label="Open menu"
>
  <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
    <rect width="20" height="2" fill={isDark ? "white" : "#565656"} />
    <rect y="6" width="14" height="2" fill={isDark ? "white" : "#565656"} />
    <rect y="12" width="20" height="2" fill={isDark ? "white" : "#565656"} />
  </svg>
</button>
```
With:
```tsx
<motion.button
  whileTap={{ scale: 0.95 }}
  transition={transitions.microTap}
  className="group rounded-[7px] p-2 transition-colors duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-[#5E6AD2] md:hidden"
  aria-label="Open menu"
>
  <svg width="20" height="14" viewBox="0 0 20 14" fill="none" className="group-hover:opacity-80 transition-opacity duration-200">
    <motion.rect width="20" height="2" fill={isDark ? "white" : "#565656"} className="origin-center transition-all duration-200" whileHover={{ y: -1 }} />
    <motion.rect y="6" width="14" height="2" fill={isDark ? "white" : "#565656"} className="origin-left transition-all duration-200" />
    <motion.rect y="12" width="20" height="2" fill={isDark ? "white" : "#565656"} className="origin-center transition-all duration-200" whileHover={{ y: 1 }} />
  </svg>
</motion.button>
```

---

### Task 4: HeroSection micro-interactions

**Files:**
- Modify: `app/components/HeroSection.tsx`

- [ ] **Step 1: Add motion import and micro-variants import**

After the existing `import gsap from "gsap"` line, add:
```ts
import { motion } from "framer-motion";
import { transitions } from "@/app/lib/transitions";
```

- [ ] **Step 2: Add watermark word hover effects**

Find the watermark section and wrap it in motion.div:
```tsx
<motion.div ref={logoRef} className="pointer-events-none absolute bottom-[5%] left-1/2 -translate-x-1/2 select-none leading-none">
  <div className="flex items-end justify-center gap-8 w-[90vw] px-10">
    <motion.span
      whileHover={{ scale: 1.01 }}
      transition={transitions.microSpring}
      className="text-[clamp(100px,18vw,350px)] font-black leading-[0.7]"
    >
      mirell
    </motion.span>
    <motion.span
      whileHover={{ scale: 1.01 }}
      transition={transitions.microSpring}
      className="text-[clamp(80px,16vw,320px)] font-light italic leading-[0.72]"
      style={{ fontFamily: "'Playfair Display', 'Playfair Display Placeholder', serif" }}
    >
      studio
    </motion.span>
  </div>
</motion.div>
```

- [ ] **Step 3: Add tap press to CTA button**

Find the CTA button and add `whileTap={{ scale: 0.97 }}` — it already has `active:scale-[0.98]`, replace with:
```tsx
<Link
  href="#contact"
  className="group mt-11 inline-flex w-fit items-center gap-4 overflow-hidden rounded-full bg-white py-2 pl-2 pr-6 text-base font-medium leading-none no-underline hover:bg-[#f0f0f0] focus:outline-2 focus:outline-offset-2 focus:outline-[#5E6AD2]"
  style={{ color: "#000" }}
>
```

(Keep existing — the `active:scale-[0.98]` is already there as Tailwind utility.)

---

### Task 5: AboutSection micro-interactions

**Files:**
- Modify: `app/components/AboutSection.tsx`

- [ ] **Step 1: Add motion import**

After the `import gsap from "gsap"` line, add:
```ts
import { motion } from "framer-motion";
import { transitions } from "@/app/lib/transitions";
```

- [ ] **Step 2: Add badge hover effect**

Wrap the badge in motion.div:
```tsx
<motion.div
  whileHover={{ scale: 1.03 }}
  transition={transitions.microSpring}
  className="mb-12 inline-flex h-10 w-fit items-center gap-2.5 rounded-full bg-[#f3f4f7] py-1 pl-2 pr-4"
>
  <span className="flex size-7 items-center justify-center rounded-full bg-surface-overlay text-white">
    <motion.svg
      whileHover={{ x: 2, y: -2 }}
      transition={transitions.microSpring}
      width="14" height="14" viewBox="0 0 15 15" fill="none" aria-hidden="true"
    >
      <path d="M3 7.5h8.4M8.2 4.2l3.3 3.3-3.3 3.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </motion.svg>
  </span>
  <span className="text-base font-normal leading-none">About Us</span>
</motion.div>
```

- [ ] **Step 3: Add stat card hover effects**

Replace the stat card div with motion.div:
```tsx
<motion.div
  key={index}
  data-stat-card
  whileHover={{ y: -4, scale: 1.01 }}
  transition={transitions.microSpring}
  className={`min-h-[322px] border-[#eceef2] px-5 pb-10 pt-10 sm:border-l ${index === 0 ? "sm:border-l-0" : ""}`}
>
  <motion.span
    whileHover={{ scale: 1.05 }}
    transition={transitions.microSpring}
    data-stat-value={index}
    className="block text-[clamp(48px,3.35vw,64px)] font-normal leading-none tracking-normal"
  >
    0{stat.suffix}
  </motion.span>
  <p className="mt-14 max-w-[380px] text-[clamp(20px,1.14vw,23px)] font-normal leading-[1.18] text-text-primary">
    {stat.description}
  </p>
</motion.div>
```

---

### Task 6: ProjectsSection micro-interactions

**Files:**
- Modify: `app/components/ProjectsSection.tsx`

- [ ] **Step 1: Add motion import**

Add to imports:
```ts
import { motion } from "framer-motion";
import { transitions } from "@/app/lib/transitions";
```

- [ ] **Step 2: Add nav arrow hover effects**

Replace the prev button:
```tsx
<motion.button
  onClick={prev}
  whileHover={{ scale: 1.15, x: -4 }}
  whileTap={{ scale: 0.95 }}
  transition={transitions.microSpring}
  aria-label="Previous project"
  className="group flex h-14 w-[68px] items-center justify-center text-white focus:outline-2 focus:outline-offset-2 focus:outline-[#5E6AD2]"
>
  <svg width="68" height="42" viewBox="0 0 73 39" fill="none" aria-hidden="true"><path d="M70 19.5H5M21 4 5 19.5 21 35" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
</motion.button>
```

Replace the next button:
```tsx
<motion.button
  onClick={next}
  whileHover={{ scale: 1.15, x: 4 }}
  whileTap={{ scale: 0.95 }}
  transition={transitions.microSpring}
  aria-label="Next project"
  className="group flex h-14 w-[68px] items-center justify-center text-white focus:outline-2 focus:outline-offset-2 focus:outline-[#5E6AD2]"
>
  <svg width="68" height="42" viewBox="0 0 73 39" fill="none" aria-hidden="true"><path d="M3 19.5h65M52 4l16 15.5L52 35" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
</motion.button>
```

- [ ] **Step 3: Add thumbnail card hover effect**

Replace the thumbnail card container:
```tsx
<motion.div
  data-project-card
  whileHover={{ y: -4, scale: 1.02 }}
  transition={transitions.microSpring}
  className="absolute right-[30px] top-[31px] hidden h-[145px] w-[430px] grid-cols-[124px_1fr] gap-5 rounded-[7px] bg-white/12 p-3 shadow-[0_24px_70px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.24)] backdrop-blur-xl backdrop-saturate-150 md:grid"
>
  ...
</motion.div>
```

---

### Task 7: ServicesSection micro-interactions

**Files:**
- Modify: `app/components/ServicesSection.tsx`

- [ ] **Step 1: Add motion import**

Add to imports:
```ts
import { motion } from "framer-motion";
import { transitions } from "@/app/lib/transitions";
```

- [ ] **Step 2: Add badge hover effect**

Wrap the badge in motion.div (similar pattern to Task 5):
```tsx
<motion.div
  whileHover={{ scale: 1.03 }}
  transition={transitions.microSpring}
  className="mb-12 inline-flex h-14 w-fit items-center gap-4 overflow-hidden rounded-full bg-white py-2 pl-2 pr-6 text-base font-medium leading-none"
  style={{ color: "#000" }}
>
  ...
</motion.div>
```

- [ ] **Step 3: Add service card hover effects**

Replace the service card article with motion.article:
```tsx
<motion.article
  key={service.number}
  data-service-card
  whileHover={{ y: -6, scale: 1.02 }}
  whileTap={{ scale: 0.99 }}
  transition={transitions.microSpring}
  className="block h-[240px] w-full rounded-[7px] bg-[#f3f4f7] px-5 py-5 text-text-primary transition-colors duration-300 hover:bg-[#e8eaf0]"
>
  <motion.span
    whileHover={{ scale: 1.1 }}
    transition={transitions.microSpring}
    className="flex size-12 items-center justify-center rounded-full bg-white text-[22px] font-medium leading-none text-text-primary"
  >
    {service.number}
  </motion.span>
  <h3 className="mt-[35px] mb-[25px] text-[22px] font-normal leading-[1.05] tracking-normal">{service.title}</h3>
  <p className="mt-2 max-w-[330px] text-[18px] font-normal leading-[1.22] text-[#616366]"
    style={{ fontFamily: "'Inter Display', 'Inter Display Placeholder', sans-serif" }}>
    {service.description}
  </p>
</motion.article>
```

---

### Task 8: ArticlesSection micro-interactions

**Files:**
- Modify: `app/components/ArticlesSection.tsx`

- [ ] **Step 1: Add transitions import**

After existing motion import, add:
```ts
import { transitions } from "@/app/lib/transitions";
```

- [ ] **Step 2: Add category badge hover on article cards**

Find the category badge span inside each article card and wrap in:
```tsx
<motion.span
  whileHover={{ scale: 1.05 }}
  transition={transitions.microSpring}
  className="absolute left-5 top-[21px] rounded-full bg-[rgba(135,132,124,0.82)] px-[18px] py-[11px] text-base font-medium leading-none text-white backdrop-blur-[2px]"
>
  {article.category}
</motion.span>
```

- [ ] **Step 3: Add card border glow on hover**

Add a border highlight to the article card link. Replace the outer article card Link with:
```tsx
<Link
  href={article.href}
  className="group relative min-h-[624px] block overflow-hidden rounded-[7px] bg-surface-overlay text-white no-underline transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.08)] focus:outline-2 focus:outline-offset-2 focus:outline-[#5E6AD2]"
>
```

And add a subtle date/title lift on card hover. Find the bottom content div and wrap title in motion.span:
```tsx
<motion.h3
  whileHover={{ x: 3 }}
  transition={transitions.microSpring}
  className="mt-[15px] text-[22px] font-normal leading-[1.08] tracking-normal text-white"
>
  {article.title}
</motion.h3>
```

---

### Task 9: FaqSection micro-interactions

**Files:**
- Modify: `app/components/FaqSection.tsx`

- [ ] **Step 1: Add transitions import**

Add to imports:
```ts
import { transitions } from "@/app/lib/transitions";
```

- [ ] **Step 2: Add FAQ row hover and plus icon hover effects**

Replace the FAQ item button with:
```tsx
<motion.button
  type="button"
  onClick={() => setOpenIndex(isOpen ? -1 : index)}
  whileHover={{ backgroundColor: "rgba(0,0,0,0.08)" }}
  transition={transitions.microSpring}
  className="flex min-h-[60px] w-full items-center justify-between gap-5 px-3 text-left focus:outline-2 focus:outline-offset-2 focus:outline-[#5E6AD2] rounded-[7px]"
  aria-expanded={isOpen}
>
  <span className="text-base font-medium leading-tight">
    {faq.question}
  </span>
  <motion.span
    animate={{ rotate: isOpen ? 45 : 0 }}
    whileHover={{ scale: 1.1 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className="flex size-14 shrink-0 items-center justify-center rounded-full bg-surface-base text-base font-medium leading-none"
  >
    +
  </motion.span>
</motion.button>
```

---

### Task 10: ProcessCtaSection micro-interactions

**Files:**
- Modify: `app/components/ProcessCtaSection.tsx`

- [ ] **Step 1: Add motion import**

Add to imports:
```ts
import { motion } from "framer-motion";
import { transitions } from "@/app/lib/transitions";
```

- [ ] **Step 2: Add collaborator avatar hover effects**

Replace the collaborator span:
```tsx
<motion.span
  key={label}
  whileHover={{ scale: 1.15, zIndex: 10 }}
  whileTap={{ scale: 0.95 }}
  transition={transitions.microSpring}
  className="flex size-14 items-center justify-center rounded-full border-2 border-dashed border-surface-base bg-surface-overlay text-lg font-bold text-white shadow-sm"
  style={{
    background:
      index % 2 === 0
        ? "linear-gradient(135deg, #2F2E30, oklch(0.42 0.03 70))"
        : "linear-gradient(135deg, #191919, oklch(0.35 0.012 260))",
  }}
>
  {label}
</motion.span>
```

- [ ] **Step 3: Add fadeUp entrance for "Partnering with clients" text**

Add to the `data-cta-content` paragraph:
```tsx
<motion.p
  initial={{ opacity: 0, y: 16 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-50px" }}
  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
  className="mb-5 text-base font-medium leading-none text-text-secondary"
>
  Partnering with clients to create refined interiors
</motion.p>
```

---

### Task 11: Footer micro-interactions

**Files:**
- Modify: `app/components/Footer.tsx`

- [ ] **Step 1: Add motion import**

Add to imports:
```ts
import { motion } from "framer-motion";
import { transitions } from "@/app/lib/transitions";
```

- [ ] **Step 2: Add link hover effects in FooterColumn**

Replace the Link inside FooterColumn:
```tsx
<motion.li
  key={link.label}
  whileHover={{ x: 4 }}
  transition={transitions.microSpring}
>
  <Link
    href={link.href}
    className="text-base font-bold leading-none text-white/80 no-underline transition-colors duration-200 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-[#5E6AD2]"
  >
    {link.label}
  </Link>
</motion.li>
```

- [ ] **Step 3: Add submit button arrow hover animation**

The submit button already has `group-hover:translate-x-1` on the icon span. Replace with motion:
```tsx
<motion.button
  type="submit"
  whileTap={{ scale: 0.97 }}
  transition={transitions.microTap}
  className="group inline-flex h-14 w-fit items-center gap-4 rounded-[7px] bg-white py-2 pl-2 pr-6 text-xl font-bold text-surface-overlay transition duration-200 hover:bg-[#f0f0f0] focus:outline-2 focus:outline-offset-2 focus:outline-[#5E6AD2]"
>
  <motion.span
    whileHover={{ x: 3 }}
    transition={transitions.microSpring}
    className="flex h-10 w-10 items-center justify-center rounded-[7px] bg-surface-overlay text-white"
  >
    <ArrowIcon />
  </motion.span>
  Submit
</motion.button>
```

- [ ] **Step 4: Add input focus animation**

Enhance the email input with a border focus animation:
```tsx
<motion.input
  id="footer-email"
  type="email"
  placeholder="jane@framer.com"
  whileFocus={{ scale: 1.01 }}
  transition={transitions.microSpring}
  className="h-14 min-w-0 flex-1 rounded-[7px] border border-dashed border-white/30 bg-transparent px-4 text-xl font-medium text-white outline-none placeholder:text-text-tertiary focus:border-solid focus:outline-2 focus:outline-offset-2 focus:outline-[#5E6AD2]"
/>
```

- [ ] **Step 5: Add watermark word hover (same as hero)**

Find the watermark and wrap words in motion.span:
```tsx
<motion.div
  whileHover={{ scale: 1.005 }}
  transition={transitions.microSpring}
  className="pointer-events-none absolute bottom-[5%] left-1/2 -translate-x-1/2 select-none leading-none"
>
  ...
</motion.div>
```

---

### Verification

- [ ] **Step 1: Run build to check for compilation errors**

Run: `pnpm build`
Expected: Successful build with no TypeScript errors.

- [ ] **Step 2: Run lint**

Run: `pnpm lint`
Expected: No lint errors.

- [ ] **Step 3: Update knowledge graph**

Run: `graphify update .`
Expected: Graph updated with new file relationships.
