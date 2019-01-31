import { graphql, StaticQuery } from 'gatsby';
import * as React from 'react';
import styles from './styles';
interface IMDNodeData {
  id: string;
  excerpt: string;
  timeToRead: number;
  frontmatter: {
    title: string;
    date: string;
    tags: string[] | null;
    categories: string[] | null;
  };
  fields: {
    slug: string;
  };
}
interface IAricleListData {
  // errors: IErrorData[];
  // data: {
  allMarkdownRemark: {
    totalCount: number;
    edges: Array<{ node: IMDNodeData }>;
  };
  // };
}

const query = graphql`
  {
    allMarkdownRemark(
      skip: 0
      limit: 2000
      filter: { fileAbsolutePath: { regex: "/(content\\/posts)\\/.*\\.mdx?$/" } }
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
          excerpt(format: HTML, pruneLength: 200, truncate: true)
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

const renderErrors = (errors: IErrorData[]) =>
  errors && errors.length ? (
    <div className="error-message">
      {errors.map((error, index) => (
        <h3 key={index}>{error.message}</h3>
      ))}
    </div>
  ) : null;

const renderArticleList = (list: Array<{ node: IMDNodeData }>) =>
  list.map(({ node: item }) => (
    <article key={item.id}>
      <h1>
        <a href={item.fields.slug}>{item.frontmatter.title}</a>
      </h1>
      <p dangerouslySetInnerHTML={{ __html: item.excerpt }} />
      <footer>
        <p>small text here</p>
      </footer>
    </article>
  ));

const renderContentList = (data: IAricleListData) => {
  console.log(data);
  const {
    // errors,
    // data: {
    allMarkdownRemark: { totalCount, edges: list },
    // },
  } = data;
  return (
    <main css={styles}>
      {/* {renderErrors(errors)} */}
      {totalCount > 0 && renderArticleList(list)}
    </main>
  );
};

const Content: React.SFC<any> = () => <StaticQuery query={query}>{renderContentList}</StaticQuery>;
export default Content;
