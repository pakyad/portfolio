"use client";

import { useRef, useEffect } from "react";
import { animate, stagger } from "animejs";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  distance?: number;
  duration?: number;
  threshold?: number;
}

export default function ScrollReveal({
  children,
  className,
  staggerDelay = 100,
  distance = 28,
  duration = 500,
  threshold = 0.18,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = el.children.length > 0 ? Array.from(el.children) : [el];

    animate(targets, { opacity: [0, 1], translateY: [distance, 0], duration: 0 });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        animate(targets, {
          opacity: [0, 1],
          translateY: [distance, 0],
          delay: stagger(staggerDelay),
          duration,
          ease: "easeOutCubic",
        });
        observer.disconnect();
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [staggerDelay, distance, duration, threshold]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}