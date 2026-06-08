"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);
import Image from "next/image";
import Link from "next/link";
import MagneticWrapper from "./MagneticWrapper";

const articles = [
  {
    category: "Siwa Travel",
    date: "Jun 8, 2026",
    title: "A Guide to Siwa's Hidden Salt Lakes",
    image: "/images/3.jpeg",
    href: "#",
  },
  {
    category: "Local Culture",
    date: "May 22, 2026",
    title: "The Art of Siwan Hospitality and Tradition",
    image: "/images/article.jpeg",
    href: "#",
  },
  {
    category: "Desert Explorer",
    date: "May 10, 2026",
    title: "Best Sunset Spots in the Oasis",
    image: "/images/2.jpeg",
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

export default function ArticlesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

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
      className="relative bg-surface-base px-8 pb-36 pt-6 text-text-primary md:px-8"
    >
      <div className="mb-24">
        <div data-article-badge>
            <SectionBadge label="Siwa Stories" />
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h2
              data-article-heading
              className="max-w-[650px] text-[clamp(48px,3.35vw,64px)] font-medium uppercase leading-[0.985] tracking-normal"
              style={{
                fontFamily: '"SF Mono", monospace',
              }}
            >
              Discover the
              <br />
              Magic of Siwa
            </h2>
            <p
              data-article-text
              className="mt-20 max-w-[760px] text-[22px] font-medium leading-[1.2] text-text-primary"
            >
            Stories and guides from the heart of the oasis
            <br className="hidden md:block" />
            hidden gems, local wisdom, and the beauty of life in Siwa.
            </p>
          </div>

          <div data-article-cta>
            <MagneticWrapper>
              <Link
                href="#"
                className="group mb-4 inline-flex h-14 w-fit items-center gap-4 overflow-hidden rounded-full bg-surface-overlay py-2 pl-2 pr-6 text-base font-medium leading-none no-underline transition duration-200 hover:opacity-90 active:scale-[0.98]"
                style={{ color: "#fff" }}
              >
                <span className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="absolute size-4 -rotate-45 text-surface-overlay transition-transform duration-300 ease-out group-hover:translate-x-5 group-hover:-translate-y-5"
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
                    className="absolute size-4 -rotate-45 text-surface-overlay -translate-x-5 translate-y-5 transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0"
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
                Read More Stories
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
        className="grid gap-5 md:grid-cols-3"
      >
        {articles.map((article, index) => (
          <motion.div key={article.title} variants={cardVariants}>
            <Link
              href={article.href}
              className="group relative min-h-[624px] block overflow-hidden rounded-[7px] bg-surface-overlay text-white no-underline transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.08)]"
            >
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
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
              <div className="absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-t from-[rgba(8,8,7,0.72)] via-[rgba(8,8,7,0.34)] to-transparent" />

              <motion.span
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 26 }}
                className="absolute left-5 top-[21px] rounded-full bg-[rgba(135,132,124,0.82)] px-[18px] py-[11px] text-base font-medium leading-none text-white backdrop-blur-[2px]"
              >
                {article.category}
              </motion.span>

              <div className="absolute bottom-[28px] left-5 max-w-[390px] pr-[86px]">
                <p className="text-base font-normal leading-none text-white">
                  {article.date}
                </p>
                <motion.h3
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 26 }}
                  className="mt-[15px] text-[22px] font-normal leading-[1.08] tracking-normal text-white"
                >
                  {article.title}
                </motion.h3>
              </div>

              <div className="absolute bottom-[26px] right-5">
                <MagneticWrapper>
                  <div
                    className="flex size-[75px] items-center justify-center rounded-full bg-black text-white hover:bg-white hover:text-[#111]"
                    style={{ transition: "background-color 0.3s, color 0.3s" }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="size-[30px] -rotate-45"
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
            </Link>
          </motion.div>
        ))}
      </motion.div>
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
