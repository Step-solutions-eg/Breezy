"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);
import Image from "next/image";
import Link from "next/link";
import MagneticWrapper from "./MagneticWrapper";

interface Room {
  id: string;
  name: string;
  category: string;
  description: string;
  capacity: number;
  bathrooms: number;
  size: string;
  highlights: string[];
  amenities: string[];
  image: string;
  href: string;
}

const rooms: Room[] = [
  {
    id: "01",
    name: "Palm Courtyard Suite",
    category: "Private Garden Suite",
    description:
      "Step directly into your own private palm garden from this sun-drenched suite. Traditional Siwan architecture meets contemporary comfort, with hand-carved furnishings and a private outdoor shower beneath the fronds.",
    capacity: 2,
    bathrooms: 2,
    size: "1,200",
    highlights: ["Private garden entrance", "Outdoor rain shower", "Hand-carved Siwan headboard", "Courtyard dining"],
    amenities: ["Daily breakfast", "Wi-Fi", "Mini bar", "Air conditioning", "Safe", "Espresso machine"],
    image: "/images/project-stonehaven.jpeg",
    href: "#",
  },
  {
    id: "02",
    name: "Desert Vista Villa",
    category: "Panoramic Villa with Pool",
    description:
      "Perched at the edge of the oasis, this villa offers uninterrupted views of the Great Sand Sea. A private infinity pool, rooftop terrace, and indoor-outdoor living spaces create an immersive desert sanctuary.",
    capacity: 3,
    bathrooms: 3,
    size: "2,400",
    highlights: ["Private infinity pool", "Rooftop terrace", "Panoramic desert views", "Indoor-outdoor living"],
    amenities: ["Daily breakfast", "Wi-Fi", "Mini bar", "Air conditioning", "Private pool", "Butler service"],
    image: "/images/project-stonehaven.jpeg",
    href: "#",
  },
  {
    id: "03",
    name: "Oasis Hideaway Room",
    category: "Garden View Retreat",
    description:
      "Intimate and serene, this room wraps you in warmth with earthy textures, woven textiles, and a view over the lush palm groves. Perfect for solo travelers seeking peace and quiet.",
    capacity: 1,
    bathrooms: 1,
    size: "550",
    highlights: ["Palm grove views", "Hand-woven textiles", "Private terrace", "Rain shower"],
    amenities: ["Daily breakfast", "Wi-Fi", "Mini bar", "Air conditioning", "Safe", "Bicycle"],
    image: "/images/project-stonehaven.jpeg",
    href: "#",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 150, damping: 20 },
  },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 28, mass: 0.8 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.2, ease: "easeInOut" as const },
  },
};

