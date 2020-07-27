import React, { useEffect } from 'react'
import { ga_tracking_id } from '../blog.config'
import { isProd } from '../libs/utils'
import Head from 'next/head'

export const SEO: React.FC = () => {

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
  })

  return (
    <Head>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${ga_tracking_id}`} />
    </Head>
  )
}
