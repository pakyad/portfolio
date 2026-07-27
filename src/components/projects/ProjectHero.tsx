import Link from "next/link";
import type { Project } from "@/content/projects";
import MonoLabel from "@/components/ui/MonoLabel";
import ScreenshotFrame from "@/components/projects/ScreenshotFrame";

export default function ProjectHero({ project }: { project: Project }) {
  return (
    <section className="project-hero">
      <Link href="/#work" className="project-hero-back editorial-link typo-meta">&larr; Back to selected work</Link>
      <div className="project-hero-poster">
        <div className="project-hero-copy">
          <MonoLabel className="project-hero-meta-label">01 / Campus commerce</MonoLabel>
          <h1 className="project-hero-title">{project.title}</h1>
          <p className="project-hero-subtitle">{project.thesis}</p>
          <div className="project-hero-meta"><MonoLabel className="project-hero-meta-label">Role</MonoLabel><p className="project-hero-meta-value">{project.role}</p></div>
        </div>
        {project.media.poster && <ScreenshotFrame src={project.media.poster} alt={`${project.title} home screen`} caption={`01 — ${project.media.posterCaption ?? `${project.title} overview.`}`} className="screenshot-card-hero" priority />}
      </div>
    </section>
  );
}
