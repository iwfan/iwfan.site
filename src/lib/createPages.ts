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

const createPages: GatsbyCreatePages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result: QueryPostsResult = await graphql(`
    {
      allMarkdownRemark(
        limit: 1000
        filter: { fileAbsolutePath: { regex: "/(posts)/.*\\\\.mdx?$/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        totalCount
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const { edges: posts, totalCount } = result.data.allMarkdownRemark;
  posts.forEach((post, index) => {
    const { slug } = post.node.fields;
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;

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

  const postsPerPage = 10;
  const numPages = Math.ceil(totalCount / postsPerPage);

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: `/pages/${i + 1}`,
      component: resolve(__dirname, `../templates/blog-list.tsx`),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        totalPage: numPages,
        currentPage: i,
      },
    });
  });
};

module.exports = createPages;
