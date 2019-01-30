import { StaticQuery } from 'gatsby';
import * as React from 'react';

// const withStatic: <T>(Component: any, query: any) => any = (Component: any, query: any) => (
//   props: any,
// ) => <StaticQuery query={query}>{(data: T) => <Component {...data} {...props} />}</StaticQuery>;

function withStaticQuery<T>(Component: any, query: any): any {
  return (props: any) => (
    <StaticQuery query={query} render={(data: T) => <Component {...data} {...props} />} />
  );
}

export default withStaticQuery;
