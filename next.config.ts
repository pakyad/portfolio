import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
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
