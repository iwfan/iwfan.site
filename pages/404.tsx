import { SEO } from '../components/SEO'

export default function Custom404() {
  return (
    <div
      className="h-screen"
      style={{
        background: 'radial-gradient(#000, #111)',
        color: 'white',
        userSelect: 'none'
      }}
    >
      <SEO title={'404'} />
      <div className="code_404">404</div>
      <br />
      <br />
      <span className="not_found_info">Page not found</span>
    </div>
  )
}
