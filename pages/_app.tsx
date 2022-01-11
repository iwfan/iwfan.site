import type { AppProps } from 'next/app'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import { site_desc, site_title, site_url, twitter_name } from '../site.config'
import '../styles/tailwind.css'
import '../styles/shared.css'
import '../styles/prism-highlight.css'

const AppSEO = () => (
  <DefaultSeo
    title={site_title}
    description={site_desc}
    openGraph={{
      type: 'website',
      url: site_url,
      title: site_title,
      description: site_desc,
    }}
    twitter={{
      handle: `@${twitter_name}`,
      cardType: 'summary_large_image',
    }}
  />
)

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <AppSEO />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
