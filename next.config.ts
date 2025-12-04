import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', '@shared/atoms', '@shared/molecules'],
  },
  
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/photo-**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8086",
        pathname: "/local-images/**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "imagedelivery.net",
        pathname: "/**",
      },
    ],
  },
  
  // Environment variables available to the browser
  env: {
    BACKEND_URL: process.env.BACKEND_URL || "http://localhost:8080",
  },
};

export default nextConfig;
