import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm, scale } from '../utils/typography';

const BlogPostTemplate: React.FC<any> = ({ data, pageContext, location }) => {
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata.title;
  const { previous, next } = pageContext;

  return (
    <>
      <SEO title={post.frontmatter.title} desc={post.excerpt} type="article" />
      <Layout location={location} title={siteTitle}>
        <article>
          <header>
            <h1
              style={{
                marginTop: rhythm(1),
                borderBottom: `none`,
              }}
            >
              {post.frontmatter.title}
            </h1>
            <small>{post.frontmatter.date}</small>
          </header>
          <section
            style={{ marginTop: rhythm(1) }}
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />
        </article>
      </Layout>
    </>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY", locale: "zh-cn")
      }
    }
  }
`;
