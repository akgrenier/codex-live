const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    const stubPath = path.resolve(__dirname, 'stubs', 'lightningcss.js');
    // Set up aliases
    config.resolve.alias['lightningcss'] = stubPath;
    config.resolve.alias['lightningcss/node'] = stubPath;
    config.resolve.alias['lightningcss/node/index.js'] = stubPath;

    // Set up fallbacks
    config.resolve.fallback = config.resolve.fallback || {};
    config.resolve.fallback['lightningcss'] = stubPath;
    config.resolve.fallback['lightningcss/node'] = stubPath;
    config.resolve.fallback['lightningcss/node/index.js'] = stubPath;

    return config;
  },
};

module.exports = nextConfig;
