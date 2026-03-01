// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        // --- ADD THESE FALLBACKS ---
        dns: false,
        async_hooks: false,
        dgram: false,
        child_process: false,
        // ---------------------------
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

