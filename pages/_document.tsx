import Document, { Head, Main, NextScript } from 'next/document'
// @ts-ignore
import { TypographyStyle } from 'react-typography'
// @ts-ignore
import typography from '../libs/typography'
import { ga_tracking_id } from '../site.config';
import React from 'react';
import '../libs/sitemap'

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <TypographyStyle typography={typography} />
        </Head>
        <body>
          <Main />
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${ga_tracking_id}`} />
          <NextScript />
        </body>
      </html>
    )
  }
}
