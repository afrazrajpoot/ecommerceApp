/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    WORDPRESS_API_URL: process.env.WORDPRESS_API_URL,
    WOOCOMMERCE_CONSUMER_KEY: process.env.WOOCOMMERCE_CONSUMER_KEY,
    WOOCOMMERCE_CONSUMER_SECRET: process.env.WOOCOMMERCE_CONSUMER_SECRET,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'develop.sonduckfilm.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
