import { graphql, StaticQuery } from 'gatsby';
import * as React from 'react';
import ArticlePreview from './ArticlePreview';
import { ContentWrap } from './styles';

const query = graphql`
  {
    allMarkdownRemark(
      skip: 0
      limit: 2000
      filter: { fileAbsolutePath: { regex: "/(articles)/.*\\.mdx?$/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(fromNow: true, locale: "zh-cn")
            tags
            categories
          }
          fields {
            slug
          }
          excerpt
          timeToRead
          wordCount {
            paragraphs
            sentences
            words
          }
        }
      }
    }
  }
`;

const Content: React.FC<any> = () => (
  <StaticQuery query={query}>
    {(data: IAricleListData) => {
      // console.log(data);
      const {
        allMarkdownRemark: { edges: list },
      } = data;
      return (
        <ContentWrap>
          {list &&
            list.length > 0 &&
            list.map(({ node: item }) => <ArticlePreview {...item} key={item.fields.slug} />)}
        </ContentWrap>
      );
    }}
  </StaticQuery>
);
export default Content;
