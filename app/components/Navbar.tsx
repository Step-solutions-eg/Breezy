"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
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
  const [menuOpen, setMenuOpen] = useState(false);

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

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isDark = !menuOpen && state === "top";
  const isMenuDark = menuOpen;

  const closeMenu = () => setMenuOpen(false);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: state === "hidden" && !menuOpen ? -80 : 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed left-0 right-0 top-0 z-50 border-b transition-colors duration-300 ${
        isDark
          ? "border-transparent bg-transparent text-white"
          : "border-border-default bg-surface-base/95 text-text-primary backdrop-blur-sm"
      } ${menuOpen ? "!border-transparent !bg-transparent !text-white" : ""}`}
    >
      <nav className="relative mx-auto flex h-16 max-w-none items-start justify-between px-4 pt-5 pb-5 sm:px-8">
        <Link
          href="/"
          className="relative block h-12 w-12 shrink-0 sm:h-16 sm:w-16"
          onClick={closeMenu}
          aria-label="Home"
        >
          <Image
            src="/images/Profile Picture White.jpg"
            alt="Breezy Island"
            fill
            sizes="(max-width: 640px) 48px, 64px"
            className={`object-cover transition-opacity duration-300 rounded-[1.2rem] ${
              isDark || menuOpen ? "opacity-100" : "opacity-0"
            }`}
            priority
          />
          <Image
            src="/images/Profile Picture Green.jpg"
            alt="Breezy Island"
            fill
            sizes="(max-width: 640px) 48px, 64px"
            className={`object-cover transition-opacity duration-300 rounded-[1.2rem] ${
              isDark || menuOpen ? "opacity-0" : "opacity-100"
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
          className="group z-50 flex size-11 items-center justify-center rounded-[7px] transition-colors duration-200 md:hidden"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none" className="overflow-visible">
            <rect
              x="0" y="0" width="22" height="2" rx="1"
              fill={isMenuDark || isDark ? "white" : "#503A26"}
              className="origin-center transition-all duration-300"
              style={{
                transform: menuOpen ? "rotate(45deg) translate(0px, 0px)" : "none",
                translate: menuOpen ? "0 7px" : "0 0",
              }}
            />
            <rect
              x="0" y="7" width="16" height="2" rx="1"
              fill={isMenuDark || isDark ? "white" : "#503A26"}
              className="origin-left transition-all duration-300"
              style={{
                opacity: menuOpen ? 0 : 1,
                transform: menuOpen ? "scaleX(0)" : "scaleX(1)",
              }}
            />
            <rect
              x="0" y="14" width="22" height="2" rx="1"
              fill={isMenuDark || isDark ? "white" : "#503A26"}
              className="origin-center transition-all duration-300"
              style={{
                transform: menuOpen ? "rotate(-45deg) translate(0px, -0px)" : "none",
                translate: menuOpen ? "0 -7px" : "0 0",
              }}
            />
          </svg>
        </motion.button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black/80 backdrop-blur-3xl"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="text-3xl font-medium leading-none text-white/90 no-underline transition-colors duration-200 hover:text-white sm:text-4xl"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ delay: navLinks.length * 0.08 + 0.08, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                className="mt-4"
              >
                <Link
                  href="#contact"
                  onClick={closeMenu}
                  className="inline-flex h-12 items-center gap-3 rounded-full bg-white px-6 text-base font-medium leading-none text-surface-overlay no-underline"
                >
                  Book Now
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
