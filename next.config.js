/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  swcMinify: true,
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
