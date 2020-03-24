import React from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

interface SEO {
  lang?: string;
  title: string;
  desc?: string;
  keywords?: string[];
  type?: string;
}

const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        keywords
        siteUrl
      }
    }
  }
`;

// TODO: fix the any[]
const EMPTY_ARRAY: any[] = [];

const SEO: React.FC<SEO> = ({
  lang = `zh-cn`,
  title,
  desc,
  keywords = EMPTY_ARRAY,
  type = `website`,
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
      title={Object.is(title, siteTitle) ? siteTitle : `${title} | ${siteTitle}`}
    >
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={keywords?.concat(siteKeywords).join(`,`)} />
      <meta name="image" content={`${siteUrl}/favicon.ico`} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={`${siteUrl}/favicon.ico`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={`${siteUrl}/favicon.ico`} />
    </Helmet>
  );
};

export default SEO;
