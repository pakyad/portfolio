import type { Project } from "@/content/projects";
import ScreenshotFrame from "@/components/projects/ScreenshotFrame";

type ScreenshotVariant = "hero" | "feature" | "supporting";

export default function ProjectScreenshot({ project, variant }: { project: Project; variant: ScreenshotVariant }) {
  if (variant === "hero" && !project.media.poster) return null;
  const featuredImage = project.media.gallery.find((image) => image.featured);
  const supportingImage = project.media.gallery.filter((image) => !image.featured)[2];
  if (variant === "feature" && !featuredImage) return null;
  if (variant === "supporting" && !supportingImage) return null;

  return (
    <section className={`project-screenshot project-screenshot-${variant}`}>
      <div className="grid-row">
        <div className="grid-col-full">
          {variant === "hero" && (
            <ScreenshotFrame src={project.media.poster} alt={`${project.title} home screen`} caption={`01 — ${project.media.posterCaption ?? `${project.title} overview.`}`} className="screenshot-card-hero" priority />
          )}
          {variant === "feature" && featuredImage && (
            <div className="featured-screenshot">
              <div className="featured-copy"><p className="project-section-label">03</p><h2>Fair Price Guidance</h2>{(project.priceGuidance ?? [project.systemDecision]).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
              <ScreenshotFrame src={featuredImage.src} alt={featuredImage.alt} caption={`02 — ${featuredImage.caption}`} className="screenshot-card-featured" />
            </div>
          )}
          {variant === "supporting" && supportingImage && (
            <div className="supporting-screenshot"><div className="supporting-copy"><p className="project-section-label">04</p><h2>Campus Runners</h2>{project.runnerDescription && <p>{project.runnerDescription}</p>}</div><ScreenshotFrame src={supportingImage.src} alt={supportingImage.alt} caption={`03 — ${supportingImage.caption}`} className="screenshot-card-supporting" /></div>
          )}
        </div>
      </div>
    </section>
  );
}
