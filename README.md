# Muhammad Iyad Iman — Portfolio

Editorial portfolio site built with Next.js 16. Features horizontal-scroll home layout,
project case studies, engineering notes, and a decision-trace component.

## Prerequisites

- Node.js 20+
- npm (or pnpm, yarn, bun)

## Environment Variables

Copy `.env.example` to `.env.local` and set the values:

```bash
cp .env.example .env.local
```

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Yes | `http://localhost:3000` | Canonical URL used in metadata, sitemap, and robots.txt. Set to your production domain when deploying. |

## Local Development

```bash
npm install
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000).

## Production Build

```bash
npm run build
npm start
```

The build generates static HTML for all routes. The server runs at
[http://localhost:3000](http://localhost:3000).

## Required Owner-Supplied Assets

Before deploying to production, create or replace these placeholder files:

| Path | Required | Notes |
|------|----------|-------|
| `public/favicon.ico` | Yes | Browser favicon (32×32 or multires .ico). |
| `public/apple-icon.png` | Yes | iOS home-screen icon (180×180 PNG). |
| `public/og-image.png` | Yes | Open Graph / Twitter card image (1200×630 PNG). |
| `public/og.jpg` | No | Referenced in `src/content/site.ts` — optional OG fallback. |
| `public/projects/soon/poster.jpg` | Optional | Project poster placeholder — replace with actual image. |
| `public/projects/pulse/poster.jpg` | Optional | Project poster placeholder — replace with actual image. |
| `public/projects/codedulu/poster.jpg` | Optional | Project poster placeholder — replace with actual image. |
| Gallery images under `public/projects/*/` | Optional | Project gallery screenshots. |
| `public/resume.pdf` | Optional | Linked from contact page. |

## Placeholder Content to Replace

The following files contain mock/example data that should be updated before launch:

| File | What to change |
|------|----------------|
| `src/content/site.ts` | `email`, `social.github`, `social.linkedin`, `social.resume`, `url`, `ogImage` |
| `src/content/notes.ts` | Replace with real notes or remove if not needed |
| `src/content/projects.ts` | Add real project data |
| `src/lib/projectData.ts` | Superseded by `src/content/projects.ts` — can be removed |

## Deployment

### Vercel (Recommended)

1. Push to a Git repository.
2. Import into Vercel.
3. Set `NEXT_PUBLIC_SITE_URL` to your production domain (e.g. `https://iyad.dev`).
4. Deploy.

The `npm run build` command produces static output. All routes are pre-rendered.

### Other Hosting

1. Run `npm run build`.
2. Deploy the `.next` folder and `public/` directory to your server.
3. Set `NEXT_PUBLIC_SITE_URL` in your hosting environment.
4. Start with `npm start`.

## Project Structure

```
src/
  app/              # Next.js App Router pages and layouts
  components/       # React components (home, projects, notes, shell, ui, motion)
  content/          # Project, note, and site data
  hooks/            # Custom React hooks
  lib/              # Legacy data (to be migrated)
  styles/           # CSS tokens
public/             # Static assets (favicon, images, resume)
```
