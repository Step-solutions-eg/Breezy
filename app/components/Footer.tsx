"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const pageLinks = [
  { label: "Home", href: "#home" },
  { label: "Our Story", href: "#about" },
  { label: "Retreats", href: "#projects" },
  { label: "Experiences", href: "#services" },
  { label: "Contact Us", href: "#contact" },
];

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-footer-item]", {
          opacity: 0,
          y: 30,
          stagger: 0.1,
          duration: 0.7,
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

  return (
    <footer
      ref={sectionRef}
      id="contact"
      className="relative min-h-[856px] overflow-hidden bg-surface-overlay px-6 pt-24 text-white"
    >
      <div className="relative z-10 grid gap-16 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <h2
            data-footer-item
            className="text-[clamp(58px,4.3vw,86px)] font-normal leading-[0.98]"
          >
            Begin Your
            <br />
            <span className="italic">Journey</span> to Siwa
          </h2>

          <p
            data-footer-item
            className="mt-12 max-w-[545px] text-2xl font-medium leading-[1.18] text-text-tertiary"
          >
            Ready to escape? Reach out and let us help you plan your perfect
            stay at Breezy Island.
          </p>

          <form
            data-footer-item
            className="mt-20 flex max-w-[650px] flex-col gap-5 sm:flex-row"
          >
            <label className="sr-only" htmlFor="footer-email">
              Email address
            </label>
            <motion.input
              id="footer-email"
              type="email"
              placeholder="your@email.com"
              whileFocus={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 26 }}
              className="h-14 min-w-0 flex-1 rounded-[7px] border border-dashed border-white/30 bg-transparent px-4 text-xl font-medium text-white outline-none placeholder:text-text-tertiary focus:border-solid"
            />
            <motion.button
              type="submit"
              whileTap={{ scale: 0.97 }}
              transition={{
                type: "spring",
                stiffness: 1000,
                damping: 10,
                mass: 0.5,
              }}
              className="group inline-flex h-14 w-fit items-center gap-4 rounded-[7px] bg-white py-2 pl-2 pr-6 text-xl font-bold transition duration-200 hover:bg-surface-base"
              style={{ color: "#503A26" }}
            >
              <motion.span
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 26 }}
                className="flex h-10 w-10 items-center justify-center rounded-[7px] bg-surface-overlay text-white"
              >
                <ArrowIcon />
              </motion.span>
              Submit
            </motion.button>
          </form>
        </div>

        <div
          data-footer-item
          className="grid grid-cols-1 gap-10 pt-1 sm:grid-cols-3"
        >
          <FooterColumn title="Navigate" links={pageLinks} />
          <FooterColumn
            title="Legals"
            links={[
              { label: "Terms And Conditions", href: "#" },
              { label: "Privacy Policy", href: "#" },
            ]}
          />
          <FooterColumn
            title="Social"
            links={[
              { label: "Instagram", href: "#" },
              { label: "Facebook", href: "#" },
            ]}
          />
        </div>
      </div>

      <motion.div
        whileHover={{ scale: 1.005 }}
        transition={{ type: "spring", stiffness: 400, damping: 26 }}
        className="pointer-events-none absolute bottom-[5%] left-1/2 -translate-x-1/2 select-none leading-none"
      >
        <div className="flex items-end justify-center w-[90vw] pr-14">
          <span className="text-[clamp(80px,16vw,650px)] font-black leading-[0.7]">
            Breezy
          </span>
          <span
            className="text-[clamp(80px,16vw,650px)] font-light italic leading-[0.7]"
            style={{ fontFamily: '"New York", serif' }}
          >
            Island
          </span>
        </div>
      </motion.div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: Array<{ label: string; href: string }>;
}) {
  return (
    <div>
      <h3 className="mb-6 text-2xl font-bold leading-none text-text-tertiary">
        {title}
      </h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <motion.li
            key={link.label}
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 400, damping: 26 }}
          >
            <Link
              href={link.href}
              className="text-base font-bold leading-none text-white/80 no-underline transition-colors duration-200 hover:text-white"
            >
              {link.label}
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.2 8.5h9.7M8.9 4.6l4 3.9-4 3.9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
