import { type Metadata } from "next";
import { siteMetadata } from "@/lib/projectData";
import ProjectShell from "@/components/ProjectShell";

export const metadata: Metadata = {
  title: `Volunteer Management System — ${siteMetadata.title}`,
  description: "Volunteer workflow and event administration platform.",
};

export default function VolunteerManagementPage() {
  return <ProjectShell slug="volunteer-management" />;
}
