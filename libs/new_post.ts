import fs from 'fs'
import path from 'path'
import { v1 as uuid } from 'uuid'
import { post_dir } from '../blog.config'

const posts_dir = path.resolve(__dirname, '..', post_dir)
const today = new Date()
const file_name = process.argv[2] ?? `untitled`
const post_id = uuid({ msecs: today.getTime() })

const front_matter = [
  '---',
  `title: ${file_name}`,
  `slug: ${post_id}`,
  `data: ${today.toISOString()}`,
  `tags:`,
  `  - Untagged`,
  `thumbnail: null`,
  '---'
]

const markdown_file = path.resolve(posts_dir, `${file_name}.md`)

fs.writeFile(markdown_file, front_matter.join('\n'), { flag: 'wx' }, err => {
  console.log(err ? err.message : `Created ${markdown_file}`)
})


