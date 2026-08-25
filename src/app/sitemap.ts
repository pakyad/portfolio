import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/projects";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-iyad-s-projects1.vercel.app";
const lastMod = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, lastModified: lastMod, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/contact`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.5 },
    ...caseStudies.map((project) => ({ url: `${baseUrl}/projects/${project.slug}`, lastModified: lastMod, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
