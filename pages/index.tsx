import type { NextPage, GetStaticProps } from 'next'
import PostList from '../components/PostList'
import { queryNotionDatabase } from '../services/notion'
import Layout from '../components/Layout'
import { Container } from '../components/Container'

interface HomePageProps {
  posts: any[]
}

const Home: NextPage<HomePageProps> = props => {
  const { posts } = props
  return (
    <Layout>
      <Container tag="section">
        <div className="b-b b-f">
          <h1>
            Hi 👋 <br /> I&apos;m iwfan (Chinese name: fan.wang) -- A JavaScript engineer.
          </h1>
        </div>
      </Container>
      <PostList posts={posts} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: { posts: await queryNotionDatabase(5) },
    revalidate: 1,
  }
}

export default Home
