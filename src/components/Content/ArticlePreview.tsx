import { Link } from 'gatsby';
import * as React from 'react';
import {
  ArticleExcerpt,
  ArticleMetaDivision,
  ArticleMetaInfo,
  ArticleTitle,
  ArticleWrap,
} from './styles';

const ArticlePreview: React.FC<IMDNodeData> = (props: IMDNodeData) => {
  const {
    fields: { slug },
    frontmatter: { title, tags, categories, date },
    excerpt,
  } = props;
  return (
    <ArticleWrap>
      <Link to={slug}>
        <ArticleTitle>{title || slug}</ArticleTitle>
      </Link>
      <ArticleExcerpt>{excerpt}</ArticleExcerpt>
      <ArticleMetaInfo>
        {categories && (
          <React.Fragment>
            分类：
            <Link to={'/'}>{categories.toString()}</Link>
            <ArticleMetaDivision />
          </React.Fragment>
        )}
        {tags && (
          <React.Fragment>
            标签：
            <Link to={'/'}>{tags.toString()}</Link>
            <ArticleMetaDivision />
          </React.Fragment>
        )}
        <time>{date}</time>
      </ArticleMetaInfo>
    </ArticleWrap>
  );
};

export default ArticlePreview;
