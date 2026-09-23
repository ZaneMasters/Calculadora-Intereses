// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://mejoratusrendimientos.com',
  trailingSlash: 'always',
  integrations: [
    react(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date()
    })
  ],

  vite: {
    plugins: [tailwindcss()]
  }
});