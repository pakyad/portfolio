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
            <ScreenshotFrame src={project.media.poster} alt={`${project.title} home screen`} caption={`01 - ${project.media.posterCaption ?? `${project.title} overview.`}`} className="screenshot-card-hero" priority />
          )}
          {variant === "feature" && featuredImage && (
            <div className="featured-screenshot">
              <div className="featured-copy">
                <h2>{featuredImage.title || "Feature"}</h2>
                {project.priceGuidance && <p>{project.priceGuidance.join(" ")}</p>}
              </div>
              <ScreenshotFrame src={featuredImage.src} alt={featuredImage.alt} caption={featuredImage.caption} className="screenshot-card-featured" />
            </div>
          )}
          {variant === "supporting" && supportingImage && (
            <div className="supporting-screenshot supporting-screenshot--reverse">
              <ScreenshotFrame src={supportingImage.src} alt={supportingImage.alt} caption={supportingImage.caption} className="screenshot-card-supporting" />
              <div className="supporting-copy">
                <h2>{supportingImage.title || "Supporting"}</h2>
                {project.runnerDescription && <p>{project.runnerDescription}</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
