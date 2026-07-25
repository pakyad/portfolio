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
  media: { poster: string; gallery: string[] };
}

export const projects: Project[] = [
  {
    slug: "pulse",
    title: "Pulse",
    thesis: "Campus marketplace project.",
    role: "Current project",
    status: "in-progress",
    problem: "Student listings can vary widely in price.",
    keyConstraint: "Price guidance needs to be useful without being difficult to understand.",
    systemDecision: "I worked on an AI-assisted price-control system that helps students consider a more reasonable price before publishing a listing.",
    trace: [
      { constraint: "Listings can vary widely in price", system: "Provide price guidance before a listing is published" },
      { constraint: "A suggested price can be confusing without context", system: "Keep the recommendation clear and easy to review" },
    ],
    features: [
      "Price guidance for student listings.",
      "A clear review step before publishing.",
      "A focus on understandable recommendations rather than automated decisions.",
    ],
    technology: [],
    outcome: "The key work was deciding what information the system should consider and how to explain a suggested price clearly to a student.",
    media: { poster: "", gallery: [] },
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
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
