import type { NextConfig } from "next";
import { getRedirects } from './src/data/redirects';

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Trailing slash for canonical URL consistency
  trailingSlash: true,
  
  // Compression
  compress: true,
  
  // Power optimizations for static generation at scale
  experimental: {
    // Optimize package imports
    optimizePackageImports: ['@/components', '@/lib'],
  },
  
  // Redirects for URL management (legacy URLs, renamed pages, etc.)
  async redirects() {
    return getRedirects();
  },
};

export default nextConfig;
