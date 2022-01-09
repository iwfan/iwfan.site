import { LoaderFunction, useLoaderData } from 'remix'
import PostList from '~/components/PostList'
import { queryNotionDatabase } from '~/services/notion'

export const loader: LoaderFunction = async () => await queryNotionDatabase()
export default function Posts() {
  const posts = useLoaderData<any[]>()
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Articles</h2>
      <PostList posts={posts} />
    </>
  )
}
