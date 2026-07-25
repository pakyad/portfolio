"use client";

import Navigation from "@/components/shell/Navigation";
import MonoLabel from "@/components/ui/MonoLabel";

const SECTIONS = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function PortfolioShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation sections={SECTIONS} />
      <div className="grid-system">
        <main>{children}</main>
        <footer className="site-footer"><MonoLabel>&copy; {new Date().getFullYear()} Muhammad Iyad</MonoLabel></footer>
      </div>
    </>
  );
}
