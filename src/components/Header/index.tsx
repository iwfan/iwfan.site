import { graphql, Link, StaticQuery } from 'gatsby';
import * as React from 'react';
import { MainTitle, SiteBrand, SiteLogo, StylesContainer, SubTitle, TitleWrap } from './styles';

interface IHeaderQueryData {
  logo: {
    childImageSharp: {
      fixed: any;
    };
  };
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
    logo: file(relativePath: { eq: "logo.png" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
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
        logo,
        site: {
          siteMetadata: { title, menus },
          pathPrefix: path,
        },
      } = data;
      console.log(title, path, menus);
      return (
        <header>
          <StylesContainer>
            <SiteBrand href={path ? path : '/'} title={title}>
              <SiteLogo fixed={logo.childImageSharp.fixed} alt={title} title={title} />
              <TitleWrap>
                <MainTitle>{title}</MainTitle>
                <SubTitle>Zi莱卷的Blog</SubTitle>
              </TitleWrap>
            </SiteBrand>
            {/* <nav className="nav">
              <ul className="nav__container">
                {menus.map(item => (
                  <li key={item.path} className="nav__item">
                    <Link to={item.path} activeClassName={'nav__item--active'}>
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav> */}
          </StylesContainer>
        </header>
      );
    }}
  </StaticQuery>
);

export default Header;
