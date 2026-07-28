import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Contact - ${site.title}`,
  description: "Get in touch with Muhammad Iyad Iman Mohmad Nazri.",
};

const links = [
  { label: "Email", href: `mailto:${site.email}` },
  { label: "WhatsApp", href: "https://wa.link/6hec7n" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/iyadiman" },
];

export default function ContactPage() {
  return (
    <main className="contact-page">
      <div className="contact-page-inner">
        <p className="contact-page-eyebrow">Contact</p>
        <h1 className="contact-page-title">Get in touch.</h1>
        <p className="contact-page-desc">If you would like to discuss a project, feel free to get in touch.</p>
        <div className="contact-links">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="contact-link" target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}>
              <span className="contact-arrow">↗</span><span className="contact-label">({link.label})</span>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
