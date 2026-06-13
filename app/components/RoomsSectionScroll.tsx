"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function RoomsSectionScroll({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);

  const setup = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = container.querySelectorAll<HTMLElement>("[data-section]");
    if (sections.length < 2) return;

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const snapPoints = Array.from(sections).map((s) => s.offsetTop / maxScroll);

    stRef.current?.kill();
    stRef.current = ScrollTrigger.create({
      snap: {
        snapTo: snapPoints,
        duration: { min: 0.5, max: 1 },
        ease: "power3.inOut",
        directional: true,
      },
    });

    ScrollTrigger.refresh();
  }, []);

  useEffect(() => {
    setup();
    window.addEventListener("resize", setup);
    return () => {
      stRef.current?.kill();
      window.removeEventListener("resize", setup);
    };
  }, [setup]);

  return <div ref={containerRef}>{children}</div>;
}
