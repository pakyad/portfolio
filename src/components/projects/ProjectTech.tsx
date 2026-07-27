import type { Project } from "@/content/projects";
import MonoLabel from "@/components/ui/MonoLabel";

export default function ProjectTech({ project }: { project: Project }) {
  if (!project.technology || project.technology.length === 0) return null;

  return (
    <section className="project-tech">
      <div className="grid-row">
        <div className="grid-col-full">
          <MonoLabel className="project-section-label">Tech stack</MonoLabel>
          <div className="tech-chips">
            {project.technology.map((tech) => (
              <span key={tech} className="tech-chip">{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
