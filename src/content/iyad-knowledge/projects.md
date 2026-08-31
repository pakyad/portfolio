---
category: projects
tags: [alder-roasters, pulse, laterlah, rosta, case-studies]
---

# Projects

*Auto-extracted from portfolio data. Add personal reflections where marked [PERSONAL].*

---

## ALDER ROASTERS
**Specialty coffee commerce** | 2026 | Shipped | Live: https://alder.iyadiman.me | Source: https://github.com/pakyad/alder-roasters

### Problem
Specialty coffee storefronts love listing origin and processing notes, but rarely help someone who just wants a good bag of beans without a crash course in fermentation.

### Key Constraint
It had to feel like a real premium retailer while staying upfront that checkout and payment are demonstrations.

### System Decision
One typed Next.js system covering catalogue, product configuration, persistent cart, subscriptions, search, checkout validation and editorial content. Packaged for Cloudflare Workers with OpenNext.

### System Layers
1. **Typed commerce domain**: Coffee, variant, cart and money rules live separately from presentation, covered by focused tests.
2. **Complete customer journey**: Discovery, filtering, configuration, persistent cart, demonstration checkout, confirmation, subscriptions and brew education work as one flow.
3. **Delivery pipeline**: GitHub Actions validates formatting, linting, types, tests, browser flows and the Worker bundle before every deploy.

### Trace (Constraint → System)
- Origin charts and process jargon overwhelm new buyers → Distil origin, process and roast into short buying guidance and structured filters
- A portfolio demo must not imply real payments → Explicit demonstration checkout: validated fields, no payment collection, disclosure in-product
- Same app must run reliably at the edge → OpenNext packaging with the Worker bundle validated in CI before Cloudflare deploy

### Features
- Seven-coffee catalogue with search and structured filtering
- Variants, grind selection, quantity and persistent cart state
- Demonstration checkout with validation and confirmation flow
- Subscriptions, brew guides, sourcing story, FAQ and legal pages
- Responsive, accessible UI covered by unit, accessibility and E2E tests

### Technology
Next.js 16 (App Router), React 19, TypeScript, CSS custom properties, Vitest + Testing Library, Playwright + axe-core, OpenNext, Cloudflare Workers, GitHub Actions

### Outcomes
**Honesty is a feature.** The checkout takes no real money and the site says so out loud instead of hiding it in a footer. A demo pretending to be real reads as fake. Showing its cards is what makes this one feel trustworthy.

**Small stack on purpose.** Typed static data instead of a CMS. No accounts, no payments. Each of those would look better on a slide and say less about what I actually built: the frontend.

**The late decision I'd make early**: URL-backed filters came late. They should have been day one: shareable state for free, zero extra libraries.

### What Broke
- Checkout couldn't process real payments. By design. The fix was honesty in the interface, not a payment integration.

### Personal Reflections
This project came from genuine interest in coffee: the ritual, packaging, atmosphere, culture. The goal was to make a coffee brand feel real, not just "an e-commerce site with coffee pictures." Performance mattered because the visual experience is part of the point. The user shouldn't stare at a blank screen while JavaScript loads. First content on screen quickly, then progressively introduce expensive visual elements.

---

## PULSE (CODEP-PULSE)
**Campus commerce platform** | 2026 | In Development | Source: https://github.com/pakyad/pulse

### Problem
Campus buying and selling happens in WhatsApp groups and Instagram DMs: no order tracking, no delivery proof, no idea what a fair price looks like.

### Key Constraint
Price guidance has to be genuinely useful without lecturing. Students should feel helped, not policed.

### System Decision
A layered price engine: Firestore cache first, SerpAPI scrape second, Claude Haiku as last resort. Student prices are capped at 90% of whatever the system works out as the ceiling.

### System Layers
1. **Firestore cache**: Answers from saved market data first: fastest path, zero API cost.
2. **SerpAPI scrape**: On cache miss, pulls Google Shopping median prices in MYR.
3. **Claude Haiku**: When no market data exists at all, estimates a resale price from item name and category.

### Trace (Constraint → System)
- No price reference exists for similar items on campus → External market data falling through three sources: Firestore cache, SerpAPI, then Claude Haiku
- A raw suggested price feels confusing and easy to ignore → Dedicated review step showing the suggestion beside the student's own price
- The system shouldn't overrule the student: Capped at 90% of the ceiling. The student always makes the final call

### Features
- Multi-source price estimation: cache first, live scrape second, LLM fallback third
- Side-by-side review step before publishing a listing
- AI price control only intervenes past a ceiling. Normal listings pass through untouched
- Marketplace with university bulletin integration and map-based discovery

### Technology
Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, Firebase (Auth, Firestore, Storage, Cloud Functions), SerpAPI, Anthropic Claude Haiku, Recharts, Google Maps + Leaflet

