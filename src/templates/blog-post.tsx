import { graphql, StaticQuery } from 'gatsby';
import * as React from 'react';
import { Helmet } from 'react-helmet';
// import '../css/blog-post.css'; // make it pretty!
// @ts-ignore
export default function Template(props) {
  console.log(props);
  return (
    <StaticQuery
      query={pageQuery}
      render={data => {
        const { markdownRemark: post } = data; // data.markdownRemark holds our post data
        return (
          <div className="blog-post-container">
            <Helmet title={`Your Blog Name - ${post.frontmatter.title}`} />
            <div className="blog-post">
              <h1>{post.frontmatter.title}</h1>
              <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
            </div>
          </div>
        );
      }}
    />
  );
}
export const pageQuery = graphql`
  query BlogPostByPath($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
      }
    }
  }
`;
