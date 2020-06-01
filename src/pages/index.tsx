import React from 'react';
import { graphql, Link } from 'gatsby';
import SEO from '../components/seo';
import Layout from '../components/layout';
import { format } from '../utils/datetime_formatter';
import { rhythm } from '../utils/typography';

const IndexPage = (props: any) => {
  const { title } = props.data.site.siteMetadata;
  const posts = props.data.allPost.nodes;
  const { location } = props;
  return (
    <>
      <SEO title={title} />
      <Layout location={location} title={title}>
        <ul
          style={{
            margin: 0,
            padding: 0,
            listStyle: `none`,
          }}
        >
          {posts.map((post: any) => (
            <li
              key={post.slug}
              style={{
                display: `flex`,
                justifyContent: `space-between`,
                alignItems: `center`,
                marginBottom: rhythm(0.5),
              }}
            >
              <p style={{ margin: 0 }}>
                <time style={{ marginRight: rhythm(1) }}>
                  <small>{format(post.created_time)}</small>
                </time>
                <Link to={`post/${post.slug}`}>{post.title}</Link>
              </p>
              <small style={{ whiteSpace: `nowrap` }}>
                {post.tags?.map((tag: string) => (
                  <Link
                    to={`/`}
                    key={tag}
                    style={{
                      marginLeft: rhythm(0.3),
                      color: `var(--bodyGreyFontColor)`,
                    }}
                  >
                    #{tag}
                  </Link>
                ))}
              </small>
            </li>
          ))}
        </ul>
      </Layout>
    </>
  );
};

export default IndexPage;

export const query = graphql`
  query MyQuery {
    site {
      siteMetadata {
        title
      }
    }
    allPost(filter: { published: { eq: true } }, sort: { fields: created_time, order: DESC }) {
      nodes {
        id
        created_time
        title
        tags
        slug
      }
    }
  }
`;
