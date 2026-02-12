import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
      allowedOrigins: ["localhost:3000", "*.devtunnels.ms"],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hegfzxysom2czqlw.public.blob.vercel-storage.com",
      },
    ],
  },
  serverExternalPackages: ["@node-rs/argon2", "@prisma/client"],
};

export default nextConfig;
