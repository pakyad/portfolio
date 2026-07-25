import type { Project } from "@/content/projects";
import MonoLabel from "@/components/ui/MonoLabel";

type EvidenceGridProps = { project: Project };

export default function EvidenceGrid({ project }: EvidenceGridProps) {
  return (
    <section className="evidence-grid">
      <div className="grid-row"><div className="grid-col-full"><MonoLabel className="project-section-label">Focus areas</MonoLabel></div></div>
      <div className="grid-row">
        {project.features.map((feature, i) => <div key={feature} className="grid-col-6"><div className="evidence-card"><span className="evidence-card-number typo-meta">{String(i + 1).padStart(2, "0")}</span><p className="evidence-card-text">{feature}</p></div></div>)}
      </div>
      <div className="grid-row evidence-grid-secondary"><div className="grid-col-6"><MonoLabel className="project-section-label">What I learned</MonoLabel><p className="project-body-text">{project.outcome}</p></div></div>
    </section>
  );
}