export default function ArticlesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const openModal = (room: Room) => {
    setSelectedRoom(room);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedRoom(null);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils
          .toArray<HTMLElement>("[data-article-image]")
          .forEach((img) => {
            gsap.to(img, {
              scale: 1.08,
              ease: "none",
              scrollTrigger: {
                trigger: img,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            });
          });

        gsap.from("[data-article-badge]", {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "[data-article-badge]",
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });

        gsap.from("[data-article-heading]", {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-article-heading]",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        gsap.from("[data-article-text]", {
          opacity: 0,
          y: 30,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "[data-article-text]",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        gsap.from("[data-article-cta]", {
          opacity: 0,
          y: 30,
          duration: 0.6,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "[data-article-cta]",
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
      id="articles"
      className="relative bg-surface-base px-4 pb-24 pt-6 text-text-primary sm:px-8 sm:pb-36"
    >
      <div className="mb-12 sm:mb-24">
        <div data-article-badge>
          <SectionBadge label="Our Rooms" />
        </div>

        <div className="mt-8 grid gap-8 sm:mt-12 sm:gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h2
              data-article-heading
              className="max-w-[650px] text-[clamp(40px,3.35vw,64px)] font-medium uppercase leading-[0.985] tracking-normal"
              style={{
                fontFamily: '"SF Mono", monospace',
              }}
            >
              Find Your
              <br />
              Sanctuary
            </h2>
            <p
              data-article-text
              className="mt-10 max-w-[760px] text-lg font-medium leading-[1.2] text-text-primary sm:mt-20 sm:text-[22px]"
            >
              Handpicked spaces designed for rest, discovery, and the quiet
              luxury of being nowhere but here.
            </p>
          </div>

          <div data-article-cta>
            <MagneticWrapper>
              <Link
                href="#contact"
                className="group mb-4 inline-flex h-12 w-fit items-center gap-4 overflow-hidden rounded-full bg-surface-overlay py-2 pl-2 pr-5 text-sm font-medium leading-none no-underline transition duration-200 hover:opacity-90 active:scale-[0.98] sm:h-14 sm:pr-6 sm:text-base"
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
                Book Your Stay
              </Link>
            </MagneticWrapper>
          </div>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid gap-5 sm:grid-cols-2 md:grid-cols-3"
      >
        {rooms.map((room) => (
          <motion.div key={room.name} variants={cardVariants}>
            <motion.button
              type="button"
              onClick={() => openModal(room)}
              className="group relative min-h-[440px] block w-full overflow-hidden rounded-[7px] bg-surface-overlay text-white text-left no-underline transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.08)] sm:min-h-[560px] md:min-h-[624px]"
            >
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  data-article-image
                  className="object-cover transition duration-700 group-hover:scale-[1.08]"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
              </div>
              <div className="absolute inset-0 bg-[rgba(8,8,7,0.48)] transition duration-300 group-hover:bg-[rgba(8,8,7,0.4)]" />
              <div className="absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-t from-[rgba(8,8,7,0.72)] via-[rgba(8,8,7,0.34)] to-transparent" />

              <span className="absolute left-4 top-4 rounded-full bg-[rgba(135,132,124,0.82)] px-3 py-2 text-xs font-medium leading-none text-white backdrop-blur-[2px] sm:left-5 sm:top-[21px] sm:px-[18px] sm:py-[11px] sm:text-base">
                {room.category}
              </span>

              <div className="absolute bottom-4 left-4 max-w-[calc(100%-8rem)] sm:bottom-[28px] sm:left-5 sm:max-w-[390px] sm:pr-[86px]">
                <p className="text-xs font-normal leading-none text-white/60 sm:text-base">
                  / {room.id}
                </p>
                <h3 className="mt-2 text-base font-normal leading-[1.08] tracking-normal text-white sm:mt-[15px] sm:text-[22px]">
                  {room.name}
                </h3>
              </div>

              <div className="absolute bottom-4 right-4 sm:bottom-[26px] sm:right-5">
                <div className="flex size-12 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors duration-300 group-hover:bg-white group-hover:text-[#111] sm:size-[75px]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="size-5 -rotate-45 sm:size-[30px]"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 12h14M13 5l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </motion.button>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedRoom && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-4 sm:p-8"
            onClick={closeModal}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[12px] bg-surface-base text-text-primary shadow-[0_32px_100px_rgba(0,0,0,0.4)]"
            >
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 26 }}
                onClick={closeModal}
                className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-white/90 text-text-primary shadow-md backdrop-blur-sm sm:right-5 sm:top-5 sm:size-12"
                aria-label="Close modal"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="sm:w-5 sm:h-5">
                  <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </motion.button>

              <div className="grid md:grid-cols-2">
                <div className="relative min-h-[300px] md:min-h-full">
                  <Image
                    src={selectedRoom.image}
                    alt={selectedRoom.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent md:bg-gradient-to-r md:from-black/30 md:to-transparent" />
                </div>

                <div className="flex flex-col gap-6 p-6 sm:p-8 md:gap-8 md:p-10">
                  <div>
                    <p className="mb-2 text-xs font-medium leading-none text-text-tertiary sm:text-sm">
                      / {selectedRoom.id}
                    </p>
                    <h2 className="text-2xl font-normal leading-[1.05] text-text-primary sm:text-3xl md:text-4xl">
                      {selectedRoom.name}
                    </h2>
                    <p className="mt-1 text-sm font-medium leading-none text-text-secondary sm:text-base">
                      {selectedRoom.category}
                    </p>
                  </div>

                  <p className="text-sm leading-[1.3] text-text-primary sm:text-base">
                    {selectedRoom.description}
                  </p>

                  <div className="grid grid-cols-3 gap-4 rounded-[7px] bg-surface-raised p-4 sm:p-5">
                    <div>
                      <p className="text-lg font-semibold leading-none text-text-primary sm:text-2xl">{selectedRoom.capacity}</p>
                      <p className="mt-1 text-xs font-medium leading-none text-text-secondary sm:text-sm">Guests</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold leading-none text-text-primary sm:text-2xl">{selectedRoom.bathrooms}</p>
                      <p className="mt-1 text-xs font-medium leading-none text-text-secondary sm:text-sm">Bathrooms</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold leading-none text-text-primary sm:text-2xl">{selectedRoom.size}</p>
                      <p className="mt-1 text-xs font-medium leading-none text-text-secondary sm:text-sm">Sq Ft</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-text-tertiary sm:text-sm">
                      Highlights
                    </h4>
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {selectedRoom.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2 text-xs sm:text-sm">
                          <span className="size-1.5 shrink-0 rounded-full bg-accent" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-text-tertiary sm:text-sm">
                      Amenities
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedRoom.amenities.map((a) => (
                        <span
                          key={a}
                          className="rounded-full border border-accent-secondary/30 px-3 py-1.5 text-xs font-medium text-text-secondary sm:text-sm"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>

                  <MagneticWrapper>
                    <Link
                      href={selectedRoom.href}
                      className="group inline-flex h-12 w-fit items-center gap-4 overflow-hidden rounded-full bg-surface-overlay py-2 pl-2 pr-5 text-sm font-medium leading-none text-white no-underline transition duration-200 hover:opacity-90 active:scale-[0.98] sm:h-14 sm:pr-6 sm:text-base"
                    >
                      <span className="relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white sm:size-10">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="absolute size-3 -rotate-45 text-surface-overlay transition-transform duration-300 ease-out group-hover:translate-x-5 group-hover:-translate-y-5 sm:size-4"
                        >
                          <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="absolute size-3 -rotate-45 text-surface-overlay -translate-x-5 translate-y-5 transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0 sm:size-4"
                        >
                          <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      Book This Room
                    </Link>
                  </MagneticWrapper>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
