"use client";

import { useRef, useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import ChromeAccent from "@/components/ChromeAccent";

type ShapeType = "icosahedron" | "torus" | "octahedron";

function ChromeFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-paper to-rule/30" />
    </div>
  );
}

export default function ChromeCanvas({
  shape = "icosahedron",
  containerRef,
}: {
  shape?: ShapeType;
  containerRef?: React.RefObject<HTMLDivElement | null>;
}) {
  const mouse = useRef({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const el = containerRef?.current;
    if (!el) return;

    const handleMouse = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width;
      const cy = (e.clientY - rect.top) / rect.height;
      mouse.current = { x: cx - 0.5, y: -(cy - 0.5) };
    };

    el.addEventListener("mousemove", handleMouse, { passive: true });
    return () => el.removeEventListener("mousemove", handleMouse);
  }, [containerRef]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleVisibility = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  if (hasError) return <ChromeFallback />;

  if (!visible) return null;

  return (
    <Suspense fallback={<ChromeFallback />}>
      <Canvas
        className="chrome-canvas"
        dpr={[1, 1.5]}
        camera={{ fov: 28, position: [0, 0, 4.5] }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={(state) => {
          const gl = state.gl;
          const handleContextLost = () => setHasError(true);
          gl.domElement.addEventListener("webglcontextlost", handleContextLost);
          return () => gl.domElement.removeEventListener("webglcontextlost", handleContextLost);
        }}
        aria-label="Iridescent chrome accent"
      >
        <ChromeAccent scale={0.85} shape={shape} mouse={mouse} />
      </Canvas>
    </Suspense>
  );
}
