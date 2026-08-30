---
category: development-philosophy
tags: [problem-solving, ai-coding, frontend-architecture, testing, tech-debt]
---

# Development Philosophy

## How do you approach a new problem?
Iyad doesn't treat architecture as a collection of religious rules around Server Components, global state or reusability. The starting point is: **What does this page actually need?** Then choose the simplest architecture that solves it while leaving reasonable room to grow.

He usually starts with an obsession — references, colours, typography, interactions, anything that helps answer: **What should this feel like? What is the one idea here?** Then he makes something rough, stares at it, realises what's wrong, experiments, refines, builds the real thing, obsesses over tiny details, removes things that don't belong.

The upfront thinking still matters: establishing a visual language — typography, colour, layout, interaction principles, the general feeling of the experience. But he doesn't want to lock every decision before the project has had a chance to breathe.

## How do you use AI when coding?
Iyad doesn't think of AI as something that writes his code for him. A more accurate mental model is: **a ridiculously fast junior engineer who is available at 3am and occasionally says something stupid with complete confidence.**

The idea still comes from him. He decides: what to build, what the user experience should be, what stack makes sense, what trade-offs matter, what the final result should feel like. AI is then used to accelerate the process.

Early in a project, prompts can be broad: **"What's the cleanest way to approach this?"** He might ask AI to break down a problem, compare approaches, explore an unfamiliar technology, generate boilerplate or implement a small part. As the project becomes more defined, prompts become more specific. He gives the AI more context about the project structure, constraints and things that must not change.

When AI misunderstands something, he doesn't just accept the result. He explains what it got wrong and pushes it toward the actual requirement. It becomes less like **prompt → answer** and more like a conversation or argument about the implementation.

For debugging, useful context matters: the error, relevant code, expected behaviour, environment, versions, what has already been tried. He wants AI to investigate the problem rather than throw random fixes at it. If the fix works, he still wants to understand why. He doesn't want to accumulate magic spells that happen to make the error disappear.

Testing fits into the same workflow. For important behaviour, AI can help generate tests, think of edge cases and explain failures. For a tiny visual experiment where the behaviour itself isn't settled yet, he doesn't force a testing ceremony before the idea has even proven itself.

There are also situations where he deliberately doesn't use AI: if he's trying to learn something properly, sometimes the point is to struggle with it himself first. And if a simple problem has become more complicated because AI keeps suggesting increasingly elaborate solutions, that's usually the signal to stop listening and just write the fucking thing.

**Mental model: I own the decisions. AI accelerates execution.**
AI can suggest architecture → Iyad chooses it. AI can write a component → Iyad decides whether the component should even exist. AI can find a bug → Iyad wants to understand it. AI can give ten ideas → Iyad chooses which one is actually his. The goal isn't to prove that he can code without AI. It's to become better at deciding **what should be coded in the first place.**

## Frontend Architecture Views
Iyad doesn't treat architecture as a collection of religious rules. The starting point is: **What does this page actually need?**

### Server vs Client Components
The rough line is around behaviour. If something mainly renders data and doesn't need browser APIs, interaction, client-side state or animation, it can usually stay on the server. If it needs useState, useEffect, event handlers, browser APIs, GSAP, interactive behaviour → client. He doesn't like putting "use client" on an entire page just because one button needs interaction. Instead, push the interactive part down into a smaller client component where possible.

### State Management
No global state just because a state management library exists. If state belongs to one component, keep it there. If a few nearby components need it, lift it. If something genuinely needs to be shared across the application, use an appropriate shared-state solution. URL state is particularly useful for filters, searches and things that should be shareable or survive a refresh. The URL can be the source of truth instead of creating another client state system to duplicate it. Server state and client state are different things — he tries to avoid fetching server data and copying it into client state simply to keep the two synchronised forever.

### Data Fetching
With frameworks such as Next.js, data should generally be fetched as close as practical to where it is needed. Server-side fetching for data needed to render a page that doesn't need to be manipulated interactively in the browser. Client-side fetching for live updates, user-driven requests, highly interactive interfaces. The goal isn't one universal pattern — it's to avoid unnecessary waterfalls, duplicated fetching and complicated data flows.

### Composition vs Abstraction
Generally prefers composition when it keeps the page understandable. A few clear components are usually better than one mega-component with seventeen props and a giant configuration object. Extraction is contextual: once → leave alone. Twice with same concept → maybe extract. Repeated across places with own behaviour → deserves component. But duplication doesn't automatically mean two things are conceptually the same. Similar markup can represent completely different ideas.

**Rule: Abstract when the abstraction makes the code easier to understand, not simply because it makes the code shorter.** A little duplication is often better than a complicated abstraction built around a pattern that hasn't actually emerged yet.

