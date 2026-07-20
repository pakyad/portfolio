"use client";

import { useState, useEffect } from "react";

export default function ScrollCue() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) setVisible(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-muted pointer-events-none"
      aria-hidden="true"
    >
      <span className="font-mono text-[10px] uppercase tracking-widest">
        Scroll to explore
      </span>
      <svg width="14" height="22" viewBox="0 0 14 22" fill="none" className="text-muted">
        <rect x="1.5" y="1.5" width="11" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="7" cy="7" r="1.5" fill="currentColor">
          <animate attributeName="cy" values="7;13;7" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}
