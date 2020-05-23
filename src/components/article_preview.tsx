import React from 'react';
import { rhythm } from '../utils/typography';
import { Link } from 'gatsby';

const ArticlePreview: React.FC<any> = ({ id, created_time, title, tags, slug, pathname, html }) => {
  return (
    <article>
      <header style={{ textAlign: `center` }}>
        <h3>
          <Link style={{ boxShadow: `none` }} to={pathname ?? slug}>
            {title}
          </Link>
        </h3>
        <small>🗓{created_time}</small>
      </header>
      {/*<section*/}
      {/*  style={{*/}
      {/*    marginTop: rhythm(1 / 2),*/}
      {/*  }}*/}
      {/*  dangerouslySetInnerHTML={{*/}
      {/*    __html: html,*/}
      {/*  }}*/}
      {/*/>*/}
    </article>
  );
};

export default ArticlePreview;
