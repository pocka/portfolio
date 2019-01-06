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
        return 'TOP'
      case '/about':
        return '<my-balloon>About</my-balloon>'
      case '/skill':
        return '<my-balloon pop-direction="right">Skill</my-balloon>'
      case '/works':
        return 'WORKS'
      case '/contact':
        return 'CONTACT'
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
