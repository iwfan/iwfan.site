import React from 'react';
import { graphql, Link } from 'gatsby';
import SEO from '../components/seo';
import Layout from '../components/layout';
import ArticlePreview from '../components/article_preview';
import { rhythm } from '../utils/typography';

const BlogList: React.FC<any> = (props) => {
  const { data, location, pageContext = {} } = props;
  const { limit = 10, skip = 0, totalPage = 2, currentPage = 0 } = pageContext;
  const title = data.site.siteMetadata.title;
  const posts: any[] = data.allMarkdownRemark.edges;
  return (
    <>
      <SEO title={title}></SEO>
      <Layout location={location} title={title}>
        {posts.map(({ node: post }) => (
          <React.Fragment key={post.id}>
            <ArticlePreview node={post} />
            <hr
              style={{
                width: rhythm(1.5),
                height: `2px`,
                backgroundColor: `#18191b`,
                margin: `${rhythm(3)} auto`,
              }}
            />
          </React.Fragment>
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
