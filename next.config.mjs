/** @type {import('next').NextConfig} */
const isPages = process.env.GITHUB_PAGES === "true";
const repoBase = "/BizLaunch";

const config = {
  output: "export",
  images: { unoptimized: true },
  eslint: {
    ignoreDuringBuilds: true,
  },
  ...(isPages
    ? {
        basePath: repoBase,
        assetPrefix: `${repoBase}/`,
      }
    : {}),
};

export default config;
