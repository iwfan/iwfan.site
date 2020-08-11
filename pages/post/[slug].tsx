import React from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { getAllPostSlugs, getPostData } from '../../libs/posts'
import { Layout } from '../../components/Layout'
import { SEO } from '../../components/SEO'
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter'
import style from 'react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-light'
import Link from 'next/link'

interface Props {
  userAgent?: string
}

const CodeBlock = ({ language, value }: any) => {
  return (
    <SyntaxHighlighter
      className={'font-mono'}
      language={language}
      style={style}
      useInlineStyles={false}
      showLineNumbers={false}
    >
      {value}
    </SyntaxHighlighter>
  )
}

const Image = ({ alt, src }: any) => {
  return <img className="w-full" src={src} alt={alt} loading={'lazy'} />
}

const Post: NextPage<Props> = ({ postData }: any) => (
  <Layout>
    <SEO title={postData.title} />
    <article className="prose p-6 shadow-sm rounded-md bg-white">
      <header>
        <h1 className="my-0">{postData.title}</h1>
        <p className="text-xs text-gray-600">{postData.date}</p>
      </header>
      <ReactMarkdown
        escapeHtml={false}
        source={postData.content}
        renderers={{
          code: CodeBlock,
          image: Image,
        }}
      />

      <div className="px-6 py-4">
        {postData.tags.map((tag: string) => (
          <span
            key={tag}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="mt-6 flex justify-between">
        {postData.prev ? (
          <Link href={'/post/[slug]'} as={`/post/${postData.prev.slug}`}>
            <a className="font-medium text-blue-500 underline hover:text-blue-700">
              ← {postData.prev.title}
            </a>
          </Link>
        ) : null}

        {postData.next ? (
          <Link href={'/post/[slug]'} as={`/post/${postData.next.slug}`}>
            <a className="font-medium text-blue-500 underline hover:text-blue-700">
              {postData.next.title} →
            </a>
          </Link>
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
      postData,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  // ...
  const paths = await getAllPostSlugs()
  return {
    paths,
    fallback: false,
  }
}
