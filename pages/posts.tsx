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
      <SEO/>

      <ul
        style={{
          margin: 0,
          padding: 0,
          listStyle: `none`,
        }}
      >
        {allPostsData.map((post: any) => (
          <li
            key={post.slug}
            style={{
              display: `flex`,
              justifyContent: `space-between`,
              alignItems: `center`,
              // marginBottom: rhythm(0.5),
            }}
          >
            <p style={{ margin: 0 }}>
              <time style={{ marginRight: '10px' }}>
                <small>{post.date}</small>
              </time>

              <Link href={'/post/[slug]'} as={`/post/${post.slug}`}>
                <a className="text-xl text-gray-900 no-underline">
                  {post.title}
                </a>
              </Link>
            </p>
            <small style={{ whiteSpace: `nowrap` }}>
              {post.tags?.map((tag: string) => (
                  `#${tag}`
              ))}
            </small>
          </li>
        ))}
      </ul>
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
