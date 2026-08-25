# Motion Principles — Muhammad Iyad

## Philosophy

Motion serves clarity. Every animation communicates hierarchy, state, or focus. If it can be removed without losing meaning, remove it.

## Stack

anime.js v4 (`animate`, `stagger`, `utils`) — the only animation dependency in this repo. No GSAP, no Framer Motion, no WebGL.

## Inventory

| Interaction | Implementation | Notes |
|---|---|---|
| Hero name reveal | `KineticText.tsx` — per-character mask rise, 950ms, 48ms stagger, outExpo | Plays once on load |
| Hero intro fade | CSS `hero-fade` keyframes, .9s delay .5s | |
| Project rows | CSS hover — title translateX(16px), arrow fade-in, sibling dim to .35 opacity, `cubic-bezier(0.16, 1, 0.3, 1)` | Touch: IntersectionObserver spotlight card instead (`ProjectInteractions.tsx`) |
| Floating preview | rAF lerp following cursor (factor .15) over gradient card | Desktop only; hidden on touch and reduced-motion |
| Scroll reveals | `ScrollReveal.tsx` — IntersectionObserver + anime.js fade/rise, plays once per section | Project pages only |
| Map dots | Canvas rAF loop — pointer repulsion (radius 80), lerp .06, Penang marker breathes via sine | `InteractiveMap.tsx` |
| Reading progress | Fixed 2px bar, transform scaleX | Project pages |

## Timing

- UI feedback: 160–240ms
- Hover/focus states: 220–400ms
- Entry reveals: 500–950ms with 40–100ms stagger
- Primary curve: `cubic-bezier(0.16, 1, 0.3, 1)` — fast start, natural settle. No bounce, no overshoot.

## Reduced Motion

`prefers-reduced-motion: reduce` disables: kinetic text (chars stay at 0%), scroll reveals, hero fade, all transitions, smooth scroll. Content fully visible without JS-driven motion.

## Forbidden

Scroll-jacking, looping idle animations outside the map canvas, typewriter/glitch effects, parallax disorientation, motion that delays content visibility, canvas work while tab is hidden.
