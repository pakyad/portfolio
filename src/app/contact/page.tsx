import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Contact — ${site.title}`,
  description: "Get in touch with Muhammad Iyad Iman.",
};

const links = [
  { label: "Email", href: `mailto:${site.email}`, value: site.email },
  { label: "GitHub", href: site.social.github, value: "github.com/USERNAME" },
  { label: "LinkedIn", href: site.social.linkedin, value: "linkedin.com/in/USERNAME" },
  { label: "Résumé", href: site.social.resume, value: "resume.pdf" },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#F7F5F0] px-6 py-24 md:py-32">
      <div className="max-w-[640px] mx-auto">
        <p className="font-mono text-[11px] uppercase tracking-widest text-[#6C6A65] mb-4">
          Contact
        </p>
        <h1 className="font-sans font-light text-[clamp(2rem,5vw,3rem)] tracking-[-0.02em] text-[#151515] mb-4">
          Let&apos;s make something useful.
        </h1>
        <p className="font-sans text-sm text-[#6C6A65] leading-relaxed mb-10 max-w-md">
          Available for thoughtful digital products, creative development, and
          collaborative experiments.
        </p>
        <ul className="space-y-4">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="inline-flex items-center gap-3 py-1 font-sans text-sm text-[#151515]/70 hover:text-[#7457E8] transition-colors duration-200"
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#6C6A65] w-16 shrink-0">
                  {link.label}
                </span>
                <span className="h-px w-6 bg-[#D8D4CC]/60" />
                {link.value}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
