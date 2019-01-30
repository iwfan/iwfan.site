import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { graphql, Link, StaticQuery } from 'gatsby';
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

const Wrapper = styled.header`
  width: 100%;
  height: 100px;
  line-height: 50px;
  /* border-radius: 0 0 30px 30px; */
  /* background: #eff0f6; */
  /* box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); */
  padding: 0 20px;
  color: #424647;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ecf0f1;
`;

const Header: React.SFC<any> = () => (
  <StaticQuery query={query}>
    {(data: IHeaderQueryData) => {
      const {
        site: {
          siteMetadata: { title, menus },
        },
      } = data;
      console.log(title, menus);
      return (
        <Wrapper>
          <div className="brand">
            <div className="logo" />
            <div className="title" />
          </div>
          <nav />
          <section
            css={css`
              display: inline-flex;
              align-items: center;
            `}
          >
            <div
              className="brand"
              css={css`
                width: 50px;
                height: 50px;
              `}
            >
              <svg
                className="icon"
                aria-hidden="true"
                css={css`
                  width: 100%;
                  height: 100%;
                `}
              >
                <use xlinkHref="#icon-ibeidong_com_lu" />
              </svg>
            </div>
            <span
              css={css`
                font-size: 20px;
                font-weight: 400;
              `}
            >
              {title}
            </span>
          </section>
          <nav>
            <ul
              css={css`
                display: inline-flex;
                justify-content: space-around;
                & li {
                  flex: 1 0 auto;
                  list-style-type: none;
                  font-size: 14px;
                  margin: 0 10px;
                }
              `}
            >
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
    }}
  </StaticQuery>
);

export default withStaticQuery<IHeaderQueryData>(Header, query);
