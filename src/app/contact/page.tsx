import type { Metadata } from "next";
import { site, STATUS } from "@/content/site";

export const metadata: Metadata = {
  title: `Contact - ${site.title}`,
  description: "Get in touch with Muhammad Iyad Iman Mohmad Nazri.",
};

const primary = [
  { label: "Email", href: `mailto:${site.email}` },
  { label: "GitHub", href: site.social.github },
  { label: "LinkedIn", href: site.social.linkedin },
];

export default function ContactPage() {
  return (
    <main className="contact-page">
      <div className="contact-page-inner">
        <p className="contact-page-eyebrow">Contact</p>
        <h1 className="contact-page-title">Get in touch.</h1>
        <p className="contact-page-desc">
          Internship enquiries welcome. {STATUS}. Email is fastest &mdash; code lives on GitHub.
        </p>
        <div className="contact-links">
          {primary.map((link) => (
            <a key={link.label} href={link.href} className="contact-link" target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}>
              <span className="contact-arrow">&#8599;&#xFE0E;</span><span className="contact-label">({link.label})</span>
            </a>
          ))}
          <a href={site.social.whatsapp} className="contact-link contact-link--secondary" target="_blank" rel="noopener noreferrer">
            <span className="contact-arrow">&#8599;&#xFE0E;</span><span className="contact-label">(WhatsApp)</span>
          </a>
        </div>
      </div>
    </main>
  );
}
