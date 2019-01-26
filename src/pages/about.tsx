import * as React from 'react';

import HeroSVG from '@svg/undraw_superhero_kguv.svg';
interface ISiteInfo {
  site: any;
}

const AboutPage: React.SFC<ISiteInfo> = () => (
  <div>
    <h1>404</h1>
    <img src={HeroSVG} alt="" />
  </div>
);

export default AboutPage;
