import React from 'react';
import { graphql, Link } from 'gatsby';
import SEO from '../components/seo';
import Layout from '../components/layout';
import ArticlePreview from '../components/article_preview';

const BlogList: React.FC<any> = (props) => {
  console.log(props);
  const { data, location } = props;
  const title = data.site.siteMetadata.title;
  const posts: any[] = data.allMarkdownRemark.edges;

  return (
    <>
      <SEO title={title}></SEO>
      <Layout location={location} title={title}>
        {posts.map(({ node }) => (
          <ArticlePreview node={node} key={node.fields.slug} />
        ))}
      </Layout>
    </>
  );
};

export default BlogList;

export const pageQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      skip: $skip
      limit: $limit
      filter: { fileAbsolutePath: { regex: "/(posts)/.*\\.mdx?$/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY", locale: "zh-cn")
            fromNowData: date(fromNow: true, locale: "zh-cn")
            # tags
            # categories
          }
          fields {
            slug
          }
          excerpt(format: HTML, pruneLength: 100, truncate: true)
          tableOfContents
          headings {
            value
            depth
          }
          html
          # rawMarkdownBody
          timeToRead
          # wordCount {
          #  paragraphs
          #  sentences
          #  words
          #}
        }
      }
    }
  }
`;
