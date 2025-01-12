import type { NextConfig } from 'next'

const tumblrDomains = Array.from({ length: 50 }, (_, i) => `${i}.media.tumblr.com`)

const nextConfig: NextConfig = {
  images: {
    domains: tumblrDomains,
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
