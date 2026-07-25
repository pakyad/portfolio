"use client";

import { useMemo, useEffect } from "react";
import { useHorizontalTravel } from "@/hooks/useHorizontalTravel";
import type { TravelSection } from "@/hooks/useHorizontalTravel";

type HorizontalTravelProps = {
  children: React.ReactNode;
  sections: TravelSection[];
  onActiveChange?: (index: number) => void;
};

export default function HorizontalTravel({
  children,
  sections,
  onActiveChange,
}: HorizontalTravelProps) {
  const stableSections = useMemo(() => sections, [sections]);

  const { containerRef, activeIndex, isEnabled } =
    useHorizontalTravel(stableSections);

  useEffect(() => {
    if (onActiveChange) onActiveChange(activeIndex);
  }, [activeIndex, onActiveChange]);

  return (
    <div
      ref={containerRef}
      className={`travel-track${isEnabled ? " travel-enabled" : ""}`}
      role="region"
      aria-label="Portfolio sections"
    >
      {children}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {sections[activeIndex]?.id
          ? `Current section: ${sections[activeIndex].id}`
          : ""}
      </div>
    </div>
  );
}
