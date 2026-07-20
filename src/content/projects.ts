export interface Project {
  slug: string;
  title: string;
  thesis: string;
  role: string;
  year: string;
  status: "shipped" | "in-progress" | "prototype";
  problem: string;
  systemDecision: string;
  features: string[];
  technology: string[];
  outcome: string;
  media: {
    poster: string;
    gallery: string[];
  };
}

export const projects: Project[] = [
  {
    slug: "soon",
    title: "Soon",
    thesis: "A context-aware reminder system that learns when and where you forget things.",
    role: "Solo Developer",
    year: "2026",
    status: "prototype",
    problem:
      "Existing reminder apps rely on fixed times and dates. They do not adapt to context — location, habits, time of day, or device state. Users either over-notify themselves or forget to set reminders entirely.",
    systemDecision:
      "Designed a rule engine that combines time, location, and app-usage signals into a single priority queue. Reminders surface only when the system predicts the user can act on them, reducing notification fatigue.",
    features: [
      "Context inference — combines GPS, Wi-Fi SSID, and foreground app data to estimate user state.",
      "Adaptive priority — pending reminders re-rank dynamically as context changes throughout the day.",
      "Quiet windows — suppresses non-urgent items during focus periods or meetings.",
      "Brief log — a scrollable timeline of what was reminded and whether it was acted on.",
    ],
    technology: ["TypeScript", "React Native", "Expo", "SQLite", "Task scheduler"],
    outcome:
      "An exploratory prototype. The core idea is functional — the rule engine surfaces relevant reminders — but the context-inference layer needs more sensors and real-world testing before it ships.",
    media: {
      poster: "/projects/soon/poster.jpg",
      gallery: ["/projects/soon/01.jpg", "/projects/soon/02.jpg"],
    },
  },
  {
    slug: "pulse",
    title: "Pulse",
    thesis: "A campus marketplace that connects students through verified institutional profiles.",
    role: "Full-stack Developer",
    year: "2026",
    status: "shipped",
    problem:
      "University students buy, sell, and trade items across fragmented WhatsApp groups and notice boards. There is no central system, no verification, and no accountability when disputes arise.",
    systemDecision:
      "Built on institutional email verification so only enrolled students can list or purchase. A lightweight dispute layer lets users flag issues without leaving the platform.",
    features: [
      "Verified listings — every item is tied to a confirmed institutional email.",
      "Peer delivery — optional runner system for on-campus handoffs with live status.",
      "Price sanity check — a simple heuristic flags listings that deviate significantly from category averages.",
      "Dispute log — structured timeline for issue reporting and resolution.",
    ],
    technology: ["Next.js", "React", "Tailwind CSS", "Firebase Auth", "Firestore", "Cloud Functions", "Vercel"],
    outcome:
      "Live on campus. The email-verification gate eliminated spam effectively. The dispute log sees light use, which suggests trust is holding — but the feature exists when needed.",
    media: {
      poster: "/projects/pulse/poster.jpg",
      gallery: ["/projects/pulse/01.jpg", "/projects/pulse/02.jpg", "/projects/pulse/03.jpg"],
    },
  },
  {
    slug: "codedulu",
    title: "CodeDulu",
    thesis: "A developer momentum platform that turns coding habits into visible progress.",
    role: "Solo Developer",
    year: "2026",
    status: "in-progress",
    problem:
      "Developers track contributions through GitHub streaks and commit graphs, but these measure output, not momentum. Streaks punish missed days and ignore the quality or consistency of deep work.",
    systemDecision:
      "Instead of counting days, the system scores sessions by duration, focus depth (estimated via editor idle time), and variety of files touched. Momentum is a rolling weighted score, not a binary streak.",
    features: [
      "Session scoring — each coding session gets a momentum score based on duration and focus.",
      "Focus decay — idle pauses longer than 5 minutes taper the session score, encouraging sustained work.",
      "Rolling window — the dashboard shows a 14-day momentum chart instead of a streak counter.",
      "Tagged goals — optional project tags let the developer view momentum per codebase.",
    ],
    technology: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "VS Code extension (telemetry)"],
    outcome:
      "In active development. The scoring model is defined and the dashboard renders real data from a local VS Code extension. Next step is remote sync and sharing controls.",
    media: {
      poster: "/projects/codedulu/poster.jpg",
      gallery: ["/projects/codedulu/01.jpg"],
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
