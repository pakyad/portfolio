import type { Project } from "@/content/projects";
import MonoLabel from "@/components/ui/MonoLabel";

type EvidenceRow = { label: string; value: string; href?: string };

function buildRows(project: Project): EvidenceRow[] {
  const rows: EvidenceRow[] = [];
  if (project.liveUrl) rows.push({ label: "Live", value: project.liveUrl.replace(/^https?:\/\//, ""), href: project.liveUrl });
  if (project.sourceUrl) rows.push({ label: "Source", value: project.sourceUrl.replace(/^https?:\/\/(www\.)?/, "github.com/"), href: project.sourceUrl });
  if (project.tests) rows.push({ label: "Tests", value: project.tests });
  if (project.deployment) rows.push({ label: "Deployment", value: project.deployment });
  if (project.performance) rows.push({ label: "Performance", value: project.performance });
  return rows;
}

export default function ProjectEvidence({ project }: { project: Project }) {
  const rows = buildRows(project);
  if (rows.length === 0) return null;

  return (
    <section className="project-evidence" aria-label="Project evidence">
      <div className="grid-row">
        <div className="grid-col-full">
          <MonoLabel className="project-section-label">Evidence</MonoLabel>
        </div>
      </div>
      <div className="evidence-list">
        {rows.map((row) => (
          <div key={row.label} className="evidence-row">
            <MonoLabel className="evidence-row-label">{row.label}</MonoLabel>
            {row.href ? (
              <a
                href={row.href}
                target={row.href.startsWith("http") ? "_blank" : undefined}
                rel={row.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="evidence-row-value evidence-row-link"
              >
                {row.value}<span aria-hidden="true"> ↗</span>
              </a>
            ) : (
              <span className="evidence-row-value">{row.value}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
