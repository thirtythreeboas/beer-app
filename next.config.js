/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["images.punkapi.com", "media.istockphoto.com"],
    formats: ["image/webp"],
},
}

module.exports = nextConfig
