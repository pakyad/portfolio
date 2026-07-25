import Link from "next/link";
import type { Project } from "@/content/projects";
import MonoLabel from "@/components/ui/MonoLabel";

export default function ProjectHero({ project }: { project: Project }) {
  return (
    <section className="project-hero">
      <div className="grid-row"><div className="grid-col-full"><Link href="/#work" className="project-hero-back editorial-link typo-meta">&larr; Back to selected work</Link></div></div>
      <div className="grid-row"><div className="grid-col-full"><h1 className="project-hero-title typo-display">{project.title}</h1><p className="project-hero-subtitle">{project.thesis}</p></div></div>
      <div className="grid-row"><div className="grid-col-6"><div className="project-hero-meta"><div className="project-hero-meta-item"><MonoLabel className="project-hero-meta-label">Status</MonoLabel><p className="project-hero-meta-value">{project.role}</p></div></div></div></div>
    </section>
  );
}
