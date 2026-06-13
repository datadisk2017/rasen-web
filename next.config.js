/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'export',
    basePath: process.env.NODE_ENV === 'production' ? '/rasen-web' : '',
    images: {
        unoptimized: true,
    },
};

module.exports = nextConfig;