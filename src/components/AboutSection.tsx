"use client";

export default function AboutSection() {
  return (
    <section
      id="section-about"
      className="section-panel relative bg-cream"
      aria-label="About"
    >
      <div className="relative z-10 w-full h-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 w-full">
          {/* Left: title + statement */}
          <div className="lg:col-span-5">
            <h2 className="font-sans font-light text-[clamp(1.8rem,4vw,2.8rem)] tracking-[-0.02em] text-ink mb-6 leading-[1.1]">
              Built with both sides
              <br />
              of the brain.
            </h2>
            <p className="font-sans text-[clamp(0.95rem,1.2vw,1.1rem)] text-muted leading-relaxed max-w-md">
              I like turning messy ideas into useful, considered digital products.
            </p>
          </div>

          {/* Right: disciplines + timeline + experience */}
          <div className="lg:col-span-7 space-y-10">
            {/* Disciplines */}
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-violet mb-3">
                Disciplines
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-1">
                {["Software Engineering", "Product Thinking", "Interface Design", "Motion and Prototyping"].map((d) => (
                  <span key={d} className="font-sans text-sm text-ink/80">
                    {d}
                  </span>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted mb-3">
                Timeline
              </p>
              <div className="space-y-3">
                {[
                  { year: "2022", text: "Accounting background, Kolej MARA Kuala Nerang" },
                  { year: "2023", text: "Started Software Engineering, Universiti Kuala Lumpur MIIT" },
                  { year: "2024", text: "Built practical academic systems" },
                  { year: "2025", text: "Expanded into full-stack projects" },
                  { year: "2026", text: "Built CODEP-PULSE and prepared for industry internship" },
                ].map((item) => (
                  <div key={item.year} className="flex gap-4 items-baseline">
                    <span className="font-mono text-[11px] text-violet shrink-0 w-10 tabular-nums">
                      {item.year}
                    </span>
                    <div className="h-px flex-1 bg-rule/40 hidden md:block" />
                    <span className="font-sans text-sm text-ink/80">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted mb-3">
                Experience
              </p>
              <div className="space-y-2">
                {[
                  { role: "Barista", org: "Starbucks" },
                  { role: "Sorter", org: "Shopper Warehouse" },
                ].map((item) => (
                  <div key={item.org} className="flex gap-4 items-baseline">
                    <span className="font-mono text-[11px] text-muted shrink-0 w-20">
                      {item.org}
                    </span>
                    <span className="font-sans text-sm text-ink/80">
                      {item.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-rule/50" />
    </section>
  );
}
