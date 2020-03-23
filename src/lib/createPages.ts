import { resolve } from 'path';
import { GatsbyCreatePages } from './types';

interface QueryPostsResult {
  errors?: any;
  data: {
    allMarkdownRemark: {
      totalCount: number;
      edges: Array<{
        node: {
          fields: any;
        };
      }>;
    };
  };
}

const createPages: GatsbyCreatePages = async ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  const result: QueryPostsResult = await graphql(`
    {
      allMarkdownRemark(
        skip: 0
        limit: 2000
        filter: { fileAbsolutePath: { regex: "/(posts)/.*\\\\.mdx?$/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        totalCount
        edges {
          node {
            id
            frontmatter {
              title
              # date(formatString: "DD MMMM YYYY")
              date(fromNow: true, locale: "zh-cn")
              # tags
              # categories
            }
            fields {
              slug
            }
            excerpt(format: HTML, pruneLength: 200, truncate: true)
            tableOfContents
            headings {
              value
              depth
            }
            html
            rawMarkdownBody
            timeToRead
            wordCount {
              paragraphs
              sentences
              words
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw new Error(result.errors);
  }

  const { edges: posts, totalCount } = result.data.allMarkdownRemark;

  posts.forEach((post, index) => {
    const { slug } = post.node.fields;
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;

    // type safe `createPage` call
    createPage({
      component: resolve(__dirname, `../templates/blog-post.tsx`),
      context: {
        slug,
        previous,
        next,
      },
      path: slug,
    });
  });
};

module.exports = createPages;
