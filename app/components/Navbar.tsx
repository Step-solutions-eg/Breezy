"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Retreats", href: "#projects" },
  { label: "Experiences", href: "#services" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const prevRef = useRef(0);
  const [state, setState] = useState<"top" | "scrolled" | "hidden">("top");

  useMotionValueEvent(scrollY, "change", (current) => {
    const scrollingDown = current > prevRef.current;
    const pastHero = current > window.innerHeight * 0.85;

    if (!pastHero && state !== "top") {
      setState("top");
    } else if (pastHero && scrollingDown && current > window.innerHeight * 0.85 + 92) {
      if (state !== "hidden") setState("hidden");
    } else if (pastHero && state !== "scrolled") {
      setState("scrolled");
    }

    prevRef.current = current;
  });

  const isDark = state === "top";

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: state === "hidden" ? -80 : 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed left-0 right-0 top-0 z-50 border-b transition-colors duration-300 ${
        isDark
          ? "border-transparent bg-transparent text-white"
          : "border-border-default bg-surface-base/95 text-text-primary backdrop-blur-sm"
      }`}
    >
      <nav className="relative mx-auto flex h-16 max-w-none items-start justify-between px-8 pt-5 pb-5">
        <Link href="/" className="relative block h-16 w-16 shrink-0">
          <Image
            src="/images/Profile Picture White.jpg"
            alt="Breezy Island"
            fill
            className={`object-cover transition-opacity duration-300 rounded-[1.2rem] ${
              isDark ? "opacity-100" : "opacity-0"
            }`}
            priority
          />
          <Image
            src="/images/Profile Picture Green.jpg"
            alt="Breezy Island"
            fill
            className={`object-cover transition-opacity duration-300 rounded-[1.2rem] ${
              isDark ? "opacity-0" : "opacity-100"
            }`}
            priority
          />
        </Link>

        <div className="absolute left-1/2 top-6 hidden -translate-x-1/2 items-center gap-5 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`group relative overflow-hidden text-base font-normal leading-none transition-colors duration-200 ${
                isDark ? "text-white/80 hover:text-white" : "text-text-primary hover:text-surface-overlay"
              }`}
            >
              <span className="relative block overflow-hidden">
                <span className="block transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-full">
                  {link.label}
                </span>
                <span className="absolute inset-0 block transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] translate-y-full group-hover:translate-y-0">
                  {link.label}
                </span>
              </span>
            </Link>
          ))}
        </div>

        <Link
          href="#contact"
          className={`group relative overflow-hidden text-base font-normal leading-none transition-colors duration-200 hidden md:block ${
            isDark ? "text-white/80 hover:text-white" : "text-text-primary hover:text-surface-overlay"
          }`}
        >
          <span className="relative block overflow-hidden">
            <span className="block transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-full">
              Book Now
            </span>
            <span className={`absolute inset-x-0 top-0 block transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] translate-y-[1.2em] group-hover:translate-y-0 ${
              isDark ? "text-white/30" : "text-black/20"
            }`}>
              Book Now
            </span>
          </span>
        </Link>

        <motion.button
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 1000, damping: 10, mass: 0.5 }}
          className="group rounded-[7px] p-2 transition-colors duration-200 md:hidden"
          aria-label="Open menu"
        >
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none" className="transition-opacity duration-200 group-hover:opacity-80">
            <rect width="20" height="2" fill={isDark ? "white" : "#503A26"} className="origin-center transition-all duration-200" />
            <rect y="6" width="14" height="2" fill={isDark ? "white" : "#503A26"} className="origin-left transition-all duration-200" />
            <rect y="12" width="20" height="2" fill={isDark ? "white" : "#503A26"} className="origin-center transition-all duration-200" />
          </svg>
        </motion.button>
      </nav>
    </motion.header>
  );
}
