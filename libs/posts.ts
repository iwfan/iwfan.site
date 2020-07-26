import fs from 'fs'
import path from 'path'
import glob from 'glob'
import { promisify } from 'util'
import matter from 'gray-matter'
import remark from 'remark'
import { format, parseISO } from 'date-fns'
import zh_CN from 'date-fns/locale/zh-CN'
import html from 'remark-html'
import { posts_dir } from '../blog.config'
import { MarkdownRawData } from '../types'

const rootDir = path.join(process.cwd(), posts_dir)
const readFiles = promisify(glob)

// TODO: refine this huge cache
const cachedPosts: { [slug: string]: MarkdownRawData } = {}

export const getSortedPostsData = async () => {
  const fileNames = await readFiles('**/*.md', { cwd: rootDir })

  const allPostsData: Array<MarkdownRawData> = fileNames
    .map((fileName) => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, '')

      // Read markdown file as string
      const fullPath = path.join(rootDir, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')

      // Use gray-matter to parse the post metadata section
      const { data, content = '' } = matter(fileContents)
      // Combine the data with the id
      return {
        title: data?.title ?? '',
        slug: data.slug,
        date: data.date,
        tags: data?.tags ?? [],
        thumbnail: data?.thumbnail ?? '',
        content
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map((item) => ({
      ...item,
      date: format(item.date, 'yyyy-MM-dd HH:mm:ss', {
        locale: zh_CN
      })
    }))

  // use memory cache
  allPostsData.forEach(post => {
    cachedPosts[post.slug] = post;
  });

  return allPostsData
}

export const getAllPostSlugs = async () => {
  const posts = await getSortedPostsData()
  return posts.map((post) => ({ params: { ...post } }))
}

export async function getPostData(slug: string) {

  if (Object.keys(cachedPosts).length === 0) {
    await getSortedPostsData();
  }

  const cachedPost = cachedPosts[slug]
  console.log(cachedPost)
  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    // @ts-ignore
    .use(html)
    .process(cachedPost.content)

  const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    ...cachedPost,
    content: contentHtml
  }
}
