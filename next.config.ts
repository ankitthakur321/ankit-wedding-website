import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.31.182",
    "192.168.31.182:3000",
    "localhost:3000",
    "127.0.0.1:3000",
  ],
};

export default nextConfig;