## Testing Philosophy
Iyad doesn't chase a coverage number just because 80% or 90% looks good on a dashboard. A test is useful when it protects something he actually cares about: pricing, authentication, permissions, data transformation, important business logic, important user flows.

**Rough division:** Unit tests for predictable logic. Integration tests for components, APIs, forms and data working together. E2E tests for important user behaviour: logging in, submitting something, completing a main flow — where a regression would actually hurt. Priority is important behaviour, not making every line executable.

**Behaviour over implementation:** Tests should care about what the user or system can actually do rather than how the implementation happens to be structured. If a component gets renamed or state moves but behaviour hasn't changed, the test shouldn't explode. If the user can still do the thing, the test shouldn't care that internal structure looks different.

**Test-first vs test-after:** Not religious. If behaviour is well understood (logic-heavy), test-first forces expected behaviour to become explicit. If experimenting with a visual interaction and behaviour isn't settled, build first, figure out behaviour, then lock down with tests.

**AI and testing:** AI useful for edge cases, first pass of tests, explaining failures, suggesting missed scenarios. But AI can produce thirty tests that look impressive and protect nothing important. Those don't deserve to stay. **Rule: Test what you'd be genuinely pissed about if it silently broke.** Tests exist so future-you can change code without being terrified.

## Technical Debt Approach
Iyad sits between **"Ship the fucking thing."** and **"Don't leave a mess for future-you."** He doesn't believe every piece of code needs to be perfect on the first attempt, especially when the bigger question is whether the idea itself is worth keeping.

During experimentation, he's comfortable knowingly taking on some debt: duplicating temporarily, leaving a component slightly messy, avoiding an abstraction, choosing a simpler implementation, delaying a refactor until the pattern is clearer. If the idea might get deleted tomorrow, spending huge time designing perfect architecture today is a bad trade.

The important distinction is **knowing that it's debt**. "I'll clean it later" becomes dangerous when nobody remembers later.

The signal to refactor: when debt starts slowing development or making code harder to reason about — copying logic everywhere, fighting a component every time something changes, tiny feature requiring changes across ten unrelated files, nobody understanding why a weird workaround exists. At that point, the debt isn't helping speed anymore — it's charging interest.

**CODEP-PULSE example:** Many interacting pieces (marketplace, delivery, verification, pricing, disputes, location). Could keep patching → pile of exceptions. Some parts deserved deliberate architectural thinking because they interact. Not every corner needed perfect engineering before product direction was proven.

**Debt as trade:** Not automatically bad. Deliberate debt = reasonable trade for learning/moving fast. Accidental debt = system becomes weird and nobody remembers why.

**Core rule: Explore quickly → prove the idea → identify what survived → make the surviving parts solid.** Final product well-engineered, but "clean code" shouldn't become an excuse for never actually building anything.

## Choosing Libraries vs Building
Not "libraries bad, custom good." The question: **If I'm buying this, what exactly am I getting, and what am I giving up?**

Dependency criteria: complexity removed, control taken away, maturity, maintenance, stack compatibility, bundle impact, whether it will still make sense later. Not a dependency just because everyone on Twitter uses it.

**shadcn vs MUI:** Prefers shadcn/ui — solid starting point while owning components and styling. MUI powerful but feels like adopting someone else's visual language and fighting it back.

**Tailwind UI vs Custom CSS:** Tailwind for speed/consistency. For art-directed work: don't want implementation to dictate design. CSS Modules or plain CSS = cleaner mental model, project-specific styling without giant utility strings.

**When to build:** Standard UI (dropdown) → library. Custom interaction, animation system, visual effect, project-specific behaviour not behaving like standard pattern → build properly. Don't force generic library to pretend.

**Core rule: Buy the boring, proven stuff. Build the stuff that gives the product its identity.** No bonus points for own date picker. Custom interaction that makes someone remember the site → spend engineering effort there.

## TypeScript Strictness
Strongly TypeScript-first, strict mode on. `any` = justify it, not casual reach. Unknown + narrow > `any`. Exceptions: badly typed third-party, temporary experiments — but don't let `any` spread like mould.

**Type-driven development:** When domain complicated (roles, order states, API responses, DB models, business rules) → define shapes early clarifies architecture. Forces "what is this supposed to be?" before throwing objects.

**Generics:** When genuinely describe reusable relationship or make API safer. Not when `T extends U extends V` needs a diagram to understand.

**Inference vs explicit:** Let TS infer obvious (`const username = "Iyad"`). Explicit at boundaries: function params, public APIs, returned data, domain models, complex objects, external systems.

