import type { Project } from "@/content/projects";

export default function ProjectOutcome({ project }: { project: Project }) {
  if (project.outcome.length === 0) return null;

  return (
    <section className="project-outcome">
      <div className="grid-row">
        <div className="grid-col-full">
          <p className="project-section-label">What I learned</p>
        </div>
      </div>
      <div className="outcome-grid">
        {project.outcome.map((section) => (
          <div key={section.label} className="outcome-card">
            <span className="outcome-card-marker">{'//'}</span>
            <h3 className="outcome-card-label">{section.label}</h3>
            <p className="outcome-card-body">{section.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
