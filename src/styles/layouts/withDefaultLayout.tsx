import * as React from 'react';

const withDefaultLayout = (Header: any, Sidebar: any, Content: any, Footer: any) => (
  props: any,
) => (
  <React.Fragment>
    <header>
      <Header {...props} />
    </header>
    <div>
      <aside>
        <Sidebar {...props} />
      </aside>
      <main>
        <Content {...props} />
      </main>
    </div>
    <footer>
      <Footer {...props} />
    </footer>
  </React.Fragment>
);

export default withDefaultLayout;
