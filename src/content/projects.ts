export type TraceItem = { constraint: string; system: string };

export type SystemLayer = { label: string; description: string };

export interface Project {
  slug: string;
  title: string;
  thesis: string;
  role: string;
  year?: string;
  status: "shipped" | "in-progress" | "prototype";
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
  media: { poster: string; posterCaption?: string; gallery: { src: string; alt: string; caption: string; title?: string; featured?: boolean }[] };
}

export const projects: Project[] = [
  {
    slug: "pulse",
    title: "Pulse",
    thesis: "A campus marketplace with AI-assisted price guidance for student listings.",
    role: "Solo final-year project · UniKL",
    status: "in-progress",
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
    outcome: "The key challenge wasn't the AI - it was designing a fallback system that keeps the student in control while still providing helpful guidance. The layered approach means most listings get a data-driven suggestion, and the AI only fires when live data isn't available.",
    overview: "Pulse is a campus commerce platform. Students buy and sell items, merchants manage listings and orders, runners handle deliveries, and admins oversee the platform.",
    priceGuidance: [
      "Pulse helps students price comparable items more fairly.",
      "It checks saved Firestore prices first, then similar listings and Google Shopping prices through SerpAPI. If market data is unavailable, Claude Haiku estimates a reasonable resale price in MYR based on the item name and category.",
      "Pulse shows a suggested campus-friendly price before publishing, helping students avoid accidental overpricing while keeping the final decision with them.",
    ],
    runnerDescription: "Runners manage delivery missions, upload pickup and delivery proof, and complete a GPS proximity check at the drop-off point.",
    media: {
      poster: "/projects/pulse/pulse-campus-services.png",
      posterCaption: "Pulse home - campus services, student tools, and commerce in one place.",
      gallery: [
        {
          src: "/projects/pulse/pulse-marketplace.png",
          alt: "Pulse marketplace screen showing campus item listings",
          title: "A campus market",
          caption: "Marketplace discovery - students browse active listings across campus.",
        },
        {
          src: "/projects/pulse/pulse-campus-services.png",
          alt: "Pulse home screen showing campus services and student directory",
          title: "One shared place",
          caption: "Campus services - student tools and services are available from the same app.",
        },
        {
          src: "/projects/pulse/pulse-price-review.png",
          alt: "Pulse AI price review showing a suggested campus price limit",
          title: "Designed for fairer prices",
          featured: true,
          caption: "Price review - the system explains a suggested limit before a listing is published.",
        },
        {
          src: "/projects/pulse/pulse-runner-dashboard.png",
          alt: "Pulse Runner dashboard showing missions and earnings",
          title: "Campus runners",
          caption: "Runner dashboard - verified students can manage campus delivery requests.",
        },
      ],
    },
  },
  {
    slug: "codedulu",
    title: "CodeDulu",
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
  {
    slug: "laterlah",
    title: "LaterLah",
    thesis: "A save-for-later service that brings content back when it matters — using deterministic scoring, not AI.",
    role: "Solo personal project",
    status: "shipped",
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
    outcome: "Saving is easy. Returning is hard. Good resurfacing makes users feel the app respects their time. URL normalisation is deceptively complex — trailing slashes, encoding, protocol-relative URLs. Getting it wrong means duplicates. Deterministic systems are easier to debug, test, and explain — but need more tuning surface area. Inertia.js eliminates the need for a separate API layer while keeping the frontend reactive. Adding the React Native app later required designing a JSON API that didn't duplicate the existing Inertia controllers.",
    media: {
      poster: "/projects/laterlah/laterlah-today.svg",
      posterCaption: "LaterLah Today — the daily resurfacing view with editorial card labels and a calm, warm interface.",
      gallery: [
        {
          src: "/projects/laterlah/laterlah-today.svg",
          alt: "LaterLah Today screen showing resurfaced items with editorial labels",
          title: "Resurfaced for today",
          featured: true,
          caption: "Today screen — the scoring engine selects up to 3 items per day. Cards show editorial labels (\"Worth coming back to\", \"From a while ago\"), domain, and save age.",
        },
        {
          src: "/projects/laterlah/laterlah-library.svg",
          alt: "LaterLah Library screen with search, filter pills, and sort options",
          title: "Full library",
          caption: "Library — full item history with debounced search, kind filters (Links / Notes / Images), sort by newest, oldest, or recently opened, and pagination.",
        },
        {
          src: "/projects/laterlah/laterlah-capture.svg",
          alt: "LaterLah Capture screen with URL, note, and image upload options",
          title: "Save anything",
          caption: "Capture — URL with async metadata fetch, rich notes, or image upload with magic-byte validation and a \"why saved\" field for personal context.",
        },
        {
          src: "/projects/laterlah/laterlah-surprise.svg",
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
    thesis: "A save-this-week scheduling platform for shift-based teams that juggle availability, swaps, time-off, and slot assignments across seven days.",
    role: "Solo personal project",
    status: "prototype",
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
    outcome: "Route groups ((dashboard)) don't change URL paths - (dashboard)/page.tsx and root page.tsx both map to / and conflict. Server actions with redirect() thrown inside them need the calling client to NOT catch the error - Next.js intercepts at the transport level. next.config.ts redirects need a dev server restart; HMR doesn't pick them up. Tailwind v4 @theme is powerful but custom utilities must be explicitly defined or they silently fall back to defaults.",
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
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
