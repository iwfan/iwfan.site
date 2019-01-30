import { resolve } from 'path';
import { GatsbyCreatePages } from './types';

const createPages: GatsbyCreatePages = async ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  const allMarkdown = await graphql(`
    {
      allMarkdownRemark(
        skip: 0
        limit: 2000
        filter: { fileAbsolutePath: { regex: "/(content\\\\/posts)\\\\/.*\\\\.mdx?$/" } }
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
              tags
              categories
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
  if (allMarkdown.errors) {
    throw new Error(allMarkdown.errors);
  }
  // @ts-ignore
  allMarkdown.data.allMarkdownRemark.edges.forEach(edge => {
    const { slug } = edge.node.fields;
    if (!slug) {
      return;
    }

    // type safe `createPage` call
    createPage({
      component: resolve(__dirname, '../src/templates/blog-post.tsx'),
      context: {
        slug,
      },
      path: slug,
    });
  });
};

module.exports = createPages;
