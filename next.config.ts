// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Enables static export (required for Capacitor)
  output: 'export',
  // 2. Trailing slash helps with static asset routing on mobile
  trailingSlash: true,

  // 3. Configure Webpack to ignore Node.js-only modules in the frontend bundle.
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        // --- IGNORE MISSING MODULES ---
        fs: false,
        path: false,
        os: false,
        crypto: false,
        stream: false,
        constants: false,
        tls: false,
        net: false,
        http2: false,
      };
    }
    return config;
  },
};

export default nextConfig;

