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
  switch (path) {
    case '/':
      if (!ssr) {
        app.innerHTML =
          '<my-button>Button</my-button><my-link href="/foo">foo</my-link>'
      }
      return
    case '/foo':
      if (!ssr) {
        app.innerHTML = '<my-link href="/">TOP</my-link>'
      }

      return
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
