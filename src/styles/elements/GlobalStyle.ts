import { normalize } from 'polished';
import { createGlobalStyle } from 'styled-components';
export default createGlobalStyle`
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
    /* background-color: #f4f5f5; */
    color: #333;
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
  ::selection {
    background-color: #38d39f;
    color: #3f3d56;
  }
`;
