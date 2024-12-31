/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp3)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name][ext]'
      }
    });
    return config;
  },

  async rewrites() {
    return [
      {
        source: '/static/media/:path*',
        destination: '/static/media/:path*'
      }
    ];
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
              "font-src 'self' fonts.gstatic.com", 
              "media-src 'self' data: blob: * static/media/",
              `connect-src 'self' ${process.env.NEXT_PUBLIC_SUPABASE_URL} wss://${process.env.NEXT_PUBLIC_SUPABASE_URL.replace('https://', '')}`
            ].join('; ')
          }
        ]
      }
    ];
  },
};

module.exports = nextConfig;