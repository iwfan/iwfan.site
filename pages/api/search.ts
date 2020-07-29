import { NextApiRequest, NextApiResponse } from 'next'
import { getSortedPostsData } from '../../libs/posts'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const posts = await getSortedPostsData()
  const query = req.query.q;
  if (!query) {
    res.status(400).json({ err: 'Missing `q` in query string' })
  } else {
    res.status(200).json(posts);
  }
}
