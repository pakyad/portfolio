import type { Project } from "@/content/projects";
import MonoLabel from "@/components/ui/MonoLabel";

const TECH_GROUPS: Record<string, string[]> = {
  Frontend: [
    "Next.js", "React", "Vue", "Inertia.js", "Tailwind CSS",
    "shadcn-vue", "Framer Motion", "Recharts",
  ],
  Backend: [
    "Laravel", "PHP", "Firebase (Auth, Firestore, Storage, Cloud Functions)",
    "Supabase (Postgres, Auth, RLS)", "Anthropic Claude Haiku",
    "SerpAPI",
  ],
  Mobile: ["Swift/SwiftUI"],
  Infra: ["GitHub Actions", "SQLite", "PostgreSQL"],
};

function groupTech(tech: string[]): [string, string[]][] {
  const grouped: [string, string[]][] = [];
  const assigned = new Set<string>();

  for (const [group, keywords] of Object.entries(TECH_GROUPS)) {
    const match = tech.filter((t) => keywords.some((k) => t === k || t.startsWith(k)));
    if (match.length > 0) {
      grouped.push([group, match]);
      match.forEach((t) => assigned.add(t));
    }
  }

  const leftover = tech.filter((t) => !assigned.has(t));
  if (leftover.length > 0) {
    grouped.push(["Tools", leftover]);
  }

  return grouped;
}

export default function ProjectTechStack({ project }: { project: Project }) {
  if (!project.technology || project.technology.length === 0) return null;

  const groups = groupTech(project.technology);

  return (
    <section className="project-techstack">
      <div className="grid-row">
        <div className="grid-col-full">
          <MonoLabel className="project-section-label">Stack</MonoLabel>
        </div>
      </div>
      <div className="grid-row">
        <div className="grid-col-full">
          <div className="techstack-scope">
            {groups.map(([group, items], gi) => (
              <div key={group} className="techstack-group">
                <span className="techstack-group-label">{group}</span>
                <div className="techstack-items">
                  {items.map((item) => (
                    <span key={item} className="techstack-chip">{item}</span>
                  ))}
                </div>
                {gi < groups.length - 1 && <div className="techstack-connector" aria-hidden="true" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
