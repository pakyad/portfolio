# Muhammad Iyad Iman — Portfolio

Portfolio site for [iyadiman.me](https://iyadiman.me) — a Software Engineering student building thoughtful digital products from interface to infrastructure.

Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, and anime.js for restrained scroll reveals. Every case study follows the same structure: **Problem → Constraints → Decisions → Evidence → What broke → Outcome**, with evidence fields rendered only when they can be verified against a live deployment or public repository.

## Projects featured

| Project | Status | Live | Source |
|---|---|---|---|
| ALDER ROASTERS | Shipped | [alder.iyadiman.me](https://alder.iyadiman.me) | [pakyad/alder-roasters](https://github.com/pakyad/alder-roasters) |
| Pulse | In Development | — | [pakyad/pulse](https://github.com/pakyad/pulse) |
| LaterLah | In Development | — | — |
| Rosta | Prototype | — | [pakyad/rosta](https://github.com/pakyad/rosta) |

## Development

Requirements: Node.js 20+.

```bash
npm install
npm run dev        # http://localhost:3000
```

## Verification

```bash
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
npm run build      # production build (static prerender)
```

CI runs all three on every push to `main` and every pull request (`.github/workflows/ci.yml`).

## Environment

Copy `.env.example` to `.env.local`:

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical URL used in metadata, sitemap, robots.txt. |

## Structure

```
src/
  app/         # App Router pages, sitemap, robots
  components/  # home, projects, shell, ui components
  content/     # project + site data (single source of truth)
  hooks/       # shared hooks
public/        # screenshots, project images, favicon, OG image
```

Project content lives in `src/content/projects.ts`. Case-study sections render only when the underlying data exists — unavailable evidence is hidden, never faked. Placeholder projects are excluded from routes, the sitemap, and the homepage grid.
