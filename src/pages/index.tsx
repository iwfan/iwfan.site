import React from 'react';
import { graphql, Link } from 'gatsby';
import SEO from '../components/seo';
import Layout from '../components/layout';
import Article from '../components/article';

const Blog: React.FC<any> = (props) => {
  const { data, location } = props;
  const title = data.site.siteMetadata.title;
  const posts: any[] = data.allMarkdownRemark.edges;

  return (
    <>
      <SEO title={title}></SEO>
      <Layout location={location} title={title}>
        {posts.map(({ node }) => (
          <Article node={node} key={node.fields.slug} />
        ))}
      </Layout>
    </>
  );
};

export default Blog;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      skip: 0
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
        }
      }
    }
  }
`;
