"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Footer from "../components/Footer";
import MagneticWrapper from "../components/MagneticWrapper";
import Navbar from "../components/Navbar";
import ScrollProgressBar from "../components/ScrollProgressBar";
import SmoothScroll from "../components/SmoothScroll";
import SeoHead, { BASE_URL } from "../lib/seo/seo-head";
import { breadcrumbSchema, localBusinessSchema } from "../lib/seo/structured-data";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_INTL,
  MAPS_EMBED_SRC,
  MAPS_LINK,
  whatsappLink,
} from "../lib/contact";

const ease = [0.32, 0.72, 0, 1] as const;

const contactDetails = [
  {
    label: "Phone",
    value: CONTACT_PHONE,
    href: `tel:${CONTACT_PHONE_INTL}`,
  },
  {
    label: "Email",
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
  },
  {
    label: "WhatsApp",
    value: CONTACT_PHONE,
    href: whatsappLink("Hello Breezy Island! I'd like to book a stay."),
  },
  {
    label: "Location",
    value: "Siwa Oasis, Matrouh, Egypt",
    href: MAPS_LINK,
  },
];

const fieldClass =
  "h-14 w-full rounded-[7px] border border-accent-secondary/20 bg-surface-base px-4 text-sm font-normal text-text-primary outline-none transition duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] placeholder:text-text-secondary/45 focus:border-accent-secondary focus:bg-white/40";

function ArrowIcon() {
  return (
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
  );
}

