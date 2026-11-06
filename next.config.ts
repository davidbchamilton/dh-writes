import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // Retain responsive defaults for future next/image usage. The current hero
    // serves pre-encoded static files; its sizes live in src/lib/hero-image.ts.
    deviceSizes: [360, 480, 640, 750, 828, 960, 1080, 1200, 1920, 2048, 3840],
    qualities: [65, 75],
  },
};

export default nextConfig;
