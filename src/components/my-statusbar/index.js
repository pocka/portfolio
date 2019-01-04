import css from './style.scss'

import personSVG from './person.svg'
import emailSVG from './email.svg'
import githubSVG from './github.svg'
import twitterSVG from './twitter.svg'

import { createIconLink } from './utils'

const links = [
  { label: 'about', path: '/about/' },
  { label: 'skill', path: '/skill/' },
  { label: 'works', path: '/works/' },
  { label: 'contact', path: '/contact/' }
]

class MyStatusbar extends HTMLElement {
  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })

    const style = document.createElement('style')

    style.textContent = css

    const topItems = document.createElement('div')

    topItems.classList.add('top-items')

    // Attach top level nodes
    shadow.appendChild(style)
    shadow.appendChild(topItems)

    this.linkElements = links.map(link => {
      const el = document.createElement('my-link')

      el.classList.add('item')
      el.setAttribute('href', link.path)
      el.textContent = link.label

      return el
    })

    const personIcon = document.createElement('svg')

    const center = Math.floor(this.linkElements.length / 2)

    // Append child nodes
    this.linkElements.forEach((el, i) => {
      if (i === center) {
        topItems.appendChild(personIcon)
      }

      topItems.appendChild(el)
    })

    // outerHTML cannot set before attaching to DOM
    personIcon.outerHTML = personSVG

    // Handle URL changes
    this.popStateListener = ev => {
      this.updateCurrentLink()
    }

    window.addEventListener('popstate', this.popStateListener)

    const icons = document.createElement('div')

    icons.classList.add('icons')

    shadow.appendChild(icons)

    const iconLinks = [
      createIconLink(githubSVG, 'https://github.com/pocka'),
      createIconLink(twitterSVG, 'https://twitter.com/pockaquel'),
      createIconLink(emailSVG, 'mailto:pockawoooh@gmail.com')
    ]

    iconLinks.forEach(el => {
      icons.appendChild(el)
    })
  }

  connectedCallback() {
    this.updateCurrentLink()
  }

  disconnectedCallback() {
    window.removeEventListener('popstate', this.popStateListener)
  }

  updateCurrentLink() {
    links.forEach((link, i) => {
      if (link.path === location.pathname) {
        this.linkElements[i].classList.add('active')
      } else {
        this.linkElements[i].classList.remove('active')
      }
    })
  }
}

customElements.define('my-statusbar', MyStatusbar)
