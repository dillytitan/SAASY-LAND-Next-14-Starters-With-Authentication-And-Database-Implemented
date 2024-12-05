import { withContentlayer } from "next-contentlayer";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["tsx", "mdx", "ts", "js"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "uploadthing.com",
      },
    ],
  },
  env: {
    BITCOIN_NODE_URL: process.env.BITCOIN_NODE_URL,
    BITCOIN_NODE_USER: process.env.BITCOIN_NODE_USER,
    BITCOIN_NODE_PASSWORD: process.env.BITCOIN_NODE_PASSWORD,
  },
};

export default withContentlayer(nextConfig);
