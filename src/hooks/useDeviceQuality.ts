"use client";

import { useMediaQuery } from "./useMediaQuery";

export type DeviceQuality = "low" | "high";

interface NavigatorWithMemory extends Navigator {
  deviceMemory?: number;
}

function hasLowMemory(): boolean {
  if (typeof navigator === "undefined") return false;
  const nav = navigator as NavigatorWithMemory;
  const dm = nav.deviceMemory;
  return typeof dm === "number" && dm > 0 && dm < 4;
}

function hasLowProcessor(): boolean {
  if (typeof navigator === "undefined") return false;
  const hc = navigator.hardwareConcurrency;
  return hc > 0 && hc <= 4;
}

export function useDeviceQuality(): DeviceQuality {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTouchOnly = useMediaQuery("(hover: none) and (pointer: coarse)");

  if (isMobile || isTouchOnly || hasLowMemory() || hasLowProcessor()) {
    return "low";
  }

  return "high";
}
