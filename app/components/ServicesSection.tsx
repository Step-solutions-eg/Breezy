"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  "/images/Facilities/Pool/pool.jpg",
  "/images/Facilities/Pool/pool-1.jpg",
  "/images/Facilities/Breakfast/breakfast.jpg",
  "/images/Facilities/Boat and kaiak/boat.jpg",
  "/images/Facilities/Boat and kaiak/kaiak.jpg",
  "/images/Facilities/Sunset/sunset.jpg",
  "/images/Facilities/Sunset/sunset-1.jpg",
];

const services = [
  {
    number: "01",
    title: "Swimming Pool",
    image: "/images/Facilities/Pool/pool.jpg",
  },
  { number: "02", title: "Restaurant 24/7" },
  { number: "03", title: "Café" },
  { number: "04", title: "Bar" },
  {
    number: "05",
    title: "Breakfast",
    image: "/images/Facilities/Breakfast/breakfast.jpg",
  },
  { number: "06", title: "Beach Volleyball" },
  { number: "07", title: "Room Service" },
  { number: "08", title: "Wi-Fi" },
  { number: "09", title: "Parking" },
  { number: "10", title: "Reception" },
  {
    number: "11",
    title: "Garden — Swings, Bird Garden, Photo Spot & Flower Garden",
  },
  { number: "12", title: "Swimming Lake" },
  { number: "13", title: "Laundry" },
  {
    number: "14",
    title: "Water Sports — Kayak, Pedal Boats, Boat Trips & Car Lake",
    image: "/images/Facilities/Boat and kaiak/boat.jpg",
  },
  { number: "15", title: "Beach Buggy" },
  { number: "16", title: "Camels & Horses" },
  { number: "17", title: "Airport Transportation" },
  { number: "18", title: "Ask Reception" },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const serviceGridRef = useRef<HTMLDivElement>(null);
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
        gsap.from(imageRef.current, {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        gsap.to(imageRef.current, {
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.from("[data-service-card]", {
          opacity: 0,
          y: 40,
          stagger: 0.12,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: serviceGridRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        gsap.from("[data-service-badge]", {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "[data-service-badge]",
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });

        gsap.from("[data-service-heading]", {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-service-heading]",
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
      id="services"
      className="relative bg-surface-base px-4 py-20 text-text-primary sm:px-8 sm:py-36"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute -left-32 bottom-0 w-[500px] h-[600px] opacity-[0.08] sm:w-[800px] sm:h-[900px]">
          <Image
            src="/images/tree only.svg"
            alt=""
            fill
            className="object-contain object-left-bottom"
            sizes="500px"
            aria-hidden="true"
          />
        </div>
      </div>
      <div>
        <motion.div
          data-service-badge
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 26 }}
          >
            <SectionBadge label="Amenities & Experiences" />
          </motion.div>

          <h2
            data-service-heading
            className="max-w-[650px] text-[clamp(40px,3.35vw,64px)] font-medium uppercase leading-[0.985] tracking-normal"
            style={{
              fontFamily: '"SF Mono", monospace',
            }}
          >
            Designed for Your
            <br />
            Ultimate Comfort
          </h2>

          <div className="mt-10 grid gap-12 sm:mt-16 lg:grid-cols-[1fr_0.94fr] lg:gap-20">
          <div>
          <div
            ref={serviceGridRef}
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4"
          >
            {services.map((service) => (
              <motion.article
                key={service.number}
                data-service-card
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: "spring", stiffness: 400, damping: 26 }}
                role={service.image ? "button" : undefined}
                tabIndex={service.image ? 0 : undefined}
                onClick={() => {
                  if (!service.image) return;
                  const idx = galleryImages.indexOf(service.image);
                  if (idx !== -1) setGalleryIndex(idx);
                }}
                onKeyDown={(e) => {
                  if (e.key !== "Enter" && e.key !== " ") return;
                  e.preventDefault();
                  if (!service.image) return;
                  const idx = galleryImages.indexOf(service.image);
                  if (idx !== -1) setGalleryIndex(idx);
                }}
                className={`block min-h-[110px] w-full rounded-[7px] bg-surface-raised px-3 py-3 text-text-primary transition-colors duration-300 hover:brightness-[0.96] sm:min-h-[120px] sm:px-4 sm:py-4 ${
                  service.image ? "cursor-pointer" : ""
                }`}
              >
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 26 }}
                  className="flex size-8 items-center justify-center rounded-full bg-white text-base font-medium leading-none text-text-primary sm:size-9 sm:text-lg"
                >
                  {service.number}
                </motion.span>
                <h3 className="mt-3 max-w-[260px] text-[15px] font-normal leading-[1.15] tracking-normal sm:mt-4 sm:text-base">
                  {service.title}
                </h3>
              </motion.article>
            ))}
          </div>
        </div>

        <div
          ref={imageRef}
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
                      ? (services.find((s) => s.image === galleryImages[i])
                            ?.title
                          ? `${services.find((s) => s.image === galleryImages[i])!.title} at Breezy Island resort in Siwa Oasis`
                          : "Facility at Breezy Island resort in Siwa Oasis")
                      : ""
                  }
                  fill
                  priority={i === 0}
                  className="object-cover object-center"
                  sizes="(min-width: 1024px) 48vw, 100vw"
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
