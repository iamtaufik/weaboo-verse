/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'otakudesu.lol',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;
