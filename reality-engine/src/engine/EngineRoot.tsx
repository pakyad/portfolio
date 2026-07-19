"use client";

import { type ReactNode } from "react";
import { EngineProvider } from "@/engine/state/engineStore";

export function EngineRoot({ children }: { children: ReactNode }) {
  return <EngineProvider>{children}</EngineProvider>;
}
