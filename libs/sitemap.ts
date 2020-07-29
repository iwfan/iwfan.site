import fs from 'fs'
import prettier from 'prettier'
import { formatISO, parse } from 'date-fns'
import zh_CN from 'date-fns/locale/zh-CN'
import { getSortedPostsData } from './posts'
import { site_url } from '../site.config'

const formatISO8601Date = (dateStr: string) =>
  formatISO(
    parse(dateStr, 'yyyy-MM-dd HH:mm:ss', new Date(dateStr), {
      locale: zh_CN,
    })
  )

;(async () => {
  const prettierConfig = await prettier.resolveConfig('../.prettierrc')

  const pages = await getSortedPostsData()

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map(
          (page) =>
            `
            <url>
                <loc>${site_url}/post/${page.slug}</loc>
                <lastmod>${formatISO8601Date(page.date)}</lastmod>
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
