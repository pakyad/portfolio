"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Nav from "./Nav";
import IntroSection from "./IntroSection";
import WorkSection from "./WorkSection";
import AboutSection from "./AboutSection";
import ContactSection from "./ContactSection";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const SECTIONS = [
  { id: "intro", label: "01", name: "Intro" },
  { id: "work", label: "02", name: "Work" },
  { id: "about", label: "03", name: "About" },
  { id: "contact", label: "04", name: "Contact" },
];

export default function HorizontalScroll() {
  const pinRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const rql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setIsMobile(mql.matches);
      setReducedMotion(rql.matches);
    };
    update();
    mql.addEventListener("change", update);
    rql.addEventListener("change", update);
    return () => {
      mql.removeEventListener("change", update);
      rql.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (isMobile || reducedMotion || !pinRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const panels = containerRef.current?.querySelectorAll<HTMLElement>(".section-panel");
      if (!panels || panels.length === 0) return;

      const totalWidth = panels.length * window.innerWidth;

      gsap.to(containerRef.current, {
        x: () => -(totalWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          id: "horizontalScroll",
          trigger: pinRef.current,
          pin: true,
          pinSpacing: true,
          start: "top top",
          end: () => `+=${totalWidth}`,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const next = Math.round(self.progress * (panels.length - 1));
            if (next !== activeIndexRef.current) {
              activeIndexRef.current = next;
              setActiveIndex(next);
            }
          },
        },
      });
    });

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      activeIndexRef.current = 0;
    };
  }, [isMobile, reducedMotion]);

  const handleNavigate = useCallback(
    (index: number) => {
      if (isMobile || reducedMotion) {
        const el = document.getElementById(`section-${SECTIONS[index].id}`);
        el?.scrollIntoView({ behavior: "smooth" });
        return;
      }

      const st = ScrollTrigger.getAll().find((t) => t.vars.id === "horizontalScroll");
      if (!st) return;

      const start = typeof st.start === "number" ? st.start : 0;
      const totalWidth = SECTIONS.length * window.innerWidth;
      const targetY = start + (index / (SECTIONS.length - 1)) * totalWidth;

      gsap.to(window, {
        scrollTo: { y: targetY, autoKill: false },
        duration: 0.8,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
      });
    },
    [isMobile, reducedMotion],
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        handleNavigate(Math.min(activeIndex + 1, SECTIONS.length - 1));
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        handleNavigate(Math.max(activeIndex - 1, 0));
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, handleNavigate]);

  return (
    <>
      <Nav
        sections={SECTIONS}
        activeIndex={activeIndex}
        onNavigate={handleNavigate}
        total={SECTIONS.length}
      />
      <div ref={pinRef} className="w-full overflow-hidden">
        <div
          ref={containerRef}
          className={`scroll-container ${isMobile || reducedMotion ? "flex-col w-full" : ""}`}
        >
          <IntroSection />
          <WorkSection />
          <AboutSection />
          <ContactSection />
        </div>
      </div>
    </>
  );
}
