import Hero from "@/components/home/Hero";
import HorizontalIndex from "@/components/home/HorizontalIndex";
import { NowBuilding } from "@/components/home/NowBuilding";
import { LocationMap } from "@/components/home/LocationMap";
import { site, STATUS } from "@/content/site";

export default function Home() {
  return (
    <>
      <Hero />
      <HorizontalIndex />
      <section id="about" className="about-section" aria-labelledby="about-heading">
        <div>
          <p className="eyebrow">About</p>
          <h2 id="about-heading">I&rsquo;m interested in systems, structure, and the shape of an idea &mdash; design is how I think through them.</h2>
          <p className="about-detail">
            Software Engineering student at UniKL building real products end to end &mdash; interface, product logic, and the infrastructure behind them. Strongest in frontend engineering with React, Next.js and TypeScript, with backend work across Firebase, Supabase and Laravel. {STATUS}.
          </p>
          <a href={site.social.github} target="_blank" rel="noopener noreferrer" className="contact-link about-github"><span className="contact-arrow">&#8599;&#xFE0E;</span><span className="contact-label">(GitHub)</span></a>
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
          <a href={`mailto:${site.email}`} className="contact-link"><span className="contact-arrow">&#8599;&#xFE0E;</span><span className="contact-label">(Email)</span></a>
          <a href={site.social.github} target="_blank" rel="noopener noreferrer" className="contact-link"><span className="contact-arrow">&#8599;&#xFE0E;</span><span className="contact-label">(GitHub)</span></a>
          <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="contact-link"><span className="contact-arrow">&#8599;&#xFE0E;</span><span className="contact-label">(LinkedIn)</span></a>
          <a href={site.social.whatsapp} target="_blank" rel="noopener noreferrer" className="contact-link contact-link--secondary"><span className="contact-arrow">&#8599;&#xFE0E;</span><span className="contact-label">(WhatsApp)</span></a>
        </div>
      </section>
    </>
  );
}
