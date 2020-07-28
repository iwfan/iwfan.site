import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { getSortedPostsData } from '../libs/posts'
import { MarkdownRawData } from '../types'
import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'

interface IndexPageProps {
  allPostsData: MarkdownRawData[]
}

const IndexPage: NextPage<IndexPageProps> = (props) => {
  const { allPostsData } = props

  return (
    <Layout>
      <SEO />
      <div>
        {allPostsData.map(({ slug, date, title, tags }) => (
          <article key={slug}>
            <header>
              <h3 className="mb-2">
                <Link href={"/post/[slug]"} as={`/post/${slug}`}>
                  <a className="text-3xl text-orange-600 no-underline">{title}</a>
                </Link>
              </h3>
              <span className="mb-4 text-xs">{date}</span>
            </header>
            <section>
              <p className="mb-8">{tags}</p>
            </section>
          </article>
        ))}
      </div>
    </Layout>
  )
}

export default IndexPage

export async function getStaticProps() {
  const allPostsData = await getSortedPostsData()
  return {
    props: {
      allPostsData,
    },
  }
}
