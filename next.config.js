/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  // Enable static exports for static site generation
  output: 'standalone',
  // Enable React Compiler
  experimental: {
    turbo: process.env.NODE_ENV === 'development' ? {} : undefined,
    // Enable React Server Components
    serverComponentsExternalPackages: ['@prisma/client', 'prisma'],
  },
  // Image optimization
  images: {
    domains: ['localhost', 'fairbid-ecommerce.vercel.app'], // Add your production domain here
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Add path aliases
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    
    // Handle Prisma client in serverless environment
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    
    return config;
  },
  // Image remote patterns
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  // Webpack configuration (fallback for production build)
  webpack: (config, { isServer }) => {
    // Apply the moment.js alias for webpack builds
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'moment': 'moment/moment.js'
      };
    }
    return config;
  },
};

// Enable webpack for production build
if (process.env.NODE_ENV === 'production') {
  // Remove turbopack config for production
  delete nextConfig.experimental.turbo;
  
  // Add any production-specific webpack overrides here
  nextConfig.webpack = (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'moment': 'moment/moment.js'
      };
    }
    return config;
  };
}

module.exports = nextConfig;
