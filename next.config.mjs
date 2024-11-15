/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ['http://localhost:8080', '*'], 
  },
};

export default nextConfig;
