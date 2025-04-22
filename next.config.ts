/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "simbrella.softmaxtech.com.ng",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
