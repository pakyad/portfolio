import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Contact - ${site.title}`,
  description: "Get in touch with Muhammad Iyad Iman Mohmad Nazri.",
};

const links = [
  { label: "Email", href: `mailto:${site.email}`, value: site.email },
  { label: "GitHub", href: site.social.github, value: "github.com/pakyad" },
  { label: "WhatsApp", href: "https://wa.link/6hec7n", value: "+60 1x-xxx 893" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/iyadiman", value: "linkedin.com/in/iyadiman" },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-cream px-6 py-24 md:py-32">
      <div className="max-w-[640px] mx-auto">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted mb-4">Contact</p>
        <h1 className="font-sans font-light text-[clamp(2rem,5vw,3rem)] tracking-[-0.02em] text-ink mb-4">Get in touch.</h1>
        <p className="font-sans text-sm text-muted leading-relaxed mb-10 max-w-md">
          If you would like to discuss a project, feel free to get in touch.
        </p>
        <ul className="space-y-4">
          {links.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="inline-flex items-center gap-3 py-1 font-sans text-sm text-ink/70 hover:text-violet transition-colors duration-200" target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}>
                <span className="font-mono text-[11px] uppercase tracking-widest text-muted w-16 shrink-0">{link.label}</span>
                <span className="h-px w-6 bg-rule/60" />
                {link.value}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
