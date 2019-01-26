import * as React from 'react';

import LostSVG from '@svg/undraw_lost_bqr2.svg';
interface ISiteInfo {
  site: any;
}

const LostPage: React.SFC<ISiteInfo> = () => (
  <div>
    <h1>404</h1>
    <img src={LostSVG} alt="" />
  </div>
);

export default LostPage;
