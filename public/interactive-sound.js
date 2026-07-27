(() => {
  "use strict";

  let audioCtx = null;
  let unlocked = false;

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
    if (!unlocked) return;
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
    cry: () => {
      playTone(500, 0.25, { type: "sine", gain: 0.05, glideTo: 300 });
      setTimeout(() => playTone(400, 0.3, { type: "sine", gain: 0.04, glideTo: 200 }), 130);
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

})();
