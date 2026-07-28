import type { Project } from "@/content/projects";

export default function ProjectFocus({ project }: { project: Project }) {
  if (!project.features || project.features.length === 0) return null;

  const items = project.features.slice(0, 4);

  return (
    <section className="project-focus">
      <div className="grid-row">
        <div className="grid-col-full">
          <p className="project-section-label">06 / Focus Areas</p>
        </div>
      </div>
      <div className="grid-row project-focus-grid">
        {items.map((feature, i) => (
          <div key={feature} className="project-focus-card">
            <span className="project-focus-num">{String(i + 1).padStart(2, "0")}</span>
            <p className="project-focus-text">{feature}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
