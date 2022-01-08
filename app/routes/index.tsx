import { LoaderFunction, useLoaderData } from 'remix'
import PostList from '~/components/PostList'
import { queryNotionDatabase } from '~/services/notion'

export const loader: LoaderFunction = async () => {
  const r = await queryNotionDatabase(10)
  return r
}

export default function Index() {
  const posts = useLoaderData<any[]>()
  console.log(posts)
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Welcome to Remix</h1>
      <PostList posts={posts} />
    </div>
  )
}
