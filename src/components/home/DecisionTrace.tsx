"use client";

import { useCallback, useRef, useState } from "react";

export type TraceItem = {
  constraint: string;
  system: string;
};

type DecisionTraceProps = {
  items: TraceItem[];
  label?: string;
};

const STEP = 1 / 16;

export default function DecisionTrace({
  items,
  label = "Decision Trace",
}: DecisionTraceProps) {
  const [position, setPosition] = useState(0.5);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const computePosition = useCallback((clientX: number) => {
    const track = trackRef.current;
    if (!track) return 0.5;
    const rect = track.getBoundingClientRect();
    return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      dragging.current = true;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      setPosition(computePosition(e.clientX));
    },
    [computePosition]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      setPosition(computePosition(e.clientX));
    },
    [computePosition]
  );

  const handlePointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  const shift = useCallback((delta: number) => {
    setPosition((p) => Math.max(0, Math.min(1, p + delta)));
  }, []);

  return (
    <div className="decision-trace">
      <div className="decision-trace-header">
        <span className="typo-meta">{label}</span>
      </div>

      <div
        ref={trackRef}
        className="decision-trace-track"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ touchAction: "none" }}
      >
        <div className="decision-trace-side side-constraints">
          {items.map((item, i) => (
            <div key={i} className="decision-trace-row">
              <span className="decision-trace-fragment">{item.constraint}</span>
            </div>
          ))}
        </div>

        <div
          className="decision-trace-side side-system"
          style={{ clipPath: `inset(0 0 0 ${position * 100}%)` }}
        >
          {items.map((item, i) => (
            <div key={i} className="decision-trace-row">
              <span className="decision-trace-fragment">{item.system}</span>
            </div>
          ))}
        </div>

        <div
          className="decision-trace-handle"
          style={{ left: `${position * 100}%` }}
          role="slider"
          aria-label={`${label}: drag to explore constraints and system`}
          aria-valuenow={Math.round(position * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowDown") {
              e.preventDefault();
              shift(STEP);
            }
            if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
              e.preventDefault();
              shift(-STEP);
            }
            if (e.key === "Home") {
              e.preventDefault();
              setPosition(0);
            }
            if (e.key === "End") {
              e.preventDefault();
              setPosition(1);
            }
          }}
        >
          <span className="decision-trace-handle-grip" aria-hidden="true" />
        </div>
      </div>

      <div className="decision-trace-controls">
        <button
          className="decision-trace-btn"
          onClick={() => setPosition(0)}
          aria-pressed={position === 0}
        >
          Constraints
        </button>
        <span className="decision-trace-controls-label typo-meta">
          {position === 0
            ? "constraints"
            : position === 1
              ? "system"
              : "explore"}
        </span>
        <button
          className="decision-trace-btn"
          onClick={() => setPosition(1)}
          aria-pressed={position === 1}
        >
          System
        </button>
      </div>
    </div>
  );
}
