import { LoaderFunction, useLoaderData } from 'remix'
import PostList from '~/components/PostList'
import { queryNotionDatabase } from '~/services/notion'

export const loader: LoaderFunction = async () => {
  return await queryNotionDatabase()
}

export default function Index() {
  const posts = useLoaderData<any[]>()
  console.log(posts)
  return (
    <>
      <h2 className="text-5xl text-tahiti text-red section-title">Recent posts</h2>
      <PostList posts={posts} />
    </>
  )
}
