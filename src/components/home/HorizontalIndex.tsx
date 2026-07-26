"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { projects } from "@/content/projects";

const categories: Record<string, string> = {
  pulse: "Marketplace",
  codedulu: "Side project",
  soon: "Side project",
};

const loopPresets: Record<string, { bpm: number; chord: string[]; bass: string; arp: string[] }> = {
  pulse: { bpm: 96, chord: ["D3", "A3", "C4", "F#4"], bass: "D1", arp: ["D4", "F#4", "A4", "C5", "A4", "F#4"] },
  codedulu: { bpm: 90, chord: ["E3", "B3", "D4", "G4"], bass: "E1", arp: ["E4", "G4", "B4", "D5", "B4", "G4"] },
  soon: { bpm: 100, chord: ["C3", "G3", "Bb3", "E4"], bass: "C1", arp: ["C4", "E4", "G4", "Bb4", "G4", "E4"] },
};

export default function HorizontalIndex() {
  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const gateRef = useRef<HTMLDivElement>(null);
  const gateCountRef = useRef<HTMLDivElement>(null);
  const gateEnterRef = useRef<HTMLDivElement>(null);
  const gateSubRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const hoveredRowRef = useRef<HTMLElement | null>(null);

  const mouseRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const previewActiveRef = useRef(false);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;

    function animate() {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      posRef.current.x += (mx - posRef.current.x) * 0.15;
      posRef.current.y += (my - posRef.current.y) * 0.15;
      el!.style.transform = `translate(${posRef.current.x + 24}px, ${posRef.current.y - 260}px) scale(${previewActiveRef.current ? 1 : 0.9})`;
      rafRef.current = requestAnimationFrame(animate);
    }
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    let audioReady = false;
    let currentPreset: string | null = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let padLoop: any = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let bassLoop: any = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let arpLoop: any = null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Tone = (window as any).Tone;
    if (!Tone) return;

    const masterVol = new Tone.Volume(-10).toDestination();
    const limiter = new Tone.Limiter(-3);
    masterVol.connect(limiter);
    const reverb = new Tone.Reverb({ decay: 4, wet: 0.35 }).connect(masterVol);
    const delay = new Tone.FeedbackDelay({ delayTime: "8n.", feedback: 0.3, wet: 0.25 }).connect(reverb);

    const pad = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "triangle" },
      envelope: { attack: 1.2, decay: 0.3, sustain: 0.8, release: 2.5 },
      volume: -14,
    }).connect(reverb);

    const bass = new Tone.Synth({
      oscillator: { type: "sine" },
      envelope: { attack: 0.05, decay: 0.2, sustain: 0.9, release: 0.6 },
      volume: -8,
    }).connect(masterVol);

    const pluckFilter = new Tone.Filter(1800, "lowpass").connect(delay);
    const pluck = new Tone.Synth({
      oscillator: { type: "square" },
      envelope: { attack: 0.005, decay: 0.15, sustain: 0, release: 0.1 },
      volume: -20,
    }).connect(pluckFilter);

    function disposeLoops() {
      if (padLoop) { padLoop.dispose(); padLoop = null; }
      if (bassLoop) { bassLoop.dispose(); bassLoop = null; }
      if (arpLoop) { arpLoop.dispose(); arpLoop = null; }
    }

    function buildLoops(preset: { bpm: number; chord: string[]; bass: string; arp: string[] }) {
      disposeLoops();
      Tone.Transport.bpm.value = preset.bpm;
      let step = 1;
      padLoop = new Tone.Loop((time: number) => pad.triggerAttackRelease(preset.chord, "2n", time), "1m");
      bassLoop = new Tone.Loop((time: number) => bass.triggerAttackRelease(preset.bass, "8n", time), "4n");
      arpLoop = new Tone.Loop((time: number) => {
        pluck.triggerAttackRelease(preset.arp[step % preset.arp.length], "16n", time);
        step++;
      }, "8n");
    }

    function startLoop(name: string) {
      if (!audioReady) return;
      const preset = loopPresets[name];
      if (!preset || currentPreset === name) return;
      disposeLoops();
      currentPreset = name;
      Tone.Transport.bpm.value = preset.bpm;
      const now = Tone.now();
      pad.triggerAttackRelease(preset.chord, "2n", now);
      bass.triggerAttackRelease(preset.bass, "8n", now + 0.01);
      pluck.triggerAttackRelease(preset.arp[0], "16n", now + 0.02);
      masterVol.volume.cancelScheduledValues(now);
      masterVol.volume.setValueAtTime(masterVol.volume.value, now);
      masterVol.volume.linearRampTo(-10, 0.12);
      buildLoops(preset);
      padLoop.start("+1m");
      bassLoop.start("+4n");
      arpLoop.start("+8n");
    }

    function stopLoop() {
      const now = Tone.now();
      masterVol.volume.cancelScheduledValues(now);
      masterVol.volume.setValueAtTime(masterVol.volume.value, now);
      masterVol.volume.linearRampTo(-36, 0.18);
      disposeLoops();
      currentPreset = null;
      Tone.Draw.schedule(() => { masterVol.volume.value = -10; }, now + 0.2);
    }

    async function unlockAudio() {
      if (audioReady) return;
      await Tone.start();
      Tone.Transport.start();
      audioReady = true;
      if (hoveredRowRef.current) activateRow(hoveredRowRef.current);
    }

    const rows = list.querySelectorAll<HTMLElement>(".row");

    function activateRow(row: HTMLElement) {
      rows.forEach((r) => r.classList.remove("active"));
      row.classList.add("active");
      list!.classList.add("has-active");
      startLoop(row.getAttribute("data-loop") || "");
    }

    function deactivateAll() {
      rows.forEach((r) => r.classList.remove("active"));
      list!.classList.remove("has-active");
      stopLoop();
    }

    const isTouch = matchMedia("(pointer: coarse)").matches;

    if (isTouch) {
      const scrollObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              activateRow(entry.target as HTMLElement);
            } else if (entry.target.classList.contains("active")) {
              deactivateAll();
            }
          });
        },
        { rootMargin: "-42% 0px -42% 0px", threshold: 0 }
      );
      rows.forEach((row) => scrollObserver.observe(row));
    } else {
      rows.forEach((row) => {
        row.addEventListener("mouseenter", () => {
          hoveredRowRef.current = row;
          previewActiveRef.current = true;
          const image = row.getAttribute("data-image");
          if (previewRef.current && image) previewRef.current.style.backgroundImage = image;
          if (previewRef.current) previewRef.current.classList.add("active");
          activateRow(row);
        });
        row.addEventListener("mouseleave", () => {
          if (hoveredRowRef.current === row) hoveredRowRef.current = null;
          previewActiveRef.current = false;
          if (previewRef.current) previewRef.current.classList.remove("active");
          deactivateAll();
        });
      });
    }

    // Gate/loading counter
    const gate = gateRef.current;
    const gateCount = gateCountRef.current;
    const gateEnter = gateEnterRef.current;
    const gateSub = gateSubRef.current;

    if (gate && gateCount && gateEnter && gateSub) {
      const g = gate;
      const gc = gateCount;
      const ge = gateEnter;
      const gs = gateSub;

      let pct = 0;
      const loadTimer = setInterval(() => {
        pct += Math.ceil(Math.random() * 18);
        if (pct >= 100) {
          pct = 100;
          clearInterval(loadTimer);
          gc.style.display = "none";
          ge.style.display = "block";
          gs.style.display = "block";
        }
        gc.textContent = String(pct).padStart(2, "0") + "%";
      }, 90);

      function dismissGate() {
        g.classList.add("hidden");
        setTimeout(() => g.remove(), 650);
      }

      async function handleFirstInteraction() {
        await unlockAudio();
        dismissGate();
      }

      g.addEventListener("click", handleFirstInteraction);
      g.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleFirstInteraction();
        }
      });
    }
  }, []);

  const gradients = [
    "linear-gradient(135deg, #2a4d7a, #16305c)",
    "linear-gradient(135deg, #3a2a6a, #1c1848)",
    "linear-gradient(135deg, #2a6a5a, #143830)",
  ];

  return (
    <>
      <div id="gate" ref={gateRef} tabIndex={0} role="button" aria-label="Enter site">
        <div id="gate-count" ref={gateCountRef}>00%</div>
        <div id="gate-enter" ref={gateEnterRef}>Press play.</div>
        <div id="gate-sub" ref={gateSubRef}>Click or tap</div>
      </div>

      <section id="work" className="work-section" aria-labelledby="work-heading">
        <h2 id="work-heading" className="section-title">Selected work.</h2>
        <p className="hint" id="hint" ref={hintRef}>Hover a project to preview it.</p>
        <div className="list" id="project-list" ref={listRef}>
          {projects.map((project, i) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="row"
              data-image={gradients[i % gradients.length]}
              data-loop={project.slug}
              aria-label={`View project: ${project.title}`}
            >
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              <span className="category">{categories[project.slug] || "Project"}</span>
              <h3 className="title">{project.title}</h3>
              <span className="status">{project.role}</span>
            </Link>
          ))}
        </div>
      </section>

      <div id="preview" ref={previewRef}></div>
    </>
  );
}
