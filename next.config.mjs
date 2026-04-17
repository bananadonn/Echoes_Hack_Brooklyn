/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow large audio responses from the /api/audio route
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;
