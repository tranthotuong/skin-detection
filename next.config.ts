import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Chế độ Strict cho React
  // swcMinify: true, // Tối ưu mã bằng SWC
  async redirects() {
    return [
      {
        source: "/", // Trang gốc "/"
        destination: "/detection", // Chuyển đến trang "/detection"
        permanent: false, // Redirect tạm thời (302)
      },
    ];
  },
};

export default nextConfig;
