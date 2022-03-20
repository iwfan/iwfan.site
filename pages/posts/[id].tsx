import type { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { NotionRenderer, Code, Collection, CollectionRow } from 'react-notion-x'
import Layout from '../../components/Layout'
import { queryNotionDatabase } from '../../notion/client'
import { retrieveNotionPage } from '../../notion/x'
import { NotionPageBlock } from '../../notion/typings'
import { site_title } from '../../site.config'
import Link from 'next/link'

const Posts: NextPage<NotionPageBlock> = props => {
  const post = props
  process.env.NODE_ENV === 'development' && console.log(post)
  // const postTitle = post?.properties?.title?.title?.[0]?.text?.content ?? null
  //
  // if (postTitle == null) {
  //   return null
  // }

  // const createdDate = post.properties.created_date
  // const date = createdDate[createdDate.type]?.start
  return (
    <>
      {/* <Head> */}
      {/*   <title> */}
      {/*     {postTitle} | {site_title} */}
      {/*   </title> */}
      {/* </Head> */}
      <Layout>
        <article className="text-grey leading-relaxed">
          {/* <header className="my-12"> */}
          {/*   <h1 className="my-2 text-3xl text-fg font-bold">{postTitle}</h1> */}
          {/*   <p className="text-blue">{date}</p> */}
          {/* </header> */}
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
          {/* {(post.blocks ?? []).map(block => ( */}
          {/*   <Fragment key={block.id}>{renderBlock(block)}</Fragment> */}
          {/* ))} */}
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
