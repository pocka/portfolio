// Load critical CSS to inline.
import './index.scss'

import { pages } from './pages'

const app = document.getElementById('contents')
const nav = document.getElementById('nav')

/**
 * Writes description to head.
 */
const renderDescription = description => {
  const desc = document.querySelector('meta[name="description"]')

  if (!desc) {
    const meta = document.createElement('meta')

    meta.setAttribute('name', 'description')
    meta.setAttribute('content', description)

    document.querySelector('head').appendChild(meta)
    return
  }

  desc.setAttribute('content', description)
}

/**
 * Fade out #app and returns Promise with fade in function.
 *
 * @returns {Promise<function>} A function to fade in.
 */
const fadeContainer = () =>
  new Promise(resolve => {
    app.dataset.state = 'out'

    const resolvePromise = () => {
      app.removeEventListener('transitionend', resolvePromise)

      resolve(() => {
        app.dataset.state = ''
      })
    }

    app.addEventListener('transitionend', resolvePromise)
  })

let handlerCleanup

/**
 * Render components depends on route.
 *
 * @param {boolean} ssr Whether DOM is prerendered.
 */
const render = (ssr = false) => {
  const path = location.pathname

  nav.setAttribute('value', path)

  const defaultDescription = "pocka's portfolio"

  const load = (() => {
    const found = pages.find(page => page.path === path)

    if (!found) {
      return Promise.resolve({ html: '', description: '' })
    }

    return found
      .render()
      .then(mod => ({ html: mod.default, description: found.description }))
  })()

  if (!ssr) {
    const apply = () =>
      load.then(({ html, description }) => {
        if (handlerCleanup) {
          handlerCleanup()
        }

        app.innerHTML = `<div>${html}</div>`
        renderDescription(description || defaultDescription)

        const links = Array.from(
          app.querySelectorAll(
            '[data-pushstate="true"][href]:not([target="_blank"])'
          )
        )

        const pushstate = ev => {
          ev.preventDefault()

          history.pushState({}, ev.currentTarget.href, ev.currentTarget.href)
          render()
        }

        links.forEach(el => {
          const href = el.getAttribute('href')

          if (!href || /^https?:\/\//.test(href)) {
            return
          }

          el.addEventListener('click', pushstate)
        })

        handlerCleanup = () => {
          links.forEach(el => {
            el.removeEventListener('click', pushstate)
          })

          handlerCleanup = void 0
        }
      })

    if (window.PRERENDER) {
      apply()
      return
    }

    fadeContainer().then(fadeIn => {
      apply().then(() => {
        fadeIn()
      })
    })
  }
}

const setupNav = () => {
  nav.addEventListener('change', ev => {
    history.pushState({}, ev.detail.value, ev.detail.value)
    render()
  })

  nav.innerHTML = pages
    .map(
      page => `
      <a title="${page.title}" href="${page.path}" slot="icon">${page.icon}</a>
      <span
        slot="label"
        data-value="${page.path}"
      >
        ${page.title}
      </span>
  `
    )
    .join('')
}

// ---

window.onpopstate = function(ev) {
  render()
}

setupNav()
render(!!document.body.dataset.prerendered)

// Executed only when prerender
export default async () => {
  const link = document.createElement('link')

  link.rel = 'shortcut icon'
  link.href = (await import('./favicon.png')).default

  document.querySelector('head').appendChild(link)

  document.body.dataset.prerendered = 'true'
}
