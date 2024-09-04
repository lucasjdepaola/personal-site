/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three'],
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/, 
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;
