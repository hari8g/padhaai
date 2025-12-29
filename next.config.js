/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['padhaai.org.in', 'padhaai.org'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'padhaai.org.in',
        pathname: '/wp-content/**',
      },
    ],
  },
};
module.exports = nextConfig;
