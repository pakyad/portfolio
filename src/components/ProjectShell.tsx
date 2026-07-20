"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { projects } from "@/lib/projectData";

interface ProjectShellProps {
  slug: string;
}

export default function ProjectShell({ slug }: ProjectShellProps) {
  const project = projects.find((p) => p.slug === slug);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const targets = el.querySelectorAll(".animate-in");
      if (!targets.length) return;
      gsap.fromTo(
        targets,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }
      );
    });
    return () => ctx.revert();
  }, []);

  if (!project) return null;

  return (
    <main ref={rootRef} className="min-h-screen bg-cream">
      <div className="max-w-[720px] mx-auto px-6 py-16 md:py-24">
        <Link
          href="/"
          className="animate-in group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted hover:text-violet transition-colors duration-200 mb-12 md:mb-16"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="group-hover:-translate-x-0.5 transition-transform duration-200">
            <path d="M7 2L3 6L7 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to selected work
        </Link>

        <div className="animate-in mb-10 md:mb-14">
          <span className="font-mono text-[11px] text-violet uppercase tracking-widest">
            {project.number} / {project.year}
          </span>
          <h1 className="font-sans font-light text-[clamp(2rem,5vw,3.5rem)] tracking-[-0.02em] text-ink mt-2 mb-2">
            {project.title}
          </h1>
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
            {project.role}
          </p>
        </div>

        <div className="animate-in space-y-10 md:space-y-14">
          <Section label="Proposition">{project.proposition}</Section>
          <Section label="Problem">{project.problem}</Section>
          <Section label="Approach">{project.approach}</Section>

          <Section label="Key decisions">
            <ul className="space-y-3">
              {project.decisions.map((d, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-violet mt-1.5 shrink-0">
                    <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor">
                      <circle cx="3" cy="3" r="3" />
                    </svg>
                  </span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section label="Features">
            <ul className="space-y-3">
              {project.features.map((f, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-violet mt-1.5 shrink-0">
                    <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor">
                      <circle cx="3" cy="3" r="3" />
                    </svg>
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section label="Technologies">
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span key={t} className="font-mono text-[11px] px-3 py-1.5 bg-paper text-muted rounded-sm">
                  {t}
                </span>
              ))}
            </div>
          </Section>

          <Section label="Outcome">{project.outcome}</Section>
        </div>

        <div className="animate-in mt-16 pt-8 border-t border-rule/60">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-violet hover:text-ink transition-colors duration-200"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="group-hover:-translate-x-0.5 transition-transform duration-200">
              <path d="M7 2L3 6L7 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Return to selected work
          </Link>
        </div>
      </div>
    </main>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-widest text-violet mb-3">
        {label}
      </p>
      <div className="font-sans text-[0.95rem] leading-[1.7] text-ink/80 space-y-2">
        {children}
      </div>
    </div>
  );
}
