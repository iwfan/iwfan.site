import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from 'remix'
import type { LinksFunction } from 'remix'
import { FC } from 'react'
import { site_desc, site_title, site_url, twitter_name } from '~/site.config'
import Layout from './components/Layout'
import globalStylesUrl from '~/styles/global.css'
import darkStylesUrl from '~/styles/dark.css'
import layoutStyleUrl from '~/styles/layout.css'

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: globalStylesUrl },
    {
      rel: 'stylesheet',
      href: darkStylesUrl,
      media: '(prefers-color-scheme: dark)',
    },
    { rel: 'stylesheet', href: layoutStyleUrl },
  ]
}

const Document: FC<{ title?: string }> = ({ title, children }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        {/* <!-- Primary Meta Tags --> */}
        <title>{title || site_title}</title>
        <meta name="title" content={title || site_title} />
        <meta name="description" content={site_desc} />

        <meta name="robots" content="index,follow" />
        <meta name="googlebot" content="index,follow" />
        <meta name="google" content="nositelinkssearchbox" />
        <meta name="google" content="notranslate" />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={site_url} />
        <meta property="og:title" content={site_title} />
        <meta property="og:description" content={site_desc} />
        <meta property="og:image" content="https://doodleipsum.com/1200x630/abstract?bg=ffffff" />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:creator" content={`@${twitter_name}`} />
        <meta property="twitter:url" content={site_url} />
        <meta property="twitter:title" content={site_title} />
        <meta property="twitter:description" content={site_desc} />
        <meta
          property="twitter:image"
          content="https://doodleipsum.com/1200x630/abstract?bg=ffffff"
        />

        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error)
  return (
    <Document title="Error!">
      <Layout>
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
        </div>
      </Layout>
    </Document>
  )
}
