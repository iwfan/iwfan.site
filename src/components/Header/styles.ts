import Container from '@/styles/elements/Container';
import Img from 'gatsby-image';
import { rem } from 'polished';
import styled from 'styled-components';
const px2rem = (px: number) => rem(`${px}px`, '12px');

export const StylesContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ecf0f1;
`;

export const SiteBrand = styled.a`
  display: flex;
  align-items: center;
`;

export const SiteLogo = styled(Img)`
  margin-right: ${px2rem(15)};
`;

export const TitleWrap = styled.div`
  align-self: stretch;
  display: flex;
  &:hover span {
    color: #38d39f;
  }
`;

export const MainTitle = styled.span`
  font-size: ${px2rem(18)};
  margin-top: -0.5em;
  align-self: center;
`;

export const SubTitle = styled.span`
  align-self: flex-end;
  margin-bottom: 0.3em;
  text-indent: -1em;
  font-size: ${px2rem(12)};
  color: #666;
  ::before {
    content: '\\2014';
    padding: 0 0.5em;
  }
`;

const headerStyle = styled(Container)`
  .nav {
    .nav__container {
      display: flex;
      justify-content: space-around;
      align-items: center;
      list-style: none;
    }

    .nav__item {
      flex: 0 0 auto;
      margin: 0 10px;
      font-size: 14px;
      a {
        display: inline-block;
        padding: 0 1em;
        height: 60px;

        &:hover,
        &.nav__item--active {
          color: #38d39f;
          border-bottom: 2px solid #38d39f;
        }
      }
    }
  }
`;

export default headerStyle;
