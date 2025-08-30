import type { NextConfig } from 'next'

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
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        'child_process': false,
        'fs/promises': false,
        dns: false,
        'timers/promises': false,
        // MongoDB optional dependencies
        kerberos: false,
        '@mongodb-js/zstd': false,
        '@aws-sdk/credential-providers': false,
        'gcp-metadata': false,
        snappy: false,
        socks: false,
        aws4: false,
        'mongodb-client-encryption': false,
      }
    }
    return config
  },
  turbopack: {
    rules: {
      '*.woff2': {
        loaders: ['file-loader'],
        as: '*.woff2',
      },
    },
  },
}

export default nextConfig