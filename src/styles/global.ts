import { css } from '@emotion/core';
import { normalize } from 'polished';
const GlobalStyle = css`
  ${normalize()}

  html {
    box-sizing: border-box;
    font-size: 12px;
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
  body {
    overflow-x: hidden;
    overflow-y: scroll;
    font-family: -apple-system, BlinkMacSystemFont, PingFang SC, Hiragino Sans GB, Microsoft YaHei,
      Helvetica Neue, Arial, sans-serif;
    text-rendering: optimizeLegibility;
    /* background: #f5f8fc; */
    /* background-color: #eff0f6; */
  }
  figure,
  figcaption,
  p,
  ul,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    padding: 0;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  ::selection {
    background-color: #38d39f;
    color: #3f3d56;
  }
  .container {
    width: 100%;
    max-width: 1024px;
    margin-left: auto;
    margin-right: auto;
  }
`;

export default GlobalStyle;
