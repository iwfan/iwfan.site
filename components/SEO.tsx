import React, { useEffect } from 'react'
import { ga_tracking_id, site_desc, site_title } from '../site.config'
import { isProd } from '../libs/utils'
import Head from 'next/head'

interface SeoProps {
  title?: string
}

export const SEO: React.FC<SeoProps> = ({ title }) => {

  useEffect(() => {
    if (isProd()) {
      window.dataLayer = window.dataLayer || []
      function gtag(...args: any[]) {
        window.dataLayer.push(arguments)
      }
      gtag('js', new Date())
      gtag('config', ga_tracking_id, {
        page_location: window.location.href,
        page_path: window.location.pathname,
        page_title: window.document.title,
      })
    }
  }, [])

  return (
    <Head>
      <title>{title ? `${title} | ${site_title}` : site_title}</title>
      <meta name="description" content={site_desc} />
      <meta property="og:type" content="website" />
      <meta name="og:title" property="og:title" content={title} />
      <meta
        name="og:description"
        property="og:description"
        content={site_desc}
      />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={site_title} />
      <meta name="twitter:description" content={site_desc} />
    </Head>
  )
}
