"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "@/content/projects";

const TYPING_SPEED = 55;
const DELETING_SPEED = 28;
const PAUSE_AFTER_TYPE = 3200;
const PAUSE_AFTER_DELETE = 400;

const active = projects.filter(
  (p) => p.thesis !== "Early side-project idea." && p.thesis.length > 0
);

type Phase = "typing" | "waiting" | "deleting";

export function NowBuilding() {
  const [display, setDisplay] = useState("");
  const [currentIdx, setCurrentIdx] = useState(0);
  const indexRef = useRef(0);
  const phaseRef = useRef<Phase>("typing");
  const charRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const tick = () => {
      const project = active[indexRef.current];
      const name = project.title;

      if (phaseRef.current === "typing") {
        if (charRef.current < name.length) {
          charRef.current++;
          setDisplay(name.slice(0, charRef.current));
          timerRef.current = setTimeout(tick, TYPING_SPEED);
        } else {
          phaseRef.current = "waiting";
          timerRef.current = setTimeout(tick, PAUSE_AFTER_TYPE);
        }
      } else if (phaseRef.current === "waiting") {
        phaseRef.current = "deleting";
        timerRef.current = setTimeout(tick, DELETING_SPEED);
      } else if (phaseRef.current === "deleting") {
        if (charRef.current > 0) {
          charRef.current--;
          setDisplay(name.slice(0, charRef.current));
          timerRef.current = setTimeout(tick, DELETING_SPEED);
        } else {
          const next = (indexRef.current + 1) % active.length;
          indexRef.current = next;
          setCurrentIdx(next);
          charRef.current = 0;
          phaseRef.current = "typing";
          timerRef.current = setTimeout(tick, PAUSE_AFTER_DELETE);
        }
      }
    };

    timerRef.current = setTimeout(tick, PAUSE_AFTER_DELETE);

    return () => clearTimeout(timerRef.current);
  }, []);

  if (active.length === 0) return null;

  return (
    <div className="now-building" aria-label="Currently building">
      <p className="now-building-prompt">
        <span className="now-building-prompt-sign">$</span>
        <span className="now-building-prompt-cmd">./build --project=</span>
        <span className="now-building-prompt-name">{display}</span>
        <span className="now-building-cursor" aria-hidden="true">▎</span>
      </p>
      <p className="now-building-thesis">{active[currentIdx]?.thesis}</p>
    </div>
  );
}
