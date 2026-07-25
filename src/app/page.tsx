import Hero from "@/components/home/Hero";
import HorizontalIndex from "@/components/home/HorizontalIndex";
import { site } from "@/content/site";

export default function Home() {
  return (
    <>
      <Hero />
      <HorizontalIndex />
      <section id="about" className="about-section" aria-labelledby="about-heading">
        <div>
          <p className="eyebrow">About ↗</p>
          <h2 id="about-heading">I’m a Software Engineering student who enjoys building things that live on the internet.</h2>
          <p className="about-detail">I’m interested in product systems, frontend development, clear user flows, and learning how an idea becomes something people can use.</p>
        </div>
        <div className="about-orbit" aria-hidden="true"><span /></div>
      </section>
      <section id="contact" className="contact-section" aria-labelledby="contact-heading">
        <p className="eyebrow">Contact ↗</p>
        <h2 id="contact-heading">Let’s connect.</h2>
        <p>If you would like to discuss a project, feel free to get in touch.</p>
        <a href={`mailto:${site.email}`} data-sound="chime">Email <span>{site.email}</span> ↗</a>
        <a href={site.social.github} target="_blank" rel="noopener noreferrer" data-sound="chime">GitHub <span>github.com/pakyad</span> ↗</a>
        <a href="https://www.linkedin.com/in/iyadiman" target="_blank" rel="noopener noreferrer" data-sound="chime">LinkedIn <span>linkedin.com/in/iyadiman</span> ↗</a>
      </section>
    </>
  );
}
