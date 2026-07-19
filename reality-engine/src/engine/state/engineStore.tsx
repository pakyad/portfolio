"use client";

import {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from "react";
import {
  type InteractionState,
  INITIAL_STATE,
  canTransition,
} from "@/engine/state/interactionMachine";

interface EngineState {
  current: InteractionState;
}

type EngineAction =
  | { type: "TRANSITION"; to: InteractionState }
  | { type: "RESET" }
  | { type: "FALLBACK" };

function engineReducer(
  state: EngineState,
  action: EngineAction,
): EngineState {
  switch (action.type) {
    case "TRANSITION": {
      if (canTransition(state.current, action.to)) {
        return { current: action.to };
      }
      return state;
    }
    case "RESET":
      return { current: INITIAL_STATE };
    case "FALLBACK":
      return { current: "fallback" };
    default:
      return state;
  }
}

interface EngineAPI {
  state: InteractionState;
  transition: (to: InteractionState) => void;
  reset: () => void;
  fallback: () => void;
}

const EngineContext = createContext<EngineAPI | null>(null);

export function EngineProvider({ children }: { children: ReactNode }) {
  const [machine, dispatch] = useReducer(engineReducer, {
    current: INITIAL_STATE,
  });

  const api: EngineAPI = {
    state: machine.current,
    transition: (to: InteractionState) =>
      dispatch({ type: "TRANSITION", to }),
    reset: () => dispatch({ type: "RESET" }),
    fallback: () => dispatch({ type: "FALLBACK" }),
  };

  return (
    <EngineContext.Provider value={api}>{children}</EngineContext.Provider>
  );
}

export function useEngine(): EngineAPI {
  const ctx = useContext(EngineContext);
  if (!ctx) {
    throw new Error("useEngine must be used within an EngineProvider");
  }
  return ctx;
}
