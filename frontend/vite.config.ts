import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const routes = ['about', 'admin', 'chat', 'events', 'institutions', 'login', 'news', 'publication-detail', 'publications', 'search'];
const csp = "default-src 'self'; script-src 'self'; script-src-attr 'none'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'";
const securityHeaders = {
  'Content-Security-Policy': `${csp}; frame-ancestors 'none'`,
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer',
};

function staticCompatibility(): Plugin {
  return {
    name: 'rcga-static-compatibility',
    enforce: 'post',
    transformIndexHtml(html, context) {
      // Vite's development preamble and HMR require inline scripts and WebSockets.
      return context.server ? html.replace(/\s*<meta http-equiv="Content-Security-Policy"[^>]*>/, '') : html;
    },
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (routes.some(route => req.url?.split('?')[0] === `/${route}.html`)) req.url = '/index.html';
        next();
      });
    },
    generateBundle(_options, bundle) {
      const index = bundle['index.html'];
      if (index?.type !== 'asset') throw new Error('Missing SPA entry');
      for (const route of routes) this.emitFile({ type: 'asset', fileName: `${route}.html`, source: index.source });
      const rules = Object.entries(securityHeaders).map(([name, value]) => `  ${name}: ${value}`);
      this.emitFile({ type: 'asset', fileName: '_headers', source: ['/*', ...rules, ''].join('\n') });
      // Keep existing image URLs used by page markup and backend responses.
      for (const file of readdirSync(resolve('assets'))) {
        if (/\.(jpg|jpeg|png|svg|webp)$/i.test(file)) {
          this.emitFile({ type: 'asset', fileName: `assets/${file}`, source: readFileSync(resolve('assets', file)) });
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), staticCompatibility()],
  publicDir: false,
  server: {
    proxy: { '/api': 'http://127.0.0.1:8000', '/uploads': 'http://127.0.0.1:8000', '/docs': 'http://127.0.0.1:8000', '/openapi.json': 'http://127.0.0.1:8000' },
  },
  preview: { headers: securityHeaders },
  build: { assetsDir: 'assets/app' },
});
