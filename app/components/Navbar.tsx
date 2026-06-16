"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "../lib/language";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/story" },
  { label: "Rooms", href: "/rooms" },
  { label: "Adventure Club", href: "/adventure-club" },
  { label: "Contact Us", href: "/contact-us" },
];

function stopLenis() {
  const lenis = (window as unknown as Record<string, unknown>).__lenis as
    | { stop: () => void }
    | undefined;
  lenis?.stop();
}

function startLenis() {
  const lenis = (window as unknown as Record<string, unknown>).__lenis as
    | { start: () => void }
    | undefined;
  lenis?.start();
}

export default function Navbar({ mode, scrollContainer, alwaysScrolled }: { mode?: "default" | "hide-on-scroll"; scrollContainer?: React.RefObject<HTMLElement | null>; alwaysScrolled?: boolean }) {
  const { scrollY } = useScroll({ container: scrollContainer ?? undefined });
  const { language, setLanguage } = useLanguage();
  const prevRef = useRef(0);
  const [state, setState] = useState<"top" | "scrolled" | "hidden">(
    alwaysScrolled ? "scrolled" : mode === "hide-on-scroll" ? "scrolled" : "top"
  );
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    if (alwaysScrolled) return;
    const scrollingDown = current > prevRef.current;
    const pastHero = mode === "hide-on-scroll" ? true : current > window.innerHeight * 0.85;

    if (!pastHero && state !== "top") {
      setState("top");
    } else if (pastHero && scrollingDown && (mode === "hide-on-scroll" || current > window.innerHeight * 0.85 + 92)) {
      if (state !== "hidden") setState("hidden");
    } else if (pastHero && state !== "scrolled") {
      setState("scrolled");
    }

    prevRef.current = current;
  });

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      stopLenis();
    } else {
      document.body.style.overflow = "";
      startLenis();
    }
    return () => {
      document.body.style.overflow = "";
      startLenis();
    };
  }, [menuOpen]);

  const isDark = !menuOpen && state === "top";

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const stagger = 0.065;

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: state === "hidden" && !menuOpen ? -80 : 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 22, mass: 1.2 }}
        className={`fixed left-0 right-0 top-0 z-50 border-b transition-colors duration-300 ${
          isDark
            ? "border-transparent bg-transparent text-white"
            : "border-border-default bg-surface-base/95 text-text-primary backdrop-blur-sm"
        } ${menuOpen ? "!border-transparent !bg-transparent !text-white pointer-events-none" : ""}`}
      >
        <nav className="relative mx-auto flex h-16 max-w-none items-center justify-between px-4 sm:px-8">
          <Link
            href="/"
            onClick={closeMenu}
            aria-label="Breezy Island"
            className="relative shrink-0"
          >
            <span
              data-brand-logo className={`block whitespace-nowrap font-heading text-lg font-normal leading-none tracking-tight transition-opacity duration-300 sm:text-xl ${
                isDark && !menuOpen ? "opacity-100" : "opacity-0 absolute inset-0"
              }`}
              dir="ltr"
            >
              Breezy<span className="font-heading font-normal italic">Island</span>
            </span>
            <span
              data-brand-logo className={`block whitespace-nowrap font-heading text-lg font-normal leading-none tracking-tight text-[#5E6B57] transition-opacity duration-300 sm:text-xl ${
                !isDark || menuOpen ? "opacity-100" : "opacity-0 absolute inset-0"
              }`}
              dir="ltr"
            >
              Breezy<span className="font-heading font-normal italic">Island</span>
            </span>
          </Link>

          <div className="absolute left-1/2 top-6 hidden -translate-x-1/2 items-center gap-5 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`group relative overflow-hidden text-base font-normal leading-none transition-colors duration-200 ${
                  isDark ? "text-white/80 hover:text-white" : "!text-[#5E6B57] hover:text-[#5E6B57]/70"
                }`}
              >
                <span className="relative block overflow-hidden">
                  <span className="block transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform group-hover:-translate-y-[calc(100%+2px)]">
                    {link.label}
                  </span>
                  <span className="absolute inset-0 block transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform translate-y-[calc(100%+2px)] group-hover:translate-y-0">
                    {link.label}
                  </span>
                </span>
              </Link>
            ))}
          </div>

          <div className="hidden items-center rounded-full bg-surface-raised/80 p-1 md:flex">
            {(["en", "ar"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setLanguage(item)}
                aria-pressed={language === item}
                className={`h-8 rounded-full px-3 text-[11px] font-medium uppercase leading-none transition duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  language === item
                    ? "bg-surface-overlay text-white"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 1000, damping: 10, mass: 0.5 }}
            className="group pointer-events-auto z-50 flex size-11 items-center justify-center rounded-[7px] transition-colors duration-200 md:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="overflow-visible">
              <rect
                x="2" y="5" width="20" height="2" rx="1"
                fill={isDark && !menuOpen ? "white" : "#5E6B57"}
                className="transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                style={{
                  transformOrigin: "12px 6px",
                  transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none",
                }}
              />
              <rect
                x="2" y="11" width="20" height="2" rx="1"
                fill={isDark && !menuOpen ? "white" : "#5E6B57"}
                className="transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                style={{
                  transformOrigin: "12px 12px",
                  transform: menuOpen ? "scaleX(0)" : "scaleX(1)",
                }}
              />
              <rect
                x="2" y="17" width="20" height="2" rx="1"
                fill={isDark && !menuOpen ? "white" : "#5E6B57"}
                className="transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                style={{
                  transformOrigin: "12px 18px",
                  transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "none",
                }}
              />
            </svg>
          </motion.button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-surface-base/95 backdrop-blur-3xl"
          >
            <div className="absolute left-4 right-4 top-24 h-px bg-[#503A26]/10 sm:left-8 sm:right-8" />

            <nav className="flex flex-1 flex-col items-center justify-center gap-5 px-4">
              <motion.div
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                transition={{ delay: 0.03, duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                className="mb-6 flex items-center rounded-full bg-surface-raised p-1"
              >
                {(["en", "ar"] as const).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setLanguage(item)}
                    aria-pressed={language === item}
                    className={`h-10 rounded-full px-4 text-xs font-medium uppercase leading-none transition duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                      language === item
                        ? "bg-surface-overlay text-white"
                        : "text-text-secondary"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </motion.div>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 56, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -32, filter: "blur(8px)" }}
                  transition={{ delay: i * stagger + 0.08, duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="group relative block text-center font-heading text-[1.9rem] leading-none tracking-tight text-[#503A26] transition-colors duration-500 hover:text-[#503A26]/70 sm:text-7xl"
                  >
                    <span className="block transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-x-2">
                      {link.label}
                    </span>
                    <span className="absolute -bottom-2 left-0 h-px w-0 bg-[#503A26]/20 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:w-full" />
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
