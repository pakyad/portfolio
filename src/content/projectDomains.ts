const PROJECT_DOMAINS: Record<string, string> = {
  "alder-roasters": "https://alder.iyadiman.me",
  pulse: "https://pulse.iyadiman.me",
  codedulu: "https://codedulu.iyadiman.me",
  soon: "https://soon.iyadiman.me",
  laterlah: "https://laterlah.iyadiman.me",
  rosta: "https://rosta.iyadiman.me",
};

export function getBrandedProjectUrl(slug: string, liveUrl?: string): string | undefined {
  if (!liveUrl) return undefined;
  return PROJECT_DOMAINS[slug] ?? liveUrl;
}

export { PROJECT_DOMAINS };
