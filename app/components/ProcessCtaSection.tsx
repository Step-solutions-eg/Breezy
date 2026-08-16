"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);
import Link from "next/link";
import MagneticWrapper from "./MagneticWrapper";

const collaborators = ["A", "B", "C", "D", "E"];

const policies = [
  { label: "Check-in", value: "2 PM" },
  { label: "Check-out", value: "11 AM — late checkout available" },
  { label: "Children", value: "6–10 free, max 1 · 11+ counted as adult" },
  { label: "Pets", value: "Not allowed" },
];

export default function ProcessCtaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(imageRef.current, {
          scale: 1.06,
          ease: "none",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.from("[data-cta-content]", {
          opacity: 0,
          y: 40,
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-surface-base px-4 pb-32 pt-12 text-text-primary sm:px-8 sm:pb-48 sm:pt-20"
    >
      <div className="grid gap-12 lg:grid-cols-[0.98fr_1fr] lg:gap-24">
        <div
          ref={contentRef}
          className="flex min-h-0 flex-col pb-4 sm:min-h-[740px] sm:pb-8"
        >
          <div data-cta-content>
            <SectionBadge label="Escape to Siwa. Book Your Stay Today." />
          </div>

          <div data-cta-content>
            <h2
              className="max-w-[650px] text-[clamp(40px,3.35vw,64px)] font-medium uppercase leading-[0.985] tracking-normal"
              style={{
                fontFamily: '"SF Mono", monospace',
              }}
            >
              Begin Your
              <br />
              Siwa Escape
            </h2>
          </div>

          <div data-cta-content>
            <p className="mt-8 max-w-[660px] text-lg font-medium leading-[1.18] text-text-primary sm:mt-12 sm:text-[clamp(24px,1.52vw,30px)]">
              Trade the noise for silence. Trade the city for the oasis. Your
              room under the stars, your days filled with discovery, your
              evenings wrapped in the warmth of Siwan hospitality.
            </p>
          </div>

          <div data-cta-content className="mb-16">
            <MagneticWrapper className="mt-7">
              <Link
                href="/contact-us"
                className="group inline-flex h-14 w-fit items-center gap-4 overflow-hidden rounded-full bg-surface-overlay py-2 pl-3 pr-7 text-base font-medium leading-none no-underline transition duration-200 hover:opacity-90 active:scale-[0.98] sm:h-16 sm:pr-8 sm:text-lg"
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

          <div data-cta-content className="mt-10 mb-10 max-w-[660px] sm:mb-12">
            <div className="flex items-center gap-3">
              <span
                className="h-px w-8 bg-text-secondary/30"
                aria-hidden="true"
              />
              <span
                className="text-xs font-medium uppercase tracking-[0.2em] text-text-secondary"
                style={{ fontFamily: '"SF Mono", monospace' }}
              >
                Resort Policies
              </span>
            </div>
            <div className="mt-5 border-t border-text-secondary/25">
              {policies.map((policy) => (
                <div
                  key={policy.label}
                  className="flex items-baseline justify-between gap-6 border-b border-text-secondary/25 py-3.5"
                >
                  <span className="text-base font-normal leading-none text-text-primary sm:text-lg">
                    {policy.label}
                  </span>
                  <span
                    className="text-right text-xs font-normal leading-none text-text-secondary sm:text-sm"
                    style={{ fontFamily: '"SF Mono", monospace' }}
                  >
                    {policy.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 sm:mt-auto" data-cta-content>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px 20% 0px" }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="mb-4 text-sm font-medium leading-none text-text-secondary sm:mb-5 sm:text-base"
            >
              Join travelers who found peace in the heart of Siwa
            </motion.p>
            <div className="flex -space-x-3">
              {collaborators.map((label, index) => (
                <motion.span
                  key={label}
                  whileHover={{ scale: 1.15, zIndex: 10 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 26 }}
                  className="flex size-10 items-center justify-center rounded-full border-2 border-dashed border-surface-base bg-surface-overlay text-sm font-bold text-white shadow-sm sm:size-14 sm:text-lg"
                  style={{
                    background:
                      index % 2 === 0
                        ? "linear-gradient(135deg, #2F2E30, oklch(0.42 0.03 70))"
                        : "linear-gradient(135deg, #191919, oklch(0.35 0.012 260))",
                  }}
                >
                  {label}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        <div
          ref={imageRef}
          className="relative min-h-[280px] overflow-hidden rounded-[7px] sm:min-h-[500px] lg:min-h-[858px] will-change-transform"
        >
          <Image
            src="/images/Facilities/Sunset/sunset-1.webp"
            alt="Warm luxury interior at Breezy Island Siwa Oasis retreat with desert view window"
            fill
            className="object-cover object-center"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
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
