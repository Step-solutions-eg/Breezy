"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);
import Link from "next/link";
import MagneticWrapper from "./MagneticWrapper";

const faqs = [
  {
    question: "How do I get to Breezy Island?",
    answer:
      "Siwa Oasis is approximately a 7-hour drive from Cairo or a 4-hour drive from Marsa Matrouh. We can arrange private transfers or help coordinate your journey from either city.",
  },
  {
    question: "What is the best time to visit Siwa?",
    answer:
      "The ideal time is between October and April when temperatures are mild and pleasant. Winter months offer cool desert nights perfect for campfires and stargazing.",
  },
  {
    question: "Do you offer airport transfers?",
    answer:
      "Yes. We provide private airport transfers from Marsa Matrouh International Airport and can arrange pickup from Cairo or Alexandria upon request.",
  },
  {
    question: "What amenities are included in my stay?",
    answer:
      "Every stay includes daily breakfast, complimentary Wi-Fi, access to our spa facilities, guided property tours, and 24-hour concierge service.",
  },
  {
    question: "Is the hotel suitable for families?",
    answer:
      "Absolutely. We offer family-friendly suites, children's activities, and can arrange private excursions suitable for all ages.",
  },
  {
    question: "What dining options are available?",
    answer:
      "Our restaurant serves authentic Siwan cuisine made from locally sourced ingredients. We also offer private dining experiences, cooking classes, and sunset dinners in the dunes.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-faq-item]", {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      gsap.from("[data-faq-badge]", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "[data-faq-badge]",
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });

      gsap.from("[data-faq-heading]", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-faq-heading]",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      gsap.from("[data-faq-text]", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "[data-faq-text]",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      gsap.from("[data-faq-cta]", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "[data-faq-cta]",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative bg-surface-base px-4 py-16 text-text-primary sm:px-8 sm:py-24"
    >
      <div className="grid gap-12 lg:grid-cols-[0.98fr_1fr] lg:gap-24">
        <div className="pt-1">
          <div data-faq-badge>
            <SectionBadge label="FAQ'S" />
          </div>

          <h2
            data-faq-heading
            className="max-w-[650px] text-[clamp(40px,3.35vw,64px)] font-medium uppercase leading-[0.985] tracking-normal"
            style={{
                fontFamily: '"SF Mono", monospace',
            }}
          >
            Your Questions,
            <br />
            Answered
          </h2>

          <p data-faq-text className="mt-10 max-w-[760px] text-lg font-medium leading-[1.2] text-text-secondary sm:mt-20 sm:text-[22px]">
            Everything you need to know about planning your perfect stay at
            Breezy Island.
          </p>

          <div data-faq-cta>
            <MagneticWrapper>
            <Link
              href="#services"
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
               Contact Our Concierge
            </Link>
          </MagneticWrapper>
          </div>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={faq.question} data-faq-item className="rounded-[7px] bg-black/5 p-3">
                <motion.button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex min-h-[56px] w-full items-center justify-between gap-3 px-3 text-left rounded-[7px] sm:min-h-[60px] sm:gap-5"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-medium leading-tight sm:text-base">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-base text-sm font-medium leading-none sm:size-14 sm:text-base"
                  >
                    +
                  </motion.span>
                </motion.button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 rounded-[7px] bg-surface-base px-4 py-5 sm:px-5 sm:py-7">
                        <p className="max-w-[780px] text-sm font-medium leading-[1.16] sm:text-[clamp(20px,1.2vw,24px)]">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SectionBadge({ label }: { label: string }) {
  return (
    <div className="mb-12 inline-flex h-10 w-fit items-center gap-2.5 rounded-full bg-surface-raised py-1 pl-2 pr-4">
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
      <span className="text-base font-normal leading-none">{label}</span>
    </div>
  );
}
