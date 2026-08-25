"use client";

import Navigation from "@/components/shell/Navigation";
import MonoLabel from "@/components/ui/MonoLabel";
import { site } from "@/content/site";

export default function PortfolioShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <div className="grid-system">
        <main>{children}</main>
        <footer className="site-footer">
          <MonoLabel>&copy; {new Date().getFullYear()} Muhammad Iyad</MonoLabel>
          <a href={site.social.github} target="_blank" rel="noopener noreferrer" className="footer-github"><MonoLabel>GitHub &#8599;</MonoLabel></a>
        </footer>
      </div>
    </>
  );
}
