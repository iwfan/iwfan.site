import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

export default function Layout1({ children, home }: any) {
  const name = '反差'
  const siteTitle = '反差'
  return (<>
    <style jsx>{`
.container {
  max-width: 36rem;
  padding: 0 1rem;
  margin: 3rem auto 6rem;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.headerImage {
  width: 6rem;
  height: 6rem;
}

.headerHomeImage {
  width: 8rem;
  height: 8rem;
}

.backToHome {
  margin: 3rem 0 0;
}

.heading2Xl {
  font-size: 2.5rem;
  line-height: 1.2;
  font-weight: 800;
  letter-spacing: -0.05rem;
  margin: 1rem 0;
}

.headingXl {
  font-size: 2rem;
  line-height: 1.3;
  font-weight: 800;
  letter-spacing: -0.05rem;
  margin: 1rem 0;
}

.headingLg {
  font-size: 1.5rem;
  line-height: 1.4;
  margin: 1rem 0;
}

.headingMd {
  font-size: 1.2rem;
  line-height: 1.5;
}

.borderCircle {
  border-radius: 9999px;
}

.colorInherit {
  color: inherit;
}

.padding1px {
  padding-top: 1px;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.listItem {
  margin: 0 0 1.25rem;
}

.lightText {
  color: #999;
}
    `}</style>
    <div className={'container'}>
      <Head>
        <link rel={"icon"} href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={'header'}>
        {home ? (
          <>
            <img
              src="/logo_with_padding.png"
              className={`headerHomeImage borderCircle`}
              alt={name}
            />
            <h1 className={'heading2Xl'}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <img
                  src="/logo_with_padding.png"
                  className={`headerImage borderCircle`}
                  alt={name}
                />
              </a>
            </Link>
            <h2 className={'headingLg'}>
              <Link href="/">
                <a className={'colorInherit'}>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={'backToHome'}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  </>);
}