**Core rule: Let TypeScript infer the obvious. Be explicit where the type carries meaning. Don't use `any` to hide a problem. Don't use generics to show off.** Type system should make code easier to reason about, not another thing to fight.

## Performance Mindset
**Make it right first. Make it fast when there's a reason.** Not 3 hours shaving milliseconds nobody experiences. Not "performance later" when architecture creates unnecessary work. Performance starts with **shape of the application**, not last-minute optimisation.

If something can reasonably stay on the server, don't send it to the client. If an image is unnecessarily massive, fix it before Lighthouse yells. If a dependency is huge and unnecessary, don't add it for convenience.

**Core Web Vitals:** Aware of LCP, INP, CLS — cares for sites where experience is the product. But 100 Lighthouse score means little if site feels boring, slow to interact, or compromised visually for a metric. Goal: visually ambitious site that loads quickly, responds properly, doesn't jump around.

**Bundle size & runtime:** Creative sites get heavy fast (GSAP, Three.js, WebGL, large images, custom interactions = more ways to fuck up). Be deliberate: what needs client, lazy-load expensive, optimise assets, avoid unnecessary re-renders, keep dependencies reasonable, let server rendering do useful work. Won't replace reasonable 15KB utility to brag about saving bytes, but won't ship huge library for something simple.

**ALDER ROASTERS:** Visual experience = premium. User shouldn't stare at blank screen while JS loads. Important content on screen quickly, progressively introduce expensive visual elements.

**CODEP-PULSE:** Architectural performance. Marketplace data, users, delivery, location → avoid repeatedly fetching what doesn't need fetching, sensible server/client, caching where data allows. Not "production apps use caching" — add when understand what's expensive, how often changes, who needs it.

**Core rule: Don't optimise imaginary problems. Don't ignore obvious ones. Measure when it matters. Performance = part of design.** If interaction lags, animation stutters, layout jumps, page slow → user experiences that regardless of beautiful design.

## Documentation & Knowledge Transfer
Not "npm install + 400 words corporate bullshit." Docs exist because someone genuinely needs info — otherwise just another ignored file.

**Audience:** Future me + whoever touches project later. Future Iyad forgets why weird architectural decision 6 months later.

**What to document:** Not obvious from code: why approach chosen, important constraints, how pieces connect, non-standard setup, deployment details, decisions that might look strange, things someone might "clean up" without understanding why.

**Case studies:** For projects where design decisions matter — show thinking: problem, exploration, rejections, why final direction, trade-offs, what would change. Not to make every project sound like startup success. To show how thinking developed.

**Code comments:** Comment the **why**, not the **what**. `// filter users by active status` = useless. Strange browser workaround, framework limitation, deliberate architecture decision = useful.

**ADRs:** For decisions important enough future-you might reopen debate. Not every component. "Keeping data server-side because X" or "Choosing architecture because Y" — worth recording if changing later would be expensive/confusing.

**Keeping honest:** Biggest problem = docs describing architecture code stopped following 3 months ago. Short accurate README + few useful decisions > 50 pages nobody trusts. Keep docs close to work — update relevant doc when decision changes, not giant cleanup day.

**Core rule: Code explains what. Documentation explains why. Case studies explain how I think.** If obvious from code → don't write twice. If understanding code requires knowledge not in code → document it.

## Unlearning
Biggest change: used to associate **more architecture with better engineering**. Now suspicious of complexity that hasn't been earned.

Used to reach for client-side everything: fetch data, put in state, pass around, component handles everything. Next.js changed that: **"Why does this actually need to be on the client?"** If server can fetch/render, don't ship extra JS to feel "sophisticated."

Moved away from abstracting too early. Previously: repeated code → "component." Now: wait until understand pattern. Three things can look similar with different responsibilities. Little duplication > Frankenstein component with 14 props for DRY enlightenment.

**Context / Global State:** Not evil, but more careful. If something belongs to one component, keep it there. If in URL, put in URL. If server data, don't duplicate into client state. Shared client state = genuinely shared, not because library installed.

**REST vs Server Actions:** Server Actions don't magically replace APIs. They solve certain problems nicely (mutations tightly connected to app). But if multiple clients, clear API boundary, needs to exist independently from frontend → proper API still makes sense. Question shifted from "which pattern is newer?" to **"what boundary actually exists here?"**

**"Best Practice":** Biggest unlearning = treating "best practice" as universal answer. Pattern can be genuinely good and still wrong for particular problem. When someone says "you should always do X" → instinct: **"Okay. Why?"** Not to be difficult — to understand reasoning well enough to recognise when conditions that made it useful no longer apply.

**Progression: Following patterns → understanding why patterns exist → deciding when they actually belong.**