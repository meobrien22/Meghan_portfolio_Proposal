import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Meghan_portfolio_Proposal",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
