import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '*.media.tumblr.com'
      },
      {
        protocol: 'https',
        hostname: '*.media.tumblr.com'
      }
    ],
    formats: ['image/webp']
  },
  async rewrites() {
    return [
      {
        source: '/media/:path*',
        destination: 'http://:path*'
      }
    ]
  }
}

export default nextConfig
