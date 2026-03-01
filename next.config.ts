// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Enable static export for Capacitor
  output: 'export',
  
  // 2. Disable server-side rendering and static optimization for API routes
  // (API routes will not work in the static export, but this prevents 
  // Next.js from trying to build them)
  trailingSlash: true,
  
  // 3. Configure Webpack to ignore Node.js modules in the frontend bundle
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        // Ignore modules that only exist in Node.js
        fs: false,
        path: false,
        os: false,
        crypto: false,
        stream: false,
        constants: false,
      };
    }
    return config;
  },
};

export default nextConfig;

