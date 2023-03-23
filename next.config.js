/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // config to use the image host, which is dummyimage.com | localhost etc"
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dummyimage.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;
