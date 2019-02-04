import Content from '@/components/Content';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { graphql } from 'gatsby';
import * as React from 'react';
import { Helmet } from 'react-helmet';

import Container from '@/styles/elements/Container';
import GlobalStyle from '@/styles/elements/GlobalStyle';
const IndexPage: React.SFC<IGatsbyProps> = () => (
  <React.Fragment>
    <GlobalStyle />
    <Header />
    <Container>
      {/* <Sidebar /> */}
      {/* <Content /> */}
    </Container>
    {/*}      <ArticleList />
      <ArticleNavBar />
      <Footer /> */}
  </React.Fragment>
);

export default IndexPage;

export const query = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
