import React from 'react';
import { rhythm } from '../utils/typography';
import { Link } from 'gatsby';

const Article: React.FC<any> = ({ node }) => {
  const title = node.frontmatter.title || node.fields.slug;
  return (
    <article>
      <header>
        <h3>
          <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
            {title}
          </Link>
        </h3>
        <small>{node.frontmatter.date}</small>
      </header>
      <section
        style={{
          marginTop: rhythm(1 / 2),
        }}
      >
        <p
          dangerouslySetInnerHTML={{
            __html: node.excerpt || node.frontmatter.description,
          }}
        />
      </section>
      <small>
        <Link to={node.fields.slug}>阅读全文</Link>
      </small>
      <hr
        style={{
          width: rhythm(1.5),
          height: `2px`,
          backgroundColor: `#18191b`,
          margin: `${rhythm(1)} 0 ${rhythm(2)}`,
        }}
      />
    </article>
  );
};

export default Article;
