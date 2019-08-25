import AtMarkIcon from './icons/atmark.svg'
import ArchitectureIcon from './icons/architecture.svg'
import GoIcon from './icons/go.svg'
import HomeIcon from './icons/home.svg'
import JsIcon from './icons/js.svg'
import UserIcon from './icons/user.svg'

interface Page {
  path: string
  title: string
  icon: string
  description?: string

  render(): Promise<{ default: string }>
}

export const pages: readonly Page[] = [
  {
    path: '/',
    title: 'Top',
    icon: HomeIcon,
    render: () => import('./index.md')
  },
  {
    path: '/front-end/',
    title: 'Front end',
    icon: JsIcon,
    render: () => import('./front-end.md')
  },
  {
    path: '/back-end/',
    title: 'Back end',
    icon: GoIcon,
    render: () => import('./back-end.md')
  },
  {
    path: '/dx/',
    title: 'DX',
    icon: ArchitectureIcon,
    render: () => import('./dx.md')
  },
  {
    path: '/contact/',
    title: 'Contact',
    icon: AtMarkIcon,
    render: () => import('./contact.md')
  },
  {
    path: '/about/',
    title: 'About me',
    icon: UserIcon,
    render: () => import('./about.md')
  }
]

export default pages
