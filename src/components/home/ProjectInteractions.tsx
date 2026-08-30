"use client";

import { useEffect, useRef } from "react";

type ProjectInteractionsProps = {
  children: React.ReactNode;
};

export default function ProjectInteractions({ children }: ProjectInteractionsProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const previewLabelRef = useRef<HTMLSpanElement>(null);
  const spotlightLabelRef = useRef<HTMLSpanElement>(null);
  const activeRowRef = useRef<HTMLElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(0);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;

    const animate = () => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      posRef.current.x += (mx - posRef.current.x) * 0.15;
      posRef.current.y += (my - posRef.current.y) * 0.15;
      const offsetX = posRef.current.x + 24;
      const offsetY = posRef.current.y - 260;
      const scale = activeRowRef.current ? 1 : 0.9;
      el.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const rows = Array.from(list.querySelectorAll<HTMLElement>(".work-row"));

    if (window.matchMedia("(pointer: coarse)").matches) {
      let spotlightedRow: Element | null = null;

      const scrollObserver = new IntersectionObserver(
        (entries) => {
          const intersecting = entries.find((entry) => entry.isIntersecting);
          const row = intersecting ? (intersecting.target as HTMLElement) : null;
          if (row === spotlightedRow) return;
          spotlightedRow = row;

          rows.forEach((r) => r.classList.remove("spotlight"));
          list.classList.remove("has-spotlight");

          if (row) {
            row.classList.add("spotlight");
            list.classList.add("has-spotlight");
            const image = row.getAttribute("data-image");
            const label = row.getAttribute("data-label");
            if (spotlightRef.current && image) spotlightRef.current.style.backgroundImage = image;
            if (spotlightLabelRef.current && label) spotlightLabelRef.current.textContent = label;
          }
        },
        { rootMargin: "-42% 0px -42% 0px", threshold: 0 }
      );
      rows.forEach((row) => scrollObserver.observe(row));

      return () => {
        scrollObserver.disconnect();
        rows.forEach((r) => r.classList.remove("spotlight"));
        list.classList.remove("has-spotlight");
      };
    }

    const handlers = rows.map((row) => {
      const enter = () => {
        activeRowRef.current = row;
        const image = row.getAttribute("data-image");
        const label = row.getAttribute("data-label");
        if (previewRef.current && image) previewRef.current.style.backgroundImage = image;
        if (previewLabelRef.current && label) previewLabelRef.current.textContent = label;
        previewRef.current?.classList.add("active");
      };
      const leave = () => {
        activeRowRef.current = null;
        previewRef.current?.classList.remove("active");
      };
      row.addEventListener("mouseenter", enter);
      row.addEventListener("mouseleave", leave);
      return { row, enter, leave };
    });

    return () => {
      handlers.forEach(({ row, enter, leave }) => {
        row.removeEventListener("mouseenter", enter);
        row.removeEventListener("mouseleave", leave);
      });
      activeRowRef.current = null;
    };
  }, []);

  return (
    <div ref={listRef} className="project-list">
      {children}
      <div id="preview" ref={previewRef} aria-hidden="true">
        <span className="preview-label" ref={previewLabelRef} />
      </div>
      <div id="spotlight-card" ref={spotlightRef} aria-hidden="true">
        <span className="spotlight-label" ref={spotlightLabelRef} />
      </div>
    </div>
  );
}
