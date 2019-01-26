import styled from '@emotion/styled';
import Banner from 'components/Banner';
import Header from 'components/Header';
import * as React from 'react';

const Wrapper = styled.div`
  width: 900px;
  margin: 0 auto;
`;

export default () => (
  <Wrapper>
    <Header />
    <Banner />
  </Wrapper>
);
