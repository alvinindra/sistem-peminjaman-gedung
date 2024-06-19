import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer({
  env: {
    API_URL: process.env.API_URL || 'https://egov.fmaulanadaily.my.id',
  },
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard/jadwal',
        permanent: true,
      },
    ];
  },
});
