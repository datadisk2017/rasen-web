const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: isProd ? '/rasen-web' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
