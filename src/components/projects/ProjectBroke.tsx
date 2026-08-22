import type { Project } from "@/content/projects";
import MonoLabel from "@/components/ui/MonoLabel";

export default function ProjectBroke({ project }: { project: Project }) {
  if (!project.whatBroke || project.whatBroke.length === 0) return null;

  return (
    <section className="project-broke" aria-labelledby="broke-heading">
      <div className="grid-row">
        <div className="grid-col-full">
          <MonoLabel className="project-section-label">What broke</MonoLabel>
          <h2 id="broke-heading" className="project-chapter-title">Things that went wrong first</h2>
          <ul className="broke-list">
            {project.whatBroke.map((item, i) => (
              <li key={i} className="broke-item">
                <span className="broke-marker" aria-hidden="true">{'//'}</span>
                <p className="broke-text">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
