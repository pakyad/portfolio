import KineticText from "@/components/home/KineticText";

export default function Hero() {
  return (
    <section className="hero" id="intro">
      <h1>
        <span className="sr-only">Iyad Iman</span>
        <KineticText text="IYAD IMAN" />
      </h1>
      <p>I&rsquo;m Iyad &mdash; a software engineering student in Penang who builds real things end to end: the interface, the logic behind it, and the infrastructure underneath.</p>
    </section>
  );
}
