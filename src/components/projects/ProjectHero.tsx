import type { Project } from "@/content/projects";
import { getBrandedProjectUrl } from "@/content/projectDomains";
import MonoLabel from "@/components/ui/MonoLabel";
import ScreenshotFrame from "@/components/projects/ScreenshotFrame";
import ProjectTechStack from "@/components/projects/ProjectTechStack";

export default function ProjectHero({ project }: { project: Project }) {
  const hasPoster = Boolean(project.media.poster || project.media.posterSecondary);
  const liveUrl = getBrandedProjectUrl(project.slug, project.liveUrl);

  return (
    <section className="project-hero">
      <div className={`project-hero-poster${hasPoster ? "" : " project-hero-poster--text-only"}`}>
        <div className="project-hero-copy">
          <h1 className="project-hero-title">{project.title}</h1>
          <p className="project-hero-subtitle">{project.thesis}</p>
          <div className="project-hero-meta"><MonoLabel className="project-hero-meta-label">Role</MonoLabel><p className="project-hero-meta-value">{project.role}</p></div>
          <ProjectTechStack project={project} />
          {liveUrl && (
            <a className="project-live-link" href={liveUrl} target="_blank" rel="noreferrer">
              View live website <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
        {hasPoster && <div className="poster-pair">
          {project.media.poster && (
            <ScreenshotFrame src={project.media.poster} alt={`${project.title} home screen`} caption={project.media.posterCaption ?? `${project.title} overview.`} className="screenshot-card-pair" priority />
          )}
          {project.media.posterSecondary && (
            <ScreenshotFrame src={project.media.posterSecondary} alt={`${project.title} marketplace`} caption={project.media.posterSecondaryCaption ?? `${project.title} marketplace.`} className="screenshot-card-pair" />
          )}
        </div>}
      </div>
    </section>
  );
}
