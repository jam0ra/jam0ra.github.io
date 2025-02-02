import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',  // Enables static HTML export
  basePath: '/jam0ra.github.io', // Your repository name
  images: {
    unoptimized: true,
  },
  // Disable server-side features since GitHub Pages is static
  trailingSlash: true,
};

export default nextConfig;