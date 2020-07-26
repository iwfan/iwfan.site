import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app'
import './styles.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Head>
        <title>My page title</title>
        {/*<meta name="viewport" content="initial-scale=1.0, width=device-width" />*/}
      </Head>
      <Component {...pageProps} />
    </React.Fragment>
  );
}

export default App

