"use client";

export type NavSection = { id: string; label: string };

export default function Navigation({ sections }: { sections: NavSection[] }) {
  return (
    <header className="site-navigation">
      <span data-hero-logo aria-label="Logo interaction">◎</span>
      <span>©2026</span>
      <nav aria-label="Page sections">
        {sections.map((section) => <a key={section.id} href={`#${section.id}`} data-sound="tick" data-magnetic="0.3">{section.label}</a>)}
      </nav>
    </header>
  );
}
