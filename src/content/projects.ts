export type TraceItem = { constraint: string; system: string };

export type SystemLayer = { label: string; description: string };

export type OutcomeSection = { label: string; body: string };

export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
  title?: string;
  featured?: boolean;
  width?: number;
  height?: number;
};

export interface Project {
  slug: string;
  title: string;
  category: string;
  thesis: string;
  role: string;
  year: string;
  status: "shipped" | "in-progress" | "prototype";
  statusLabel?: string;
  availability?: "live" | "unavailable";
  availabilityNote?: string;
  featured?: boolean;
  problem: string;
  keyConstraint: string;
  systemDecision: string;
  systemLayers?: SystemLayer[];
  trace: TraceItem[];
  features: string[];
  technology: string[];
  outcome: OutcomeSection[];
  overview?: string;
  liveUrl?: string;
  sourceUrl?: string;
  tests?: string;
  deployment?: string;
  performance?: string;
  whatBroke?: string[];
  media: {
    poster: string;
    posterCaption?: string;
    posterDims?: { w: number; h: number };
    posterSecondary?: string;
    posterSecondaryCaption?: string;
    posterSecondaryDims?: { w: number; h: number };
    gallery: GalleryImage[];
  };
}

export const projects: Project[] = [
  {
    slug: "alder-roasters",
    title: "ALDER ROASTERS",
    category: "Specialty coffee commerce",
    thesis: "A specialty coffee storefront built end to end — catalogue, cart, checkout, brew guides, the whole journey.",
    role: "Solo design and frontend",
    year: "2026",
    status: "shipped",
    statusLabel: "Shipped",
    availability: "live",
    featured: true,
    problem:
      "Specialty coffee storefronts love listing origin and processing notes, but rarely help someone who just wants a good bag of beans without a crash course in fermentation.",
    keyConstraint:
      "It had to feel like a real premium retailer while staying upfront that checkout and payment are demonstrations.",
    systemDecision:
      "One typed Next.js system covering catalogue, product configuration, persistent cart, subscriptions, search, checkout validation and editorial content — packaged for Cloudflare Workers with OpenNext.",
    systemLayers: [
      { label: "Typed commerce domain", description: "Coffee, variant, cart and money rules live separately from presentation, covered by focused tests." },
      { label: "Complete customer journey", description: "Discovery, filtering, configuration, persistent cart, demonstration checkout, confirmation, subscriptions and brew education work as one flow." },
      { label: "Delivery pipeline", description: "GitHub Actions validates formatting, linting, types, tests, browser flows and the Worker bundle before every deploy." },
    ],
    trace: [
      { constraint: "Origin charts and process jargon overwhelm new buyers", system: "Distil origin, process and roast into short buying guidance and structured filters" },
      { constraint: "A portfolio demo must not imply real payments", system: "Explicit demonstration checkout — validated fields, no payment collection, disclosure in-product" },
      { constraint: "Same app must run reliably at the edge", system: "OpenNext packaging with the Worker bundle validated in CI before Cloudflare deploy" },
    ],
    features: [
      "Seven-coffee catalogue with search and structured filtering",
      "Variants, grind selection, quantity and persistent cart state",
      "Demonstration checkout with validation and confirmation flow",
      "Subscriptions, brew guides, sourcing story, FAQ and legal pages",
      "Responsive, accessible UI covered by unit, accessibility and E2E tests",
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
    outcome: [
      { label: "Honesty is a feature", body: "The checkout takes no real money and the site says so out loud instead of hiding it in a footer. A demo pretending to be real reads as fake. Showing its cards is what makes this one feel trustworthy." },
      { label: "Small stack on purpose", body: "Typed static data instead of a CMS. No accounts, no payments. Each of those would look better on a slide and say less about what I actually built: the frontend." },
      { label: "The late decision I'd make early", body: "URL-backed filters came late. They should have been day one — shareable state for free, zero extra libraries." },
    ],
    overview:
      "ALDER ROASTERS is a fictional direct-to-consumer coffee store built to demonstrate a complete frontend system: editorial brand presentation on top of practical product guidance and an honest purchase flow.",
    liveUrl: "https://alder.iyadiman.me",
    sourceUrl: "https://github.com/pakyad/alder-roasters",
    tests: "Vitest · Testing Library · Playwright + axe-core",
    deployment: "Cloudflare Workers (OpenNext) · GitHub Actions CI",
    whatBroke: [
      "Checkout couldn't process real payments. By design. The fix was honesty in the interface, not a payment integration.",
    ],
    media: { poster: "", gallery: [] },
  },
  {
    slug: "pulse",
    title: "Pulse",
    category: "Campus commerce platform",
    thesis: "Campus marketplace where an AI price check keeps student listings honest.",
    role: "Solo final-year project · UniKL",
    year: "2026",
    status: "in-progress",
    statusLabel: "In Development",
    featured: true,
    problem:
      "Campus buying and selling happens in WhatsApp groups and Instagram DMs — no order tracking, no delivery proof, no idea what a fair price looks like.",
    keyConstraint:
      "Price guidance has to be genuinely useful without lecturing. Students should feel helped, not policed.",
    systemDecision:
      "A layered price engine: Firestore cache first, SerpAPI scrape second, Claude Haiku as last resort. Student prices are capped at 90% of whatever the system works out as the ceiling.",
    systemLayers: [
      { label: "Firestore cache", description: "Answers from saved market data first — fastest path, zero API cost." },
      { label: "SerpAPI scrape", description: "On cache miss, pulls Google Shopping median prices in MYR." },
      { label: "Claude Haiku", description: "When no market data exists at all, estimates a resale price from item name and category." },
    ],
    trace: [
      { constraint: "No price reference exists for similar items on campus", system: "External market data falling through three sources — Firestore cache, SerpAPI, then Claude Haiku" },
      { constraint: "A raw suggested price feels confusing and easy to ignore", system: "Dedicated review step showing the suggestion beside the student's own price" },
      { constraint: "The system shouldn't overrule the student", system: "Capped at 90% of the ceiling — the student always makes the final call" },
    ],
    features: [
      "Multi-source price estimation — cache first, live scrape second, LLM fallback third",
      "Side-by-side review step before publishing a listing",
      "AI price control only intervenes past a ceiling — normal listings pass through untouched",
      "Marketplace with university bulletin integration and map-based discovery",
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
    outcome: [
      { label: "The tech was never the hard part", body: "Three data sources falling through cleanly is a normal afternoon. The hard part was designing an AI suggestion that helps without talking down to people. Students ignore tools that lecture them." },
      { label: "Suggest, never decide", body: "The system caps its own authority at 90% of the ceiling. Every suggestion shows up next to your price in a review step, and you publish whatever you want anyway. That one constraint shaped the whole UX." },
      { label: "Cheap first, smart last", body: "Firestore answers most queries for free. SerpAPI handles the rest. Claude only wakes up when there is no market data at all. Each layer fails alone without dragging the others down." },
    ],
    overview:
      "Pulse is a campus commerce platform. Students buy and sell, merchants manage listings and orders, runners handle deliveries, admins oversee everything.",
    sourceUrl: "https://github.com/pakyad/pulse",
    whatBroke: [
      "No price reference existed for similar campus items. Filled the gap with external market data falling through three sources — cache, scrape, LLM.",
      "A raw suggested price confused people and got ignored. Moved it into a review step beside the student's own number.",
      "Early designs risked overruling students. Capped the system's influence at 90% so the final call stays human.",
    ],
    media: {
      poster: "/projects/pulse/pulse-home-updated.png",
      posterCaption: "Pulse home — campus services, student tools and commerce in one place.",
      posterDims: { w: 852, h: 1847 },
      posterSecondary: "/projects/pulse/pulse-marketplace-updated.png",
      posterSecondaryCaption: "Marketplace — students browse active listings across campus.",
      posterSecondaryDims: { w: 853, h: 1844 },
      gallery: [
        {
          src: "/projects/pulse/pulse-marketplace.png",
          alt: "Pulse marketplace screen showing campus item listings",
          title: "A campus market",
          width: 828,
          height: 1792,
          caption: "Marketplace discovery — students browse active listings across campus.",
        },
        {
          src: "/projects/pulse/pulse-home-updated.png",
          alt: "Pulse home screen showing campus services and student directory",
          title: "One shared place",
          width: 852,
          height: 1847,
          caption: "Campus services — student tools available from the same app.",
        },
        {
          src: "/projects/pulse/pulse-price-review-updated.png",
          alt: "Pulse AI price review showing a suggested campus price limit",
          title: "Designed for fairer prices",
          featured: true,
          width: 853,
          height: 1844,
          caption: "Price review — the system explains a suggested limit, side by side with the seller's own price, before anything goes live. Fair pricing without a lecture.",
        },
        {
          src: "/projects/pulse/pulse-runner-updated.png",
          alt: "Pulse Runner dashboard showing missions and earnings",
          title: "Campus runners",
          width: 853,
          height: 1844,
          caption: "Runner dashboard — verified students manage campus delivery requests and upload proof at each step.",
        },
      ],
    },
  },
  {
    slug: "laterlah",
    title: "LaterLah",
    category: "Save-for-later service",
    thesis: "Save-for-later built around the return, not the save. Deterministic scoring, no AI.",
    role: "Solo personal project",
    year: "2025",
    status: "prototype",
    statusLabel: "Unavailable",
    availability: "unavailable",
    availabilityNote:
      "The live demo is offline while development is paused. Case study below stays up because the thinking still holds.",
    featured: true,
    problem:
      "\"Saved\" becomes \"forgotten\" almost every time. Bookmarking products optimise hard for the save and treat the return as somebody else's problem.",
    keyConstraint:
      "No AI. Most resurfacing products lean on ML or an LLM somewhere. I wanted a transparent, deterministic system any developer could tune without a data science background.",
    systemDecision:
      "A deterministic scoring engine with six weighted factors, SHA-256 URL normalisation, async SSRF-safe metadata fetching, and a hard cap of three resurfaces a day.",
    overview:
      "LaterLah is save-for-later for people who save things with good intentions and want a system that respects their attention. It resurfaces saved URLs, notes and screenshots through a deterministic scoring engine, daily digests and a Surprise Me mode — warm, calm interfaces across web, React Native and an iOS share extension.",
    systemLayers: [
      { label: "Deterministic resurfacing engine", description: "Six weighted factors scored per item — age, never-opened bonus, recently-opened penalty, save-count relevance, resurfaced-history penalty, deterministic jitter. Max three a day, diversity rules prefer different domains and kinds." },
      { label: "URL normalisation + dedup pipeline", description: "Ten rules (lowercase, strip UTM and tracking, remove fragments and default ports), SHA-256 hashing, DB-level UNIQUE(user_id, hash), lockForUpdate race fallback inside transactions." },
      { label: "SSRF-safe metadata fetch", description: "Queue-based async fetch: DNS resolve, IP validation, five redirects re-validated, 2 MB body cap, binary MIME blocked. Saves land in about 100ms; metadata trails in seconds later." },
    ],
    trace: [
      { constraint: "URL duplicates arrive from different sources — UTM tags, casing, protocols", system: "Ten-rule normalisation into SHA-256 hashes, unique at DB level with a lockForUpdate race fallback" },
      { constraint: "Fetching metadata during the save blocks the user", system: "Async queue — the save completes in ~100ms, metadata arrives seconds later through guarded fetches" },
      { constraint: "Resurfacing needs variety, not just top scores", system: "Three per day maximum — best score first, then different domain or type, then oldest waiting candidate" },
    ],
    features: [
      "Deterministic scoring engine — six weighted factors, fully tunable, fully explainable",
      "Daily resurfacing with editorial card layout and diversity rules",
      "Capture via web form, iOS share extension and PWA share target",
      "Library with search, pill filters, sort, date grouping and pagination",
      "Item lifecycle: Waiting → Resurfaced → Opened → Completed / Snoozed",
      "Scheduled daily digest via database-driven queue",
      "PWA plus Swift/SwiftUI iOS 17+ share extension and Expo React Native app",
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
    outcome: [
      { label: "Saving is easy. Returning is the product.", body: "Every bookmarking app nails capture and abandons the comeback. LaterLah is designed backwards from the return — the scoring engine, the three-a-day cap, the calm Today screen all exist to make coming back feel worth it." },
      { label: "No black box", body: "I skipped AI resurfacing on purpose. Six weighted factors you can read in one sitting beat a model nobody can question. The cost is tuning knobs by hand, and I'll take that over magic I can't explain." },
      { label: "Boring infrastructure wins", body: "SHA-256 dedup, a queue with SSRF guards, a plain state machine. None of it is clever. All of it held up." },
    ],
    whatBroke: [
      "URLs that looked different were the same item — www variants, UTM tags, trailing slashes. Built a ten-rule normaliser or duplicates kept leaking through.",
      "Fetching page metadata inline made saving feel slow. Saves now complete in about 100ms; metadata arrives later through an async queue.",
      "Adding the React Native app forced a backend restructure so web and mobile share one API surface without duplicated logic.",
    ],
    media: { poster: "", gallery: [] },
  },
  {
    slug: "rosta",
    title: "Rosta",
    category: "Team shift scheduling",
    thesis: "Shift scheduling for small teams — availability, swaps, time-off, permissions.",
    role: "Solo personal project",
    year: "2025",
    status: "prototype",
    statusLabel: "Prototype",
    featured: true,
    problem:
      "Cafe teams run schedules off spreadsheets or enterprise SaaS priced for companies with hundreds of staff. Nothing fits the ten-person shop that just needs fair rotas.",
    keyConstraint:
      "Multi-tenant RLS with configurable roles — every query scoped to organization_id, permissions stored as jsonb on the role rather than hardcoded.",
    systemDecision:
      "Next.js 16 Server Actions straight into Supabase Postgres with RLS — no API layer. Permissions checked through a single user_has_permission() SQL function; migrations written safe-to-re-run with if-not-exists guards throughout.",
    overview:
      "ROSTA is a save-this-week scheduling platform for shift-based teams juggling availability, swaps, time-off and slot assignments across seven days. Every page and action enforces the caller's permissions, and roles stay configurable per organisation.",
    systemLayers: [
      { label: "Permission-based authorization layer", description: "React.cache()-deduped context loading, requirePermission() guards on every page and action, scope.action convention (schedule.manage, swaps.manage_all), four configurable roles." },
      { label: "Multi-tenant data layer", description: "organization_id filter on every query, Supabase RLS backed by user_org_id() and user_has_permission() helpers, full schema covering shifts, swaps, availability, time-off, preferences and history." },
      { label: "Schedule builder & conflict engine", description: "Editable 7x3 grid with client-side conflict detection — unstaffed slots, overrides, double bookings — and one-click publish with notifications." },
    ],
    trace: [
      { constraint: "Permissions must hold on every operation", system: "One user_has_permission() SQL function reading jsonb permissions — no scattered role checks in app code" },
      { constraint: "Migrations must survive re-runs", system: "Every table, column and policy wrapped in if-not-exists guards — the whole migration replays cleanly" },
    ],
    features: [
      "Multi-tenant organisations with scoped RLS",
      "Configurable roles (admin, manager, employee, viewer) with jsonb permissions",
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
    outcome: [
      { label: "Who's asking beats what they see", body: "A manager, an employee and a viewer should get three different apps. Instead of special-casing every screen, everything routes through one rule — check who the user is, then check what they're allowed to do." },
      { label: "No middleman", body: "Server Actions talk straight to Postgres. No REST layer to maintain, fewer files, less ceremony. The bill arrives later — some API-era patterns simply don't apply, and unlearning them took real time." },
      { label: "Let the database say no", body: "RLS enforces tenant isolation on every query, so one sloppy WHERE clause can't leak another company's schedule. App code stays simple because the database refuses to be lied to." },
    ],
    sourceUrl: "https://github.com/pakyad/rosta",
    whatBroke: [
      "One wrong query could expose another organisation's schedule. RLS now enforces tenant isolation at the database level on every query.",
      "Schedules were getting published with conflicts. The builder catches double-booked and unstaffed slots in real time, before anyone hits publish.",
      "Hardcoded role checks started sprawling through app code. Permissions moved into jsonb behind a single user_has_permission() SQL function.",
    ],
    media: {
      poster: "/screenshots/poster.svg",
      posterCaption: "ROSTA replaces spreadsheet chaos with one permission-governed schedule everyone can trust.",
      posterDims: { w: 800, h: 600 },
      gallery: [
        {
          src: "/screenshots/weekly-schedule.svg",
          alt: "ROSTA weekly schedule showing published shifts with employee names and swap controls",
          title: "Weekly Schedule",
          featured: true,
          width: 800,
          height: 600,
          caption: "Published schedule — employee names across a 7-day grid with swap request controls and last-updated timestamp.",
        },
        {
          src: "/screenshots/schedule-builder.svg",
          alt: "ROSTA schedule builder with availability overlays, override warnings, and conflict panel",
          title: "Schedule Builder",
          width: 800,
          height: 600,
          caption: "Manager builder — availability overlays, override warnings for unstaffed and double-booked slots, real-time conflict panel.",
        },
        {
          src: "/screenshots/availability-form.svg",
          alt: "ROSTA availability form with day-by-day toggles for each shift slot",
          title: "Availability Form",
          width: 800,
          height: 600,
          caption: "Availability — day-by-day toggle per shift slot, feeding straight into the builder overlay so managers see who is free.",
        },
        {
          src: "/screenshots/roles-permissions.svg",
          alt: "ROSTA roles and permissions screen showing 4 roles with scope.action permission lists and member counts",
          title: "Roles & Permissions",
          width: 800,
          height: 600,
          caption: "Roles — Admin, Manager, Employee, Viewer with scope.action permission lists and member counts.",
        },
      ],
    },
  },
];

export const caseStudies = projects.filter((p) => p.featured);

export type SiteBuild = {
  title: string;
  description: string;
  year: string;
  url?: string;
  sourceUrl?: string;
  placeholder?: boolean;
};

export const siteBuilds: SiteBuild[] = [
  { title: "01", year: "2026", description: "New website going up here soon.", placeholder: true },
  { title: "02", year: "2026", description: "New website going up here soon.", placeholder: true },
  { title: "03", year: "2026", description: "New website going up here soon.", placeholder: true },
  { title: "04", year: "2026", description: "New website going up here soon.", placeholder: true },
  { title: "05", year: "2026", description: "New website going up here soon.", placeholder: true },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
