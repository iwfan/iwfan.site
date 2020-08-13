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

      <ul className="list-none p-0">
        {allPostsData.map((post: any) => (
          <li key={post.slug} className="flex items-center justify-between">
            <div className="m-2 inline-flex items-center">
              <time className="font-mono mr-4 text-gray-600 text-sm">
                <small>{post.date.replace(/\s\d{2}\:\d{2}\:\d{2}/, '')}</small>
              </time>

              <Link href={'/post/[slug]'} as={`/post/${post.slug}`}>
                <a className="text-lg text-gray-900 no-underline hover:underline">
                  {post.title}
                </a>
              </Link>
            </div>
            <div className="inline-flex items-center">
              {post.tags?.map((tag: string) => (
                <small key={tag} className="text-sm text-gray-600">#{tag}</small>
              ))}
            </div>
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
      allPostsData,
    },
  }
}
