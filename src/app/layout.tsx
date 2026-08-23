import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Anton } from "next/font/google";
import Script from "next/script";
import "./globals.css";


const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-iyad-s-projects1.vercel.app";

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#6587ab" };

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: { default: "Muhammad Iyad Iman Mohmad Nazri - Portfolio", template: "%s - Muhammad Iyad" },
  description: "Software Engineering student building thoughtful digital products from interface to infrastructure.",
  openGraph: {
    title: "Muhammad Iyad Iman Mohmad Nazri - Portfolio",
    description: "Software Engineering student building thoughtful digital products from interface to infrastructure.",
    url: baseUrl,
    siteName: "Muhammad Iyad",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Muhammad Iyad Iman Mohmad Nazri" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Iyad Iman Mohmad Nazri - Portfolio",
    description: "Software Engineering student building thoughtful digital products from interface to infrastructure.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/favicon.ico", sizes: "any" }] },
};

import PortfolioShell from "@/components/shell/PortfolioShell";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${anton.variable}`} data-scroll-behavior="smooth">
      <body>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <div id="main-content" tabIndex={-1}><PortfolioShell>{children}</PortfolioShell></div>
        <Script id="touch-detect" strategy="afterInteractive">{`
          if (matchMedia("(pointer: coarse)").matches) document.body.classList.add("is-touch");
        `}</Script>
      </body>
    </html>
  );
}
