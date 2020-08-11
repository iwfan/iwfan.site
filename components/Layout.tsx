import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { site_desc, site_title } from '../site.config'

export const Layout: React.FC = ({ children }) => {
  const { pathname } = useRouter()
  const isRoot = pathname === '/'

  const header = isRoot ? (
    <h1 className="mb-8">
      <Link href="/">
        <a className="text-6xl font-black text-black no-underline">
          {site_title}
        </a>
      </Link>
    </h1>
  ) : (
    <h1 className="mb-2"></h1>
  )

  return (
    <div className="max-w-screen-lg p-4 mx-auto">
      <header className="mx-auto">
        <div className="flex bg-white rounded-lg p-4 my-4 shadow-sm items-center">
          <img
            className="h-16 w-16 md:h-32 md:w-32 rounded-full mx-auto md:mx-0 md:mr-6"
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
              <ul className="list-none p-0 flex ">
                <li className="mr-2">
                  <Link href="/posts">
                    <a className="font-medium text-blue-500 underline hover:text-blue-700">
                      博客
                    </a>
                  </Link>
                </li>
                <span className="text-gray-300">{` | `}</span>
                <li className="ml-2">
                  <Link href="/about">
                    <a className="font-medium text-blue-500 underline hover:text-blue-700">
                      关于
                    </a>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="min-h-full">{children}</main>
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
    </div>
  )
}
