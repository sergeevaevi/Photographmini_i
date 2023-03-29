/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "**",
            },
        ],
    },
    experimental: {
        largePageDataBytes: 256 * 100000,
      },
}

module.exports = nextConfig
