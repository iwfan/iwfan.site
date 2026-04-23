// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';
import { site_url } from './src/site.config';

// https://astro.build/config
export default defineConfig({
  site: site_url,
  integrations: [sitemap()],

  vite: {
    plugins: [tailwindcss()]
  }
});
