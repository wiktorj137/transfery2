import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/transfery2' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/transfery2/' : '',
};

export default nextConfig;
