/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@splinetool/react-spline', '@splinetool/runtime', 'framer-motion'],
  images: {
    unoptimized: true
  },
  compiler: {
    removeConsole: false
  }
};

module.exports = nextConfig;