import { LoaderFunction, useLoaderData } from 'remix'
import { retrieveNotionPage } from '~/services/notion'

export const loader: LoaderFunction = async ({ params }) => await retrieveNotionPage(params.slug!)

export default function Post() {
  const post = useLoaderData<any>()
  return <article>{post.id}</article>
}
