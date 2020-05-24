import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';
import { format } from '../utils/datetime_formatter';

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
            <h1>{post.title}</h1>
            <time>
              <small>@{format(post.created_time)}</small>
            </time>
            <small style={{ whiteSpace: `nowrap` }}>
              {post.tags?.map((tag: string) => (
                <Link
                  to={`/`}
                  style={{
                    marginLeft: rhythm(0.3),
                    color: `var(--bodyGreyFontColor)`,
                  }}
                >
                  #{tag}
                </Link>
              ))}
            </small>
          </header>
          <section
            style={{ marginTop: rhythm(1) }}
            dangerouslySetInnerHTML={{ __html: post.html }}
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
