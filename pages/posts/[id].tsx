import type { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import { queryNotionDatabase, retrieveNotionPage } from '../../services/notion'

interface PostProps {
  page: any
}

const Posts: NextPage<PostProps> = props => {
  console.log(props)
  const { page } = props
  return <></>
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

  return {
    props: await retrieveNotionPage(id),
    revalidate: 1,
  }
}

export default Posts
