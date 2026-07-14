import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname, "../.."),
  images: {
    // Longer cache reduces repeat upstream fetches when the optimizer is used.
    minimumCacheTTL: 60 * 60 * 24 * 7,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "cdn.example.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
