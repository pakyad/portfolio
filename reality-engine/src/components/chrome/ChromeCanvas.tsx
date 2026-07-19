"use client";

import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function LiquidChrome() {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const geometry = useMemo(() => new THREE.SphereGeometry(1.1, 96, 64), []);
  const material = useMemo(() => {
    const nextMaterial = new THREE.MeshPhysicalMaterial({
      color: "#e9e5de",
      metalness: 0.62,
      roughness: 0.2,
      clearcoat: 1,
      clearcoatRoughness: 0.09,
      iridescence: 0.48,
      iridescenceIOR: 1.24,
      iridescenceThicknessRange: [170, 310],
      envMapIntensity: 1.45,
    });

    nextMaterial.onBeforeCompile = (shader) => {
      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        `
          #include <begin_vertex>
          float upperLobe = exp(-5.6 * dot(position - vec3(-0.18, 0.52, 0.04), position - vec3(-0.18, 0.52, 0.04)));
          float lowerLobe = exp(-6.4 * dot(position - vec3(0.38, -0.42, 0.09), position - vec3(0.38, -0.42, 0.09)));
          float sideLobe = exp(-7.2 * dot(position - vec3(-0.62, -0.08, 0.02), position - vec3(-0.62, -0.08, 0.02)));
          float contour = upperLobe * 0.23 + lowerLobe * 0.18 + sideLobe * 0.14;
          transformed += normalize(position) * contour;
          transformed.x *= 1.06;
          transformed.y *= 0.92;
        `,
      );
    };
    nextMaterial.customProgramCacheKey = () => "reality-engine-static-organic-chrome";

    return nextMaterial;
  }, []);

  const scale = Math.min(viewport.width * 0.15, 0.92);
  const x = viewport.width * 0.18;

  return (
    <group ref={group} position={[x, -0.1, 0]} rotation={[0.1, -0.38, -0.06]} scale={scale}>
      <mesh geometry={geometry} material={material} />
    </group>
  );
}

function StudioEnvironment() {
  return (
    <>
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={3.6} color="#fffaf1" position={[-3, 4, 2]} scale={[5, 5, 1]} />
        <Lightformer form="rect" intensity={2.2} color="#eee5ff" position={[3, 1.5, 2]} rotation={[0, -0.7, 0]} scale={[3, 3, 1]} />
        <Lightformer form="ring" intensity={1.2} color="#e8f2e5" position={[-2, -1, 1]} scale={[2.5, 2.5, 1]} />
      </Environment>
      <ambientLight intensity={0.72} color="#fff9ed" />
      <directionalLight position={[-4, 5, 5]} intensity={2.4} color="#fff7ea" />
    </>
  );
}

export function ChromeCanvas() {
  return (
    <Canvas
      className="chrome-canvas"
      dpr={[1, 1.5]}
      camera={{ fov: 30, position: [0, 0, 5.2] }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-label="A still iridescent liquid chrome sculpture"
    >
      <StudioEnvironment />
      <LiquidChrome />
      <ContactShadows position={[0.9, -1.12, 0]} opacity={0.2} scale={4.2} blur={2.8} far={2.6} />
    </Canvas>
  );
}
