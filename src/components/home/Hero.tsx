import { site } from "@/content/site";
import KineticText from "@/components/home/KineticText";
import IyadLLMWrapper from "@/components/iyadllm/IyadLLMWrapper";

export default function Hero() {
  return (
    <section className="hero" id="intro">
      <h1>
        <span className="sr-only">Iyad Iman</span>
        <KineticText text="IYAD IMAN" />
      </h1>
      <p>{site.thesis}</p>
      <IyadLLMWrapper />
    </section>
  );
}