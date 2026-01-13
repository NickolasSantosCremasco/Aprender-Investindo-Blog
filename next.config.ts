import type { NextConfig } from "next";

require('dotenv').config()

const nextConfig: NextConfig = {
  reactStrictMode: true, 


  eslint: {

    ignoreDuringBuilds: true,
  },
  typescript: {
  
    ignoreBuildErrors: true,
  },
  // ----------------------------------

  env: {
     
      DB_HOST: process.env.DB_HOST || '',
      DB_USER: process.env.DB_USER || '',
      DB_PASSWORD: process.env.DB_PASSWORD || '',
      DB_DATABASE: process.env.DB_DATABASE || '',
      JWT_SECRET: process.env.JWT_SECRET || '',
  }
};

export default nextConfig;