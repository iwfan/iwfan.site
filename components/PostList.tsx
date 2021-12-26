import { FC } from 'react'
import Link from 'next/link'

interface PostListProps {
  posts: any[]
}

const parseDate = (dateStr: string) =>
  new Date(dateStr).toLocaleString('zh-CN', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })

const PostList: FC<PostListProps> = ({ posts }) => {
  return (
    <ul>
      {posts.map((post: any) => (
        <li key={post.id}>
          <Link href={`/posts/${post.id}`}>
            <a>
              {post.icon && post.icon.emoji}
              {post.properties.title.title[0].text.content}
              {parseDate(post.created_time)}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default PostList
