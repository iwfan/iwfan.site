import { LoaderFunction, useLoaderData } from 'remix'
import PostList from '~/components/PostList'
import { queryNotionDatabase } from '~/services/notion'

export const loader: LoaderFunction = async () => await queryNotionDatabase()
export default function Posts() {
  const posts = useLoaderData<any[]>()
  return <PostList posts={posts} />
}
