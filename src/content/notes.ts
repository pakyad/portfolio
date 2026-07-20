export interface Note {
  slug: string;
  title: string;
  date: string;
  summary: string;
}

export const notes: Note[] = [
  {
    slug: "building-under-constraint",
    title: "Building under constraint",
    date: "2026-07",
    summary:
      "Why I think small scopes produce better systems than ambitious roadmaps. A reflection on semester projects with fixed deadlines.",
  },
  {
    slug: "on-usability-scores",
    title: "On usability scores",
    date: "2026-06",
    summary:
      "What a SUS score of 73.94 actually means, and why consistency matters more than feature count in early-stage products.",
  },
  {
    slug: "what-i-learned-from-firebase",
    title: "What I learned from Firebase",
    date: "2026-05",
    summary:
      "Firebase gets you to prototype fast, but the constraints hit hard at production scale. A honest review after three projects.",
  },
];
