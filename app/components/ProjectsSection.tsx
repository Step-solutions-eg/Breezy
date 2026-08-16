"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import MagneticWrapper from "./MagneticWrapper";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "01",
    name: "Standard Room",
    category: "Classic",
    guests: 2,
    bathrooms: 1,
    size: "32",
    image: "/images/Rooms/Standard/IMG-20260815-WA0111.jpg",
    thumbnail: "/images/Rooms/Standard/IMG-20260815-WA0111.jpg",
  },
  {
    id: "02",
    name: "Salty Room",
    category: "Unique Experience",
    guests: 2,
    bathrooms: 1,
    size: "32",
    image: "/images/Rooms/Salty/IMG-20260815-WA0070.jpg",
    thumbnail: "/images/Rooms/Salty/IMG-20260815-WA0070.jpg",
  },
  {
    id: "03",
    name: "Cedra & Honeymoon Rooms",
    category: "In the Heart of the Lake",
    guests: 2,
    bathrooms: 1,
    size: "40",
    image: "/images/Rooms/Cedra and honeymoon/IMG-20260815-WA0089.jpg",
    thumbnail: "/images/Rooms/Cedra and honeymoon/IMG-20260815-WA0089.jpg",
  },
];

const fadeEase = [0.32, 0.72, 0, 1] as const;

export default function ProjectsSection() {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const prev = () =>
    setCurrent((item) => (item - 1 + projects.length) % projects.length);
  const next = () => setCurrent((item) => (item + 1) % projects.length);

  const project = projects[current];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(imageRef.current, {
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.from("[data-project-label]", {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: sectionRef },
  );

  useEffect(() => {
    const targets = document.querySelectorAll("[data-stat-project-value]");
    targets.forEach((el) => {
      const target = parseFloat(el.getAttribute("data-stat-project-target") || "0");
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 1.1,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = Math.round(obj.val).toString();
        },
      });
    });
  }, [current]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative h-dvh min-h-[600px] w-full overflow-hidden bg-surface-overlay text-white md:min-h-[760px]"
    >
      <div ref={imageRef} className="absolute inset-0 will-change-transform">
        <div className="absolute inset-0">
        {projects.map((p, i) => (
          <div
            key={p.id}
            aria-hidden={i !== current}
            className={`absolute inset-0 transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={p.image}
              alt={i === current ? p.name : ""}
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
        ))}
      </div>
        <div className="absolute inset-0 bg-[rgba(8,7,6,0.52)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(8,7,6,0.7)] via-[rgba(8,7,6,0.32)] to-[rgba(8,7,6,0.18)]" />
        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-[rgba(8,7,6,0.42)] to-transparent" />
      </div>

      <div className="relative z-10 flex h-full flex-col px-4 py-6 sm:px-[30px] sm:py-[31px]">
        <span
          data-project-label
          className="text-sm font-medium leading-none tracking-normal sm:absolute sm:left-[30px] sm:top-9 sm:text-base"
        >
          Our Rooms
        </span>

        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={`card-${project.id}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.5, ease: fadeEase }}
            className="hidden md:absolute md:right-[30px] md:top-[31px] md:grid md:h-[145px] md:w-[430px] md:grid-cols-[124px_1fr] md:gap-5 md:rounded-[7px] md:bg-white/12 md:p-3 md:shadow-[0_24px_70px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.24)] md:backdrop-blur-xl md:backdrop-saturate-150"
          >
            <div className="relative h-[120px] overflow-hidden rounded-[7px]">
              <Image
                src={project.thumbnail}
                alt={project.category}
                fill
                className="object-cover"
                sizes="124px"
              />
            </div>
            <div className="pt-1">
              <p className="mb-[22px] text-[25px] font-medium leading-none">
                / {project.id}
              </p>
              <p className="max-w-[165px] text-[24px] font-semibold leading-[0.95]">
                {project.category}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={`content-${project.id}`}
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -22 }}
            transition={{ duration: 0.55, ease: fadeEase }}
            className="mt-6 sm:mt-0 sm:absolute sm:left-[30px] sm:top-[31.4%] sm:w-[min(780px,calc(100vw-60px))]"
          >
            <h2 className="mb-4 max-w-[650px] text-[clamp(32px,5.25vw,100px)] font-bold leading-[0.94] tracking-normal sm:mb-[38px] sm:text-[clamp(72px,5.25vw,100px)]">
              {project.name}
            </h2>

            <div className="mb-8 grid max-w-[780px] grid-cols-1 gap-6 sm:mb-[58px] sm:grid-cols-3 sm:gap-[42px]">
              <ProjectStat value={project.guests} label="Guests" />
              <ProjectStat value={project.bathrooms} label="Bathrooms" />
              <ProjectStat value={parseInt(project.size, 10)} label="m²" />
            </div>

            <div>
              <MagneticWrapper>
                <Link
                  href="/contact-us"
                  className="group inline-flex h-10 items-center gap-3 overflow-hidden rounded-full bg-white py-1.5 pl-1.5 pr-4 text-xs font-medium leading-none no-underline transition duration-200 hover:bg-surface-base active:scale-[0.98] sm:h-14 sm:gap-4 sm:py-2 sm:pl-2 sm:pr-6 sm:text-base"
                  style={{ color: "#503A26" }}
                >
                  <span className="relative flex size-6 items-center justify-center overflow-hidden rounded-full bg-surface-overlay sm:size-10">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="absolute size-2 -rotate-45 transition-transform duration-300 ease-out group-hover:translate-x-5 group-hover:-translate-y-5 sm:size-4"
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
                      className="absolute size-2 -rotate-45 -translate-x-5 translate-y-5 transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0 sm:size-4"
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
                  View Rooms
                </Link>
              </MagneticWrapper>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-[5%] right-0 flex items-center justify-end gap-4 pr-4 sm:bottom-5 sm:left-1/2 sm:-translate-x-1/2 sm:right-auto sm:justify-center sm:gap-8 sm:pr-0">
          <motion.button
            onClick={prev}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 26 }}
            aria-label="Previous project"
            className="flex size-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white hover:text-[#111] sm:size-[68px]"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="size-5 rtl:-scale-x-100 sm:size-7"
              aria-hidden="true"
            >
              <path
                d="M19 12H5M11 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
          <motion.button
            onClick={next}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 26 }}
            aria-label="Next project"
            className="flex size-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white hover:text-[#111] sm:size-[68px]"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="size-5 rtl:-scale-x-100 sm:size-7"
              aria-hidden="true"
            >
              <path
                d="M5 12h14M13 18l6-6-6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </section>
  );
}

function ProjectStat({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div>
      <div className="mb-3.5 h-px w-full bg-white/72" />
      <motion.span
        data-stat-project-value
        data-stat-project-target={value}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 26 }}
        className="block text-[clamp(48px,3.35vw,64px)] font-semibold leading-none"
      >
        0
      </motion.span>
      <span className="mt-5 block text-base font-medium leading-none text-white">
        {label}
      </span>
    </div>
  );
}