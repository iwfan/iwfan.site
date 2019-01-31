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
    <Helmet>
      <script src="//at.alicdn.com/t/font_1037136_krkf9vd78b.js" />
      {/* <style>.github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}</style> */}
    </Helmet>
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
