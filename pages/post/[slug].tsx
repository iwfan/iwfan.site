import React from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { getAllPostSlugs, getPostData } from '../../libs/posts'
import { Layout } from '../../components/Layout'
import { SEO } from '../../components/SEO'
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter'
import Link from 'next/link'

interface Props {
  userAgent?: string
}

const CodeBlock = ({ language, value }: any) => {
  const lineNumber = value.split('\n').length

  const showLineNumbersLanguage = ['javascript', 'typescript']

  const showLineNumbers =
    showLineNumbersLanguage.includes(language) && lineNumber >= 10

  return (
    <SyntaxHighlighter
      className={`${language} font-mono`}
      language={language}
      useInlineStyles={false}
      showLineNumbers={false}
    >
      {value}
    </SyntaxHighlighter>
  )
}

const Image = ({ alt, src }: any) => {
  return (
    <img
      className="w-full rounded-lg shadow-md"
      src={src}
      alt={alt}
      loading={'lazy'}
    />
  )
}

const Post: NextPage<Props> = ({ postData }: any) => (
  <Layout>
    <SEO title={postData.title}/>
    <article className="prose p-6">
      <header>
        <h1 className="my-0">{postData.title}</h1>
        <p className="text-xs text-gray-600 font-mono">{postData.date}</p>
      </header>
      <ReactMarkdown
        escapeHtml={false}
        source={postData.content}
        renderers={{
          code: CodeBlock,
          image: Image
        }}
      />

      <div className="px-6 py-4">
        {postData.tags.map((tag: string) => (
          <div
            key={tag}
            className="bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 inline-flex items-center"
          >
            <span className="text-lg mr-1">&#128278;</span><span>{tag}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between">
        {postData.prev ? (
          <div>
            <span className="text-lg mr-2">&#128072;</span>
            <Link href={'/post/[slug]'} as={`/post/${postData.prev.slug}`}>
              <a className="font-medium">
                {postData.prev.title}
              </a>
            </Link>
          </div>
        ) : null}

        {postData.next ? (
          <div>
            <Link href={'/post/[slug]'} as={`/post/${postData.next.slug}`}>
              <a className="font-medium">
                {postData.next.title}
              </a>
            </Link>
            <span className="text-lg ml-2">&#128073;</span>
          </div>
        ) : null}
      </div>
    </article>
  </Layout>
)

export default Post

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  // ...
  const postData = await getPostData(params.slug)
  return {
    props: {
      postData
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  // ...
  const paths = await getAllPostSlugs()
  return {
    paths,
    fallback: false
  }
}
