import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProject, projects } from "@/content/projects";
import { site } from "@/content/site";
import ProjectHero from "@/components/projects/ProjectHero";
import ProjectScreenshot from "@/components/projects/ProjectScreenshot";
import ProjectOutcome from "@/components/projects/ProjectOutcome";
import ProjectNavigator from "@/components/projects/ProjectNavigator";
import ReadingProgress from "@/components/projects/ReadingProgress";
import ScrollReveal from "@/components/ScrollReveal";

interface Props {
  params: Promise<{ slug: string }>;
}

const publishedProjects = projects.filter((p) => p.slug !== "codedulu" && p.slug !== "soon");

export async function generateStaticParams() {
  return publishedProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} - ${site.title}`,
    description: project.thesis,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  if (project.slug === "codedulu" || project.slug === "soon") notFound();

  return (
    <article className="project-detail">
      <ReadingProgress />
      <ProjectHero project={project} />
      <ScrollReveal staggerDelay={120} distance={32}><ProjectScreenshot project={project} variant="feature" /></ScrollReveal>

      <ScrollReveal staggerDelay={120} distance={32}><ProjectScreenshot project={project} variant="supporting" /></ScrollReveal>
      <ScrollReveal staggerDelay={100} distance={24}><ProjectOutcome project={project} /></ScrollReveal>
      <ProjectNavigator project={project} />
    </article>
  );
}
