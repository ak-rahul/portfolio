import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    domains: ['github.com', 'raw.githubusercontent.com'],
  },
};

export default nextConfig;
