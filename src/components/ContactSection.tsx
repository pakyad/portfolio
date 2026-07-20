"use client";

import Link from "next/link";

const links = [
  {
    label: "Email",
    href: "mailto:hello@example.com",
    value: "hello@example.com",
  },
  {
    label: "GitHub",
    href: "https://github.com/USERNAME",
    value: "github.com/USERNAME",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/USERNAME",
    value: "linkedin.com/in/USERNAME",
  },
  {
    label: "Résumé",
    href: "/resume.pdf",
    value: "resume.pdf",
  },
];

export default function ContactSection() {
  return (
    <section
      id="section-contact"
      className="section-panel relative bg-cream"
      aria-label="Contact"
    >
      <div className="relative z-10 w-full h-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 w-full items-center">
          <div className="lg:col-span-3">
            <p className="font-mono text-[11px] md:text-xs uppercase tracking-[0.2em] text-muted mb-6">
              Contact
            </p>
            <h2 className="font-sans font-light text-[clamp(2rem,5vw,3.5rem)] tracking-[-0.02em] text-ink mb-6 leading-[1.1]">
              Let&apos;s make something useful.
            </h2>
            <p className="font-sans text-[clamp(0.95rem,1.2vw,1.1rem)] text-muted leading-relaxed mb-10 max-w-lg">
              Available for thoughtful digital products, creative development, and
              collaborative experiments.
            </p>
            <ul className="space-y-4">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-3 py-1"
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    <span className="font-mono text-[11px] uppercase tracking-widest text-muted w-16 shrink-0">
                      {link.label}
                    </span>
                    <span className="h-px w-6 bg-rule/60 group-hover:w-10 transition-all duration-300" />
                    <span className="font-sans text-sm text-ink/70 group-hover:text-violet transition-colors duration-200">
                      {link.value}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Violet line system accent */}
          <div className="lg:col-span-2 hidden lg:flex items-center justify-center">
            <div className="relative w-32 h-48" aria-hidden="true">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-px h-8 bg-violet/30 rounded-full"
                    style={{
                      transform: `rotate(${i * 18 - 27}deg)`,
                      opacity: 1 - i * 0.15,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
