import Content from '@/components/Content';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Container from '@/elements/Container';
import globalStyle from '@/styles/global';
import { css } from '@emotion/core';
import { Global } from '@emotion/core';
import { graphql } from 'gatsby';
import * as React from 'react';
import { Helmet } from 'react-helmet';

const IndexPage: React.SFC<IGatsbyProps> = () => (
  <React.Fragment>
    <Global styles={globalStyle} />
    <Container>
      <Header />
      {/* <Banner /> */}
      <div
        css={css`
          display: flex;
          margin-top: 20px;
        `}
      >
        <Sidebar />
        <Content />
      </div>
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
