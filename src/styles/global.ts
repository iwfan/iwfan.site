import { css } from '@emotion/core';
import { normalize } from 'polished';
const GlobalStyle = css`
  ${normalize()}

  html {
    box-sizing: border-box;
    font-size: 12px;
  }
  *,
  *:before,
  *:after {
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
`;

export default GlobalStyle;
