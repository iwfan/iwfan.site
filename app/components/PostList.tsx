import { FC, Fragment } from 'react'
import { Link } from 'remix'
import { Container } from './layout/Container'

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
    <Container tag={'section'} className="post-list grid">
      {posts.map((post: any) => {
        const tags = post.properties.tags
        const createdDate = post.properties.created_date
        const tagName = tags[tags.type]?.[0]?.name
        const date = createdDate[createdDate.type]?.start
        const currentYear = date.slice(0, 4)
        return (
          <ul key={post.id}>
            <li className="grid grid-cols-12 grid-rows-2 items-center gap-2 my-6">
              <div className="flex items-center justify-between">
                <strong className="text-blue">
                  {currentYear !== year ? ((year = currentYear), currentYear) : null}
                </strong>
                <span>{post.icon?.emoji ?? '🙈'}</span>
              </div>
              <div className="col-span-11">
                <Link to={`posts/${post.id}`} className="text-lg hover:text-green u-underline">
                  <strong>{post.properties.title.title[0].text.content}</strong>
                </Link>
              </div>
              <div className="col-start-2 col-span-2 text-sm text-blue">
                <time className="mr-4">{parseDate(date)}</time>
                {tagName && <span className="col-span-2">#{tagName}</span>}
              </div>
            </li>
          </ul>
        )
      })}
    </Container>
  )
}

export default PostList
