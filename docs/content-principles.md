# Content Principles — Muhammad Iyad

## Editorial Voice

The portfolio speaks in the first person, but without autobiography. The subject is the work and the thinking behind it, not the person.

Voice principles:
- Clear, direct, quiet. No marketing superlatives.
- Sentences are short. Paragraphs are short.
- Technical precision is expected. Jargon is explained when necessary, never flaunted.
- The tone is that of an engineer documenting a system for another engineer: precise, honest, structured.
- No calls to action like "Get in touch" or "Let's work together." The contact section is an availability statement, not a pitch.

---

## Positioning Line

**“I engineer thoughtful systems.”**

This line is not a tagline. It is the thesis statement of the entire portfolio. Every piece of content — project copy, about statement, discipline list — must be consistent with this positioning.

The site does not say "I build apps" or "I create experiences." It says "I engineer thoughtful systems." The word "engineer" here means: design under constraint, make trade-offs visible, document decisions, ship with clarity.

---

## Project Storytelling Structure

Every project follows a fixed editorial sequence. This is not a template — it is a narrative discipline. The sequence forces the visitor to understand context before solution, and solution before outcome.

### Sequence

1. **Title / Role / Year** — What the project is, what role I played, when it was built.
2. **Proposition** — One to three sentences describing what the system is and who it serves. No superlatives. No “revolutionary.” Just the facts of the system.
3. **Problem** — The concrete constraint or gap that motivated the project. This must be specific to the context (a campus, a usability score, an organisational workflow), not a generic industry problem.
4. **Approach** — How I structured the work. This covers methodology, tools chosen, and design approach. It answers “why this way?”
5. **Key Decisions** — 3–4 specific engineering or product decisions with rationale. This is the core of the portfolio — it proves engineering thinking. Each decision must state what was chosen and why.
6. **Features** — A breakdown of the system's capabilities. Each feature is described in one line: what it does and how it works at a high level.
7. **Technologies** — A flat list of tools, frameworks, and platforms. Mono type. No logos.
8. **Outcome / What Was Learned** — What the project produced and what I learned from building it. Honest reflection, not self-promotion. If usability testing revealed a weakness (e.g., consistency in SEE-HEART), that is included.

### Rules

- No invented metrics, testimonials, or awards.
- No “increased efficiency by X%” without a source.
- No client logos or brand names beyond the project itself.
- No peer comparisons. The project stands on its own description.
- Every feature must be a verifiable capability of the system, not a design intention.

---

## About Section

The about section is titled **“Built with both sides of the brain.”**

Content:
- A one-sentence statement of philosophy: “I like turning messy ideas into useful, considered digital products.”
- A discipline list: Software Engineering, Product Thinking, Interface Design, Motion and Prototyping.
- A timeline of educational and professional progression. Each entry is a year and a fact. No embellishment.
- Work experience entries outside of engineering (e.g., Starbucks, Shopper Warehouse) are listed without apology. They provide context without being framed as “humble beginnings” stories.

No résumé-style bullet points. No skills heatmaps. No “languages: English, Malay” sections unless explicitly part of the professional context.

---

## Contact Section

The contact section is titled **“Let's make something useful.”**

Content:
- A one-sentence availability statement.
- Four links: Email, GitHub, LinkedIn, Résumé.
- No contact form unless it is genuinely functional and tested.
- URLs use obvious placeholders (`hello@example.com`, `github.com/USERNAME`, etc.) that are trivially replaceable.
- The section is quiet and spacious. Large type, lots of cream space.

---

## Metadata Rules

- Page title format: `Project Name — Muhammad Iyad — Selected Digital Work`
- Description: One sentence describing the project. No more than 160 characters.
- Open Graph: Title, description, URL, site name. No og:image unless a real image is provided.
- Robots: Allow indexing of the home page. Disallow indexing of project detail pages if they are intended as gated content. (Current setting: allow `/`, disallow `/projects/`.)

---

## Placeholder Management

All placeholder content is marked with obvious dummy values:

| Field | Placeholder |
|---|---|
| Site URL | `https://iyad.dev` |
| OG image | `/og.jpg` |
| Email | `hello@example.com` |
| GitHub | `https://github.com/USERNAME` |
| LinkedIn | `https://linkedin.com/in/USERNAME` |
| Résumé | `/resume.pdf` |

These are defined in two locations: `src/lib/projectData.ts` for site metadata and `src/components/ContactSection.tsx` for contact links. Both locations are small and obvious.

---

## Forbidden Content Patterns

- No “About Me” as a heading. The section is titled by its thesis.
- No personal pronouns as section headers (“My Work”, “My Skills”).
- No list of programming languages or frameworks as a primary section.
- No timeline that extends before professional/adult context without relevance.
- No generic quotes from others.
- No emoji in content.
- No exclamation marks in headings.
- No questions in headings.
- No statistics presented without methodology.
