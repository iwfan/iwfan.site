import { LinksFunction, LoaderFunction, useLoaderData } from 'remix'
import PostList from '~/components/PostList'
import { queryNotionDatabase } from '~/services/notion'
import homeStyleUrl from '~/styles/home/index.css'
import postListStyleUrl from '~/styles/posts/post-list.css'

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: homeStyleUrl },
    { rel: 'stylesheet', href: postListStyleUrl },
  ]
}

export const loader: LoaderFunction = async () => {
  return await queryNotionDatabase()
}

export default function Index() {
  const posts = useLoaderData<any[]>()
  console.log(posts)
  return (
    <>
      <h2 className="section-title">Recent posts</h2>
      <PostList posts={posts} />
    </>
  )
}
