import { FC } from 'react'
import { Link } from 'remix'
import { Container } from './layout/Container'

interface PostListProps {
  posts: any[]
}

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
            <li className="grid grid-cols-12 grid-rows-2 items-center gap-x-2 my-4">
              <div className="flex items-center justify-between">
                <strong className="text-blue">
                  {currentYear !== year ? ((year = currentYear), currentYear) : null}
                </strong>
                <span>{post.icon?.emoji ?? '🙈'}</span>
              </div>
              <div className="col-span-11">
                <Link to={`/posts/${post.id}`} className="text-lg hover:text-green u-underline">
                  {post.properties.title.title[0].text.content}
                </Link>
              </div>
              <div className="col-start-2 col-span-6 flex text-sm text-blue">
                <time className="mr-4">{date}</time>
                {tagName && <span>#{tagName}</span>}
              </div>
            </li>
          </ul>
        )
      })}
    </Container>
  )
}

export default PostList
