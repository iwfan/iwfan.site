import { graphql, Link, StaticQuery } from 'gatsby';
import * as React from 'react';
import styles from './styles';

interface IHeaderQueryData {
  site: {
    siteMetadata: {
      title: string;
      menus: IMenuData[];
    };
    pathPrefix: string;
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
      pathPrefix
    }
  }
`;

const Header: React.SFC<any> = () => (
  <StaticQuery query={query}>
    {(data: IHeaderQueryData) => {
      const {
        site: {
          siteMetadata: { title, menus },
          pathPrefix: path,
        },
      } = data;
      console.log(title, path, menus);
      return (
        <header css={styles}>
          <div className="brand">
            <a href={path ? path : '/'}>
              <div className="brand__logo">
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#icon-ibeidong_com_lu" />
                </svg>
              </div>
              <div className="brand__title">
                <h1 className="brand__title--primary">{title}</h1>
                <h2 className="brand__title--secondary">- Zi莱卷的Blog</h2>
              </div>
            </a>
          </div>
          <nav className="nav">
            <ul className="nav__container">
              {menus.map(item => (
                <li key={item.path} className="nav__item">
                  <Link to={item.path} activeClassName={'nav__item--active'}>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>
      );
    }}
  </StaticQuery>
);

export default Header;
