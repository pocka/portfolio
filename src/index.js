// Load critical CSS to inline.
import './index.scss'

const app = document.getElementById('app')

/**
 * Render components depends on route.
 *
 * @param {boolean} ssr Whether DOM is prerendered.
 */
const render = (ssr = false) => {
  const path = location.pathname.replace(/(.+)\/$/, '$1')

  // Render each route
  const html = (() => {
    switch (path) {
      case '/':
        import('./components/scene-top')

        return '<scene-top/>'
      case '/about':
        import('./components/scene-about')

        return '<scene-about/>'
      case '/skill':
        return 'SKILL'
      case '/works':
        return 'WORKS'
      case '/contact':
        import('./components/scene-contact')

        return '<scene-contact/>'
      default:
        return 'NOT FOUND'
    }
  })()

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
