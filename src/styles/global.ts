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
    font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 14px;
    line-height: 2;
    font-weight: 400;
    font-style: normal;
    text-rendering: optimizeLegibility;
    background: #fff;
  }
  ul {
    margin: 0;
    padding: 0;
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
`;

export default GlobalStyle;
