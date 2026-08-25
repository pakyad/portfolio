import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProject, caseStudies } from "@/content/projects";
import { site } from "@/content/site";
import ProjectHero from "@/components/projects/ProjectHero";
import ProjectEvidence from "@/components/projects/ProjectEvidence";
import ProjectBrief from "@/components/projects/ProjectBrief";
import ProjectScreenshot from "@/components/projects/ProjectScreenshot";
import ProjectDecisions from "@/components/projects/ProjectDecisions";
import ProjectBroke from "@/components/projects/ProjectBroke";
import ProjectOutcome from "@/components/projects/ProjectOutcome";
import ProjectNavigator from "@/components/projects/ProjectNavigator";
import ReadingProgress from "@/components/projects/ReadingProgress";
import ScrollReveal from "@/components/ScrollReveal";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || !caseStudies.some((p) => p.slug === slug)) return {};
  return {
    title: `${project.title} - ${site.title}`,
    description: project.thesis,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  if (!caseStudies.some((p) => p.slug === project.slug)) notFound();

  return (
    <article className="project-detail">
      <ReadingProgress />
      <ProjectHero project={project} />
      <ScrollReveal staggerDelay={100} distance={24}><ProjectEvidence project={project} /></ScrollReveal>
      <ScrollReveal staggerDelay={100} distance={24}><ProjectBrief project={project} /></ScrollReveal>
      <ScrollReveal staggerDelay={120} distance={32}><ProjectScreenshot project={project} variant="feature" /></ScrollReveal>
      <ScrollReveal staggerDelay={120} distance={32}><ProjectScreenshot project={project} variant="supporting" /></ScrollReveal>
      <ScrollReveal staggerDelay={100} distance={24}><ProjectDecisions project={project} /></ScrollReveal>
      <ScrollReveal staggerDelay={100} distance={24}><ProjectBroke project={project} /></ScrollReveal>
      <ScrollReveal staggerDelay={100} distance={24}><ProjectOutcome project={project} /></ScrollReveal>
      <ProjectNavigator project={project} />
    </article>
  );
}
