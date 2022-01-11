import type { NextPage, GetStaticProps } from 'next'
import { queryNotionDatabase } from '../../notion/client'
import Layout from '../../components/Layout'
import PostList from '../../components/PostList'

const Home: NextPage<{ posts: any }> = props => {
  const { posts } = props
  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Articles</h2>
      <PostList posts={posts} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: { posts: await queryNotionDatabase() },
    revalidate: 1,
  }
}

export default Home
