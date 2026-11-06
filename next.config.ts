import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // Include smaller candidates for narrow phones and retain the default quality
    // for other images. The hero uses 65 to reduce its mobile transfer size.
    deviceSizes: [360, 480, 640, 750, 828, 960, 1080, 1200, 1920, 2048, 3840],
    qualities: [65, 75],
  },
};

export default nextConfig;
