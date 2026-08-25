import Link from "next/link";
import { caseStudies } from "@/content/projects";
import type { Project } from "@/content/projects";

export default function ProjectNavigator({ project }: { project: Project }) {
  const idx = caseStudies.findIndex((p) => p.slug === project.slug);
  const prev = idx > 0 ? caseStudies[idx - 1] : null;
  const next = idx < caseStudies.length - 1 ? caseStudies[idx + 1] : null;

  if (!prev && !next) return null;

  return (
    <nav className="project-navigator" aria-label="Next and previous project">
      {prev && <ProjectNavCard project={prev} dir="prev" />}
      {next && <ProjectNavCard project={next} dir="next" />}
    </nav>
  );
}

function ProjectNavCard({ project, dir }: { project: Project; dir: "prev" | "next" }) {
  return (
    <Link href={`/projects/${project.slug}`} className={`project-nav-card project-nav-${dir}`}>
      <span className="project-nav-dir">{dir === "prev" ? "Previous" : "Next"}</span>
      <span className="project-nav-title">{project.title}</span>
      <span className="project-nav-thesis">{project.thesis}</span>
    </Link>
  );
}
