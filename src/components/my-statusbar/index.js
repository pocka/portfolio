import css from './style.scss'

import personSVG from './person.svg'
import emailSVG from './email.svg'
import githubSVG from './github.svg'
import twitterSVG from './twitter.svg'

import { createIconLink } from './utils'

const links = [
  {
    label: 'about',
    path: '/about/',
    prefetch() {
      import('../scene-about')
    }
  },
  { label: 'skill', path: '/skill/' },
  { label: 'works', path: '/works/' },
  {
    label: 'contact',
    path: '/contact/',
    prefetch() {
      import('../scene-contact')
    }
  }
]

class MyStatusbar extends HTMLElement {
  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })

    const style = document.createElement('style')

    style.textContent = css

    shadow.appendChild(style)

    this.createLinkArea(shadow)
    this.createIcons(shadow)
  }

  /**
   * Create link area node and attach it to parent.
   * @param {HTMLElement} parent
   */
  createLinkArea(parent) {
    const wrapper = document.createElement('div')

    parent.appendChild(wrapper)

    wrapper.classList.add('top-items')

    this.linkElements = links.map(link => {
      const el = document.createElement('my-link')

      el.classList.add('item')
      el.setAttribute('href', link.path)
      el.textContent = link.label

      // Register module prefetching
      if (link.prefetch) {
        const prefetchTriggers = ['mouseover', 'focus']

        const prefetch = () => {
          link.prefetch()

          prefetchTriggers.forEach(t => el.removeEventListener(t, prefetch))
        }

        prefetchTriggers.forEach(t => el.addEventListener(t, prefetch))
      }

      return el
    })

    const personIcon = document.createElement('svg')

    const center = Math.floor(this.linkElements.length / 2)

    // Append child nodes
    this.linkElements.forEach((el, i) => {
      if (i === center) {
        wrapper.appendChild(personIcon)
      }

      wrapper.appendChild(el)
    })

    // outerHTML cannot set before attaching to DOM
    personIcon.outerHTML = personSVG

    // Handle URL changes
    this.popStateListener = ev => {
      this.updateCurrentLink()
    }

    window.addEventListener('popstate', this.popStateListener)
  }

  /**
   * Create icon nodes and attach them to parent.
   * @param {HTMLElement} parent Parent element attach to.
   */
  createIcons(parent) {
    const icons = document.createElement('div')

    icons.classList.add('icons')

    parent.appendChild(icons)

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
