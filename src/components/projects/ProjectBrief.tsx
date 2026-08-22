import type { Project } from "@/content/projects";
import MonoLabel from "@/components/ui/MonoLabel";

export default function ProjectBrief({ project }: { project: Project }) {
  if (!project.problem && !project.overview) return null;

  return (
    <section className="project-brief">
      <div className="grid-row">
        <div className="grid-col-6">
          <MonoLabel className="project-section-label">Problem</MonoLabel>
          <p className="project-story-copy project-body-text">{project.problem}</p>
        </div>
        <div className="grid-col-6">
          {project.keyConstraint && (
            <>
              <MonoLabel className="project-section-label">Key constraint</MonoLabel>
              <p className="project-story-copy project-body-text">{project.keyConstraint}</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
