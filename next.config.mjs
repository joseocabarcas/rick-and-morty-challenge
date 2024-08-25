/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rickandmortyapi.com',
      },
    ],
  },
  eslint: {
    dirs: ['pages', 'app', 'components', 'lib', 'types', 'utils', 'hooks', 'containers'],
  },
};

export default nextConfig;
