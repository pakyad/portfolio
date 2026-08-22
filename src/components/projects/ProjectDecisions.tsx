import type { Project } from "@/content/projects";
import MonoLabel from "@/components/ui/MonoLabel";

export default function ProjectDecisions({ project }: { project: Project }) {
  const hasTrace = project.trace.length > 0;
  const hasLayers = !!project.systemLayers && project.systemLayers.length > 0;
  if (!hasTrace && !hasLayers) return null;

  return (
    <section className="project-decisions" aria-labelledby="decisions-heading">
      <div className="grid-row">
        <div className="grid-col-full">
          <MonoLabel className="project-section-label">Constraints → Decisions</MonoLabel>
          <h2 id="decisions-heading" className="project-chapter-title">How the system answers</h2>
        </div>
      </div>

      {hasTrace && (
        <div className="trace-list">
          {project.trace.map((item, i) => (
            <div key={i} className="trace-row">
              <span className="trace-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <div className="trace-cell">
                <MonoLabel className="trace-label">Constraint</MonoLabel>
                <p className="trace-text">{item.constraint}</p>
              </div>
              <div className="trace-cell">
                <MonoLabel className="trace-label">Decision</MonoLabel>
                <p className="trace-text">{item.system}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {hasLayers && (
        <div className="system-map-groups">
          {project.systemLayers!.map((layer) => (
            <div key={layer.label}>
              <h3>{layer.label}</h3>
              <p>{layer.description}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
