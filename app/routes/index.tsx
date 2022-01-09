import { LoaderFunction, useLoaderData } from 'remix'
import PostList from '~/components/PostList'
import { queryNotionDatabase } from '~/services/notion'

export const loader: LoaderFunction = async () => await queryNotionDatabase()

const Banner = () => (
  <div className="grid grid-cols-4 py-20">
    <section className="col-span-3">
      <h1
        className="text-5xl text-green font-bold leading-relaxed tracking-wider"
        style={{
          textShadow: '0px 0px 76px rgba(188, 251, 195, 0.3)',
          background: 'linear-gradient(rgb(176, 251, 188), rgb(130, 249, 161)) text',
        }}
      >
        Hi 👋, I'm iwfan, A JavaScript engineer and Vimmer.
      </h1>
      <p className="text-lg my-10">🤚🐟 Touching fish makes work more efficient.</p>
    </section>
    <section className="rounded-full border border-gray-400">
      <img src="https://doodleipsum.com/800x800/abstract" alt="" width={256} height={256} />
    </section>
  </div>
)

export default function Index() {
  const posts = useLoaderData<any[]>()
  console.log(posts)
  return (
    <>
      <Banner />
      <h2 className="text-2xl font-bold mb-2">Latest Articles</h2>
      <PostList posts={posts} />
    </>
  )
}
