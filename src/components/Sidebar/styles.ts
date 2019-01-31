import { css } from '@emotion/core';

const styles = css`
  width: 300px;
  flex: 0 0 300px;
  padding: 0px 20px;
  /* .sidebar-container {
    position: fixed;
    top: 80px;
  } */
  figure {
    .img-wrapper {
      height: 190px;
      padding-bottom: 10px;
      border-bottom: 1px solid #ecf0f1;
    }
    svg {
      width: 100%;
      height: 100%;
    }

    figcaption {
      h1 {
        color: #424647;
        margin: 15px 0;
        font-size: 16px;
        font-weight: 600;
      }
      p {
        font-size: 13px;
        text-align: center;
        color: #999;
      }
    }
  }
`;

export default styles;
