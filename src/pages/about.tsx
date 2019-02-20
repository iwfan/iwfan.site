import * as React from 'react';

interface ISiteInfo {
  site: any;
}

const AboutPage: React.SFC<ISiteInfo> = () => (
  <div>
    <h1>About</h1>
    <p>About me</p>
  </div>
);

export default AboutPage;
