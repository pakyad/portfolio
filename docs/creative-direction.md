# Creative Direction — Muhammad Iyad

## Positioning

A software engineering student who builds real products end to end: interface, product logic, and the infrastructure underneath. The portfolio presents work as documented systems — constraints, decisions, trade-offs — in a plain first-person voice. Relaxed, human, no marketing superlatives.

Style reference: Robert Borghesi-style creative developer portfolios — dark ground, huge display type, `( WRK ) ( WHO ) ( MSG )` navigation grammar, `//YY` year markers on work rows.

---

## Palette

| Token | Hex | Role |
|---|---|---|
| Navy | `#6587AB` | Page background |
| Navy deep | `#4A6B8A` | Secondary surface |
| Cream / Ink | `#F7F5F0` | Text and primary foreground |
| Muted | `rgba(247,245,240,.72)` | Secondary text, labels, metadata |
| Rule | `rgba(247,245,240,.3)` | 1px borders and dividers |
| Gold accent | `#E8C87A` | Year markers, `//` glyphs, primary email link, status highlights |

- Gold is used sparingly: small mono markers, one chip state, the primary contact email.
- Rules are 1px, always low-opacity cream.
- Single theme. No dark/light toggle.

---

## Typography

| Role | Face |
|---|---|
| Display (hero name, section titles, contact headline) | Anton (`--font-anton`) |
| Body and UI | Geist Sans |
| Mono accents (year markers, labels, `//` glyphs) | Geist Mono / monospace stack |

- Display type is huge and tight-tracked (`-.04em` to `-.07em`), used for: hero name, "Let's connect.", project titles, chapter headings.
- Labels are 10–12px uppercase with wide tracking.
- Body copy stays under ~34rem line length.

---

## Layout

Vertical document flow, max width 1440px. Sections: Hero → Selected Work (+ More builds) → About → Contact.

- **Hero:** full viewport, kinetic per-character reveal of "IYAD IMAN", one relaxed first-person intro sentence.
- **Selected work:** Borghesi-grammar rows — `//YY · category · TITLE · [Live][Source] · status`. Hover shows floating preview card (desktop) or spotlight card (touch). Unavailable projects dim and drop their Live tag.
- **More builds:** lighter outbound rows for smaller sites — `//YY · number · description`. Placeholders render dimmed until real entries replace them.
- **About:** two-column; thesis heading + conversational copy left, Now-building panel + interactive Penang map right.
- **Contact:** giant display headline, availability note, horizontal link row with the email as the oversized gold primary link.
- Project detail pages: Evidence → Problem/Constraint → Screenshots → Constraints→Decisions → What broke → What I learned → Prev/Next navigator.

No card grids, dashboards, glassmorphism, or decorative gradients beyond the row hover previews.

---

## Motion

- anime.js only (no GSAP, no Framer Motion in this repo).
- Kinetic text reveal on hero, scroll-reveal sections on project pages, hover transitions at `cubic-bezier(0.16, 1, 0.3, 1)`.
- Canvas map dots repel from cursor; Penang marker breathes.
- All motion disabled under `prefers-reduced-motion`.

---

## Forbidden Patterns

Dark cyberpunk neon, bento grids, fake metrics or testimonials, typewriter/glitch text, scroll-jacking, splash screens, custom cursors on touch, emoji in content, AI-sounding template copy ("thoughtful digital products", identical outcome scaffolds across projects).
