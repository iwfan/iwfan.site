import { NextApiRequest, NextApiResponse } from 'next'
import { getSortedPostsData } from '../../libs/posts'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const posts = await getSortedPostsData()
  res.status(200).json(posts)
}
