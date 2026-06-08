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
      className="relative bg-surface-base px-8 pb-36 pt-20 text-text-primary md:px-8"
    >
      <div className="grid gap-16 lg:grid-cols-[0.98fr_1fr] lg:gap-24">
        <div ref={contentRef} className="flex min-h-[740px] flex-col pb-8">
          <div data-cta-content>
            <SectionBadge label="Escape to Siwa. Book Your Stay Today." />
          </div>

          <div data-cta-content>
            <h2
              className="max-w-[650px] text-[clamp(48px,3.35vw,64px)] font-medium uppercase leading-[0.985] tracking-normal"
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
            <p className="mt-12 max-w-[660px] text-[clamp(24px,1.52vw,30px)] font-medium leading-[1.18] text-text-primary">
              Trade the noise for silence. Trade the city for the oasis.
              Your room under the stars, your days filled with discovery, your
              evenings wrapped in the warmth of Siwan hospitality.
            </p>
          </div>

          <div data-cta-content>
            <MagneticWrapper>
              <Link
                href="#contact"
                className="group mt-16 inline-flex h-14 w-fit items-center gap-4 overflow-hidden rounded-full bg-surface-overlay py-2 pl-2 pr-6 text-base font-medium leading-none no-underline transition duration-200 hover:opacity-90 active:scale-[0.98]"
                style={{ color: "#fff" }}
              >
                <span className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
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
                Reserve Your Stay
              </Link>
            </MagneticWrapper>
          </div>

          <div className="mt-auto" data-cta-content>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="mb-5 text-base font-medium leading-none text-text-secondary"
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
              ))}
            </div>
          </div>
        </div>

        <div
          ref={imageRef}
          className="relative min-h-[720px] overflow-hidden rounded-[7px] lg:min-h-[858px] will-change-transform"
        >
          <Image
            src="/images/4.jpeg"
            alt="Warm wood interior detail beside a large mountain-view window"
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
