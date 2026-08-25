import KineticText from "@/components/home/KineticText";

export default function Hero() {
  return (
    <section className="hero" id="intro">
      <h1>
        <span className="sr-only">Iyad Iman</span>
        <KineticText text="IYAD IMAN" />
      </h1>
      <p>Software Engineering student building thoughtful digital products &mdash; from interface to infrastructure.</p>
    </section>
  );
}
