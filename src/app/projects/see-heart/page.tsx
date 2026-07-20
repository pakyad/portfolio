import { type Metadata } from "next";
import { siteMetadata } from "@/lib/projectData";
import ProjectShell from "@/components/ProjectShell";

export const metadata: Metadata = {
  title: `SEE-HEART — ${siteMetadata.title}`,
  description: "Health and fitness tracking application with validated usability.",
};

export default function SeeHeartPage() {
  return <ProjectShell slug="see-heart" />;
}
