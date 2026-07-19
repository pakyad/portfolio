import { useThree } from "@react-three/fiber";

export interface CompositionValues {
  scale: number;
  positionX: number;
  positionY: number;
  shadowPositionX: number;
}

export function useViewportComposition(): CompositionValues {
  const { viewport, size } = useThree();
  const w = size.width;

  let xFraction: number;
  let scaleMultiplier: number;

  if (w < 540) {
    xFraction = 0.07;
    scaleMultiplier = 0.15;
  } else if (w < 768) {
    xFraction = 0.09;
    scaleMultiplier = 0.15;
  } else if (w < 1024) {
    xFraction = 0.14;
    scaleMultiplier = 0.14;
  } else {
    xFraction = 0.18;
    scaleMultiplier = 0.15;
  }

  const scale = Math.min(viewport.width * scaleMultiplier, 0.92);
  const positionX = viewport.width * xFraction;
  const positionY = -0.1;
  const shadowPositionX = positionX;

  return { scale, positionX, positionY, shadowPositionX };
}
