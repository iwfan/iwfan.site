import { ContentWrap } from '@/components/Content/styles';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import GlobalStyle from '@/styles/elements/GlobalStyle';
import { StylesContainer } from '@/styles/styles';
import { graphql } from 'gatsby';
import 'github-markdown-css';
import * as React from 'react';
import { Helmet } from 'react-helmet';
const IndexPage: React.FC<IGatsbyProps> = (props: any) => {
  const { markdownRemark: post } = props.data;
  return (
    <React.Fragment>
      <GlobalStyle />
      <Header />
      <StylesContainer>
        <ContentWrap>
          <div className="blog-post-container">
            <Helmet title={`清白之年 - ${post.frontmatter.title}`} />
            <div className="blog-post" style={{ padding: 20 }}>
              <h1>{post.frontmatter.title}</h1>
              <article className="markdown-body" dangerouslySetInnerHTML={{ __html: post.html }} />
            </div>
          </div>
        </ContentWrap>
        <Sidebar />
      </StylesContainer>
      <Footer />
    </React.Fragment>
  );
};
export default IndexPage;

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
