import type { Project } from "@/content/projects";

export default function ProjectContribution({ project }: { project: Project }) {
  const layers = project.systemLayers;
  if (!layers || layers.length === 0) return null;

  return (
    <section className="project-contribution">
      <div className="grid-row">
        <div className="grid-col-full">
          <p className="project-section-label">Fallback Chain</p>
        </div>
      </div>
      <div className="cascade-pills">
        {layers.map((layer, i) => (
          <div key={i} className="cascade-pill" style={{ marginLeft: i * 28 + "px", "--pill-index": i } as React.CSSProperties}>
            <span className="cascade-pill-label">{layer.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
