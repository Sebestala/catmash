import type { NextConfig } from 'next'

// Create a domain list from 0 to 49
const tumblrDomains = Array.from({ length: 50 }, (_, i) => `${i}.media.tumblr.com`)

const nextConfig: NextConfig = {
  images: {
    remotePatterns: tumblrDomains.map((domain) => ({
      protocol: 'https',
      hostname: domain
    }))
  }
  /* config options here */
}

export default nextConfig
