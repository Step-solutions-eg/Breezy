"use client";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import ServicesSection from "./components/ServicesSection";
import ArticlesSection from "./components/ArticlesSection";
import FaqSection from "./components/FaqSection";
import ProcessCtaSection from "./components/ProcessCtaSection";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";
import ScrollProgressBar from "./components/ScrollProgressBar";

export default function Home() {
  return (
    <SmoothScroll>
      <ScrollProgressBar />
      <main>
        <Navbar />
        <HeroSection />
        <div className="relative z-10 -mt-[100vh] pointer-events-none">
          <div className="h-screen pointer-events-none" />
          <div className="pointer-events-auto">
            <AboutSection />
          </div>
        </div>
        <ProjectsSection />
        <ServicesSection />
        <ArticlesSection />
        <FaqSection />
        <ProcessCtaSection />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
