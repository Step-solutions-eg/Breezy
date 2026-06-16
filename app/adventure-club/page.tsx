"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import MagneticWrapper from "../components/MagneticWrapper";
import SeoHead, { BASE_URL } from "../lib/seo/seo-head";
import { breadcrumbSchema } from "../lib/seo/structured-data";

const experiences = [
  { label: "Upcoming Trips", desc: "Curated journeys to Siwa each season" },
  { label: "Adventure Programs", desc: "Dune bashing, trekking, sandboarding" },
  { label: "Accommodations", desc: "Boutique stays beneath the desert stars" },
  { label: "Activities", desc: "Salt lakes, ancient temples, desert sports" },
  { label: "Seasonal Experiences", desc: "Harvest festivals, spring blossom trails" },
  { label: "Wellness Retreats", desc: "Yoga, meditation, traditional Siwan treatments" },
  { label: "Desert Events", desc: "Stargazing dinners under the Great Sand Sea" },
];

const programs = [
  {
    title: "Weekend Escapes",
    duration: "2-3 Days",
    difficulty: "Easy",
    mood: "Relaxed",
    description:
      "Quick yet immersive getaways into Siwa's palm-fringed tranquility. Perfect for a fast reset.",
    activities: ["Oasis Walks", "Salt Lake Swim", "Sunset Meditation", "Local Cuisine"],
  },
  {
    title: "Group Expeditions",
    duration: "5-7 Days",
    difficulty: "Moderate",
    mood: "Social",
    description:
      "Travel with a community of like-minded explorers uncovering Siwa's hidden corners together.",
    activities: ["Desert Safaris", "Temple Tours", "Campfire Stories", "Group Dining"],
  },
  {
    title: "Private Experiences",
    duration: "Custom",
    difficulty: "Any",
    mood: "Intimate",
    description:
      "Fully tailored journeys designed around your rhythm, interests, and dreams of the oasis.",
    activities: ["Private Guide", "Bespoke Dining", "Sunset Camel Ride", "Photography Tour"],
  },
  {
    title: "Luxury Retreats",
    duration: "7-10 Days",
    difficulty: "Easy",
    mood: "Indulgent",
    description:
      "Uncompromising luxury set against the raw, haunting beauty of the Great Sand Sea.",
    activities: ["Spa Treatments", "Private Pool", "Gourmet Dining", "Stargazing"],
  },
  {
    title: "Adventure Packages",
    duration: "4-6 Days",
    difficulty: "Challenging",
    mood: "Thrilling",
    description:
      "Push your limits across dunes, mountains, and ancient salt lakes carved by time.",
    activities: ["Dune Bashing", "Mountain Trek", "Sandboarding", "Survival Skills"],
  },
  {
    title: "Custom Itineraries",
    duration: "Flexible",
    difficulty: "Any",
    mood: "Personalized",
    description:
      "Dream it, and we will build it. Every detail crafted around your vision of Siwa.",
    activities: ["Full Customization", "Expert Planning", "Personal Concierge", "24/7 Support"],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.065, delayChildren: 0.08 },
  },
};

const ease = [0.32, 0.72, 0, 1] as const;

const itemBlurVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease },
  },
};

