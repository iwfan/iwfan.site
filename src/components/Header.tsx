import styled from '@emotion/styled';
import Logo from '@svg/deer.svg';
import { graphql, Link } from 'gatsby';
import * as React from 'react';
import withStaticQuery from './withStaticQuery';

interface IHeaderQueryData {
  site: {
    siteMetadata: {
      title: string;
      menus: IMenuData[];
    };
  };
}

const Wrapper = styled.header`
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-radius: 0 0 20px 20px;
  background: #fff;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
  padding: 0 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Header: React.SFC<IHeaderQueryData> = (props: IHeaderQueryData) => {
  const {
    site: {
      siteMetadata: { title, menus },
    },
  } = props;
  console.log(title, menus);
  return (
    <Wrapper>
      <section>
        <Logo style={{ width: 40, height: 40 }} />
        <span>{title}</span>
      </section>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/404">404</Link>
          </li>
          <li>
            <Link to="/about/">About</Link>
          </li>
        </ul>
      </nav>
    </Wrapper>
  );
};

const query = graphql`
  query HeaderQuery {
    site {
      siteMetadata {
        title
        menus {
          title
          path
        }
      }
    }
  }
`;

export default withStaticQuery<IHeaderQueryData>(Header, query);
