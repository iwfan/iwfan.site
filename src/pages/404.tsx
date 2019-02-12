import * as React from 'react';

interface ISiteInfo {
  site: any;
}

const LostPage: React.SFC<ISiteInfo> = () => (
  <div>
    <h1>404</h1>
    <p>You are lost</p>
  </div>
);

export default LostPage;
