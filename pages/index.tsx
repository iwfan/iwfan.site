import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { getSortedPostsData } from '../libs/posts'
import { MarkdownRawData } from '../types'
import { Layout } from '../components/Layout'

interface IndexPageProps {
  allPostsData: MarkdownRawData[];
}

const IndexPage: NextPage<IndexPageProps> = (props) => {
  const { allPostsData } = props

  return (
    <Layout>
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
      <section>
        {allPostsData.map(({ slug, date, title }) => (
          <Link key={slug} href="/post/[slug]" as={`/post/${slug}`}>
            <a className={'listItem'}>
              {title}
              -
              {date}
              <br/>
            </a>
          </Link>
        ))}
      </section>
    </Layout>
  )
}

export default IndexPage

export async function getStaticProps() {
  const allPostsData = await getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
