// Load critical CSS to inline.
import './index.scss'

const app = document.getElementById('app')

/**
 * Creates <meta name="description"> and returns it.
 *
 * @returns {HTMLElement} <meta name="description">
 */
const createDescription = () => {
  const meta = document.createElement('meta')

  meta.setAttribute('name', 'description')

  document.querySelector('head').appendChild(meta)

  return meta
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

/**
 * Render components depends on route.
 *
 * @param {boolean} ssr Whether DOM is prerendered.
 */
const render = (ssr = false) => {
  const path = location.pathname.replace(/(.+)\/$/, '$1')

  const defaultDescription = "pocka's portfolio"

  const load = (() => {
    switch (path) {
      case '/':
        return import('./pages/top')
      case '/about':
        return import('./pages/about')
      case '/skill':
        return import('./pages/404')
      case '/works':
        return import('./pages/404')
      case '/contact':
        return import('./pages/contact')
      default:
        return import('./pages/404')
    }
  })()

  if (!ssr) {
    const apply = () =>
      load.then(({ render, description = defaultDescription }) => {
        app.innerHTML = ''

        render(app)

        const descriptionTag =
          document.querySelector('meta[name="description"]') ||
          createDescription()

        descriptionTag.setAttribute('content', description)
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

window.onpopstate = function(ev) {
  render()
}

render(!!document.body.dataset.prerendered)

// Executed only when prerender
export default async () => {
  const link = document.createElement('link')

  link.rel = 'shortcut icon'
  link.href = (await import('./favicon.png')).default

  document.querySelector('head').appendChild(link)

  document.body.dataset.prerendered = 'true'
}
