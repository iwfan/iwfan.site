import Container from '@/styles/elements/Container';
import { px2rem } from '@/styles/helper';
import styled from 'styled-components';

export const StylesContainer = styled(Container).attrs({ as: 'main' })`
  margin-top: ${px2rem(20)};
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const Separate = styled.div`
  width: 1px;
  min-width: 1px;
  align-self: stretch;
  background: #ecf0f1;
  margin: 0 ${px2rem(10)};
`;
