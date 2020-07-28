import fs from 'fs'
import path from 'path'
import glob from 'glob'
import { promisify } from 'util'
import matter from 'gray-matter'
import NodeCache from 'node-cache'
import { format } from 'date-fns'
import zh_CN from 'date-fns/locale/zh-CN'
import { posts_dir } from '../site.config'
import { MarkdownRawData } from '../types'

const rootDir = path.join(process.cwd(), posts_dir)
const readFiles = promisify(glob)

const cachedPosts = new NodeCache({ useClones: false })

export const getSortedPostsData = async (useCache: boolean = true) => {
  const fileNames = await readFiles('**/*.md', { cwd: rootDir })

  const allPostsData: Array<MarkdownRawData> = fileNames
    .map((fileName) => {
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
        content,
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map((item) => ({
      ...item,
      date: format(item.date, 'yyyy-MM-dd HH:mm:ss', {
        locale: zh_CN,
      }),
    }))

  // use memory cache
  if (useCache) {
    allPostsData.forEach((post, index) => {
      const prev = allPostsData[index - 1]
      const next = allPostsData[index + 1]

      cachedPosts.set(post.slug, {
        ...post,
        prev: prev?.slug ?? null,
        next: next?.slug ?? null,
      })
    })
  }

  return allPostsData
}

export const getAllPostSlugs = async () => {
  const posts = await getSortedPostsData()
  return posts.map((post) => ({ params: { ...post } }))
}

export async function getPostData(slug: string) {
  if (cachedPosts.keys().length === 0) {
    await getSortedPostsData()
  }

  const cachedPost = cachedPosts.get<MarkdownRawData>(slug)!

  let prev = null,
    next = null
  if (cachedPost.prev) {
    prev = cachedPosts.get(cachedPost.prev) ?? null
  }

  if (cachedPost.next) {
    next = cachedPosts.get(cachedPost.next) ?? null
  }

  // Combine the data with the id and contentHtml
  return {
    ...cachedPost,
    prev,
    next,
  }
}
