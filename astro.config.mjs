import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// GitHub Pages project site: https://henriquetargino.github.io/Portfolio
// base '/' em dev/local; o CI do GitHub Pages builda com SITE_BASE=/Portfolio
export default defineConfig({
  site: 'https://henriquetargino.github.io',
  base: process.env.SITE_BASE || '/',
  integrations: [react()],
});
