import Hero from "@/components/home/Hero";
import HorizontalIndex from "@/components/home/HorizontalIndex";
import { LocalTime } from "@/components/home/LocalTime";
import { LocationMap } from "@/components/home/LocationMap";
import { site, STATUS } from "@/content/site";

export default function Home() {
  return (
    <>
      <Hero />
      <HorizontalIndex />
      <section id="about" className="about-section" aria-labelledby="about-heading">
        <div>
          <p className="eyebrow">About ↗</p>
          <h2 id="about-heading">I&rsquo;m interested in systems, structure, and the shape of an idea, but I also enjoy being creative through design.</h2>
          <p className="about-detail">I&rsquo;m curious about how things connect — frontend, product logic, user flows, and the decisions that turn a concept into something that works. I&rsquo;m learning by building.</p>
        </div>
        <div className="info-panel">
          <div className="info-clock">
            <p className="info-clock-value"><LocalTime /></p>
          </div>
          <div className="info-field">
            <p className="info-field-label">status</p>
            <p className="info-field-value" data-sound="cry">{STATUS}</p>
          </div>
          <LocationMap />
        </div>
      </section>
      <section id="contact" className="contact-section" aria-labelledby="contact-heading">
        <p className="eyebrow">Contact ↗</p>
        <h2 id="contact-heading">Let’s connect.</h2>
        <p>If you would like to discuss a project, feel free to get in touch.</p>
        <a href={`mailto:${site.email}`} data-sound="chime">Email <span>{site.email}</span> ↗</a>
        <a href={site.social.github} target="_blank" rel="noopener noreferrer" data-sound="chime">GitHub <span>github.com/pakyad</span> ↗</a>
        <a href="https://wa.link/6hec7n" target="_blank" rel="noopener noreferrer" data-sound="chime">WhatsApp <span>+60 1x-xxx 893</span> ↗</a>
        <a href="https://www.linkedin.com/in/iyadiman" target="_blank" rel="noopener noreferrer" data-sound="chime">LinkedIn <span>linkedin.com/in/iyadiman</span> ↗</a>
      </section>
    </>
  );
}
