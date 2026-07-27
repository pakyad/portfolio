"use client";

import { useEffect, useState, useCallback, useRef } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "ready" | "transitioning" | "dismissed">(
    () => sessionStorage.getItem("ls-dismissed") ? "dismissed" : "loading"
  );
  const toneStartedRef = useRef(false);

  useEffect(() => {
    if (phase !== "loading") return;

    const duration = 3000;
    const start = performance.now();
    let raf: number;

    function tick(now: number) {
      const p = Math.min((now - start) / duration, 1);
      setProgress(p);
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setPhase("ready");
      }
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  const playTransitionSound = useCallback(() => {
    if (toneStartedRef.current) return;
    toneStartedRef.current = true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Tone = (window as any).Tone;
    if (!Tone) return;
    try {
      Tone.start().then(() => {
        const now = Tone.now();
        const masterVol = new Tone.Volume(-16).toDestination();
        const pad = new Tone.PolySynth(Tone.Synth, {
          oscillator: { type: "sine" },
          envelope: { attack: 0.6, decay: 0.2, sustain: 0.9, release: 2.5 },
          volume: -12,
        }).connect(masterVol);
        const pluck = new Tone.Synth({
          oscillator: { type: "triangle" },
          envelope: { attack: 0.01, decay: 0.3, sustain: 0, release: 0.4 },
          volume: -8,
        }).connect(masterVol);
        pad.triggerAttackRelease(["C3", "E3", "G3", "B3"], "2n", now);
        pad.triggerAttackRelease(["C4", "E4", "G4"], "2n", now + 0.15);
        const arpNotes = ["C4", "E4", "G4", "B4", "C5", "E5"];
        arpNotes.forEach((note, i) => {
          pluck.triggerAttackRelease(note, "8n", now + i * 0.1);
        });
        masterVol.volume.setValueAtTime(-28, now);
        masterVol.volume.linearRampToValueAtTime(-12, now + 0.8);
        masterVol.volume.linearRampToValueAtTime(-36, now + 2);
      });
    } catch {
      // Tone not available
    }
  }, []);

  const dismiss = useCallback(() => {
    if (phase !== "ready") return;
    setPhase("transitioning");
    playTransitionSound();
    setTimeout(() => {
      sessionStorage.setItem("ls-dismissed", "true");
      setPhase("dismissed");
    }, 2000);
  }, [phase, playTransitionSound]);

  if (phase === "dismissed") return null;

  return (
    <div className={`loading-screen ${phase}`} onClick={dismiss}>
      <div className="loading-content">
        <div className="loading-bar-track">
          <div className="loading-bar-fill" style={{ width: `${progress * 100}%` }} />
        </div>
        <p className="loading-text">
          {phase === "loading" ? "pretending to load something" : phase === "ready" ? "Click somewhere" : ""}
        </p>
      </div>
    </div>
  );
}
