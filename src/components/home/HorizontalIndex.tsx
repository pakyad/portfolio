import Link from "next/link";
import { works } from "@/content/projects";
import ProjectInteractions from "@/components/home/ProjectInteractions";

const gradients = [
  "linear-gradient(135deg, #2a4d7a, #16305c)",
  "linear-gradient(135deg, #3a2a6a, #1c1848)",
  "linear-gradient(135deg, #2a6a5a, #143830)",
  "linear-gradient(135deg, #1f5f8a, #0e2f4d)",
  "linear-gradient(135deg, #7a4a2a, #3d2413)",
  "linear-gradient(135deg, #2a3a6a, #14203c)",
];

export default function HorizontalIndex() {
  return (
    <section id="work" className="work-section" aria-labelledby="work-heading">
      <h2 id="work-heading">Selected work.</h2>
      <ProjectInteractions>
        {works.map((work, i) => {
          const href = work.liveUrl && work.availability !== "unavailable"
            ? work.liveUrl
            : work.sourceUrl
            ? `/projects/${work.slug}`
            : undefined;
          const isPlaceholder = !href;
          return (
            <Link
              key={work.slug}
              href={href ?? "#"}
              className={`work-row${work.tier === "featured" ? " work-row--featured" : ""}${work.availability === "unavailable" ? " work-row--offline" : ""}${isPlaceholder ? " work-row--placeholder" : ""}`}
              data-image={gradients[i % gradients.length]}
              data-label={`${work.title} — ${work.category}`}
              aria-label={`View project: ${work.title}`}
              aria-disabled={isPlaceholder}
              tabIndex={isPlaceholder ? -1 : 0}
            >
              <span className="work-year" aria-hidden="true">{`//${work.year.slice(-2)}`}</span>
              <h3 className="work-title">{work.title}</h3>
              {work.description && <span className="work-desc">{work.description}</span>}
              <span className="work-meta">
                {work.liveUrl && work.availability !== "unavailable" && <span className="meta-tag">Live</span>}
                {work.sourceUrl && <span className="meta-tag">Source</span>}
                {work.statusLabel && <span className="meta-status">{work.statusLabel}</span>}
                {work.availability === "unavailable" && <span className="meta-tag meta-tag--offline">Offline &mdash; back soon</span>}
              </span>
              <span className="work-arrow" aria-hidden="true">{work.availability === "unavailable" ? "&#8635;" : "&#8599;"}</span>
            </Link>
          );
        })}
      </ProjectInteractions>
    </section>
  );
}
