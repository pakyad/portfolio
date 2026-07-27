(() => {
  "use strict";

  let audioCtx = null;
  let unlocked = false;
  let muted = localStorage.getItem("site-sound-muted") === "true";

  function getCtx() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
  }

  function unlockAudio() {
    if (unlocked) return;
    const ctx = getCtx();
    if (ctx.state === "suspended") ctx.resume();
    unlocked = true;
    window.removeEventListener("pointerdown", unlockAudio);
    window.removeEventListener("keydown", unlockAudio);
  }
  window.addEventListener("pointerdown", unlockAudio, { once: true });
  window.addEventListener("keydown", unlockAudio, { once: true });

  function playTone(freq, duration = 0.12, opts = {}) {
    if (muted || !unlocked) return;
    const ctx = getCtx();
    const { type = "sine", gain = 0.05, glideTo = null } = opts;

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    if (glideTo) {
      osc.frequency.exponentialRampToValueAtTime(glideTo, ctx.currentTime + duration);
    }

    gainNode.gain.setValueAtTime(0.0001, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(gain, ctx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gainNode).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration + 0.02);
  }

  const sounds = {
    tick: () => playTone(880, 0.06, { type: "sine", gain: 0.04 }),
    ping: () => playTone(440, 0.18, { type: "sine", gain: 0.05, glideTo: 660 }),
    chime: () => {
      playTone(523.25, 0.15, { type: "sine", gain: 0.045 });
      setTimeout(() => playTone(783.99, 0.2, { type: "sine", gain: 0.04 }), 90);
    },
    heartbeat: () => {
      playTone(120, 0.1, { type: "sine", gain: 0.06 });
      setTimeout(() => playTone(100, 0.12, { type: "sine", gain: 0.05 }), 140);
    },
    arpeggio: () => {
      [261.63, 329.63, 392.0, 523.25].forEach((freq, i) => {
        setTimeout(() => playTone(freq, 0.15, { type: "sine", gain: 0.05 }), i * 80);
      });
    },
  };

  document.querySelectorAll("[data-sound]").forEach((el) => {
    const key = el.getAttribute("data-sound");
    if (!sounds[key]) return;
    el.addEventListener("mouseenter", () => sounds[key]());
  });

  const heroLogo = document.querySelector("[data-hero-logo]");
  if (heroLogo) {
    heroLogo.addEventListener("mouseenter", () => sounds.heartbeat());
    heroLogo.addEventListener("click", () => {
      sounds.arpeggio();
      heroLogo.classList.add("spin-fast");
      setTimeout(() => heroLogo.classList.remove("spin-fast"), 900);
    });
  }

  const toggle = document.getElementById("sound-toggle");
  function updateToggleUI() {
    if (!toggle) return;
    toggle.setAttribute("aria-pressed", String(!muted));
    toggle.textContent = muted ? "Sound off" : "Sound on";
  }
  if (toggle) {
    updateToggleUI();
    toggle.addEventListener("click", () => {
      muted = !muted;
      localStorage.setItem("site-sound-muted", String(muted));
      updateToggleUI();
      if (!muted) sounds.tick();
    });
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReducedMotion) {
    document.querySelectorAll("[data-magnetic]").forEach((el) => {
      const strength = parseFloat(el.getAttribute("data-magnetic")) || 0.3;

      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });

      el.addEventListener("mouseleave", () => {
        el.style.transform = "translate(0, 0)";
      });
    });
  }

  const ring = document.getElementById("cursor-ring");
  if (ring && !prefersReducedMotion && matchMedia("(pointer: fine)").matches) {
    let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.2;
      ringY += (mouseY - ringY) * 0.2;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll("a, button, [data-sound], [data-magnetic]").forEach((el) => {
      el.addEventListener("mouseenter", () => ring.classList.add("ring-active"));
      el.addEventListener("mouseleave", () => ring.classList.remove("ring-active"));
    });
  }
})();
