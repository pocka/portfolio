import css from './style.scss'

class MyContainer extends HTMLElement {
  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })

    const slot = document.createElement('slot')

    shadow.appendChild(slot)

    const style = document.createElement('style')

    style.textContent = css

    shadow.appendChild(style)
  }
}

if (!customElements.get('my-container')) {
  customElements.define('my-container', MyContainer)
}
