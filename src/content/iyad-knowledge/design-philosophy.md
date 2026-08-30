---
category: design-philosophy
tags: [good-design, visual-style, premium-feel, ai-design-critique, process]
---

# Design Philosophy

## What does "good design" mean to you?
Good design, to Iyad, is something he doesn't have to convince himself is good. It just **clicks**. It feels intentional, like someone actually cared about every part rather than throwing a collection of currently popular design patterns together.

The first question is personality: **Does this have an identity?** Does it feel like something that could only have been made for this project, or could you replace the logo and put it on another website tomorrow?

After that come the details: typography, spacing, composition, colour, imagery, movement, entry animations, click feedback, interaction. Those things should feel connected. Animation isn't automatically good because it uses GSAP. If removing the animation changes absolutely nothing about the experience, then why is it there?

At the same time, Iyad can love highly interactive websites while believing strongly in restraint. Not every corner needs to move. Not every card needs to float. Not every section needs to scream for attention. Good design needs rhythm. Playful doesn't have to mean childish. Minimal doesn't have to mean boring. Premium doesn't have to mean looking like a bank website. One genuinely interesting decision can be more valuable than a technically insane website with no real point of view.

There is also an irrational part of the process: **"Yeah, this is nice."** He trusts that feeling, then tries to figure out why.

The underlying principles are: **Intent. Personality. Restraint. Reason.**

## Why do you prefer certain visual styles?
The navy / cream / accent palette, strong display typography, kinetic text and custom visual elements weren't originally created as some perfectly planned design system. They gradually became things Iyad kept returning to because they felt right.

Navy feels calmer and more characterful than a pure black-and-white tech aesthetic. It can feel deep and confident without immediately becoming corporate. Cream adds warmth and takes away some of the sterile feeling that pure white can create. The accent colour exists to wake the page up rather than decorate everything.

He tends to dislike the default "tech" visual language of neon blue, purple gradients and glowing everything. Colour should have a job.

The use of a bold condensed display font such as Anton comes from wanting typography to have some attitude. Large, condensed headings can feel slightly aggressive or loud, especially when paired with quieter supporting text.

Kinetic text and custom visual elements serve a similar purpose. They make the visual language feel alive and specific rather than assembled from generic components.

The exact palette or font can change between projects. The principle doesn't: **The visual language should feel like it belongs to this thing.** If all the typography, movement, colour and custom elements disappeared and could be replaced with a generic SaaS template without changing the personality, then the design probably hasn't gone far enough.

## What makes a website feel premium to you?
Premium isn't about making something look expensive. It's about making everything feel **deliberate**. Nothing should be filling space just because the designer didn't know what else to do.

Typography has a reason. Spacing has rhythm. Animation knows when to shut up. Copy doesn't try too hard. A strong visual hierarchy should let someone understand the page before they've read every word. Spacing is particularly important because even good individual sections can feel wrong if the rhythm between them isn't consistent. One carefully composed section followed by something that feels dragged together can break the illusion immediately.

Micro-interactions are valuable when they earn their place: a button responding properly, text entering at the right moment, an image changing state, a cursor interaction communicating something, a transition helping the user understand where they are. Animation for animation's sake doesn't make something premium. It usually makes the interface feel like it's trying to prove something.

Performance matters too. A beautiful website that takes forever to become usable isn't premium. It's a pretty loading screen.

Copy should be honest. Something like "revolutionising digital experiences" immediately loses credibility if the product doesn't actually have anything to say.

The strongest test is: **Does every decision feel intentional, or could I swap this with a generic template and nobody would notice?**

Premium is partly the absence of unnecessary things and partly the presence of details that show someone genuinely gave a shit.

Examples:
- **ALDER ROASTERS**: Proper coffee brand, not "e-commerce with coffee pictures"
- **Princess and the Prepo**: Learning as experience, not content in cards
- **Portfolio**: Does every decision feel intentional or swappable with generic template?

## What do you dislike about AI-generated design?
Iyad doesn't dislike a design because AI was involved. He dislikes it when **nobody appears to have made a decision.**

There are patterns he has started to recognise: giant dramatic hero text, purple-blue gradients, glass cards, huge rounded corners, random blobs and glows, fake 3D objects, three vague buzzwords, every section animated, every button having an elaborate hover, every empty space being filled. None of those things are automatically bad. The problem is when they appear because they are statistically associated with "good modern design" rather than because they belong to the project.

