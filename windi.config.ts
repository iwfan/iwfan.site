import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    include: ['./{pages,partials,components}/**/*.{js,jsx,ts,tsx,css,scss}'],
    exclude: ['node_modules', '.git', '.next'],
  },
})
