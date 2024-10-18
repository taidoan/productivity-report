/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(process.env.NODE_ENV === "production" && {
    output: "export",
    assetPrefix: "/productivity/",
  }),
};

export default nextConfig;
