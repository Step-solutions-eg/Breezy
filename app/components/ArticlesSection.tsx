"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import MagneticWrapper from "./MagneticWrapper";

gsap.registerPlugin(ScrollTrigger);

const sharedAmenities = [
  "Mini bar",
  "Air conditioning",
  "Iron",
  "Heater",
  "Hair dryer",
  "Free Wi-Fi",
  "Room service",
  "Complimentary water, tea, and Nescafé",
];

const hotelFeatures = [
  "Bird garden",
  "Horse riding / horses available",
  "Boats, pedal boats, and kayaks",
  "Natural water swimming pool",
  "Parking area",
  "24-hour restaurant",
  "Bazaar / gift shop",
  "Poolside café (Pool Coffee)",
];

interface Room {
  name: string;
  category: string;
  image: string;
  description: string;
  highlights: string[];
}

const rooms: Room[] = [
  {
    name: "Honeymoon Room",
    category: "Premium Suite",
    image: "/images/3.jpeg",
    description: "The largest room in the hotel, designed for romance and relaxation.",
    highlights: [
      "Balcony overlooking the lake",
      "Bathroom with a jacuzzi",
      "Traditional Arabic-style seating area",
    ],
  },
  {
    name: "Sedra Room",
    category: "Lake View",
    image: "/images/4.jpeg",
    description: "A serene retreat with stunning views of the lake and landscaped gardens.",
    highlights: [
      "Balcony overlooking the lake",
      "Views of landscaped gardens",
    ],
  },
  {
    name: "Salty Room",
    category: "Unique Experience",
    image: "/images/project-stonehaven.jpeg",
    description: "A one-of-a-kind room with walls made of salt for a truly unique stay.",
    highlights: [
      "Walls made of salt",
    ],
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

export default function ArticlesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  useEffect(() => {
    const lenis = (window as unknown as Record<string, unknown>).__lenis as { stop: () => void; start: () => void } | undefined;
    if (selectedRoom) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "";
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [selectedRoom]);

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
      className="relative bg-surface-base px-5 pb-24 pt-4 text-text-primary md:px-8 md:pb-36 md:pt-6"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute opacity-[0.08]" style={{ bottom: "230px", right: "-54px", width: "800px", height: "1000px" }}>
          <Image
            src="/images/filamingo only.svg"
            alt=""
            fill
            className="object-contain object-center"
            sizes="700px"
            aria-hidden="true"
          />
        </div>
      </div>
      <div className="mb-12 md:mb-24">
        <div data-article-badge>
            <SectionBadge label="Our Rooms" />
        </div>

        <div className="mt-8 grid gap-8 md:mt-12 md:gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h2
              data-article-heading
              className="max-w-[650px] text-[clamp(36px,3.35vw,64px)] font-medium uppercase leading-[0.985] tracking-normal md:text-[clamp(48px,3.35vw,64px)]"
              style={{
                fontFamily: '"SF Mono", monospace',
              }}
            >
              Discover the
              <br />
              Perfect Room
            </h2>
            <p
              data-article-text
              className="mt-10 max-w-[760px] text-base font-medium leading-[1.3] text-text-primary md:mt-20 md:text-[22px]"
            >
            Curated spaces designed for rest and wonder
            <br className="hidden md:block" />
            each room tells its own story of comfort and style.
            </p>
          </div>

          <div data-article-cta>
            <MagneticWrapper>
              <Link
                href="/rooms"
                className="group mb-4 inline-flex h-12 w-fit cursor-pointer items-center gap-3 overflow-hidden rounded-full bg-surface-overlay py-2 pl-2 pr-5 text-sm font-medium leading-none text-white no-underline transition duration-200 hover:opacity-90 active:scale-[0.98] md:h-14 md:pr-6 md:text-base md:gap-4"
                style={{ color: "#fff" }}
              >
                <span className="relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white md:size-10">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="absolute size-3 -rotate-45 text-surface-overlay transition-transform duration-300 ease-out group-hover:translate-x-5 group-hover:-translate-y-5 md:size-4"
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
                    className="absolute size-3 -rotate-45 text-surface-overlay -translate-x-5 translate-y-5 transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0 md:size-4"
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
                View Room
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
        className="grid gap-4 md:gap-5 md:grid-cols-3"
      >
        {rooms.map((room, index) => (
          <motion.div key={room.name} variants={cardVariants}>
            <div
              onClick={() => setSelectedRoom(room)}
              className="group relative min-h-[400px] block cursor-pointer overflow-hidden rounded-[7px] bg-surface-overlay text-white no-underline transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.08)] md:min-h-[624px]"
            >
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  data-article-image
                  className="object-cover transition duration-700 group-hover:scale-[1.08]"
                  style={{
                    objectPosition:
                      index === 0
                        ? "44% 50%"
                        : index === 1
                          ? "52% 50%"
                          : "68% 50%",
                  }}
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
              </div>
              <div className="absolute inset-0 bg-[rgba(8,8,7,0.48)] transition duration-300 group-hover:bg-[rgba(8,8,7,0.4)]" />
              <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[rgba(8,8,7,0.72)] via-[rgba(8,8,7,0.34)] to-transparent md:h-[46%]" />

              <motion.span
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 26 }}
                className="absolute left-3 top-3 rounded-full bg-[rgba(135,132,124,0.82)] px-3 py-1.5 text-[11px] font-medium leading-none text-white backdrop-blur-[2px] md:left-5 md:top-[21px] md:px-[18px] md:py-[11px] md:text-base"
              >
                {room.category}
              </motion.span>

              <div className="absolute bottom-4 left-4 right-4 md:bottom-[28px] md:left-5 md:right-5 md:pr-[86px]">
                <motion.h3
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 26 }}
                  className="text-lg font-normal leading-[1.08] tracking-normal text-white md:text-[22px]"
                >
                  {room.name}
                </motion.h3>
                <p className="mt-1.5 text-xs leading-[1.3] text-white/60 line-clamp-2 md:mt-2 md:text-sm">
                  {room.description}
                </p>
                <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1 md:mt-3 md:gap-x-3">
                  {room.highlights.map((h) => (
                    <span
                      key={h}
                      className="rounded-full bg-white/10 px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.08em] text-white/70 backdrop-blur-sm md:px-2.5 md:text-[10px]"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="absolute right-3 top-3 md:bottom-[26px] md:right-5 md:top-auto">
                <MagneticWrapper>
                  <div
                    className="flex size-10 items-center justify-center rounded-full bg-surface-overlay text-white hover:bg-surface-base hover:text-text-primary md:size-[75px]"
                    style={{ transition: "background-color 0.3s, color 0.3s" }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="size-4 -rotate-45 md:size-[30px]"
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
                </MagneticWrapper>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedRoom && (
          <RoomModal
            room={selectedRoom}
            onClose={() => setSelectedRoom(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function RoomModal({
  room,
  onClose,
}: {
  room: Room;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const lastTouchYRef = useRef<number | null>(null);

  const getScrollTarget = () => {
    if (typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches) {
      return detailsRef.current;
    }

    return panelRef.current;
  };

  const scrollModalBy = (deltaY: number) => {
    const target = getScrollTarget();
    if (!target) return;
    target.scrollTop += deltaY;
  };

  return (
    <motion.div
      data-lenis-prevent
      data-lenis-prevent-wheel
      data-lenis-prevent-touch
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed inset-0 z-50 flex touch-pan-y items-start justify-center overflow-hidden bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
    >
      <motion.div
        ref={panelRef}
        data-lenis-prevent
        data-lenis-prevent-wheel
        data-lenis-prevent-touch
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 250, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => {
          e.preventDefault();
          e.stopPropagation();
          scrollModalBy(e.deltaY);
        }}
        onTouchStart={(e) => {
          e.stopPropagation();
          lastTouchYRef.current = e.touches[0]?.clientY ?? null;
        }}
        onTouchMove={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const currentY = e.touches[0]?.clientY;
          if (currentY == null || lastTouchYRef.current == null) return;
          scrollModalBy(lastTouchYRef.current - currentY);
          lastTouchYRef.current = currentY;
        }}
        onTouchEnd={() => {
          lastTouchYRef.current = null;
        }}
        className="relative flex min-h-[100dvh] max-h-[100dvh] w-full touch-pan-y flex-col overflow-y-auto overscroll-contain rounded-none bg-surface-base text-text-primary [-webkit-overflow-scrolling:touch] md:min-h-0 md:max-w-5xl md:max-h-[90dvh] md:flex-row md:overflow-hidden md:rounded-[7px]"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex size-9 items-center justify-center rounded-full bg-surface-overlay text-white hover:bg-surface-base hover:text-text-primary transition-colors duration-200"
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="relative h-[34dvh] min-h-[220px] w-full shrink-0 md:h-auto md:min-h-full md:w-1/2">
          <Image
            src={room.image}
            alt={room.name}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface-base hidden md:block" />
        </div>

        <div
          ref={detailsRef}
          data-lenis-prevent
          data-lenis-prevent-wheel
          data-lenis-prevent-touch
          className="min-h-0 w-full touch-pan-y px-5 pb-[max(6rem,env(safe-area-inset-bottom))] pt-5 md:max-h-[90dvh] md:w-1/2 md:overflow-y-auto md:overscroll-contain md:px-10 md:py-12 md:[-webkit-overflow-scrolling:touch]"
        >
            <span className="inline-flex rounded-full bg-surface-raised px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] text-text-primary md:px-3 md:text-[10px]">
              {room.category}
            </span>

            <h2
              className="mt-3 text-[clamp(24px,2.5vw,42px)] font-medium uppercase leading-[0.985] tracking-normal md:mt-4 md:text-[clamp(32px,2.5vw,42px)]"
              style={{ fontFamily: '"SF Mono", monospace' }}
            >
              {room.name}
            </h2>

            <p className="mt-3 text-sm font-normal leading-relaxed text-text-secondary md:mt-5 md:text-base">
              {room.description}
            </p>

            {room.highlights.length > 0 && (
              <div className="mt-6 md:mt-8">
                <h3 className="text-xs font-medium uppercase tracking-[0.12em] text-text-tertiary md:text-sm md:tracking-[0.1em]">
                  Room Highlights
                </h3>
                <ul className="mt-2 space-y-1.5 md:mt-3 md:space-y-2">
                  {room.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-xs font-normal text-text-secondary md:text-sm md:gap-2.5">
                      <svg className="mt-0.5 size-3.5 shrink-0 text-accent md:size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6">
              <h3 className="text-xs font-medium uppercase tracking-[0.12em] text-text-tertiary md:text-sm md:tracking-[0.1em]">
                Amenities
              </h3>
              <div className="mt-2 flex flex-wrap gap-2 md:mt-3 md:grid md:grid-cols-2 md:gap-x-4 md:gap-y-2">
                {sharedAmenities.map((a) => (
                  <span key={a} className="inline-flex items-center gap-1.5 rounded-full border border-border-default/20 px-3 py-1 text-xs font-normal text-text-secondary md:border-none md:px-0 md:py-0 md:text-sm md:gap-2">
                    <svg className="size-3 shrink-0 text-accent-secondary md:size-3.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    {a}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-5 pb-8 border-t border-border-default/20 md:mt-8 md:pt-6 md:pb-0">
              <h3 className="text-xs font-medium uppercase tracking-[0.12em] text-text-tertiary md:text-sm md:tracking-[0.1em]">
                Hotel Features
              </h3>
              <div className="mt-2 flex flex-wrap gap-2 md:mt-3 md:grid md:grid-cols-2 md:gap-x-4 md:gap-y-2">
                {hotelFeatures.map((f) => (
                  <span key={f} className="inline-flex items-center gap-1.5 rounded-full border border-border-default/20 px-3 py-1 text-xs font-normal text-text-secondary md:border-none md:px-0 md:py-0 md:text-sm md:gap-2">
                    <svg className="size-3 shrink-0 text-accent md:size-3.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M22 4L12 14.01l-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {f}
                  </span>
                ))}
              </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
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
