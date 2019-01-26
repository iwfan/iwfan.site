import { graphql, StaticQuery } from 'gatsby';
import * as React from 'react';

const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

const withSiteMetadata = (Component: any) => (props: any) => (
  <StaticQuery
    query={query}
    render={data => <Component {...props} siteMetadata={data.site.siteMetadata} />}
  />
);

export default withSiteMetadata;
