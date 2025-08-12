import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
