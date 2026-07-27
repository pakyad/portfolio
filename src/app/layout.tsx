import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import "@/styles/interactive-sound.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const nippo = localFont({
  src: "./fonts/Nippo-Variable.woff2",
  variable: "--font-nippo",
  weight: "200 700",
  display: "swap",
});
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#F7F5F0" };

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: { default: "Muhammad Iyad Iman Mohmad Nazri — Portfolio", template: "%s — Muhammad Iyad" },
  description: "Portfolio of Muhammad Iyad Iman Mohmad Nazri, a Software Engineering student.",
  openGraph: {
    title: "Muhammad Iyad Iman Mohmad Nazri — Portfolio",
    description: "Portfolio of Muhammad Iyad Iman Mohmad Nazri, a Software Engineering student.",
    url: baseUrl,
    siteName: "Muhammad Iyad",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Muhammad Iyad Iman Mohmad Nazri" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Iyad Iman Mohmad Nazri — Portfolio",
    description: "Portfolio of Muhammad Iyad Iman Mohmad Nazri, a Software Engineering student.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/favicon.ico", sizes: "any" }], apple: [{ url: "/apple-icon.png" }] },
};

import PortfolioShell from "@/components/shell/PortfolioShell";
import LoadingScreen from "@/components/shell/LoadingScreen";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${nippo.variable}`}>
      <body>
        <LoadingScreen />
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <div id="main-content" tabIndex={-1}><PortfolioShell>{children}</PortfolioShell></div>
        <div id="cursor-ring"></div>
        <button id="sound-toggle">Sound on</button>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.js" strategy="beforeInteractive" />
        <Script src="/interactive-sound.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
