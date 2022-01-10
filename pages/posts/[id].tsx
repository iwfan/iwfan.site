import type { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import Layout from '../../components/Layout'
import { queryNotionDatabase, retrieveNotionPage } from '../../services/notion'

type PostProps = any

const Posts: NextPage<PostProps> = props => {
  const page = props
  console.log(page)
  return (
    <Layout>
      <article>{page.id}</article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const results = await queryNotionDatabase()
  return {
    paths: results.map(page => ({ params: { id: page.id } })),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async context => {
  // @ts-ignore
  const { id } = context.params
  console.log(id)

  return {
    props: await retrieveNotionPage(id),
    revalidate: 1,
  }
}

export default Posts
