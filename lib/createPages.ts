import { resolve } from 'path';
import { GatsbyCreatePages } from './types';

const createPages: GatsbyCreatePages = async ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  const allMarkdown = await graphql(`
    {
      allMarkdownRemark(limit: 1000) {
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
  // @ts-ignore
  allMarkdown.data.allMarkdownRemark.edges.forEach(edge => {
    const { slug } = edge.node.fields;
    if (!slug) {
      return;
    }

    // type safe `createPage` call
    createPage({
      component: resolve(__dirname, '../src/templates/index.tsx'),
      context: {
        slug,
      },
      path: slug,
    });
  });
};
