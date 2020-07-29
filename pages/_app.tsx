import React from 'react'
import { AppProps } from 'next/app'
import '../styles/color.css'
import '../styles/styles.css'
import '../styles/tailwind.css'
import '../styles/prims-highlight.css'

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default App
