"use client";

import Link from "next/link";

export type NavSection = { href: string; label: string };

const SECTIONS = [
  { href: "/#work", label: "(WRK)" },
  { href: "/#about", label: "(WHO)" },
  { href: "/#contact", label: "(MSG)" },
];

export default function Navigation() {
  return (
    <header className="site-navigation">
      <span data-hero-logo aria-label="Logo interaction">◎</span>
      <span>©2026</span>
      <nav aria-label="Page sections">
        {SECTIONS.map((section) => <Link key={section.href} href={section.href}>{section.label}</Link>)}
      </nav>
    </header>
  );
}
