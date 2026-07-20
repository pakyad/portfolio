"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import ScrollCue from "./ScrollCue";

const ChromeCanvas = dynamic(() => import("@/components/ChromeCanvas"), {
  ssr: false,
});

export default function IntroSection() {
  const chromeRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="section-intro"
      className="section-panel relative bg-cream"
      aria-label="Introduction"
    >
      <div className="relative z-10 w-full h-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
          <div className="max-w-xl">
            <p className="font-mono text-[11px] md:text-xs uppercase tracking-[0.2em] text-muted mb-6 md:mb-8">
              Software Engineer
            </p>

            <h1 className="text-[clamp(2.8rem,9vw,6rem)] font-sans font-light leading-[0.92] tracking-[-0.035em] text-ink mb-6 md:mb-8">
              Less thinking.
              <br />
              More control.
            </h1>

            <p className="text-[clamp(0.95rem,1.4vw,1.2rem)] text-muted leading-relaxed max-w-md font-sans">
              I build software that removes unnecessary decisions and makes
              complicated things feel obvious.
            </p>
          </div>

          <div
            ref={chromeRef}
            className="relative h-[40vh] lg:h-[70vh] w-full max-w-lg mx-auto lg:ml-auto"
          >
            <ChromeCanvas containerRef={chromeRef} />
          </div>
        </div>
      </div>

      <ScrollCue />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-rule/50" />
    </section>
  );
}