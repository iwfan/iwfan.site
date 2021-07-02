import { NextPage } from 'next'
import { MarkdownRawData } from '../types'
import { Layout } from '../components/Layout'

interface IndexPageProps {
  allPostsData: MarkdownRawData[]
}

const IndexPage: NextPage<IndexPageProps> = props => {
  return <Layout></Layout>
}

export default IndexPage
