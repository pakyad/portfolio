export interface Project {
  id: string;
  number: string;
  title: string;
  description: string;
  year: string;
  role: string;
  slug: string;
  proposition: string;
  problem: string;
  approach: string;
  decisions: string[];
  features: string[];
  technologies: string[];
  outcome: string;
}

export const projects: Project[] = [
  {
    id: "codep-pulse",
    number: "01",
    title: "CODEP-PULSE",
    description: "Campus everything-on-demand platform",
    year: "2026",
    role: "Full-stack Developer",
    slug: "codep-pulse",
    proposition:
      "CODEP-PULSE is a campus-wide digital platform connecting students to essential services: marketplace listings, food delivery, academic tools, and administrative workflows.",
    problem:
      "University students lacked a unified system for buying and selling goods, ordering food delivery, managing disputes, and accessing verified institutional communications. Existing solutions were fragmented across WhatsApp groups, notice boards, and disconnected apps.",
    approach:
      "I designed and built a single-application ecosystem with modular domains. Each domain — marketplace, delivery, verification, disputes — operates independently but shares a unified authentication layer, notification system, and admin dashboard.",
    decisions: [
      "Chose Next.js for server-rendered pages and API routes, reducing backend complexity.",
      "Used Firebase Auth with institutional email verification to prevent off-campus access.",
      "Built an AI-driven price control system to detect unfair pricing in the marketplace.",
      "Designed a dispute management flow with evidence submission and admin mediation.",
    ],
    features: [
      "Campus Marketplace — students list and browse items within verified institutional domains.",
      "Student Runner Delivery — peer-to-peer delivery with real-time tracking and rating system.",
      "Institutional Email Verification — Firestore-based verification flow using university email suffixes.",
      "AI Price Control — anomaly detection model flags overpriced or undercut listings.",
      "Dispute Management — structured reporting, evidence upload, and admin adjudication.",
      "Ratings and Reviews — bidirectional rating between buyers and sellers.",
      "Admin Analytics — dashboard for platform health, disputes, and user activity.",
    ],
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Firebase Auth",
      "Firestore",
      "Cloud Functions",
      "Vercel",
    ],
    outcome:
      "Built a production-ready campus platform serving multiple domains. The project demonstrated how a small team can deliver a coherent multi-feature system using modern full-stack tooling. The AI price control feature was a particularly valuable exploration in applied machine learning within a student context.",
  },
  {
    id: "see-heart",
    number: "02",
    title: "SEE-HEART",
    description: "Health and fitness tracking application",
    year: "2025",
    role: "UI/UX Designer & Developer",
    slug: "see-heart",
    proposition:
      "SEE-HEART is a health and fitness tracking application designed to help users monitor their wellness journey through an intuitive, accessible interface.",
    problem:
      "Fitness tracking apps often overwhelm users with complexity. SEE-HEART needed to balance feature depth with simplicity for a broad user base, including those less familiar with health tracking technology.",
    approach:
      "I led the design and development of a streamlined fitness tracker with a focus on usability testing. The application was evaluated with 15 respondents and achieved a SUS score of 73.94, indicating good usability overall.",
    decisions: [
      "Prioritized a clean, glanceable dashboard as the primary interface.",
      "Focused on core tracking features rather than feature bloat.",
      "Used iterative design improvements based on usability feedback.",
      "Identified consistency as the clearest improvement area from SUS analysis.",
    ],
    features: [
      "Activity tracking with visual progress indicators.",
      "Health metric logging and history.",
      "Goal setting with milestone tracking.",
      "Usability-tested interface refined through 15 respondent feedback sessions.",
    ],
    technologies: [
      "React",
      "Tailwind CSS",
      "Firebase",
      "Chart.js",
    ],
    outcome:
      "Delivered a functional health tracking application with validated usability. The SUS score of 73.94 confirmed good usability while highlighting consistency as a key focus for future iterations. The project reinforced my understanding of usability testing as an essential design tool.",
  },
  {
    id: "volunteer-management",
    number: "03",
    title: "VOLUNTEER MANAGEMENT SYSTEM",
    description: "Volunteer workflow and event administration platform",
    year: "2025",
    role: "Full-stack Developer",
    slug: "volunteer-management",
    proposition:
      "A comprehensive platform for managing volunteer registration, event coordination, and administrative oversight across multiple organizations.",
    problem:
      "Volunteer organizations relied on spreadsheets and manual coordination for registration, scheduling, and reporting. This led to miscommunication, duplicated efforts, and lack of visibility into volunteer availability and event capacity.",
    approach:
      "I developed a role-based system with distinct interfaces for volunteers, event organizers, and administrators. The platform streamlines the entire volunteer lifecycle — from registration through event participation to post-event reporting.",
    decisions: [
      "Implemented role-based dashboards to separate concerns for volunteers, organizers, and admins.",
      "Built an approval workflow to manage volunteer applications and event assignments.",
      "Designed reporting tools to give organizers insight into participation metrics.",
    ],
    features: [
      "Volunteer Registration — profile creation, skill tagging, and availability management.",
      "Event Management — create, edit, and manage volunteer events with capacity controls.",
      "Approval Workflow — structured application and assignment process.",
      "Reports — participation metrics, event history, and volunteer analytics.",
      "Role-based Dashboards — distinct views for volunteers, organizers, and administrators.",
    ],
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Firebase Auth",
      "Firestore",
      "Cloud Functions",
    ],
    outcome:
      "Successfully delivered a multi-role platform that replaced manual coordination processes. The project strengthened my ability to design role-specific interfaces and build approval workflows that scale across different user types.",
  },
];

export const siteMetadata = {
  title: "Muhammad Iyad — Selected Digital Work",
  description:
    "Portfolio of Muhammad Iyad Iman — software engineer and creative developer building digital products with clarity, motion, and character.",
  url: "https://iyad.dev",
  ogImage: "/og.jpg",
};
