import React from 'react';

import { rhythm } from '../utils/typography';
import Header from './header';

const Layout: React.FC<any> = ({ location, children }) => {
  return (
    <div
      style={{
        margin: `0 auto`,
        maxWidth: rhythm(location.pathname === `/` ? 30 : 26),
        padding: rhythm(3 / 4),
        overflow: `hidden`,
      }}
    >
      <Header location={location} />
      <main>{children}</main>
      <footer style={{ marginTop: rhythm(2), textAlign: `center` }}>
        <small>
          © {new Date().getFullYear()}
          {` `}
          <a href="https://github.com/iwfan/">Zi莱卷</a>
          {` Powered by `}
          <a href="https://notion.so">Notion</a>
          {` & `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </small>
      </footer>
    </div>
  );
};

export default Layout;
