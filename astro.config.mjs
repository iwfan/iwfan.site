import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
/* import { dirname, resolve } from 'path'; */
/* import { fileURLToPath } from 'url'; */
/**/
/* const __dirname = dirname(fileURLToPath(import.meta.url)); */

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap(), tailwind({
     config: { path: './tailwind.config.mjs' },
  })]
});
