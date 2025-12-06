import withBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'images.unsplash.com' },
    { protocol: 'https', hostname: 'cdni.iconscout.com' },
    { protocol: 'https', hostname: 'images.ctfassets.net' },
    { protocol: 'https', hostname: 'images.ctfassets.net' },
    { protocol: 'https', hostname: 'images.svgcdn.com'},
    { protocol: 'https', hostname: 'images.svgpath.com'},
  ],
  dangerouslyAllowSVG: true,
},
};

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default bundleAnalyzer(nextConfig);