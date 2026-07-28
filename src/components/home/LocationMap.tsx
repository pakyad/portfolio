"use client";

import { useRef, useEffect, useState } from "react";
import { DOT_POSITIONS, PENANG } from "./generated-map";
import { InteractiveMap } from "./InteractiveMap";
import { STATUS } from "@/content/site";

const MAP_W = 800;
const MAP_H = 600;

export function LocationMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const [arrow, setArrow] = useState<{ d: string } | null>(null);

  useEffect(() => {
    const update = () => {
      const container = containerRef.current;
      const mapEl = mapRef.current;
      const labelEl = labelRef.current;
      if (!container || !mapEl || !labelEl) return;

      const cr = container.getBoundingClientRect();
      const mr = mapEl.getBoundingClientRect();
      const lr = labelEl.getBoundingClientRect();

      if (mr.width === 0 || mr.height === 0) return;

      const px = mr.left - cr.left + (PENANG.x / MAP_W) * mr.width;
      const py = mr.top - cr.top + (PENANG.y / MAP_H) * mr.height;
      const lx = lr.left - cr.left + lr.width / 2;
      const ly = lr.top - cr.top;

      const cy = (py + ly) / 2;
      const cx = Math.min(px, lx) - 30;

      const tdx = px - cx;
      const tdy = py - cy;
      const tlen = Math.sqrt(tdx * tdx + tdy * tdy);
      const ex = tlen > 0 ? px - (tdx / tlen) * 14 : px;
      const ey = tlen > 0 ? py - (tdy / tlen) * 14 : py;

      const d = `M ${lx} ${ly} Q ${cx} ${cy} ${ex} ${ey}`;

      setArrow({ d });
    };

    update();

    const ro = new ResizeObserver(() => update());
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", update);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div ref={containerRef} className="info-map" aria-hidden="true">
      <div ref={mapRef} className="location-map">
        <InteractiveMap positions={DOT_POSITIONS} penang={PENANG} />
      </div>
      <p ref={labelRef} className="info-map-label">Based in Penang. <span data-sound="cry" className="info-map-status">{STATUS}</span></p>
      {arrow && (
        <svg
          className="map-arrow"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            overflow: "visible",
          }}
        >
          <defs>
            <marker
              id="arr-head"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#e8c87a" />
            </marker>
          </defs>
          <path
            d={arrow.d}
            stroke="#e8c87a"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#arr-head)"
            opacity="0.5"
          />
        </svg>
      )}
    </div>
  );
}
