import type { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import { Fragment } from 'react'
import Head from 'next/head'
import Layout from '../../components/Layout'
import { renderBlock } from '../../notion/renderer'
import { queryNotionDatabase, retrieveNotionPage } from '../../notion/client'
import { NotionPageBlock } from '../../notion/typings'
import { site_title } from '../../site.config'

const Posts: NextPage<NotionPageBlock> = props => {
  const post = props
  process.env.NODE_ENV === 'development' && console.log(post)
  const postTitle = post?.properties?.title?.title?.[0]?.text?.content ?? null

  if (postTitle == null) {
    return null
  }

  const createdDate = post.properties.created_date
  const date = createdDate[createdDate.type]?.start
  return (
    <>
      <Head>
        <title>
          {postTitle} | {site_title}
        </title>
      </Head>
      <Layout>
        <article className="text-grey leading-relaxed">
          <header className="my-12">
            <h1 className="my-2 text-3xl text-fg font-bold">{postTitle}</h1>
            <p className="text-blue">{date}</p>
          </header>
          {(post.blocks ?? []).map(block => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </article>
      </Layout>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const results = await queryNotionDatabase(10)
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
