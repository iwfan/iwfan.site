import React, { FC } from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import { rhythm } from '../utils/typography';
import Image from 'gatsby-image';

const query = graphql`
  query SiteMetaQuery {
    avatar: file(absolutePath: { regex: "/logo_with_brand.png/" }) {
      childImageSharp {
        fixed(width: 120, height: 120) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        title
        author {
          name
          bio
        }
      }
    }
  }
`;

const Header: FC<{ location: { pathname: string } }> = ({ location }) => {
  const { pathname } = location;
  const data = useStaticQuery(query);
  const { author, title } = data.site.siteMetadata;

  return (
    <header
      style={{
        display: `flex`,
        justifyContent: `center`,
        alignItems: `center`,
        marginBottom: rhythm(2),
      }}
    >
      <Link
        to={`/`}
        style={{
          display: `flex`,
          alignItems: `center`,
          boxShadow: `none`,
        }}
      >
        <Image
          fixed={data.avatar.childImageSharp.fixed}
          alt={title}
          title={title}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            minWidth: 120,
          }}
        />
      </Link>
    </header>
  );
};

export default Header;
