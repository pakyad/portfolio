"use client";

import { useRef, useState, useCallback } from "react";

type MagneticButtonProps = {
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const MAX_DIST = 5;

export default function MagneticButton({
  children,
  className = "",
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [delta, setDelta] = useState({ x: 0, y: 0 });

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const clamped = Math.min(dist, MAX_DIST);
    const angle = Math.atan2(dy, dx);
    setDelta({
      x: Math.cos(angle) * clamped,
      y: Math.sin(angle) * clamped,
    });
  }, []);

  const handlePointerLeave = useCallback(() => {
    setDelta({ x: 0, y: 0 });
  }, []);

  return (
    <button
      ref={ref}
      className={`magnetic-btn ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        transform: `translate(${delta.x}px, ${delta.y}px)`,
      }}
      {...props}
    >
      {children}
    </button>
  );
}
