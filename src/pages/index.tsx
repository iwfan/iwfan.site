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
    allMarkdownRemark(limit: 1000, sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          excerpt(format: HTML, pruneLength: 100, truncate: true)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY-MM-DD")
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
