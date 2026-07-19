export type InteractionState =
  | "idle"
  | "intentCaptured"
  | "handEntering"
  | "handApproaching"
  | "handAnticipating"
  | "handContacting"
  | "materialResponding"
  | "handHolding"
  | "handReleasing"
  | "portalForming"
  | "sceneRevealing"
  | "stable"
  | "fallback";

export const INITIAL_STATE: InteractionState = "idle";

const ALLOWED_TRANSITIONS: Record<InteractionState, InteractionState[]> = {
  idle: ["intentCaptured"],
  intentCaptured: ["handEntering"],
  handEntering: ["handApproaching"],
  handApproaching: ["handAnticipating"],
  handAnticipating: ["handContacting"],
  handContacting: ["materialResponding"],
  materialResponding: ["handHolding", "handReleasing"],
  handHolding: ["handReleasing"],
  handReleasing: ["portalForming"],
  portalForming: ["sceneRevealing"],
  sceneRevealing: ["stable"],
  stable: [],
  fallback: [],
};

export function canTransition(
  from: InteractionState,
  to: InteractionState,
): boolean {
  if (to === "fallback") return true;
  if (to === "idle" && from !== "fallback") return true;
  return ALLOWED_TRANSITIONS[from]?.includes(to) ?? false;
}
