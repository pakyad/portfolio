# Motion Principles — Muhammad Iyad

## Philosophy

Motion serves clarity, not spectacle. Every animation has a communicative purpose: establishing hierarchy, indicating state, guiding attention, or reinforcing the feeling of a physical editorial object moving through space.

If an animation can be removed without losing understanding, it should not exist.

---

## The Decision Trace

The Decision Trace is the signature interaction of this portfolio. It encodes the engineering editorial concept into a visible behaviour: every project entry in the selected-work section reveals its detail and structure progressively as the visitor gives it focus.

### Behaviour

1. A project row at rest is fully legible but subdued — text at 70% opacity, no chrome object visible, "View" label hidden.
2. On hover or focus, the row sharpens: text returns to full ink, the chrome accent fades in, the row translates 4–8px to the right, and the "View" label appears in violet.
3. The transition uses a 300–400ms eased curve. It never bounces, scales, or spins.
4. Non-focused projects remain visible at 40% opacity, providing spatial context without competing for attention.

This is not a hover effect. It is a trace of decision weight — the system communicating “this item is ready to be examined.”

---

## Timing Reference

| Context | Duration | Easing |
|---|---|---|
| UI feedback (button, link, label) | 160–240ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Hover / focus state transition | 220–400ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Horizontal section handoff (scroll) | 700–1,000ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Project route entry (fade in) | 500–800ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Stagger between elements | 40–80ms offset | — |

### Easing Curve

The primary easing curve is `cubic-bezier(0.16, 1, 0.3, 1)`. This is a restrained ease-out with a subtle deceleration — it starts quickly and settles naturally. No elastic or overshooting curves except for an intentionally subtle physical settling of the chrome object (via natural spring dynamics in the render loop).

---

## Horizontal Scroll System

Desktop uses a pinned horizontal scroll driven by vertical wheel input. The container translates so that each section arrives as a full viewport composition.

Principles:
- The scroll feels physically damped, not linear, not accelerated.
- The scroll must never trap the visitor. At any point the visitor can stop, reverse direction, or jump via navigation.
- Section transitions preserve reading clarity. Content does not animate independently during scroll — the whole scene moves as a single editorial page turning.
- The active section is tracked by scroll progress and reflected in the navigation index. No offset-based detection, which is unreliable with CSS transforms.

Mobile and `prefers-reduced-motion` fall back to a normal vertical document flow with no pinned scroll animation.

---

## Project Detail Entry

When a visitor navigates to a project case study, content fades in from 16px below with staggered timing. Each section (proposition, problem, approach, decisions, features, technologies, outcome) appears sequentially, building the story as the visitor reads downward.

This is a single play, not a repeat. Scrolling back up does not replay animations.

---

## Chrome Object Motion

The iridescent pearl-chrome object uses subtle rotational motion driven by cursor position. The effect is:
- A gentle lean toward the cursor, not a full rotation
- Damped with a low-pass filter (delta * rate) so movement feels inert and physical
- Active only on desktop, only within the containing section

When the object is small (work section project rows), it only appears on hover and settles immediately without active cursor tracking.

No WebGL scene ever auto-rotates. No ambient idle animation.

---

## Reduced Motion Behaviour

When `prefers-reduced-motion: reduce` is active:

- GSAP ScrollTrigger pinned scroll is disabled. Sections stack vertically.
- All GSAP-driven entry animations are skipped.
- CSS transitions run at `0.01ms`.
- The R3F chrome canvas is not rendered.
- Navigation uses native `scrollIntoView` with `behavior: "smooth"` (which the browser may also override).
- The site remains fully functional and visually complete.

---

## Forbidden Motion Patterns

- No linear animations. Every curve must have intent.
- No scroll-jacking. The wheel controls scroll progress naturally via GSAP scrub.
- No auto-playing animations on load.
- No parallax that creates disorientation.
- No elements that move continuously without user interaction.
- No bounce-back or overshoot on UI elements.
- No motion that delays content visibility.
- No canvas animations that run when the tab is hidden.
