import { FC } from 'react'
import { Link } from 'remix'
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
  return (
    <Container tag={'section'} className="post-list">
      {posts.map((post: any) => {
        const tags = post.properties.tags
        const tagName = tags[tags.type]?.[0]?.name
        return (
          <Link key={post.id} to={`posts/${post.id}`} className="post-item">
            {post.icon && <span className="post-item__emoji">{post.icon.emoji}</span>}
            <strong className="post-item__title">
              {post.properties.title.title[0].text.content}
            </strong>
            <span className="post-item__dashed-line" />
            {tagName && <span className="post-item_tag">{tagName}</span>}
            <time className="post-item__date">{parseDate(post.created_time)}</time>
          </Link>
        )
      })}
    </Container>
  )
}

export default PostList
