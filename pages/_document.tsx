import Document, { Head, Main, NextScript } from 'next/document'
// @ts-ignore
import { TypographyStyle } from 'react-typography'
// @ts-ignore
import typography from '../libs/typography'

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <TypographyStyle typography={typography} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
