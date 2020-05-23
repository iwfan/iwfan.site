import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';

const BlogPostTemplate: React.FC<any> = ({ data, pageContext, location }) => {
  console.log(data, pageContext);
  const { post } = data;
  const { previous, next } = pageContext;
  const siteTitle = data.site.siteMetadata.title;
  return (
    <>
      <SEO title={post.title} desc={post.tags} type="article" />
      <Layout location={location} title={siteTitle}>
        <article>
          <header>
            <h1
              style={{
                marginTop: rhythm(1),
                borderBottom: `none`,
              }}
            >
              {post.title}
            </h1>
            <small>🗓{post.created_time}</small>
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
    post(slug: { eq: $slug }) {
      id
      created_time
      title
      tags
      slug
      html
    }
  }
`;
