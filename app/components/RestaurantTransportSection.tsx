"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  "/images/Facilities/Breakfast/breakfast.jpg",
  "/images/SAC Main Photo.jpg",
];

const restaurantItems = [
  { number: "01", title: "Indoor", detail: "Crafted from olive wood" },
  { number: "02", title: "Outdoor", detail: "Crafted from olive wood" },
  { number: "03", title: "Set + Open", detail: "" },
  { number: "04", title: "Breakfast", detail: "8:00 – 10:30 AM" },
  { number: "05", title: "Lunch by Order", detail: "" },
  { number: "06", title: "Dinner by Order", detail: "" },
];

const transportItems = [
  { number: "07", title: "To the City", detail: "" },
  { number: "08", title: "From the Airport", detail: "" },
  { number: "09", title: "To Any Place", detail: "" },
  { number: "10", title: "Siwa Bus Station", detail: "" },
];

export default function RestaurantTransportSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const restaurantRef = useRef<HTMLDivElement>(null);
  const transportRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [galleryPaused, setGalleryPaused] = useState(false);

  const galleryPrev = () =>
    setGalleryIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length);
  const galleryNext = () =>
    setGalleryIndex((i) => (i + 1) % galleryImages.length);

  useEffect(() => {
    if (galleryPaused) return;
    const id = setInterval(galleryNext, 5000);
    return () => clearInterval(id);
  }, [galleryPaused, galleryIndex]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-dine-badge]", {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "[data-dine-badge]",
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });

        gsap.from("[data-dine-heading]", {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-dine-heading]",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        gsap.from("[data-dine-row-restaurant]", {
          opacity: 0,
          y: 24,
          stagger: 0.06,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: restaurantRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        });

        gsap.from("[data-dine-row-transport]", {
          opacity: 0,
          y: 24,
          stagger: 0.06,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: transportRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        });

        gsap.from("[data-dine-carousel]", {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-dine-carousel]",
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
      id="dining"
      className="relative bg-surface-base px-4 py-24 text-text-primary sm:px-8 sm:py-40"
    >
      <motion.div
        data-dine-badge
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 400, damping: 26 }}
      >
        <SectionBadge label="Restaurant & Transportation" />
      </motion.div>

      <h2
        data-dine-heading
        className="mt-6 max-w-[650px] text-[clamp(40px,3.35vw,64px)] font-medium uppercase leading-[0.985] tracking-normal"
        style={{
          fontFamily: '"SF Mono", monospace',
        }}
      >
        Crafted in Olive Wood,
        <br />
        Bound for Anywhere.
      </h2>

      <div className="mt-12 grid gap-14 sm:mt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        <div
          ref={imageRef}
          data-dine-carousel
          onMouseEnter={() => setGalleryPaused(true)}
          onMouseLeave={() => setGalleryPaused(false)}
          className="relative h-full min-h-[340px] overflow-hidden rounded-[7px] sm:min-h-[520px] lg:min-h-[600px] will-change-transform"
        >
          <div className="absolute inset-0">
            {galleryImages.map((src, i) => (
              <div
                key={src}
                aria-hidden={i !== galleryIndex}
                className={`absolute inset-0 transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  i === galleryIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={src}
                  alt={
                    i === galleryIndex
                      ? "Dining and transportation at Breezy Island resort in Siwa Oasis"
                      : ""
                  }
                  fill
                  className="object-cover object-center"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            ))}
          </div>

          <div className="absolute bottom-3 right-3 z-10 flex items-center gap-2">
            <span className="rounded-full bg-white/85 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-text-primary backdrop-blur-sm">
              {String(galleryIndex + 1).padStart(2, "0")} /{" "}
              {String(galleryImages.length).padStart(2, "0")}
            </span>
            <motion.button
              onClick={galleryPrev}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 400, damping: 26 }}
              aria-label="Previous image"
              className="flex size-9 items-center justify-center rounded-full bg-surface-overlay text-white transition-colors duration-300 hover:bg-surface-base hover:text-text-primary"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="size-3.5 rtl:-scale-x-100"
                aria-hidden="true"
              >
                <path
                  d="M19 12H5M11 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.button>
            <motion.button
              onClick={galleryNext}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 400, damping: 26 }}
              aria-label="Next image"
              className="flex size-9 items-center justify-center rounded-full bg-surface-overlay text-white transition-colors duration-300 hover:bg-surface-base hover:text-text-primary"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="size-3.5 rtl:-scale-x-100"
                aria-hidden="true"
              >
                <path
                  d="M5 12h14M13 18l6-6-6-6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.button>
          </div>
        </div>

        <div className="flex flex-col gap-14">
          <div className="flex flex-col">
            <div data-dine-group className="flex items-center gap-3">
              <span
                className="h-px w-8 bg-text-secondary/30"
                aria-hidden="true"
              />
              <span
                className="text-xs font-medium uppercase tracking-[0.2em] text-text-secondary"
                style={{ fontFamily: '"SF Mono", monospace' }}
              >
                Restaurant
              </span>
            </div>
            <div
              ref={restaurantRef}
              className="mt-6 border-t border-text-secondary/25"
            >
              {restaurantItems.map((item) => (
                <div
                  key={item.number}
                  data-dine-row-restaurant
                  className="group flex items-baseline justify-between gap-6 border-b border-text-secondary/25 py-5"
                >
                  <div className="flex items-baseline gap-4 sm:gap-6">
                    <span
                      className="text-xs font-medium text-text-secondary sm:text-sm"
                      style={{ fontFamily: '"SF Mono", monospace' }}
                    >
                      {item.number}
                    </span>
                    <h3 className="text-lg font-normal leading-none transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-2 sm:text-2xl">
                      {item.title}
                    </h3>
                  </div>
                  {item.detail && (
                    <span
                      className="whitespace-nowrap text-xs text-text-secondary sm:text-sm"
                      style={{ fontFamily: '"SF Mono", monospace' }}
                    >
                      {item.detail}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <div data-dine-group className="flex items-center gap-3">
              <span
                className="h-px w-8 bg-text-secondary/30"
                aria-hidden="true"
              />
              <span
                className="text-xs font-medium uppercase tracking-[0.2em] text-text-secondary"
                style={{ fontFamily: '"SF Mono", monospace' }}
              >
                Transportation
              </span>
            </div>
            <div
              ref={transportRef}
              className="mt-6 border-t border-text-secondary/25"
            >
              {transportItems.map((item) => (
                <div
                  key={item.number}
                  data-dine-row-transport
                  className="group flex items-baseline justify-between gap-6 border-b border-text-secondary/25 py-5"
                >
                  <div className="flex items-baseline gap-4 sm:gap-6">
                    <span
                      className="text-xs font-medium text-text-secondary sm:text-sm"
                      style={{ fontFamily: '"SF Mono", monospace' }}
                    >
                      {item.number}
                    </span>
                    <h3 className="text-lg font-normal leading-none transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-2 sm:text-2xl">
                      {item.title}
                    </h3>
                  </div>
                  {item.detail && (
                    <span
                      className="whitespace-nowrap text-xs text-text-secondary sm:text-sm"
                      style={{ fontFamily: '"SF Mono", monospace' }}
                    >
                      {item.detail}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionBadge({ label }: { label: string }) {
  return (
    <motion.div
      whileHover={{ x: 2 }}
      transition={{ type: "spring", stiffness: 400, damping: 26 }}
      className="inline-flex h-10 w-fit items-center gap-2.5 rounded-full bg-surface-raised py-1 pl-2 pr-4"
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