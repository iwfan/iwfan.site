import React, { FC } from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import { rhythm } from '../utils/typography';
import Image from 'gatsby-image';

const query = graphql`
  query SiteMetaQuery {
    avatar: file(absolutePath: { regex: "/logo.png/" }) {
      childImageSharp {
        fixed(width: 60, height: 60) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
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
  const { author, social } = data.site.siteMetadata;

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
          alt={author.name}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            minWidth: 60,
          }}
        />
      </Link>
    </header>
  );
};

export default Header;
