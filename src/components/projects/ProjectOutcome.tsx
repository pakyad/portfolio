import type { Project } from "@/content/projects";

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
          <p className="project-section-label">What I learned</p>
        </div>
      </div>
      <div className="grid-row">
        <div className="grid-col-8">
          {insights.map((sentence, i) => (
            <p key={i} className="project-body-text"><span>{sentence}</span></p>
          ))}
        </div>
      </div>
    </section>
  );
}
