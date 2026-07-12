import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for the production Docker image (Next.js output file tracing).
  // https://nextjs.org/docs/app/api-reference/config/next-config-js/output
  output: "standalone",
  typedRoutes: true,
  experimental: {
    // Keep `three` out — optimizePackageImports can break WebGL namespace imports.
    optimizePackageImports: ["gsap"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
