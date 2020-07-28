import React, { useState } from 'react'
import { NextPage } from 'next'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import { getPostData, getAllPostSlugs } from '../../libs/posts'
import { Layout } from '../../components/Layout'
import { SEO } from '../../components/SEO'
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter'
import style from 'react-syntax-highlighter/dist/cjs/styles/hljs/darcula'

interface Props {
  userAgent?: string
}
const CodeBlock = ({ language, value }: any) => {
  return (
    <SyntaxHighlighter className={`language-${language}`} language={language} style={style} showLineNumbers={true}>
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
    <article>
      <header>
        <h1 className="my-0">{postData.title}</h1>
        <p className="text-xs">{postData.date}</p>
      </header>
      <ReactMarkdown
        escapeHtml={false}
        source={postData.content}
        renderers={{
          code: CodeBlock,
          image: Image,
        }}
      />
    </article>

    {postData.next?.title}
    <br />
    {postData.prev?.title}
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
