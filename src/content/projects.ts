export type TraceItem = { constraint: string; system: string };

export type SystemLayer = { label: string; description: string };

export interface Project {
  slug: string;
  title: string;
  category: string;
  thesis: string;
  role: string;
  year?: string;
  status: "shipped" | "in-progress" | "prototype";
  statusLabel?: string;
  problem: string;
  keyConstraint: string;
  systemDecision: string;
  systemLayers?: SystemLayer[];
  trace: TraceItem[];
  features: string[];
  technology: string[];
  outcome: string;
  overview?: string;
  priceGuidance?: string[];
  runnerDescription?: string;
  liveUrl?: string;
  sourceUrl?: string;
  tests?: string;
  deployment?: string;
  performance?: string;
  whatBroke?: string[];
  media: { poster: string; posterCaption?: string; posterSecondary?: string; posterSecondaryCaption?: string; gallery: { src: string; alt: string; caption: string; title?: string; featured?: boolean }[] };
}

export const projects: Project[] = [
  {
    slug: "alder-roasters",
    title: "ALDER ROASTERS",
    category: "Specialty coffee commerce",
    thesis: "A production-minded specialty coffee commerce experience built as a complete portfolio case study.",
    role: "Solo design and frontend project",
    year: "2026",
    status: "shipped",
    statusLabel: "Shipped",
    problem: "Specialty coffee storefronts often present origin and processing details without helping less experienced customers understand what they should actually buy.",
    keyConstraint: "The experience needed to feel like a credible premium retailer while staying honest that checkout, payment, and fulfilment are demonstrations.",
    systemDecision: "Built the catalogue, product configuration, persistent cart, subscriptions, search, checkout validation, and editorial brew content as one typed Next.js system, then packaged it for Cloudflare Workers with OpenNext.",
    systemLayers: [
      { label: "Typed commerce domain", description: "Coffee, variant, cart, catalogue, validation, and money rules are separated from presentation and covered by focused tests." },
      { label: "Complete customer journey", description: "Discovery, filtering, product configuration, persistent cart, demonstration checkout, confirmation, subscriptions, and brew education work as one coherent flow." },
      { label: "Production delivery", description: "GitHub Actions validates formatting, linting, types, tests, browser flows, the Next.js build, and the Cloudflare Worker bundle before deployment." },
    ],
    trace: [
      { constraint: "Detailed coffee information can overwhelm new buyers", system: "Turn origin, process, roast, and tasting notes into concise buying guidance and structured filters" },
      { constraint: "A portfolio demo must not imply real payment processing", system: "Use an explicit demonstration checkout with validated fields and no sensitive payment collection" },
      { constraint: "The same application must run reliably at the edge", system: "Package Next.js with OpenNext and validate the Worker bundle in CI before Cloudflare deployment" },
    ],
    features: [
      "Seven-coffee catalogue with search and structured filtering",
      "Product variants, grind selection, quantity, and persistent cart state",
      "Demonstration checkout with validation and confirmation flow",
      "Subscriptions, brew guides, sourcing story, location, FAQ, and legal content",
      "Responsive, accessible interface with automated component and browser tests",
    ],
    technology: [
      "Next.js 16 (App Router)",
      "React 19",
      "TypeScript",
      "CSS custom properties",
      "Vitest + Testing Library",
      "Playwright + axe-core",
      "OpenNext",
      "Cloudflare Workers",
      "GitHub Actions",
    ],
    outcome: "Foundation — A storefront earns trust through honesty. The simulated checkout, no-stored-email notice and fictional-brand disclosure are shown in-product rather than buried in a footer. System — The stack is deliberately compact. Typed static content is the right boundary for this build; a CMS, payments or accounts would add operational complexity without improving the demonstrated frontend work. Problems solved — URL-backed filters keep shareable state without extra state management. Grind, size and subscription options resolve into one structured product model instead of per-page special cases. Critical journeys run under automated unit, accessibility and E2E checks before every deploy.",
    overview: "ALDER ROASTERS is a fictional direct-to-consumer specialty coffee store designed to demonstrate a complete, production-minded frontend system. The project balances editorial brand presentation with practical product guidance and a transparent demonstration purchase flow.",
    liveUrl: "https://alder.iyadiman.me",
    sourceUrl: "https://github.com/pakyad/alder-roasters",
    tests: "Vitest · Testing Library · Playwright + axe-core",
    deployment: "Cloudflare Workers (OpenNext) · GitHub Actions CI",
    whatBroke: [
      "Checkout could not process real payments by design — solved by making the simulation explicit at every step instead of pretending it is real.",
    ],
    media: { poster: "", gallery: [] },
  },
  {
    slug: "pulse",
    title: "Pulse",
    category: "Campus commerce platform",
    thesis: "A campus marketplace with AI-assisted price guidance for student listings.",
    role: "Solo final-year project · UniKL",
    status: "in-progress",
    statusLabel: "In Development",
    problem: "Campus buying and selling often happened through WhatsApp groups and Instagram-without clear order tracking, delivery proof, or price guidance.",
    keyConstraint: "Price guidance needs to be genuinely useful without being confusing or prescriptive - students should still feel in control.",
    systemDecision: "Built a layered price engine: Firestore cache → SerpAPI scrape → Claude Haiku fallback. Student prices are capped at 90% of whatever the system determines as the ceiling.",
    systemLayers: [
      { label: "Firestore Cache", description: "Checks saved market data from recent queries first - fastest path, zero API cost." },
      { label: "SerpAPI Scrape", description: "Falls through to Google Shopping median prices in MYR via SerpAPI when cache misses." },
      { label: "Claude Haiku", description: "LLM fallback estimates a reasonable resale price from item name and category when no market data exists." },
    ],
    trace: [
      { constraint: "No price reference exists for similar items on campus", system: "Source external market data - Firestore cache → SerpAPI → Claude Haiku fallback" },
      { constraint: "A raw suggested price can feel confusing or ignored", system: "Present it during a dedicated review step with original price side by side" },
      { constraint: "The system shouldn't overrule the student", system: "Cap at 90% of the ceiling - the student still makes the final call" },
    ],
    features: [
      "Multi‑source price estimation pipeline - cache first, live scrape second, LLM fallback third.",
      "Side‑by‑side review step showing the student's price and the system suggestion before publishing.",
      "AI price control only intervenes beyond a certain ceiling - normal listings pass through unchecked.",
      "Campus marketplace with university bulletin integration and map-based discovery.",
    ],
    technology: [
      "Next.js (App Router)",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Firebase (Auth, Firestore, Storage, Cloud Functions)",
      "SerpAPI",
      "Anthropic Claude Haiku",
      "Recharts",
      "Google Maps + Leaflet",
    ],
    outcome: "Foundation — The technology is the easy part. The hard part is designing a system that helps people without making them feel controlled. Students should still make the final call on their prices. The system suggests, it does not decide. System — Three layers that fall through gracefully. Check the fastest cheapest source first (Firestore cache), then the live web (SerpAPI), then AI only when nothing else exists. Each layer is independent, so one failing never breaks the whole thing. Problems solved — No price reference exists for similar items on campus. External market data fills the gap. A raw suggested price can feel confusing or ignored. Present it during a dedicated review step with the original price side by side. The system should not overrule the student. Cap at 90% of the ceiling — the student still makes the final call.",
    overview: "Pulse is a campus commerce platform. Students buy and sell items, merchants manage listings and orders, runners handle deliveries, and admins oversee the platform.",
    priceGuidance: [
      "Pulse helps students price comparable items more fairly.",
      "It checks saved Firestore prices first, then similar listings and Google Shopping prices through SerpAPI. If market data is unavailable, Claude Haiku estimates a reasonable resale price in MYR based on the item name and category.",
      "Pulse shows a suggested campus-friendly price before publishing, helping students avoid accidental overpricing while keeping the final decision with them.",
    ],
    runnerDescription: "Runners manage delivery missions, upload pickup and delivery proof, and complete a GPS proximity check at the drop-off point.",
    sourceUrl: "https://github.com/pakyad/pulse",
    whatBroke: [
      "No price reference existed for similar campus items — filled the gap with external market data falling through three sources: Firestore cache → SerpAPI → Claude Haiku.",
      "A raw suggested price felt confusing and easy to ignore — moved into a dedicated review step shown beside the student's own price.",
      "Early design risked overruling students — capped system influence at 90% of the ceiling so the final call stays with them.",
    ],
    media: {
      poster: "/projects/pulse/pulse-home-updated.png",
      posterCaption: "Pulse home - campus services, student tools, and commerce in one place.",
      posterSecondary: "/projects/pulse/pulse-marketplace-updated.png",
      posterSecondaryCaption: "Marketplace - students browse active listings across campus.",
      gallery: [
        {
          src: "/projects/pulse/pulse-marketplace.png",
          alt: "Pulse marketplace screen showing campus item listings",
          title: "A campus market",
          caption: "Marketplace discovery - students browse active listings across campus.",
        },
        {
          src: "/projects/pulse/pulse-home-updated.png",
          alt: "Pulse home screen showing campus services and student directory",
          title: "One shared place",
          caption: "Campus services - student tools and services are available from the same app.",
        },
        {
          src: "/projects/pulse/pulse-price-review-updated.png",
          alt: "Pulse AI price review showing a suggested campus price limit",
          title: "Designed for fairer prices",
          featured: true,
          caption: "Price review - the system explains a suggested limit before a listing is published.",
        },
        {
          src: "/projects/pulse/pulse-runner-updated.png",
          alt: "Pulse Runner dashboard showing missions and earnings",
          title: "Campus runners",
          caption: "Runner dashboard - verified students can manage campus delivery requests.",
        },
      ],
    },
  },
  {
    slug: "laterlah",
    title: "LaterLah",
    category: "Save-for-later service",
    thesis: "A save-for-later service that brings content back when it matters — using deterministic scoring, not AI.",
    role: "Solo personal project",
    status: "in-progress",
    statusLabel: "In Development",
    problem: "\"Saved\" content becomes forgotten content. Every bookmarking product optimises for saving — the return experience is an afterthought.",
    keyConstraint: "No AI. Most modern resurfacing products rely on ML or LLMs. I wanted a transparent, deterministic system any developer could tune without a data science background.",
    systemDecision: "Built a deterministic scoring engine with 6 weighted factors (age, never-opened bonus, recently-opened penalty, repeat-save relevance, resurfaced-history penalty, deterministic jitter). Combined with SHA-256 URL normalisation (10 rules — lowercase, strip UTM/tracking, remove fragments, default ports, credentials), async metadata fetch via SSRF-safe queue, and a state-machine lifecycle (Waiting → Resurfaced → Opened → Completed / Snoozed). Diversity rules cap resurfacing to 3/day — top score, different domain, then oldest candidate.",
    overview: "LaterLah is a save-for-later service for people who save things with good intentions and want a system that respects their attention. Unlike bookmarking tools that optimise entirely for capture, LaterLah is built around the return — resurfacing saved URLs, notes, and screenshots through a deterministic scoring engine, daily digests, and a Surprise Me mode. A warm, calm interface across web, mobile (React Native / Expo), and an iOS share extension.",
    systemLayers: [
      { label: "Deterministic Resurfacing Engine", description: "6 weighted factors scored per item (age, never-opened bonus, recently-opened penalty, save-count relevance, resurfaced-history penalty, deterministic jitter). Max 3/day with diversity rules — prefers different domain and item kind." },
      { label: "URL Normalisation + Dedup Pipeline", description: "10 normalisation rules (lowercase, strip UTM/tracking, remove fragments, default ports, credentials). SHA-256 hashing, DB-level UNIQUE(user_id, hash), lockForUpdate race fallback in transactions." },
      { label: "SSRF-Safe Metadata Fetch", description: "Queue-based async fetch: DNS resolve → IP validate → 5 redirects (re-validated) → 2 MB body limit → block binary MIME types. 3s connect / 5s timeout. Saves in ~100ms; metadata arrives seconds later." },
    ],
    trace: [
      { constraint: "URL duplicates from different sources (UTM, casing, protocols)", system: "10-rule URL normalisation → SHA-256 hash → DB UNIQUE(user_id, hash) with lockForUpdate race fallback" },
      { constraint: "Metadata fetch on save blocks the user", system: "Async database-driven queue — save in ~100ms, metadata arrives seconds later via fetcher: DNS → IP validate → 5 redirects → 2MB body limit → block binary types" },
      { constraint: "Resurfacing needs variety, not just top score", system: "Max 3/day — top-scored item first, then prefers different domain/type, then oldest candidate" },
    ],
    features: [
      "Deterministic scoring engine — 6 weighted factors, fully transparent and tunable",
      "Daily resurfacing with editorial card layout and diversity rules",
      "Capture via web form + iOS share extension + PWA share target",
      "Library with search, pill filters, sort, date grouping, pagination",
      "Item lifecycle: Waiting → Resurfaced → Opened → Completed / Snoozed",
      "Async metadata fetch with SSRF-safe URL fetcher",
      "Scheduled daily digest via database-driven queue",
      "PWA + Swift/SwiftUI iOS 17+ share extension, Expo React Native app",
    ],
    technology: [
      "Laravel 13",
      "PHP 8.4",
      "Vue 3 + Inertia.js",
      "React Native / Expo SDK 54",
      "Tailwind CSS v4 + NativeWind",
      "shadcn-vue",
      "Swift / SwiftUI",
      "SQLite / PostgreSQL",
      "GitHub Actions CI",
    ],
    outcome: "Foundation — Saving is easy, returning is hard. Every bookmarking app lets you save things fast. The real problem is nobody builds for the moment you come back. Laterlah flips that — the entire product is designed around making the return feel good, not just the save. System — Keep it simple enough to trust. I chose a straightforward scoring system over AI because if the app is going to decide what to show you, you should be able to understand why. No black box. The downside is you have to tune more knobs yourself, but you always know what is happening. Problems solved — URLs that look the same but are not (with or without www, UTM tags, trailing slashes). Had to build a normaliser that catches all the edge cases or you get duplicates. Fetching page metadata without slowing down the save — save happens instantly, metadata arrives seconds later. Adding a mobile app later meant restructuring the backend to serve both the web app and the React Native app without duplicating code.",
    whatBroke: [
      "URLs that looked different were actually the same item (www, UTM tags, trailing slashes) — built a 10-rule normaliser or duplicates leaked through.",
      "Fetching page metadata inline made saving feel slow — saves now complete in ~100ms; metadata arrives seconds later through an async queue.",
      "Adding a React Native app later forced a backend restructure so web and mobile share one API surface without duplicated logic.",
    ],
    media: {
      poster: "/projects/laterlah/laterlah-today.png",
      posterCaption: "LaterLah Today — the daily resurfacing view with editorial card labels and a calm, warm interface.",
      gallery: [
        {
          src: "/projects/laterlah/laterlah-today.png",
          alt: "LaterLah Today screen showing resurfaced items with editorial labels",
          title: "Resurfaced for today",
          featured: true,
          caption: "Today screen — the scoring engine selects up to 3 items per day. Cards show editorial labels (\"Worth coming back to\", \"From a while ago\"), domain, and save age.",
        },
        {
          src: "/projects/laterlah/laterlah-library.png",
          alt: "LaterLah Library screen with search, filter pills, and sort options",
          title: "Full library",
          caption: "Library — full item history with debounced search, kind filters (Links / Notes / Images), sort by newest, oldest, or recently opened, and pagination.",
        },
        {
          src: "/projects/laterlah/laterlah-capture.png",
          alt: "LaterLah Capture screen with URL, note, and image upload options",
          title: "Save anything",
          caption: "Capture — URL with async metadata fetch, rich notes, or image upload with magic-byte validation and a \"why saved\" field for personal context.",
        },
        {
          src: "/projects/laterlah/laterlah-surprise.png",
          alt: "LaterLah Surprise Me screen showing a random unread item",
          title: "Surprise me",
          caption: "Surprise Me — weighted random selection across all waiting items. Not Now, Another One, or Open. Items are marked resurfaced only when shown.",
        },
      ],
    },
  },
  {
    slug: "rosta",
    title: "Rosta",
    category: "Team shift scheduling",
    thesis: "A scheduling platform for shift-based teams that juggle availability, swaps, time-off, and slot assignments across seven days.",
    role: "Solo personal project",
    status: "prototype",
    statusLabel: "Prototype",
    problem: "Cafe teams manage schedules through spreadsheets or expensive SaaS tools. Most shift scheduling apps are overbuilt for enterprise or too rigid for small teams.",
    keyConstraint: "Multi-tenant RLS with configurable roles - every query scoped to organization_id, permissions stored as jsonb on the role, not hardcoded.",
    systemDecision: "Built with Next.js 16 Server Actions (no API routes), Supabase Postgres with RLS, and a deterministic role model where permissions are jsonb checked via a single user_has_permission() SQL function. Route groups for layout sharing, safe-to-re-run migrations (every create/add/drop guarded with if not exists), and flattened URLs via next.config.ts redirects.",
    overview: "ROSTA is a save-this-week scheduling platform for shift-based teams that juggle availability, swaps, time-off, and slot assignments across seven days. Built with Next.js 16 App Router, Supabase Postgres + Auth, and Tailwind CSS v4. Every page and action enforces the caller's permissions; roles are configurable per organization.",
    systemLayers: [
      { label: "Permission-Based Authorization Layer", description: "React.cache()-deduped getCurrentContext(), requirePermission()/requireServerPermission() guards on every page and action, scope.action convention (schedule.manage, swaps.manage_all, etc.), 4 configurable roles." },
      { label: "Multi-Tenant Data Layer", description: "organization_id filter on every query, Supabase RLS with user_org_id() + user_has_permission() helpers, full schema covering shifts, swaps, availability, time-off, preferences, history, reports." },
      { label: "Schedule Builder & Conflict Engine", description: "Editable 7x3 grid with real-time client-side validation (unstaffed, override, double-booked), one-click publish with notifications." },
    ],
    trace: [
      { constraint: "Permissions checked on every operation", system: "Single user_has_permission() SQL function checking jsonb permissions - no hardcoded role checks in app code" },
      { constraint: "Migrations must survive re-runs without errors", system: "Every create table / add column / create policy wrapped in if-not-exists / drop-if-exists guards - entire migration replayable" },
    ],
    features: [
      "Multi-tenant organizations with scoped RLS",
      "Configurable roles (admin, manager, employee) with jsonb permissions",
      "Employee lifecycle: availability, shift swaps, time-off, schedule publishing",
      "Role-based views with granular permission checks",
    ],
    technology: [
      "Next.js 16 (App Router)",
      "React 19",
      "Supabase (Postgres, Auth, RLS)",
      "Tailwind CSS v4",
      "Waldenburg + Inter (ElevenLabs design system)",
    ],
    outcome: "Foundation — Who is looking matters more than what they see. In a scheduling app, a manager, an employee, and a viewer should all see completely different things. Instead of handling this case by case, the whole system was built around a single rule: check who the user is, then decide what they can do. System — No middleman. Built with Server Actions — the frontend talks directly to the database without a separate API layer. Fewer files, less code. The tradeoff is some patterns that work with traditional APIs do not work here and took time to figure out. Problems solved — Every organisation data stays separate. One wrong query and an employee sees another company schedule. The database enforces this at every level. Publishing a schedule with conflicts (double-booked shifts, unstaffed slots) — the builder catches these in real time before anyone hits publish. Roles that actually make sense — Admin, Manager, Employee, Viewer. Each has exactly the permissions they need, nothing more. Stored in a way that is easy to change without redeploying.",
    sourceUrl: "https://github.com/pakyad/rosta",
    whatBroke: [
      "One wrong query could expose another organisation's schedule — RLS now enforces tenant isolation at the database level on every query.",
      "Schedules were being published with conflicts — the builder validates double-booked and unstaffed slots in real time before publish.",
      "Hardcoded role checks began sprawling through app code — permissions moved to jsonb checked through a single user_has_permission() SQL function.",
    ],
    media: {
      poster: "/screenshots/poster.svg",
      posterCaption: "ROSTA replaces chaotic messaging and spreadsheets with a centralized, permission-governed schedule that every employee can access, every manager can build, and every organization can trust.",
      gallery: [
        {
          src: "/screenshots/weekly-schedule.svg",
          alt: "ROSTA weekly schedule showing published shifts with employee names and swap controls",
          title: "Weekly Schedule",
          featured: true,
          caption: "Published schedule — employee names across a 7-day grid with swap request controls and last-updated timestamp.",
        },
        {
          src: "/screenshots/schedule-builder.svg",
          alt: "ROSTA schedule builder with availability overlays, override warnings, and conflict panel",
          title: "Schedule Builder",
          caption: "Manager builder — availability overlays, override warnings for unstaffed/double-booked slots, and a real-time conflict panel.",
        },
        {
          src: "/screenshots/availability-form.svg",
          alt: "ROSTA availability form with day-by-day toggles for each shift slot",
          title: "Availability Form",
          caption: "Availability — day-by-day toggle per shift slot, feeding directly into the builder overlay so managers see who is free.",
        },
        {
          src: "/screenshots/roles-permissions.svg",
          alt: "ROSTA roles and permissions screen showing 4 roles with scope.action permission lists and member counts",
          title: "Roles & Permissions",
          caption: "Roles — 4 configurable roles (Admin, Manager, Employee, Viewer) with scope.action permission lists and member counts.",
        },
      ],
    },
  },
  {
    slug: "codedulu",
    title: "CodeDulu",
    category: "Developer momentum tool",
    thesis: "Early side-project idea.",
    role: "Early idea",
    status: "prototype",
    problem: "More details will be added as the project takes shape.",
    keyConstraint: "The direction is still being explored.",
    systemDecision: "CodeDulu is an early project idea.",
    trace: [],
    features: [],
    technology: [],
    outcome: "",
    media: { poster: "", gallery: [] },
  },
  {
    slug: "soon",
    title: "Soon",
    category: "Context-aware reminders",
    thesis: "Early side-project idea.",
    role: "Early idea",
    status: "prototype",
    problem: "More details will be added as the project takes shape.",
    keyConstraint: "The direction is still being explored.",
    systemDecision: "Soon is an early project idea.",
    trace: [],
    features: [],
    technology: [],
    outcome: "",
    media: { poster: "", gallery: [] },
  },
];

export const publishedProjects = projects.filter(
  (p) => p.slug !== "codedulu" && p.slug !== "soon"
);

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
