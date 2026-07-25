import dynamic from "next/dynamic";
import type { Project } from "@/content/projects";
import MonoLabel from "@/components/ui/MonoLabel";

const DecisionTrace = dynamic(() => import("@/components/home/DecisionTrace"));
type SystemMapProps = { project: Project };

export default function SystemMap({ project }: SystemMapProps) {
  return (
    <section className="system-map">
      <div className="grid-row"><div className="grid-col-8"><MonoLabel className="project-section-label">My contribution</MonoLabel><p className="project-body-text">{project.systemDecision}</p></div></div>
      {project.trace.length > 0 && <div className="grid-row"><div className="grid-col-full"><DecisionTrace items={project.trace} label={`${project.title} — What I worked on`} /></div></div>}
    </section>
  );
}
