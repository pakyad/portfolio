import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  async headers() {
    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      { key: "Strict-Transport-Security", value: "max-age=31536000" },
    ];

    if (process.env.NODE_ENV === "production") {
      securityHeaders.unshift({ key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'; upgrade-insecure-requests" });
    }

    return [{
      source: "/(.*)",
      headers: securityHeaders,
    }];
  },
  experimental: {
    inlineCss: true,
    staleTimes: {
      dynamic: 0,
      static: 300,
    },
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
