import React from 'react'
import { AppProps } from 'next/app'
import '../styles/index.css'
import '../styles/404.css'

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default App
