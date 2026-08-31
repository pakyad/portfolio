const PROJECT_DOMAINS: Record<string, string> = {
  "alder-roasters": "https://alder.iyadiman.me",
  rosta: "https://rosta.iyadiman.me",
  blu: "https://blu.iyadiman.me",
  coastline: "https://coastline.iyadiman.me",
  "bazram-merdeka": "https://bazram-merdeka.iyadiman.me",
};

export function getBrandedProjectUrl(slug: string, liveUrl?: string): string | undefined {
  if (!liveUrl && !PROJECT_DOMAINS[slug]) return undefined;
  return PROJECT_DOMAINS[slug] ?? liveUrl;
}
