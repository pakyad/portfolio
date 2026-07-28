import type { Project } from "@/content/projects";

export default function ProjectTechStack({ project }: { project: Project }) {
  if (!project.technology || project.technology.length === 0) return null;

  return (
    <section className="project-techstack">
      <p className="project-body-text">{project.technology.join(" · ")}</p>
    </section>
  );
}
