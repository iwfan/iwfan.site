import { css } from '@emotion/core';
import Happy2019 from '@svg/undraw_happy_2019.svg';
import * as React from 'react';
const Banner = () => (
  <section
    css={css`
      height: 350px;
      padding: 25px 0;
      text-align: center;
      padding-bottom: 10px;
      box-shadow: inset -2px 0 2px rgba(0, 0, 0, 0.1);
    `}
  >
    <Happy2019
      css={css`
        height: 100%;
        width: 100%;
      `}
    />
  </section>
);

export default Banner;
