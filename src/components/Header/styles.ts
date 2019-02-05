import Container from '@/styles/elements/Container';
import { px2rem } from '@/styles/helper';
import Img from 'gatsby-image';
import styled from 'styled-components';

interface IHeaderProps {
  fixed?: boolean;
}

export const StylesContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ecf0f1;
`;

export const HeaderInner = styled.div`
  width: 100%;
  background-color: #ffffff;
`;

export const Wrapper = styled.header`
  height: ${px2rem(60)};
  ${(props: IHeaderProps) =>
    props.fixed &&
    `
    ${HeaderInner} {
      position: fixed;
      top: 0;
      box-shadow: 0 0 5px rgba(0, 0, 0, .1);
      ${StylesContainer} {
        border: none;
      }
    }
  `}
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
  &:hover span,
  &:hover i {
    color: #38d39f;
  }
`;

export const MainTitle = styled.span`
  font-size: ${px2rem(18)};
  margin-top: -0.5em;
  align-self: center;
`;

export const SubTitle = styled.i`
  align-self: flex-end;
  margin-bottom: 0.5em;
  text-indent: -1em;
  font-size: ${px2rem(12)};
  /* font-style: italic; */
  color: #666;
  ::before {
    content: '\\2014';
    padding-right: 0.5em;
  }
`;

export const SiteNav = styled.nav``;
export const NavContainer = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
`;
export const NavItem = styled.li`
  a {
    display: inline-block;
    height: ${px2rem(60)};
    line-height: ${px2rem(60)};
    padding: 0 1em;
    margin: 0 ${px2rem(15)};
    font-size: ${px2rem(14)};
    &:hover,
    &.nav__item--active {
      color: #38d39f;
      border-bottom: 2px solid #38d39f;
    }
  }
`;
