// Single source of truth for the GitHub Pages base path, shared between
// next.config.js (CommonJS) and client code (via lib/assetPath.ts).
//
// Vercel and Netlify serve the site from the root domain, so basePath must
// be empty there. GitHub Pages serves project sites under /<repo-name>/, so
// the deploy workflow sets NEXT_PUBLIC_DEPLOY_TARGET=gh-pages to turn this on.
//
// Must be NEXT_PUBLIC_-prefixed: this value is read both at build time (by
// next.config.js, in Node) and at runtime in the browser (by client
// components building Howler audio URLs) — only NEXT_PUBLIC_ vars get
// inlined into the client bundle.
const basePath = process.env.NEXT_PUBLIC_DEPLOY_TARGET === 'gh-pages' ? '/birthday-wishes-site' : ''

module.exports = { basePath }