### Outcomes
**The tech was never the hard part.** Three data sources falling through cleanly is a normal afternoon. The hard part was designing an AI suggestion that helps without talking down to people. Students ignore tools that lecture them.

**Suggest, never decide.** The system caps its own authority at 90% of the ceiling. Every suggestion shows up next to your price in a review step, and you publish whatever you want anyway. That one constraint shaped the whole UX.

**Cheap first, smart last.** Firestore answers most queries for free. SerpAPI handles the rest. Claude only wakes up when there is no market data at all. Each layer fails alone without dragging the others down.

### What Broke
- No price reference existed for similar campus items. Filled the gap with external market data falling through three sources: cache, scrape, LLM.
- A raw suggested price confused people and got ignored. Moved it into a review step beside the student's own number.
- Early designs risked overruling students. Capped the system's influence at 90% so the final call stays human.

### Personal Reflections
CODEP-PULSE came from being around campus and noticing small problems people accepted as normal. "Why are we all just accepting this?" The project has many interacting pieces: marketplace, delivery, verification, pricing, disputes, location. Some architecture needed deliberate thinking because pieces interact. Not every corner needed perfect engineering before product direction was proven. Technical debt was a deliberate trade: move fast to learn, then make surviving parts solid.

---

## LATERLAH
**Save-for-later service** | 2025 | Prototype | Unavailable | Source: https://github.com/pakyad/laterlah

### Problem
"Saved" becomes "forgotten" almost every time. Bookmarking products optimise hard for the save and treat the return as somebody else's problem.

### Key Constraint
No AI. Most resurfacing products lean on ML or an LLM somewhere. I wanted a transparent, deterministic system any developer could tune without a data science background.

### System Decision
A deterministic scoring engine with six weighted factors, SHA-256 URL normalisation, async SSRF-safe metadata fetching, and a hard cap of three resurfaces a day.

### System Layers
1. **Deterministic resurfacing engine** — Six weighted factors scored per item — age, never-opened bonus, recently-opened penalty, save-count relevance, resurfaced-history penalty, deterministic jitter. Max three a day, diversity rules prefer different domains and kinds.
2. **URL normalisation + dedup pipeline** — Ten rules (lowercase, strip UTM and tracking, remove fragments and default ports), SHA-256 hashing, DB-level UNIQUE(user_id, hash), lockForUpdate race fallback inside transactions.
3. **SSRF-safe metadata fetch** — Queue-based async fetch: DNS resolve, IP validation, five redirects re-validated, 2 MB body cap, binary MIME blocked. Saves land in about 100ms; metadata trails in seconds later.

### Trace (Constraint → System)
- URLs that looked different were the same item — www variants, UTM tags, trailing slashes → Ten-rule normalisation into SHA-256 hashes, unique at DB level with a lockForUpdate race fallback
- Fetching metadata during the save blocks the user → Async queue — the save completes in ~100ms, metadata arrives seconds later through guarded fetches
- Resurfacing needs variety, not just top scores → Three per day maximum — best score first, then different domain or type, then oldest waiting candidate

### Features
- Deterministic scoring engine — six weighted factors, fully tunable, fully explainable
- Daily resurfacing with editorial card layout and diversity rules
- Capture via web form, iOS share extension and PWA share target
- Library with search, pill filters, sort, date grouping and pagination
- Item lifecycle: Waiting → Resurfaced → Opened → Completed / Snoozed
- Scheduled daily digest via database-driven queue
- PWA plus Swift/SwiftUI iOS 17+ share extension and Expo React Native app

### Technology
Laravel 13, PHP 8.4, Vue 3 + Inertia.js, React Native / Expo SDK 54, Tailwind CSS v4 + NativeWind, shadcn-vue, Swift / SwiftUI, SQLite / PostgreSQL, GitHub Actions CI

### Outcomes
**Saving is easy. Returning is the product.** — Every bookmarking app nails capture and abandons the comeback. LaterLah is designed backwards from the return — the scoring engine, the three-a-day cap, the calm Today screen all exist to make coming back feel worth it.

**No black box** — I skipped AI resurfacing on purpose. Six weighted factors you can read in one sitting beat a model nobody can question. The cost is tuning knobs by hand, and I'll take that over magic I can't explain.

**Boring infrastructure wins** — SHA-256 dedup, a queue with SSRF guards, a plain state machine. None of it is clever. All of it held up.

### What Broke
- URLs that looked different were the same item — www variants, UTM tags, trailing slashes. Built a ten-rule normaliser or duplicates kept leaking through.
- Fetching page metadata inline made saving feel slow. Saves now complete in about 100ms; metadata arrives later through an async queue.
- Adding the React Native app forced a backend restructure so web and mobile share one API surface without duplicated logic.

