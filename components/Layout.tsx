import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { site_desc, site_title } from '../site.config'

const Header: React.FC = () => (
  <header className={`mx-auto w-full`}>
    <div className="flex items-center p-4 my-4 bg-white rounded-lg shadow-sm">
      <img
        className="w-16 h-16 mx-auto rounded-full transform hover:scale-125 hover:-rotate-360 transition-transform ease-linear duration-300 md:h-32 md:w-32 md:mx-0 md:mr-6"
        src="/logo_with_padding.png"
      />
      <div className="text-center md:text-left">
        <h2 className="my-2 text-lg">
          <Link href="/">
            <a className="text-xl font-black text-black no-underline">
              {site_title}
            </a>
          </Link>
        </h2>
        <p className="my-2 text-sm text-gray-600">{site_desc}</p>
        <nav>
          <ul className="flex items-center p-0 list-none">
            <li className="mr-2">
              <Link href="/">
                <a className="text-xl no-underline hover:text-blue-700">
                  &nbsp;&#127968;&nbsp;
                </a>
              </Link>
            </li>
            <span className="text-gray-300">{` | `}</span>
            <li className="ml-2">
              <Link href="/posts">
                <a className="text-xl no-underline hover:text-blue-700">
                  &nbsp;&#128214;&nbsp;
                  {/*
                  &#128221; 📝
                  &#x1f4bb; 💻
                  */}
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
)

const Footer = () => (
  <footer className={'my-4 text-sm text-center text-gray-600'}>
    <abbr title="This site and all its content are licensed under a Creative Commons Attribution-NonCommercial 4.0 International License.">
      CC BY-NC 4.0
    </abbr>
    {` © `}
    {new Date().getFullYear()}
    <a className="text-gray-600" href="https://github.com/iwfan/">
      {` Zi`}
      <ruby>
        莱 <rp>(</rp>
        <rt>lái</rt>
        <rp>)</rp>
      </ruby>
      {`卷`}
    </a>
    {` Built with `}
    <a className="text-gray-600" href="https://nextjs.org/">
      Next.js
    </a>
    &#128293;
    {` & `}
    <a className="text-gray-600" href="https://vercel.com/">
      Vercel
    </a>
  </footer>
)

declare var loadlive2d: any

export const Layout: React.FC = ({ children }) => {
  const { pathname } = useRouter()
  const isRoot = pathname === '/'

  useEffect(() => {
    loadlive2d(
      'live2d',
      'https://cdn.jsdelivr.net/gh/QiShaoXuan/live2DModel@1.0.0/live2d-widget-model-hijiki/assets/hijiki.model.json'
    )
  }, [])

  if (isRoot) {
    return (
      <div className="flex flex-col justify-center h-screen p-0 mx-auto max-w-screen-md">
        <Header />
        {children}
      </div>
    )
  }

  return (
    <div className="p-4 mx-auto max-w-screen-md">
      <Header />
      <main className="min-h-full">{children}</main>
      <Footer />
      <canvas
        id="live2d"
        className="fixed bottom-0 right-0 opacity-75 pointer-events-none"
        width="176"
        height="221"
      />
    </div>
  )
}
