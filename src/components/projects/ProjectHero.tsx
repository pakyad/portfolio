"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { Project } from "@/content/projects";
import MonoLabel from "@/components/ui/MonoLabel";
import ScreenshotFrame from "@/components/projects/ScreenshotFrame";
import ProjectTechStack from "@/components/projects/ProjectTechStack";

gsap.registerPlugin(useGSAP);

export default function ProjectHero({ project }: { project: Project }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!frontRef.current || !backRef.current) return;

    gsap.set(frontRef.current, { y: 0, rotate: 0 });
    gsap.set(backRef.current, { x: 0, y: 0, rotate: 0 });

    const tl = gsap.timeline({ paused: true })
      .to(frontRef.current, { y: -28, rotate: -3, duration: .45, ease: "power2.out" }, 0)
      .to(backRef.current, { x: 14, y: 6, rotate: 1.5, duration: .45, ease: "power2.out" }, 0);

    const reset = gsap.timeline()
      .to(frontRef.current, { y: 0, rotate: 0, duration: .5, ease: "expo.out" })
      .to(backRef.current, { x: 0, y: 0, rotate: 0, duration: .5, ease: "expo.out" }, 0);

    const stack = containerRef.current;
    if (!stack) return;

    stack.addEventListener("mouseenter", () => { tl.restart(); });
    stack.addEventListener("mouseleave", () => { reset.restart(); });

    stack.addEventListener("click", () => {
      gsap.timeline()
        .to(frontRef.current, { x: -40, rotationY: 15, duration: .25, ease: "power2.in" })
        .to(backRef.current, { y: -12, scale: 1.08, duration: .25, ease: "power2.in" }, 0)
        .to(frontRef.current, { x: 0, rotationY: 0, duration: .4, ease: "expo.out" })
        .to(backRef.current, { y: 0, scale: 1, duration: .4, ease: "expo.out" }, "-=.35");
    });

    const handleMove = (e: PointerEvent) => {
      const rect = stack.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      gsap.to(frontRef.current, { x: dx * 10, y: dy * 6, rotate: dx * 1.5, duration: .3, ease: "power1.out", overwrite: "auto" });
      gsap.to(backRef.current, { x: dx * 5, y: dy * 3, duration: .3, ease: "power1.out", overwrite: "auto" });
    };

    stack.addEventListener("pointermove", handleMove);

    return () => {
      stack.removeEventListener("mouseenter", () => { tl.restart(); });
      stack.removeEventListener("mouseleave", () => { reset.restart(); });
      stack.removeEventListener("pointermove", handleMove);
    };
  }, { scope: containerRef });

  return (
    <section className="project-hero">
      <div className="project-hero-poster">
        <div className="project-hero-copy">
          <h1 className="project-hero-title">{project.title}</h1>
          <p className="project-hero-subtitle">{project.thesis}</p>
          <div className="project-hero-meta"><MonoLabel className="project-hero-meta-label">Role</MonoLabel><p className="project-hero-meta-value">{project.role}</p></div>
          <ProjectTechStack project={project} />
        </div>
        <div ref={containerRef} className="poster-stack">
          {project.media.poster && (
            <div ref={frontRef} className="poster-stack-front">
              <ScreenshotFrame src={project.media.poster} alt={`${project.title} home screen`} caption={project.media.posterCaption ?? `${project.title} overview.`} className="screenshot-card-hero" priority />
            </div>
          )}
          {project.media.posterSecondary && (
            <div ref={backRef} className="poster-stack-back">
              <ScreenshotFrame src={project.media.posterSecondary} alt={`${project.title} marketplace`} caption={project.media.posterSecondaryCaption ?? `${project.title} marketplace.`} className="screenshot-card-hero" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}