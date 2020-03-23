import React from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

interface SEO {
  lang?: string;
  title: string;
  desc?: string;
  meta?: Array<{ name: string; content: string }>;
  keywords?: string[];
}

const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        keywords
        siteUrl
        social {
          twitter
        }
      }
    }
  }
`;

// TODO: fix the any[]
const EMPTY_ARRAY: any[] = [];

const SEO: React.FC<SEO> = ({
  lang = `en`,
  title,
  desc,
  keywords = EMPTY_ARRAY,
  meta = EMPTY_ARRAY,
}) => {
  const {
    site: {
      siteMetadata: {
        description: siteDesc,
        title: siteTitle,
        keywords: siteKeywords = [],
        siteUrl,
      },
    },
  } = useStaticQuery(query);

  const metaDescription = desc ?? siteDesc;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${siteTitle}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `keywords`,
          content: keywords?.concat(siteKeywords),
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:url`,
          content: siteUrl,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  );
};

export default SEO;
