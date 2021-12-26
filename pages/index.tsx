import type { NextPage, GetStaticProps } from 'next'
import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
import Head from 'next/head'
import Link from 'next/link'
import { queryNotionDatabase } from '../services/notion'

const parseDate = (dateStr: string) =>
  new Date(dateStr).toLocaleString('zh-CN', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })

const Home: NextPage<QueryDatabaseResponse> = props => {
  console.log(props)
  const { results } = props
  return (
    <>
      <Head>
        <title>iwfan&apos;s portfolio</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ul>
        {results.map((page: any) => (
          <li key={page.id}>
            <Link href={`/posts/${page.id}`}>
              <a>
                {page.icon && page.icon.emoji}
                {page.properties.title.title[0].text.content}
                {parseDate(page.created_time)}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export const getStaticProps: GetStaticProps = async context => {
  return {
    props: await queryNotionDatabase(),
    revalidate: 1,
  }
}

export default Home
