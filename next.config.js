/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [{ hostname: 'raw.communitydragon.org' }, { hostname: 'ddragon.leagueoflegends.com' }],
    minimumCacheTTL: 1209600, // 2 weeks
  },
};

module.exports = nextConfig;
