import Link from "next/link";
import { caseStudies, siteBuilds } from "@/content/projects";
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
        {caseStudies.map((project, i) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className={`project-row${project.availability === "unavailable" ? " project-row--offline" : ""}`}
            data-image={gradients[i % gradients.length]}
            data-label={`${project.title} — ${project.category}`}
            aria-label={`View project: ${project.title}`}
          >
            <span className="project-year" aria-hidden="true">{`//${project.year.slice(-2)}`}</span>
            <span className="project-category">{project.category}</span>
            <h3 className="project-title">{project.title}</h3>
            <span className="project-row-meta">
              {project.liveUrl && project.availability !== "unavailable" && <span className="meta-tag">Live</span>}
              {project.sourceUrl && <span className="meta-tag">Source</span>}
              {project.statusLabel && <span className="meta-status">{project.statusLabel}</span>}
            </span>
            <span className="project-arrow" aria-hidden="true">&#8599;</span>
          </Link>
        ))}
      </ProjectInteractions>

      <div className="more-builds">
        <h3 className="more-builds-title">More builds</h3>
        <ul className="build-list">
          {siteBuilds.map((build) => {
            const inner = (
              <>
                <span className="project-year" aria-hidden="true">{`//${build.year.slice(-2)}`}</span>
                <span className="build-num">{build.title}</span>
                <span className="build-desc">{build.description}</span>
                <span className="project-row-meta">
                  {build.url && !build.placeholder && <span className="meta-tag">Live</span>}
                  {build.sourceUrl && <span className="meta-tag">Source</span>}
                </span>
                {(build.url || build.sourceUrl) && !build.placeholder && (
                  <span className="project-arrow" aria-hidden="true">&#8599;</span>
                )}
              </>
            );
            const href = build.placeholder ? undefined : build.url ?? build.sourceUrl;
            return (
              <li key={build.title} className="build-row">
                {href ? (
                  <a href={href} target="_blank" rel="noopener noreferrer" className="build-link">{inner}</a>
                ) : (
                  <div className="build-link build-link--placeholder">{inner}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
