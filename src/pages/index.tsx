import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/seo';
import Layout from '../components/layout';
import ArticlePreview from '../components/article_preview';
import { rhythm } from '../utils/typography';

const IndexPage = (props: any) => {
  const { title } = props.data.site.siteMetadata;
  const posts = props.data.allPost.nodes;
  const { location } = props;
  console.log(props);
  return (
    <>
      <SEO title={title} />
      <Layout location={location} title={title}>
        {posts.map((post: any) => (
          <React.Fragment key={post.id}>
            <ArticlePreview {...post} />
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
