import type { Metadata } from "next";
import { site } from "@/content/site";
import { notes } from "@/content/notes";

export const metadata: Metadata = {
  title: `Notes — ${site.title}`,
  description: "Thinking out loud about systems, engineering, and building.",
};

export default function NotesPage() {
  return (
    <main className="min-h-screen bg-[#F7F5F0] px-6 py-24 md:py-32">
      <div className="max-w-[640px] mx-auto">
        <p className="font-mono text-[11px] uppercase tracking-widest text-[#7457E8] mb-4">
          Notes
        </p>
        <h1 className="font-sans font-light text-[clamp(2rem,5vw,3rem)] tracking-[-0.02em] text-[#151515] mb-12">
          Thinking out loud.
        </h1>
        <div className="space-y-10">
          {notes.map((note) => (
            <article key={note.slug}>
              <time className="font-mono text-[11px] text-[#6C6A65]">{note.date}</time>
              <h2 className="font-sans text-lg font-medium text-[#151515] mt-1 mb-2">
                {note.title}
              </h2>
              <p className="font-sans text-sm text-[#6C6A65] leading-relaxed">
                {note.summary}
              </p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
