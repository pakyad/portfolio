export type TraceItem = { constraint: string; system: string };

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
    problem: "Campus buying and selling often happened through WhatsApp groups and Instagram—without clear order tracking, delivery proof, or price guidance.",
    keyConstraint: "Price guidance needs to be genuinely useful without being confusing or prescriptive — students should still feel in control.",
    systemDecision: "Built a layered fallback system: first checks a Firestore cache of recent market data, then scrapes Google Shopping median prices via SerpAPI, and if both fail, prompts Claude Haiku with a constrained 'estimate a reasonable resale price in MYR, return only a number' call. Student prices are capped at 90% of whatever the system determines as the ceiling.",
    trace: [
      { constraint: "No price reference exists for similar items on campus", system: "Source external market data — Firestore cache → SerpAPI → Claude Haiku fallback" },
      { constraint: "A raw suggested price can feel confusing or ignored", system: "Present it during a dedicated review step with original price side by side" },
      { constraint: "The system shouldn't overrule the student", system: "Cap at 90% of the ceiling — the student still makes the final call" },
    ],
    features: [
      "Multi‑source price estimation pipeline — cache first, live scrape second, LLM fallback third.",
      "Side‑by‑side review step showing the student's price and the system suggestion before publishing.",
      "AI price control only intervenes beyond a certain ceiling — normal listings pass through unchecked.",
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
    outcome: "The key challenge wasn't the AI — it was designing a fallback system that keeps the student in control while still providing helpful guidance. The layered approach means most listings get a data-driven suggestion, and the AI only fires when live data isn't available.",
    overview: "Pulse is a campus commerce platform. Students buy and sell items, merchants manage listings and orders, runners handle deliveries, and admins oversee the platform.",
    priceGuidance: [
      "Pulse helps students price comparable items more fairly.",
      "It checks saved Firestore prices first, then similar listings and Google Shopping prices through SerpAPI. If market data is unavailable, Claude Haiku estimates a reasonable resale price in MYR based on the item name and category.",
      "Pulse shows a suggested campus-friendly price before publishing, helping students avoid accidental overpricing while keeping the final decision with them.",
    ],
    runnerDescription: "Runners manage delivery missions, upload pickup and delivery proof, and complete a GPS proximity check at the drop-off point.",
    media: {
      poster: "/projects/pulse/pulse-campus-services.png",
      posterCaption: "Pulse home — campus services, student tools, and commerce in one place.",
      gallery: [
        {
          src: "/projects/pulse/pulse-marketplace.png",
          alt: "Pulse marketplace screen showing campus item listings",
          title: "A campus market",
          caption: "Marketplace discovery — students browse active listings across campus.",
        },
        {
          src: "/projects/pulse/pulse-campus-services.png",
          alt: "Pulse home screen showing campus services and student directory",
          title: "One shared place",
          caption: "Campus services — student tools and services are available from the same app.",
        },
        {
          src: "/projects/pulse/pulse-price-review.png",
          alt: "Pulse AI price review showing a suggested campus price limit",
          title: "Designed for fairer prices",
          featured: true,
          caption: "Price review — the system explains a suggested limit before a listing is published.",
        },
        {
          src: "/projects/pulse/pulse-runner-dashboard.png",
          alt: "Pulse Runner dashboard showing missions and earnings",
          title: "Campus runners",
          caption: "Runner dashboard — verified students can manage campus delivery requests.",
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
    problem: "\"Saved\" content becomes forgotten content. Every bookmarking product optimizes for saving — the return experience is an afterthought.",
    keyConstraint: "No AI. Most modern resurfacing products rely on ML/LLMs. I wanted a transparent, deterministic system any developer could tune.",
    systemDecision: "Built a deterministic scoring engine with 6 weighted factors (age, never-opened bonus, recently-opened penalty, repeat-save relevance, resurfaced-history penalty, deterministic jitter). Combined with SHA-256 URL normalization (10 rules — lowercase, strip UTM/tracking, remove fragments, default ports, credentials), async metadata fetch via SSRF-safe queue, and a state-machine lifecycle (Waiting → Resurfaced → Opened → Completed / Snoozed). Diversity rules cap resurfacing to 3/day — top score, different domain, then oldest candidate.",
    trace: [
      { constraint: "URL duplicates from different sources (UTM, casing, protocols)", system: "10-rule URL normalization → SHA-256 hash → DB UNIQUE(user_id, hash) with lockForUpdate race fallback" },
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
      "PWA + Swift/SwiftUI iOS 17+ share extension",
    ],
    technology: [
      "Laravel 13",
      "PHP 8.4",
      "Vue 3",
      "Inertia.js 3",
      "Tailwind CSS v4",
      "shadcn-vue",
      "SQLite",
      "PostgreSQL",
      "Swift/SwiftUI",
      "GitHub Actions",
    ],
    outcome: "Saving is easy. Returning is hard. Good resurfacing makes users feel the app respects their time. URL normalization is deceptively complex — trailing slashes, encoding, protocol-relative URLs. Getting it wrong means duplicates. Deterministic systems are easier to debug, test, and explain — but need more tuning surface area. Inertia.js eliminates the need for a separate API layer while keeping the frontend reactive.",
    media: { poster: "", gallery: [] },
  },
  {
    slug: "rosta",
    title: "Rosta",
    thesis: "Enterprise shift scheduling with multi-tenant organizations, configurable roles, and full employee lifecycle.",
    role: "Solo personal project",
    status: "prototype",
    problem: "Cafe teams manage schedules through spreadsheets or expensive SaaS tools. Most shift scheduling apps are overbuilt for enterprise or too rigid for small teams.",
    keyConstraint: "Multi-tenant RLS with configurable roles — every query scoped to organization_id, permissions stored as jsonb on the role, not hardcoded.",
    systemDecision: "Built with Next.js 16 Server Actions (no API routes), Supabase Postgres with RLS, and a deterministic role model where permissions are jsonb checked via a single user_has_permission() SQL function. Route groups for layout sharing, safe-to-re-run migrations (every create/add/drop guarded with if not exists), and flattened URLs via next.config.ts redirects.",
    trace: [
      { constraint: "Permissions checked on every operation", system: "Single user_has_permission() SQL function checking jsonb permissions — no hardcoded role checks in app code" },
      { constraint: "Migrations must survive re-runs without errors", system: "Every create table / add column / create policy wrapped in if-not-exists / drop-if-exists guards — entire migration replayable" },
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
      "Tailwind CSS v4",
      "Supabase (Postgres, Auth, RLS)",
      "Waldenburg + Inter (ElevenLabs design system)",
    ],
    outcome: "Route groups ((dashboard)) don't change URL paths — (dashboard)/page.tsx and root page.tsx both map to / and conflict. Server actions with redirect() thrown inside them need the calling client to NOT catch the error — Next.js intercepts at the transport level. next.config.ts redirects need a dev server restart; HMR doesn't pick them up. Tailwind v4 @theme is powerful but custom utilities must be explicitly defined or they silently fall back to defaults.",
    media: { poster: "", gallery: [] },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
