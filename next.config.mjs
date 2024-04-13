/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/cart',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
