import type { Project } from "@/content/projects";
import MonoLabel from "@/components/ui/MonoLabel";
import ScreenshotFrame from "@/components/projects/ScreenshotFrame";
import ProjectTechStack from "@/components/projects/ProjectTechStack";

export default function ProjectHero({ project }: { project: Project }) {
  return (
    <section className="project-hero">
      <div className="project-hero-poster">
        <div className="project-hero-copy">
          <h1 className="project-hero-title">{project.title}</h1>
          <p className="project-hero-subtitle">{project.thesis}</p>
          <div className="project-hero-meta"><MonoLabel className="project-hero-meta-label">Role</MonoLabel><p className="project-hero-meta-value">{project.role}</p></div>
          <ProjectTechStack project={project} />
        </div>
        {project.media.poster && <ScreenshotFrame src={project.media.poster} alt={`${project.title} home screen`} caption={project.media.posterCaption ?? `${project.title} overview.`} className="screenshot-card-hero" priority />}
      </div>
    </section>
  );
}
