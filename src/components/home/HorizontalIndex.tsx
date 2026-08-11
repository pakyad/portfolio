"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { projects } from "@/content/projects";

const categories: Record<string, string> = {
  "alder-roasters": "Specialty coffee commerce",
  pulse: "Campus commerce platform",
  codedulu: "Developer momentum tool",
  soon: "Context-aware reminders",
  laterlah: "Save-for-later service",
  rosta: "Team shift scheduling",
};

const loopPresets: Record<string, { bpm: number; chord: string[]; bass: string; arp: string[] }> = {
  "alder-roasters": {
    bpm: 92,
    chord: ["F3", "A3", "C4", "E4"],
    bass: "F1",
    arp: ["F4", "A4", "C5", "E5", "C5", "A4"],
  },
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
  laterlah: {
    bpm: 88,
    chord: ["G3", "B3", "D4", "F#4"],
    bass: "G1",
    arp: ["G4", "B4", "D5", "F#5", "D5", "B4"],
  },
  rosta: {
    bpm: 94,
    chord: ["A3", "C4", "E4", "G4"],
    bass: "A1",
    arp: ["A4", "C5", "E5", "G5", "E5", "C5"],
  },
};

export default function HorizontalIndex() {
  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const previewLabelRef = useRef<HTMLSpanElement>(null);
  const activeRowRef = useRef<HTMLElement | null>(null);
  const spotlightCardRef = useRef<HTMLDivElement>(null);
  const spotlightLabelRef = useRef<HTMLSpanElement>(null);
  const stopSoundRef = useRef<() => void>(() => {});

  const mouseRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (matchMedia("(pointer: coarse)").matches) return;
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

    let audioReady = false;
    let currentPreset: string | null = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let padLoop: any = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let bassLoop: any = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let arpLoop: any = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let pad: any = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let bass: any = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let pluck: any = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let masterVol: any = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let limiter: any = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let reverb: any = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let delay: any = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let pluckFilter: any = null;
    let unlockHandler: (() => void) | null = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let scrollObserver: any = null;

    function disposeToneNodes() {
      if (padLoop) { padLoop.dispose(); padLoop = null; }
      if (bassLoop) { bassLoop.dispose(); bassLoop = null; }
      if (arpLoop) { arpLoop.dispose(); arpLoop = null; }
      if (pad) { pad.dispose(); pad = null; }
      if (bass) { bass.dispose(); bass = null; }
      if (pluck) { pluck.dispose(); pluck = null; }
      if (masterVol) { masterVol.dispose(); masterVol = null; }
      if (limiter) { limiter.dispose(); limiter = null; }
      if (reverb) { reverb.dispose(); reverb = null; }
      if (delay) { delay.dispose(); delay = null; }
      if (pluckFilter) { pluckFilter.dispose(); pluckFilter = null; }
    }

    function initTone() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Tone = (window as any).Tone;
      if (!Tone) return;

      audioReady = Tone.context.state === "running";
      if (audioReady) Tone.Transport.start();

      disposeToneNodes();

      masterVol = new Tone.Volume(-10).toDestination();
      limiter = new Tone.Limiter(-3);
      masterVol.connect(limiter);
      reverb = new Tone.Reverb({ decay: 4, wet: 0.35 }).connect(masterVol);
      delay = new Tone.FeedbackDelay({ delayTime: "8n.", feedback: 0.3, wet: 0.25 }).connect(reverb);

      pad = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: "triangle" },
        envelope: { attack: 1.2, decay: 0.3, sustain: 0.8, release: 2.5 },
        volume: -14,
      }).connect(reverb);

      bass = new Tone.Synth({
        oscillator: { type: "sine" },
        envelope: { attack: 0.05, decay: 0.2, sustain: 0.9, release: 0.6 },
        volume: -8,
      }).connect(masterVol);

      pluckFilter = new Tone.Filter(1800, "lowpass").connect(delay);
      pluck = new Tone.Synth({
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
        if (!masterVol) return;
        const now = Tone.now();
        masterVol.volume.cancelScheduledValues(now);
        masterVol.volume.setValueAtTime(masterVol.volume.value, now);
        masterVol.volume.linearRampTo(-36, 0.18);
        disposeLoops();
        currentPreset = null;
        Tone.Draw.schedule(() => {
          if (masterVol) masterVol.volume.value = -10;
        }, now + 0.2);
      }

      async function unlockAudio() {
        if (audioReady) return;
        await Tone.start();
        Tone.Transport.start();
        audioReady = true;
      }

      unlockHandler = () => { unlockAudio(); window.removeEventListener("pointerdown", unlockHandler!); };
      window.addEventListener("pointerdown", unlockHandler, { once: true });

      stopSoundRef.current = stopLoop;

      const isTouch = matchMedia("(pointer: coarse)").matches;

      if (isTouch) {
        scrollObserver = new IntersectionObserver(
          (entries) => {
            const allRows = (list as HTMLElement).querySelectorAll<HTMLElement>(".project-row");
            allRows.forEach((r) => r.classList.remove("spotlight"));
            (list as HTMLElement).classList.remove("has-spotlight");
            if (spotlightCardRef.current) { spotlightCardRef.current.style.background = ""; spotlightCardRef.current.classList.remove("active"); }
            if (spotlightLabelRef.current) spotlightLabelRef.current.textContent = "";
            stopLoop();

            const entering = entries.find((e) => e.isIntersecting);
            if (!entering) return;

            const row = entering.target as HTMLElement;
            row.classList.add("spotlight");
            (list as HTMLElement).classList.add("has-spotlight");
            const image = row.getAttribute("data-image");
            const label = row.getAttribute("data-label");
            const loopName = row.getAttribute("data-loop");
            if (spotlightCardRef.current) { spotlightCardRef.current.style.background = image ? `${image} center/cover no-repeat` : ""; spotlightCardRef.current.classList.add("active"); }
            if (spotlightLabelRef.current && label) spotlightLabelRef.current.textContent = label;
            if (loopName) startLoop(loopName);
          },
          { rootMargin: "-42% 0px -42% 0px", threshold: 0 }
        );
        const touchRows = (list as HTMLElement).querySelectorAll<HTMLElement>(".project-row");
        touchRows.forEach((row) => scrollObserver.observe(row));
      } else {
        const rows = (list as HTMLElement).querySelectorAll<HTMLElement>(".project-row");
        rows.forEach((row) => {
          const image = row.getAttribute("data-image");
          const label = row.getAttribute("data-label");

          row.addEventListener("mouseenter", () => {
            activeRowRef.current = row;
            if (previewRef.current) {
              if (image) previewRef.current.style.backgroundImage = image;
              else previewRef.current.style.backgroundImage = "";
            }
            if (previewLabelRef.current && label) previewLabelRef.current.textContent = label;
            if (previewRef.current) previewRef.current.classList.add("active");
          });

          row.addEventListener("mouseleave", () => {
            activeRowRef.current = null;
            if (previewRef.current) previewRef.current.classList.remove("active");
          });
        });

        const titles = (list as HTMLElement).querySelectorAll<HTMLElement>(".project-title");
        titles.forEach((title) => {
          const row = title.closest(".project-row") as HTMLElement;
          if (!row) return;
          const loopName = row.getAttribute("data-loop");

          title.addEventListener("mouseenter", () => {
            if (loopName) startLoop(loopName);
          });

          title.addEventListener("mouseleave", () => {
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

    return () => {
      clearInterval(checkTone);
      if (unlockHandler) window.removeEventListener("pointerdown", unlockHandler);
      if (scrollObserver) scrollObserver.disconnect();
      stopSoundRef.current = () => {};
      disposeToneNodes();
    };
  }, []);

  return (
    <>
      <section id="work" className="work-section" aria-labelledby="work-heading">
        <h2 id="work-heading">Selected work.</h2>
        <div className="project-list" ref={listRef}>
          {[...projects].sort((a, b) => Number(a.slug === "codedulu" || a.slug === "soon") - Number(b.slug === "codedulu" || b.slug === "soon")).map((project) => {
            const unavailable = project.slug === "codedulu" || project.slug === "soon";
            const previewImage = project.slug === "pulse" ? "url('/projects/pulse/pulse-campus-services.png')" : undefined;
            if (unavailable) {
              return (
                <div key={project.slug} className="project-row project-row--unavailable" aria-label={`${project.title} is under construction`}>
                  <span className="project-category">{categories[project.slug] || "Project"}</span>
                  <h3 className="project-title">{project.title}</h3>
                  <span className="construction-tape" aria-hidden="true">Unavailable</span>
                </div>
              );
            }

            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="project-row"
                data-image={previewImage}
                data-label={`${project.title} - ${categories[project.slug] || "Project"}`}
                data-loop={project.slug}
                aria-label={`View project: ${project.title}`}
                onClick={() => stopSoundRef.current()}
              >
                <span className="project-category">{categories[project.slug] || "Project"}</span>
                <h3 className="project-title">{project.title}</h3>
              </Link>
            );
          })}
        </div>
      </section>
      <div id="preview" ref={previewRef}>
        <span className="preview-label" ref={previewLabelRef}></span>
      </div>
      <div id="spotlight-card" ref={spotlightCardRef}>
        <span className="spotlight-label" ref={spotlightLabelRef}></span>
      </div>
    </>
  );
}