export default function AdventureClubPage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Navbar alwaysScrolled />
      <SeoHead
        data={{
          title: "Siwa Travel Club & Desert Adventures — Breezy Island",
          description:
            "Join the Siwa Travel Club at Breezy Island. Explore curated desert adventures, wellness retreats, salt lake excursions, and cultural immersion experiences in Siwa Oasis, Egypt.",
          keywords:
            "Siwa travel club, Siwa desert safari, Siwa adventure, things to do in Siwa, Siwa attractions, desert safari Egypt, Siwa salt lakes, Siwa Oasis tours, wellness retreat Siwa, eco tourism Siwa",
          canonical: "/adventure-club",
          hreflang: [
            { lang: "en", url: "/adventure-club" },
            { lang: "ar", url: "/adventure-club" },
          ],
          ogTitle: "Siwa Travel Club & Desert Adventures — Breezy Island",
          ogDescription:
            "More than a travel experience — a gateway into the raw beauty, culture, and spirit of Siwa Oasis.",
          ogImage: "/images/SAC Main Photo.jpg",
          ogType: "website",
          twitterCard: "summary_large_image",
          jsonLd: [
            breadcrumbSchema(
              [
                { name: "Home", item: "/" },
                { name: "Adventure Club", item: "/adventure-club" },
              ],
              BASE_URL,
            ),
          ],
        }}
      />
      <main className="relative min-h-dvh bg-surface-base lg:h-dvh lg:overflow-hidden">
        {/* Fixed noise grain overlay */}
        <div
          className="pointer-events-none fixed inset-0 z-50 opacity-[0.025]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* LEFT — Fixed image column */}
        <div className="relative h-[70dvh] w-full overflow-hidden lg:fixed lg:left-0 lg:top-0 lg:h-full lg:w-1/2">
          <motion.div
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0 will-change-transform"
          >
            <Image
              src="/images/SAC Main Photo.jpg"
              alt="Siwa Oasis desert adventure landscape at Breezy Island travel club, Egypt"
              fill
              className="object-cover object-center"
              sizes="50vw"
              priority
            />
          </motion.div>
          <div className="absolute inset-0 bg-[rgba(12,10,8,0.50)] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(12,10,8,0.45)] via-[rgba(12,10,8,0.15)] to-[rgba(12,10,8,0.30)] pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[rgba(12,10,8,0.50)] via-[rgba(12,10,8,0.15)] to-transparent pointer-events-none" />

          <div className="relative z-10 flex h-full flex-col justify-center px-4 sm:px-8 lg:px-14">
            <div className="pointer-events-auto max-w-[490px]">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0.32, 0.72, 0, 1],
                  delay: 0.3,
                }}
                className="mb-4 inline-flex h-8 w-fit items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white shadow-[0_2px_12px_rgba(80,58,38,0.06)] backdrop-blur-sm"
              >
                The Siwa Travel Club
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.9,
                  ease: [0.32, 0.72, 0, 1],
                  delay: 0.5,
                }}
                data-ar-font-size
                className="font-heading text-[clamp(48px,4.3vw,86px)] font-normal leading-[0.985] text-white"
              >
                Adventure
                <br />
                <span className="italic">Club</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0.32, 0.72, 0, 1],
                  delay: 0.7,
                }}
                className="mt-6 max-w-[440px] text-[clamp(18px,2.2vw,26px)] font-normal leading-[1.2] text-white/80"
                style={{ fontFamily: '"SF Mono", monospace' }}
              >
                More than a travel experience — a gateway into the raw beauty,
                culture, and spirit of Siwa Oasis.
              </motion.p>
            </div>
          </div>
        </div>

        {/* RIGHT — Scrollable content column */}
        <div
          ref={scrollRef}
          className="relative z-10 w-full overflow-hidden lg:ml-[50%] lg:h-[103vh] lg:overflow-y-auto"
        >
          <div className="relative z-10 overflow-hidden px-4 pb-24 pt-30 sm:px-8 sm:pb-32 sm:pt-30 lg:px-12 lg:pb-40 lg:pt-30">
            <div className="tree-left pointer-events-none absolute bottom-0 right-1/2 z-0 h-[320px] w-[270px] select-none opacity-10 sm:h-[440px] sm:w-[380px] lg:h-[520px] lg:w-[450px]">
              <img
                src="/images/tree only.svg"
                alt=""
                aria-hidden="true"
                className="block h-full w-full object-contain object-right-bottom"
              />
            </div>
            {/* INTRO — "Gateway to the Raw Spirit of Siwa" */}
            <section className="relative z-10 mb-16 sm:mb-20">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                className="mb-12 inline-flex h-10 w-fit items-center gap-2.5 rounded-full bg-surface-raised py-1 pl-2 pr-4"
              >
                <span className="flex size-7 items-center justify-center rounded-full bg-surface-overlay text-white">
                  <motion.svg
                    whileHover={{ x: 2, y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 26 }}
                    width="14"
                    height="14"
                    viewBox="0 0 15 15"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 7.5h8.4M8.2 4.2l3.3 3.3-3.3 3.3"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                </span>
                <span className="text-base font-normal leading-none">The Experience</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
              >
                <h2
                  className="max-w-[580px] text-[clamp(40px,3.35vw,64px)] font-medium uppercase leading-[0.985] tracking-normal"
                  style={{ fontFamily: '"SF Mono", monospace' }}
                >
                  Gateway to the
                  <br />
                  Raw Spirit of Siwa
                </h2>

                <p
                  className="mt-8 max-w-[560px] text-[clamp(18px,2.2vw,26px)] font-normal leading-[1.2] text-text-secondary"
                  style={{ fontFamily: '"SF Mono", monospace' }}
                >
                  The Siwa Travel Club creates curated travel experiences inside
                  Siwa Oasis through organized programs, adventure activities,
                  and boutique hospitality partnerships. Simple, modern, and
                  community-driven — making travelers feel part of an exclusive
                  adventure club rather than traditional tourism.
                </p>
              </motion.div>
            </section>

            {/* 01 — DISCOVER THE EXPERIENCE */}
            <section className="relative z-10 mb-24 sm:mb-32">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
              >
                <div className="mb-8 sm:mb-10">
                  <div className="mb-3 flex w-full items-center gap-3 sm:w-[49%]">
                    <span className="flex size-8 items-center justify-center rounded-full bg-surface-overlay text-[10px] font-medium uppercase tracking-[0.2em] text-white">
                      01
                    </span>
                    <span className="h-px flex-1 bg-border-default/50" />
                    <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-text-secondary">
                      Discover
                    </span>
                  </div>

                  <h3 className="mt-6 text-[clamp(32px,3.35vw,64px)] font-normal leading-[0.985] text-text-primary">
                    The Experience
                  </h3>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                className="mb-10 max-w-[580px] text-[clamp(18px,2.2vw,26px)] font-normal leading-[1.2] text-text-secondary"
                style={{ fontFamily: '"SF Mono", monospace' }}
              >
                Travelers can explore a wide range of curated offerings — from
                upcoming group trips and private adventures to wellness retreats
                and exclusive desert events beneath the Siwan sky.
              </motion.p>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="w-full space-y-1 sm:w-[49%]"
              >
                {experiences.map((item) => (
                  <motion.div
                    key={item.label}
                    variants={itemBlurVariants}
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="group flex items-center gap-4 border-b border-accent-secondary/10 py-3 last:border-0 sm:py-3.5"
                  >
                    <span className="relative flex size-2 shrink-0 items-center justify-center">
                      <span className="absolute size-2 rounded-full bg-accent/60 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:size-2.5 group-hover:bg-accent" />
                      <span className="absolute size-5 rounded-full bg-accent/0 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-accent/10 group-hover:size-6" />
                    </span>
                    <span className="flex-1 text-sm font-normal leading-none text-text-primary transition-colors duration-300 group-hover:text-text-primary sm:text-base">
                      {item.label}
                    </span>
                    <span className="text-[11px] font-normal leading-none text-text-secondary/40 transition-all duration-300 group-hover:text-text-secondary/70">
                      {item.desc}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </section>

            {/* 02 — CHOOSE A PROGRAM */}
            <section className="relative z-10 mb-24 sm:mb-32">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
              >
                <div className="mb-8 sm:mb-10">
                  <div className="mb-3 flex w-full items-center gap-3 sm:w-[49%]">
                    <span className="flex size-8 items-center justify-center rounded-full bg-surface-overlay text-[10px] font-medium uppercase tracking-[0.2em] text-white">
                      02
                    </span>
                    <span className="h-px flex-1 bg-border-default/50" />
                    <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-text-secondary">
                      Choose
                    </span>
                  </div>

                  <h3 className="mt-6 text-[clamp(32px,3.35vw,64px)] font-normal leading-[0.985] text-text-primary">
                    A Program
                  </h3>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                className="mb-10 max-w-[580px] text-[clamp(18px,2.2vw,26px)] font-normal leading-[1.2] text-text-secondary"
                style={{ fontFamily: '"SF Mono", monospace' }}
              >
                Guests can select from journeys that match their rhythm. Each
                program includes duration, activities, accommodation,
                transportation, pricing, trip mood, and difficulty level.
              </motion.p>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="w-full space-y-1 sm:w-[49%]"
              >
                {programs.map((program) => (
                  <motion.div
                    key={program.title}
                    variants={itemBlurVariants}
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="group border-b border-accent-secondary/10 py-4 last:border-0 sm:py-5"
                  >
                    <div className="flex items-start gap-4">
                      <span className="relative mt-1.5 flex size-2 shrink-0 items-center justify-center">
                        <span className="absolute size-2 rounded-full bg-accent-secondary/60 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:size-2.5 group-hover:bg-accent-secondary" />
                        <span className="absolute size-5 rounded-full bg-accent-secondary/0 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-accent-secondary/10 group-hover:size-6" />
                      </span>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <span className="text-sm font-normal leading-none text-text-primary transition-colors duration-300 group-hover:text-text-primary sm:text-base">
                            {program.title}
                          </span>
                          <div className="flex flex-wrap gap-x-2 gap-y-1 text-[10px] font-medium uppercase tracking-[0.1em] text-text-secondary/50 transition-all duration-300 group-hover:text-text-secondary/80">
                            <span>{program.duration}</span>
                            <span className="text-border-default/30">·</span>
                            <span>{program.difficulty}</span>
                            <span className="text-border-default/30">·</span>
                            <span>{program.mood}</span>
                          </div>
                        </div>

                        <p className="mt-1.5 max-w-[520px] text-[13px] font-normal leading-[1.4] text-text-secondary/70 transition-colors duration-300 group-hover:text-text-secondary sm:text-sm">
                          {program.description}
                        </p>

                        <div className="mt-2.5 flex flex-wrap gap-x-2 gap-y-1">
                          {program.activities.map((a) => (
                            <span
                              key={a}
                              className="text-[11px] font-normal leading-none text-text-tertiary/50 transition-colors duration-300 group-hover:text-text-tertiary/80"
                            >
                              {a}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </section>

            {/* CTA — Ready to Join the Club? */}
            <section className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                className="relative min-h-[430px] w-full border-t border-accent-secondary/20 pt-14 sm:w-[49%] sm:min-h-[520px] sm:pt-20"
              >
                <h3 className="relative z-10 text-[clamp(32px,3.35vw,64px)] font-normal leading-[0.985] text-text-primary">
                  Ready to
                  <br />
                  <span className="italic">Join the Club?</span>
                </h3>
                <p
                  className="relative z-10 mt-6 max-w-[480px] text-[clamp(18px,2.2vw,26px)] font-normal leading-[1.2] text-text-secondary"
                  style={{ fontFamily: '"SF Mono", monospace' }}
                >
                  Whether you seek solitude, adventure, or connection — there
                  is a journey waiting for you in Siwa.
                </p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1], delay: 0.15 }}
                  className="relative z-10"
                >
                  <MagneticWrapper>
                    <Link
                      href="/#contact"
                      className="group mt-10 inline-flex h-12 w-fit items-center gap-4 overflow-hidden rounded-full bg-surface-overlay py-2 pl-2 pr-5 text-sm font-medium leading-none no-underline transition duration-200 hover:opacity-90 active:scale-[0.98] sm:mt-14 sm:h-14 sm:pr-6 sm:text-base"
                      style={{ color: "#fff" }}
                    >
                      <span className="relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white sm:size-10">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="absolute size-3 -rotate-45 text-surface-overlay transition-transform duration-300 ease-out group-hover:translate-x-5 group-hover:-translate-y-5 sm:size-4"
                          aria-hidden="true"
                        >
                          <path
                            d="M5 12h14M13 5l7 7-7 7"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="absolute size-3 -rotate-45 text-surface-overlay -translate-x-5 translate-y-5 transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0 sm:size-4"
                          aria-hidden="true"
                        >
                          <path
                            d="M5 12h14M13 5l7 7-7 7"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      Explore Programs
                    </Link>
                  </MagneticWrapper>
                </motion.div>
              </motion.div>

            </section>
          </div>
        </div>
      </main>
    </>
  );
}
