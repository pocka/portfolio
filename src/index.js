// Load critical CSS to inline.
import './index.scss'

const app = document.getElementById('app')

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

  // Render each route
  const [html, load] = (() => {
    switch (path) {
      case '/':
        return ['<scene-top/>', import('./components/scene-top')]
      case '/about':
        return ['<scene-about/>', import('./components/scene-about')]
      case '/skill':
        return ['SKILL', Promise.resolve()]
      case '/works':
        return ['WORKS', Promise.resolve()]
      case '/contact':
        return ['<scene-contact/>', import('./components/scene-contact')]
      default:
        return ['NOT FOUND', Promise.resolve()]
    }
  })()

  if (!ssr) {
    fadeContainer().then(fadein => {
      app.innerHTML = html

      load.then(() => {
        fadein()
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
  document.body.dataset.prerendered = 'true'
}
