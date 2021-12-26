import { FC } from 'react'
import Link from 'next/link'
import { Container } from './Container'

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
  Math.floor(Math.random() * 16777215).toString(16)
  return (
    <Container tag={'section'} wrapStyle={{ '--block-stroke-width': '1px' } as React.CSSProperties}>
      <ol className={'flex flex-col'}>
        {posts.map((post: any) => (
          <li key={post.id} className={'b-b b-f'}>
            <Link href={`/posts/${post.id}`}>
              <a className={'accent b-b'}>
                {post.icon && post.icon.emoji}
                {post.properties.title.title[0].text.content}
                {parseDate(post.created_time)}
              </a>
            </Link>
          </li>
        ))}
      </ol>
    </Container>
  )
}

export default PostList
