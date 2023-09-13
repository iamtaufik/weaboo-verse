/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'otakudesu.wiki',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;
