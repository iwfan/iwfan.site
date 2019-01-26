import { css } from '@emotion/core';
import Happy2019 from '@svg/undraw_happy_2019.svg';
import * as React from 'react';
const Banner = () => (
  <div
    css={css`
      height: 300px;
      margin-top: 30px;
      text-align: center;
    `}
  >
    <img
      css={css`
        height: 100%;
        line-height: 0;
        margin: 0 auto;
      `}
      src={Happy2019}
      alt="happy 2019"
    />
  </div>
);

export default Banner;
