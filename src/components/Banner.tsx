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
    <Happy2019 />
  </div>
);

export default Banner;
