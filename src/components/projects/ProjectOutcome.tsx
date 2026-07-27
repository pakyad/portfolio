import type { Project } from "@/content/projects";
import MonoLabel from "@/components/ui/MonoLabel";

export default function ProjectOutcome({ project }: { project: Project }) {
  if (!project.outcome) return null;

  const insights = project.outcome
    .split(".")
    .filter((s) => s.trim().length > 0)
    .map((s) => s.trim() + ".");

  return (
    <section className="project-outcome">
      <div className="grid-row">
        <div className="grid-col-8">
          <MonoLabel className="project-section-label">What I learned</MonoLabel>
        </div>
      </div>
      <div className="grid-row">
        <div className="grid-col-8">
          {insights.map((sentence, i) => (
            <p key={i} className="project-outcome-line">
              <span className="project-outcome-mark">{String(i + 1).padStart(2, "0")}</span>
              <span>{sentence}</span>
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
