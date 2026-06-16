"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import MagneticWrapper from "../components/MagneticWrapper";
import SmoothScroll from "../components/SmoothScroll";
import ScrollProgressBar from "../components/ScrollProgressBar";
import Footer from "../components/Footer";
import SeoHead, { BASE_URL } from "../lib/seo/seo-head";
import { breadcrumbSchema } from "../lib/seo/structured-data";

gsap.registerPlugin(ScrollTrigger);

const rooms = [
  {
    id: "01",
    name: "Palm Courtyard Suite",
    tagline: "Garden-Level Sanctuary",
    description:
      "Wake to the rustle of palm fronds and the soft glow of Siwan light filtering through private courtyard doors. This ground-floor suite opens onto a walled garden with its own plunge pool and hand-laid mosaic terrace.",
    size: "1,200 sq ft",
    guests: "2-3",
    features: ["Private Plunge Pool", "Mosaic Terrace", "Outdoor Shower", "Handwoven Siwan Textiles", "Courtyard Garden"],
    image: "/images/3.jpeg",
  },
  {
    id: "02",
    name: "Desert Vista Villa",
    tagline: "Panoramic Dune Views",
    description:
      "Perched at the edge of the oasis, this sprawling villa commands an uninterrupted view of the Great Sand Sea. Floor-to-ceiling glass blurs the line between indoors and the golden horizon beyond.",
    size: "2,400 sq ft",
    guests: "4-6",
    features: ["Private Infinity Pool", "Rooftop Terrace", "Outdoor Lounge", "Butler Service", "Sunset Viewing Deck"],
    image: "/images/4.jpeg",
  },
  {
    id: "03",
    name: "Oasis Hideaway Room",
    tagline: "Intimate Garden Retreat",
    description:
      "A cocoon of calm tucked among ancient olive trees. Minimalist design meets Siwan craftsmanship — raw linen, plaster walls, and a private corner of the garden where only the birds interrupt your stillness.",
    size: "550 sq ft",
    guests: "2",
    features: ["Garden Access", "Rainfall Shower", "Handmade Bath Products", "Private Seating Nook", "Olive Grove Views"],
    image: "/images/6.jpeg",
  },
  {
    id: "04",
    name: "Salt Lake Penthouse",
    tagline: "Rooftop Panorama Suite",
    description:
      "The crown of Breezy Island. This top-floor sanctuary surveys the entire oasis — from the salt lakes to the dunes to the distant temple of Amun. A private rooftop pool and pergola-shaded lounge make it the ultimate escape.",
    size: "1,800 sq ft",
    guests: "2-4",
    features: ["Rooftop Infinity Pool", "Pergola Lounge", "Panoramic Views", "Wine Cellar", "Private Chef Option"],
    image: "/images/7.jpeg",
  },
];

