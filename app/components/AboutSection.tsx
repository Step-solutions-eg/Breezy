"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    value: 3,
    prefix: "",
    suffix: "",
    description: "years of hospitality",
  },
  {
    value: 20000,
    prefix: "",
    suffix: "",
    description: "m²",
  },
  {
    value: 40,
    prefix: "+",
    suffix: "",
    description: "rooms",
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
              el.textContent =
                stat.prefix + Math.round(obj.val).toString() + stat.suffix;
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
      className="bg-surface-base px-4 py-11 text-text-primary sm:px-7"
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

        <div ref={headingRef} className="grid grid-cols-1 gap-8 lg:grid-cols-[0.49fr_0.51fr] lg:items-start lg:gap-12">
          <h2
            className="max-w-[650px] text-[clamp(36px,3.1vw,58px)] font-medium uppercase leading-[0.985] tracking-normal"
            style={{
              fontFamily: '"SF Mono", monospace',
            }}
          >
            Siwa in its spirit&hellip;
            <br />
            and Breezy in its details
          </h2>

          <div className="max-w-[850px] pt-2 text-[clamp(14px,1.05vw,17px)] font-normal leading-[1.45] tracking-normal lg:pt-4">
            <p>
              In the heart of Siwa&rsquo;s western lake, where the waters
              stretch calmly between golden sand dunes, a different story
              begins.
            </p>
            <p className="mt-5">
              As the sun sets, the sky&rsquo;s colors reflect on the
              lake&rsquo;s waters, and as the moon rises from behind the dunes,
              the island becomes an unforgettable scene.
            </p>
            <p className="mt-5">
              And in this enchanting place, we discovered{" "}
              <strong className="font-heading font-normal italic">
                Breezy Island
              </strong>
              ; a space that blends the stillness of nature with the spirit of
              Siwa, where time passes slowly, and every moment becomes a story.
            </p>
            <p className="mt-5">
              Here, you don&rsquo;t come to simply step away from the
              world&hellip; you come to discover a beauty you didn&rsquo;t know
              you were looking for.
            </p>
          </div>
        </div>

        <div className="mt-16 grid border-t border-accent-secondary/20 sm:mt-[122px] sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              data-stat-card
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 26 }}
              className={`min-h-[240px] border-accent-secondary/20 border-b px-5 pb-8 pt-8 sm:min-h-[322px] sm:border-s sm:border-b-0 sm:pb-10 sm:pt-10 ${
                index === 0 ? "sm:border-s-0" : ""
              } ${
                index === stats.length - 1 ? "border-b-0" : ""
              }`}
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 26 }}
                data-stat-value={index}
                className="block text-[clamp(40px,3.35vw,64px)] font-normal leading-none tracking-normal"
              >
                {stat.prefix}0{stat.suffix}
              </motion.span>
              <p className="mt-8 max-w-[380px] text-[clamp(17px,1.14vw,23px)] font-normal leading-[1.18] text-text-primary sm:mt-14">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
