import lunr from 'lunr'
import { getSortedPostsData } from './posts';

getSortedPostsData()
  .then(posts => {
      const idx = lunr(function () {
        this.ref('name')
        this.field('text')

        posts.forEach((doc) => {
          this.add(doc)
        })
      })

      console.log(idx.search('TypeScript'))
  });