export default function ContactUsPage() {
  const [formData, setFormData] = useState({ name: "", email: "", arrival: "", guests: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;
    const details = [
      `Name: ${formData.name.trim()}`,
      `Email: ${formData.email.trim()}`,
      formData.arrival.trim() && `Preferred dates: ${formData.arrival.trim()}`,
      formData.guests.trim() && `Guests: ${formData.guests.trim()}`,
      formData.message.trim() && `Message: ${formData.message.trim()}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(
      whatsappLink(`New booking request — Breezy Island\n\n${details}`),
      "_blank",
    );
    setSubmitted(true);
    setFormData({ name: "", email: "", arrival: "", guests: "", message: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <SmoothScroll>
      <SeoHead
        data={{
          title: "Book Your Stay at Breezy Island — Siwa Oasis, Egypt",
          description:
            "Contact Breezy Island to plan your luxury desert escape in Siwa Oasis. Request availability, ask about our rooms and suites, or arrange a custom itinerary. We reply within 24 hours.",
          keywords:
            "book Siwa hotel, Siwa reservation, contact Breezy Island, Siwa booking, hotels near Siwa attractions, Siwa swimming pool hotel, Siwa Oasis reservation, Egypt desert resort booking",
          canonical: "/contact-us",
          hreflang: [
            { lang: "en", url: "/contact-us" },
            { lang: "ar", url: "/contact-us" },
          ],
          ogTitle: "Book Your Stay at Breezy Island — Siwa Oasis, Egypt",
          ogDescription:
            "Tell us when you want to arrive, who is coming, and what kind of stay you imagine. We will reply with the next simple step.",
          ogImage: "/images/5.jpeg",
          ogType: "website",
          twitterCard: "summary_large_image",
          jsonLd: [
            breadcrumbSchema(
              [
                { name: "Home", item: "/" },
                { name: "Contact Us", item: "/contact-us" },
              ],
              BASE_URL,
            ),
            localBusinessSchema(`${BASE_URL}/contact-us`),
          ],
        }}
      />
      <ScrollProgressBar />
      <Navbar alwaysScrolled />
      <main className="relative overflow-hidden bg-surface-base text-text-primary">
        <div
          className="pointer-events-none fixed inset-0 z-50 opacity-[0.025]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        <section className="relative min-h-[100dvh] overflow-hidden px-4 pb-24 pt-28 sm:px-8 sm:pb-32 sm:pt-34 lg:px-12 lg:pt-38">
          <div className="pointer-events-none absolute bottom-0 right-0 z-0 h-[420px] w-[340px] select-none opacity-10 sm:h-[600px] sm:w-[500px] lg:h-[760px] lg:w-[640px]">
            <img
              src="/images/tree only.svg"
              alt=""
              aria-hidden="true"
              className="block h-full w-full object-contain object-right-bottom"
            />
          </div>

          <div className="relative z-10 mx-auto max-w-[1240px]">
            <motion.div
              initial={{ opacity: 0, y: 42, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.95, ease }}
              className="mx-auto max-w-[900px] text-center"
            >
              <div className="mb-8 inline-flex h-10 w-fit items-center gap-2.5 rounded-full bg-surface-raised py-1 pl-2 pr-4">
                <span className="flex size-7 items-center justify-center rounded-full bg-surface-overlay text-white">
                  <svg width="14" height="14" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                    <path
                      d="M3 7.5h8.4M8.2 4.2l3.3 3.3-3.3 3.3"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-sm font-normal leading-none text-text-primary">
                  Contact Us
                </span>
              </div>

              <h1 className="text-[clamp(48px,7vw,118px)] font-normal leading-[0.9]">
                Let us plan
                <br />
                <span className="italic">your escape.</span>
              </h1>

              <p data-ar-center className="mx-auto mt-7 max-w-[650px] text-center text-[clamp(18px,1.45vw,24px)] font-normal leading-[1.28] text-text-secondary">
                Tell us when you want to arrive, who is coming, and what kind of
                stay you imagine. We will reply with the next simple step.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 46, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, ease, delay: 0.12 }}
              className="mx-auto mt-14 grid max-w-[1060px] gap-6 lg:mt-18 lg:grid-cols-[0.72fr_1.28fr]"
            >
              <aside className="rounded-[7px] bg-surface-overlay p-6 text-white sm:p-8">
                <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-white/60">
                  Direct Lines
                </span>
                <p data-ar-h2-size className="mt-5 font-heading text-[clamp(32px,3.2vw,50px)] leading-[0.96]">
                  Quiet details, answered clearly.
                </p>

                <div data-ar-contact-dir className="mt-10 grid gap-7">
                  {contactDetails.map((item) => (
                    <div key={item.label}>
                      <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">
                        {item.label}
                      </span>
                      <a
                        href={item.href}
                        dir="ltr"
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={
                          item.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        data-ar-contact-value
                        className="mt-2 block text-sm leading-[1.45] text-white no-underline transition-colors hover:text-accent"
                      >
                        {item.value}
                      </a>
                    </div>
                  ))}
                </div>
              </aside>

              <form
                onSubmit={handleSubmit}
                className="rounded-[7px] bg-surface-raised p-5 sm:p-8"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-[10px] font-medium uppercase tracking-[0.2em] text-text-secondary">
                      Name
                    </span>
                    <input className={fieldClass} type="text" name="name" placeholder="Your name" value={formData.name} onChange={handleChange("name")} />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-[10px] font-medium uppercase tracking-[0.2em] text-text-secondary">
                      Email
                    </span>
                    <input className={fieldClass} type="email" name="email" placeholder="you@email.com" value={formData.email} onChange={handleChange("email")} />
                  </label>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-[10px] font-medium uppercase tracking-[0.2em] text-text-secondary">
                      Arrival
                    </span>
                    <input className={fieldClass} type="text" name="arrival" placeholder="Preferred dates" value={formData.arrival} onChange={handleChange("arrival")} />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-[10px] font-medium uppercase tracking-[0.2em] text-text-secondary">
                      Guests
                    </span>
                    <input className={fieldClass} type="text" name="guests" placeholder="2 guests" value={formData.guests} onChange={handleChange("guests")} />
                  </label>
                </div>

                <label className="mt-4 block">
                  <span className="mb-2 block text-[10px] font-medium uppercase tracking-[0.2em] text-text-secondary">
                    Message
                  </span>
                  <textarea
                    className="min-h-[170px] w-full resize-none rounded-[7px] border border-accent-secondary/20 bg-surface-base px-4 py-4 text-sm font-normal leading-[1.5] text-text-primary outline-none transition duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] placeholder:text-text-secondary/45 focus:border-accent-secondary focus:bg-white/40"
                    name="message"
                    placeholder="Tell us what you want your stay to feel like."
                    value={formData.message}
                    onChange={handleChange("message")}
                  />
                </label>

                <div className="mt-7">
                  <MagneticWrapper>
                    <button
                      type="submit"
                      data-ar-cta-btn
                      className="group inline-flex h-14 w-fit items-center gap-4 overflow-hidden rounded-full bg-surface-overlay py-2 pl-2 pr-6 text-base font-medium leading-none text-white transition duration-200 hover:opacity-90 active:scale-[0.98]"
                    >
                      <ArrowIcon />
                      {submitted ? "Sent!" : "Send Request"}
                    </button>
                  </MagneticWrapper>
                </div>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 46, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, ease, delay: 0.2 }}
              className="relative z-10 mx-auto mt-14 max-w-[1060px] overflow-hidden rounded-[7px] border border-border-default/20"
            >
              <iframe
                src={MAPS_EMBED_SRC}
                title="Breezy Island Resort location map"
                width="100%"
                height="420"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                className="block w-full"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.3 }}
              className="relative z-10 mt-8 text-center"
            >
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.15em] text-text-secondary no-underline transition-colors hover:text-text-primary"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M12 21s-7-5.6-7-11a7 7 0 1114 0c0 5.4-7 11-7 11z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="10"
                    r="2.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
                Open in Google Maps
              </a>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </SmoothScroll>
  );
}
