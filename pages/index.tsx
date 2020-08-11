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
      <h1>Hello</h1>
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
