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
      <div className="md:flex bg-white rounded-lg p-6">
        <img className="h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6" src="/logo_with_padding.png"/>
        <div className="text-center md:text-left">
          <h2 className="text-lg">Erin Lindford</h2>
          <div className="text-purple-500">Product Engineer</div>
          <div className="text-gray-600">erinlindford@example.com</div>
          <div className="text-gray-600">(555) 765-4321</div>
        </div>
      </div>

      <div>
        {allPostsData.map(({ slug, date, title, tags }) => (
          <article key={slug}>
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
              <div className="px-6 py-4">
                <h3 className="mb-2 font-bold text-xl">
                  <Link href={'/post/[slug]'} as={`/post/${slug}`}>
                    <a className="text-3xl text-orange-600 no-underline">
                      {title}
                    </a>
                  </Link>
                </h3>
                <p className="text-gray-700 text-base">{date}</p>
              </div>
              <div className="px-6 py-4">
                {
                  tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#{tag}</span>
                  ))
                }
              </div>
            </div>
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
      allPostsData
    }
  }
}
