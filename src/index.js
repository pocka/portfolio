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

  const defaultDescription = 'pocka\'s portfolio'

  // Render each route
  const [html, description, load] = (() => {
    switch (path) {
      case '/':
        return ['<scene-top/>', defaultDescription, import('./components/scene-top')]
      case '/about':
        return ['<scene-about/>', 'Detailed information', import('./components/scene-about')]
      case '/skill':
        return ['SKILL', 'Skills and its degree', Promise.resolve()]
      case '/works':
        return ['WORKS', 'Websites and softwares made by pocka', Promise.resolve()]
      case '/contact':
        return ['<scene-contact/>', 'How to contact', import('./components/scene-contact')]
      default:
        return ['NOT FOUND', defaultDescription, Promise.resolve()]
    }
  })()

  if (!ssr) {
    const apply = () => {
      app.innerHTML = html

      const descriptionTag = document.querySelector('meta[name="description"]') || createDescription()

      descriptionTag.setAttribute('content', description)
    }

    if (window.PRERENDER) {
      apply()
      return
    }

    fadeContainer().then(fadeIn => {
      apply()

      load.then(() => {
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
