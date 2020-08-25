import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { site_desc, site_title } from '../site.config'

const Header: React.FC = () => (
  <header className={`mx-auto w-full`}>
    <div className="flex bg-white rounded-lg p-4 my-4 shadow-sm items-center">
      <img
        className="transform hover:scale-125 hover:-rotate-360 transition-transform ease-linear duration-300 h-16 w-16 md:h-32 md:w-32 rounded-full mx-auto md:mx-0 md:mr-6"
        src="/logo_with_padding.png"
      />
      <div className="text-center md:text-left">
        <h2 className="text-lg my-2">
          <Link href="/">
            <a className="text-xl font-black text-black no-underline">
              {site_title}
            </a>
          </Link>
        </h2>
        <p className="text-sm text-gray-600 my-2">{site_desc}</p>
        <nav>
          <ul className="list-none p-0 flex items-center">
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

export const Layout: React.FC = ({ children }) => {
  const { pathname } = useRouter()
  const isRoot = pathname === '/'

  if (isRoot) {
    return (
      <div className="max-w-screen-md p-0 mx-auto h-screen flex flex-col justify-center">
        <Header />
        {children}
      </div>
    )
  }

  return (
    <div className="max-w-screen-md p-4 mx-auto">
      <Header />
      <main className="min-h-full">{children}</main>
      <Footer />
    </div>
  )
}
