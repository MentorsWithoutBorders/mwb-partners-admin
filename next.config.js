/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // This change is made here to support svg files as a components
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
}

module.exports = nextConfig
