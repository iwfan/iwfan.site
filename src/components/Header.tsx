import { css } from '@emotion/core';
import { graphql, Link, StaticQuery } from 'gatsby';
import * as React from 'react';

interface IHeaderQueryData {
  site: {
    siteMetadata: {
      title: string;
      logo: string;
      menus: IMenuData[];
    };
  };
}

const query = graphql`
  query HeaderQuery {
    site {
      siteMetadata {
        title
        logo
        menus {
          title
          path
        }
      }
    }
  }
`;

const Header: React.SFC<any> = () => (
  <StaticQuery query={query}>
    {(data: IHeaderQueryData) => {
      const {
        site: {
          siteMetadata: { title, logo, menus },
        },
      } = data;
      console.log(title, logo, menus);
      return (
        <div>
          <img src={logo} alt="" />
          <span>{title || ''}</span>
          <div
            css={css`
              float: right;
              & a {
                margin: 0 10px;
              }
            `}
          >
            <Link to="/">Home</Link>
            <Link to="/404">404</Link>
            <Link to="/about/">About</Link>
          </div>
        </div>
      );
    }}
  </StaticQuery>
);

export default Header;
