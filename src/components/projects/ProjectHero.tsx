import type { Project } from "@/content/projects";
import { getBrandedProjectUrl } from "@/content/projectDomains";
import MonoLabel from "@/components/ui/MonoLabel";
import ScreenshotFrame from "@/components/projects/ScreenshotFrame";
import ProjectTechStack from "@/components/projects/ProjectTechStack";

function isLandscape(dims?: { w: number; h: number }): boolean {
  return Boolean(dims && dims.w > dims.h);
}

export default function ProjectHero({ project }: { project: Project }) {
  const hasPoster = Boolean(project.media.poster || project.media.posterSecondary);
  const liveUrl = getBrandedProjectUrl(project.slug, project.liveUrl);
  const isUnavailable = project.availability === "unavailable";
  const hasLinks = Boolean((liveUrl && !isUnavailable) || project.sourceUrl);

  return (
    <section className="project-hero">
      <div className={`project-hero-poster${hasPoster ? "" : " project-hero-poster--text-only"}`}>
        <div className="project-hero-copy">
          {project.statusLabel && (
            <div className="project-hero-status">
              <MonoLabel className="project-hero-meta-label">Status</MonoLabel>
              <span className="status-chip" data-status={isUnavailable ? "unavailable" : project.status}>{project.statusLabel}</span>
            </div>
          )}
          <h1 className="project-hero-title">{project.title}</h1>
          <p className="project-hero-subtitle">{project.thesis}</p>
          {hasLinks && (
            <div className="project-links">
              {liveUrl && !isUnavailable && (
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
          {isUnavailable && project.availabilityNote && (
            <p className="project-availability-note">{project.availabilityNote}</p>
          )}
          <div className="project-hero-meta"><MonoLabel className="project-hero-meta-label">Role</MonoLabel><p className="project-hero-meta-value">{project.role}</p></div>
          <ProjectTechStack project={project} />
        </div>
        {hasPoster && (
          <div className="poster-pair">
            {project.media.poster && (
              <ScreenshotFrame src={project.media.poster} alt={`${project.title} home screen`} caption={project.media.posterCaption ?? `${project.title} overview.`} width={project.media.posterDims?.w} height={project.media.posterDims?.h} className={`screenshot-card-pair${isLandscape(project.media.posterDims) ? " screenshot-card-pair--wide" : ""}`} priority />
            )}
            {project.media.posterSecondary && (
              <ScreenshotFrame src={project.media.posterSecondary} alt={`${project.title} marketplace`} caption={project.media.posterSecondaryCaption ?? `${project.title} marketplace.`} width={project.media.posterSecondaryDims?.w} height={project.media.posterSecondaryDims?.h} className={`screenshot-card-pair${isLandscape(project.media.posterSecondaryDims) ? " screenshot-card-pair--wide" : ""}`} />
            )}
          </div>
        )}
      </div>
    </section>
  );
}
