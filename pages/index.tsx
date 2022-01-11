import type { NextPage, GetStaticProps } from 'next'
import Link from 'next/link'
import cx from 'classnames'
import { queryNotionDatabase } from '../notion/client'
import Layout from '../components/Layout'
import Banner from '../components/Layout/Banner'
import DataList from '../components/DataList'

interface HomePageProps {
  posts: any[]
}

const Home: NextPage<HomePageProps> = props => {
  const { posts } = props
  return (
    <Layout>
      <Banner />
      <div className={cx('grid-cols-4 justify-center gap-6 py-4', 'lg:grid lg:py-20')}>
        <section className="col-span-3">
          <h2 className="text-2xl font-bold mb-4">Latest Articles</h2>
          <DataList list={posts}>
            {post => {
              const createdDate = post.properties.created_date
              const date = createdDate[createdDate.type]?.start
              return (
                <Link href={`/posts/${post.id}`}>
                  <a className="grid grid-rows-2 grid-cols-12 gap-x-4 items-center p-4 md:pl-0">
                    <span className="flex justify-end items-center text-lg">
                      {post.icon?.emoji ?? '🙈'}
                    </span>
                    <div className="col-span-11">
                      <span className="text-lg hover:text-green u-underline">
                        {post.properties.title.title[0].text.content}
                      </span>
                    </div>
                    <time className="col-start-2 col-span-11 text-sm text-blue">{date}</time>
                  </a>
                </Link>
              )
            }}
          </DataList>
        </section>
        <aside className={cx('relative group h-40 my-32', 'lg:h-auto lg:my-0')}></aside>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: { posts: await queryNotionDatabase(5) },
    revalidate: 1,
  }
}

export default Home
