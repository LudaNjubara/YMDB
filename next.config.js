/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  images: {
    domains: ["images.pexels.com", "image.tmdb.org", "www.gravatar.com"],
  },
  env: {
    API_KEY: "e9dc1da92c8f0ee871ed0cc34a7b13c8",
  },
};