### Personal Reflections
LaterLah came from the obsession with making everyday life slightly less annoying — the tiny pieces of friction people ignore because fixing them seems too trivial. Sometimes those tiny problems make the most interesting product ideas. The "no AI" constraint was deliberate: deterministic scoring you can read in one sitting beats a model nobody can question.

---

## ROSTA
**Team shift scheduling** | 2025 | Prototype | Source: https://github.com/pakyad/rosta

### Problem
Cafe teams run schedules off spreadsheets or enterprise SaaS priced for companies with hundreds of staff. Nothing fits the ten-person shop that just needs fair rotas.

### Key Constraint
Multi-tenant RLS with configurable roles — every query scoped to organization_id, permissions stored as jsonb on the role rather than hardcoded.

### System Decision
Next.js 16 Server Actions straight into Supabase Postgres with RLS — no API layer. Permissions checked through a single user_has_permission() SQL function; migrations written safe-to-re-run with if-not-exists guards throughout.

### System Layers
1. **Permission-based authorization layer** — React.cache()-deduped context loading, requirePermission() guards on every page and action, scope.action convention (schedule.manage, swaps.manage_all), four configurable roles.
2. **Multi-tenant data layer** — organization_id filter on every query, Supabase RLS backed by user_org_id() and user_has_permission() helpers, full schema covering shifts, swaps, availability, time-off, preferences and history.
3. **Schedule builder & conflict engine** — Editable 7x3 grid with client-side conflict detection — unstaffed slots, overrides, double bookings — and one-click publish with notifications.

### Trace (Constraint → System)
- Permissions must hold on every operation → One user_has_permission() SQL function reading jsonb permissions — no scattered role checks in app code
- Migrations must survive re-runs → Every table, column and policy wrapped in if-not-exists guards — the whole migration replays cleanly

### Features
- Multi-tenant organisations with scoped RLS
- Configurable roles (admin, manager, employee, viewer) with jsonb permissions
- Employee lifecycle: availability, shift swaps, time-off, schedule publishing
- Role-based views with granular permission checks

### Technology
Next.js 16 (App Router), React 19, Supabase (Postgres, Auth, RLS), Tailwind CSS v4, Waldenburg + Inter (ElevenLabs design system)

### Outcomes
**Who's asking beats what they see** — A manager, an employee and a viewer should get three different apps. Instead of special-casing every screen, everything routes through one rule — check who the user is, then check what they're allowed to do.

**No middleman** — Server Actions talk straight to Postgres. No REST layer to maintain, fewer files, less ceremony. The bill arrives later — some API-era patterns simply don't apply, and unlearning them took real time.

**Let the database say no** — RLS enforces tenant isolation on every query, so one sloppy WHERE clause can't leak another company's schedule. App code stays simple because the database refuses to be lied to.

### What Broke
- One wrong query could expose another organisation's schedule. RLS now enforces tenant isolation at the database level on every query.
- Schedules were getting published with conflicts. The builder catches double-booked and unstaffed slots in real time, before anyone hits publish.
- Hardcoded role checks started sprawling through app code. Permissions moved into jsonb behind a single user_has_permission() SQL function.

### Personal Reflections
Rosta came from thinking about how teams actually organise themselves rather than how productivity software assumes they should behave. The gap between the neat version in an app and the messy reality between actual people is interesting. Multi-tenant RLS with configurable roles — every query scoped to organization_id, permissions as jsonb — was the key architectural decision.

---

## Experiments & Shelved
These didn't ship but taught something:

* **Princess and the Prepo** — TESL educational experience. Abandoned when scope exploded. Lesson: constraint-first or it balloons.
* **blu / coastline / bazram merdeka** — visual web experiments. Unfinished. Extracted animation patterns used in Alder.
* **Other portfolio experiments** — Most discarded. This site is the survivor.

Rule: if it's not in the shipped four above, it's an experiment, not a product.

---

## Cross-Project Themes
**Constraint-first thinking** — Every project starts with a genuine constraint, not a feature list.

**Deterministic over AI** — LaterLah chose no AI on purpose; Pulse caps AI at 90%; Alder uses honest demonstration checkout.

**Honesty as feature** — Alder's demo checkout, Pulse's 90% cap, LaterLah's deterministic scoring — systems that show their cards.

**Small stack on purpose** — No unnecessary dependencies. Type-driven domains over CMS. Server-side rendering over client state when possible.

**Explore quickly → prove the idea → identify what survived → make surviving parts solid** — Technical debt as deliberate trade, not accident.

**Performance as part of design** — Not a last-minute optimization. Shape of the application determines performance.

**Accessibility as constraint, not checklist** — Semantic HTML, keyboard nav, readable contrast, obvious interaction states make products better for everyone.