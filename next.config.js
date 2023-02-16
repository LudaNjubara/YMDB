/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  images: {
    domains: ["images.pexels.com", "image.tmdb.org", "www.gravatar.com", "res.cloudinary.com"],
  },
  env: {
    API_KEY: "e9dc1da92c8f0ee871ed0cc34a7b13c8",
    FIREBASE_API_KEY: "AIzaSyAr3VMPs7aheoIkBQRNXj0bT87BOoFemgw",
    CLOUDINARY_UPLOAD_PRESET: "userProfileImages",
    CLOUDINARY_UPLOAD_URL: "https://api.cloudinary.com/v1_1/ymdb/upload",
  },
};
