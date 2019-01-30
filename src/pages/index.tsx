import Banner from '@/components/Banner';
import Header from '@/components/Header';
import Container from '@/elements/Container';
import globalStyle from '@/styles/global';
import { Global } from '@emotion/core';
import { graphql } from 'gatsby';
import * as React from 'react';
import { Helmet } from 'react-helmet';

const IndexPage: React.SFC<IGatsbyProps> = () => (
  <React.Fragment>
    <Helmet>
      <script src="//at.alicdn.com/t/font_1037136_krkf9vd78b.js" />
    </Helmet>
    <Global styles={globalStyle} />
    <Container>
      <Header />
      {/* <Banner /> */}
      {/*}      <ArticleList />
      <ArticleNavBar />
      <Footer /> */}
    </Container>
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
