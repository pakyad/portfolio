"use client";

import { useEffect, useRef } from "react";
import { animate, stagger, utils } from "animejs";

type KineticTextProps = {
  text: string;
};

export default function KineticText({ text }: KineticTextProps) {
  const rootRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const chars = root.querySelectorAll<HTMLElement>("[data-char]");

    utils.set(chars, { translateY: "115%" });
    const animation = animate(chars, {
      translateY: ["115%", "0%"],
      duration: 950,
      delay: stagger(48),
      ease: "outExpo",
    });

    return () => {
      animation.pause();
      utils.set(chars, { translateY: "0%" });
    };
  }, [text]);

  const words = text.split(" ");

  return (
    <span ref={rootRef} className="kinetic" aria-hidden="true">
      {words.map((word, wi) => (
        <span className="kinetic-word" key={`${word}-${wi}`}>
          {[...word].map((ch, ci) => (
            <span className="kinetic-mask" key={ci}>
              <span className="kinetic-char" data-char>
                {ch}
              </span>
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}
