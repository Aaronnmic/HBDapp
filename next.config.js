const { basePath } = require('./lib/site-config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // GitHub Pages serves project sites under /<repo-name>/ unless you attach
  // a custom domain — see lib/site-config.js to change or remove this.
  basePath,
  trailingSlash: true,
}

module.exports = nextConfig
