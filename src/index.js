// Load critical CSS to inline.
import './index.scss'

const app = document.getElementById('app')

/**
 * Prefetch all components for each routes.
 * TODO: Change to hover-to-prefetch
 */
const prefetchAllRoutes = () => {
  import('./components/scene-top')
  import('./components/scene-about')
  import('./components/scene-contact')
}

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

  load.then(() => {
    prefetchAllRoutes()
  })

  if (!ssr) {
    app.innerHTML = html
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
