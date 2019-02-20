import * as React from 'react';
import { ArticleExcerpt, ArticleTitle, ArticleWrap } from './styles';

const ArticlePreview: React.FC<IMDNodeData> = (props: IMDNodeData) => {
  const {
    fields: { slug },
    frontmatter: { title, tags, categories, date },
    excerpt,
  } = props;
  return (
    <ArticleWrap>
      <a href={slug}>
        <ArticleTitle>{title || slug}</ArticleTitle>
        <ArticleExcerpt>{excerpt}</ArticleExcerpt>
        <footer>
          <a href="">{tags}</a> | <a href="">{categories}</a> | <time>{date}</time>
        </footer>
      </a>
    </ArticleWrap>
  );
};

export default ArticlePreview;
