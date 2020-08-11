import Document, { Head, Main, NextScript } from 'next/document'
import { ga_tracking_id } from '../site.config'
import React from 'react'
import '../libs/sitemap'

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
        </Head>
        <body className={'font-sans m-0 p-0 bg-gray-100'}>
          <Main />
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${ga_tracking_id}`}
          />
          <NextScript />
        </body>
      </html>
    )
  }
}
