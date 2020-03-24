import React from 'react';
import { rhythm } from '../utils/typography';
import { Link } from 'gatsby';

const ArticlePreview: React.FC<any> = ({ node }) => {
  const title = node.frontmatter.title || node.fields.slug;
  return (
    <article>
      <header style={{ textAlign: `center` }}>
        <h3>
          <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
            {title}
          </Link>
        </h3>
        <small>🗓{node.frontmatter.date}</small>
        <small style={{ margin: `0 ${rhythm(1 / 2)}` }}>☕️{node.timeToRead}分钟</small>
      </header>
      <section
        style={{
          marginTop: rhythm(1 / 2),
        }}
        dangerouslySetInnerHTML={{
          __html: node.excerpt,
        }}
      />
    </article>
  );
};

export default ArticlePreview;
