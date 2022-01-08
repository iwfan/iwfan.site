import { FC, Fragment } from 'react'
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
  let year = ''
  return (
    <Container tag={'section'} className="post-list">
      {posts.map((post: any) => {
        const tags = post.properties.tags
        const createdDate = post.properties.created_date
        const tagName = tags[tags.type]?.[0]?.name
        const date = createdDate[createdDate.type]?.start
        const currentYear = date.slice(0, 4)
        return (
          <Fragment key={post.id}>
            {year !== currentYear &&
              ((year = currentYear), (<h3 className="post-item__year">{currentYear}</h3>))}
            <Link to={`posts/${post.id}`} className="post-item">
              {post.icon && <span className="post-item__emoji">{post.icon.emoji}</span>}
              <strong className="post-item__title">
                {post.properties.title.title[0].text.content}
              </strong>
              <span className="post-item__dashed-line" />
              {tagName && <span className="post-item_tag">{tagName}</span>}
              <time className="post-item__date">{parseDate(date)}</time>
            </Link>
          </Fragment>
        )
      })}
    </Container>
  )
}

export default PostList
