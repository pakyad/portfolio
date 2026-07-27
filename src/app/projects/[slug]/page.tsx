import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProject, projects } from "@/content/projects";
import { site } from "@/content/site";
import ProjectHero from "@/components/projects/ProjectHero";
import ProjectThesis from "@/components/projects/ProjectThesis";
import ProjectScreenshot from "@/components/projects/ProjectScreenshot";
import ProjectNavigator from "@/components/projects/ProjectNavigator";
import ReadingProgress from "@/components/projects/ReadingProgress";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${site.title}`,
    description: project.thesis,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article className="project-detail">
      <ReadingProgress />
      <ProjectHero project={project} />
      <ProjectThesis project={project} variant="problem" />
      <ProjectThesis project={project} variant="overview" />
      <ProjectScreenshot project={project} variant="feature" />
      <ProjectScreenshot project={project} variant="supporting" />
      <ProjectNavigator project={project} />
    </article>
  );
}
