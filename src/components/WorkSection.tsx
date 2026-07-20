"use client";

import Link from "next/link";
import { useState } from "react";
import dynamic from "next/dynamic";
import { projects } from "@/lib/projectData";

const ChromeCanvas = dynamic(() => import("@/components/ChromeCanvas"), { ssr: false });

const projectShapes: Record<string, "icosahedron" | "torus" | "octahedron"> = {
  "codep-pulse": "icosahedron",
  "see-heart": "torus",
  "volunteer-management": "octahedron",
};

export default function WorkSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="section-work"
      className="section-panel relative bg-cream"
      aria-label="Selected work"
    >
      <div className="relative z-10 w-full h-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col justify-center">
        <h2 className="font-sans font-light text-[clamp(1.8rem,4vw,2.8rem)] tracking-[-0.02em] text-ink mb-8 md:mb-12">
          Selected work.
        </h2>

        <div className="flex-1 flex flex-col justify-center -my-2 md:-my-4">
          {projects.map((project, i) => {
            const isActive = activeIndex === i;
            return (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className={`group block border-t border-rule/50 last:border-b last:border-rule/50 transition-all duration-500 ${
                  isActive ? "opacity-100" : "opacity-40 hover:opacity-70"
                }`}
                onMouseEnter={() => setActiveIndex(i)}
                onFocus={() => setActiveIndex(i)}
                aria-label={`View project: ${project.title}`}
              >
                <div className={`py-4 md:py-6 lg:py-8 flex items-center gap-4 md:gap-8 transition-all duration-500 ${isActive ? "translate-x-1" : ""}`}>
                  <span
                    className={`font-mono text-[10px] md:text-[11px] tracking-wider shrink-0 transition-colors duration-300 ${
                      isActive ? "text-violet" : "text-muted"
                    }`}
                  >
                    {project.number}
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <h3
                        className={`font-sans text-[clamp(1.1rem,2.2vw,1.75rem)] font-medium tracking-[-0.01em] transition-all duration-300 ${
                          isActive ? "text-ink" : "text-ink/70"
                        }`}
                      >
                        {project.title}
                      </h3>
                      <span className="font-mono text-[10px] md:text-[11px] text-muted hidden sm:inline">
                        {project.year}
                      </span>
                      <span className="font-mono text-[10px] md:text-[11px] text-muted/60 hidden md:inline">
                        {project.role}
                      </span>
                    </div>
                    <p className="font-sans text-xs md:text-sm text-muted/70 mt-0.5 max-w-lg">
                      {project.description}
                    </p>
                  </div>

                  <div className="hidden md:block relative w-16 h-16 lg:w-20 lg:h-20 shrink-0">
                    <div
                      className={`absolute inset-0 transition-all duration-500 ${
                        isActive ? "opacity-100 scale-100" : "opacity-0 scale-75"
                      }`}
                    >
                      <ChromeCanvas
                        shape={projectShapes[project.id] || "icosahedron"}
                      />
                    </div>
                  </div>

                  <span
                    className={`font-mono text-[10px] uppercase tracking-widest shrink-0 transition-all duration-300 ${
                      isActive
                        ? "text-violet opacity-100"
                        : "text-muted/0 opacity-0"
                    }`}
                  >
                    View
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-rule/50" />
    </section>
  );
}
