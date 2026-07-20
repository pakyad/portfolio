# Creative Direction — Muhammad Iyad

## Positioning

**“I engineer thoughtful systems.”**

The portfolio positions Muhammad Iyad Iman as a software engineer who operates at the intersection of engineering clarity and editorial craft. The work is not displayed — it is presented. Every project is a documented system: its constraints, its decisions, its trade-offs, its outcome.

The site does not sell a personality. It publishes a practice.

---

## Palette

### Primary Ground

| Token | Hex | Role |
|---|---|---|
| Cream | `#F7F5F0` | Page background, primary negative space |
| Paper | `#EFEDE8` | Secondary surface, subtle separation |
| Ink | `#151515` | Body text, primary headings |
| Muted | `#6C6A65` | Secondary text, labels, metadata |
| Rule | `#D8D4CC` | Borders, dividers, structural lines |

### Accent

| Token | Hex | Role |
|---|---|---|
| Violet | `#7457E8` | Active state, selected project, navigation indicator, key interaction highlights |
| Pale Violet | `#E8E1FF` | Selection background, subtle hover fills |

### Usage Rules

- Violet is used sparingly: navigation active state, selected project state, fine progress indicators, selected words, small motion accents.
- Cream is the dominant surface. Paper appears only as a secondary block when visual separation is needed without a rule.
- Ink is always the text colour. Muted is used for dates, roles, metadata, and secondary captions.
- Rules are 1px, always `#D8D4CC` at 50–60% opacity. Never thick borders.
- No gradients except the iridescent pearl-chrome reflection on the signature 3D object.
- No dark mode. The site lives in warm light.

---

## Typography

### Typefaces

| Role | Face | Weight | Size |
|---|---|---|---|
| Editorial heading | Geist Sans | 300 (Light) | `clamp(2rem, 5vw, 3.5rem)` or larger |
| Project title | Geist Sans | 500 (Medium) | `clamp(1.1rem, 2.2vw, 1.75rem)` |
| Body copy | Geist Sans | 400 (Regular) | `0.95rem – 1.15rem` |
| Labels, metadata, dates | Geist Mono | 400 (Regular) | `10px – 12px`, uppercase, wide tracking |
| Small system text | Geist Mono | 400 | `10px – 11px` |

### Typographic Rules

- Headings use negative tracking (`-0.02em` to `-0.035em`) for compact editorial weight.
- Body copy never exceeds 720px line length on project detail pages.
- No typewriter effects. No scrambled or glitch typography.
- No paragraph walls. Body text is broken into digestible segments with breathing space.
- Mono type is reserved for structural information: dates, roles, section labels, navigation numbers, technology tags.
- All caps + wide tracking (`0.2em` or `widest`) signals a label or category, never body content.

### Editorial Hierarchy

```
Section number (mono, 11px, muted)
  ↓
Heading (sans, light, huge)
  ↓
Descriptor (sans, regular, muted, one line)
  ↓
Body or metadata
```

---

## Grid Philosophy

### Desktop

The layout uses a single-column editorial grid built from generous horizontal margins and vertical rhythm, not a multi-column bootstrap grid. Content is left-heavy. Each section is exactly one viewport.

Structure:
- Outer padding: `1.5rem` on mobile, `3rem` on tablet, `5rem` on desktop
- Max content width: `1400px`
- Line length: capped at `720px` for readable body text
- Project detail pages: centred single column at `720px`

No card grids. No dashboard-style widget layouts. No three-column feature grids.

### Mobile

The vertical document flow inherits the same editorial proportions. Padding becomes `1.5rem`. Horizontal scroll compresses to stacked full-width panels.

---

## Image / Media Rules

- No photography of the person. No AI-generated portraits. No stock imagery.
- Project visuals use abstract geometric compositions, system diagrams, or clear UI captures — no mockups on device frames.
- The only 3D element is the iridescent pearl-chrome object: used once on the intro, once per project row in the work section. No full-screen WebGL. No continuous floating objects.
- DPR capped at 1.5. Canvas pauses when tab is hidden.
- WebGL failure must show a intentional static fallback — a simple tinted circle.
- No video backgrounds. No looping animations.
- No SVG illustrations of people, hands, gestures, or portals.

---

## Forbidden Patterns

The following are explicitly excluded from the visual and interaction vocabulary:

- Dark cyberpunk themes
- 3D games or interactive 3D worlds
- Dashboards or analytics-style layouts
- Generic developer portfolio templates
- Card grids (Bento, Masonry, or otherwise)
- Excessive blobs, gradients, or organic shapes
- Particle systems or canvas-based background effects
- Fake hacker terminals or command-line interfaces
- Glassmorphism or heavy backdrop blur
- Long single-page vertical scroll with every section in sequence
- Typewriter, scramble, or glitch text effects
- Scroll-jacking, scroll-triggered animations that obstruct reading
- Confetti, particle bursts, or celebration effects
- Motion purely for decoration without communicative purpose
- Testimonials, fake metrics, fabricated awards
- Social media feed embeds
- Loading spinners or splash screens
- Custom cursors on mobile/touch devices

---

## Visual Signature

The iridescent pearl-chrome 3D object serves as the single recognisable visual signature. It appears:
- On the intro screen as a large compositional anchor
- Alongside each project title (small) in the work section, revealed on hover/active state
- Each project uses a different geometry: icosahedron, torus, octahedron

The object is never the centre of attention. It sits quietly in the composition, responding subtly to cursor position on desktop. It is removed entirely when `prefers-reduced-motion` is active.
