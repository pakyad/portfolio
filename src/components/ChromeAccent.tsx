"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

type ShapeType = "icosahedron" | "torus" | "octahedron";

function ChromeMesh({ shape, mouse }: { shape: ShapeType; mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    switch (shape) {
      case "torus":
        return new THREE.TorusGeometry(0.8, 0.32, 24, 48);
      case "octahedron":
        return new THREE.OctahedronGeometry(1, 0);
      case "icosahedron":
      default:
        return new THREE.IcosahedronGeometry(1, 5);
    }
  }, [shape]);

  const material = useMemo(() => {
    const m = new THREE.MeshPhysicalMaterial({
      color: "#e9e5de",
      metalness: 0.7,
      roughness: 0.15,
      clearcoat: 0.9,
      clearcoatRoughness: 0.08,
      iridescence: 0.5,
      iridescenceIOR: 1.25,
      iridescenceThicknessRange: [180, 320],
      envMapIntensity: 1.5,
    });
    return m;
  }, []);

  const baseRot = useMemo(() => ({
    x: 0.08,
    y: -0.15,
  }), []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const tx = (mouse.current.x * 0.3 - meshRef.current.rotation.x + baseRot.x) * delta * 2;
    const ty = (mouse.current.y * 0.3 - meshRef.current.rotation.y + baseRot.y) * delta * 2;
    meshRef.current.rotation.x += tx;
    meshRef.current.rotation.y += ty;
  });

  return <mesh ref={meshRef} geometry={geometry} material={material} />;
}

function StudioLights() {
  return (
    <>
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={3} color="#fffaf1" position={[-3, 4, 2]} scale={[5, 5, 1]} />
        <Lightformer form="rect" intensity={1.8} color="#eee5ff" position={[3, 1.5, 2]} rotation={[0, -0.7, 0]} scale={[3, 3, 1]} />
        <Lightformer form="ring" intensity={1} color="#e8f2e5" position={[-2, -1, 1]} scale={[2.5, 2.5, 1]} />
      </Environment>
      <ambientLight intensity={0.7} color="#fff9ed" />
      <directionalLight position={[-4, 5, 5]} intensity={2} color="#fff7ea" />
    </>
  );
}

export default function ChromeAccent({
  scale = 1,
  position = [0, 0, 0] as [number, number, number],
  showShadow = true,
  shape = "icosahedron",
  mouse = { current: { x: 0, y: 0 } },
}: {
  scale?: number;
  position?: [number, number, number];
  showShadow?: boolean;
  shape?: ShapeType;
  mouse?: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const ref = useRef<THREE.Group>(null);

  const pos = useMemo<[number, number, number]>(() => {
    return [position[0], position[1], position[2]];
  }, [position]);

  return (
    <group ref={ref} position={pos} scale={scale}>
      <StudioLights />
      <ChromeMesh shape={shape} mouse={mouse} />
      {showShadow && <ContactShadows position={[0, -1.4, 0]} opacity={0.12} scale={3} blur={2.5} far={2.5} />}
    </group>
  );
}
