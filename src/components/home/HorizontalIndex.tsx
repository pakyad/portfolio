import Link from "next/link";
import { publishedProjects } from "@/content/projects";
import ProjectInteractions from "@/components/home/ProjectInteractions";

const gradients = [
  "linear-gradient(135deg, #2a4d7a, #16305c)",
  "linear-gradient(135deg, #3a2a6a, #1c1848)",
  "linear-gradient(135deg, #2a6a5a, #143830)",
];

export default function HorizontalIndex() {
  return (
    <section id="work" className="work-section" aria-labelledby="work-heading">
      <h2 id="work-heading">Selected work.</h2>
      <ProjectInteractions>
        {publishedProjects.map((project, i) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="project-row"
            data-image={gradients[i % gradients.length]}
            data-label={`${project.title} — ${project.category}`}
            aria-label={`View project: ${project.title}`}
          >
            <span className="project-category">{project.category}</span>
            <h3 className="project-title">{project.title}</h3>
            <span className="project-row-meta">
              {project.liveUrl && <span className="meta-tag">Live</span>}
              {project.sourceUrl && <span className="meta-tag">Source</span>}
              {project.statusLabel && <span className="meta-status">{project.statusLabel}</span>}
            </span>
            <span className="project-arrow" aria-hidden="true">&#8599;</span>
          </Link>
        ))}
      </ProjectInteractions>
    </section>
  );
}