A coffee website with generic beige blobs can be beautiful and still feel completely disconnected from the actual coffee brand. A Malaysian event website using a futuristic purple gradient might be technically polished while having nothing to say about Malaysia or the event itself. A personal portfolio that looks exactly like an AI startup landing page is another version of the same problem.

The individual elements might all be nice. The problem is that **nothing belongs specifically to that project.** AI tends to be very good at producing something that looks like good design. Human design becomes interesting when someone makes a decision that couldn't have been predicted from the template.

That's the difference between **generated** and **made**.

Iyad's use of AI in design is therefore slightly adversarial. AI can be useful for speed, exploration and execution, but he wants to interrogate the result: **Why this font? Why this colour? Why does this move? Why is this section here? Why does this feel like every other website?** If there isn't a good answer, the design isn't finished.

The goal isn't to prove that AI wasn't used. The goal is for the final thing to contain enough human decisions that **AI is no longer the interesting part of the story.**

## What is your design process?
Iyad doesn't naturally follow a perfectly linear research → constraints → wireframe → Figma → design system → code process.

He usually starts with an obsession. References. Colours. Typography. Interactions. Websites. Images. Anything that helps answer: **What should this feel like?** and **What is the one idea here?**

Sometimes he uses Figma. Sometimes he goes straight into the browser. If he already has a rough idea of what he wants, coding can actually be the faster design tool because he gets to see the thing moving and interacting rather than looking at a static representation.

The process often looks more like: **Understand the idea → collect references → find a visual direction → make something rough → stare at it → realise what's wrong → experiment → refine → build the real thing → obsess over tiny details → remove things that don't belong.**

A lot of the best decisions happen after seeing the actual thing. There is often a moment of: **"Wait. This would be better if..."** and that's where the design moves somewhere unexpected.

The upfront thinking still matters. Iyad likes establishing a visual language — typography, colour, layout, interaction principles and the general feeling of the experience. He just doesn't want to lock every decision before the project has had a chance to breathe.

## Design System Thinking
Iyad likes design systems, but not the kind where you spend two weeks building forty reusable components before you've figured out what you're actually designing. The system should help the work move faster, not become the work.

Useful foundations include: colour tokens, typography, spacing, radius, motion, containers, basic interaction patterns. Components and primitives can sit on top of that. Composition matters more than forcing everything into the same component. Two sections can use the same primitives and still feel completely different.

For a portfolio, a small internal design language makes sense: a type scale, spacing system, colours, buttons, containers, animation behaviour and common interaction patterns. But individual projects should still be allowed to have personality.

A system helps when consistency is genuinely becoming a problem — repeatedly solving the same UI, changing one value across many files, or working with other people who need a shared language.

It hurts when abstraction happens before understanding. If everything becomes reusable "just because it can," eventually every unusual design decision requires fighting the component system.

The basic rule is: **Reuse the boring stuff. Protect the interesting stuff.** Buttons, spacing, typography and containers can be shared. The weird interaction that makes a project memorable doesn't necessarily need to become a generic component. Sometimes the best component is the one you only need once.

## Accessibility as Default
Accessibility isn't something Iyad sees as a final checklist to complete before shipping. He isn't someone who has every part of WCAG memorised, and he is still learning, but the basic principle is straightforward: **Don't make something unnecessarily difficult to use just because it looks cool.**

That means thinking about: semantic HTML, proper buttons instead of clickable divs, keyboard interaction, readable contrast, heading structure, clear interactive states, controls that communicate their purpose.

For experimental interfaces, the fancy interaction shouldn't be the only possible navigation path. In educational projects such as Princess and the Prepo, clear states, readable content, usable controls and predictable interactions matter because the interface is supporting learning rather than becoming the obstacle.

ARIA should be used when there is an actual need, not sprinkled everywhere to make the HTML look more "accessible."

Verification is fairly practical: browser testing, keyboard navigation, HTML inspection, contrast checking, different viewport sizes, automated checks where useful, actually trying to use the interface without a mouse.

Iyad sees accessibility as part of good design anyway. Clear hierarchy, good contrast, readable typography and obvious interaction states generally make a product better for everyone. He wants to get much better at this over time because real products force you to think about people and situations you wouldn't necessarily consider when optimising a portfolio for visual impact. Accessibility is therefore not a limitation on creativity. It's another useful constraint.

## Inspiration Sources
Iyad doesn't currently have a fixed list of designers, books or websites that he constantly references. The honest answer is basically: **"Ne leh gitau."** He tends to discover references organically and save things when they catch his attention. He is more interested in the feeling or decision behind a reference than in following a particular designer as a rule.