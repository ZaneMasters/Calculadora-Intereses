// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://main.d3vg1zik9yws91.amplifyapp.com', // URL temporal en AWS Amplify
  integrations: [react(), sitemap()],

  vite: {
    plugins: [tailwindcss()]
  }
});