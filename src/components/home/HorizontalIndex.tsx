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
  pulse: {
    bpm: 96,
    chord: ["D3", "A3", "C4", "F#4"],
    bass: "D1",
    arp: ["D4", "F#4", "A4", "C5", "A4", "F#4"],
  },
  codedulu: {
    bpm: 90,
    chord: ["E3", "B3", "D4", "G4"],
    bass: "E1",
    arp: ["E4", "G4", "B4", "D5", "B4", "G4"],
  },
  soon: {
    bpm: 100,
    chord: ["C3", "G3", "Bb3", "E4"],
    bass: "C1",
    arp: ["C4", "E4", "G4", "Bb4", "G4", "E4"],
  },
};

export default function HorizontalIndex() {
  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const previewLabelRef = useRef<HTMLSpanElement>(null);
  const activeRowRef = useRef<HTMLElement | null>(null);

  const mouseRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

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
      const offsetX = posRef.current.x + 24;
      const offsetY = posRef.current.y - 260;
      const scale = activeRowRef.current ? 1 : 0.9;
      (el as HTMLDivElement).style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
      rafRef.current = requestAnimationFrame(animate);
    }
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    let muted = false;
    let audioReady = false;
    let currentPreset: string | null = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let padLoop: any = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let bassLoop: any = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let arpLoop: any = null;

    function initTone() {
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
        padLoop = new Tone.Loop((time: number) => {
          pad.triggerAttackRelease(preset.chord, "2n", time);
        }, "1m");

        bassLoop = new Tone.Loop((time: number) => {
          bass.triggerAttackRelease(preset.bass, "8n", time);
        }, "4n");

        arpLoop = new Tone.Loop((time: number) => {
          pluck.triggerAttackRelease(preset.arp[step % preset.arp.length], "16n", time);
          step++;
        }, "8n");
      }

      function startLoop(name: string) {
        if (muted || !audioReady) return;
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
        Tone.Draw.schedule(() => {
          masterVol.volume.value = -10;
        }, now + 0.2);
      }

      async function unlockAudio() {
        if (audioReady) return;
        await Tone.start();
        Tone.Transport.start();
        audioReady = true;
        const hint = document.getElementById("audio-hint");
        if (hint) hint.textContent = "Sound enabled — hover a project.";
      }

      const unlockHandler = () => { unlockAudio(); window.removeEventListener("pointerdown", unlockHandler); };
      window.addEventListener("pointerdown", unlockHandler, { once: true });

      const toggle = document.getElementById("sound-toggle");
      if (toggle) {
        const toggleHandler = () => {
          muted = toggle.textContent === "Sound off";
          if (muted) stopLoop();
        };
        toggle.addEventListener("click", toggleHandler);
      }

      const isTouch = matchMedia("(pointer: coarse)").matches;

      if (isTouch) {
        document.body.classList.add("is-touch");
        const hint = document.getElementById("audio-hint");
        if (hint) hint.textContent = "Scroll to preview each project — sound unlocks on first touch.";

        function setRowActive(row: HTMLElement, active: boolean) {
          const loopName = row.getAttribute("data-loop");
          const btn = row.querySelector<HTMLElement>(".play-icon");
          if (active) {
            row.classList.add("expanded");
            startLoop(loopName || "");
            if (btn) { btn.textContent = "■"; btn.classList.add("playing"); }
            if (navigator.vibrate) navigator.vibrate(6);
          } else {
            row.classList.remove("expanded");
            if (currentPreset === loopName) stopLoop();
            if (btn) { btn.textContent = "▶"; btn.classList.remove("playing"); }
          }
        }

        const scrollObserver = new IntersectionObserver(
          (entries) => { entries.forEach((entry) => setRowActive(entry.target as HTMLElement, entry.isIntersecting)); },
          { rootMargin: "-42% 0px -42% 0px", threshold: 0 }
        );
        const touchRows = (list as HTMLElement).querySelectorAll<HTMLElement>(".project-row");
        touchRows.forEach((row) => scrollObserver.observe(row));

        touchRows.forEach((row) => {
          const playBtn = row.querySelector<HTMLElement>(".play-icon");
          if (playBtn) {
            playBtn.addEventListener("click", async (e) => {
              e.stopPropagation();
              if (!audioReady) await unlockAudio();
              const loopName = row.getAttribute("data-loop");
              setRowActive(row, currentPreset !== loopName);
            });
          }
        });
      } else {
        const rows = (list as HTMLElement).querySelectorAll<HTMLElement>(".project-row");
        rows.forEach((row) => {
          const loopName = row.getAttribute("data-loop");
          const image = row.getAttribute("data-image");
          const label = row.getAttribute("data-label");

          row.addEventListener("mouseenter", () => {
            activeRowRef.current = row;
            if (previewRef.current && image) previewRef.current.style.backgroundImage = image;
            if (previewLabelRef.current && label) previewLabelRef.current.textContent = label;
            if (previewRef.current) previewRef.current.classList.add("active");
            if (loopName) startLoop(loopName);
          });

          row.addEventListener("mouseleave", () => {
            activeRowRef.current = null;
            if (previewRef.current) previewRef.current.classList.remove("active");
            stopLoop();
          });
        });
      }
    }

    const checkTone = setInterval(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((window as any).Tone) {
        clearInterval(checkTone);
        initTone();
      }
    }, 200);
  }, []);

  return (
    <>
      <section id="work" className="work-section" aria-labelledby="work-heading">
        <h2 id="work-heading">Selected work.</h2>
        <p className="hint" id="audio-hint">Click anywhere once to enable sound — then hover a project.</p>
        <div className="project-list" ref={listRef}>
          {projects.map((project, i) => {
            const gradients = [
              "linear-gradient(135deg, #2a4d7a, #16305c)",
              "linear-gradient(135deg, #3a2a6a, #1c1848)",
              "linear-gradient(135deg, #2a6a5a, #143830)",
            ];
            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="project-row"
                data-image={gradients[i % gradients.length]}
                data-label={`${project.title} — ${categories[project.slug] || "Project"}`}
                data-loop={project.slug}
                aria-label={`View project: ${project.title}`}
              >
                <span className="project-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="project-category">{categories[project.slug] || "Project"}</span>
                <h3 className="project-title">{project.title}</h3>
                <span className="project-status">{project.role}</span>
                <span className="project-arrow">↗</span>
                <button className="play-icon" aria-label="Play preview sound">▶</button>
                <div className="row-expand"><div className="row-expand-inner" style={{ backgroundImage: gradients[i % gradients.length] }}></div></div>
              </Link>
            );
          })}
        </div>
      </section>
      <div id="preview" ref={previewRef}>
        <span className="preview-label" ref={previewLabelRef}></span>
      </div>
    </>
  );
}
