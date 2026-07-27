"use client";

import { useRef, useEffect } from "react";

interface Dot {
  ox: number;
  oy: number;
  x: number;
  y: number;
}

const DOT_RADIUS = 4.5;
const PENANG_RADIUS = DOT_RADIUS + 2.5;
const REPULSION_RADIUS = 80;
const REPULSION_STRENGTH = 24;
const LERP_SPEED = 0.06;
const BASE_OPACITY = 0.22;
const HOVER_OPACITY = 0.6;
const JITTER = 2;

function seeded(ax: number, bx: number): number {
  const x = Math.sin(ax * 12.9898 + bx * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export function InteractiveMap({
  positions,
  penang,
  width = 800,
  height = 600,
}: {
  positions: { x: number; y: number }[];
  penang: { x: number; y: number };
  width?: number;
  height?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const pointerRef = useRef({ x: -9999, y: -9999, active: false });
  const rafRef = useRef(0);

  useEffect(() => {
    dotsRef.current = positions.map((d) => {
      const jx = d.x + (seeded(d.x, d.y) - 0.5) * JITTER * 2;
      const jy = d.y + (seeded(d.y, d.x) - 0.5) * JITTER * 2;
      return { ox: jx, oy: jy, x: jx, y: jy };
    });
  }, [positions]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current = {
        x: ((e.clientX - rect.left) / rect.width) * width,
        y: ((e.clientY - rect.top) / rect.height) * height,
        active: true,
      };
    };

    const onPointerLeave = () => {
      pointerRef.current = { x: -9999, y: -9999, active: false };
    };

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);

    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      const { x: mx, y: my } = pointerRef.current;
      const dots = dotsRef.current;

      for (const dot of dots) {
        const dx = dot.ox - mx;
        const dy = dot.oy - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let tx = dot.ox;
        let ty = dot.oy;
        let opacity = BASE_OPACITY;

        if (dist < REPULSION_RADIUS && dist > 0.5) {
          const t = 1 - dist / REPULSION_RADIUS;
          const force = t * REPULSION_STRENGTH;
          tx = dot.ox + (dx / dist) * force;
          ty = dot.oy + (dy / dist) * force;
          opacity = BASE_OPACITY + t * (HOVER_OPACITY - BASE_OPACITY);
        }

        const MARGIN = DOT_RADIUS + 2;
        tx = Math.max(MARGIN, Math.min(width - MARGIN, tx));
        ty = Math.max(MARGIN, Math.min(height - MARGIN, ty));

        dot.x += (tx - dot.x) * LERP_SPEED;
        dot.y += (ty - dot.y) * LERP_SPEED;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, DOT_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(247,245,240,${opacity.toFixed(3)})`;
        ctx.fill();
      }

      const pdx = penang.x - mx;
      const pdy = penang.y - my;
      const pDist = Math.sqrt(pdx * pdx + pdy * pdy);
      const proximity = pDist < REPULSION_RADIUS ? 1 - pDist / REPULSION_RADIUS : 0;

      const t = performance.now() * 0.001;
      const breathe = 1 + Math.sin(t * 2) * 0.08 + Math.sin(t * 1.3) * 0.04;
      const cursorBoost = 1 + proximity * 0.5;
      const scale = breathe * cursorBoost;

      const pr = PENANG_RADIUS * scale;

      const hue = 40 + Math.sin(t * 0.8) * 20 + proximity * 10;
      const sat = 70 + proximity * 25;
      const lit = 65 + proximity * 20;

      ctx.beginPath();
      ctx.arc(penang.x, penang.y, pr, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${hue.toFixed(0)}, ${sat}%, ${lit}%)`;
      ctx.fill();



      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [width, height, penang.x, penang.y]);

  return (
    <canvas
      ref={canvasRef}
      className="interactive-map-canvas"
      aria-hidden="true"
    />
  );
}
