import Hero from "@/components/home/Hero";
import HorizontalIndex from "@/components/home/HorizontalIndex";
import { NowBuilding } from "@/components/home/NowBuilding";
import { LocationMap } from "@/components/home/LocationMap";
import { site } from "@/content/site";

export default function Home() {
  return (
    <>
      <Hero />
      <HorizontalIndex />
      <section id="about" className="about-section" aria-labelledby="about-heading">
        <div>
          <p className="eyebrow">About</p>
          <h2 id="about-heading">I&rsquo;m interested in systems, structure, and the shape of an idea, but I also enjoy being creative through design.</h2>
          <p className="about-detail">I&rsquo;m curious about how things connect - frontend, product logic, user flows, and the decisions that turn a concept into something that works. I&rsquo;m learning by building.</p>
        </div>
        <div className="info-panel">
          <div className="info-building">
            <NowBuilding />
          </div>

          <LocationMap />
        </div>
      </section>
      <section id="contact" className="contact-section" aria-labelledby="contact-heading">
        <p className="eyebrow">Contact</p>
        <h2 id="contact-heading">Let&rsquo;s connect.</h2>
        <div className="contact-links">
          <a href={`mailto:${site.email}`} data-sound="chime" className="contact-link"><span className="contact-arrow">↗︎</span><span className="contact-label">(Email)</span></a>
          <a href="https://wa.link/6hec7n" target="_blank" rel="noopener noreferrer" data-sound="chime" className="contact-link"><span className="contact-arrow">↗︎</span><span className="contact-label">(WhatsApp)</span></a>
          <a href="https://www.linkedin.com/in/iyadiman" target="_blank" rel="noopener noreferrer" data-sound="chime" className="contact-link"><span className="contact-arrow">↗︎</span><span className="contact-label">(LinkedIn)</span></a>
        </div>
      </section>
    </>
  );
}
