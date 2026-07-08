// Single source of truth for the GitHub Pages base path, shared between
// next.config.js (CommonJS) and client code (via lib/assetPath.ts).
//
// Vercel and Netlify serve the site from the root domain, so basePath must
// be empty there. GitHub Pages serves project sites under /<repo-name>/, so
// the deploy workflow sets DEPLOY_TARGET=gh-pages to turn this on.
const basePath = process.env.DEPLOY_TARGET === 'gh-pages' ? '/birthday-wishes-site' : ''

module.exports = { basePath }
