import createMDX from '@next/mdx'
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/, 
      use: ['@svgr/webpack'],
    });
    return config;
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx']
};

const withMDX = createMDX({
})
 
export default withMDX(nextConfig)
// export default nextConfig;
