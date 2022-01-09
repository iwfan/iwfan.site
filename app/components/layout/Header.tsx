import { Link } from 'remix'
import { Bookmark, Heart, Notes } from '../icons'
import { Container } from './Container'

const menus = [
  {
    name: 'Articles',
    path: '/posts',
    icon: Notes,
  },
  {
    name: 'Bookmark',
    path: '/',
    icon: Bookmark,
  },
]

const LayoutHeader = () => (
  <Container tag="header" className="flex items-center justify-between py-6">
    <Link to={'/'} className="col-span-2 u-underline hover:text-green">
      <h1 className="flex items-center text-lg font-bold">
        <span className="mr-2 text-green">
          <Heart />
        </span>
        iwfan's portfolio
      </h1>
    </Link>
    <nav className="flex items-center">
      {menus.map(({ name, path, icon: Icon }) => (
        <Link key={name} to={path} className="px-4 py-2 u-underline hover:text-green">
          <span className="flex items-center">
            <Icon />
            {name}
          </span>
        </Link>
      ))}
    </nav>
  </Container>
)

export default LayoutHeader
