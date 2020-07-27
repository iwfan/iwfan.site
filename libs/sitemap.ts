import fs from 'fs'
import prettier from 'prettier'
import { getSortedPostsData } from './posts'
import { site_url } from '../blog.config'

;(async () => {
  const prettierConfig = await prettier.resolveConfig('../.prettierrc')

  const pages = await getSortedPostsData(false)

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map(
          (page) =>
            `
            <url>
                <loc>${site_url}/post/${page.slug}</loc>
            </url>
          `
        )
        .concat(
          `
            <url>
                <loc>${site_url}</loc>
                <changefreq>monthly</changefreq>
            </url>
          `
        )
        .join('')}
    </urlset>
    `

  // If you're not using Prettier, you can remove this.
  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  })

  fs.writeFileSync('public/sitemap.xml', formatted)
})()
