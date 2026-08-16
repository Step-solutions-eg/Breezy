"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import SmoothScroll from "../components/SmoothScroll";
import ScrollProgressBar from "../components/ScrollProgressBar";
import MagneticWrapper from "../components/MagneticWrapper";
import SeoHead, { BASE_URL } from "../lib/seo/seo-head";
import { breadcrumbSchema } from "../lib/seo/structured-data";

gsap.registerPlugin(ScrollTrigger);

const philosophy = [
  {
    number: "01",
    title: "Rooted in Place",
    description:
      "Every stone, every palm frond, every grain of sand belongs to Siwa. We build with the oasis, not on it \u2014 letting the landscape lead.",
  },
  {
    number: "02",
    title: "Silence as Luxury",
    description:
      "True luxury isn\u2019t more \u2014 it\u2019s less. Less noise, less rush, less distraction. We protect the quiet so you can hear yourself again.",
  },
  {
    number: "03",
    title: "Handcrafted Hospitality",
    description:
      "No formulas. No chains. Every experience is woven by local hands, guided by Siwan traditions passed down through generations.",
  },
  {
    number: "04",
    title: "Timeless Over Trendy",
    description:
      "We don\u2019t chase seasons. Breezy Island is built for the long now \u2014 where quality outlives fashion and memory outlasts novelty.",
  },
];

const timeline = [
  {
    year: "2019",
    title: "The Discovery",
    description:
      "A passing journey to the heart of Siwa revealed an untouched paradise, hidden between the lake and the sand dunes.",
  },
  {
    year: "2020",
    title: "The Dream",
    description:
      "The dream began to take shape: rewriting the map of Siwa\u2019s hospitality.",
  },
  {
    year: "2022",
    title: "The Struggle",
    description:
      "Construction began with a promise: every material eco-friendly and natural, and every design decision puts the oasis at the heart.",
  },
  {
    year: "2024",
    title: "The Transformation",
    description:
      "The oasis began to transform into a place of quiet luxury \u2014 walls of kershef, doors of olive wood, every detail shaped by Siwan hands.",
  },
  {
    year: "2026",
    title: "Breezy Is Born",
    description:
      "More rooms, finer hotel hospitality, distinctive views, and more services.",
  },
  {
    year: "2026",
    title: "The Vision",
    description:
      "The vision is simple: for Siwa to become, in the eyes of the world\u2026 God\u2019s paradise on earth.",
  },
];

