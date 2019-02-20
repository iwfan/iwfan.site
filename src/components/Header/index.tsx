import { graphql, Link, StaticQuery } from 'gatsby';
import * as React from 'react';
import {
  HeaderInner,
  MainTitle,
  NavContainer,
  NavItem,
  SiteBrand,
  SiteLogo,
  SiteNav,
  StylesContainer,
  SubTitle,
  TitleWrap,
  Wrapper,
} from './styles';

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

const Header: React.FC<any> = () => (
  <StaticQuery query={query}>
    {(data: IHeaderQueryData) => {
      const {
        logo,
        site: {
          siteMetadata: { title, menus },
          pathPrefix: path,
        },
      } = data;
      return (
        <Wrapper fixed>
          <HeaderInner>
            <StylesContainer>
              <SiteBrand href={path ? path : '/'} title={title}>
                <SiteLogo fixed={logo.childImageSharp.fixed} alt={title} title={title} />
                <TitleWrap>
                  <MainTitle>{title}</MainTitle>
                  <SubTitle>Zi莱卷的Blog</SubTitle>
                </TitleWrap>
              </SiteBrand>
              <SiteNav>
                <NavContainer>
                  {menus.map(item => (
                    <NavItem key={item.path} className="nav__item">
                      <Link to={item.path} activeClassName={'nav__item--active'}>
                        {item.title}
                      </Link>
                    </NavItem>
                  ))}
                </NavContainer>
              </SiteNav>
            </StylesContainer>
          </HeaderInner>
        </Wrapper>
      );
    }}
  </StaticQuery>
);

export default Header;
