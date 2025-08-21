import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
      },
    ],
  },
  turbopack: {
    rules: {
      '*.woff2': {
        loaders: ['file-loader'],
        as: '*.woff2',
      },
    },
  },
};

export default nextConfig;
