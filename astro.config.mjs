import { defineConfig } from "astro/config"

import tailwind from "@astrojs/tailwind"
import { site_url } from "./src/site.config"

// https://astro.build/config
export default defineConfig({
  site: site_url,
  integrations: [
    tailwind({
      // Example: Disable injecting a basic `base.css` import on every page.
      // Useful if you need to define and/or import your own custom `base.css`.
      applyBaseStyles: false,
    }),
  ],
})
