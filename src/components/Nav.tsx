"use client";

import { useCallback } from "react";

interface NavProps {
  sections: { id: string; label: string; name: string }[];
  activeIndex: number;
  onNavigate: (index: number) => void;
  total: number;
}

export default function Nav({ sections, activeIndex, onNavigate, total }: NavProps) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onNavigate(index);
      }
    },
    [onNavigate]
  );

  const prevSection = activeIndex > 0 ? sections[activeIndex - 1].name : null;
  const nextSection = activeIndex < total - 1 ? sections[activeIndex + 1].name : null;

  return (
    <>
      {/* Desktop vertical nav */}
      <nav
        aria-label="Section navigation"
        className="fixed right-6 lg:right-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-1"
      >
        <ul className="flex flex-col items-center gap-5">
          {sections.map((section, i) => (
            <li key={section.id}>
              <button
                onClick={() => onNavigate(i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className={`relative flex items-center gap-3 group transition-colors duration-200 ${
                  i === activeIndex ? "text-violet" : "text-muted hover:text-ink"
                }`}
                aria-current={i === activeIndex ? "true" : undefined}
                aria-label={`Go to ${section.name}`}
                tabIndex={0}
              >
                <span className="font-mono text-[11px] tracking-wider uppercase leading-none">
                  {section.label}
                </span>
                {i === activeIndex && (
                  <span className="absolute -right-3 top-1/2 -translate-y-1/2 w-[2px] h-5 bg-violet rounded-full transition-all duration-300" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Desktop prev/next hints */}
      <div
        className="fixed left-6 lg:left-8 bottom-8 z-50 hidden md:flex flex-col gap-0.5 pointer-events-none"
        aria-hidden="true"
      >
        {prevSection && (
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted/40">
            {prevSection}
          </span>
        )}
        {nextSection && (
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted/40">
            {nextSection}
          </span>
        )}
      </div>

      {/* Mobile bottom nav */}
      <nav
        aria-label="Section navigation"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden"
      >
        <div className="flex items-center gap-1 px-3 py-1.5 bg-cream/90 backdrop-blur-sm rounded-full border border-rule/50 shadow-sm">
          {sections.map((section, i) => (
            <button
              key={section.id}
              onClick={() => onNavigate(i)}
              className={`px-2 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-all duration-300 rounded-full ${
                i === activeIndex
                  ? "text-violet bg-pale-violet/50"
                  : "text-muted/60 hover:text-muted"
              }`}
              aria-current={i === activeIndex ? "true" : undefined}
              aria-label={`Go to ${section.name}`}
              tabIndex={0}
            >
              {section.label}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
