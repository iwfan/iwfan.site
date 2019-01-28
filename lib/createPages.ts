import { resolve } from 'path';
import { GatsbyCreatePages } from './types';

const createPages: GatsbyCreatePages = async ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  const allMarkdown = await graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, limit: 1000) {
        edges {
          node {
            fields {
              slug
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
