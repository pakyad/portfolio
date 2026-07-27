import type { Project } from "@/content/projects";
import MonoLabel from "@/components/ui/MonoLabel";

type ProjectThesisProps = { project: Project; variant: "problem" | "overview" };

export default function ProjectThesis({ project, variant }: ProjectThesisProps) {
  const isProblem = variant === "problem";
  const content = isProblem ? project.problem : project.overview;
  if (!content) return null;

  return (
    <section className={`project-thesis project-thesis-${variant}`}>
      <div className="grid-row"><div className="grid-col-8"><MonoLabel className="project-section-label">{isProblem ? "02 / The Problem" : "03 / What I Built"}</MonoLabel><h2 className="project-chapter-title">{isProblem ? "Buying and selling lived in scattered chats." : "One place for campus commerce."}</h2><p className="project-body-text project-story-copy">{content}</p></div></div>
    </section>
  );
}
