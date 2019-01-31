import Happy2019 from '@svg/undraw_happy_2019.svg';
import * as React from 'react';
import styles from './styles';
const Sidebar: React.SFC<any> = () => (
  <aside css={styles}>
    <div className="sidebar-container">
      <figure>
        <div className="img-wrapper">
          <Happy2019 />
        </div>
        <figcaption>
          <h1>Overview</h1>
          <p>
            此时的庸忙 诺诺慌张 <br />
            可否已成你的日常
          </p>
        </figcaption>
      </figure>
    </div>
  </aside>
);

export default Sidebar;
