import Card from '@/styles/elements/Card';
import { px2rem } from '@/styles/helper';
import styled from 'styled-components';
export const SideWrap = styled.aside`
  flex: 0 0 240px;
  margin-left: ${px2rem(20)};
`;

export const SideInner = styled(Card)`
  ${(props: { fixed: boolean }) =>
    props.fixed &&
    `
  position: fixed;
  width: 240px;
  `}
`;

export const ImgWrap = styled.figure``;
export const ImgDesc = styled.figcaption`
  border-top: 1px solid #f6f6f6;
  margin-top: ${px2rem(10)};
  padding: 10px ${px2rem(20)};

  h1 {
    font-size: ${px2rem(16)};
    color: #333;
  }
  p {
    margin: 10px 0;
    font-size: ${px2rem(13)};
    text-align: center;
    color: #888;
    line-height: 2;
  }
`;

export const SideNav = styled.nav`
  padding: 0 ${px2rem(20)};
  ul {
    list-style: none;
  }

  li {
    height: 30px;
  }
`;
