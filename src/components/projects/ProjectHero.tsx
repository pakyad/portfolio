import type { Project } from "@/content/projects";
import { getBrandedProjectUrl } from "@/content/projectDomains";
import MonoLabel from "@/components/ui/MonoLabel";
import ScreenshotFrame from "@/components/projects/ScreenshotFrame";
import ProjectTechStack from "@/components/projects/ProjectTechStack";

export default function ProjectHero({ project }: { project: Project }) {
  const hasPoster = Boolean(project.media.poster || project.media.posterSecondary);
  const liveUrl = getBrandedProjectUrl(project.slug, project.liveUrl);
  const hasLinks = Boolean(liveUrl || project.sourceUrl);

  return (
    <section className="project-hero">
      <div className={`project-hero-poster${hasPoster ? "" : " project-hero-poster--text-only"}`}>
        <div className="project-hero-copy">
          {project.statusLabel && (
            <div className="project-hero-status">
              <MonoLabel className="project-hero-meta-label">Status</MonoLabel>
              <span className="status-chip" data-status={project.status}>{project.statusLabel}</span>
            </div>
          )}
          <h1 className="project-hero-title">{project.title}</h1>
          <p className="project-hero-subtitle">{project.thesis}</p>
          {hasLinks && (
            <div className="project-links">
              {liveUrl && (
                <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="project-live-link">
                  View live website<span aria-hidden="true"> ↗</span>
                </a>
              )}
              {project.sourceUrl && (
                <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="project-source-link">
                  Source<span aria-hidden="true"> ↗</span>
                </a>
              )}
            </div>
          )}
          <div className="project-hero-meta"><MonoLabel className="project-hero-meta-label">Role</MonoLabel><p className="project-hero-meta-value">{project.role}</p></div>
          <ProjectTechStack project={project} />
        </div>
        {hasPoster && (
          <div className="poster-pair">
            {project.media.poster && (
              <ScreenshotFrame src={project.media.poster} alt={`${project.title} home screen`} caption={project.media.posterCaption ?? `${project.title} overview.`} className="screenshot-card-pair" priority />
            )}
            {project.media.posterSecondary && (
              <ScreenshotFrame src={project.media.posterSecondary} alt={`${project.title} marketplace`} caption={project.media.posterSecondaryCaption ?? `${project.title} marketplace.`} className="screenshot-card-pair" />
            )}
          </div>
        )}
      </div>
    </section>
  );
}
