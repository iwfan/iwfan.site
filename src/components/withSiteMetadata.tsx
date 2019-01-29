import { graphql, StaticQuery } from 'gatsby';
import * as React from 'react';

const query = graphql`
  query {
    site {
      buildTime(fromNow: true, locale: "zh-cn")
      siteMetadata {
        title
        description
        author {
          name
          avatar
        }
        keywords
        menus {
          title
          path
        }
      }
    }
  }
`;

const withSiteMetadata = (Component: any) => (props: ISiteMetaQuery) => (
  <StaticQuery
    query={query}
    render={data => <Component {...props} siteMetadata={data.site.siteMetadata} />}
  />
);

export default withSiteMetadata;
