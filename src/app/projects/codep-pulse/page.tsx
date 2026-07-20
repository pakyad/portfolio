import { type Metadata } from "next";
import { siteMetadata } from "@/lib/projectData";
import ProjectShell from "@/components/ProjectShell";

export const metadata: Metadata = {
  title: `CODEP-PULSE — ${siteMetadata.title}`,
  description: "Campus marketplace, delivery, and dispute management platform.",
};

export default function CodepPulsePage() {
  return <ProjectShell slug="codep-pulse" />;
}
