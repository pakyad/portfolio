import type { Project } from "@/content/projects";

export default function ProjectScreenshot({ project }: { project: Project }) {
  if (!project.media.poster) return null;

  return (
    <section className="project-screenshot">
      <div className="grid-row">
        <div className="grid-col-full">
          <div className="screenshot-frame">
            <img src={project.media.poster} alt={`${project.title} screenshot`} />
          </div>
          {project.media.gallery.length > 0 && (
            <div className="screenshot-gallery">
              {project.media.gallery.map((src, i) => (
                <div key={i} className="screenshot-frame">
                  <img src={src} alt={`${project.title} screenshot ${i + 1}`} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
