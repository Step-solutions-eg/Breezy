"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Link from "next/link";
import MagneticWrapper from "./MagneticWrapper";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(bgRef.current, {
          scale: 1.3,
          duration: 1.2,
          ease: "power3.out",
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="home"
      className="sticky top-0 z-0 h-dvh min-h-[600px] w-full overflow-hidden bg-surface-overlay sm:h-screen sm:min-h-[652px]"
    >
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(/images/hero-interior.jpeg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>
      <div className="absolute inset-0 bg-[rgba(12,10,8,0.55)] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(12,10,8,0.50)] via-[rgba(12,10,8,0.20)] to-[rgba(12,10,8,0.35)] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[rgba(12,10,8,0.55)] via-[rgba(12,10,8,0.20)] to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.6 }}
        className="relative z-10 h-full px-4 text-white sm:px-8"
      >
        <div className="hero-content w-[95vw] mx-auto max-w-[820px] pointer-events-auto pt-24 sm:mx-0 sm:ml-8 sm:w-auto sm:pt-32">
          <h1 className="font-heading font-normal leading-[1.02] tracking-[-0.02em]">
            <span className="block text-[clamp(22px,3vw,44px)]">
              The tranquility and magic of nature
            </span>
            <span className="block text-[clamp(22px,3vw,44px)] font-normal italic">
              in Siwa Oasis.
            </span>
          </h1>

          <p
            className="mt-5 max-w-[560px] text-[0.95rem] font-normal leading-[1.5] tracking-[-0.01em] sm:mt-7 sm:text-[clamp(13px,1.2vw,15px)]"
            style={{
              fontFamily: '"SF Mono", monospace',
            }}
          >
            An island surrounded by water, where warm sunsets meet the stillness
            of nature, you&rsquo;ll find a place designed to give you the
            comfort you&rsquo;ve been looking for.
          </p>

          <p
            className="mt-4 max-w-[520px] text-[0.8rem] font-normal leading-[1.55] text-white/75 sm:mt-5 sm:text-[clamp(11px,1vw,13px)]"
            style={{
              fontFamily: '"SF Mono", monospace',
            }}
          >
            Luxurious rooms, peaceful surroundings, and a stay that feels like
            home&hellip; not a hotel.
          </p>

          <p className="mt-5 font-heading font-normal italic text-[clamp(13px,1.3vw,16px)] leading-[1.25] text-white/90 sm:mt-6">
            Leave the world behind and let Breezy Island give you time for
            yourself.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-4 sm:mt-9">
            <MagneticWrapper>
              <Link
                href="/contact-us"
                className="group inline-flex w-fit items-center gap-4 overflow-hidden rounded-full bg-white py-2 pl-2 pr-6 text-base font-medium leading-none no-underline transition duration-200 hover:bg-surface-raised active:scale-[0.98]"
                style={{ color: "#503A26" }}
              >
                <span className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-overlay">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="absolute size-4 -rotate-45 transition-transform duration-300 ease-out group-hover:translate-x-5 group-hover:-translate-y-5"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 12h14M13 5l7 7-7 7"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="absolute size-4 -rotate-45 -translate-x-5 translate-y-5 transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 12h14M13 5l7 7-7 7"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="whitespace-nowrap text-base font-medium leading-none">
                  Book Your Stay
                </span>
              </Link>
            </MagneticWrapper>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 1 }}
          className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 select-none leading-none w-full"
        >
          <div
            data-brand-logo
            className="flex items-end justify-center w-full"
            dir="ltr"
          >
            <span className="text-[clamp(40px,12vw,420px)] max-sm:text-[clamp(40px,16vw,1000px)] font-heading font-black leading-[0.7]">
              Breezy
            </span>
            <span className="text-[clamp(40px,12vw,420px)] max-sm:text-[clamp(40px,16vw,1000px)] font-heading font-normal italic leading-[0.7]">
              Island
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