export default function RoomsPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(bgRef.current, {
          scale: 1.1,
          duration: 1.2,
          ease: "power3.out",
        });

        gsap.from("#hero-accent-line", {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heroContentRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });

        gsap.from("#hero-heading", {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heroContentRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        gsap.from("#hero-subtitle", {
          opacity: 0,
          y: 30,
          duration: 0.8,
          delay: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: heroContentRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        gsap.utils.toArray("[data-room-section]").forEach((section) => {
          const el = section as HTMLElement;
          const bg = el.querySelector("[data-room-bg]");

          gsap.from(bg, {
            scale: 1.08,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              toggleActions: "play none none none",
            },
          });

          gsap.from(el.querySelector("[data-room-tagline]"), {
            opacity: 0,
            x: -20,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });

          gsap.from(el.querySelector("[data-room-name]"), {
            opacity: 0,
            y: 60,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          });

          gsap.from(el.querySelector("[data-room-desc]"), {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          });

          gsap.from(el.querySelector("[data-room-specs]"), {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          });

          gsap.from(el.querySelectorAll("[data-room-feature]"), {
            opacity: 0,
            y: 15,
            stagger: 0.06,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          });
        });

        gsap.from("[data-rooms-cta]", {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "[data-rooms-cta]",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: sectionRef },
  );

  useGSAP(() => {
    ScrollTrigger.refresh();
  });

  return (
    <SmoothScroll>
      <SeoHead
        data={{
          title: "Luxury Rooms & Suites in Siwa Oasis — Breezy Island",
          description:
            "Explore four distinct luxury accommodations at Breezy Island in Siwa Oasis: Palm Courtyard Suite, Desert Vista Villa, Oasis Hideaway Room, and Salt Lake Penthouse. Each sanctuary frames the silence of the desert in its own way. Book your Siwa room today.",
          keywords:
            "Siwa hotel rooms, luxury suites Siwa, Siwa villa rental, boutique accommodation Siwa, Siwa Oasis accommodation, hotels in Siwa Egypt, Siwa resort rooms, family hotel in Siwa, romantic resort Siwa, eco lodge Siwa rooms",
          canonical: "/rooms",
          hreflang: [
            { lang: "en", url: "/rooms" },
            { lang: "ar", url: "/rooms" },
          ],
          ogTitle: "Luxury Rooms & Suites in Siwa Oasis — Breezy Island",
          ogDescription:
            "Four distinct sanctuaries in Siwa Oasis, each crafted to frame the silence and beauty of the desert in its own way.",
          ogImage: "/images/4.jpeg",
          ogType: "website",
          twitterCard: "summary_large_image",
          jsonLd: [
            breadcrumbSchema(
              [
                { name: "Home", item: "/" },
                { name: "Rooms", item: "/rooms" },
              ],
              BASE_URL,
            ),
          ],
        }}
      />
      <ScrollProgressBar />
      <Navbar />
      <main style={{ background: '#F2F1EF' }}>
        <div
          className="pointer-events-none fixed inset-0 z-50 opacity-[0.025]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        <div ref={sectionRef}>
          {/* HERO — Split Editorial */}
          <section data-section className="grid min-h-dvh overflow-hidden sm:h-dvh sm:grid-cols-2">
            <div ref={bgRef} className="relative h-[50dvh] min-h-0 overflow-hidden sm:h-full">
              <Image
                src="/images/hero-interior-1.jpeg"
                alt="Luxury suite at Breezy Island resort in Siwa Oasis, Egypt — luxury desert accommodation"
                fill
                className="object-cover object-center"
                sizes="(min-width: 640px) 50vw, 100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[rgba(12,10,8,0.12)] pointer-events-none" />
            </div>

            <div ref={heroContentRef} className="flex sm:items-center bg-surface-base px-6 py-16 sm:px-10 sm:py-32 lg:px-14 xl:px-18">
              <div className="w-full max-w-[480px]">
                <div id="hero-accent-line" className="mb-8 h-px w-12 bg-accent/60" />

                <h1
                  id="hero-heading"
                  data-ar-room-hero
                  className="font-heading text-[clamp(48px,4.5vw,96px)] font-normal leading-[0.92] text-text-primary"
                >
                  Where You
                  <br />
                  <span className="italic">Stay</span>
                </h1>

                <p
                  id="hero-subtitle"
                  className="mt-5 max-w-[420px] text-[15px] font-normal leading-[1.3] text-text-secondary sm:text-base"
                  style={{ fontFamily: '"SF Mono", monospace' }}
                >
                  Four distinct sanctuaries, each crafted to frame the silence and
                  beauty of Siwa in its own way.
                </p>

                <div className="mt-10 flex gap-8 sm:gap-12">
                  <div>
                    <span className="block text-[10px] font-medium uppercase tracking-[0.15em] text-text-tertiary">Rooms</span>
                    <span className="mt-1 block font-heading text-[clamp(36px,3vw,64px)] font-normal leading-none text-text-primary">04</span>
                  </div>
                  <div className="w-px bg-border-default/30" />
                  <div>
                    <span className="block text-[10px] font-medium uppercase tracking-[0.15em] text-text-tertiary">Suites</span>
                    <span className="mt-1 block font-heading text-[clamp(36px,3vw,64px)] font-normal leading-none text-text-primary">03</span>
                  </div>
                  <div className="w-px bg-border-default/30" />
                  <div>
                    <span className="block text-[10px] font-medium uppercase tracking-[0.15em] text-text-tertiary">Villas</span>
                    <span className="mt-1 block font-heading text-[clamp(36px,3vw,64px)] font-normal leading-none text-text-primary">01</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ROOM SHOWCASES */}
          {rooms.map((room, i) => (
            <section
              key={room.id}
              data-section
              data-room-section
              className="min-h-dvh w-full overflow-hidden bg-surface-base sm:h-dvh"
            >
              <div className="grid h-full grid-cols-1 sm:grid-cols-2">
                <div
                  data-room-bg
                  className={`relative h-[50dvh] min-h-0 overflow-hidden will-change-transform sm:h-full ${i % 2 === 0 ? "sm:order-2" : ""}`}
                >
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover object-center"
                    sizes="(min-width: 640px) 50vw, 100vw"
                  />
                </div>

                <div className={`flex sm:items-center px-6 py-12 sm:px-10 lg:px-14 ${i % 2 === 0 ? "sm:order-1" : ""}`}>
                  <div className="w-full max-w-[520px]">
                    <div data-room-tagline className="mb-4 inline-flex items-center gap-3">
                      <span className="flex size-7 items-center justify-center rounded-full bg-surface-overlay text-[9px] font-medium uppercase tracking-[0.15em] text-white">{room.id}</span>
                      <span className="h-px w-6 bg-border-default/50" />
                      <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-text-secondary">{room.tagline}</span>
                    </div>

                    <h3 data-room-name className="font-heading text-[clamp(32px,3.35vw,64px)] font-normal leading-[0.985] text-text-primary">
                      {room.name}
                    </h3>

                    <p data-room-desc className="mt-5 max-w-[480px] text-sm font-normal leading-[1.4] text-text-secondary sm:text-[15px]">
                      {room.description}
                    </p>

                    <div data-room-specs className="mt-8 flex flex-wrap gap-4 border-t border-accent-secondary/15 pt-6">
                      <div>
                        <span className="block text-[10px] font-medium uppercase tracking-[0.15em] text-text-tertiary">Size</span>
                        <span className="mt-1 block text-sm font-normal leading-none text-text-primary">{room.size}</span>
                      </div>
                      <div className="w-px bg-accent-secondary/15" />
                      <div>
                        <span className="block text-[10px] font-medium uppercase tracking-[0.15em] text-text-tertiary">Guests</span>
                        <span className="mt-1 block text-sm font-normal leading-none text-text-primary">Up to {room.guests}</span>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {room.features.map((f) => (
                        <span key={f} data-room-feature className="inline-flex items-center gap-1.5 rounded-full border border-border-default/25 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-text-secondary">
                          <span className="size-1.5 rounded-full bg-accent/60" />
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}

          {/* CTA */}
          <section data-section data-rooms-cta className="relative h-dvh w-full overflow-hidden bg-surface-base">
            <div className="pointer-events-none absolute bottom-0 right-0 z-0 h-[420px] w-[340px] select-none opacity-10 sm:h-[620px] sm:w-[520px] lg:h-[760px] lg:w-[640px]">
              <img
                src="/images/tree only.svg"
                alt=""
                aria-hidden="true"
                className="block h-full w-full object-contain object-right-bottom"
              />
            </div>

            <div className="relative z-10 grid h-full grid-cols-1 sm:grid-cols-2">
              <div className="flex items-center px-6 py-12 sm:px-10 lg:px-14">
                <div className="w-full max-w-[520px]">
                  <div className="mb-4 inline-flex items-center gap-3">
                    <span className="h-px w-12 bg-accent/60" />
                    <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-text-secondary">Your Escape</span>
                  </div>
                  <h3 className="font-heading text-[clamp(32px,3.35vw,64px)] font-normal leading-[0.985] text-text-primary">
                    Find Your
                    <br />
                    <span className="italic">Sanctuary</span>
                  </h3>
                  <p className="mt-5 max-w-[480px] text-sm font-normal leading-[1.4] text-text-secondary sm:text-[15px]">
                    Each room tells a different story of Siwa. The question is
                    not which is best — it is which one calls to you.
                  </p>
                  <div className="mt-8">
                    <MagneticWrapper>
                      <Link
                        href="/#contact"
                        className="group inline-flex h-12 w-fit items-center gap-4 overflow-hidden rounded-full bg-surface-overlay py-2 pl-2 pr-5 text-sm font-medium leading-none no-underline transition duration-200 hover:opacity-90 active:scale-[0.98] sm:h-14 sm:pr-6 sm:text-base"
                        style={{ color: "#fff" }}
                      >
                        <span className="relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white sm:size-10">
                          <svg viewBox="0 0 24 24" fill="none" className="absolute size-3 -rotate-45 text-surface-overlay transition-transform duration-300 ease-out group-hover:translate-x-5 group-hover:-translate-y-5 sm:size-4" aria-hidden="true">
                            <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <svg viewBox="0 0 24 24" fill="none" className="absolute size-3 -rotate-45 text-surface-overlay -translate-x-5 translate-y-5 transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0 sm:size-4" aria-hidden="true">
                            <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        Book Your Room
                      </Link>
                    </MagneticWrapper>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden sm:order-2" />
            </div>
          </section>
        </div>

        <Footer />
      </main>
    </SmoothScroll>
  );
}
