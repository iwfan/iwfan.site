import { resolve } from 'path';
import { GatsbyCreatePages } from './types';

interface PostEdgeData {
  node: { id: string; slug: string };
  previous: { id: string; slug: string; title: string };
  next: { id: string; slug: string; title: string };
}

interface QueryPostsResult {
  errors?: Error;
  data: {
    allPost: {
      totalCount: number;
      edges: PostEdgeData[];
    };
  };
}

const createPages: GatsbyCreatePages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result: QueryPostsResult = await graphql(`
    {
      allPost(filter: { published: { eq: true } }, sort: { fields: created_time, order: DESC }) {
        totalCount
        edges {
          node {
            id
            slug
          }
          previous {
            title
            slug
          }
          next {
            title
            published
            slug
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const { edges: posts } = result.data.allPost;
  posts.forEach((post) => {
    const {
      node: { slug },
      previous,
      next,
    } = post;

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

  // const postsPerPage = 10;
  // const numPages = Math.ceil(totalCount / postsPerPage);
  //
  // Array.from({ length: numPages }).forEach((_, i) => {
  //   createPage({
  //     path: `/pages/${i + 1}`,
  //     component: resolve(__dirname, `../templates/blog-list.tsx`),
  //     context: {
  //       limit: postsPerPage,
  //       skip: i * postsPerPage,
  //       totalPage: numPages,
  //       currentPage: i,
  //     },
  //   });
  // });
};

module.exports = createPages;
