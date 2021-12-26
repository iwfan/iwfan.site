import type { AppProps } from 'next/app'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import { ErrorBoundary } from 'react-error-boundary'
import { site_desc, site_title, site_url } from '../site.config'
import '../styles/globals.css'

const AppHead = () => (
  <Head>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta httpEquiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
    <meta name="robots" content="index,follow" />
    <meta name="googlebot" content="index,follow" />
    <meta name="google" content="nositelinkssearchbox" />
    <meta name="google" content="notranslate" />
    <link rel="icon" href="/favicon.ico" />
    <title>{site_title}</title>
  </Head>
)

const AppSEO = () => (
  <DefaultSeo
    title={site_title}
    description={site_desc}
    openGraph={{
      type: 'website',
      url: site_url,
      title: site_title,
      description: site_desc,
      images: [
        {
          url: '/logo.png',
          width: 400,
          height: 400,
          alt: site_title,
        },
      ],
    }}
    twitter={{
      handle: '@handle',
      site: '@site',
      cardType: 'summary_large_image',
    }}
  />
)

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: any
  resetErrorBoundary: () => void
}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AppHead />
      <AppSEO />
      <Component {...pageProps} />
    </ErrorBoundary>
  )
}
export default MyApp
