import { FC } from 'react'
import { Container } from './Container'
import LayoutFooter from './Footer'
import LayoutHeader from './Header'

interface LayoutProps {
  pageTitle?: string
  pageDesc?: string
}

const Layout: FC<LayoutProps> = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-deep-green text-fg font-Jost antialiased">
    <LayoutHeader />
    <Container tag="main" className="flex-1">
      {children}
    </Container>
    <LayoutFooter />
  </div>
)

export default Layout
