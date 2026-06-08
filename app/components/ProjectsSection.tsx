"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);
import Link from "next/link";
import MagneticWrapper from "./MagneticWrapper";

const projects = [
  {
    id: "01",
    name: "Palm Courtyard Suite",
    category: "Private Garden Suite",
    bedrooms: 2,
    bathrooms: 2,
    size: "1,200",
    image: "/images/project-stonehaven.jpeg",
    thumbnail: "/images/project-stonehaven.jpeg",
  },
  {
    id: "02",
    name: "Desert Vista Villa",
    category: "Panoramic Villa with Pool",
    bedrooms: 3,
    bathrooms: 3,
    size: "2,400",
    image: "/images/project-stonehaven.jpeg",
    thumbnail: "/images/project-stonehaven.jpeg",
  },
  {
    id: "03",
    name: "Oasis Hideaway Room",
    category: "Garden View Retreat",
    bedrooms: 1,
    bathrooms: 1,
    size: "550",
    image: "/images/project-stonehaven.jpeg",
    thumbnail: "/images/project-stonehaven.jpeg",
  },
];

export default function ProjectsSection() {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
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
            trigger: contentRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        gsap.from("[data-project-title]", {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        gsap.from("[data-project-stat]", {
          opacity: 0,
          y: 30,
          stagger: 0.12,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "[data-project-stats]",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        gsap.from("[data-project-cta]", {
          opacity: 0,
          y: 20,
          duration: 0.6,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "[data-project-stats]",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        gsap.from("[data-project-card]", {
          opacity: 0,
          x: 30,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "[data-project-card]",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        const statTargets = gsap.utils.toArray<HTMLElement>(
          "[data-stat-project-value]",
        );
        statTargets.forEach((el) => {
          const target = parseFloat(el.dataset.statProjectTarget || "0");
          const formatted = el.dataset.statProjectFormatted === "true";
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            onUpdate: () => {
              el.textContent = formatted
                ? Math.round(obj.val).toLocaleString()
                : Math.round(obj.val).toString();
            },
          });
        });
      });
    },
    { scope: sectionRef, dependencies: [current] },
  );

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative h-dvh min-h-[760px] w-full overflow-hidden bg-surface-overlay text-white"
    >
      <div ref={imageRef} className="absolute inset-0 will-change-transform">
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[rgba(8,7,6,0.52)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(8,7,6,0.7)] via-[rgba(8,7,6,0.32)] to-[rgba(8,7,6,0.18)]" />
        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-[rgba(8,7,6,0.42)] to-transparent" />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 h-full px-[30px] py-[31px]"
      >
        <span
          data-project-label
          className="absolute left-[30px] top-9 text-base font-medium leading-none tracking-normal"
        >
          Our Retreats
        </span>

        <motion.div
          data-project-card
          whileHover={{ y: -4, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 26 }}
          className="absolute right-[30px] top-[31px] hidden h-[145px] w-[430px] grid-cols-[124px_1fr] gap-5 rounded-[7px] bg-white/12 p-3 shadow-[0_24px_70px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.24)] backdrop-blur-xl backdrop-saturate-150 md:grid"
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

        <div className="absolute left-[30px] top-[31.4%] w-[min(780px,calc(100vw-60px))]">
          <h2
            data-project-title
            className="mb-[38px] max-w-[650px] text-[clamp(72px,5.25vw,100px)] font-bold leading-[0.94] tracking-normal"
          >
            {project.name}
          </h2>

          <div
            data-project-stats
            className="mb-[58px] grid max-w-[780px] grid-cols-3 gap-10 md:gap-[42px]"
          >
            <motion.div
              data-project-stat
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 26 }}
            >
              <ProjectStat
                index={0}
                value={project.bedrooms}
                label="Guests"
              />
            </motion.div>
            <motion.div
              data-project-stat
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 26 }}
            >
              <ProjectStat
                index={1}
                value={project.bathrooms}
                label="Bathrooms"
              />
            </motion.div>
            <motion.div
              data-project-stat
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 26 }}
            >
              <ProjectStat
                index={2}
                value={parseInt(project.size.replace(/,/g, ""))}
                label="Sq Ft"
                formatted
              />
            </motion.div>
          </div>

          <div data-project-cta>
            <MagneticWrapper>
              <Link
                href="#contact"
                className="group inline-flex h-14 items-center gap-4 overflow-hidden rounded-full bg-white py-2 pl-2 pr-6 text-base font-medium leading-none no-underline transition duration-200 hover:bg-surface-base active:scale-[0.98]"
                style={{ color: "#503A26" }}
              >
                <span className="relative flex size-10 items-center justify-center overflow-hidden rounded-full bg-surface-overlay">
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
                View Room
              </Link>
            </MagneticWrapper>
          </div>
        </div>

        <div className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
          <motion.button
            onClick={prev}
            whileHover={{ scale: 1.15, x: -4 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 26 }}
            aria-label="Previous project"
            className="group flex h-14 w-[68px] items-center justify-center text-white"
          >
            <svg
              width="68"
              height="42"
              viewBox="0 0 73 39"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M70 19.5H5M21 4 5 19.5 21 35"
                stroke="currentColor"
                strokeWidth="5.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
          <motion.button
            onClick={next}
            whileHover={{ scale: 1.15, x: 4 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 26 }}
            aria-label="Next project"
            className="group flex h-14 w-[68px] items-center justify-center text-white"
          >
            <svg
              width="68"
              height="42"
              viewBox="0 0 73 39"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 19.5h65M52 4l16 15.5L52 35"
                stroke="currentColor"
                strokeWidth="5.5"
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
  index,
  value,
  label,
  formatted,
}: {
  index: number;
  value: number;
  label: string;
  formatted?: boolean;
}) {
  return (
    <div>
      <div className="mb-3.5 h-px w-full bg-white/72" />
      <motion.span
        data-stat-project-value
        data-stat-project-target={value}
        data-stat-project-formatted={formatted ? "true" : "false"}
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
