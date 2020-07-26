import fs from 'fs'
import path from 'path'
import md5 from 'blueimp-md5'
import { format } from 'date-fns'
import zh_CN from 'date-fns/locale/zh-CN'
import { posts_dir } from '../blog.config'

const rootDir = path.join(__dirname, '..', posts_dir)
const today = format(new Date(), 'yyyy-MM-dd HH:mm:ss', { locale: zh_CN })
const fileName = process.argv[2] ?? `untitled`
const postId = md5(today)

const front_matter = [
  '---',
  `title: ${fileName}`,
  `slug: ${postId}`,
  `date: ${today}`,
  `tags:`,
  `  - Untagged`,
  `thumbnail: null`,
  '---'
]

const markdownFile = path.resolve(rootDir, `${fileName}.md`)

fs.writeFile(markdownFile, front_matter.join('\n'), { flag: 'wx' }, (err) => {
  console.log(err ? err.message : `Created ${markdownFile}`)
})
