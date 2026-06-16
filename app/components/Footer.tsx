"use client";

import { useRef, useState, type FormEvent } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const pageLinks = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/story" },
  { label: "Rooms", href: "/rooms" },
  { label: "Adventure Club", href: "/adventure-club" },
  { label: "Contact Us", href: "/contact-us" },
];

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleEmailSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 4000);
  };

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
      className="relative min-h-[856px] overflow-hidden bg-surface-overlay px-4 pt-16 text-white sm:px-6 sm:pt-24"
    >
      <div className="relative z-10 grid gap-12 pb-48 sm:pb-48 lg:pb-64 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div>
          <h2
            data-footer-item
            className="text-[clamp(42px,4.3vw,86px)] font-normal leading-[0.98]"
          >
            Begin Your
            <br />
            <span className="italic">Journey</span> to Siwa
          </h2>

          <p
            data-footer-item
            className="mt-8 max-w-[545px] text-lg font-medium leading-[1.18] text-text-tertiary sm:mt-12 sm:text-2xl"
          >
            Ready to escape? Reach out and let us help you plan your perfect
            stay at Breezy Island.
          </p>

          <form
            data-footer-item
            onSubmit={handleEmailSubmit}
            className="mt-10 flex max-w-[650px] flex-col gap-4 sm:mt-20 sm:flex-row sm:gap-5"
          >
            <label className="sr-only" htmlFor="footer-email">
              Email address
            </label>
            <motion.input
              id="footer-email"
              type="email"
              name="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              whileFocus={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 26 }}
              className="h-14 min-w-0 flex-1 rounded-[7px] border border-dashed border-white/30 bg-transparent p-[15px] text-sm font-medium text-white outline-none placeholder:text-text-tertiary focus:border-solid sm:h-14 sm:px-4 sm:text-xl"
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
              className="group inline-flex h-12 w-full items-center justify-center gap-3 rounded-[7px] bg-white py-2 pl-2 pr-5 text-base font-bold transition duration-200 hover:bg-surface-base sm:h-14 sm:w-fit sm:pr-6 sm:text-xl"
              style={{ color: "#503A26" }}
            >
              <motion.span
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 26 }}
                className="flex size-8 items-center justify-center rounded-[7px] bg-surface-overlay text-white sm:size-10"
              >
                <ArrowIcon />
              </motion.span>
              {submitted ? "Sent!" : "Submit"}
            </motion.button>
          </form>
        </div>

        <div
          data-footer-item
          className="grid grid-cols-2 gap-8 pt-1 sm:grid-cols-3 sm:gap-10"
        >
          <FooterColumn title="Navigate" links={pageLinks} />
          <FooterColumn
            title="Legals"
            links={[
              { label: "Terms And Conditions", href: "#" },
              { label: "Privacy Policy", href: "#" },
            ]}
          />
          <div className="col-span-2 sm:col-span-1">
            <h3 className="mb-6 text-2xl font-bold leading-none text-text-tertiary">
              Social
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+201067566607"
                  dir="ltr"
                  className="inline-flex items-center gap-2 text-base font-bold leading-none text-white/80 no-underline transition-colors hover:text-white"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  +20 10 67566607
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/breezyislandresort"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-base font-bold leading-none text-white/80 no-underline transition-colors hover:text-white"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
                  </svg>
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=61590675692116"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-base font-bold leading-none text-white/80 no-underline transition-colors hover:text-white"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <motion.div
        whileHover={{ scale: 1.005 }}
        transition={{ type: "spring", stiffness: 400, damping: 26 }}
        className="pointer-events-none absolute bottom-[6%] left-1/2 -translate-x-1/2 select-none leading-none w-full"
      >
        <div data-brand-logo className="flex items-end justify-center w-full" dir="ltr">
          <span className="text-[clamp(48px,16vw,580px)] font-heading font-black leading-[0.7]">
            Breezy
          </span>
          <span className="text-[clamp(48px,16vw,580px)] font-heading font-normal italic leading-[0.7]">
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
