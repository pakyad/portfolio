import Link from "next/link";
import type { Project } from "@/content/projects";
import MonoLabel from "@/components/ui/MonoLabel";

type ProjectNavigatorProps = {
  projects: Project[];
  currentSlug: string;
};

export default function ProjectNavigator({
  projects,
  currentSlug,
}: ProjectNavigatorProps) {
  const currentIndex = projects.findIndex((p) => p.slug === currentSlug);
  const prev = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const next =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <nav className="project-navigator" aria-label="Project navigation">
      <div className="grid-row">
        <div className="grid-col-6">
          {prev && (
            <Link
              href={`/projects/${prev.slug}`}
              className="project-navigator-link"
            >
              <MonoLabel className="project-navigator-direction">
                Previous
              </MonoLabel>
              <span className="project-navigator-title">
                {prev.title}
              </span>
            </Link>
          )}
        </div>

        <div className="grid-col-6">
          {next && (
            <Link
              href={`/projects/${next.slug}`}
              className="project-navigator-link project-navigator-link-next"
            >
              <MonoLabel className="project-navigator-direction">
                Next
              </MonoLabel>
              <span className="project-navigator-title">
                {next.title}
              </span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
