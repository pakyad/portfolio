import Link from "next/link";
import { publishedProjects } from "@/content/projects";

export default function HorizontalIndex() {
  return (
    <section id="work" className="work-section" aria-labelledby="work-heading">
      <h2 id="work-heading">Selected work.</h2>
      <div className="project-list">
        {publishedProjects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="project-row"
            aria-label={`View project: ${project.title}`}
          >
            <span className="project-category">{project.category}</span>
            <h3 className="project-title">{project.title}</h3>
            <span className="project-row-meta">
              {project.liveUrl && <span className="meta-tag">Live</span>}
              {project.sourceUrl && <span className="meta-tag">Source</span>}
              {project.statusLabel && <span className="meta-status">{project.statusLabel}</span>}
            </span>
            <span className="project-arrow" aria-hidden="true">↗</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
