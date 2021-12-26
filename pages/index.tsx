import type { NextPage, GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import PostList from '../components/PostList'
import { queryNotionDatabase } from '../services/notion'
import { site_desc, site_title } from '../site.config'

interface HomePageProps {
  posts: any[]
}

const Home: NextPage<HomePageProps> = props => {
  const { posts } = props
  return (
    <>
      <NextSeo title={site_title} description={site_desc} />
      <PostList posts={posts} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: { posts: await queryNotionDatabase(5) },
    revalidate: 1,
  }
}

export default Home
