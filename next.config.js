/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {},
  images: {
    domains: ['m.media-amazon.com', 'ia.media-imdb.com', 'image.tmdb.org'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.media-amazon.com',
      },
    ],
  },
};

module.exports = nextConfig;
