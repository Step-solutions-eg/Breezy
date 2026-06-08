"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    value: 10,
    suffix: "",
    description:
      "Years of Siwan hospitality rooted in tradition and authentic desert warmth.",
  },
  {
    value: 5,
    suffix: "",
    description:
      "Acres of pristine oasis sanctuary surrounded by endless palm groves.",
  },
  {
    value: 50,
    suffix: "+",
    description:
      "Luxury rooms and private villas crafted for peace and total relaxation.",
  },
  {
    value: 100,
    suffix: "%",
    description:
      "Tranquility guaranteed. Every guest leaves with a renewed sense of self.",
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(badgeRef.current, {
        opacity: 0,
        x: -20,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: badgeRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(headingRef.current, {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      gsap.from("[data-stat-card]", {
        opacity: 0,
        y: 50,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "[data-stat-card]",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      stats.forEach((stat, i) => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: `[data-stat-value="${i}"]`,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            const el = document.querySelector(`[data-stat-value="${i}"]`);
            if (el) {
              el.textContent = Math.round(obj.val).toString() + stat.suffix;
            }
          },
        });
      });
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-surface-base px-7 py-11 text-text-primary md:px-7"
    >
      <div className="w-full">
        <motion.div
          ref={badgeRef}
          whileHover={{ scale: 1.03 }}
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
          <span className="text-base font-normal leading-none">Our Story</span>
        </motion.div>

        <div ref={headingRef} className="grid grid-cols-1 gap-12 lg:grid-cols-[0.49fr_0.51fr] lg:items-start">
          <h2
            className="max-w-[650px] text-[clamp(48px,3.35vw,64px)] font-medium uppercase leading-[0.985] tracking-normal"
            style={{
              fontFamily: '"SF Mono", monospace',
            }}
          >
            A Hidden Sanctuary
            <br />
            in the Heart
            <br />
            of Siwa
          </h2>

          <p className="max-w-[850px] pt-8 text-[clamp(27px,1.62vw,32px)] font-normal leading-[1.22] tracking-normal">
            Nestled among ancient palm groves and golden dunes, Breezy Island
            offers a rare escape where timeless Egyptian hospitality meets
            understated luxury. Every detail is designed to help you disconnect,
            unwind, and rediscover the rhythm of a slower life.
          </p>
        </div>

        <div className="mt-[122px] grid border-t border-accent-secondary/20 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              data-stat-card
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 26 }}
              className={`min-h-[322px] border-accent-secondary/20 px-5 pb-10 pt-10 sm:border-l ${
                index === 0 ? "sm:border-l-0" : ""
              }`}
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 26 }}
                data-stat-value={index}
                className="block text-[clamp(48px,3.35vw,64px)] font-normal leading-none tracking-normal"
              >
                0{stat.suffix}
              </motion.span>
              <p className="mt-14 max-w-[380px] text-[clamp(20px,1.14vw,23px)] font-normal leading-[1.18] text-text-primary">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
