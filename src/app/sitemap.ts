import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-iyad-s-projects1.vercel.app";
const lastMod = new Date("2026-07-21");

const publishedProjects = projects.filter((p) => p.slug !== "codedulu" && p.slug !== "soon");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, lastModified: lastMod, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/contact`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.5 },
    ...publishedProjects.map((project) => ({ url: `${baseUrl}/projects/${project.slug}`, lastModified: lastMod, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
