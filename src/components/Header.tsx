import { css } from '@emotion/core';
import { Link } from 'gatsby';
import * as React from 'react';
import withSiteMetadata from './withSiteMetadata';

function Header(props: any) {
  // tslint:disable-next-line
  console.log(props);
  return (
    <div>
      <span>{props.siteMetadata.title}</span>
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
}
export default withSiteMetadata(Header);
