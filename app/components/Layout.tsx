import { FC } from 'react'
import { site_title, twitter_user } from '../site.config'
import { Container } from './Container'
import Twitter from './icons/Twitter'
import Github from './icons/Github'
import Notes from './icons/Notes'
import Bookmark from './icons/Bookmark'
import Feed from './icons/Feed'
import Light from './icons/Light'
import Dark from './icons/Dark'
import { Link } from 'remix'

interface LayoutProps {
  pageTitle?: string
  pageDesc?: string
}

const Layout: FC<LayoutProps> = props => {
  return (
    <>
      <Container
        tag="header"
        className={'flex justify-between items-center h-20'}
        wrapStyle={{ '--block-stroke-width': '1px' } as React.CSSProperties}
      >
        <Link to={'/'}>
          <a className={'text-2xl subpixel-antialiased text-gray-700'}>
            {'🦄'} {site_title}
          </a>
        </Link>
        <menu className={'space-x-3'}>
          <a href={`https://twitter.com/${twitter_user}`} className="b-b b-i">
            <Twitter />
          </a>
          <a href={`https://twitter.com/${twitter_user}`} className="b-b b-i">
            <Github />
          </a>
          <a href={`https://twitter.com/${twitter_user}`} className="b-b b-i">
            <Notes />
          </a>
          <a href={`https://twitter.com/${twitter_user}`} className="b-b b-i">
            <Bookmark />
          </a>
          <a href={`https://twitter.com/${twitter_user}`} className="b-b b-i">
            <Feed />
          </a>
          <button className="b-b b-i">
            <Light />
          </button>
          <button className="b-b b-i">
            <Dark />
          </button>
        </menu>
      </Container>
      {props.children}
      <footer></footer>
    </>
  )
}

export default Layout
