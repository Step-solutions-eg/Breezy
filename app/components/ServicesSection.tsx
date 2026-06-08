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

const services = [
  {
    number: "01",
    title: "Interior Design",
    description:
      "Development, spatial planning, design and cohesive interior solutions.",
  },
  {
    number: "02",
    title: "Project Coordination",
    description: "Ensuring clarity and consistency throughout execution.",
  },
  {
    number: "03",
    title: "Space Planning",
    description: "Optimizing layouts for functionality, flow, and spatial balance.",
  },
  {
    number: "04",
    title: "Final Layering",
    description:
      "Thoughtful detailing that completes the interior experience.",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const serviceGridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
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

      gsap.from("[data-service-cta]", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "[data-service-cta]",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="services" className="relative bg-surface-base px-8 py-36 text-text-primary md:px-8">
      <div className="grid gap-16 lg:grid-cols-[1fr_0.94fr] lg:gap-20">
        <div className="flex min-h-[780px] flex-col">
          <motion.div
            data-service-badge
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 26 }}
          >
            <SectionBadge label="Our Services" />
          </motion.div>

          <h2
            data-service-heading
            className="max-w-[650px] text-[clamp(48px,3.35vw,64px)] font-medium uppercase leading-[0.985] tracking-normal"
            style={{
              fontFamily: '"SF Mono", monospace',
            }}
          >
            Design Services For
            <br />
            Refined Interior Spaces
          </h2>

          <div data-service-cta>
            <MagneticWrapper>
            <Link
              href="#about"
              className="group mt-24 inline-flex h-14 w-fit items-center gap-4 overflow-hidden rounded-full bg-surface-overlay py-2 pl-2 pr-6 text-base font-medium leading-none text-white no-underline transition duration-200 hover:opacity-90 active:scale-[0.98]"
              style={{ color: "#fff" }}
            >
              <span className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
                <svg viewBox="0 0 24 24" fill="none" className="absolute size-4 -rotate-45 text-surface-overlay transition-transform duration-300 ease-out group-hover:translate-x-5 group-hover:-translate-y-5" aria-hidden="true">
                  <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <svg viewBox="0 0 24 24" fill="none" className="absolute size-4 -rotate-45 text-surface-overlay -translate-x-5 translate-y-5 transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0" aria-hidden="true">
                  <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              More About Us
            </Link>
          </MagneticWrapper>
          </div>

          <div ref={serviceGridRef} className="mt-20 grid gap-[28px] sm:grid-cols-2">
            {services.map((service) => (
              <motion.article
                key={service.number}
                data-service-card
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: "spring", stiffness: 400, damping: 26 }}
                className="block h-[240px] w-full rounded-[7px] bg-surface-raised px-5 py-5 text-text-primary transition-colors duration-300 hover:brightness-[0.96]"
              >
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 26 }}
                  className="flex size-12 items-center justify-center rounded-full bg-white text-[22px] font-medium leading-none text-text-primary"
                >
                  {service.number}
                </motion.span>
                <h3 className="mt-[35px] mb-[25px] text-[22px] font-normal leading-[1.05] tracking-normal">
                  {service.title}
                </h3>
                <p className="mt-2 max-w-[330px] text-[18px] font-normal leading-[1.22] text-text-secondary"
                  style={{
                    fontFamily: '"SF Mono", monospace',
                  }}
                >
                  {service.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>

        <div ref={imageRef} className="relative min-h-[680px] overflow-hidden rounded-[7px] lg:min-h-[805px] will-change-transform">
          <Image
            src="/images/hero-interior.png"
            alt="Refined mountain-view interior with a low sofa and sculptural lighting"
            fill
            className="object-cover object-center"
            sizes="(min-width: 1024px) 48vw, 100vw"
          />
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
          width="14" height="14" viewBox="0 0 15 15" fill="none" aria-hidden="true"
        >
          <path d="M3 7.5h8.4M8.2 4.2l3.3 3.3-3.3 3.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </span>
      <span className="text-base font-normal leading-none">{label}</span>
    </motion.div>
  );
}
