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

    const anchor = document.createElement('a')

    anchor.classList.add('link')
    anchor.innerHTML = '<slot/>'
    anchor.href = this.getAttribute('href')

    shadow.appendChild(style)
    shadow.appendChild(anchor)

    shadow.addEventListener('click', ev => {
      ev.preventDefault()
      ev.stopPropagation()

      this.navigate()
    })
  }

  /**
   * Navigate to href virtually by using History API.
   */
  navigate() {
    const href = this.getAttribute('href')

    if (href === location.pathname) {
      return
    }

    const state = {}

    history.pushState(state, href, href)

    window.dispatchEvent(new PopStateEvent('popstate', { state }))
  }
}

customElements.define('my-link', MyLink)
