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
          <h2 id="about-heading">I like problems where the answer is a system.</h2>
          <p className="about-detail">
            I&rsquo;m a Software Engineering student at UniKL, and most of what I know came from building &mdash; a coffee storefront, a campus marketplace, a save-for-later app, a scheduling tool. Strongest on the frontend with React, Next.js and TypeScript, comfortable going deeper when the product needs it: Firebase, Supabase, Laravel.
          </p>
          <p className="about-detail">
            Right now I&rsquo;m looking for an internship between Oct 2026 and Feb 2027. If you&rsquo;re hiring, my inbox is open.
          </p>
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
        <p className="contact-note">Internship enquiries welcome. Email is fastest.</p>
        <div className="contact-links">
          <a href={`mailto:${site.email}`} className="contact-link contact-link--primary"><span className="contact-arrow">&#8599;&#xFE0E;</span><span className="contact-label">{site.email}</span></a>
          <a href={site.social.github} target="_blank" rel="noopener noreferrer" className="contact-link"><span className="contact-arrow">&#8599;&#xFE0E;</span><span className="contact-label">(GitHub)</span></a>
          <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="contact-link"><span className="contact-arrow">&#8599;&#xFE0E;</span><span className="contact-label">(LinkedIn)</span></a>
          <a href={site.social.whatsapp} target="_blank" rel="noopener noreferrer" className="contact-link contact-link--secondary"><span className="contact-arrow">&#8599;&#xFE0E;</span><span className="contact-label">(WhatsApp)</span></a>
        </div>
      </section>
    </>
  );
}
