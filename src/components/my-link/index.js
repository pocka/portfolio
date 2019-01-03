import css from './style.scss'

/**
 * Internal link.
 *
 * @class
 * @param {string} href A path to navigate.
 */
class MyLink extends HTMLElement {
  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })

    const style = document.createElement('style')

    style.innerText = css

    // Work-around for it's not possible to specify text-decoration to :host.
    // I don't know this is bug or intended behavior :(
    const span = document.createElement('span')

    span.classList.add('link')
    span.innerHTML = '<slot/>'

    shadow.appendChild(style)
    shadow.appendChild(span)

    shadow.addEventListener('click', () => this.navigate())
  }

  navigate() {
    const href = this.getAttribute('href')

    if (href === location.pathname.replace(/(.+)\/$/, '$1')) {
      return
    }

    const state = {}

    history.pushState(state, href, href)

    window.dispatchEvent(new PopStateEvent('popstate', { state }))
  }
}

customElements.define('my-link', MyLink)
