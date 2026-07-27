import type { Project } from "@/content/projects";
import MonoLabel from "@/components/ui/MonoLabel";

type ProjectThesisProps = { project: Project };

export default function ProjectThesis({ project }: ProjectThesisProps) {
  return (
    <section className="project-thesis">
      <div className="grid-row">
        <div className="grid-col-6"><MonoLabel className="project-section-label">Context</MonoLabel><p className="project-body-text">{project.problem}</p></div>
        <div className="grid-col-6"><MonoLabel className="project-section-label">Challenge</MonoLabel><p className="project-body-text">{project.keyConstraint}</p></div>
      </div>
    </section>
  );
}
