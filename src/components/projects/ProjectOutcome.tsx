import type { Project } from "@/content/projects";

const SECTION_MARKERS = ["Foundation", "System", "Problems solved"];

function parseOutcome(text: string) {
  const parts: { label: string; body: string }[] = [];
  const remaining = text;

  for (let i = 0; i < SECTION_MARKERS.length; i++) {
    const marker = SECTION_MARKERS[i] + " — ";
    const idx = remaining.indexOf(marker);
    if (idx === -1) continue;
    const afterMarker = idx + marker.length;
    const nextMarker = SECTION_MARKERS[i + 1]
      ? remaining.indexOf(SECTION_MARKERS[i + 1] + " — ")
      : -1;
    const body =
      nextMarker === -1
        ? remaining.slice(afterMarker).trim()
        : remaining.slice(afterMarker, nextMarker).trim();
    parts.push({ label: SECTION_MARKERS[i], body });
  }

  if (parts.length === 0) {
    return text
      .split(".")
      .filter((s) => s.trim().length > 0)
      .map((s) => s.trim() + ".")
      .map((s) => ({ label: "", body: s }));
  }

  return parts;
}

export default function ProjectOutcome({ project }: { project: Project }) {
  if (!project.outcome) return null;

  const sections = parseOutcome(project.outcome);

  return (
    <section className="project-outcome">
      <div className="grid-row">
        <div className="grid-col-full">
          <p className="project-section-label">What I learned</p>
        </div>
      </div>
      <div className="outcome-grid">
        {sections.map((section, i) => (
          <div key={i} className="outcome-card">
            <span className="outcome-card-marker">{'//'}</span>
            <h3 className="outcome-card-label">{section.label}</h3>
            <p className="outcome-card-body">{section.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}