import type { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { NotionRenderer, Code, Collection, CollectionRow } from 'react-notion-x'
import { getBlockTitle } from 'notion-utils'
import Layout from '../../components/Layout'
import { queryNotionDatabase } from '../../notion/client'
import { retrieveNotionPage } from '../../notion/x'
import { NotionPageBlock } from '../../notion/typings'
import { site_title } from '../../site.config'
import Link from 'next/link'

const Posts: NextPage<NotionPageBlock> = props => {
  process.env.NODE_ENV === 'development' && console.log(props)

  const { recordMap } = props

  const keys = Object.keys(recordMap?.block || {})
  const block = recordMap?.block?.[keys[0]]?.value

  const postTitle = getBlockTitle(block, recordMap) || site_title

  if (postTitle == null) {
    return null
  }

  return (
    <>
      <Head>
        <title>
          {postTitle} | {site_title}
        </title>
      </Head>
      <Layout>
        <article
          className="text-grey leading-relaxed dark-mode"
          style={
            {
              '--bg-color': 'rgb(22, 33, 41)',
              '--bg-color-1': 'rgba(135, 131, 120, 0.15)',
            } as React.CSSProperties
          }
        >
          <header className="my-12">
            <h1 className="my-2 text-3xl font-bold text-fg">{postTitle}</h1>
            {/* <p className="text-blue">{date}</p> */}
          </header>
          <NotionRenderer
            recordMap={props.recordMap}
            fullPage={true}
            darkMode={false}
            components={{
              pageLink: ({
                href,
                as,
                passHref,
                prefetch,
                replace,
                scroll,
                shallow,
                locale,
                ...props
              }: any) => (
                <Link
                  href={href}
                  as={as}
                  passHref={passHref}
                  prefetch={prefetch}
                  replace={replace}
                  scroll={scroll}
                  shallow={shallow}
                  locale={locale}
                >
                  <a {...props} />
                </Link>
              ),
              code: Code,
              collection: Collection,
              collectionRow: CollectionRow,
            }}
          />
        </article>
      </Layout>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const results = await queryNotionDatabase(10)
  return {
    paths: results.map((page: any) => ({ params: { id: page.id } })),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async context => {
  // @ts-ignore
  const { id } = context.params

  return {
    props: await retrieveNotionPage(id),
  }
}

export default Posts