export default function StoryPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const originRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const imageParallaxRef = useRef<HTMLDivElement>(null);
  const ethosImageRef = useRef<HTMLDivElement>(null);
  const founderRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(imageParallaxRef.current, {
          scale: 1.04,
          ease: "none",
          scrollTrigger: {
            trigger: imageParallaxRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: heroRef },
  );

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(ethosImageRef.current, {
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: ethosImageRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.from("[data-origin-badge]", {
          opacity: 0,
          x: -20,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "[data-origin-badge]",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        gsap.from("[data-origin-heading]", {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-origin-heading]",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        gsap.from("[data-origin-text]", {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "[data-origin-text]",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        gsap.from("[data-philosophy-badge]", {
          opacity: 0,
          x: -20,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "[data-philosophy-badge]",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        gsap.from("[data-philosophy-heading]", {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-philosophy-heading]",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        gsap.from("[data-philosophy-card]", {
          opacity: 0,
          y: 50,
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "[data-philosophy-grid]",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        gsap.from("[data-timeline-badge]", {
          opacity: 0,
          x: -20,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "[data-timeline-badge]",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        gsap.from("[data-timeline-heading]", {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-timeline-heading]",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        gsap.from("[data-timeline-item]", {
          opacity: 0,
          y: 40,
          stagger: 0.12,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "[data-timeline-list]",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        gsap.from("[data-founder-badge]", {
          opacity: 0,
          x: -20,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "[data-founder-badge]",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        gsap.from("[data-founder-heading]", {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-founder-heading]",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        gsap.from("[data-founder-text]", {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "[data-founder-text]",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        gsap.from("[data-cta-content]", {
          opacity: 0,
          y: 40,
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: pageRef },
  );

  return (
    <SmoothScroll>
      <SeoHead
        data={{
          title: "Our Story — Breezy Island Siwa Oasis Retreat",
          description:
            "Discover the story behind Breezy Island, a luxury desert retreat born from the silence of Siwa Oasis. Learn about our philosophy, our journey from dream to destination, and our commitment to authentic Siwan hospitality.",
          keywords:
            "Breezy Island story, about Siwa Oasis, Siwa history, desert retreat philosophy, Siwan hospitality, eco tourism Siwa, wellness retreat Siwa, sustainable tourism Egypt",
          canonical: "/story",
          hreflang: [
            { lang: "en", url: "/story" },
            { lang: "ar", url: "/story" },
          ],
          ogTitle: "Our Story — Breezy Island Siwa Oasis Retreat",
          ogDescription:
            "Born from the silence of Siwa — discover the journey behind the luxury desert retreat.",
          ogImage: "/images/hero-interior-1.jpeg",
          ogType: "website",
          twitterCard: "summary_large_image",
          jsonLd: [
            breadcrumbSchema(
              [
                { name: "Home", item: "/" },
                { name: "Our Story", item: "/story" },
              ],
              BASE_URL,
            ),
          ],
        }}
      />
      <ScrollProgressBar />
      <main>
        <Navbar mode="hide-on-scroll" />

        <section
          ref={heroRef}
          className="relative min-h-[100dvh] w-full overflow-hidden bg-surface-base"
        >
          <div className="pointer-events-none absolute inset-0 select-none overflow-hidden">
            <div
              dir="ltr"
              data-brand-logo
              className="absolute -left-[5%] top-1/2 -translate-y-1/2 whitespace-nowrap text-[clamp(80px,20vw,600px)] font-heading font-black leading-[0.7] text-text-primary/3"
            >
              Breezy
              <span className="font-heading font-normal italic">Island</span>
            </div>
          </div>

          <div className="relative mx-auto flex min-h-[100dvh] flex-col lg:flex-row">
            <div className="relative z-10 flex w-full flex-col justify-center px-4 pt-28 pb-12 sm:px-8 lg:w-[38%] lg:px-10 lg:pb-32 lg:pt-36">
              <div className="relative">
                <div
                  data-ar-width
                  className="absolute -inset-6 rounded-[12px] lg:-inset-8 lg:bg-surface-base/90 lg:backdrop-blur-md lg:shadow-[0_8px_32px_rgba(80,58,38,0.12)]"
                />
                <div className="relative">
                  <motion.div
                    initial={{ opacity: 0, y: -16, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.6,
                      ease: [0.32, 0.72, 0, 1],
                      delay: 0.15,
                    }}
                  >
                    <span className="mb-8 inline-flex h-8 items-center gap-2.5 rounded-full bg-surface-raised py-1 pl-2 pr-4 shadow-[0_2px_12px_rgba(80,58,38,0.06)]">
                      <span className="flex size-6 items-center justify-center rounded-full bg-surface-overlay text-white">
                        <svg
                          width="12"
                          height="12"
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
                        </svg>
                      </span>
                      <span className="text-[13px] font-normal leading-none text-text-secondary">
                        Our Story
                      </span>
                    </span>
                  </motion.div>

                  <motion.h1
                    data-ar-story-h1
                    initial={{ opacity: 0, y: 60, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.9,
                      ease: [0.32, 0.72, 0, 1],
                      delay: 0.3,
                    }}
                    className="max-w-[580px] max-sm:text-[2rem] text-[clamp(36px,4vw,80px)] font-medium uppercase leading-[0.94] tracking-[-0.02em] text-text-primary"
                    style={{ fontFamily: '"SF Mono", monospace' }}
                  >
                    Born from the Silence
                    <br />
                    of Siwa
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.7,
                      ease: [0.32, 0.72, 0, 1],
                      delay: 0.5,
                    }}
                    className="mt-6 max-w-[460px] text-[clamp(16px,1.1vw,20px)] font-normal leading-[1.5] text-text-secondary sm:mt-8"
                  >
                    A journey that began with a single footprint in the sand and
                    became a sanctuary for souls seeking stillness.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.6,
                      ease: [0.32, 0.72, 0, 1],
                      delay: 0.7,
                    }}
                    className="flex justify-start"
                    style={{ margin: "30px 0 0 0" }}
                  >
                    <MagneticWrapper>
                      <Link
                        href="/contact-us"
                        className="group inline-flex h-14 w-fit items-center gap-4 overflow-hidden rounded-full bg-surface-overlay py-2 pl-3 pr-7 text-base font-medium leading-none no-underline transition duration-200 mt-[25px] sm:mt-0 hover:opacity-90 active:scale-[0.98] sm:h-16 sm:pr-8 sm:text-lg"
                        style={{ color: "#fff" }}
                      >
                        <span className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white sm:size-11">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            className="absolute size-4 -rotate-45 text-surface-overlay transition-transform duration-300 ease-out group-hover:translate-x-5 group-hover:-translate-y-5"
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
                            className="absolute size-4 -rotate-45 text-surface-overlay -translate-x-5 translate-y-5 transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0"
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
                        Book Your Stay
                      </Link>
                    </MagneticWrapper>
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="relative flex w-full flex-1 lg:w-[62%]">
              <div
                ref={imageParallaxRef}
                className="relative min-h-[400px] w-full overflow-hidden sm:min-h-[500px] lg:absolute lg:inset-y-0 lg:-left-[8%] lg:right-0 will-change-transform"
              >
                <Image
                  src="/images/hero-interior-1.jpeg"
                  alt="Siwa Oasis luxury retreat at Breezy Island — desert sanctuary in Egypt"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 62vw, 100vw"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <div ref={pageRef} className="relative z-10 bg-surface-base pointer-events-auto">
          <section
            ref={originRef}
            id="origin"
            className="px-4 py-20 text-text-primary sm:px-8 sm:py-36"
          >
            <div className="grid gap-12 lg:grid-cols-[1fr_0.98fr] lg:gap-24">
              <div className="relative min-h-[400px] overflow-hidden rounded-[7px] sm:min-h-[600px] lg:min-h-[740px]">
                <Image
                  src="/images/7.jpeg"
                  alt="Siwa Oasis landscape at golden hour with palm groves and dunes — Breezy Island luxury resort, Egypt"
                  fill
                  className="object-cover object-center"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>

              <div>
                <div data-origin-badge>
                  <SectionBadge label="The Beginning" />
                </div>

                <h2
                  data-origin-heading
                  className="max-w-[650px] text-[clamp(40px,3.35vw,64px)] font-medium uppercase leading-[0.985] tracking-normal"
                  style={{ fontFamily: '"SF Mono", monospace' }}
                >
                  From a Dream
                  <br />
                  to an Extraordinary Destination
                </h2>

                <div data-origin-text className="mt-10 space-y-6 sm:mt-16">
                  <p className="max-w-[660px] text-[clamp(22px,1.52vw,30px)] font-normal leading-[1.22]">
                    The story began with a dream — to create in Siwa a different
                    hospitality experience, one that respects the spirit of the
                    place, preserves its authenticity, and gives the guest a new
                    meaning of luxury hospitality.
                  </p>
                  <p className="max-w-[660px] text-[clamp(18px,1.14vw,24px)] font-normal leading-[1.3] text-text-secondary">
                    And from Siwa’s enchanting nature, its ancient heritage, and
                    the calm of its lake, this dream began to turn into reality.
                  </p>
                  <p className="max-w-[660px] text-[clamp(18px,1.14vw,24px)] font-normal leading-[1.3] text-text-secondary">
                    We did not want to build just another hotel — we wanted to
                    create a destination with personality and soul; a place that
                    combines quiet luxury, the beauty of nature, and the warmth
                    of Siwan hospitality.
                  </p>
                  <p className="max-w-[660px] text-[clamp(18px,1.14vw,24px)] font-normal leading-[1.3] text-text-secondary">
                    And so{" "}
                    <strong className="font-heading font-normal italic">
                      Breezy Island
                    </strong>{" "}
                    was born… an extraordinary destination in the heart of Siwa,
                    designed to give you an experience like no other.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section
            ref={philosophyRef}
            id="philosophy"
            className="relative bg-surface-raised px-4 py-20 text-text-primary sm:px-8 sm:py-36"
          >
            <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-1/2 select-none opacity-[0.04]">
              <Image
                src="/images/tree only.svg"
                alt=""
                fill
                className="object-contain object-right-bottom"
                aria-hidden
              />
            </div>
            <div className="max-w-none">
              <div data-philosophy-badge>
                <SectionBadge label="Our Philosophy" />
              </div>

              <h2
                data-philosophy-heading
                className="max-w-[780px] text-[clamp(40px,3.35vw,64px)] font-medium uppercase leading-[0.985] tracking-normal"
                style={{ fontFamily: '"SF Mono", monospace' }}
              >
                Four Pillars That Define
                <br />
                Everything We Do
              </h2>

              <div
                data-philosophy-grid
                className="mt-16 grid gap-4 sm:mt-24 sm:grid-cols-2 sm:gap-[28px]"
              >
                {philosophy.map((item) => (
                  <motion.article
                    key={item.number}
                    data-philosophy-card
                    whileHover={{ y: -6, scale: 1.02 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ type: "spring", stiffness: 400, damping: 26 }}
                    className="block min-h-[240px] w-full rounded-[7px] bg-surface-base px-5 py-5 text-text-primary transition-colors duration-300 hover:brightness-[0.97] sm:h-[280px] sm:px-6 sm:py-6"
                  >
                    <motion.span
                      whileHover={{ scale: 1.1 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 26,
                      }}
                      className="flex size-10 items-center justify-center rounded-full bg-surface-overlay text-lg font-medium leading-none text-white sm:size-12 sm:text-[22px]"
                    >
                      {item.number}
                    </motion.span>
                    <h3 className="mt-5 mb-4 text-[clamp(18px,1.14vw,22px)] font-normal leading-[1.05] tracking-normal sm:mt-[35px] sm:mb-[25px]">
                      {item.title}
                    </h3>
                    <p className="mt-1 max-w-[400px] text-sm font-normal leading-[1.22] text-text-secondary sm:mt-2 sm:text-[18px]">
                      {item.description}
                    </p>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>

          <section
            ref={timelineRef}
            id="timeline"
            className="px-4 py-20 text-text-primary sm:px-8 sm:py-36"
          >
            <div className="mx-auto max-w-6xl">
              <div className="mb-16 text-center sm:mb-24">
                <div data-timeline-badge className="inline-block">
                  <SectionBadge label="Our Journey" />
                </div>

                <h2
                  data-timeline-heading
                  className="mx-auto mt-6 max-w-[650px] text-[clamp(40px,3.35vw,64px)] font-medium uppercase leading-[0.985] tracking-normal"
                  style={{ fontFamily: '"SF Mono", monospace' }}
                >
                  From Dream
                  <br />
                  to Destination
                </h2>
              </div>

              <div data-timeline-list className="relative">
                <div className="absolute left-[27px] inset-y-0 w-px bg-accent-secondary/15 lg:left-1/2 lg:-ml-px" />

                {timeline.map((item, i) => {
                  const isLeft = i % 2 === 0;
                  return (
                    <motion.div
                      key={item.title}
                      data-timeline-item
                      initial={{
                        opacity: 0,
                        x: isLeft ? -30 : 30,
                        filter: "blur(4px)",
                      }}
                      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      viewport={{ once: true, margin: "0px 0px 20% 0px" }}
                      transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                      className="grid grid-cols-[auto_1fr] pb-14 last:pb-0 lg:grid-cols-[1fr_auto_1fr] lg:pb-20"
                    >
                      <div className="hidden lg:flex lg:items-center lg:pr-10 lg:justify-end">
                        {isLeft ? (
                          <div className="rounded-[7px] bg-surface-raised px-6 py-6">
                            <h3 className="text-[clamp(20px,1.52vw,30px)] font-normal leading-[1.1]">
                              {item.title}
                            </h3>
                            <p className="mt-2 text-sm leading-[1.3] text-text-secondary sm:text-[18px]">
                              {item.description}
                            </p>
                          </div>
                        ) : null}
                      </div>

                      <div className="relative flex flex-col items-center">
                        <div className="absolute inset-y-0 w-px bg-accent-secondary/15 lg:hidden" />
                        <div className="relative z-10 mt-1 flex size-[54px] shrink-0 items-center justify-center rounded-full border-2 border-accent-secondary/15 bg-surface-base">
                          <span className="text-[11px] font-medium leading-none tracking-[0.05em] text-text-tertiary">
                            {item.year}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center pl-6 lg:pl-10">
                        <div
                          className={`w-full rounded-[7px] bg-surface-raised px-5 py-5 transition-colors duration-300 sm:px-6 sm:py-6 ${isLeft ? "lg:hidden" : ""}`}
                        >
                          <h3 className="text-[clamp(20px,1.52vw,30px)] font-normal leading-[1.1]">
                            {item.title}
                          </h3>
                          <p className="mt-2 text-sm leading-[1.3] text-text-secondary sm:mt-3 sm:text-[18px]">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          <section
            ref={founderRef}
            className="relative bg-surface-overlay px-4 py-16 text-white sm:px-8 sm:py-24"
          >
            <div className="grid gap-12 lg:grid-cols-[1fr_0.94fr] lg:gap-20">
              <div className="flex flex-col">
                <div data-founder-badge>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 400, damping: 26 }}
                    className="mb-12 inline-flex h-10 w-fit items-center gap-2.5 rounded-full bg-white/10 py-1 pl-2 pr-4 backdrop-blur-sm"
                  >
                    <span className="flex size-7 items-center justify-center rounded-full bg-white text-surface-overlay">
                      <svg
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
                      </svg>
                    </span>
                    <span className="text-base font-normal leading-none text-white/80">
                      Founder Story
                    </span>
                  </motion.div>
                </div>

                <h2
                  data-founder-heading
                  className="max-w-[650px] text-[clamp(40px,3.35vw,64px)] font-medium uppercase leading-[0.985] tracking-normal"
                  style={{ fontFamily: '"SF Mono", monospace' }}
                >
                  From Dream
                  <br />
                  to Reality
                </h2>

                <div className="mt-8 border-t border-white/10 pt-6 sm:mt-10 sm:pt-8">
                  <h3 className="font-heading text-[clamp(22px,1.6vw,30px)] font-normal italic leading-none text-white">
                    Mustafa Youssef Shali
                  </h3>
                  <p className="mt-3 text-[13px] leading-[1.5] text-white/60 sm:text-sm">
                    Discovered the place in 2019
                  </p>
                  <p className="mt-1 text-[13px] leading-[1.5] text-white/60 sm:text-sm">
                    Egyptian Amazigh businessman
                  </p>
                </div>

                <div data-founder-text className="mt-10 space-y-6 sm:mt-16">
                  <p className="max-w-[600px] text-[clamp(18px,1.14vw,24px)] font-normal leading-[1.3] text-white/80">
                    In 2019,{" "}
                    <strong className="font-heading font-normal italic">
                      Mustafa Youssef Shali
                    </strong>{" "}
                    discovered this place, and from the very first moment he
                    felt he belonged to it. Before the meeting of the lake, the
                    mountains, the sand, and the sunset, a dream was born: to
                    turn this extraordinary place into a hospitality experience
                    that carries the spirit of Siwa and offers luxury
                    hospitality to a different standard.
                  </p>
                  <p className="max-w-[600px] text-[clamp(16px,0.9vw,20px)] font-normal leading-[1.3] text-white/60">
                    The goal was for the guest to live{" "}
                    <strong className="font-heading font-normal italic">
                      the calm of Siwa, its culture, and its nature
                    </strong>
                    , through a luxury that respects the identity of the place —
                    using natural Siwan materials such as kershef, olive wood,
                    and salt, alongside Siwan embroidery and cuisine.
                  </p>
                  <p className="max-w-[600px] text-[clamp(16px,0.9vw,20px)] font-normal leading-[1.3] text-white/60">
                    The road was not easy. Many saw the idea as impossible, but
                    faith in the dream turned the impossible into reality.
                  </p>
                  <p className="max-w-[600px] text-[clamp(16px,0.9vw,20px)] font-normal leading-[1.3] text-white/60">
                    In 2026,{" "}
                    <strong className="font-heading font-normal italic">
                      Breezy Island
                    </strong>{" "}
                    was born; an island that gathers the beauty of the lake, the
                    magic of the sunset, the mountains, and the dunes — the
                    beginning of a bigger dream: building a hospitality brand
                    that carries the spirit of Siwa to the world.
                  </p>
                  <p className="max-w-[600px] text-[clamp(16px,0.9vw,20px)] font-normal leading-[1.3] text-white/60">
                    <strong className="font-heading font-normal italic">
                      And the vision is simple: for Siwa to become, in the eyes
                      of the world… God’s paradise on earth.
                    </strong>
                  </p>
                </div>
              </div>

              <div
                ref={ethosImageRef}
                className="relative min-h-[320px] overflow-hidden rounded-[7px] sm:min-h-[500px] lg:min-h-[740px] will-change-transform"
              >
                <Image
                  src="/images/Owner/IMG-20260815-WA0167.jpg"
                  alt="Mustafa Youssef Shali, founder of Breezy Island luxury resort in Siwa Oasis, Egypt"
                  fill
                  className="object-cover object-center"
                  sizes="(min-width: 1024px) 48vw, 100vw"
                />
              </div>
            </div>
          </section>

          <section
            ref={ctaRef}
            className="relative overflow-hidden bg-surface-base px-4 pb-[clamp(190px,18vw,300px)] pt-20 text-text-primary sm:px-8 sm:pt-36"
          >
            <div className="relative z-10 mx-auto max-w-[900px] text-center">
              <div data-cta-content>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 400, damping: 26 }}
                  className="mb-8 inline-flex h-10 w-fit items-center gap-2.5 rounded-full bg-surface-raised py-1 pl-2 pr-4"
                >
                  <span className="flex size-7 items-center justify-center rounded-full bg-surface-overlay text-white">
                    <svg
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
                    </svg>
                  </span>
                  <span className="text-base font-normal leading-none">
                    Your Story Awaits
                  </span>
                </motion.div>
              </div>

              <h2
                data-cta-content
                className="text-[clamp(40px,4.3vw,86px)] font-normal leading-[0.98] text-center"
                style={{ fontFamily: '"New York", serif' }}
              >
                Every Great Story Begins
                <br />
                with a <span className="italic">Single Step</span>
              </h2>

              <p
                data-cta-content
                className="mx-auto mt-8 max-w-[540px] text-center text-lg font-medium leading-[1.3] text-text-secondary sm:mt-12 sm:text-[clamp(20px,1.2vw,24px)]"
              >
                Come write your chapter in the heart of Siwa. The desert is
                waiting, and the stars are already aligned.
              </p>

              <div
                data-cta-content
                className="mt-10 flex justify-center sm:mt-14"
              >
                <MagneticWrapper>
                  <Link
                    href="/#contact"
                    className="group inline-flex h-14 w-fit items-center gap-4 overflow-hidden rounded-full bg-surface-overlay py-2 pl-3 pr-7 text-base font-medium leading-none no-underline transition duration-200 my-5 hover:opacity-90 active:scale-[0.98] sm:h-16 sm:pr-8 sm:text-lg"
                    style={{ color: "#fff" }}
                  >
                    <span className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white sm:size-11">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="absolute size-4 -rotate-45 text-surface-overlay transition-transform duration-300 ease-out group-hover:translate-x-5 group-hover:-translate-y-5"
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
                        className="absolute size-4 -rotate-45 text-surface-overlay -translate-x-5 translate-y-5 transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0"
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
                    Book Your Stay
                  </Link>
                </MagneticWrapper>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "0px 0px 20% 0px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="pointer-events-none absolute bottom-[5%] left-1/2 z-0 w-full -translate-x-1/2 translate-y-0 select-none leading-none text-text-primary/90"
            >
              <div
                dir="ltr"
                data-brand-logo
                className="flex items-end justify-center w-full"
              >
                <span className="text-[clamp(52px,14vw,360px)] font-heading font-black leading-[0.7]">
                  Breezy
                </span>
                <span className="text-[clamp(52px,14vw,360px)] font-heading font-normal italic leading-[0.7]">
                  Island
                </span>
              </div>
            </motion.div>
          </section>
        </div>
      </main>
    </SmoothScroll>
  );
}

function SectionBadge({ label }: { label: string }) {
  return (
    <motion.div
      whileHover={{ x: 2 }}
      transition={{ type: "spring", stiffness: 400, damping: 26 }}
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
      <span className="text-base font-normal leading-none">{label}</span>
    </motion.div>
  );
}
