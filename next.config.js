/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  output: 'standalone',
  images: {
    remotePatterns: [{ hostname: 'raw.communitydragon.org' }],
  },
};

module.exports = nextConfig;
