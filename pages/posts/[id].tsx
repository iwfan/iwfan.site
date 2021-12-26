import type { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import type { GetPageResponse } from '@notionhq/client/build/src/api-endpoints'
import {
  queryNotionDatabase,
  retrieveNotionBlocks,
  retrieveNotionPage,
} from '../../services/notion'

const Posts: NextPage<GetPageResponse> = props => {
  console.log(props)
  return <></>
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { results } = await queryNotionDatabase()
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
