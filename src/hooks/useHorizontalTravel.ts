"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useMediaQuery } from "./useMediaQuery";

export type TravelSection = {
  id: string;
};

export function useHorizontalTravel(sections: TravelSection[]) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const isMobile = useMediaQuery("(max-width: 767px)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const isEnabled = useMemo(
    () => !isMobile && !prefersReducedMotion,
    [isMobile, prefersReducedMotion]
  );

  const update = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const totalWidth = container.scrollWidth;
    const viewportWidth = window.innerWidth;
    const maxScroll = totalWidth - viewportWidth;

    if (maxScroll <= 0) return;

    const scrollY = window.scrollY;
    const prog = Math.max(0, Math.min(1, scrollY / maxScroll));
    setProgress(prog);

    const translateX = -prog * maxScroll;
    container.style.transform = `translate3d(${translateX}px, 0px, 0px)`;

    const panels = container.children;
    const scrollLeft = prog * maxScroll;
    let accumulated = 0;
    for (let i = 0; i < panels.length; i++) {
      const panel = panels[i] as HTMLElement;
      accumulated += panel.offsetWidth;
      if (scrollLeft < accumulated - panel.offsetWidth / 2) {
        setActiveIndex(i);
        break;
      }
    }
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    const container = containerRef.current;
    if (!container) return;

    const totalWidth = container.scrollWidth;
    const viewportWidth = window.innerWidth;
    const maxScroll = totalWidth - viewportWidth;

    if (maxScroll <= 0) return;

    document.documentElement.style.height = `${maxScroll + window.innerHeight}px`;
    document.body.style.height = `${maxScroll + window.innerHeight}px`;

    window.addEventListener("scroll", update, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", update);
      document.documentElement.style.height = "";
      document.body.style.height = "";
      container.style.transform = "";
    };
  }, [isEnabled, update]);

  useEffect(() => {
    if (!isEnabled || !sections[activeIndex]) return;
    const id = sections[activeIndex].id;
    if (window.location.hash !== `#${id}`) {
      window.history.replaceState(null, "", `#${id}`);
    }
  }, [activeIndex, isEnabled, sections]);

  return { containerRef, activeIndex, progress, isEnabled };
}
