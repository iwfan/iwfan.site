import { NextPage } from 'next'
import { MarkdownRawData } from '../types'

interface IndexPageProps {
  allPostsData: MarkdownRawData[]
}

const IndexPage: NextPage<IndexPageProps> = props => {
  return <h1>adjwada</h1>
}

export default IndexPage
