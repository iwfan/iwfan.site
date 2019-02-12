import Content from '@/components/Content';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { graphql } from 'gatsby';
import * as React from 'react';
import { Helmet } from 'react-helmet';

import GlobalStyle from '@/styles/elements/GlobalStyle';
import { StylesContainer } from './styles';
const IndexPage: React.FC<IGatsbyProps> = (props: any) => (
  <React.Fragment>
    <GlobalStyle />
    <Helmet title={props.data.site.siteMetadata.title} />
    <Header />
    <StylesContainer>
      <Content />
      {/*<Separate />*/}
      <Sidebar />
    </StylesContainer>
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
