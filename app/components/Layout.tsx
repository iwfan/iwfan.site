import { FC } from 'react'
import { github_name, site_title, twitter_name } from '../site.config'
import { Container } from './Container'
import { Link } from 'remix'
import {
  Terminal,
  Notes,
  Bookmark,
  Feed,
  Github,
  Twitter,
  CreativeCommons,
  CreativeCommonsBy,
  Copyright,
} from './icons'

interface LayoutProps {
  pageTitle?: string
  pageDesc?: string
}

const LayoutHeader = () => (
  <Container tag="header" className={'layout__header'}>
    <h1>
      <Link to={'/'} className="layout__header-brand">
        <Terminal />
        <span>{site_title}</span>
      </Link>
    </h1>
    <menu className={'layout__header-menu'}>
      <Link to={'/'}>
        <Notes />
      </Link>
      <Link to={'/'}>
        <Bookmark />
      </Link>
    </menu>
  </Container>
)

const LayoutFooter = () => (
  <Container tag="footer" className="layout__footer">
    <p className="layout__footer-copyright">
      <span>
        <Copyright />
        {new Date().getUTCFullYear()} {site_title}
      </span>
      <a
        className="button is-white is-large"
        target="_blank"
        title="Creative Commons"
        href="https://creativecommons.org/"
        rel="noreferrer"
      >
        <CreativeCommons />
      </a>
      <a
        className="button is-white is-large"
        target="_blank"
        title="Attribution 4.0 International"
        href="https://creativecommons.org/licenses/by/4.0/"
        rel="noreferrer"
      >
        <CreativeCommonsBy />
      </a>
    </p>
    <p className="layout__footer-powered">
      Built with
      <a href="https://remix.run" target="_blank" rel="noreferrer">
        Remix
      </a>
      &
      <a href="https://www.notion.so/" target="_blank" rel="noreferrer">
        Notion
      </a>
      . Hosted on
      <a href="https://vercel.com/" target="_blank" rel="noreferrer">
        Vercel.
      </a>
    </p>
    <p className="layout__footer-social">
      <a href={`https://twitter.com/${twitter_name}`} target="_blank" rel="noreferrer">
        <Twitter />
      </a>
      <a href={`https://github.com/${github_name}`} target="_blank" rel="noreferrer">
        <Github />
      </a>
      <a href={`https://github.com/${github_name}`} target="_blank" rel="noreferrer">
        <Feed />
      </a>
    </p>
  </Container>
)

const Layout: FC<LayoutProps> = props => {
  return (
    <>
      <LayoutHeader />
      <Container tag="main" className="layout__main">
        {props.children}
      </Container>
      <LayoutFooter />
    </>
  )
}

export default Layout
