import React from 'react';
import { graphql } from 'gatsby';
import BlogList from '../templates/blog-list';

export default BlogList;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 10
      filter: { fileAbsolutePath: { regex: "/(posts)/.*\\.mdx?$/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt(format: HTML, pruneLength: 100, truncate: true)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY", locale: "zh-cn")
            # date(fromNow: true, locale: "zh-cn")
            title
          }
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
`;
