import type { NextPage, GetStaticProps } from 'next'
import { queryNotionDatabase } from '../../services/notion'
import PostList from '../../components/PostList'

const Home: NextPage<{ posts: any }> = props => {
  const { posts } = props
  return (
    <>
      <PostList posts={posts} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async context => {
  return {
    props: { posts: await queryNotionDatabase() },
    revalidate: 1,
  }
}

export default Home
